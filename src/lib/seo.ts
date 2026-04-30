export const SEO_CONFIG = {
    siteName: "Tellora Media",
    siteUrl: "https://telloramedia.online",
    defaultTitle: "Tellora Media | Digital Marketing Agency in Delhi",
    titleTemplate: "%s | Tellora Media",
    defaultDescription: "Tellora Media is a full-service digital marketing agency in Delhi, India. We architect SEO, performance marketing, social media, and web growth systems for D2C brands and local businesses.",
    defaultOGImage: "/og-default.png",
    twitterHandle: "@telloramedia",
    locale: "en_IN",
    alternateLocales: ["en_US", "en_GB"],
    organizationName: "Tellora Media",
    contactEmail: "contact@telloramedia.online",
    contactPhone: "+91 76784 93113",
    address: {
        city: "Delhi",
        country: "India",
    },
};

export function getCanonicalUrl(path: string): string {
    const baseUrl = SEO_CONFIG.siteUrl;
    // Ensure consistent trailing slash
    const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
    if (sanitizedPath === "/") return baseUrl + "/";
    return `${baseUrl}${sanitizedPath.endsWith("/") ? sanitizedPath : `${sanitizedPath}/`}`;
}
