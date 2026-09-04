import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Check headers provided by hosting platforms (Vercel / Cloudflare)
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code");

  if (countryHeader) {
    const isUS = countryHeader.toUpperCase() === "US";
    return NextResponse.json({
      isUS,
      country: countryHeader.toUpperCase(),
      source: "headers",
    });
  }

  // Fallback: query client IP geolocation via free API
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "";
    
    // If local development (127.0.0.1 / ::1 / empty), default to non-US so local testing works
    if (!ip || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      return NextResponse.json({
        isUS: false,
        country: "DEV",
        source: "local-dev",
      });
    }

    const res = await fetch(`https://ipapi.co/${ip}/json/`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const isUS = data.country_code === "US";
    return NextResponse.json({
      isUS,
      country: data.country_code || "UNKNOWN",
      source: "ipapi",
    });
  } catch (e) {
    // Fail safe in production or return permissive DEV flag
    return NextResponse.json({
      isUS: false,
      country: "UNKNOWN",
      source: "fallback",
    });
  }
}
