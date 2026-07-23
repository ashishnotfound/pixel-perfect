import { EnquiryFormData, DiscordWebhookPayload } from "./types";

function getDiscordEnquiryWebhookUrl(): string {
  return (
    process.env.DISCORD_ENQUIRY_WEBHOOK ||
    process.env.VITE_DISCORD_ENQUIRY_WEBHOOK ||
    process.env.DISCORD_QR_WEBHOOK ||
    process.env.VITE_DISCORD_QR_WEBHOOK ||
    (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_DISCORD_ENQUIRY_WEBHOOK || import.meta.env.VITE_DISCORD_QR_WEBHOOK : undefined) ||
    ""
  );
}

export function buildEnquiryEmbedPayload(data: EnquiryFormData): DiscordWebhookPayload {
  const formattedDescription = data.projectDescription.trim()
    ? `\`\`\`text\n${data.projectDescription.trim()}\n\`\`\``
    : "_No detailed description provided._";

  return {
    embeds: [
      {
        title: "🚀 New Website Enquiry",
        description: "A new client enquiry has been submitted through the website.",
        color: 0x22c55e, // Green
        author: {
          name: "Reyo Studio",
        },
        fields: [
          {
            name: "👤 Owner",
            value: `**${data.ownerName}**`,
            inline: true,
          },
          {
            name: "🏢 Business",
            value: `• **Name:** ${data.businessName}\n• **Category:** ${data.businessCategory}`,
            inline: true,
          },
          {
            name: "📍 Location",
            value: `• **State:** ${data.state}\n• **City:** ${data.city}`,
            inline: true,
          },
          {
            name: "📱 Contact",
            value: `• **Phone:** \`${data.phone}\`\n• **Email:** ${data.email || "Not Provided"}\n• **Preferred Method:** ${data.preferredContactMethod || "WhatsApp"}\n• **Best Time:** ${data.bestTimeToContact || "Anytime"}`,
            inline: false,
          },
          {
            name: "🌐 Website Type",
            value: data.websiteType || "Not Specified",
            inline: true,
          },
          {
            name: "💰 Budget",
            value: data.budget || "Not Specified",
            inline: true,
          },
          {
            name: "📣 Lead Source",
            value: data.leadSource || "Direct Website",
            inline: true,
          },
          {
            name: "📝 Project Description",
            value: formattedDescription,
            inline: false,
          },
        ],
        footer: {
          text: "Reyo Studio • Website Enquiry",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export async function sendEnquiryDiscordNotification(data: EnquiryFormData): Promise<boolean> {
  const webhookUrl = getDiscordEnquiryWebhookUrl();

  if (!webhookUrl) {
    console.warn("[Enquiry System] DISCORD_ENQUIRY_WEBHOOK environment variable is not configured.");
    return false;
  }

  const payload = buildEnquiryEmbedPayload(data);

  async function postToDiscord(): Promise<boolean> {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  }

  try {
    const success = await postToDiscord();
    if (success) return true;

    // Retry once after 1s delay
    console.warn("[Enquiry System] Initial Discord notification failed. Retrying in 1s...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await postToDiscord();
  } catch (error) {
    console.error("[Enquiry System] Discord Webhook error:", error);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await postToDiscord();
    } catch (retryError) {
      console.error("[Enquiry System] Discord Webhook retry failed:", retryError);
      return false;
    }
  }
}
