import Link from "next/link";
import { ExternalLink, ShieldCheck, CheckCircle2, Terminal, Code2, Layers, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-20 w-full mt-auto bg-[#070b16]/95 backdrop-blur-2xl border-t border-white/10 text-xs text-slate-400">
      {/* 1. Distressed Spray / Grunge Texture Divider (User-Provided Graphic) */}
      <div className="relative w-full h-16 sm:h-20 md:h-28 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/footer-grunge.png"
          alt="Distressed spray divider"
          className="w-full h-full object-cover object-center mix-blend-screen opacity-60 filter contrast-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050811] via-transparent to-[#070b16] pointer-events-none" />
      </div>

      {/* 2. Main Footer Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-12">
        {/* Top Grid: 4 Column Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-white text-lg tracking-tight">FairTick</span>
              <span className="text-[10px] font-mono bg-blue-500/15 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-semibold">
                Base B20 Execution Standard
              </span>
            </div>

            <p className="text-xs text-slate-300/90 leading-relaxed max-w-sm font-normal">
              Fair price discovery and oracle-protected execution routing for Coinbase Tokenized Stocks on Base. Defending against off-hours spreads, uncalibrated splits, and predatory DEX markups.
            </p>

            {/* Operational Status Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Base Mainnet Online</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Chainlink Feeds Active</span>
              </div>
            </div>
          </div>

          {/* Column 3: Terminal & Markets */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Terminal
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/markets" className="text-slate-300 hover:text-white transition inline-flex items-center gap-1">
                  <span>All B20 Markets</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/trade/AAPLc" className="text-slate-400 hover:text-white transition">
                  Trade AAPLc (Apple)
                </Link>
              </li>
              <li>
                <Link href="/trade/NVDAC" className="text-slate-400 hover:text-white transition">
                  Trade NVDAC (Nvidia)
                </Link>
              </li>
              <li>
                <Link href="/trade/TSLAC" className="text-slate-400 hover:text-white transition">
                  Trade TSLAC (Tesla)
                </Link>
              </li>
              <li>
                <Link href="/trade/COINC" className="text-slate-400 hover:text-white transition">
                  Trade COINC (Coinbase)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Standards & Docs */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Architecture
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://docs.base.org/specifications/b20/tokenized-stocks-on-base"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white transition inline-flex items-center gap-1"
                >
                  <span>B20 Specification</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://base.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition inline-flex items-center gap-1"
                >
                  <span>Base.dev Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ritesh59697/fairtick"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition inline-flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/#proof-stage" className="text-slate-400 hover:text-white transition">
                  Order Lifecycle Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Verification & Trust */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Verification
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://sepolia.basescan.org/tx/0x7e63edbdc4720fe77431e20ee83267c0d64fb03007530138d00c06d0b2101ab8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Onchain Tx</span>
                </a>
              </li>
              <li className="text-slate-400">
                <span>Uniswap SwapRouter02</span>
              </li>
              <li className="text-slate-400">
                <span>Base ERC-8021 Builder Tag</span>
              </li>
              <li className="text-slate-400">
                <span>Chainlink Equity Feeds</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal & Regulatory Copy Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-[11px] leading-relaxed text-slate-400 space-y-2 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 text-slate-200 font-semibold font-mono text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Compliance & Legal Safeguards</span>
          </div>
          <p>
            FairTick is an open-source execution routing interface for existing Coinbase Tokenized Stocks (B20) on Base. It is not a broker-dealer, does not offer or solicit securities, and is strictly restricted from US persons and OFAC-sanctioned jurisdictions.
          </p>
          <p className="text-slate-500">
            Tokenized stocks are issued by Coinbase and custody partners and are only available to eligible users in permitted non-US jurisdictions. Base and FairTick do not issue or custody underlying equities. Always review live onchain pool depth and Chainlink benchmarks before submitting swap authorizations.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} FairTick Protocol. Built for the Base ecosystem.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Schema: ERC-8021</span>
            <span>•</span>
            <span>Attribution: fairtick_b20</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
