import CareersClient from "./CareersClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Careers | Join the Tellora Media Growth Team",
    description: "Ready to engineer dopamine-driven growth? Explore open roles at Tellora Media. We hire outlier talent in design, development, SEO, and performance marketing.",
    keywords: [
        "digital marketing jobs Delhi",
        "SEO careers",
        "growth marketing jobs",
        "Tellora Media careers"
    ],
    alternates: {
        canonical: getCanonicalUrl("/careers/"),
    },
    openGraph: {
        title: "Careers | Join the Tellora Media Growth Team",
        description: "Ready to engineer dopamine-driven growth? Explore open roles at Tellora Media. We hire outlier talent in design, development, SEO, and performance marketing.",
        url: getCanonicalUrl("/careers/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: "/og-default.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media Careers",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Careers | Join the Tellora Media Growth Team",
        description: "Ready to engineer dopamine-driven growth? Explore open roles at Tellora Media. We hire outlier talent in design, development, SEO, and performance marketing.",
        images: ["/og-default.png"],
    }
};

export default function CareersPage() {
    return <CareersClient />;
}
