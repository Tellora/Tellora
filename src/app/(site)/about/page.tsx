import AboutClient from "./AboutClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
    title: "About Us | Delhi Digital Marketing Agency",
    description: "Meet Tellora Media: a collective of elite marketing strategists, Next.js developers, and performance designers engineering high-frequency marketing campaigns. Join the digital growth architecture revolution.",
    keywords: ["Tellora Media Team", "Digital Growth Architecture Form", "Strategy Collective", "Performance Marketing Agency Team", "Data-driven Content Marketing", "ROI Focused Digital Agency"],
    alternates: {
        canonical: getCanonicalUrl("/about/"),
    },
    openGraph: {
        title: "About Us | The Architects of Digital Growth | Tellora Media",
        description: "Meet the strategists behind Tellora Media. We build performance systems, not just campaigns.",
        url: getCanonicalUrl("/about/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: SEO_CONFIG.defaultOGImage,
                width: 1200,
                height: 630,
                alt: "Tellora Media - About Us",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Tellora Media",
        description: "Meet the collective of designers and strategists driving growth architecture.",
        images: [SEO_CONFIG.defaultOGImage],
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
