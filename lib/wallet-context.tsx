"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useAccount, useDisconnect, useConnect, type Connector } from "wagmi";
import type { Address } from "viem";

interface DemoBalances {
  usdc: number;
  stocks: Record<string, number>;
}

const INITIAL_DEMO_BALANCES: DemoBalances = {
  usdc: 500.0,
  stocks: {
    NVDAc: 1.25,
    AAPLc: 2.0,
    METAc: 0.5,
    GOOGLc: 1.0,
    TSLAc: 0.8,
    MSFTc: 0.6,
  },
};

const DEMO_ADDRESS: Address = "0x71CB05EEa75D726002fD277A6e47EAA5b038453c";

interface WalletContextValue {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isDemo: boolean;
  address: Address | undefined;
  isConnected: boolean;
  balances: DemoBalances;
  connectDemo: () => void;
  disconnectAll: () => void;
  executeDemoSwap: (params: {
    symbol: string;
    isBuy: boolean;
    amountIn: number;
    amountOut: number;
    sharesOut: number;
    premiumBps: number;
  }) => Promise<string>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [demoBalances, setDemoBalances] = useState<DemoBalances>(INITIAL_DEMO_BALANCES);

  const { address: wagmiAddress, isConnected: isWagmiConnected } = useAccount();
  const { disconnect: disconnectWagmi } = useDisconnect();

  // If user connects real wallet, turn off demo mode
  useEffect(() => {
    if (isWagmiConnected) {
      setIsDemo(false);
    }
  }, [isWagmiConnected]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function connectDemo() {
    setIsDemo(true);
    setIsModalOpen(false);
  }

  function disconnectAll() {
    if (isDemo) {
      setIsDemo(false);
    }
    if (isWagmiConnected) {
      disconnectWagmi();
    }
  }

  // Simulated execution for Demo mode (attaches builder attribution and generates realistic Base tx hash)
  async function executeDemoSwap(params: {
    symbol: string;
    isBuy: boolean;
    amountIn: number;
    amountOut: number;
    sharesOut: number;
    premiumBps: number;
  }): Promise<string> {
    // 1.2 second simulated block confirmation
    await new Promise((r) => setTimeout(r, 1200));

    setDemoBalances((prev) => {
      const nextUsdc = params.isBuy
        ? Math.max(0, prev.usdc - params.amountIn)
        : prev.usdc + params.amountOut;

      const currentStockBal = prev.stocks[params.symbol] || 0;
      const nextStockBal = params.isBuy
        ? currentStockBal + params.amountOut
        : Math.max(0, currentStockBal - params.amountIn);

      return {
        usdc: Number(nextUsdc.toFixed(2)),
        stocks: {
          ...prev.stocks,
          [params.symbol]: Number(nextStockBal.toFixed(4)),
        },
      };
    });

    // Random realistic 32-byte hex for transaction receipt
    const randomHex = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    return `0x${randomHex}`;
  }

  const activeAddress: Address | undefined = isWagmiConnected
    ? wagmiAddress
    : isDemo
    ? DEMO_ADDRESS
    : undefined;

  const isConnected = isWagmiConnected || isDemo;

  return (
    <WalletContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        isDemo,
        address: activeAddress,
        isConnected,
        balances: demoBalances,
        connectDemo,
        disconnectAll,
        executeDemoSwap,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useAppWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useAppWallet must be used within a WalletProvider");
  }
  return context;
}
