import { ClientAnalyticsPayload } from "./types";
import { getOrCreateVisitorIdentity } from "./visitor";

export function initQRAnalytics(): void {
  if (typeof window === "undefined") return;

  // Rule: ONLY track visitors when URL contains ?from=qr
  const params = new URLSearchParams(window.location.search);
  const isQR = params.get("from") === "qr";

  if (!isQR) {
    return; // Normal visitors must NEVER be tracked
  }

  // Execute silently in background using requestIdleCallback or setTimeout
  const trigger = () => {
    try {
      const visitor = getOrCreateVisitorIdentity();

      const payload: ClientAnalyticsPayload = {
        visitorId: visitor.visitorId,
        isReturning: visitor.isReturning,
        visitCount: visitor.visitCount,
        localTimestamp: new Date().toLocaleString(),
        screenWidth: window.screen ? window.screen.width : 0,
        screenHeight: window.screen ? window.screen.height : 0,
        screenResolution: window.screen ? `${window.screen.width}x${window.screen.height}` : "Unknown",
        language: navigator.language || "Unknown",
        referrer: document.referrer || "Direct",
        landingUrl: window.location.href,
        userAgent: navigator.userAgent || "Unknown",
        platform: navigator.platform || "Unknown",
        touchSupport: Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 0),
        cookiesEnabled: navigator.cookieEnabled ?? true,
        doNotTrack: navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1",
        connectionType:
          (navigator as unknown as { connection?: { effectiveType?: string } }).connection?.effectiveType || "Unknown",
        shouldNotifyDiscord: visitor.shouldNotifyDiscord,
      };

      // Dispatch asynchronously to API route without blocking UI
      fetch("/api/track-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((err) => {
        console.warn("[QR Analytics] Tracking request failed silently:", err);
      });
    } catch (err) {
      console.warn("[QR Analytics] Client tracking exception:", err);
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(trigger);
  } else {
    setTimeout(trigger, 300);
  }
}
