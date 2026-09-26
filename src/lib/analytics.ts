export type AnalyticsEvent =
  | "page_view" | "cta_click" | "video_play" | "lead_submission"
  | "athlete_application" | "partner_inquiry" | "portal_request" | "donation_interest"
  | "contact_submission" | "mentor_volunteer_interest";

export function trackEvent(event: AnalyticsEvent, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("eal:analytics", { detail: { event, properties } }));
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push({ event, ...properties });
}

export function getAttribution(source: string) {
  if (typeof window === "undefined") return { source };
  const params = new URLSearchParams(window.location.search);
  return {
    source,
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    landing_page: window.location.pathname,
    referrer: document.referrer || undefined,
    timestamp: new Date().toISOString(),
  };
}
