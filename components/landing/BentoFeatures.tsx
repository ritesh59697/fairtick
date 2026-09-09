"use client";

import React from "react";
import {
  Layers,
  Scale,
  KeyRound,
  Globe,
  Binary,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoFeatures() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="outline" className="gap-1.5 px-3.5 py-1 text-xs font-mono font-medium backdrop-blur-md shadow-sm">
          <Layers className="w-3.5 h-3.5 text-zinc-400" />
          <span>Core Architecture</span>
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
          Engineered for Real-World Tokenized Equities
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-normal">
          Standard DEX swap interfaces treat tokenized stocks like ordinary volatile meme coins. FairTick is purpose-built for the mechanics of regulated B20 securities on Base.
        </p>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Multiplier Engine (Large 7 cols) */}
        <div className="md:col-span-7 rounded-2xl hairline-card hairline-frame p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-blue-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
              Multiplier-Aware Equity Conversion
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When an underlying stock splits (like NVIDIA&apos;s 10-for-1 forward split), the B20 token contract doesn&apos;t re-mint tokens. Instead, the contract&apos;s internal multiplier scales up. Naive interfaces will misquote your position; FairTick dynamically reads <code className="text-zinc-200 bg-white/10 px-1 py-0.5 rounded font-mono">tokenToSharesMultiplier()</code> to ensure you always receive your exact fractional share count.
            </p>
          </div>

          {/* Visual calculation box */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-[11px]">
              <span>Base B20 Contract Standard</span>
              <span className="text-blue-400 font-semibold">1.0000x Multiplier Active</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-between">
              <span className="text-zinc-300">0.0443 Tokens</span>
              <span className="text-zinc-500">× 1.0000x =</span>
              <span className="text-white font-bold">0.0443 Actual Shares</span>
            </div>
          </div>
        </div>

        {/* Card 2: Zero Infinite Approvals (5 cols) */}
        <div className="md:col-span-5 rounded-2xl hairline-card hairline-frame p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-blue-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
              Strict Exact Approvals
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Most DEX aggregators silently prompt for <code className="text-amber-400 font-mono">maxUint256</code> (infinite dollar approval), exposing your wallet to rogue drainage. FairTick strictly requests authorization for <strong>only the exact dollar amount being swapped</strong>.
            </p>
          </div>

          <div className="p-3 bg-zinc-950/80 border border-white/10 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <div className="text-[11px] font-mono text-zinc-300">
              Allowance Target: <span className="text-blue-400 font-bold">targetAmountUnits</span>
            </div>
          </div>
        </div>

        {/* Card 3: Geo-Fencing Compliance Engine (5 cols) */}
        <div className="md:col-span-5 rounded-2xl hairline-card hairline-frame p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
              Fail-Closed Compliance
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Coinbase Tokenized Stocks (B20) are restricted from US persons and sanctioned jurisdictions. In production, FairTick strictly fails closed: if IP or country headers cannot be verified, the execution gate remains locked.
            </p>
          </div>

          <div className="p-3 bg-zinc-950/80 border border-white/10 rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">OFAC / US Person Gate</span>
            <span className="text-blue-400 font-bold">Enforced (Active Mode)</span>
          </div>
        </div>

        {/* Card 4: Base ERC-8021 Attribution (7 cols) */}
        <div className="md:col-span-7 rounded-2xl hairline-card hairline-frame p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-sky-400">
              <Binary className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
              Native Base ERC-8021 Standard
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              FairTick participates in the Base Ecosystem Builder Attribution framework. By encoding a standardized 16-byte cryptographic suffix into the Uniswap calldata, swaps are verifiable by Base indexing nodes without adding custom smart contract intermediary fees or execution gas overhead.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-950/80 border border-white/10 rounded-xl font-mono text-[11px] text-zinc-400 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Standard: ERC-8021 Schema 0</span>
              <span className="text-sky-400 font-bold">fairtick_b20</span>
            </div>
            <div className="text-[10px] text-zinc-500 truncate">
              Suffix: 0c666169727469636b5f6232300080218021802180218021802180218021
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
