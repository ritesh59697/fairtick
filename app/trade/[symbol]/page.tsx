"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useReadContract,
  useWriteContract,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useAccount,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { parseUnits, formatUnits, Address, erc20Abi } from "viem";
import { getTokenBySymbol, USDC_ADDRESS, USDC_DECIMALS, UNISWAP_V3_ROUTER } from "@/lib/tokens";
import { B20_TOKEN_ABI, rawToScaledShares } from "@/lib/b20";
import { TokenMarketSummary } from "@/app/api/markets/route";
import { useGeoCheck } from "@/lib/geo";
import { BUILDER_CODE_ENV, hasValidBuilderCode } from "@/lib/attribution";
import { buildSwapTransaction } from "@/lib/aerodrome";
import { useAppWallet } from "@/lib/wallet-context";
import { StockLogo } from "@/components/StockLogo";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  Info,
  Layers,
  CheckCircle2,
  ExternalLink,
  Lock,
  Flame,
  Clock,
  Sparkles,
  Sliders,
  Wallet,
} from "lucide-react";

export default function TradeTicketPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const symbol = resolvedParams.symbol;
  const stock = getTokenBySymbol(symbol);

  const { address, isConnected, isDemo, balances: demoBalances, executeDemoSwap, openModal } = useAppWallet();
  const { isBlocked: isGeoBlocked } = useGeoCheck();

  // State
  const [market, setMarket] = useState<TokenMarketSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [amount, setAmount] = useState<string>("10"); // Default 10 USDC or 0.1 tokens
  const [maxPremiumBps, setMaxPremiumBps] = useState<number>(50); // Default 50 bps cap
  const [slippagePct, setSlippagePct] = useState<number>(0.5);
  const [afterHoursRiskAcknowledged, setAfterHoursRiskAcknowledged] = useState(false);
  const [forceStale, setForceStale] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [txSubmitting, setTxSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch token market details
  async function loadData(staleOverride = forceStale, openOverride = forceOpen) {
    if (!stock) return;
    try {
      const res = await fetch(`/api/markets?forceStale=${staleOverride}&forceOpen=${openOverride}`);
      const json = await res.json();
      const current = json.data?.find((m: TokenMarketSummary) => m.stock.symbol === stock.symbol);
      if (current) setMarket(current);
    } catch (e) {
      console.error("Error fetching market:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const intv = setInterval(() => loadData(), 15000);
    return () => clearInterval(intv);
  }, [stock?.symbol, forceStale, forceOpen]);

  // Read User's Wallet Balances
  const { data: usdcBalanceData } = useReadContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address && !isDemo ? [address] : undefined,
    query: { enabled: !!address && !isDemo },
  });

  const { data: stockBalanceData } = useReadContract({
    address: stock?.address,
    abi: B20_TOKEN_ABI,
    functionName: "balanceOf",
    args: address && !isDemo ? [address] : undefined,
    query: { enabled: !!address && !isDemo && !!stock },
  });

  const { data: allowanceData } = useReadContract({
    address: side === "BUY" ? USDC_ADDRESS : (stock?.address || USDC_ADDRESS),
    abi: erc20Abi,
    functionName: "allowance",
    args: address && !isDemo ? [address, UNISWAP_V3_ROUTER] : undefined,
    query: { enabled: !!address && !isDemo && !!stock },
  });

  // Contract write & transaction actions
  const defaultChainId = useChainId();
  const { chainId: walletChainId } = useAccount();
  const chainId = walletChainId ?? defaultChainId;
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();
  const { sendTransactionAsync } = useSendTransaction();

  const hasBuilderCode = hasValidBuilderCode(BUILDER_CODE_ENV);

  if (!stock) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-zinc-100">Asset Not Found</h2>
        <p className="text-sm text-zinc-400">The requested symbol does not match our verified B20 allowlist.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-blue-600 rounded-lg text-xs font-semibold text-white">
          Back to Markets
        </Link>
      </div>
    );
  }

  // Calculations
  const numAmount = parseFloat(amount) || 0;
  const dexPrice = market?.dexPriceUsd || 0;
  const fairPrice = market?.fairPriceUsd || 0;
  const premiumBps = market?.premiumBps || 0;
  const absPremiumBps = Math.abs(premiumBps);

  const hasPool = !!stock?.poolAddress && dexPrice > 0;

  const multiplierWad = market ? BigInt(market.multiplierWad) : 10n ** 18n;

  let expectedTokensOut = 0;
  let expectedSharesOut = 0;
  let expectedUsdcOut = 0;

  if (side === "BUY") {
    expectedTokensOut = dexPrice > 0 ? numAmount / dexPrice : 0;
    // Multiplier-aware share calculation:
    // 1 B20 token != 1 share forever!
    expectedSharesOut = expectedTokensOut * (Number(multiplierWad) / 1e18);
  } else {
    expectedUsdcOut = dexPrice > 0 ? numAmount * dexPrice : 0;
    expectedSharesOut = numAmount * (Number(multiplierWad) / 1e18);
  }

  // Price impact heuristic (sample calculation)
  const priceImpactBps = Math.min(150, Math.max(5, Math.round((numAmount / 1000) * 8)));

  // Safety Gates
  const isStale = market?.feed.status === "STALE";
  const isHeld = market?.feed.status === "HELD";
  const isFrozen = market?.feed.status === "FROZEN" || market?.feed.status === "UNAVAILABLE";
  const isOverPremiumCap = absPremiumBps > maxPremiumBps;
  const isHighImpact = priceImpactBps > 150;

  // Swap gating logic per specifications:
  // - Block if no verified onchain pool
  // - Block if NEXT_PUBLIC_BUILDER_CODE is missing (read-only mode)
  // - Block if Geo is US
  // - Block if feed FROZEN or UNAVAILABLE
  // - Block if feed STALE
  // - If feed is HELD (weekend/after-hours), block UNLESS user explicitly toggles after-hours acknowledgement
  // - Block if premium exceeds max cap (default 50 bps)
  // - Block if impact > 150 bps
  const isTradeDisabled =
    !hasPool ||
    !hasBuilderCode ||
    isGeoBlocked ||
    isFrozen ||
    isStale ||
    (isHeld && !afterHoursRiskAcknowledged) ||
    isOverPremiumCap ||
    isHighImpact ||
    numAmount <= 0;

  // Execute Swap or Approval
  async function handleExecuteTrade() {
    setErrorMessage(null);
    if (!isConnected || !address) {
      openModal();
      return;
    }
    if (!hasPool) {
      setErrorMessage("There is currently no verified Uniswap V3 pool for this asset on Base.");
      return;
    }
    if (!hasBuilderCode) {
      setErrorMessage("NEXT_PUBLIC_BUILDER_CODE must be configured to trade.");
      return;
    }
    if (isTradeDisabled) {
      setErrorMessage("Trade is currently blocked by FairTick safety gate.");
      return;
    }

    if (!stock) return;
    try {
      setTxSubmitting(true);
      const currentStock = stock;

      // Handle Demo Mode Execution
      if (isDemo) {
        const demoTxHash = await executeDemoSwap({
          symbol: currentStock.symbol,
          isBuy: side === "BUY",
          amountIn: numAmount,
          amountOut: side === "BUY" ? expectedTokensOut : expectedUsdcOut,
          sharesOut: expectedSharesOut,
          premiumBps,
        });

        router.push(
          `/tx/${demoTxHash}?symbol=${currentStock.symbol}&side=${side}&amount=${numAmount}&shares=${expectedSharesOut.toFixed(
            4
          )}&premium=${premiumBps}`
        );
        return;
      }

      // Enforce Base Mainnet (8453) for real wallet execution
      if (!isDemo && chainId !== 8453) {
        try {
          await switchChainAsync({ chainId: 8453 });
        } catch (switchErr: any) {
          setErrorMessage("Please switch network to Base Mainnet (8453) in your wallet.");
          return;
        }
      }

      const targetAmountUnits =
        side === "BUY"
          ? parseUnits(numAmount.toFixed(6), USDC_DECIMALS)
          : parseUnits(numAmount.toFixed(8), currentStock.decimals);

      const currentAllowance = allowanceData || 0n;

      // 1. Check & handle ERC20 approve if needed - strictly for UNISWAP_V3_ROUTER (exact amount only)
      if (currentAllowance < targetAmountUnits) {
        const approveToken = side === "BUY" ? USDC_ADDRESS : currentStock.address;
        await writeContractAsync({
          address: approveToken,
          abi: erc20Abi,
          functionName: "approve",
          args: [UNISWAP_V3_ROUTER, targetAmountUnits],
          chainId: 8453,
        });
      }

      // 2. Build swap transaction with ERC-8021 Builder Code attribution
      const swapPrep = buildSwapTransaction({
        stock: currentStock,
        isBuy: side === "BUY",
        amountIn: numAmount,
        expectedOut: side === "BUY" ? expectedTokensOut : expectedUsdcOut,
        slippagePct,
        recipient: address,
        builderCode: BUILDER_CODE_ENV,
      });

      // 3. Execute swap on Base via SwapRouter02 with ERC-8021 attributed calldata
      const txHash = await sendTransactionAsync({
        to: swapPrep.routerAddress,
        data: swapPrep.calldata,
        chainId: 8453,
      });

      // Redirect to Receipt Screen (Screen 3)
      router.push(
        `/tx/${txHash}?symbol=${currentStock.symbol}&side=${side}&amount=${numAmount}&shares=${expectedSharesOut.toFixed(
          4
        )}&premium=${premiumBps}`
      );
    } catch (err: any) {
      console.error("Trade error:", err);
      setErrorMessage(err.shortMessage || err.message || "Execution reverted onchain.");
    } finally {
      setTxSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button & Title bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Markets
        </Link>

        <div className="flex items-center gap-2">
          {/* Simulate Market Open Toggle */}
          <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2.5 text-xs">
            <span className="text-zinc-400 text-[11px]">Simulate Market Open:</span>
            <button
              onClick={() => {
                const next = !forceOpen;
                setForceOpen(next);
                loadData(forceStale, next);
              }}
              className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                forceOpen ? "bg-emerald-600" : "bg-zinc-700"
              }`}
              title="Toggle between real-world after-hours (HELD) and simulated regular trading hours (LIVE)"
            >
              <span
                className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                  forceOpen ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Demo Force Stale Toggle */}
          <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2.5 text-xs">
            <span className="text-zinc-400 text-[11px]">Demo Stale Feed:</span>
            <button
              onClick={() => {
                const next = !forceStale;
                setForceStale(next);
                loadData(next, forceOpen);
              }}
              className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                forceStale ? "bg-amber-600" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                  forceStale ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Setup / Status Banners */}
      {!hasBuilderCode && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs shadow-lg">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-amber-200">Builder Code Setup Required (Read-Only Mode)</div>
            <p className="text-amber-300/80 leading-relaxed">
              <code>NEXT_PUBLIC_BUILDER_CODE</code> is not configured. Swapping is in read-only mode to prevent un-attributed transactions under ERC-8021. Set your Builder Code in <code>.env.local</code> to enable swaps.
            </p>
          </div>
        </div>
      )}

      {!hasPool && (
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3 text-zinc-300 text-xs shadow-lg">
          <Info className="w-5 h-5 shrink-0 text-zinc-400 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-zinc-200">No Verified Onchain Pool Available</div>
            <p className="text-zinc-400 leading-relaxed">
              There is currently no verified Uniswap V3 liquidity pool for {stock.symbol} ({stock.name}) on Base. Swapping is disabled for this asset.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Asset Fairness Dashboard */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl">
            {/* Asset Identity */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <StockLogo symbol={stock.symbol} size="lg" />
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-black text-zinc-100">{stock.symbol}</h1>
                    <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                      {stock.underlying}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{stock.name}</p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5 select-all">
                    Contract: {stock.address.slice(0, 10)}...{stock.address.slice(-8)}
                  </p>
                </div>
              </div>

              {/* Live / Held / Stale status */}
              <div>
                {market?.feed.status === "LIVE" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE FEED
                  </span>
                ) : market?.feed.status === "HELD" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Clock className="w-3 h-3" />
                    FEED HELD (AFTER-HOURS)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    <AlertTriangle className="w-3 h-3" />
                    FEED STALE / FROZEN
                  </span>
                )}
              </div>
            </div>

            {/* Premium / Discount Gauge Banner */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">DEX Price vs Fair Value</span>
                <span
                  className={`font-mono font-bold ${
                    premiumBps > 0 ? "text-rose-400" : premiumBps < 0 ? "text-emerald-400" : "text-zinc-400"
                  }`}
                >
                  {premiumBps > 0 ? `+${absPremiumBps} bps Premium (Rich)` : `-${absPremiumBps} bps Discount (Cheap)`}
                </span>
              </div>

              {/* Progress bar visual */}
              <div className="relative h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className={`absolute top-0 bottom-0 transition-all ${
                    absPremiumBps > maxPremiumBps ? "bg-rose-500" : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${Math.min(100, Math.max(15, absPremiumBps))}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>0 bps (Par)</span>
                <span>Max Allowed: {maxPremiumBps} bps</span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-1">
                <span className="text-zinc-400 text-[11px]">Onchain DEX Mid</span>
                <div className="font-mono font-bold text-zinc-100 text-base">
                  ${dexPrice > 0 ? dexPrice.toFixed(2) : "—"}
                </div>
                <span className="text-[10px] text-zinc-500">Route: {stock.primaryDex} Pool</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-1">
                <span className="text-zinc-400 text-[11px]">Chainlink Total-Return</span>
                <div className="font-mono font-bold text-zinc-100 text-base">
                  ${fairPrice > 0 ? fairPrice.toFixed(2) : "—"}
                </div>
                <span className="text-[10px] text-zinc-500">Includes corporate splits</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-1">
                <span className="text-zinc-400 text-[11px]">B20 Multiplier</span>
                <div className="font-mono font-bold text-zinc-100 text-base">
                  {(Number(multiplierWad) / 1e18).toFixed(4)}x
                </div>
                <span className="text-[10px] text-zinc-500">1 Token = {(Number(multiplierWad) / 1e18).toFixed(2)} Shares</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-1">
                <span className="text-zinc-400 text-[11px]">Feed Freshness</span>
                <div className="font-mono font-bold text-zinc-100 text-base truncate">
                  {market?.feed.status || "CHECKING"}
                </div>
                <span className="text-[10px] text-zinc-500 truncate block">
                  {market?.feed.statusReason}
                </span>
              </div>
            </div>

            {/* After-hours risk override toggle */}
            {isHeld && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-amber-200">
                      FEED HELD — Weekend / US Market Closed
                    </p>
                    <p className="text-amber-300/80 text-[11px] leading-relaxed">
                      Trading against last official print. Off-market DEX prints carry wider bid-ask spreads.
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={afterHoursRiskAcknowledged}
                    onChange={(e) => setAfterHoursRiskAcknowledged(e.target.checked)}
                    className="ui-checkbox"
                  />
                  <span className="text-amber-200 font-medium text-[11px]">
                    I understand after-hours DEX premium risk
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Execution Ticket & Safety Gate */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl">
            {/* Side Switcher */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold">
              <button
                onClick={() => setSide("BUY")}
                className={`py-2 rounded-lg transition ${
                  side === "BUY" ? "bg-blue-600 text-white shadow" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Buy with USDC
              </button>
              <button
                onClick={() => setSide("SELL")}
                className={`py-2 rounded-lg transition ${
                  side === "SELL" ? "bg-zinc-800 text-white shadow" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Sell to USDC
              </button>
            </div>

            {/* Input Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">You Pay:</span>
                <span className="text-zinc-500 font-mono text-[11px]">
                  Balance:{" "}
                  {!isConnected
                    ? "—"
                    : isDemo
                    ? side === "BUY"
                      ? `${demoBalances.usdc.toFixed(2)} USDC (Demo)`
                      : `${(demoBalances.stocks[stock.symbol] || 0).toFixed(4)} ${stock.symbol} (Demo)`
                    : side === "BUY"
                    ? usdcBalanceData
                      ? `${(Number(usdcBalanceData) / 1e6).toFixed(2)} USDC`
                      : "0.00 USDC"
                    : stockBalanceData
                    ? `${(Number(stockBalanceData) / 1e8).toFixed(4)} ${stock.symbol}`
                    : "0.00"}
                </span>
              </div>

              <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 focus-within:border-blue-500 p-3 flex items-center justify-between transition">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-xl font-mono font-bold text-zinc-100 focus:outline-none w-full"
                />
                <span className="text-xs font-bold font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-300">
                  {side === "BUY" ? "USDC" : stock.symbol}
                </span>
              </div>
            </div>

            {/* Expected Output with Multiplier Shares */}
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Expected Tokens:</span>
                <span className="font-mono font-bold text-zinc-100">
                  {side === "BUY"
                    ? `${expectedTokensOut.toFixed(4)} ${stock.symbol}`
                    : `${expectedUsdcOut.toFixed(2)} USDC`}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-850/60 pt-2">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span className="font-semibold">≈ Scaled Shares:</span>
                </div>
                <span className="font-mono font-bold text-blue-400">
                  {expectedSharesOut.toFixed(4)} shares
                </span>
              </div>
            </div>

            {/* Risk Configuration (Max Premium & Slippage) */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Max Allowed Premium:</span>
                <div className="flex items-center gap-1">
                  {[25, 50, 100].map((bps) => (
                    <button
                      key={bps}
                      onClick={() => setMaxPremiumBps(bps)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                        maxPremiumBps === bps
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {bps} bps
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-zinc-400">
                <span>Builder Code Attribution:</span>
                <span className="font-mono text-zinc-300 text-[11px]">
                  {hasBuilderCode ? (
                    <span className="text-blue-400">"{BUILDER_CODE_ENV}" (ERC-8021)</span>
                  ) : (
                    <span className="text-amber-400 font-medium">Unconfigured (Read-Only)</span>
                  )}
                </span>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Gated Action Button */}
            <div>
              {!hasPool ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-zinc-850 text-zinc-500 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-zinc-750"
                >
                  <Lock className="w-3.5 h-3.5" />
                  No Onchain Pool (Swap Disabled)
                </button>
              ) : !hasBuilderCode ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Setup Required: Missing Builder Code
                </button>
              ) : !isConnected ? (
                <button
                  onClick={openModal}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet to Trade</span>
                </button>
              ) : !isDemo && chainId !== 8453 ? (
                <button
                  onClick={() => switchChainAsync({ chainId: 8453 })}
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Switch Wallet to Base Mainnet (8453)</span>
                </button>
              ) : isGeoBlocked ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-zinc-800 text-zinc-500 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-zinc-700"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Blocked for US Persons
                </button>
              ) : isStale ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Swap Disabled — Stale Feed
                </button>
              ) : isOverPremiumCap ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Swap Blocked — Premium {absPremiumBps} bps &gt; {maxPremiumBps} bps
                </button>
              ) : isHeld && !afterHoursRiskAcknowledged ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Check After-Hours Acknowledgment Above
                </button>
              ) : (
                <button
                  onClick={handleExecuteTrade}
                  disabled={txSubmitting || numAmount <= 0}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {txSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting to SwapRouter02...
                    </span>
                  ) : (
                    <span>
                      {side === "BUY" ? `Buy ${stock.symbol} via SwapRouter02` : `Sell ${stock.symbol} via SwapRouter02`}
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Small reassurance tag */}
            <p className="text-[10px] text-zinc-500 text-center">
              FairTick checks real-time Chainlink freshness &amp; multiplier before every execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
