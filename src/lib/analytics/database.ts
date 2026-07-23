import { LiveAnalyticsStats, QRScanRecord } from "./types";

function getSupabaseCredentials() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined);

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined);

  return { url, key };
}

export async function saveQRScanRecord(record: QRScanRecord): Promise<boolean> {
  const { url, key } = getSupabaseCredentials();

  if (!url || !key) {
    console.warn("[QR Analytics] Supabase credentials missing (SUPABASE_URL / SUPABASE_ANON_KEY).");
    return false;
  }

  try {
    const endpoint = `${url.replace(/\/$/, "")}/rest/v1/qr_analytics`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[QR Analytics] Failed to insert record to Supabase:", res.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[QR Analytics] Supabase database error:", error);
    return false;
  }
}

export async function fetchLiveAnalyticsStats(): Promise<LiveAnalyticsStats> {
  const { url, key } = getSupabaseCredentials();

  if (!url || !key) {
    return {
      totalScans: 1,
      uniqueVisitors: 1,
      returningVisitors: 0,
    };
  }

  try {
    const endpoint = `${url.replace(/\/$/, "")}/rest/v1/qr_analytics?select=visitor_id,is_returning`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    if (!res.ok) {
      return { totalScans: 1, uniqueVisitors: 1, returningVisitors: 0 };
    }

    const rows = (await res.json()) as Array<{ visitor_id: string; is_returning: boolean }>;
    const totalScans = rows.length;

    const uniqueVisitorSet = new Set<string>();
    let returningCount = 0;

    for (const row of rows) {
      if (row.visitor_id) {
        uniqueVisitorSet.add(row.visitor_id);
      }
      if (row.is_returning) {
        returningCount++;
      }
    }

    return {
      totalScans,
      uniqueVisitors: uniqueVisitorSet.size,
      returningVisitors: returningCount,
    };
  } catch (error) {
    console.error("[QR Analytics] Error fetching stats from Supabase:", error);
    return {
      totalScans: 1,
      uniqueVisitors: 1,
      returningVisitors: 0,
    };
  }
}
