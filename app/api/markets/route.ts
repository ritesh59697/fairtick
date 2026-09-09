import { NextResponse } from "next/server";
import { createPublicClient, http, fallback, getAddress } from "viem";
import { base } from "viem/chains";
import { B20_TOKENS, TokenizedStock } from "@/lib/tokens";
import { AGGREGATOR_V3_ABI, evaluateFeedData, FeedResult } from "@/lib/feed";
import { POOL_V3_ABI, AERO_V2_POOL_ABI, computeUniV3PriceUsd, computeAeroV2PriceUsd, calculatePremiumBps } from "@/lib/price";
import { B20_TOKEN_ABI } from "@/lib/b20";

// Public Base RPC with reliable multi-endpoint fallbacks
const client = createPublicClient({
  chain: base,
  transport: fallback([
    http("https://developer-access-mainnet.base.org", { retryCount: 3, retryDelay: 200 }),
    http("https://base.gateway.tenderly.co", { retryCount: 3, retryDelay: 200 }),
    http("https://base.meowrpc.com", { retryCount: 3, retryDelay: 200 }),
    http("https://mainnet.base.org", { retryCount: 3, retryDelay: 200 }),
  ]),
});

export interface TokenMarketSummary {
  stock: TokenizedStock;
  fairPriceUsd: number;
  dexPriceUsd: number;
  premiumBps: number;
  multiplierWad: string;
  multiplierNumber: number;
  feed: FeedResult;
  dexSource: string;
}

// In-memory cache to prevent pounding public RPCs (7+ second delays)
let memoryCache: {
  data: TokenMarketSummary[];
  timestamp: number;
} | null = null;

const CACHE_TTL_MS = 15_000; // 15 seconds

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceStale = searchParams.get("forceStale") === "true";
  const forceOpen = searchParams.get("forceOpen") === "true";

  const now = Date.now();

  // If we have warm cache and it's fresh, return instantly (< 1ms)
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    let returnData = memoryCache.data;
    if (forceStale) {
      returnData = returnData.map((item) => ({
        ...item,
        feed: {
          ...item.feed,
          status: "STALE",
          statusReason: "Simulated Demo Staleness (>30m threshold)",
          isTradeSafe: false,
        },
      }));
    } else if (forceOpen) {
      returnData = returnData.map((item) => ({
        ...item,
        feed: {
          ...item.feed,
          status: "LIVE",
          statusReason: "Simulated Regular Market Hours (9:30 AM - 4:00 PM ET)",
          isTradeSafe: true,
        },
      }));
    }
    return NextResponse.json({
      data: returnData,
      timestamp: memoryCache.timestamp,
      cached: true,
    });
  }

  const results = await Promise.all(
    B20_TOKENS.map(async (stock) => {
      let fairPriceUsd = 0;
      let dexPriceUsd = 0;
      let multiplierWad = "1000000000000000000";
      let multiplierNumber = 1.0;
      let feedResult: FeedResult = {
        priceUsd: 0,
        updatedAt: 0,
        status: "UNAVAILABLE",
        statusReason: "Feed not configured or unavailable",
        roundId: "0",
        isTradeSafe: false,
      };

      // 1. Fetch Chainlink Feed if available
      if (stock.feedAddress !== "0x0000000000000000000000000000000000000000") {
        try {
          const roundData = await client.readContract({
            address: stock.feedAddress,
            abi: AGGREGATOR_V3_ABI,
            functionName: "latestRoundData",
          });
          const answer = roundData[1];
          const updatedAt = roundData[3];

          feedResult = evaluateFeedData(answer, updatedAt, stock.feedDecimals, forceStale, forceOpen);
          fairPriceUsd = feedResult.priceUsd;
        } catch (e: any) {
          console.error("Feed error for", stock.symbol, stock.feedAddress, e.shortMessage || e.message);
          feedResult = {
            priceUsd: 0,
            updatedAt: 0,
            status: "UNAVAILABLE",
            statusReason: `Feed error: ${e.shortMessage || e.message}`,
            roundId: "0",
            isTradeSafe: false,
          };
        }
      }

      // 2. Fetch Multiplier from B20 precompile if available
      try {
        const mult = await client.readContract({
          address: stock.address,
          abi: B20_TOKEN_ABI,
          functionName: "multiplier",
        });
        multiplierWad = mult.toString();
        multiplierNumber = Number(mult) / 1e18;
      } catch (e) {
        multiplierWad = "1000000000000000000";
        multiplierNumber = 1.0;
      }

      // 3. Fetch DEX Price from verified primary pool
      let dexSource = stock.poolAddress ? stock.primaryDex : "No Pool";
      if (stock.poolAddress) {
        try {
          if (stock.primaryDex === "Aerodrome") {
            const [reserves, t0] = await Promise.all([
              client.readContract({
                address: stock.poolAddress,
                abi: AERO_V2_POOL_ABI,
                functionName: "getReserves",
              }),
              client.readContract({
                address: stock.poolAddress,
                abi: AERO_V2_POOL_ABI,
                functionName: "token0",
              }),
            ]);
            const isT0Usdc = t0.toLowerCase() === "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913".toLowerCase();
            dexPriceUsd = computeAeroV2PriceUsd(reserves[0], reserves[1], isT0Usdc);
          } else {
            // Uniswap V3 pool
            const [s0, t0] = await Promise.all([
              client.readContract({
                address: stock.poolAddress,
                abi: POOL_V3_ABI,
                functionName: "slot0",
              }),
              client.readContract({
                address: stock.poolAddress,
                abi: POOL_V3_ABI,
                functionName: "token0",
              }),
            ]);
            const isT0Usdc = t0.toLowerCase() === "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913".toLowerCase();
            dexPriceUsd = computeUniV3PriceUsd(s0[1], isT0Usdc);
          }
        } catch (e) {
          console.error("Pool read error for", stock.symbol, stock.poolAddress);
          dexPriceUsd = 0;
          dexSource = "Pool Offline";
        }
      } else {
        dexPriceUsd = 0;
        dexSource = "No Pool";
      }

      // 4. Calculate Premium in basis points
      const premiumBps = calculatePremiumBps(dexPriceUsd, fairPriceUsd);

      return {
        stock,
        fairPriceUsd,
        dexPriceUsd,
        premiumBps,
        multiplierWad,
        multiplierNumber,
        feed: feedResult,
        dexSource,
      };
    })
  );

  // Cache fresh data in server memory
  memoryCache = {
    data: results,
    timestamp: Date.now(),
  };

  let returnData = results;
  if (forceStale) {
    returnData = returnData.map((item) => ({
      ...item,
      feed: {
        ...item.feed,
        status: "STALE",
        statusReason: "Simulated Demo Staleness (>30m threshold)",
        isTradeSafe: false,
      },
    }));
  } else if (forceOpen) {
    returnData = returnData.map((item) => ({
      ...item,
      feed: {
        ...item.feed,
        status: "LIVE",
        statusReason: "Simulated Regular Market Hours (9:30 AM - 4:00 PM ET)",
        isTradeSafe: true,
      },
    }));
  }

  return NextResponse.json({
    data: returnData,
    timestamp: Date.now(),
  });
}
