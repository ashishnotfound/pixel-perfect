import { ClientAnalyticsPayload, GeoIPDetails, ParsedUserAgent, DiscordWebhookPayload } from "./types";
import { getCountryFlagEmoji } from "./utils";

const DEFAULT_DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1415280247141695541/1i7noMYfM7cb23Hcbf1MuAn3g1IR5kYSQvjJumgaG7jrs5rihQKP3zOQcAnICbjkJs1Y";

function getDiscordWebhookUrl(): string {
  return (
    process.env.DISCORD_QR_WEBHOOK ||
    process.env.VITE_DISCORD_QR_WEBHOOK ||
    (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_DISCORD_QR_WEBHOOK : undefined) ||
    DEFAULT_DISCORD_WEBHOOK
  );
}

export function buildDiscordEmbedPayload(
  payload: ClientAnalyticsPayload,
  geo: GeoIPDetails,
  ua: ParsedUserAgent
): DiscordWebhookPayload {
  const flagEmoji = getCountryFlagEmoji(geo.countryCode);
  const embedColor = payload.isReturning ? 0x3b82f6 : 0x22c55e; // Blue if returning, Green if new

  return {
    embeds: [
      {
        title: "📈 Reyo Studio Flyer Scan",
        description: "A new flyer has been scanned.",
        color: embedColor,
        author: {
          name: "Reyo Studio Analytics",
        },
        fields: [
          {
            name: "🕒 Scan Time",
            value: `• **Local:** ${payload.localTimestamp}\n• **UTC:** ${new Date().toUTCString()}`,
            inline: false,
          },
          {
            name: "👤 Visitor",
            value: `• **Visitor ID:** \`${payload.visitorId}\`\n• **Status:** ${
              payload.isReturning ? "🔵 Returning Visitor" : "🟢 New Visitor"
            }\n• **Total Visits:** ${payload.visitCount}`,
            inline: false,
          },
          {
            name: "🌍 Location",
            value: `${flagEmoji} **Country:** ${geo.country} (${geo.countryCode})\n🏙 **City:** ${geo.city}\n📍 **Region:** ${geo.region}\n🕒 **Timezone:** ${geo.timezone}`,
            inline: true,
          },
          {
            name: "💻 Device",
            value: `📱 **Type:** ${ua.deviceType}\n🖥 **OS:** ${ua.os} ${ua.osVersion}\n🌐 **Browser:** ${ua.browser} ${ua.browserVersion}`,
            inline: true,
          },
          {
            name: "📺 Display",
            value: `**Resolution:** ${payload.screenResolution}\n**Language:** ${payload.language}`,
            inline: true,
          },
          {
            name: "🌐 Network",
            value: `**IP Address:** \`${geo.ipAddress}\``,
            inline: true,
          },
          {
            name: "🔗 Landing",
            value: `**Landing URL:** ${payload.landingUrl}\n**Referrer:** ${payload.referrer || "Direct / None"}`,
            inline: false,
          },
          {
            name: "📡 Technical",
            value: `• **Platform:** ${payload.platform}\n• **Touch Support:** ${
              payload.touchSupport ? "Yes" : "No"
            }\n• **Cookies:** ${payload.cookiesEnabled ? "Enabled" : "Disabled"}\n• **Do Not Track:** ${
              payload.doNotTrack ? "Yes" : "No"
            }\n• **User Agent:** \`${payload.userAgent}\``,
            inline: false,
          },
        ],
        footer: {
          text: "Reyo Studio • QR Analytics",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export async function sendDiscordNotification(
  payload: ClientAnalyticsPayload,
  geo: GeoIPDetails,
  ua: ParsedUserAgent
): Promise<boolean> {
  const webhookUrl = getDiscordWebhookUrl();

  if (!webhookUrl) {
    console.warn("[QR Analytics] DISCORD_QR_WEBHOOK environment variable is not configured.");
    return false;
  }

  const embedData = buildDiscordEmbedPayload(payload, geo, ua);

  async function postToDiscord(): Promise<boolean> {
    const response = await fetch(webhookUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(embedData),
    });
    return response.ok;
  }

  try {
    const success = await postToDiscord();
    if (success) return true;

    // Retry once after 1s delay
    console.warn("[QR Analytics] Initial Discord notification failed. Retrying in 1s...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await postToDiscord();
  } catch (error) {
    console.error("[QR Analytics] Discord Webhook error:", error);
    try {
      // Retry once after error
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await postToDiscord();
    } catch (retryError) {
      console.error("[QR Analytics] Discord Webhook retry failed:", retryError);
      return false;
    }
  }
}
