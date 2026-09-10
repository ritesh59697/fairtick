"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Layers,
  ArrowRight,
  Lock,
  ArrowUpRight,
  Terminal,
  Activity,
  CheckCircle2,
  PauseCircle,
  BadgeCheck,
  Radio,
  ArrowLeftRight,
  Binary,
  Compass,
  Scale,
  ShieldAlert,
  Route,
} from "lucide-react";
import { StockLogo } from "@/components/StockLogo";
import { BaseLogo } from "@/components/BaseLogo";
import { CoinbaseLogo, ChainlinkLogo, UniswapLogo } from "@/components/CryptoLogos";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { ProofStage } from "@/components/landing/ProofStage";
import { BentoFeatures } from "@/components/landing/BentoFeatures";
import { ComparisonMatrix } from "@/components/landing/ComparisonMatrix";
import { TechnicalFAQ } from "@/components/landing/TechnicalFAQ";
import { TokenMarketSummary } from "@/app/api/markets/route";
import { Badge } from "@/components/ui/badge";

// Client-side cache to make navigation instant
let clientSideMarketsCache: TokenMarketSummary[] = [];

export default function LandingPage() {
  const [markets, setMarkets] = useState<TokenMarketSummary[]>(() => clientSideMarketsCache);
  const [isInitialLoading, setIsInitialLoading] = useState(() => clientSideMarketsCache.length === 0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [forceStale, setForceStale] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  async function fetchMarkets(isManual = false, staleToggle = forceStale, openToggle = forceOpen) {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch(`/api/markets?forceStale=${staleToggle}&forceOpen=${openToggle}`);
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        clientSideMarketsCache = json.data;
        setMarkets(json.data);
        setLastRefreshed(new Date());
      }
    } catch (e) {
      console.error("Failed to load markets", e);
    } finally {
      setIsInitialLoading(false);
      if (isManual) setIsRefreshing(false);
    }
  }

  useEffect(() => {
    fetchMarkets(false);
    const interval = setInterval(() => fetchMarkets(false), 20000);
    return () => clearInterval(interval);
  }, [forceStale, forceOpen]);

  return (
    <div className="relative w-full">
      {/* 1. BACKGROUND VIDEO THEME: Edge of the Universe (Fixed behind entire page) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/vid/edge-of-the-universe.1920x1080.mp4" type="video/mp4" />
        </video>
        {/* Dark scrim with subtle bottom fade to ensure perfect contrast on mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-[#060a14]" />
      </div>

      {/* 2. FULL-WIDTH HERO SECTION (Mobile Optimized, Crisp Contrast) */}
      <section className="w-full pt-6 sm:pt-12 md:pt-16 pb-10 sm:pb-16 md:pb-20 px-4 sm:px-6 relative z-10 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 relative z-10">
          {/* Centered Top Announcement Pill - Base Mainnet Verified */}
          <div className="flex justify-center">
            <a
              href="https://basescan.org/tx/0x9bfb2aa9ca0dfbdff5775b52c4de0e294686faa07c6c135db94963170e8ca252"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/20 transition-all backdrop-blur-md shadow-lg shadow-black/30 group max-w-full"
            >
              <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold tracking-wide bg-[#0052FF] text-white rounded-full flex items-center gap-1.5 shadow-sm shrink-0">
                <BaseLogo className="w-2.5 h-2.5" fill="#ffffff" />
                Base B20
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-300 font-medium truncate">
                Verified Onchain Execution Standard
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
            </a>
          </div>

          {/* Editorial Headline with Adaptive Mobile Scale */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-widest text-zinc-400 uppercase">
              Autonomous Execution Protection
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.12] sm:leading-[1.08] max-w-4xl mx-auto drop-shadow-md">
              The execution guardrail <br className="hidden sm:inline" />
              <span className="font-editorial italic font-normal text-zinc-200">
                for onchain tokenized stocks
              </span>
            </h1>
          </div>

          {/* Centered Subheadline with Mobile Padding */}
          <p className="text-xs sm:text-base md:text-lg text-zinc-300/90 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-sm px-1 sm:px-0">
            Purpose-built execution protection for Coinbase B20 equities on Base. Automated defense against off-hours spread drift, uncalibrated corporate splits, and predatory DEX markups.
          </p>

          {/* Action Buttons: Responsive for Thumb Interaction */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/markets"
              className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm shadow-xl shadow-black/40 inline-flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              <span>Launch Terminal</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </Link>

            <Link
              href="#guardrails"
              className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-medium text-sm backdrop-blur-md inline-flex items-center justify-center gap-2 shadow-lg shadow-black/20 transition transform active:scale-95"
            >
              <Compass className="w-4 h-4 text-zinc-300" />
              <span>Explore Guardrails</span>
            </Link>
          </div>
        </div>

        {/* Protocol Trust Stream: Frosted Card Shielding from Bright Earth Video */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-12 p-3.5 sm:p-5 rounded-2xl bg-[#060a14]/80 border border-white/[0.12] backdrop-blur-xl shadow-2xl relative z-10">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase text-center mb-3">
            Verified Institutional Infrastructure on Base
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-8 text-xs text-zinc-300">
            <div className="flex items-center justify-center gap-2 p-2 sm:p-0 rounded-lg bg-white/[0.03] sm:bg-transparent">
              <CoinbaseLogo className="w-4 h-4 rounded-full shrink-0" />
              <span className="font-medium tracking-tight text-zinc-200 text-xs sm:text-xs">Coinbase B20</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 sm:p-0 rounded-lg bg-white/[0.03] sm:bg-transparent">
              <ChainlinkLogo className="w-4 h-4 shrink-0" />
              <span className="font-medium tracking-tight text-zinc-200 text-xs sm:text-xs">Chainlink Oracles</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 sm:p-0 rounded-lg bg-white/[0.03] sm:bg-transparent">
              <UniswapLogo className="w-4 h-4 rounded-full shrink-0" />
              <span className="font-medium tracking-tight text-zinc-200 text-xs sm:text-xs">Uniswap V3</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 sm:p-0 rounded-lg bg-white/[0.03] sm:bg-transparent">
              <BaseLogo className="w-4 h-4 shrink-0" fill="#0052FF" />
              <span className="font-medium tracking-tight text-zinc-200 text-xs sm:text-xs">Base ERC-8021</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FROSTED BLUR WRAPPER FOR ALL SUBSEQUENT SECTIONS */}
      {/* Softly blurs the background video for clean contrast and zero visual noise */}
      <div className="relative z-10 w-full backdrop-blur-2xl bg-[#060a14]/85 border-t border-white/10">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-20 md:py-28 space-y-28 md:space-y-36">

          {/* SECTION 1: LIVE B20 MARKETS TICKER (Core Product Showcase) */}
          <section id="markets" className="space-y-6 scroll-mt-24">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <Badge variant="outline" className="gap-1.5 px-3.5 py-1 text-xs font-mono font-medium backdrop-blur-md shadow-sm">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Markets Terminal</span>
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-2 drop-shadow-md">
                  Active Coinbase B20 Markets on Base
                </h2>
                <p className="text-xs md:text-sm text-zinc-400 mt-1 font-normal">
                  Real-time decentralized exchange liquidity benchmarked against official equity prints.
                </p>
              </div>

              {/* Controls & Terminal CTA */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/markets"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-zinc-200 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Full Terminal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>

                <div className="px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center gap-2 text-xs">
                  <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-zinc-300 font-medium text-[11px]">Open:</span>
                  <ToggleSwitch
                    checked={forceOpen}
                    onChange={(next) => {
                      setForceOpen(next);
                      fetchMarkets(false, forceStale, next);
                    }}
                    size="sm"
                    activeColor="#10b981"
                  />
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center gap-2 text-xs">
                  <Sliders className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-zinc-300 font-medium text-[11px]">Stale:</span>
                  <ToggleSwitch
                    checked={forceStale}
                    onChange={(next) => {
                      setForceStale(next);
                      fetchMarkets(false, next, forceOpen);
                    }}
                    size="sm"
                    activeColor="#d97706"
                  />
                </div>

                <button
                  onClick={() => fetchMarkets(true)}
                  disabled={isRefreshing}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Ticker Cards Grid */}
            {isInitialLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-44 rounded-2xl bg-zinc-900/40 border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {markets.map((m) => {
                  const absPremium = Math.abs(m.premiumBps);
                  const isRich = m.premiumBps > 0;
                  const isOverCap = absPremium > 50;

                  return (
                    <Link
                      key={m.stock.symbol}
                      href={`/trade/${m.stock.symbol}`}
                      className="rounded-2xl hairline-card hairline-frame p-5 space-y-4 transition group block relative"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <StockLogo
                            symbol={m.stock.symbol}
                            size="md"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-zinc-100 group-hover:text-white transition text-base">
                                {m.stock.symbol}
                              </span>
                              <Badge variant="secondary" className="text-[10px] font-mono py-0.5 px-1.5 font-normal">
                                {m.stock.underlying}
                              </Badge>
                            </div>
                            <p className="text-xs text-zinc-400 truncate max-w-[150px]">{m.stock.name}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-bold font-mono text-zinc-100">
                            {m.dexPriceUsd > 0 ? `$${m.dexPriceUsd.toFixed(2)}` : "—"}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">DEX Mid</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-400">Chainlink Print</span>
                          <span className="text-zinc-200 font-mono font-medium">
                            {m.fairPriceUsd > 0 ? `$${m.fairPriceUsd.toFixed(2)}` : "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-400">DEX vs Fair Value</span>
                          <span
                            className={`font-mono font-bold ${
                              m.dexPriceUsd <= 0
                                ? "text-zinc-500"
                                : isOverCap
                                ? "text-rose-400"
                                : isRich
                                ? "text-amber-400"
                                : "text-emerald-400"
                            }`}
                          >
                            {m.dexPriceUsd <= 0 ? "No Pool" : `${m.premiumBps > 0 ? `+${m.premiumBps}` : m.premiumBps} bps`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <Badge
                          variant={m.feed.status === "LIVE" ? "success" : "warning"}
                          className="text-[10px] font-mono py-0.5 px-2"
                        >
                          {m.feed.status === "LIVE" ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>LIVE FEED</span>
                            </>
                          ) : (
                            <>
                              <PauseCircle className="w-3 h-3 text-amber-400" />
                              <span>FEED HELD</span>
                            </>
                          )}
                        </Badge>

                        <span className="text-zinc-300 font-semibold group-hover:text-white group-hover:translate-x-0.5 transition flex items-center gap-1">
                          <span>Trade Ticket</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* SECTION 2: 3-PILLAR EXECUTION GUARDRAIL (How FairTick Works) */}
          <section id="guardrails" className="space-y-8 scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="outline" className="gap-1.5 px-3.5 py-1 text-xs font-mono font-medium backdrop-blur-md shadow-sm">
                <Activity className="w-3.5 h-3.5 text-zinc-400" />
                <span>Execution Standard</span>
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Three Pillars of Trade Protection
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-normal">
                Every swap routed through FairTick is guarded against off-market gouging, allowance drains, and corporate action misalignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="rounded-2xl hairline-card hairline-frame p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-emerald-400">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-zinc-400">01 / CALIBRATION</div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Independent Oracle Benchmark
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Queries official Chainlink equity total-return oracles on Base before swap generation. Evaluates whether equity exchanges are open or closed and holds official closing prints over weekends.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl hairline-card hairline-frame p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-zinc-400">02 / CIRCUIT BREAKER</div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  50 bps Spread Circuit Breaker
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  If decentralized pool prices drift more than +50 bps above the official benchmark, swap execution is automatically locked. Defends traders from predatory off-hours spreads and MEV sandwiches.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl hairline-card hairline-frame p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-sky-400">
                  <Route className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-zinc-400">03 / ATOMIC ROUTING</div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  SwapRouter02 & Exact Approvals
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Routes directly to Uniswap V3 on Base with zero protocol hop fees. Enforces exact token dollar approvals (never maxUint256) and appends standardized Base ERC-8021 builder attribution.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: INTERACTIVE EXECUTION SIMULATOR (Proof Stage) */}
          <section id="proof-stage" className="scroll-mt-32">
            <ProofStage />
          </section>

          {/* SECTION 4: COMPARISON MATRIX (Blind DEX vs FairTick) */}
          <section id="comparison" className="scroll-mt-32">
            <ComparisonMatrix />
          </section>

          {/* SECTION 5: CORE ARCHITECTURE (Bento Grid) */}
          <section id="features" className="scroll-mt-32">
            <BentoFeatures />
          </section>

          {/* SECTION 6: TECHNICAL FAQ */}
          <section id="faq" className="scroll-mt-32">
            <TechnicalFAQ />
          </section>

        </div>
      </div>
    </div>
  );
}
