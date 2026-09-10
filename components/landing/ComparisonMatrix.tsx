"use client";

import React, { useState } from "react";
import {
  Clock,
  Split,
  KeyRound,
  Route,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ComparisonMatrix() {
  const [activeTab, setActiveTab] = useState<"fairtick" | "blind" | "sidebyside">("fairtick");

  const capabilities = [
    {
      id: "spread",
      title: "After-Hours Spread Defense",
      icon: Clock,
      category: "Pricing & Slippage",
      blind: {
        headline: "Uncalibrated Blind Swaps",
        detail: "Executes at arbitrary AMM liquidity curve prices. When US equity markets close on nights and weekends, thin liquidity pools regularly drift +50 to +200 bps above real equity value, causing immediate capital gouging.",
        status: "Exposed to +200 bps drift",
        severity: "danger",
      },
      fairtick: {
        headline: "Chainlink Oracle Safety Gate",
        detail: "Continuously checks official Chainlink equity total-return feeds on Base. If pool price deviates by more than +50 bps from the official closing print, execution automatically locks with clear warning telemetry.",
        status: "Hard 50 bps Circuit Breaker",
        severity: "success",
      },
    },
    {
      id: "split",
      title: "Corporate Stock Split Multiplier",
      icon: Split,
      category: "Asset Calibration",
      blind: {
        headline: "1:1 Balance Assumption",
        detail: "Naive DEX interfaces assume 1 token = 1 share perpetually. When a company executes a 4:1 stock split, standard routers quote without scaling, causing severe unit miscalculations.",
        status: "Unsynchronized Share Value",
        severity: "danger",
      },
      fairtick: {
        headline: "Onchain tokenToSharesMultiplier()",
        detail: "Directly reads the Coinbase B20 token contract multiplier on Base to compute exact effective equity share quantities, ensuring true economic parity post-split.",
        status: "Continuous Multiplier Sync",
        severity: "success",
      },
    },
    {
      id: "approval",
      title: "Smart Contract Allowance Scope",
      icon: KeyRound,
      category: "Wallet Security",
      blind: {
        headline: "Infinite Dollar Approval (maxUint256)",
        detail: "Most DEX aggregators prompt users to approve infinite funds (2^256 - 1) for convenience. This leaves your entire wallet's USDC balance exposed to potential future smart contract exploits.",
        status: "Infinite Account Exposure",
        severity: "danger",
      },
      fairtick: {
        headline: "Exact Single-Transaction Approvals",
        detail: "FairTick never requests infinite approvals. Every permit or ERC-20 approval is strictly scoped to the exact trade amount (e.g. exactly 5.000000 USDC), leaving zero residual allowance.",
        status: "Zero Residual Allowance",
        severity: "success",
      },
    },
    {
      id: "routing",
      title: "Attribution & Execution Router",
      icon: Route,
      category: "Protocol Integrity",
      blind: {
        headline: "Opaque Routing & Extra Cuts",
        detail: "Aggregators frequently route through proprietary middleman contracts that take opaque fees, insert intermediary hops, and introduce sandwich attack vectors.",
        status: "Intermediary Fee Layers",
        severity: "danger",
      },
      fairtick: {
        headline: "Uniswap V3 + Base ERC-8021 Suffix",
        detail: "Direct atomic execution via official Uniswap V3 SwapRouter02 on Base with zero protocol hop fees. Appends standard ERC-8021 builder attribution directly to calldata.",
        status: "Direct Atomic SwapRouter02",
        severity: "success",
      },
    },
    {
      id: "geofence",
      title: "Regulatory Compliance & Jurisdiction",
      icon: Globe,
      category: "Compliance",
      blind: {
        headline: "Zero Compliance Verification",
        detail: "Leaves users in restricted jurisdictions (US and OFAC sanctioned regions) vulnerable to interacting with tokenized security products in violation of terms.",
        status: "Unverified Jurisdiction",
        severity: "danger",
      },
      fairtick: {
        headline: "Fail-Closed Automated Geofencing",
        detail: "Edge-computed IP verification blocks US and sanctioned IP requests before trade tickets can generate, preserving regulatory safety for Coinbase B20 assets.",
        status: "Enforced Fail-Closed Edge Check",
        severity: "success",
      },
    },
  ];

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
          03 / EXECUTION INTEGRITY
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          How FairTick Protects Your Capital
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed font-normal">
          Toggle between standard blind DEX execution and FairTick’s active guardrail architecture.
        </p>

        {/* Interactive Segmented Switcher (Arrakis Pill Style) */}
        <div className="inline-flex items-center p-1 rounded-full bg-slate-200/80 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 backdrop-blur-md mt-2">
          <button
            onClick={() => setActiveTab("fairtick")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === "fairtick"
                ? "bg-white text-slate-900 dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            FairTick Guarded
          </button>
          <button
            onClick={() => setActiveTab("blind")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === "blind"
                ? "bg-rose-100 text-rose-700 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Standard Blind Swap
          </button>
          <button
            onClick={() => setActiveTab("sidebyside")}
            className={`hidden sm:inline-block px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === "sidebyside"
                ? "bg-white text-slate-900 dark:bg-white/[0.12] dark:text-white font-bold border border-slate-300 dark:border-white/20 shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      {/* VIEW 1: FAIRTICK GUARDED PIPELINE */}
      {activeTab === "fairtick" && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/60 shadow-xl shadow-slate-200/40 dark:shadow-none backdrop-blur-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.06] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                  Active Guardrail Pipeline
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Institutional Trade Protection on Base
              </h3>
            </div>
            <div className="text-xs text-slate-600 dark:text-zinc-400 font-mono bg-slate-100 dark:bg-white/[0.03] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.06] self-start sm:self-auto">
              Slippage Bound: <span className="text-blue-600 dark:text-blue-400 font-bold">50 bps Max</span>
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-white/[0.06]">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.id} className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{c.title}</h4>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">{c.category}</p>
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-1 pl-11 md:pl-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        {c.fairtick.headline}
                      </span>
                      <span className="text-[10px] font-mono text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.02]">
                        {c.fairtick.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed pt-1">
                      {c.fairtick.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-700 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Result: Guaranteed execution parity with traditional US equity brokers.</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">0% Protocol Hop Fees</span>
          </div>
        </div>
      )}

      {/* VIEW 2: STANDARD BLIND DEX SWAP */}
      {activeTab === "blind" && (
        <div className="rounded-2xl border border-rose-200 dark:border-rose-500/20 bg-rose-50/70 dark:bg-rose-950/[0.08] shadow-lg shadow-rose-100/40 dark:shadow-none backdrop-blur-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200/80 dark:border-rose-500/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600 dark:bg-rose-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 font-semibold">
                  Unguarded AMM Execution
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Vulnerabilities of Naive DEX Trading
              </h3>
            </div>
            <div className="text-xs text-rose-800 dark:text-rose-300/80 font-mono bg-rose-100/90 dark:bg-rose-950/30 px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-500/20 self-start sm:self-auto">
              Exposure: <span className="text-rose-700 dark:text-rose-400 font-bold">Uncapped Drift</span>
            </div>
          </div>

          <div className="divide-y divide-rose-200/80 dark:divide-rose-500/10">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.id} className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{c.title}</h4>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">{c.category}</p>
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-1 pl-11 md:pl-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        {c.blind.headline}
                      </span>
                      <span className="text-[10px] font-mono text-rose-800 dark:text-rose-300/70 border border-rose-200 dark:border-rose-500/20 px-2 py-0.5 rounded-md bg-rose-100/90 dark:bg-rose-950/20">
                        {c.blind.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed pt-1">
                      {c.blind.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-rose-100/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 flex items-center justify-between text-xs text-slate-700 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Result: Traders bear full risk of off-hours liquidity gouging and balance drain.</span>
            </span>
            <span className="text-[11px] font-mono text-rose-700 dark:text-rose-400/80">High Slippage Risk</span>
          </div>
        </div>
      )}

      {/* VIEW 3: SIDE-BY-SIDE CLEAN DUAL COLUMNS */}
      {activeTab === "sidebyside" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blind Swap Card */}
          <div className="rounded-2xl border border-rose-200 dark:border-white/[0.08] bg-rose-50/70 dark:bg-zinc-950/40 p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-rose-200/80 dark:border-white/[0.06] pb-4">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Blind DEX Swap</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">Uncalibrated AMM</span>
            </div>

            <div className="space-y-4">
              {capabilities.map((c) => (
                <div key={c.id} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-zinc-200 font-medium">{c.title}</span>
                    <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400/80">{c.blind.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">{c.blind.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FairTick Guarded Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-zinc-950/80 p-6 space-y-6 shadow-xl shadow-slate-200/50 dark:shadow-black/40 relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>FairTick Guarded Execution</span>
              </div>
              <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">Chainlink Enforced</span>
            </div>

            <div className="space-y-4">
              {capabilities.map((c) => (
                <div key={c.id} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-white font-medium">{c.title}</span>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">{c.fairtick.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed">{c.fairtick.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
