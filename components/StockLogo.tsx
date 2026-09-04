"use client";

import React from "react";

interface StockLogoProps {
  symbol: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StockLogo({ symbol, size = "md", className = "" }: StockLogoProps) {
  // Normalize ticker (e.g. "NVDAc" -> "NVDA")
  const cleanSymbol = symbol.replace(/c$/i, "").toUpperCase();

  const dimensions =
    size === "sm" ? "w-6 h-6 text-[10px]" : size === "lg" ? "w-11 h-11 text-sm" : "w-8 h-8 text-xs";

  switch (cleanSymbol) {
    case "NVDA":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#76B900]/15 border border-[#76B900]/30 flex items-center justify-center shrink-0 ${className}`}
          title="NVIDIA"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#76B900]">
            <path d="M8.9 7.2c-.3.1-.7.4-.9.6-.3.3-.5.7-.6 1.1-.1.5-.1 1.2 0 1.7.2.8.7 1.5 1.4 1.9.5.3 1.1.4 1.7.4h1.1v-1.4h-1.1c-.5 0-.8-.1-1.1-.3-.3-.2-.5-.6-.5-1 0-.5.2-.8.5-1 .3-.2.7-.3 1.2-.3h1v-1.7H10c-.5 0-.9 0-1.1 0zm4.8 0v7.6H12v-6c0-1.2-.5-1.7-1.5-1.7-.8 0-1.4.3-1.8.9v-1H7.1v7.8H8.8v-4.4c.2-.5.5-.8.8-1 .3-.2.7-.3 1.1-.3.8 0 1.2.4 1.2 1.2v4.5h1.7V7.2h-2.1z M3.5 3C2.1 3 1 4.1 1 5.5v13C1 19.9 2.1 21 3.5 21h17c1.4 0 2.5-1.1 2.5-2.5v-13C23 4.1 21.9 3 20.5 3h-17z" />
          </svg>
        </div>
      );

    case "AAPL":
      return (
        <div
          className={`${dimensions} rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 ${className}`}
          title="Apple Inc."
        >
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-zinc-100">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.88-.93.04-2.05.62-2.7 1.39-.58.67-1.09 1.74-1.01 2.81 1.05.08 2.08-.57 2.7-1.32z" />
          </svg>
        </div>
      );

    case "META":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#0081FB]/15 border border-[#0081FB]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Meta Platforms"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0081FB]">
            <path d="M16.5 6c-1.88 0-3.37 1.04-4.5 2.38C10.87 7.04 9.38 6 7.5 6 4.46 6 2 8.46 2 11.5c0 3.39 2.9 6.22 6.57 6.48.5.03.93-.34.93-.84 0-.46-.37-.84-.83-.87C5.7 16.03 3.6 13.9 3.6 11.5 3.6 9.35 5.35 7.6 7.5 7.6c1.78 0 3.12 1.24 3.99 2.72.22.37.78.37 1 0 .87-1.48 2.21-2.72 3.99-2.72 2.15 0 3.9 1.75 3.9 3.9 0 2.4-2.1 4.53-5.07 4.77-.46.03-.83.41-.83.87 0 .5.43.87.93.84 3.67-.26 6.57-3.09 6.57-6.48C22 8.46 19.54 6 16.5 6z" />
          </svg>
        </div>
      );

    case "GOOGL":
    case "GOOG":
      return (
        <div
          className={`${dimensions} rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 ${className}`}
          title="Alphabet Inc."
        >
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
        </div>
      );

    case "TSLA":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#E82127]/15 border border-[#E82127]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Tesla Inc."
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#E82127]">
            <path d="M12 4c2.8 0 5.4.7 7.7 2-.5.8-1.3 1.4-2.2 1.7-1.7-.8-3.5-1.2-5.5-1.2s-3.8.4-5.5 1.2c-.9-.3-1.7-.9-2.2-1.7C6.6 4.7 9.2 4 12 4zm0 3.7c1.3 0 2.5.2 3.6.5-.4 1.1-.9 2.5-1.3 4.2h-4.6c-.4-1.7-.9-3.1-1.3-4.2 1.1-.3 2.3-.5 3.6-.5zm-1.8 6.2h3.6c-.6 3.1-1.3 5.4-1.8 6.1-.5-.7-1.2-3-1.8-6.1z" />
          </svg>
        </div>
      );

    case "MSFT":
      return (
        <div
          className={`${dimensions} rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 ${className}`}
          title="Microsoft Corporation"
        >
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-[#F25022] rounded-[1px]" />
            <div className="bg-[#7FBA00] rounded-[1px]" />
            <div className="bg-[#00A4EF] rounded-[1px]" />
            <div className="bg-[#FFB900] rounded-[1px]" />
          </div>
        </div>
      );

    case "AMZN":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#FF9900]/15 border border-[#FF9900]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Amazon.com Inc."
        >
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-[#FF9900]">
            <path d="M13.9 14.3c-1.8 1.3-4.2 2-6.5 2-3.1 0-5.8-1.2-7.4-3.1-.3-.3 0-.7.3-.5 2 1.1 4.5 1.7 7.1 1.7 2.1 0 4.3-.6 6-1.8.4-.3.9.2.5.7zm1.1-.8c-.2-.3-.8-.3-1.2-.1-.5.3-.4.7-.2 1 .3.4 1 .3 1.4.1.3-.3.3-.7 0-1zm5.2 3.2c-.3-.4-1.5-.2-2.1-.1-.2 0-.2-.2 0-.3.9-.6 2.3-.4 2.6 0 .3.4-.2 1.8-.9 2.5-.2.2-.3.1-.2 0 .4-.7.9-1.7.6-2.1z M12.8 7.3c-.3-1-.9-1.7-1.8-2.2-.9-.5-2.1-.7-3.4-.6-2.2.2-4.1 1.4-4.8 3.3-.2.5.2.9.7.8.8-.1 1.7-.3 2.5-.5.3-.1.5-.3.6-.6.4-1.1 1.3-1.7 2.5-1.8.8-.1 1.6.2 2 .7.4.5.4 1.2.2 1.8-.4.9-1.4 1.5-2.8 1.9-2.2.6-3.8 1.6-4.2 3.5-.3 1.5.3 3 1.7 3.7 1.1.6 2.4.6 3.6.1 1.3-.5 2.2-1.5 2.7-2.6.2-.4.7-.5 1.1-.3.8.4 1.6.8 2.4 1.3.3.2.7.1.8-.2.4-.9.9-2.7.9-4.7 0-2-.8-3.7-2.2-4.6z" />
          </svg>
        </div>
      );

    case "COIN":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#0052FF]/15 border border-[#0052FF]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Coinbase Global"
        >
          <div className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center text-[10px] font-black text-white">
            C
          </div>
        </div>
      );

    case "MSTR":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#D9272E]/15 border border-[#D9272E]/30 flex items-center justify-center shrink-0 ${className}`}
          title="MicroStrategy"
        >
          <span className="font-black text-[#D9272E] tracking-tighter">M</span>
        </div>
      );

    case "CRCL":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#002D72]/20 border border-[#0072CE]/40 flex items-center justify-center shrink-0 ${className}`}
          title="Circle"
        >
          <div className="w-4.5 h-4.5 rounded-full border-2 border-[#0072CE] border-t-transparent" />
        </div>
      );

    case "INTC":
      return (
        <div
          className={`${dimensions} rounded-lg bg-[#0068B5]/15 border border-[#0068B5]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Intel Corporation"
        >
          <span className="font-extrabold text-[#0068B5] text-[11px] tracking-tight">intel</span>
        </div>
      );

    case "SPCX":
      return (
        <div
          className={`${dimensions} rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 ${className}`}
          title="SpaceX"
        >
          <span className="font-black text-zinc-100 text-xs tracking-wider">X</span>
        </div>
      );

    default:
      return (
        <div
          className={`${dimensions} rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold ${className}`}
        >
          {cleanSymbol.slice(0, 2)}
        </div>
      );
  }
}
