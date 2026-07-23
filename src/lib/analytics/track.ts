import { ClientAnalyticsPayload } from "./types";
import { extractIP, parseUserAgent, resolveGeoIP } from "./utils";
import { sendDiscordNotification } from "./discord";

export async function processQRAnalyticsTrack(
  clientPayload: ClientAnalyticsPayload,
  requestHeaders: Record<string, string | undefined>
): Promise<{ success: boolean }> {
  try {
    const userAgentString = clientPayload.userAgent || requestHeaders["user-agent"] || "";
    const parsedUA = parseUserAgent(userAgentString);

    const clientIP = extractIP(requestHeaders);
    const geoDetails = await resolveGeoIP(clientIP, requestHeaders);

    // Send Discord Rich Embed Notification
    if (clientPayload.shouldNotifyDiscord !== false) {
      await sendDiscordNotification(clientPayload, geoDetails, parsedUA);
    } else {
      console.log(`[QR Analytics] Discord notification skipped for visitor ${clientPayload.visitorId} (within 5-min throttle window).`);
    }

    return { success: true };
  } catch (error) {
    console.error("[QR Analytics] Error processing tracking payload:", error);
    return { success: false };
  }
}
