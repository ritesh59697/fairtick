import { parseAbi, createPublicClient, http, type Address } from "viem";
import { base } from "viem/chains";

export const AGGREGATOR_V3_ABI = parseAbi([
  "function decimals() view returns (uint8)",
  "function description() view returns (string)",
  "function version() view returns (uint256)",
  "function getRoundData(uint80 _roundId) view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
  "function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"
]);

export type FeedStatus = "LIVE" | "STALE" | "HELD" | "FROZEN" | "UNAVAILABLE";

export interface FeedResult {
  priceUsd: number;
  updatedAt: number; // unix timestamp in seconds
  status: FeedStatus;
  statusReason: string;
  roundId: string;
  isTradeSafe: boolean;
}

// 30 minutes threshold in seconds
const STALENESS_THRESHOLD_SECONDS = 30 * 60;

/**
 * Checks if current time is within US Regular Trading Hours (RTH)
 * RTH is Monday - Friday, 9:30 AM to 4:00 PM Eastern Time (ET)
 */
export function isUsMarketOpen(nowMs: number = Date.now()): boolean {
  const date = new Date(nowMs);
  
  // Format to US Eastern Time parts
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });
  
  const parts = formatter.formatToParts(date);
  const weekdayPart = parts.find((p) => p.type === "weekday")?.value;
  const hourPart = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
  const minutePart = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);

  // Weekend: Saturday or Sunday
  if (weekdayPart === "Sat" || weekdayPart === "Sun") {
    return false;
  }

  const currentMinuteOfDay = hourPart * 60 + minutePart;
  const marketOpenMinute = 9 * 60 + 30; // 9:30 AM ET
  const marketCloseMinute = 16 * 60;    // 4:00 PM ET

  return currentMinuteOfDay >= marketOpenMinute && currentMinuteOfDay < marketCloseMinute;
}

/**
 * Read latestRoundData and evaluate staleness / market status
 */
export function evaluateFeedData(
  answer: bigint,
  updatedAt: bigint,
  feedDecimals: number = 8,
  forceStaleDemo: boolean = false
): FeedResult {
  const nowSec = Math.floor(Date.now() / 1000);
  const price = Number(answer) / 10 ** feedDecimals;
  const updatedSec = Number(updatedAt);
  const ageSeconds = nowSec - updatedSec;

  if (forceStaleDemo) {
    return {
      priceUsd: price,
      updatedAt: updatedSec,
      status: "STALE",
      statusReason: "DEMO: Feed artificially forced stale (over 30m old)",
      roundId: "0",
      isTradeSafe: false,
    };
  }

  if (answer <= 0n || updatedSec === 0) {
    return {
      priceUsd: 0,
      updatedAt: 0,
      status: "FROZEN",
      statusReason: "Feed paused or invalid round data",
      roundId: "0",
      isTradeSafe: false,
    };
  }

  const marketOpen = isUsMarketOpen();

  if (marketOpen) {
    if (ageSeconds > STALENESS_THRESHOLD_SECONDS) {
      return {
        priceUsd: price,
        updatedAt: updatedSec,
        status: "STALE",
        statusReason: `Feed stale: last updated ${Math.floor(ageSeconds / 60)}m ago (> 30m during market hours)`,
        roundId: "0",
        isTradeSafe: false,
      };
    }
    return {
      priceUsd: price,
      updatedAt: updatedSec,
      status: "LIVE",
      statusReason: `Live feed: updated ${Math.max(1, Math.floor(ageSeconds / 60))}m ago`,
      roundId: "0",
      isTradeSafe: true,
    };
  } else {
    // US Market closed / weekend
    return {
      priceUsd: price,
      updatedAt: updatedSec,
      status: "HELD",
      statusReason: "FEED HELD — US market closed. Trading against last official close.",
      roundId: "0",
      isTradeSafe: false, // Locked unless user toggles after-hours acknowledgement
    };
  }
}
