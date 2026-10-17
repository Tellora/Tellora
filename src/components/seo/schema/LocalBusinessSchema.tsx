import { SEO_CONFIG } from "@/lib/seo";
import { SOCIAL_PROFILES } from "./OrganizationSchema";

export default function LocalBusinessSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${SEO_CONFIG.siteUrl}/#localbusiness`,
        "name": SEO_CONFIG.organizationName,
        "url": SEO_CONFIG.siteUrl,
        "image": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultOGImage}`,
        "logo": `${SEO_CONFIG.siteUrl}/tellora-logo.png`,
        "description": SEO_CONFIG.defaultDescription,
        "priceRange": "₹₹",
        "telephone": SEO_CONFIG.contactPhone,
        "email": SEO_CONFIG.contactEmail,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "New Delhi",
            "addressRegion": "Delhi",
            "addressCountry": "IN"
        },
        "sameAs": SOCIAL_PROFILES,
        "parentOrganization": { "@id": `${SEO_CONFIG.siteUrl}/#organization` },
        "areaServed": [
            { "@type": "City", "name": "Delhi" },
            { "@type": "AdministrativeArea", "name": "Delhi NCR" },
            { "@type": "Country", "name": "India" }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
