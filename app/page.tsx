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
    <div className="relative w-full">
      {/* Background Video Theme: Edge of the Universe (Fixed behind entire landing page) */}
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
        {/* Atmospheric cosmic scrim to ensure text & card contrast while keeping the universe video vivid */}
        <div className="absolute inset-0 bg-slate-950/65" />
      </div>

      {/* 1. FULL-WIDTH HERO SECTION (Over Edge-of-the-Universe Video Background) */}
      <section className="w-full border-b border-white/10 py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative z-10 overflow-hidden">
        {/* Subtle dot matrix watermark background */}
        <div className="absolute inset-0 clarasight-dot-pattern pointer-events-none opacity-20" />

        {/* Ambient illumination glow spot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center">
          {/* Centered Top Announcement Pill */}
          <div className="flex justify-center">
            <a
              href="https://sepolia.basescan.org/tx/0x7e63edbdc4720fe77431e20ee83267c0d64fb03007530138d00c06d0b2101ab8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#33406E]/70 border border-white/20 text-xs text-blue-100 hover:text-white hover:border-white/40 transition backdrop-blur-md shadow-lg shadow-black/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
              <span>FairTick launches Base B20 Guardrails</span>
              <span className="text-white/30">|</span>
              <span className="text-white font-semibold inline-flex items-center gap-1">
                Verified onchain <ChevronRight className="w-3 h-3" />
              </span>
            </a>
          </div>

          {/* Multi-line Headline: Crisp Pure White, Authoritative, Centered */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12] text-center max-w-4xl mx-auto drop-shadow-md">
            The execution guardrail
            <br className="hidden sm:block" />
            {" "}for onchain Apple and
            <br className="hidden sm:block" />
            {" "}tokenized US stocks
          </h1>

          {/* Centered Subheadline in Soft Periwinkle/White */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-center max-w-2xl mx-auto font-normal drop-shadow-sm">
            Purpose-built operating guardrails for Base B20 tokenized equities. Defending against weekend spread drift, uncalibrated stock splits, and predatory DEX markups.
          </p>

          {/* Centered Action Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/markets"
              className="clarasight-pill-btn px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl shadow-blue-950/40 inline-flex items-center gap-2"
            >
              <span>Launch Terminal</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </Link>

            <Link
              href="#proof-stage"
              className="clarasight-pill-btn px-8 py-3.5 bg-slate-950/40 hover:bg-slate-950/60 border border-white/20 text-white font-semibold text-sm backdrop-blur-md inline-flex items-center gap-1.5 shadow-lg shadow-black/10"
            >
              <span>See how it works</span>
              <ChevronRight className="w-4 h-4 text-blue-200" />
            </Link>
          </div>
        </div>

        {/* Protocol Trust Stream */}
        <div className="max-w-4xl mx-auto pt-8 mt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-200 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Coinbase B20 Standard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>Chainlink Equity Feeds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>SwapRouter02 Routing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Base ERC-8021 Suffix</span>
          </div>
        </div>
      </section>

      {/* 2-6. REST OF CONTENT IN CENTERED CONTAINER (Sits cleanly on top of cosmic video bg) */}
      <div className="max-w-6xl w-full mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-24 relative z-10">

      {/* 2. THE PROOF STAGE SIMULATOR (Bursar Order Lifecycle Signature) */}
      <section id="proof-stage" className="scroll-mt-24">
        <ProofStage />
      </section>

      {/* 3. CLARASIGHT-STYLE BENTO GRID (Deep Feature Breakdown) */}
      <section id="features" className="scroll-mt-24">
        <BentoFeatures />
      </section>

      {/* 4. COMPARISON MATRIX (Blind DEX vs FairTick) */}
      <section id="comparison" className="scroll-mt-24">
        <ComparisonMatrix />
      </section>

      {/* 5. LIVE MARKET OVERVIEW (Interactive Ticker Terminal) */}
      <section id="markets" className="space-y-6 pt-4 scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/60 border border-white/20 text-blue-200 text-xs font-mono font-medium backdrop-blur-md shadow-sm">
              <Terminal className="w-3.5 h-3.5" />
              <span>Live Markets Ticker</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1 drop-shadow-md">
              Active Coinbase B20 Markets on Base
            </h2>
            <p className="text-xs text-slate-200/90 mt-1 font-normal">
              Select any tokenized equity below to launch the protected execution ticket.
            </p>
          </div>

          {/* Controls & Terminal CTA */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/markets"
              className="px-3.5 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Full Terminal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2 text-xs">
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

            <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2 text-xs">
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
              className="px-3 py-1.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
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
      </div>
    </div>
  );
}
