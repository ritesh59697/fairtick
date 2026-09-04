import { parseAbi, getAddress, type Address } from "viem";
import { USDC_ADDRESS, USDC_DECIMALS, TokenizedStock } from "./tokens";

export interface DexPriceResult {
  dexPriceUsd: number;
  fairPriceUsd: number;
  premiumBps: number;           // positive = rich (overpaying), negative = cheap (discount)
  isRich: boolean;              // true if premiumBps > 0
  isSafePremium: boolean;       // true if |premiumBps| <= maxPremiumBps
  liquidityUsd: number;
  source: string;
}

export const POOL_V3_ABI = parseAbi([
  "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
  "function liquidity() view returns (uint128)",
  "function token0() view returns (address)",
  "function token1() view returns (address)"
]);

export const AERO_V2_POOL_ABI = parseAbi([
  "function getReserves() view returns (uint256 reserve0, uint256 reserve1, uint256 blockTimestampLast)",
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function getAmountOut(uint256 amountIn, address tokenIn) view returns (uint256)"
]);

/**
 * Calculates premium / discount in basis points (bps)
 * premiumBps = (dexPrice - fairPrice) / fairPrice * 10,000
 *
 * Example:
 * Fair = $227.48, DEX = $228.85
 * diff = 1.37
 * premiumBps = 1.37 / 227.48 * 10,000 = +60 bps (DEX is 0.60% rich)
 */
export function calculatePremiumBps(dexPrice: number, fairPrice: number): number {
  if (fairPrice <= 0 || dexPrice <= 0) return 0;
  const ratio = (dexPrice - fairPrice) / fairPrice;
  return Math.round(ratio * 10_000);
}

/**
 * Derives DEX USD price from Uniswap V3 slot0 tick
 * Given token0 is USDC (6 dec) and token1 is B20 token (8 dec)
 */
export function computeUniV3PriceUsd(tick: number, token0IsUsdc: boolean = true): number {
  const tickRatio = Math.pow(1.0001, tick);
  // If token0 is USDC: tickRatio is (raw B20 units) / (raw USDC units)
  // (B20 * 1e8) / (USDC * 1e6) = (B20 / USDC) * 100
  // Hence USDC / B20 = 100 / tickRatio
  if (token0IsUsdc) {
    return 100 / tickRatio;
  } else {
    return (tickRatio / 100);
  }
}

/**
 * Derives DEX USD price from Aerodrome V2 pool reserves
 */
export function computeAeroV2PriceUsd(
  reserve0: bigint,
  reserve1: bigint,
  token0IsUsdc: boolean = true
): number {
  const usdcReserve = token0IsUsdc ? reserve0 : reserve1;
  const stockReserve = token0IsUsdc ? reserve1 : reserve0;

  if (stockReserve === 0n || usdcReserve === 0n) return 0;

  const usdcAmount = Number(usdcReserve) / 10 ** USDC_DECIMALS;
  const stockAmount = Number(stockReserve) / 1e8;

  return usdcAmount / stockAmount;
}
