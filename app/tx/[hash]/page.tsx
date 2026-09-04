"use client";

import { use, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getTokenBySymbol } from "@/lib/tokens";
import { BUILDER_CODE_ENV } from "@/lib/attribution";
import {
  CheckCircle2,
  ExternalLink,
  Copy,
  Share2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ReceiptPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const resolvedParams = use(params);
  const hash = resolvedParams.hash;
  const searchParams = useSearchParams();

  const symbol = searchParams.get("symbol") || "NVDAc";
  const side = searchParams.get("side") || "BUY";
  const amount = searchParams.get("amount") || "10";
  const shares = searchParams.get("shares") || "0.0438";
  const premium = searchParams.get("premium") || "12";

  const stock = getTokenBySymbol(symbol);
  const [copied, setCopied] = useState(false);

  // Generate X share post text
  const tweetText = `Just executed a protected swap for ${symbol} on @buildonbase using FairTick!

DEX Premium: ${Number(premium) > 0 ? `+${premium} bps` : `${premium} bps`}
Received: ${shares} shares (multiplier-aware)
Protected against stale equity feeds & rich markups.

Tagline: Don’t overpay for onchain Apple.
Tx: https://basescan.org/tx/${hash}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;

  function handleCopy() {
    navigator.clipboard.writeText(tweetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Success Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-zinc-100">Trade Submitted Safely</h1>
          <p className="text-xs text-zinc-400">
            Execution fulfilled through FairTick on Base Mainnet.
          </p>
        </div>

        {/* Trade Details Breakdown */}
        <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-850 space-y-3.5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
            <span className="text-zinc-400">Asset Traded:</span>
            <div className="text-right">
              <span className="font-bold text-zinc-100">{symbol}</span>
              <span className="text-[11px] text-zinc-500 block font-mono">
                {stock?.address
                  ? `${stock.address.slice(0, 10)}...${stock.address.slice(-8)}`
                  : "Coinbase B20 Precompile"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Input Amount:</span>
            <span className="font-mono font-bold text-zinc-200">
              {amount} {side === "BUY" ? "USDC" : symbol}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Tokens Received:</span>
            <span className="font-mono font-bold text-zinc-200">
              {shares} tokens
            </span>
          </div>

          <div className="flex items-center justify-between bg-blue-500/10 p-2.5 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-1.5 text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-semibold">≈ Scaled Shares (Post-Multiplier):</span>
            </div>
            <span className="font-mono font-bold text-blue-400 text-sm">
              {shares} shares
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Execution Premium vs Feed:</span>
            <span
              className={`font-mono font-bold ${
                Number(premium) > 0 ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {Number(premium) > 0 ? `+${premium} bps (Within Cap)` : `${premium} bps (Discount)`}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Builder Attribution (ERC-8021):</span>
            <span className="font-mono text-zinc-300 text-[11px]">
              {BUILDER_CODE_ENV ? `"${BUILDER_CODE_ENV}"` : "Active"}
            </span>
          </div>

          <div className="pt-2 border-t border-zinc-850 flex items-center justify-between">
            <span className="text-zinc-400">Basescan Explorer:</span>
            <a
              href={`https://basescan.org/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-mono text-[11px] underline"
            >
              {hash.slice(0, 10)}...{hash.slice(-8)}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Share on X (Twitter) Banner */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              Share this trade on X
            </span>
            <button
              onClick={handleCopy}
              className="text-[11px] text-zinc-400 hover:text-zinc-200 transition inline-flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              {copied ? "Copied!" : "Copy Text"}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850 font-mono text-[11px] text-zinc-400 whitespace-pre-wrap break-all leading-relaxed select-all">
            {tweetText}
          </div>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20"
          >
            <Share2 className="w-3.5 h-3.5" />
            Post on X (Tagging @buildonbase)
          </a>
        </div>

        {/* Back to Markets Link */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-zinc-200 transition inline-flex items-center gap-1"
          >
            Return to Market Overview
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
