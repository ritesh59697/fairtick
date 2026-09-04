"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";
import { useState, type ReactNode } from "react";
import { WalletProvider } from "@/lib/wallet-context";
import { WalletModal } from "@/components/WalletModal";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          {children}
          <WalletModal />
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
