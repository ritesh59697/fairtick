"use client";

import React, { useState } from "react";
import { useConnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAppWallet } from "@/lib/wallet-context";
import {
  X,
  Wallet,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Layers,
} from "lucide-react";

export function WalletModal() {
  const { isModalOpen, closeModal, connectDemo } = useAppWallet();
  const { connect, connectors, isPending, error } = useConnect();
  const { openConnectModal } = useConnectModal();
  const [connectingId, setConnectingId] = useState<string | null>(null);

  if (!isModalOpen) return null;

  function handleOpenRainbowKit() {
    closeModal();
    setTimeout(() => {
      openConnectModal?.();
    }, 100);
  }

  async function handleConnectReal(connectorId: string) {
    // If openConnectModal is available, use RainbowKit for complete wallet coverage
    if (openConnectModal) {
      handleOpenRainbowKit();
      return;
    }

    const target =
      connectors.find(
        (c) => c.id === connectorId || c.name.toLowerCase().includes(connectorId.toLowerCase())
      ) ||
      (connectorId === "rabby" ? connectors.find((c) => c.id === "injected") : undefined);
    if (!target) return;

    try {
      setConnectingId(target.id);
      await connect({ connector: target });
      closeModal();
    } catch (err) {
      console.error("Connection failed:", err);
    } finally {
      setConnectingId(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h2 className="text-lg font-bold text-zinc-100">Connect a Wallet</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select your wallet or use 1-Click Demo Mode to test on Base.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error notice if Wagmi rejected */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {error.message.includes("User rejected")
                ? "Connection request rejected in wallet."
                : error.message}
            </span>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 relative z-10">
          {/* 1-Click Demo Mode (Featured for judges & testing) */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/40 border border-blue-500/30 hover:border-blue-500/50 transition shadow-lg">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-100">1-Click Demo Wallet</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Recommended
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 block">
                    Preloaded with 500 USDC &amp; 1.25 NVDAc on Base
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
              Instantly test the trade ticket, simulated execution, safety gate lockouts, and receipt generation without needing real funds.
            </p>
            <button
              onClick={connectDemo}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md shadow-blue-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Connect Demo Wallet (Instant)
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Or Connect Real Web3 Wallet
            </span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>

          {/* RainbowKit Full Suite Trigger */}
          <button
            onClick={handleOpenRainbowKit}
            className="w-full p-3.5 rounded-xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 hover:from-zinc-900 hover:to-zinc-850 border border-blue-500/40 hover:border-blue-500/70 transition flex items-center justify-between text-left group shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 p-[1.5px] flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-100 group-hover:text-blue-400 transition">
                    RainbowKit Wallet Adapter
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                    300+ Wallets
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Rainbow, MetaMask, Rabby, Phantom, WalletConnect QR
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
          </button>

          {/* Coinbase Wallet */}
          <button
            onClick={() => handleConnectReal("coinbase")}
            disabled={isPending}
            className="w-full p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
                CB
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-100 group-hover:text-blue-400 transition">
                  Coinbase Wallet
                </div>
                <div className="text-[11px] text-zinc-400">
                  Passkey, Mobile app, or Chrome extension
                </div>
              </div>
            </div>
            {connectingId?.toLowerCase().includes("coinbase") ? (
              <span className="text-[11px] text-blue-400 font-medium animate-pulse">Connecting...</span>
            ) : (
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-blue-500 transition" />
            )}
          </button>

          {/* Rabby Wallet */}
          <button
            onClick={() => handleConnectReal("rabby")}
            disabled={isPending}
            className="w-full p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs shadow-sm shadow-sky-500/20">
                RB
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-100 group-hover:text-sky-400 transition">
                  Rabby Wallet
                </div>
                <div className="text-[11px] text-zinc-400">
                  Game-changing Web3 wallet for Ethereum &amp; Base
                </div>
              </div>
            </div>
            {connectingId?.toLowerCase().includes("rabby") ? (
              <span className="text-[11px] text-sky-400 font-medium animate-pulse">Connecting...</span>
            ) : (
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-sky-400 transition" />
            )}
          </button>

          {/* Browser / Injected (MetaMask, Rainbow) */}
          <button
            onClick={() => handleConnectReal("injected")}
            disabled={isPending}
            className="w-full p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-100 group-hover:text-amber-400 transition">
                  Browser &amp; Injected
                </div>
                <div className="text-[11px] text-zinc-400">
                  MetaMask, Rainbow, Brave, or Phantom
                </div>
              </div>
            </div>
            {connectingId === "injected" ? (
              <span className="text-[11px] text-amber-400 font-medium animate-pulse">Connecting...</span>
            ) : (
              <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-amber-500 transition" />
            )}
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Target: Base Mainnet (8453)</span>
          </div>
          <span>B20 Compliance Verified</span>
        </div>
      </div>
    </div>
  );
}

