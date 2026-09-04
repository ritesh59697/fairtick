import { parseAbi, type Address } from "viem";

/**
 * B20 Token ABI & Multiplier Mechanics
 * Multiplier is WAD (1e18).
 * 1 B20 token != 1 share forever.
 * When companies do stock splits, dividends or corporate actions, the multiplier updates.
 *
 * scaledBalanceOf(user) = rawBalance * multiplier / 1e18
 *
 * Note: Chainlink total-return feed already includes the multiplier!
 * Therefore, DEX token price in USD compares DIRECTLY to Chainlink total return feed.
 */
export const B20_TOKEN_ABI = parseAbi([
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function scaledBalanceOf(address account) view returns (uint256)",
  "function multiplier() view returns (uint256)",
  "function isAuthorized(address account) view returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)"
]);

export const WAD = 10n ** 18n;

/**
 * Converts raw token balance to scaled share count
 * e.g. 1 token with multiplier 1.0 = 1 share
 * e.g. 1 token with multiplier 2.0 (post 2:1 split) = 2 shares
 */
export function rawToScaledShares(rawUnits: bigint, multiplierWad: bigint = WAD): number {
  if (multiplierWad === 0n) return 0;
  // rawUnits is 8 decimals
  const scaledRaw = (rawUnits * multiplierWad) / WAD;
  return Number(scaledRaw) / 1e8;
}

export function formatRawTokens(rawUnits: bigint, decimals: number = 8): string {
  const val = Number(rawUnits) / 10 ** decimals;
  return val.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export function formatShares(shares: number): string {
  return shares.toLocaleString("en-US", { maximumFractionDigits: 4 });
}
