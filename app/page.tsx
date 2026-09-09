"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertOctagon,
  RefreshCw,
  Sliders,
  Layers,
  Sparkles,
  ArrowRight,
  Lock,
  ArrowUpRight,
  Flame,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { StockLogo } from "@/components/StockLogo";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { ProofStage } from "@/components/landing/ProofStage";
import { BentoFeatures } from "@/components/landing/BentoFeatures";
import { ComparisonMatrix } from "@/components/landing/ComparisonMatrix";
import { TechnicalFAQ } from "@/components/landing/TechnicalFAQ";
import { TokenMarketSummary } from "@/app/api/markets/route";

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
    <div className="space-y-16 md:space-y-24 py-6 md:py-10">
      {/* 1. HERO SECTION (Bursar Dusk Gradient + Clarasight Hero Badge) */}
      <section className="relative rounded-3xl bg-dusk-mesh hairline-frame p-8 md:p-14 overflow-hidden space-y-8">
        {/* Subtle radial highlights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          {/* Eyebrow with live pulse dot */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-750 text-xs font-mono font-medium text-zinc-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-400">BASE MAINNET B20</span>
            <span className="text-zinc-600">|</span>
            <span className="text-blue-400 font-semibold">CHAINLINK EQUITIES GUARDRAIL</span>
          </div>

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
            Don’t overpay for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              onchain Apple.
            </span>
          </h1>

          {/* Lede paragraph */}
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl font-normal">
            Coinbase B20 tokenized stocks trade 24/7 on Base, but equity exchanges sleep on nights and weekends.
            FairTick automatically verifies Chainlink feed freshness, halts swaps when off-market DEX markups exceed{" "}
            <strong className="text-white font-semibold">50 bps</strong>, computes stock split multipliers, and routes execution through Uniswap V3 with native Base ERC-8021 builder attribution.
          </p>

          {/* Action CTAs with Double-Label Slide Effect */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#markets"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/25 transition btn-slide"
            >
              <div className="btn-inner">
                <span>Launch Live Terminal</span>
                <span>Trade B20 Equities</span>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/markets"
              className="px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold text-sm transition inline-flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>Full Market Book</span>
            </Link>

            <a
              href="https://sepolia.basescan.org/tx/0x7e63edbdc4720fe77431e20ee83267c0d64fb03007530138d00c06d0b2101ab8"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3.5 rounded-xl text-zinc-400 hover:text-zinc-200 text-xs font-mono font-medium transition inline-flex items-center gap-1.5"
            >
              <span>Verified Onchain Tx (Sepolia)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Protocol Trust Stream */}
        <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-zinc-400 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Coinbase B20 Standard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Chainlink Equity Feeds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>SwapRouter02 Routing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Base ERC-8021 Suffix</span>
          </div>
        </div>
      </section>

      {/* 2. THE PROOF STAGE SIMULATOR (Bursar Order Lifecycle Signature) */}
      <ProofStage />

      {/* 3. CLARASIGHT-STYLE BENTO GRID (Deep Feature Breakdown) */}
      <BentoFeatures />

      {/* 4. COMPARISON MATRIX (Blind DEX vs FairTick) */}
      <ComparisonMatrix />

      {/* 5. LIVE MARKET OVERVIEW (Interactive Ticker Terminal) */}
      <section id="markets" className="space-y-6 pt-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
              <Terminal className="w-3.5 h-3.5" />
              <span>Live Terminal</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mt-1">
              Active Coinbase B20 Markets on Base
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Select any tokenized equity below to launch the protected execution ticket.
            </p>
          </div>

          {/* Toggles using Custom Uiverse component */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2.5 text-xs">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-300 font-medium">Simulate Market Open:</span>
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

            <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2.5 text-xs">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-300 font-medium">Demo Stale Feed:</span>
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
              className="px-3.5 py-2 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Ticker Cards Grid */}
        {isInitialLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 animate-pulse" />
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
                  className="rounded-2xl hairline-card hairline-frame p-5 space-y-4 hover:border-zinc-700 transition group block relative"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <StockLogo
                        symbol={m.stock.symbol}
                        size="md"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-100 group-hover:text-blue-400 transition text-base">
                            {m.stock.symbol}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-850 px-1.5 py-0.5 rounded">
                            {m.stock.underlying}
                          </span>
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

                  <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1.5">
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
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                        m.feed.status === "LIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {m.feed.status === "LIVE" ? "LIVE FEED" : "FEED HELD"}
                    </span>

                    <span className="text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Trade Ticket</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. TECHNICAL FAQ */}
      <TechnicalFAQ />

      {/* 7. INSTITUTIONAL FOOTER */}
      <footer className="pt-10 border-t border-zinc-800/80 space-y-6 text-xs text-zinc-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-200">FairTick</span>
              <span className="text-[10px] font-mono bg-zinc-850 px-1.5 py-0.5 rounded text-zinc-400">
                Base B20 Execution Standard
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Fair price discovery and oracle-protected execution for Coinbase Tokenized Stocks on Base.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
            <a
              href="https://docs.base.org/specifications/b20/tokenized-stocks-on-base"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition underline"
            >
              Base B20 Specification
            </a>
            <a
              href="https://github.com/ritesh59697/fairtick"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition underline"
            >
              GitHub Source
            </a>
            <a
              href="https://sepolia.basescan.org/tx/0x7e63edbdc4720fe77431e20ee83267c0d64fb03007530138d00c06d0b2101ab8"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition underline"
            >
              Verified Tx Receipt
            </a>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-850 text-[11px] leading-relaxed text-zinc-500">
          FairTick is an open-source execution routing interface for existing Coinbase Tokenized Stocks (B20) on Base. It is not a broker-dealer, not an offer of securities, and not available to US persons. Tokenized stocks are issued by Coinbase and only available to eligible users in permitted non-US jurisdictions.
        </div>
      </footer>
    </div>
  );
}
