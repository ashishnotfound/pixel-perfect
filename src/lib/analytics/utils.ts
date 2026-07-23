import { GeoIPDetails, ParsedUserAgent } from "./types";

export function extractIP(headers: Record<string, string | undefined>): string {
  const forwarded = headers["x-forwarded-for"] || headers["x-real-ip"] || headers["cf-connecting-ip"] || headers["x-client-ip"];
  if (forwarded) {
    const ips = forwarded.split(",").map((s) => s.trim());
    if (ips[0] && ips[0] !== "::1" && ips[0] !== "127.0.0.1") {
      return ips[0];
    }
  }
  return "Unknown";
}

export function getCountryFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode === "Unknown" || countryCode.length !== 2) {
    return "🌐";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  if (!ua) {
    return {
      browser: "Unknown",
      browserVersion: "Unknown",
      os: "Unknown",
      osVersion: "Unknown",
      deviceType: "Desktop",
      deviceVendor: "Unknown",
      deviceModel: "Unknown",
    };
  }

  let browser = "Unknown";
  let browserVersion = "Unknown";
  let os = "Unknown";
  let osVersion = "Unknown";
  let deviceType = "Desktop";
  let deviceVendor = "Unknown";
  let deviceModel = "Unknown";

  // Device Type Detection
  if (/mobile/i.test(ua)) {
    deviceType = "Mobile";
  } else if (/tablet|ipad/i.test(ua)) {
    deviceType = "Tablet";
  }

  // OS Detection
  if (/iphone|ipad|ipod/i.test(ua)) {
    os = "iOS";
    deviceVendor = "Apple";
    const match = ua.match(/OS (\d+[_.\d]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (/macintosh|mac os x/i.test(ua)) {
    os = "macOS";
    deviceVendor = "Apple";
    const match = ua.match(/Mac OS X (\d+[_.\d]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (/android/i.test(ua)) {
    os = "Android";
    const match = ua.match(/Android (\d+[_.\d]+)/i);
    if (match) osVersion = match[1];
    if (/samsung/i.test(ua)) deviceVendor = "Samsung";
    else if (/pixel/i.test(ua)) deviceVendor = "Google";
    else if (/huawei/i.test(ua)) deviceVendor = "Huawei";
    else if (/xiaomi/i.test(ua)) deviceVendor = "Xiaomi";
  } else if (/windows nt/i.test(ua)) {
    os = "Windows";
    deviceVendor = "PC";
    if (/Windows NT 10.0/i.test(ua)) osVersion = "10/11";
    else if (/Windows NT 6.3/i.test(ua)) osVersion = "8.1";
    else if (/Windows NT 6.1/i.test(ua)) osVersion = "7";
  } else if (/linux/i.test(ua)) {
    os = "Linux";
  }

  // Browser Detection
  if (/edg/i.test(ua)) {
    browser = "Edge";
    const match = ua.match(/Edg\/(\d+[\.\d]+)/i);
    if (match) browserVersion = match[1];
  } else if (/chrome|crios/i.test(ua)) {
    browser = "Chrome";
    const match = ua.match(/(?:Chrome|CriOS)\/(\d+[\.\d]+)/i);
    if (match) browserVersion = match[1];
  } else if (/firefox|fxios/i.test(ua)) {
    browser = "Firefox";
    const match = ua.match(/(?:Firefox|FxIOS)\/(\d+[\.\d]+)/i);
    if (match) browserVersion = match[1];
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browser = "Safari";
    const match = ua.match(/Version\/(\d+[\.\d]+)/i);
    if (match) browserVersion = match[1];
  } else if (/opera|opr/i.test(ua)) {
    browser = "Opera";
    const match = ua.match(/(?:Opera|OPR)\/(\d+[\.\d]+)/i);
    if (match) browserVersion = match[1];
  }

  return {
    browser,
    browserVersion,
    os,
    osVersion,
    deviceType,
    deviceVendor,
    deviceModel,
  };
}

export async function resolveGeoIP(
  ipAddress: string,
  headers: Record<string, string | undefined>
): Promise<GeoIPDetails> {
  // 1. Check Vercel / Cloudflare geolocation headers first
  const headerCountry = headers["x-vercel-ip-country"] || headers["cf-ipcountry"];
  const headerCity = headers["x-vercel-ip-city"];
  const headerRegion = headers["x-vercel-ip-country-region"];
  const headerTimezone = headers["x-vercel-ip-timezone"];

  if (headerCountry && headerCountry !== "Unknown") {
    return {
      ipAddress,
      country: headerCountry,
      countryCode: headerCountry,
      region: headerRegion || "Unknown",
      city: headerCity ? decodeURIComponent(headerCity) : "Unknown",
      timezone: headerTimezone || "Unknown",
    };
  }

  // 2. If IP is valid public IP, attempt light external lookup (with 2.5s timeout)
  if (ipAddress && ipAddress !== "Unknown" && ipAddress !== "127.0.0.1" && ipAddress !== "::1") {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,country,countryCode,regionName,city,timezone`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.status === "success") {
          return {
            ipAddress,
            country: data.country || "Unknown",
            countryCode: data.countryCode || "Unknown",
            region: data.regionName || "Unknown",
            city: data.city || "Unknown",
            timezone: data.timezone || "Unknown",
          };
        }
      }
    } catch {
      // Fallback silently if GeoIP API fails
    }
  }

  return {
    ipAddress,
    country: "Unknown",
    countryCode: "Unknown",
    region: "Unknown",
    city: "Unknown",
    timezone: "Unknown",
  };
}
