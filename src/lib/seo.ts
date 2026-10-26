export const SEO_CONFIG = {
    siteName: "Tellora Media",
    siteUrl: "https://telloramediahq.com",
    defaultTitle: "Tellora Media | Digital Marketing Agency in Delhi",
    titleTemplate: "%s | Tellora Media",
    defaultDescription: "Tellora Media is a full-service digital marketing agency in Delhi, India. We architect SEO, performance marketing, social media, and web growth systems for D2C brands and local businesses.",
    defaultOGImage: "/og-default.png",
    twitterHandle: "@telloramedia",
    locale: "en_IN",
    alternateLocales: ["en_US", "en_GB"],
    organizationName: "Tellora Media",
    contactEmail: "contact@telloramediahq.com",
    contactPhone: "+91 76784 93113",
    address: {
        city: "Delhi",
        country: "India",
    },
};

/**
 * US / international pages (/us, /for-electrical-contractors) are built but kept out of search
 * (noindex + not in sitemap) until their TODO content is filled in. Flip to true to publish.
 * See WEBSITE_TODOS.md.
 */
export const US_PAGES_LIVE = false;

/** US contact details. TODO: fill in real values before publishing; null values are hidden in the UI. */
export const US_CONTACT = {
    email: null as string | null, // TODO: us@telloramediahq.com (confirm mailbox exists)
    phone: null as string | null, // TODO: US phone (+1 ...)
    calendlyUrl: null as string | null, // TODO: Calendly US audit link
    responseTime: "We respond to inquiries within 4 business hours (IST or EST).", // TODO: confirm commitment is realistic
};

export function getCanonicalUrl(path: string): string {
    const baseUrl = SEO_CONFIG.siteUrl;
    // Ensure consistent trailing slash
    const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
    if (sanitizedPath === "/") return baseUrl + "/";
    return `${baseUrl}${sanitizedPath.endsWith("/") ? sanitizedPath : `${sanitizedPath}/`}`;
}
