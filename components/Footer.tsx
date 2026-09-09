import Link from "next/link";
import { ExternalLink, ShieldCheck, CheckCircle2, ArrowUpRight, Activity, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BaseLogo } from "@/components/BaseLogo";
import { FairTickLogo } from "@/components/FairTickLogo";

export function Footer() {
  return (
    <footer className="relative z-20 w-full mt-auto bg-[#030610]/95 backdrop-blur-2xl border-t border-white/[0.08] text-xs text-zinc-400">
      {/* Top subtle blue accent hairline glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Main Footer Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14 space-y-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1 & 2: Brand Identity & Protocol Status (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <FairTickLogo size={32} variant="badge" />
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight">FairTick</span>
                <Badge variant="outline" className="text-[10px] gap-1.5 py-0.5 border-blue-500/30 text-blue-400 bg-blue-950/20">
                  <BaseLogo className="w-2.5 h-2.5" fill="#0052FF" />
                  Base B20
                </Badge>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Fair price discovery and oracle-protected execution routing for Coinbase Tokenized Stocks on Base.
              Guarding trades against off-hours spread drift, uncalibrated corporate splits, and predatory DEX markups.
            </p>

            {/* Operational Status Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Base Mainnet Live
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-950/40 text-blue-400 border border-blue-500/20">
                <Activity className="w-3 h-3 text-blue-400" />
                Chainlink Feeds Active
              </span>
            </div>
          </div>

          {/* Column 3: Markets Terminal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Terminal
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/markets"
                  className="text-zinc-400 hover:text-white transition inline-flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">All B20 Markets</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white" />
                </Link>
              </li>
              <li>
                <Link href="/trade/AAPLc" className="text-zinc-400 hover:text-white transition block">
                  Trade AAPLc (Apple)
                </Link>
              </li>
              <li>
                <Link href="/trade/NVDAC" className="text-zinc-400 hover:text-white transition block">
                  Trade NVDAC (Nvidia)
                </Link>
              </li>
              <li>
                <Link href="/trade/TSLAC" className="text-zinc-400 hover:text-white transition block">
                  Trade TSLAC (Tesla)
                </Link>
              </li>
              <li>
                <Link href="/trade/COINC" className="text-zinc-400 hover:text-white transition block">
                  Trade COINC (Coinbase)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Architecture & Specs (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Architecture
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://docs.base.org/specifications/b20/tokenized-stocks-on-base"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition inline-flex items-center gap-1 group"
                >
                  <span>B20 Specification</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href="https://base.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition inline-flex items-center gap-1 group"
                >
                  <span>Base.dev Portal</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ritesh59697/fairtick"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition inline-flex items-center gap-1 group"
                >
                  <span>GitHub Source</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white" />
                </a>
              </li>
              <li>
                <Link href="/#proof-stage" className="text-zinc-400 hover:text-white transition block">
                  Execution Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Verification & Trust (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Onchain Trust
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://sepolia.basescan.org/tx/0x7e63edbdc4720fe77431e20ee83267c0d64fb03007530138d00c06d0b2101ab8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified Execution Tx ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://basescan.org/address/0x2626664c2603336E57B271c5C0b26F421741e481"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Uniswap SwapRouter02 ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://docs.base.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <BaseLogo className="w-3.5 h-3.5 shrink-0" fill="#3b82f6" />
                  <span>Base ERC-8021 Suffix ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://data.chain.link/base"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Chainlink Equity Feeds ↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Regulatory & Compliance Notice */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-zinc-200 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Compliance & Jurisdictional Notice</span>
          </div>
          <p className="text-zinc-400 text-[11px]">
            FairTick is an open-source execution routing interface for existing Coinbase Tokenized Stocks (B20) on Base.
            It is not a broker-dealer, does not offer or solicit securities, and is strictly restricted from US persons and OFAC-sanctioned jurisdictions.
          </p>
          <p className="text-zinc-500 text-[11px]">
            Tokenized stocks are issued by Coinbase and licensed custody partners and are only available to eligible users in permitted jurisdictions.
            Base and FairTick do not issue or custody underlying equities. Always review live onchain liquidity depth and Chainlink benchmark feeds before authorizing trades.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} FairTick Protocol. Built for the Base ecosystem.
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] text-zinc-400 py-0.5 px-2 border-white/10">
              Schema: ERC-8021
            </Badge>
            <Badge variant="outline" className="text-[10px] text-zinc-400 py-0.5 px-2 border-white/10">
              Attribution: fairtick_b20
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
