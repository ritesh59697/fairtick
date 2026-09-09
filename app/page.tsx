"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TokenMarketSummary } from "@/app/api/markets/route";
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
} from "lucide-react";
import { StockLogo } from "@/components/StockLogo";

// Client-side cache to make back-navigation and re-renders instantaneous
let clientSideMarketsCache: TokenMarketSummary[] = [];

export default function MarketListPage() {
  const [markets, setMarkets] = useState<TokenMarketSummary[]>(() => clientSideMarketsCache);
  const [isInitialLoading, setIsInitialLoading] = useState(() => clientSideMarketsCache.length === 0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAll, setShowAll] = useState(false);
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

  const priorityMarkets = markets.filter((m) => m.stock.isPriority);
  const secondaryMarkets = markets.filter((m) => !m.stock.isPriority);
  const displayedMarkets = showAll ? markets : priorityMarkets;

  return (
    <div className="space-y-8">
      {/* Hero Banner with value prop */}
      <div className="relative rounded-2xl bg-gradient-to-b from-blue-950/40 via-zinc-900/60 to-zinc-950 border border-zinc-800 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              Fairness Engine for Coinbase Tokenized Stocks on Base
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-zinc-100 tracking-tight">
              Don’t overpay for onchain Apple.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Tokenized equities trade 24/7 on Base DEXs, but official equity feeds freeze after-hours. FairTick guards your execution against stale prints, paused corporate feeds, and rich DEX markups.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Market Hours Status & Simulation Toggle */}
            <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-zinc-300 font-medium">Simulate Market Open:</span>
              </div>
              <button
                onClick={() => {
                  const next = !forceOpen;
                  setForceOpen(next);
                  fetchMarkets(false, forceStale, next);
                }}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  forceOpen ? "bg-emerald-600" : "bg-zinc-700"
                }`}
                title="Toggle between real-world after-hours (HELD) and simulated regular trading hours (LIVE)"
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    forceOpen ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Demo Force Stale Toggle for Loom Presentation */}
            <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-zinc-300 font-medium">Demo Stale Feed:</span>
              </div>
              <button
                onClick={() => {
                  const next = !forceStale;
                  setForceStale(next);
                  fetchMarkets(false, next, forceOpen);
                }}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  forceStale ? "bg-amber-600" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    forceStale ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => fetchMarkets(true)}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Market Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-zinc-100">Live Equities on Base</h2>
            <span className="text-xs text-zinc-400 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              {displayedMarkets.length} assets
            </span>
          </div>

          {lastRefreshed && (
            <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Synced {lastRefreshed.toLocaleTimeString()}
            </div>
          )}
        </div>

        {isInitialLoading && displayedMarkets.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-5 space-y-4 animate-pulse"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="w-20 h-5 bg-zinc-800 rounded" />
                    <div className="w-32 h-3.5 bg-zinc-800/60 rounded" />
                  </div>
                  <div className="w-16 h-5 bg-zinc-800/80 rounded-full" />
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-lg space-y-2 border border-zinc-850">
                  <div className="flex justify-between">
                    <div className="w-20 h-3 bg-zinc-800 rounded" />
                    <div className="w-16 h-3 bg-zinc-800 rounded" />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-24 h-3 bg-zinc-800 rounded" />
                    <div className="w-16 h-3 bg-zinc-800 rounded" />
                  </div>
                </div>
                <div className="w-full h-9 bg-zinc-800/40 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedMarkets.map((m) => {
            const isDiscount = m.premiumBps < 0;
            const isRich = m.premiumBps > 0;
            const absBps = Math.abs(m.premiumBps);

            return (
              <div
                key={m.stock.symbol}
                className="group relative rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 p-5 transition-all flex flex-col justify-between hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <StockLogo symbol={m.stock.symbol} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-zinc-100 group-hover:text-blue-400 transition">
                            {m.stock.symbol}
                          </span>
                          <span className="text-xs text-zinc-500 font-mono">
                            {m.stock.underlying}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400 truncate max-w-[160px]">
                          {m.stock.name}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="shrink-0">
                      {m.feed.status === "LIVE" ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE FEED
                        </span>
                      ) : m.feed.status === "HELD" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          FEED HELD
                        </span>
                      ) : m.feed.status === "STALE" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
                          <AlertOctagon className="w-2.5 h-2.5" />
                          STALE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                          UNAVAILABLE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Premium Matrix */}
                  <div className="bg-zinc-950/80 rounded-lg p-3 border border-zinc-850 space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Onchain DEX Mid:</span>
                      <span className="font-mono font-bold text-zinc-100">
                        {m.dexPriceUsd > 0 ? (
                          `$${m.dexPriceUsd.toFixed(2)}`
                        ) : (
                          <span className="text-zinc-500 text-[11px] font-normal">No Active Pool</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Chainlink Total-Return:</span>
                      <span className="font-mono text-zinc-300">
                        {m.fairPriceUsd > 0 ? `$${m.fairPriceUsd.toFixed(2)}` : "—"}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-zinc-850 flex items-center justify-between text-xs">
                      <span className="text-zinc-400">DEX Premium:</span>
                      <div className="flex items-center gap-1 font-mono font-bold">
                        {m.dexPriceUsd <= 0 ? (
                          <span className="text-zinc-500 font-normal text-xs">—</span>
                        ) : isDiscount ? (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <TrendingDown className="w-3 h-3" />
                            -{absBps} bps (Cheap)
                          </span>
                        ) : isRich ? (
                          <span className="text-rose-400 flex items-center gap-0.5">
                            <TrendingUp className="w-3 h-3" />
                            +{absBps} bps (Rich)
                          </span>
                        ) : (
                          <span className="text-zinc-400">0 bps (At Par)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Multiplier Info */}
                  <div className="text-[11px] text-zinc-500 flex items-center justify-between px-1 mb-4">
                    <span>B20 Multiplier:</span>
                    <span className="font-mono text-zinc-400">
                      {m.multiplierNumber.toFixed(4)}x
                    </span>
                  </div>
                </div>

                {/* Ticket Link CTA */}
                <Link
                  href={`/trade/${m.stock.symbol}`}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 border shadow ${
                    m.stock.poolAddress && m.dexPriceUsd > 0
                      ? "bg-zinc-800 hover:bg-blue-600 text-zinc-200 hover:text-white group-hover:border-blue-500 border-transparent"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                  }`}
                >
                  {m.stock.poolAddress && m.dexPriceUsd > 0 ? "Open Trade Ticket" : "View Details (No Pool)"}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            );
          })}
        </div>
        )}

        {/* View all button */}
        {!showAll && secondaryMarkets.length > 0 && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition"
            >
              Show all {markets.length} tokenized assets
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
