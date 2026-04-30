import TeamsClient from "./TeamsClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Meet the Growth Architects | Tellora Media Team",
    description: "Meet the SEO specialists, performance marketers, and growth engineers behind Tellora Media. We are a collective of digital architects driving aggressive revenue scaling.",
    keywords: [
        "digital marketing team",
        "SEO experts Delhi",
        "performance marketing specialists",
        "Tellora Media team"
    ],
    alternates: {
        canonical: getCanonicalUrl("/teams/"),
    },
    openGraph: {
        title: "Meet the Growth Architects | Tellora Media Team",
        description: "Meet the SEO specialists, performance marketers, and growth engineers behind Tellora Media. We are a collective of digital architects driving aggressive revenue scaling.",
        url: getCanonicalUrl("/teams/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: "/og-default.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media Team",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Meet the Growth Architects | Tellora Media Team",
        description: "Meet the SEO specialists, performance marketers, and growth engineers behind Tellora Media. We are a collective of digital architects driving aggressive revenue scaling.",
        images: ["/og-default.png"],
    }
};

export default function TeamsPage() {
    return <TeamsClient />;
}
