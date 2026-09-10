import Link from "next/link";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { FairTickLogo } from "@/components/FairTickLogo";
import { CoinbaseLogo, ChainlinkLogo, UniswapLogo, BaseLogo } from "@/components/CryptoLogos";

export function Footer() {
  return (
    <footer className="relative z-20 w-full mt-auto bg-[#030610]/95 backdrop-blur-2xl border-t border-white/[0.08] text-xs text-zinc-400">
      {/* Top subtle blue accent hairline glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Main Footer Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14 space-y-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Status (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <FairTickLogo size={28} variant="badge" />
              <span className="font-bold text-white text-base tracking-tight group-hover:text-zinc-200 transition">
                FairTick
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-normal">
              Fair price discovery and oracle-protected execution routing for Coinbase Tokenized Stocks on Base. Guarding trades against off-hours spread drift, uncalibrated corporate splits, and predatory DEX markups.
            </p>

            {/* Clean Live Status Indicator (Arrakis style) */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Base Mainnet & Chainlink Active</span>
            </div>
          </div>

          {/* Column 2: Markets (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Markets
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/markets" className="text-zinc-400 hover:text-white transition">
                  Terminal Overview
                </Link>
              </li>
              <li>
                <Link href="/trade/AAPLc" className="text-zinc-400 hover:text-white transition">
                  Apple (AAPLc)
                </Link>
              </li>
              <li>
                <Link href="/trade/NVDAC" className="text-zinc-400 hover:text-white transition">
                  Nvidia (NVDAC)
                </Link>
              </li>
              <li>
                <Link href="/trade/TSLAC" className="text-zinc-400 hover:text-white transition">
                  Tesla (TSLAC)
                </Link>
              </li>
              <li>
                <Link href="/trade/COINC" className="text-zinc-400 hover:text-white transition">
                  Coinbase (COINC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Specs (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Architecture
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://docs.base.org/specifications/b20/tokenized-stocks-on-base"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition"
                >
                  B20 Specification
                </a>
              </li>
              <li>
                <a
                  href="https://base.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Base.dev Portal
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ritesh59697/fairtick"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition"
                >
                  GitHub Source
                </a>
              </li>
              <li>
                <Link href="/#proof-stage" className="text-zinc-400 hover:text-white transition">
                  Execution Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Onchain Trust with Real Logos & Clean Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Onchain Trust
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://basescan.org/tx/0x9bfb2aa9ca0dfbdff5775b52c4de0e294686faa07c6c135db94963170e8ca252"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-white transition inline-flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified Execution Tx</span>
                </a>
              </li>
              <li>
                <a
                  href="https://basescan.org/address/0x2626664c2603336E57B271c5C0b26F421741e481"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-white transition inline-flex items-center gap-2"
                >
                  <UniswapLogo className="w-3.5 h-3.5 shrink-0 rounded-full" />
                  <span>Uniswap SwapRouter02</span>
                </a>
              </li>
              <li>
                <a
                  href="https://docs.base.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-white transition inline-flex items-center gap-2"
                >
                  <BaseLogo className="w-3.5 h-3.5 shrink-0" fill="#0052FF" />
                  <span>Base ERC-8021 Suffix</span>
                </a>
              </li>
              <li>
                <a
                  href="https://data.chain.link/base"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-white transition inline-flex items-center gap-2"
                >
                  <ChainlinkLogo className="w-3.5 h-3.5 shrink-0" />
                  <span>Chainlink Equity Feeds</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Regulatory & Compliance Notice */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Compliance & Jurisdictional Notice</span>
          </div>
          <p className="text-zinc-400 text-[11px]">
            FairTick is an open-source execution routing interface for existing Coinbase Tokenized Stocks (B20) on Base.
            It is not a broker-dealer, does not offer or solicit securities, and is strictly restricted from US persons and OFAC-sanctioned jurisdictions.
          </p>
          <p className="text-zinc-400 text-[11px]">
            Tokenized stocks are issued by Coinbase and licensed custody partners and are only available to eligible users in permitted jurisdictions.
            Base and FairTick do not issue or custody underlying equities. Always review live onchain liquidity depth and Chainlink benchmark feeds before authorizing trades.
          </p>
        </div>

        {/* Bottom Bar: Clean Copyright & Attribution */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} FairTick Protocol. Built for Base.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 text-[11px] font-mono text-zinc-400">
            <span>Schema: ERC-8021</span>
            <span className="text-white/20">•</span>
            <a
              href="https://basescan.org/tx/0x9bfb2aa9ca0dfbdff5775b52c4de0e294686faa07c6c135db94963170e8ca252"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-blue-400 transition underline underline-offset-2"
            >
              Builder Code: bc_jmw5p5jt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
