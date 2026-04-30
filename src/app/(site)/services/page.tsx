import ServicesClient from "./ServicesClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import ServicesSchema from "@/components/seo/schema/ServicesSchema";

export const metadata: Metadata = {
    title: "Digital Marketing Services | SEO, Performance Marketing & More | Tellora Media",
    description: "Tellora Media offers end-to-end digital growth services: SEO, Meta & Google Ads, social media management, content creation, video post-production, and web development. Built for brands that mean business.",
    keywords: [
        "SEO services India",
        "performance marketing services",
        "social media management agency",
        "Meta Ads agency Delhi",
        "Google Ads management India",
        "content marketing agency",
        "web design agency Delhi"
    ],
    alternates: {
        canonical: getCanonicalUrl("/services/"),
    },
    openGraph: {
        title: "Digital Marketing Services | SEO, Performance Marketing & More | Tellora Media",
        description: "Tellora Media offers end-to-end digital growth services: SEO, Meta & Google Ads, social media management, content creation, video post-production, and web development. Built for brands that mean business.",
        url: getCanonicalUrl("/services/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: "/og-services.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Digital Marketing Services | SEO, Performance Marketing & More | Tellora Media",
        description: "Tellora Media offers end-to-end digital growth services: SEO, Meta & Google Ads, social media management, content creation, video post-production, and web development. Built for brands that mean business.",
        images: ["/og-services.png"],
    }
};

export default function ServicesPage() {
    return (
        <>
            <ServicesSchema />
            <ServicesClient />
        </>
    );
}
