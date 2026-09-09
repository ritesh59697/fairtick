import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function CoinbaseLogo({ className = "w-4 h-4" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Coinbase Logo"
    >
      <path
        d="M0 11.0769C0 4.95931 4.95931 0 11.0769 0H36.9231C43.0407 0 48 4.95931 48 11.0769V36.9231C48 43.0407 43.0407 48 36.9231 48H11.0769C4.95931 48 0 43.0407 0 36.9231V11.0769Z"
        fill="#0052FF"
      />
      <path
        d="M23.9573 32.5C22.3527 32.4676 20.7898 31.9838 19.4487 31.1044C18.1076 30.2249 17.0427 28.9855 16.3767 27.5289C15.7108 26.0724 15.4707 24.4578 15.6842 22.8711C15.8977 21.2843 16.5561 19.79 17.5835 18.5602C18.611 17.3303 19.9658 16.4149 21.4919 15.9193C23.018 15.4237 24.6534 15.3681 26.2098 15.7589C27.7663 16.1497 29.1804 16.9709 30.2894 18.1281C31.3985 19.2853 32.1574 20.7315 32.4787 22.3H41C40.5628 17.9606 38.4703 13.9546 35.1552 11.1109C31.8402 8.26711 27.5563 6.803 23.1895 7.02133C18.8226 7.23967 14.707 9.12377 11.6937 12.284C8.68042 15.4442 7 19.6386 7 24C7 28.3613 8.68042 32.5558 11.6937 35.716C14.707 38.8762 18.8226 40.7603 23.1895 40.9787C27.5563 41.197 31.8402 39.7329 35.1552 36.8891C38.4703 34.0454 40.5628 30.0394 41 25.7H32.4787C32.4787 29.1 27.3658 32.5 23.9573 32.5Z"
        fill="white"
      />
    </svg>
  );
}

export function ChainlinkLogo({ className = "w-4 h-4" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#375BD2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Chainlink Logo"
    >
      <path d="M12 0L9.798 1.266l-6 3.468L1.596 6v12l2.202 1.266 6.055 3.468L12.055 24l2.202-1.266 5.945-3.468L22.404 18V6l-2.202-1.266-6-3.468zM6 15.468V8.532l6-3.468 6 3.468v6.936l-6 3.468z" />
    </svg>
  );
}

export function UniswapLogo({ className = "w-4 h-4" }: LogoProps) {
  return (
    <img
      src="/logos/uniswap.svg"
      alt="Uniswap Logo"
      className={`${className} object-contain`}
      width={16}
      height={16}
    />
  );
}

export { BaseLogo } from "@/components/BaseLogo";
