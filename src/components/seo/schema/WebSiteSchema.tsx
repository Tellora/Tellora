import { SEO_CONFIG } from "@/lib/seo";

export default function WebSiteSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SEO_CONFIG.organizationName,
        "url": SEO_CONFIG.siteUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${SEO_CONFIG.siteUrl}/blog/?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
