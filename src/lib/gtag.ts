export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window !== "undefined" && GA_TRACKING_ID) {
        (window as any).gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

type GTagEvent = {
    action: string;
    category?: string;
    label?: string;
    value?: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== "undefined" && GA_TRACKING_ID) {
        (window as any).gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

/**
 * Named conversion events for the US / international funnel (see ANALYTICS.md).
 * Works with gtag (GA4) and also pushes to dataLayer so a future GTM container can pick them up.
 */
export type ConversionEventName =
    | "us_audit_booking_click" // click on "Book a free 20-min audit" (Calendly link)
    | "electrical_audit_form_submit" // free local SEO audit form on /for-electrical-contractors
    | "contact_region_selected"; // region dropdown on /contact

export const trackEvent = (name: ConversionEventName, params: Record<string, string | number | boolean> = {}) => {
    if (typeof window === "undefined") return;
    const w = window as any;
    try {
        if (GA_TRACKING_ID && typeof w.gtag === "function") {
            w.gtag("event", name, params);
        }
        if (Array.isArray(w.dataLayer)) {
            w.dataLayer.push({ event: name, ...params });
        }
    } catch {
        /* analytics must never break the page */
    }
};
