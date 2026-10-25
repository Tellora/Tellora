import { SEO_CONFIG } from "@/lib/seo";
import { SOCIAL_PROFILES } from "./OrganizationSchema";

/**
 * US presence: a service-area business serving the United States from Delhi.
 * Deliberately has NO street address or geo: Tellora has no US office, and listing one would break
 * Google's local business guidelines. (India HQ is described by LocalBusinessSchema.)
 * TODO: add a US address/phone only if a real US office or virtual office exists.
 */
export default function ProfessionalServiceSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SEO_CONFIG.siteUrl}/#us-service`,
        "name": `${SEO_CONFIG.organizationName} (United States)`,
        "url": `${SEO_CONFIG.siteUrl}/us/`,
        "image": `${SEO_CONFIG.siteUrl}/og-us.png`,
        "logo": `${SEO_CONFIG.siteUrl}/tellora-logo.png`,
        "description": "Digital marketing for US home service businesses: local SEO, Google Ads and Local Services Ads, Google Business Profile management and website conversion.",
        "email": SEO_CONFIG.contactEmail,
        "parentOrganization": { "@id": `${SEO_CONFIG.siteUrl}/#organization` },
        "areaServed": { "@type": "Country", "name": "United States" },
        "knowsAbout": ["Local SEO", "Google Ads", "Google Local Services Ads", "Google Business Profile", "Reputation management"],
        "sameAs": SOCIAL_PROFILES,
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
