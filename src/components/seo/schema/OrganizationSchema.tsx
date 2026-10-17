import { SEO_CONFIG } from "@/lib/seo";

export const SOCIAL_PROFILES = [
    "https://www.instagram.com/telloramedia/",
    "https://www.linkedin.com/company/tellora-media",
];

export default function OrganizationSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SEO_CONFIG.siteUrl}/#organization`,
        "name": SEO_CONFIG.organizationName,
        "url": SEO_CONFIG.siteUrl,
        "logo": `${SEO_CONFIG.siteUrl}/tellora-logo.png`,
        "image": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultOGImage}`,
        "description": SEO_CONFIG.defaultDescription,
        "email": SEO_CONFIG.contactEmail,
        "telephone": SEO_CONFIG.contactPhone,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": SEO_CONFIG.address.city,
            "addressRegion": "Delhi",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "telephone": SEO_CONFIG.contactPhone,
            "email": SEO_CONFIG.contactEmail,
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": SOCIAL_PROFILES,
        "knowsAbout": ["SEO", "Performance Marketing", "Social Media Marketing", "Content Marketing", "Web Development"]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
