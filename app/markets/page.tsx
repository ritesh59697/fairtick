"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TokenMarketSummary } from "@/app/api/markets/route";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  AlertOctagon,
  RefreshCw,
  Sliders,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  PauseCircle,
  Activity,
} from "lucide-react";
import { StockLogo } from "@/components/StockLogo";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { Badge } from "@/components/ui/badge";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-10 pb-20 space-y-8">
      {/* Sleek, Calibrated Terminal Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full btn-back-home text-xs font-medium transition cursor-pointer"
              title="Return to FairTick Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Homepage</span>
            </Link>
            <Badge variant="secondary" className="font-mono text-xs font-normal">
              {displayedMarkets.length} assets {showAll ? "(All)" : "(Priority)"}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Active Coinbase B20 Markets on Base
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            Real-time decentralized exchange liquidity benchmarked against official equity feeds.
            Guards execution against off-hours spread drift and predatory DEX markups.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Market Hours Status & Simulation Toggle */}
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
              title="Toggle between real-world after-hours (HELD) and simulated regular trading hours (LIVE)"
              activeColor="#10b981"
            />
          </div>

          {/* Demo Force Stale Toggle */}
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
              title="Simulate stale oracle feed to test safety lockout"
              activeColor="#d97706"
            />
          </div>

          <button
            onClick={() => fetchMarkets(true)}
            disabled={isRefreshing}
            className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Live Decentralized Liquidity Benchmarks</span>
        </div>
        {lastRefreshed && (
          <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>Synced {lastRefreshed.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Market Cards Grid */}
      {isInitialLoading && displayedMarkets.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-zinc-900/40 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedMarkets.map((m) => {
            const absPremium = Math.abs(m.premiumBps);
            const isRich = m.premiumBps > 0;
            const isOverCap = absPremium > 50;

            return (
              <Link
                key={m.stock.symbol}
                href={`/trade/${m.stock.symbol}`}
                className="rounded-2xl hairline-card hairline-frame p-5 space-y-4 transition group block relative hover:border-zinc-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <StockLogo symbol={m.stock.symbol} size="md" />
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
                  {m.multiplierNumber !== 1 && (
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                      <span className="text-zinc-400">Split Multiplier</span>
                      <span className="text-zinc-300 font-mono font-medium">
                        {m.multiplierNumber.toFixed(4)}x
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <Badge
                    variant={
                      m.feed.status === "LIVE"
                        ? "success"
                        : m.feed.status === "HELD"
                        ? "warning"
                        : "destructive"
                    }
                    className="text-[10px] font-mono py-0.5 px-2"
                  >
                    {m.feed.status === "LIVE" ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>LIVE FEED</span>
                      </>
                    ) : m.feed.status === "HELD" ? (
                      <>
                        <PauseCircle className="w-3 h-3 text-amber-400" />
                        <span>FEED HELD</span>
                      </>
                    ) : (
                      <>
                        <AlertOctagon className="w-3 h-3 text-rose-400" />
                        <span>FEED STALE</span>
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

      {/* Toggle View All */}
      {secondaryMarkets.length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-semibold transition cursor-pointer"
          >
            {showAll ? "Show 6 Priority Assets Only" : `Show All ${markets.length} Tokenized Assets`}
          </button>
        </div>
      )}
    </div>
  );
}
