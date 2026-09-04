import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 mt-auto text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-850 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">FairTick</span>
            <span>•</span>
            <span>Trade Ticket for Coinbase Tokenized Stocks (B20) on Base</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://docs.base.org/specifications/b20/tokenized-stocks-on-base"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition inline-flex items-center gap-1"
            >
              Base B20 Specification <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://base.dev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition inline-flex items-center gap-1"
            >
              Base.dev Builder Code <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Mandatory legal copy */}
        <p className="leading-relaxed text-zinc-500 max-w-4xl text-[11px]">
          FairTick is a demo interface for existing Coinbase Tokenized Stocks (B20) on Base. It is not a broker-dealer, not an offer of securities, and not available to US persons. Tokenized stocks are issued by Coinbase and only available to eligible users in permitted non-US jurisdictions. Do your own research. Base / FairTick does not issue these tokens.
        </p>
      </div>
    </footer>
  );
}
