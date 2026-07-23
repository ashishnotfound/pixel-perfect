export interface EnquiryFormData {
  businessName: string;
  ownerName: string;
  phone: string;
  email?: string;
  businessCategory: string;
  state: string;
  city: string;
  websiteType?: string;
  projectDescription: string;
  budget?: string;
  preferredContactMethod?: string;
  bestTimeToContact?: string;
  leadSource?: string;
}

export interface EnquiryValidationErrors {
  businessName?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  businessCategory?: string;
  state?: string;
  city?: string;
  projectDescription?: string;
}

export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  title: string;
  description?: string;
  color: number;
  author: {
    name: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  fields: DiscordEmbedField[];
  footer: {
    text: string;
    icon_url?: string;
  };
  timestamp: string;
}

export interface DiscordWebhookPayload {
  embeds: DiscordEmbed[];
}
