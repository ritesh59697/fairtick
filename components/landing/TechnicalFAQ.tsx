"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function TechnicalFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What happens when US stock exchanges are closed?",
      a: "Unlike traditional markets, Base blockchain DEX pools operate 24 hours a day, 7 days a week. When NYSE/NASDAQ are closed, FairTick flags the oracle as 'FEED HELD' and benchmarks quotes against the last official Chainlink closing print. If the decentralized liquidity pool price drifts by more than 50 bps above the official equity print, FairTick automatically locks the swap button to prevent you from overpaying.",
    },
    {
      q: "What is Coinbase B20 and who issues the underlying stock?",
      a: "B20 is Coinbase's smart contract standard for tokenized real-world equities issued on Base. Each tokenized asset (e.g. AAPLc, NVDAc, METAc) represents fractional economic ownership of underlying shares held in custody by Coinbase's licensed custodian partners.",
    },
    {
      q: "Why does FairTick route strictly through SwapRouter02?",
      a: "SwapRouter02 (0x2626664c2603336E57B271c5C0b26F421741e481) is Uniswap's modern, audited router contract on Base. It executes direct concentrated liquidity swaps without middleman contract hops, keeping slippage minimal and gas consumption under 90,000 gas.",
    },
    {
      q: "What is Base ERC-8021 and does it increase my swap fee?",
      a: "No, ERC-8021 does not cost you any additional fees. It is a cryptographic standard created for the Base blockchain where developers append a 16-byte marker suffix to transaction calldata. Base's sequencer indexes this attribution ('fairtick_b20') to measure ecosystem builder adoption.",
    },
    {
      q: "How does FairTick handle stock splits?",
      a: "When a public company executes a stock split (like a 10-for-1 forward split), B20 token contracts do not mint 10x more tokens to your wallet. Instead, the contract updates an internal variable accessed via tokenToSharesMultiplier(). FairTick reads this multiplier onchain in real-time, calculating both your raw token count and your exact post-split equity shares.",
    },
  ];

  return (
    <section className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-zinc-300 text-xs font-mono font-medium backdrop-blur-md shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
          <span>Technical FAQ</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
          Frequently Answered Questions
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 font-normal">
          Everything you need to know about trading tokenized equities on Base.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl hairline-card hairline-frame overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-zinc-200 hover:text-white transition"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 md:px-5 md:pb-5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-850/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
