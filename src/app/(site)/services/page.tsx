import ServicesClient from "./ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Growth Services | SEO, PPC & Next.js Performance Web Design | Tellora Media",
    description: "Explore Tellora Media's core growth ecosystems. We specialize in semantic high-frequency SEO, Technical Core Web Vitals, ML-optimized PPC management, and conversion-forced branding.",
    keywords: ["Semantic SEO Strategy", "Data-Driven PPC Management", "Performance Web Design", "Conversion Rate Optimization CRO", "Brand Identity Systems", "High-Authority Link Building"],
    alternates: {
        canonical: "https://tellora.media/services",
    },
    openGraph: {
        title: "Digital Growth Services | SEO, PPC & Design | Tellora Media",
        description: "Explore our end-to-end growth ecosystems for market dominance.",
        url: "https://tellora.media/services",
        siteName: "Tellora Media",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Services | Tellora Media",
        description: "Explore Tellora Media's core SEO, PPC, and Performance Design services.",
    }
};

export default function ServicesPage() {
    return <ServicesClient />;
}
