import { SEO_CONFIG } from "@/lib/seo";

export default function LocalBusinessSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        "name": SEO_CONFIG.organizationName,
        "url": SEO_CONFIG.siteUrl,
        "image": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultOGImage}`,
        "priceRange": "₹₹",
        "telephone": SEO_CONFIG.contactPhone,
        "email": SEO_CONFIG.contactEmail,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "New Delhi",
            "addressRegion": "Delhi",
            "postalCode": "PLACEHOLDER_PINCODE", // TODO: Add actual pincode
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "PLACEHOLDER_LAT", // TODO: Add latitude
            "longitude": "PLACEHOLDER_LNG" // TODO: Add longitude
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "19:00"
        },
        "areaServed": ["Delhi", "India", "Global"]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
