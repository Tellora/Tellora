import { SEO_CONFIG } from "@/lib/seo";

export default function ServicesSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${SEO_CONFIG.organizationName} Digital Marketing Services`,
        "itemListElement": [
            { "@type": "Service", "position": 1, "name": "Search Engine Optimization", "provider": { "@type": "Organization", "name": SEO_CONFIG.organizationName }, "url": `${SEO_CONFIG.siteUrl}/services/` },
            { "@type": "Service", "position": 2, "name": "Performance Marketing", "provider": { "@type": "Organization", "name": SEO_CONFIG.organizationName }, "url": `${SEO_CONFIG.siteUrl}/services/` },
            { "@type": "Service", "position": 3, "name": "Social Media Management", "provider": { "@type": "Organization", "name": SEO_CONFIG.organizationName }, "url": `${SEO_CONFIG.siteUrl}/services/` },
            { "@type": "Service", "position": 4, "name": "Content Creation & Management", "provider": { "@type": "Organization", "name": SEO_CONFIG.organizationName }, "url": `${SEO_CONFIG.siteUrl}/services/` },
            { "@type": "Service", "position": 5, "name": "Web Development & Design", "provider": { "@type": "Organization", "name": SEO_CONFIG.organizationName }, "url": `${SEO_CONFIG.siteUrl}/services/` },
            { "@type": "Service", "position": 6, "name": "Video Post-Production", "provider": { "@type": "Organization", "name": SEO_CONFIG.organizationName }, "url": `${SEO_CONFIG.siteUrl}/services/` }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
