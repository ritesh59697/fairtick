"use client";

import React from "react";

interface StockLogoProps {
  symbol: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StockLogo({ symbol, size = "md", className = "" }: StockLogoProps) {
  const cleanSymbol = symbol.replace(/c$/i, "").toUpperCase();

  const sizeClasses =
    size === "sm"
      ? "w-7 h-7 p-1.5 rounded-lg"
      : size === "lg"
      ? "w-13 h-13 p-2.5 rounded-2xl"
      : "w-10 h-10 p-2 rounded-xl";

  switch (cleanSymbol) {
    case "NVDA":
      // NVIDIA: Bold official green squircle with crisp white emblem
      return (
        <div
          className={`${sizeClasses} bg-[#76B900] shadow-md shadow-[#76B900]/25 flex items-center justify-center shrink-0 ${className}`}
          title="NVIDIA Corporation"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" />
          </svg>
        </div>
      );

    case "AAPL":
      // Apple: Pitch black squircle with clean white Apple logo
      return (
        <div
          className={`${sizeClasses} bg-black border border-zinc-700/80 shadow-md flex items-center justify-center shrink-0 ${className}`}
          title="Apple Inc."
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
        </div>
      );

    case "META":
      // Meta Platforms: Royal blue squircle with white infinity loop
      return (
        <div
          className={`${sizeClasses} bg-[#0081FB] shadow-md shadow-[#0081FB]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Meta Platforms Inc."
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
          </svg>
        </div>
      );

    case "GOOGL":
    case "GOOG":
      // Google: Dark squircle with crisp 4-color Google G
      return (
        <div
          className={`${sizeClasses} bg-zinc-900 border border-zinc-700/80 shadow-md flex items-center justify-center shrink-0 ${className}`}
          title="Alphabet Inc."
        >
          <svg viewBox="0 0 24 24" className="w-full h-full" role="img">
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
      // Tesla: Rich Crimson Red squircle with white Tesla T
      return (
        <div
          className={`${sizeClasses} bg-[#E82127] shadow-md shadow-[#E82127]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Tesla Inc."
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z" />
          </svg>
        </div>
      );

    case "MSFT":
      // Microsoft: Clean dark squircle with authentic 4-color Windows tiles
      return (
        <div
          className={`${sizeClasses} bg-zinc-900 border border-zinc-700/80 shadow-md flex items-center justify-center shrink-0 ${className}`}
          title="Microsoft Corporation"
        >
          <div className="grid grid-cols-2 gap-1 w-full h-full p-0.5">
            <div className="bg-[#F25022] rounded-[2px]" />
            <div className="bg-[#7FBA00] rounded-[2px]" />
            <div className="bg-[#00A4EF] rounded-[2px]" />
            <div className="bg-[#FFB900] rounded-[2px]" />
          </div>
        </div>
      );

    case "AMZN":
      // Amazon: Vibrant Amazon Orange squircle with white smile arrow
      return (
        <div
          className={`${sizeClasses} bg-[#FF9900] shadow-md shadow-[#FF9900]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Amazon.com Inc."
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z" />
          </svg>
        </div>
      );

    case "COIN":
      // Coinbase: Official Coinbase Blue with clean white C glyph
      return (
        <div
          className={`${sizeClasses} bg-[#0052FF] shadow-md shadow-[#0052FF]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Coinbase Global Inc."
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-18.5C8.41 5.5 5.5 8.41 5.5 12s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5h-4c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5c1.38 0 2.5 1.12 2.5 2.5h4c0-3.59-2.91-6.5-6.5-6.5z" />
          </svg>
        </div>
      );

    case "MSTR":
      // MicroStrategy: Bold Red squircle with white official 3-block M
      return (
        <div
          className={`${sizeClasses} bg-[#D9272E] shadow-md shadow-[#D9272E]/30 flex items-center justify-center shrink-0 ${className}`}
          title="MicroStrategy Inc."
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M9.095 2.572h5.827v18.856H9.096zM0 2.572h5.825v18.856H.001zm18.174 0v18.854H24V8.33z" />
          </svg>
        </div>
      );

    case "CRCL":
      // Circle: Deep navy squircle with official Circle concentric ring
      return (
        <div
          className={`${sizeClasses} bg-[#0A2540] border border-[#00D4FF]/40 shadow-md flex items-center justify-center shrink-0 ${className}`}
          title="Circle Internet Financial"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M20.788 3.832c-.101-.105-.197-.213-.301-.317-.103-.103-.211-.202-.32-.302A11.903 11.903 0 0 0 12 0a11.926 11.926 0 0 0-8.486 3.514C-1.062 8.09-1.16 15.47 3.213 20.168c.099.108.197.214.3.32.104.103.21.2.317.3A11.92 11.92 0 0 0 12 24c3.206 0 6.22-1.247 8.487-3.512 4.576-4.576 4.673-11.956.301-16.656zm-16.655.301A11.057 11.057 0 0 1 12 .874c2.825 0 5.49 1.048 7.55 2.958l-1.001 1.002A9.646 9.646 0 0 0 12 2.292a9.644 9.644 0 0 0-6.865 2.844A9.644 9.644 0 0 0 2.292 12c0 2.448.9 4.753 2.542 6.549L3.831 19.55C-.201 15.191-.101 8.367 4.133 4.133z" />
          </svg>
        </div>
      );

    case "INTC":
      // Intel: Intel Blue squircle with clean white Intel emblem
      return (
        <div
          className={`${sizeClasses} bg-[#0068B5] shadow-md shadow-[#0068B5]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Intel Corporation"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M20.42 7.345v9.18h1.651v-9.18zM0 7.475v1.737h1.737V7.474zm9.78.352v6.053c0 .513.044.945.13 1.292.087.34.235.618.44.828.203.21.475.359.803.451.334.093.754.136 1.255.136h.216v-1.533c-.24 0-.445-.012-.593-.037a.672.672 0 0 1-.39-.173.693.693 0 0 1-.173-.377 4.002 4.002 0 0 1-.037-.606v-2.182h1.193v-1.416h-1.193V7.827zm-3.505 2.312c-.396 0-.76.08-1.082.241-.327.161-.6.384-.822.668l-.087.117v-.902H2.658v6.256h1.639v-3.214c.018-.588.16-1.02.433-1.299.29-.297.642-.445 1.044-.445.476 0 .841.149 1.082.433.235.284.359.686.359 1.2v3.324h1.663V12.97c.006-.89-.229-1.595-.686-2.09-.458-.495-1.1-.742-1.917-.742z" />
          </svg>
        </div>
      );

    case "SPCX":
      // SpaceX: Pitch black squircle with official white trajectory X
      return (
        <div
          className={`${sizeClasses} bg-black border border-zinc-700/80 shadow-md flex items-center justify-center shrink-0 ${className}`}
          title="SpaceX"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M24 7.417C8.882 8.287 1.89 14.75.321 16.28L0 16.583h2.797C10.356 9.005 21.222 7.663 24 7.417zm-17.046 6.35c-.472.321-.945.68-1.398 1.02l2.457 1.796h2.778zM2.948 10.8H.189l3.25 2.381c.473-.321 1.02-.661 1.512-.945Z" />
          </svg>
        </div>
      );

    case "SNDK":
      // Western Digital / SanDisk: Deep navy squircle with official WDC emblem
      return (
        <div
          className={`${sizeClasses} bg-[#002D72] shadow-md shadow-[#002D72]/30 flex items-center justify-center shrink-0 ${className}`}
          title="Western Digital / SanDisk"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white" role="img">
            <path d="M1.4916 4.6198C.1766 4.6235-.4917 6.2026.4214 7.149c1.1578 1.1552 2.3139 2.312 3.4705 3.4684 2.4059 2.3815 4.8088 4.766 7.2025 7.1596l1.0703 1.1152c.9402.9525 2.5611.2658 2.531-1.0722v-3.4255c-.0105-.8247-.677-1.4905-1.5018-1.4999h-4.156c-1.4481.0095-2.6245-1.1669-2.615-2.615v-4.16c-.0104-.8248-.677-1.4905-1.5018-1.5Zm9.261 0c-1.316.002-1.9858 1.582-1.0722 2.5292 3.9317 3.927 7.8588 7.8588 11.7881 11.788.9396.9519 2.5594.267 2.5311-1.0702v-3.4293c-.0105-.8247-.677-1.4905-1.5019-1.4999-1.4004.0137-2.8005-.0184-4.2007-.043-1.4475.0085-2.6227-1.1676-2.6131-2.615v-4.16c-.0105-.8247-.677-1.4904-1.502-1.4998Z" />
          </svg>
        </div>
      );

    default:
      return (
        <div
          className={`${sizeClasses} bg-blue-600 shadow-md flex items-center justify-center text-white font-bold text-xs ${className}`}
        >
          {cleanSymbol.slice(0, 2)}
        </div>
      );
  }
}
