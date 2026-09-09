import Link from "next/link";
import { ExternalLink, ShieldAlert, GitFork, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-10 mt-auto text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-850/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-zinc-200 text-sm">FairTick</span>
              <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                Base B20 Execution Standard
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Fair price discovery and oracle-protected execution for Coinbase Tokenized Stocks on Base.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
            <a
              href="https://docs.base.org/specifications/b20/tokenized-stocks-on-base"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition inline-flex items-center gap-1"
            >
              <span>B20 Specification</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
            <a
              href="https://base.dev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition inline-flex items-center gap-1"
            >
              <span>Base.dev</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
            <a
              href="https://github.com/ritesh59697/fairtick"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
            <a
              href="https://sepolia.basescan.org/tx/0x7e63edbdc4720fe77431e20ee83267c0d64fb03007530138d00c06d0b2101ab8"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400/90 hover:text-emerald-300 transition inline-flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Onchain Tx</span>
            </a>
          </div>
        </div>

        {/* Mandatory legal copy */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 text-[11px] leading-relaxed text-zinc-500 space-y-1">
          <p>
            FairTick is an open-source execution routing interface for existing Coinbase Tokenized Stocks (B20) on Base. It is not a broker-dealer, not an offer of securities, and not available to US persons.
          </p>
          <p className="text-zinc-600">
            Tokenized stocks are issued by Coinbase and only available to eligible users in permitted non-US jurisdictions. Base and FairTick do not issue or custody these underlying securities. Always verify onchain pool liquidity before executing swaps.
          </p>
        </div>
      </div>
    </footer>
  );
}
