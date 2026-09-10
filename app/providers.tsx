"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";
import { useState, type ReactNode } from "react";
import { WalletProvider } from "@/lib/wallet-context";
import { WalletModal } from "@/components/WalletModal";
import { ThemeProvider, useTheme } from "@/lib/theme-context";

function RainbowKitAdaptiveTheme({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <RainbowKitProvider
      theme={
        theme === "light"
          ? lightTheme({
              accentColor: "#0052FF",
              accentColorForeground: "white",
              borderRadius: "large",
              fontStack: "system",
              overlayBlur: "small",
            })
          : darkTheme({
              accentColor: "#0052FF",
              accentColorForeground: "white",
              borderRadius: "large",
              fontStack: "system",
              overlayBlur: "small",
            })
      }
    >
      <WalletProvider>
        {children}
        <WalletModal />
      </WalletProvider>
    </RainbowKitProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RainbowKitAdaptiveTheme>{children}</RainbowKitAdaptiveTheme>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

