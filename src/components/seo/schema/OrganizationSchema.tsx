import { SEO_CONFIG } from "@/lib/seo";

export default function OrganizationSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SEO_CONFIG.organizationName,
        "url": SEO_CONFIG.siteUrl,
        "logo": `${SEO_CONFIG.siteUrl}/logo.png`,
        "description": SEO_CONFIG.defaultDescription,
        "email": SEO_CONFIG.contactEmail,
        "telephone": SEO_CONFIG.contactPhone,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": SEO_CONFIG.address.city,
            "addressRegion": "Delhi",
            "addressCountry": "IN"
        },
        "sameAs": [
            "PLACEHOLDER_INSTAGRAM_URL", // TODO: Update with actual URL
            "PLACEHOLDER_LINKEDIN_URL",  // TODO: Update with actual URL
            "PLACEHOLDER_TWITTER_URL"    // TODO: Update with actual URL
        ],
        "foundingDate": "2024",
        "numberOfEmployees": "2-10",
        "knowsAbout": ["SEO", "Performance Marketing", "Social Media Marketing", "Content Marketing", "Web Development"]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
