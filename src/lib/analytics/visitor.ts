import { VisitorIdentity } from "./types";

const VISITOR_ID_KEY = "reyo_visitor_id";
const VISIT_COUNT_KEY = "reyo_visit_count";
const LAST_VISIT_KEY = "reyo_last_visit_time";
const THROTTLE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback RFC4122 v4 compliant UUID generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setCookie(name: string, value: string, days = 3650) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getOrCreateVisitorIdentity(): VisitorIdentity {
  const now = Date.now();
  let visitorId: string | null = null;
  let storedVisitCount = 0;
  let lastVisitTime = 0;

  // 1. Try reading from localStorage
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      visitorId = localStorage.getItem(VISITOR_ID_KEY);
      storedVisitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10);
      lastVisitTime = parseInt(localStorage.getItem(LAST_VISIT_KEY) || "0", 10);
    } catch {
      // localStorage fallback to cookie
    }
  }

  // 2. Fallback to Cookies if localStorage was empty
  if (!visitorId) {
    visitorId = getCookie(VISITOR_ID_KEY);
    storedVisitCount = parseInt(getCookie(VISIT_COUNT_KEY) || "0", 10);
    lastVisitTime = parseInt(getCookie(LAST_VISIT_KEY) || "0", 10);
  }

  const isReturning = Boolean(visitorId && storedVisitCount > 0);
  if (!visitorId) {
    visitorId = generateUUID();
  }

  const visitCount = storedVisitCount + 1;

  // Anti-spam 5 minute throttle check
  const timeSinceLastVisit = now - lastVisitTime;
  const shouldNotifyDiscord = !lastVisitTime || timeSinceLastVisit >= THROTTLE_WINDOW_MS;

  // Persist updated state
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
      localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString());
      localStorage.setItem(LAST_VISIT_KEY, now.toString());
    } catch {
      // Ignore storage write error
    }
  }

  setCookie(VISITOR_ID_KEY, visitorId);
  setCookie(VISIT_COUNT_KEY, visitCount.toString());
  setCookie(LAST_VISIT_KEY, now.toString());

  return {
    visitorId,
    isReturning,
    visitCount,
    lastVisitTime,
    shouldNotifyDiscord,
  };
}
