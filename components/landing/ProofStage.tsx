"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Clock,
  Terminal,
} from "lucide-react";

export function ProofStage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [spreadScenario, setSpreadScenario] = useState<"normal" | "spiked">("spiked");

  const steps = [
    {
      num: "01",
      title: "Chainlink Feed Check",
      desc: "Live print & freshness validation before quote",
    },
    {
      num: "02",
      title: "50 bps Safety Gate",
      desc: "Instant lockout on off-hours market gouging",
    },
    {
      num: "03",
      title: "SwapRouter02 Routing",
      desc: "Exact-approval execution directly on Base",
    },
    {
      num: "04",
      title: "ERC-8021 Attribution",
      desc: "Cryptographic builder attribution suffix",
    },
  ];

  return (
    <div className="rounded-2xl hairline-card hairline-frame p-6 md:p-8 space-y-6 relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Interactive Execution Simulator
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight mt-1">
            How FairTick Protects Every Trade
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Replay the automated defense pipeline enforced on every tokenized equity swap.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 self-start md:self-auto">
          <span className="text-[11px] font-mono text-zinc-300 bg-zinc-900 border border-white/10 px-3 py-1 rounded-lg">
            Base Mainnet (8453)
          </span>
        </div>
      </div>

      {/* Step Tabs (Full-width 4-column grid, responsive, no truncation) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all relative group cursor-pointer ${
                isActive
                  ? "bg-white/[0.09] border-white/30 shadow-lg shadow-black/40 text-white"
                  : "bg-zinc-900/50 border-white/5 hover:border-white/15 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  Step {s.num}
                </span>
                {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
              </div>
              <div className={`text-xs font-bold leading-snug ${isActive ? "text-zinc-100" : "text-zinc-300"}`}>
                {s.title}
              </div>
              <div className="text-[11px] text-zinc-400 truncate mt-1">
                {s.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Panel Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[300px]">
        {/* Left: Explanation & Technical Rationale */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-zinc-300 text-xs font-mono font-medium">
            <span>Step {steps[activeStep].num} of 04</span>
          </div>

          <h4 className="text-lg font-bold text-zinc-100">
            {activeStep === 0 && "1. Independent Oracle Price Discovery"}
            {activeStep === 1 && "2. Hard-Capped Premium Protection (50 bps)"}
            {activeStep === 2 && "3. Direct Uniswap V3 SwapRouter02 Execution"}
            {activeStep === 3 && "4. Verifiable Base ERC-8021 Attribution"}
          </h4>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {activeStep === 0 &&
              "When NYSE closes, illiquid DEX pools can drift violently from reality. FairTick queries the official Chainlink Total-Return equity oracle and multiplier contract, confirming feed freshness before any swap is allowed."}
            {activeStep === 1 &&
              "If the onchain DEX pool price deviates by more than +50 bps from the official equity price, the execution button locks automatically. Users cannot be silently arbitraged or frontrun by predatory off-market markups."}
            {activeStep === 2 &&
              "Trades route straight through Uniswap V3 SwapRouter02 on Base. We enforce exact approvals (only the precise dollar amount being traded) to eliminate infinite allowance drain risks."}
            {activeStep === 3 &&
              "Every swap attaches the standardized Base ERC-8021 Schema 0 suffix to the transaction calldata. The builder code 'fairtick_b20' is registered onchain with zero gas overhead and zero user fee cuts."}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-200 text-xs font-semibold rounded-xl transition inline-flex items-center gap-2"
            >
              <span>Next Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {activeStep === 3 && (
              <a
                href="https://sepolia.basescan.org/tx/0x7e63edbdc4720fe77431e20ee83267c0d64fb03007530138d00c06d0b2101ab8"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white text-xs font-semibold rounded-xl transition inline-flex items-center gap-1.5"
              >
                <span>View Real Basescan Tx</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Live Interactive Visual Mockup / Terminal Display */}
        <div className="lg:col-span-7 bg-zinc-950/90 border border-zinc-800/90 rounded-xl p-5 font-mono text-xs shadow-inner">
          {/* Terminal Bar */}
          <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4 text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-zinc-400 font-semibold">fairtick-engine :: verify_b20()</span>
            </div>
            <span className="text-[10px] text-zinc-500">Base Mainnet (8453)</span>
          </div>

          {/* STEP 0: Oracle Feed */}
          {activeStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-[10px] text-zinc-400">Chainlink Benchmark Price</div>
                  <div className="text-base font-bold text-zinc-100 mt-0.5">$224.68 USD</div>
                  <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Official Equity Print</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-[10px] text-zinc-400">Feed Freshness State</div>
                  <div className="text-base font-bold text-amber-300 mt-0.5">HELD (Weekend)</div>
                  <div className="text-[10px] text-zinc-400 mt-1">Multiplier: 1.0000x</div>
                </div>
              </div>

              <div className="p-3 bg-zinc-900/60 border border-zinc-850 rounded-lg text-[11px] space-y-1 text-zinc-400">
                <div className="text-zinc-500">// Oracle contract call verification</div>
                <div>&gt; oracle.latestRoundData() ➔ answer: 22468000000 [verified]</div>
                <div>&gt; b20Token.tokenToSharesMultiplier() ➔ 1000000000000000000 [1:1 shares]</div>
                <div className="text-emerald-400">&gt; Status: Benchmark print locked. Proceeding to safety gate.</div>
              </div>
            </div>
          )}

          {/* STEP 1: Safety Gate */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Simulate Market Condition:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSpreadScenario("normal")}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                      spreadScenario === "normal"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    Fair DEX (-19 bps)
                  </button>
                  <button
                    onClick={() => setSpreadScenario("spiked")}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                      spreadScenario === "spiked"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    Predatory Markup (+64 bps)
                  </button>
                </div>
              </div>

              {spreadScenario === "normal" ? (
                <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300 font-bold">DEX Spread: -19 bps (0.19% Discount)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      WITHIN 50 BPS CAP
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[38%]" />
                  </div>
                  <div className="text-[11px] text-zinc-300 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Fair pricing confirmed. Trade execution permitted.</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-300 font-bold">DEX Spread: +64 bps (0.64% Markup)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      SAFETY LOCKOUT ENGAGED
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[85%]" />
                  </div>
                  <div className="text-[11px] text-rose-300 flex items-center gap-1.5 pt-1">
                    <Lock className="w-4 h-4 text-rose-400" />
                    <span>Swap blocked: Off-hours premium exceeds 50 bps max safety cap.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SwapRouter02 */}
          {activeStep === 2 && (
            <div className="space-y-3">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Router Address</span>
                  <span className="text-sky-400 font-mono">0x2626664c2603336E57B271c5C0b26F421741e481</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Target Protocol</span>
                  <span className="text-zinc-200">Uniswap V3 on Base (SwapRouter02)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">ERC20 Allowance Requested</span>
                  <span className="text-emerald-400 font-bold">2.000000 USDC (Exact Size Only)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Infinite Approval Risk</span>
                  <span className="text-emerald-400 font-bold">0% (maxUint256 Disabled)</span>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500">
                &gt; Sending direct multihop / exactInputSingle with Uniswap V3 slippage bounds.
              </div>
            </div>
          )}

          {/* STEP 3: ERC-8021 Attribution */}
          {activeStep === 3 && (
            <div className="space-y-3">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                <div className="text-[11px] text-zinc-400">Decoded ERC-8021 Calldata Suffix (Schema 0):</div>
                <div className="p-2.5 bg-black/60 rounded border border-zinc-850 font-mono text-[11px] text-purple-300 break-all leading-relaxed select-all">
                  <span className="text-amber-400 font-bold">0c</span>
                  <span className="text-blue-400 font-bold">666169727469636b5f623230</span>
                  <span className="text-zinc-400 font-bold">00</span>
                  <span className="text-emerald-400 font-bold">80218021802180218021802180218021</span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1 text-[10px]">
                  <div>
                    <span className="text-amber-400 font-bold block">0c</span>
                    <span className="text-zinc-500">Length: 12 B</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-bold block">fairtick_b20</span>
                    <span className="text-zinc-500">Builder Code</span>
                  </div>
                  <div>
                    <span className="text-zinc-300 font-bold block">00</span>
                    <span className="text-zinc-500">Schema 0</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold block">0x8021 x8</span>
                    <span className="text-zinc-500">Magic Marker</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Base builder attribution verified onchain without gas inflation.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
