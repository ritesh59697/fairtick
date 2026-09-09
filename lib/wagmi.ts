import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      target() {
        return {
          id: "rabby",
          name: "Rabby Wallet",
          provider(window) {
            return (window as any)?.rabby || (window as any)?.ethereum;
          },
        };
      },
    }),
    injected(),
    coinbaseWallet({
      appName: "FairTick",
      preference: "all",
    }),
  ],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
  },
  ssr: true,
});
