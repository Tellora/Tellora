import BlogClient from "./BlogClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Tellora Media Blog | Growth Marketing & SEO Insights",
    description: "Deep-dive technical articles, SEO strategies, and performance marketing insights from the Tellora Media team. Learn how to engineer your own digital growth.",
    keywords: [
        "digital marketing blog",
        "SEO insights",
        "performance marketing strategies",
        "growth hacking tips",
        "Tellora Media blog"
    ],
    alternates: {
        canonical: getCanonicalUrl("/blog/"),
    },
    openGraph: {
        title: "Tellora Media Blog | Growth Marketing & SEO Insights",
        description: "Deep-dive technical articles, SEO strategies, and performance marketing insights from the Tellora Media team. Learn how to engineer your own digital growth.",
        url: getCanonicalUrl("/blog/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: "/og-blog.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tellora Media Blog | Growth Marketing & SEO Insights",
        description: "Deep-dive technical articles, SEO strategies, and performance marketing insights from the Tellora Media team. Learn how to engineer your own digital growth.",
        images: ["/og-blog.png"],
    }
};

export default function BlogPage() {
    return <BlogClient />;
}
