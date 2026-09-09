import React from "react";

interface FairTickLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: "badge" | "mark";
  className?: string;
}

export function FairTickLogo({
  size = 32,
  variant = "badge",
  className = "",
  ...props
}: FairTickLogoProps) {
  const isBadge = variant === "badge";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
      {...props}
    >
      <defs>
        {/* Base Blue to Electric Cyan Gradient for the Execution Tick */}
        <linearGradient id="ft-tick-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0052FF" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Deep Vibrant Gradient for the Foundation Spine & Guardrail */}
        <linearGradient id="ft-spine-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#0052FF" />
        </linearGradient>

        {/* Ambient Neon Drop Shadow for the glyph */}
        <filter id="ft-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0052FF" floodOpacity="0.5" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38BDF8" floodOpacity="0.35" />
        </filter>

        {/* Glossy Obsidian Badge Fill */}
        <linearGradient id="ft-badge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D1527" />
          <stop offset="100%" stopColor="#040711" />
        </linearGradient>
      </defs>

      {/* Optional Squircle Badge Enclosure */}
      {isBadge && (
        <>
          {/* Subtle Outer Glow */}
          <rect
            width="100"
            height="100"
            rx="26"
            fill="url(#ft-badge-bg)"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="2"
          />
          <rect
            x="1.5"
            y="1.5"
            width="97"
            height="97"
            rx="24.5"
            fill="none"
            stroke="rgba(56, 189, 248, 0.12)"
            strokeWidth="1"
          />
        </>
      )}

      {/* Signature Glyph: Interlocking 'F' Anchor + Ascending Verification 'Tick' */}
      <g filter="url(#ft-neon-glow)">
        {/* Top Guardrail Bar */}
        <rect x="25" y="24" width="48" height="10" rx="5" fill="url(#ft-spine-grad)" />

        {/* Vertical Oracle Foundation Spine */}
        <rect x="25" y="24" width="10" height="52" rx="5" fill="url(#ft-spine-grad)" />

        {/* Dynamic Ascending Execution Tick */}
        <path
          d="M18 52 L36 70 L80 26"
          stroke="url(#ft-tick-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
