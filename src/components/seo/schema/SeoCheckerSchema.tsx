import { SEO_CONFIG } from "@/lib/seo";

export default function SeoCheckerSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Tellora SEO Audit Tool",
        "url": `${SEO_CONFIG.siteUrl}/seo-checker/`,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        },
        "description": "Free technical SEO audit tool that scans 250+ parameters including crawler mapping, Core Web Vitals, and security intel.",
        "featureList": ["Crawler Mapping", "Core Web Vitals Analysis", "Security Intel", "Redirect Chain Detection", "Robots.txt Validation"]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
