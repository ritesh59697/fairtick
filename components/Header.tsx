"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { BASE_CHAIN_ID } from "@/lib/tokens";
import { useGeoCheck } from "@/lib/geo";
import {
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  Globe,
  AlertTriangle,
  Wallet,
  Sparkles,
  TrendingUp,
  CircleDot,
  LineChart,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUILDER_CODE_ENV } from "@/lib/attribution";
import { useAppWallet } from "@/lib/wallet-context";
import { BaseLogo } from "@/components/BaseLogo";
import { Badge } from "@/components/ui/badge";
import { FairTickLogo } from "@/components/FairTickLogo";

export function Header() {
  const pathname = usePathname();
  const { address, isConnected, isDemo, openModal, disconnectAll } = useAppWallet();
  const defaultChainId = useChainId();
  const { chainId: walletChainId } = useAccount();
  const chainId = walletChainId ?? defaultChainId;
  const { switchChain } = useSwitchChain();
  const { isBlocked, country, simulatedUs, toggleSimulateUs } = useGeoCheck();

  const isWrongNetwork = !isDemo && isConnected && chainId !== BASE_CHAIN_ID;
  const isOverviewActive = pathname === "/";
  const isMarketsActive = pathname.startsWith("/markets");

  return (
    <header className="border-b border-white/10 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
      {/* Only show warning banner if user is actually blocked */}
      {isBlocked && (
        <div className="bg-red-500/15 border-b border-red-500/30 px-4 py-2 text-xs text-red-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <strong>Not available to US persons.</strong> Coinbase Tokenized Stocks are for eligible non-US users only (IP: {country}{simulatedUs ? " [Simulated]" : ""}).
            </span>
          </div>
          <button
            onClick={toggleSimulateUs}
            className="text-[11px] underline text-red-300 hover:text-red-100 ml-4 shrink-0 cursor-pointer"
          >
            {simulatedUs ? "Reset Geo" : "Simulate Non-US"}
          </button>
        </div>
      )}

      {/* Builder Code Banner if missing */}
      {!BUILDER_CODE_ENV && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1 text-[11px] text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Builder Code attribution inactive. Set <code>NEXT_PUBLIC_BUILDER_CODE</code> in your env.
            </span>
          </div>
          <a
            href="https://base.dev"
            target="_blank"
            rel="noreferrer"
            className="underline inline-flex items-center gap-1 text-[11px] text-amber-200 hover:text-amber-100"
          >
            Get Code on base.dev <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <FairTickLogo size={34} variant="badge" />
            <div>
              <div className="font-bold text-zinc-100 leading-none text-base tracking-tight flex items-center gap-2">
                FairTick
                <Badge variant="outline" className="text-[10px] font-semibold uppercase gap-1 py-0.5 px-1.5 font-mono">
                  <BaseLogo className="w-2.5 h-2.5" fill="#0052FF" />
                  <span>Base B20</span>
                </Badge>
              </div>
              <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">
                Don’t overpay for onchain Apple
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full transition inline-flex items-center gap-1.5 ${
                isOverviewActive
                  ? "bg-white/10 text-white font-semibold border border-white/15 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-zinc-400" />
              <span>Overview</span>
            </Link>
            <Link
              href="/markets"
              className={`px-3.5 py-1.5 rounded-full transition inline-flex items-center gap-1.5 ${
                isMarketsActive
                  ? "bg-white/10 text-white font-semibold border border-white/15 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
              }`}
            >
              <LineChart className="w-3.5 h-3.5 text-zinc-400" />
              <span>Markets Terminal</span>
            </Link>
            <a
              href="https://docs.base.org/specifications/b20/tokenized-stocks-on-base"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05] rounded-full transition inline-flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>B20 Specs</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isWrongNetwork ? (
            <button
              onClick={() => switchChain({ chainId: BASE_CHAIN_ID })}
              className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-full text-xs font-semibold transition cursor-pointer"
            >
              Switch to Base
            </button>
          ) : (
            <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1.5 py-1 px-3 text-xs text-zinc-300 font-normal">
              <BaseLogo className="w-3 h-3" fill="#0052FF" />
              <span>Base Mainnet</span>
            </Badge>
          )}

          {isConnected ? (
            <div className="flex items-center gap-2">
              {isDemo ? (
                <Badge variant="success" className="items-center gap-1.5 py-1 px-2.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold">Demo Mode</span>
                  <span className="font-mono text-[10px] text-emerald-200/90 hidden sm:inline">($500 USDC)</span>
                </Badge>
              ) : (
                <div className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-300">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
              )}
              <button
                onClick={() => disconnectAll()}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-xs transition cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={openModal}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Wallet className="w-3.5 h-3.5" />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
