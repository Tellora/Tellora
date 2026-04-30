import HomeClient from "./HomeClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import OrganizationSchema from "@/components/seo/schema/OrganizationSchema";
import WebSiteSchema from "@/components/seo/schema/WebSiteSchema";
import LocalBusinessSchema from "@/components/seo/schema/LocalBusinessSchema";

export const metadata: Metadata = {
    title: "Tellora Media | Digital Marketing Agency in Delhi | Growth Architecture",
    description: "Tellora Media is a full-service digital marketing agency in Delhi, India. We architect SEO, performance marketing, social media, and web growth systems for D2C brands and local businesses. Deploy core. Scale fast.",
    keywords: [
        "digital marketing agency Delhi",
        "digital marketing agency India",
        "SEO agency Delhi",
        "performance marketing agency India",
        "social media marketing agency Delhi",
        "growth marketing agency",
        "Tellora Media"
    ],
    alternates: {
        canonical: getCanonicalUrl("/"),
    },
    openGraph: {
        title: "Tellora Media — Growth Architecture for Bold Brands",
        description: "Full-service digital marketing agency in Delhi. SEO, Performance Marketing, Social Media, Content Creation, Web Development.",
        url: getCanonicalUrl("/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: "/og-home.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media - Digital Growth Architects",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tellora Media — Growth Architecture for Bold Brands",
        description: "Full-service digital marketing agency in Delhi. SEO, Performance Marketing, Social Media, Content Creation, Web Development.",
        images: ["/og-home.png"],
    }
};

export default function Home() {
    return (
        <>
            <OrganizationSchema />
            <WebSiteSchema />
            <LocalBusinessSchema />
            <HomeClient />
        </>
    );
}
