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
    {
      label: "Regulatory Non-US Geofencing",
      desc: "Mandatory compliance for Coinbase B20 tokenized security tokens",
      naive: {
        supported: false,
        text: "Zero jurisdiction awareness. Leaves US users exposed to illicit transaction attempts.",
      },
      fairtick: {
        supported: true,
        text: "Automated fail-closed geo-fencing (blocks US IPs and OFAC sanctioned regions).",
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
        {/* Desktop Table Header */}
        <div className="hidden md:grid md:grid-cols-12 border-b border-zinc-800/80 bg-zinc-950/70 text-xs font-semibold">
          <div className="md:col-span-5 p-4 text-zinc-400">Execution Capability</div>
          <div className="md:col-span-3 p-4 text-rose-400/90 flex items-center gap-1.5 border-l border-zinc-850/60">
            <X className="w-3.5 h-3.5" />
            <span>Blind Naive DEX Swap</span>
          </div>
          <div className="md:col-span-4 p-4 text-blue-400 flex items-center gap-1.5 border-l border-zinc-850/60 bg-blue-950/20">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>FairTick Protected Execution</span>
          </div>
        </div>

        <div className="divide-y divide-zinc-850/60">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-5 gap-4 items-center hover:bg-zinc-900/30 transition"
            >
              <div className="md:col-span-5 space-y-1">
                <div className="text-sm font-bold text-zinc-200">{row.label}</div>
                <div className="text-xs text-zinc-400 leading-relaxed">{row.desc}</div>
              </div>

              {/* Naive column */}
              <div className="md:col-span-3 p-3.5 rounded-xl bg-rose-950/15 border border-rose-900/30 text-xs space-y-1 md:border-l md:border-zinc-850/60">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px] uppercase tracking-wider">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>Unprotected</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed pt-0.5">{row.naive.text}</p>
              </div>

              {/* FairTick column */}
              <div className="md:col-span-4 p-3.5 rounded-xl bg-blue-950/25 border border-blue-500/30 ring-1 ring-blue-500/20 shadow-md shadow-blue-500/5 text-xs space-y-1 md:border-l md:border-blue-500/20">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>FairTick Enforced</span>
                </div>
                <p className="text-zinc-200 text-[11px] leading-relaxed pt-0.5">{row.fairtick.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
