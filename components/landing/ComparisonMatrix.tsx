"use client";

import React, { useState } from "react";
import { Check, X, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";

export function ComparisonMatrix() {
  const [selectedView, setSelectedView] = useState<"both" | "fairtick" | "naive">("both");

  const rows = [
    {
      label: "After-Hours Spread Defense",
      desc: "Protects buyers when traditional US stock exchanges are closed on nights & weekends",
      naive: {
        supported: false,
        text: "Blind execution. Swaps fill at arbitrary +50 to +200 bps predatory DEX markups.",
      },
      fairtick: {
        supported: true,
        text: "Automated 50 bps safety lockout against official Chainlink equity benchmark.",
      },
    },
    {
      label: "Stock Split & Multiplier Awareness",
      desc: "Handles corporate stock splits without balance miscalculation",
      naive: {
        supported: false,
        text: "Assumes 1 Token = 1 Share forever. Misquotes equity exposure post-split.",
      },
      fairtick: {
        supported: true,
        text: "Reads tokenToSharesMultiplier() onchain to quote exact scaled equity shares.",
      },
    },
    {
      label: "Wallet Approval Safety",
      desc: "Minimizes smart contract balance exposure in Web3 wallets",
      naive: {
        supported: false,
        text: "Requests maxUint256 (infinite dollar approval), exposing your wallet funds.",
      },
      fairtick: {
        supported: true,
        text: "Strict exact-amount approvals only (e.g. exactly 5.00 USDC).",
      },
    },
    {
      label: "Onchain Execution Standard",
      desc: "Target router and attribution format",
      naive: {
        supported: false,
        text: "Non-standard routers with added protocol cuts and opaque slippage.",
      },
      fairtick: {
        supported: true,
        text: "Direct Uniswap V3 SwapRouter02 with standard Base ERC-8021 attribution.",
      },
    },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The FairTick Standard</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
          Why Blind DEX Swaps Cost You Money
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
          See how FairTick transforms onchain equity trading from high-risk speculation into institutional-grade execution.
        </p>
      </div>

      <div className="rounded-2xl hairline-card hairline-frame overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-800/80 bg-zinc-950/60 text-xs font-semibold">
          <div className="md:col-span-5 p-4 text-zinc-400">Execution Capability</div>
          <div className="md:col-span-3 p-4 text-zinc-500 hidden md:block">Unprotected Naive Swap</div>
          <div className="md:col-span-4 p-4 text-blue-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>FairTick Protected Execution</span>
          </div>
        </div>

        <div className="divide-y divide-zinc-800/60">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-5 gap-4 items-center hover:bg-zinc-900/40 transition"
            >
              <div className="md:col-span-5 space-y-1">
                <div className="text-sm font-bold text-zinc-200">{row.label}</div>
                <div className="text-xs text-zinc-400">{row.desc}</div>
              </div>

              <div className="md:col-span-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[11px]">
                  <X className="w-3.5 h-3.5" />
                  <span>Unprotected</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">{row.naive.text}</p>
              </div>

              <div className="md:col-span-4 p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[11px]">
                  <Check className="w-3.5 h-3.5" />
                  <span>FairTick Enforced</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">{row.fairtick.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
