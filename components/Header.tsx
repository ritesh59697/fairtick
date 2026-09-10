"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useConnectModal, useAccountModal, useChainModal } from "@rainbow-me/rainbowkit";
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
  const { address, isConnected, isDemo, openModal, connectDemo, disconnectAll } = useAppWallet();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
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


      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <FairTickLogo size={32} variant="badge" />
            <span className="font-bold text-zinc-100 text-lg tracking-tight group-hover:text-white transition">
              FairTick
            </span>
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

        <div className="flex items-center gap-2.5">
          {isWrongNetwork ? (
            <button
              onClick={() => (openChainModal ? openChainModal() : switchChain({ chainId: BASE_CHAIN_ID }))}
              className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-full text-xs font-semibold transition cursor-pointer"
            >
              Switch to Base
            </button>
          ) : (
            <button
              onClick={() => openChainModal?.()}
              className="hidden sm:inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-xs text-zinc-300 font-normal transition cursor-pointer"
              title="Chain selector"
            >
              <BaseLogo className="w-3 h-3" fill="#0052FF" />
              <span>Base Mainnet</span>
            </button>
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
                <button
                  onClick={() => openAccountModal?.()}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-full text-xs font-mono text-zinc-200 transition cursor-pointer flex items-center gap-1.5"
                  title="View Account details"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </button>
              )}
              <button
                onClick={() => disconnectAll()}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-xs transition cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={connectDemo}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 rounded-full text-xs font-semibold transition cursor-pointer"
                title="Test instantly with preloaded $500 USDC & 1.25 NVDAc without real funds"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Demo Mode</span>
              </button>
              <button
                onClick={() => {
                  if (openConnectModal) {
                    openConnectModal();
                  } else {
                    openModal();
                  }
                }}
                className="px-4.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect Wallet</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
