import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const isProd = process.env.NODE_ENV === "production";

  // Check headers provided by hosting platforms (Vercel / Cloudflare)
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code");

  if (countryHeader) {
    const country = countryHeader.toUpperCase();
    const isUS = country === "US";
    return NextResponse.json({
      isUS,
      isBlocked: isUS,
      country,
      source: "headers",
    });
  }

  // Fallback: query client IP geolocation via free API
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "";
    
    // If local development (127.0.0.1 / ::1 / empty), default to non-US so local testing works
    if (!isProd && (!ip || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10."))) {
      return NextResponse.json({
        isUS: false,
        isBlocked: false,
        country: "DEV",
        source: "local-dev",
      });
    }

    if (ip) {
      const res = await fetch(`https://ipapi.co/${ip}/json/`, { next: { revalidate: 3600 } });
      const data = await res.json();
      if (data && data.country_code) {
        const country = String(data.country_code).toUpperCase();
        const isUS = country === "US";
        return NextResponse.json({
          isUS,
          isBlocked: isUS,
          country,
          source: "ipapi",
        });
      }
    }

    // If country is unknown: in production, block swap (fail-closed, not fail-open)
    return NextResponse.json({
      isUS: isProd,
      isBlocked: isProd,
      country: "UNKNOWN",
      source: "unknown",
      failClosed: isProd,
    });
  } catch (e) {
    // In production, block swap (fail-closed, not fail-open)
    return NextResponse.json({
      isUS: isProd,
      isBlocked: isProd,
      country: "UNKNOWN",
      source: "fallback",
      failClosed: isProd,
    });
  }
}

