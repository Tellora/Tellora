import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
    title: "SEO & Performance Marketing Case Studies | Tellora Media",
    description: "Explore how Tellora Media scales D2C brands and B2B tech companies using high-frequency SEO and performance marketing. Real data. Absolute intent.",
    keywords: [
        "digital marketing case studies",
        "SEO success stories",
        "performance marketing ROI",
        "D2C growth marketing examples"
    ],
    alternates: {
        canonical: getCanonicalUrl("/case-studies/"),
    },
    openGraph: {
        title: "SEO & Performance Marketing Case Studies | Tellora Media",
        description: "Explore how Tellora Media scales D2C brands and B2B tech companies using high-frequency SEO and performance marketing. Real data. Absolute intent.",
        url: getCanonicalUrl("/case-studies/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: "/og-cases.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media Case Studies",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SEO & Performance Marketing Case Studies | Tellora Media",
        description: "Explore how Tellora Media scales D2C brands and B2B tech companies using high-frequency SEO and performance marketing. Real data. Absolute intent.",
        images: ["/og-cases.png"],
    }
};

export default function CaseStudiesPage() {
    return <CaseStudiesClient />;
}
