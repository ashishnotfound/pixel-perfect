export interface VisitorIdentity {
  visitorId: string;
  isReturning: boolean;
  visitCount: number;
  lastVisitTime: number;
  shouldNotifyDiscord: boolean;
}

export interface ClientAnalyticsPayload {
  visitorId: string;
  isReturning: boolean;
  visitCount: number;
  localTimestamp: string;
  screenWidth: number;
  screenHeight: number;
  screenResolution: string;
  language: string;
  referrer: string;
  landingUrl: string;
  userAgent: string;
  platform: string;
  touchSupport: boolean;
  cookiesEnabled: boolean;
  doNotTrack: boolean;
  connectionType: string;
  shouldNotifyDiscord: boolean;
}

export interface GeoIPDetails {
  ipAddress: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  timezone: string;
}

export interface ParsedUserAgent {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceType: string;
  deviceVendor: string;
  deviceModel: string;
}

export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  title: string;
  description: string;
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
