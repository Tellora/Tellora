import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Growth Engine Blog | Marketing Intelligence & SEO Strategy | Tellora Media",
    description: "Deep dive into tactical digital strategies driving modern B2B brand dominance. Read proprietary agency research on SEO architectures, Paid advertising, and high-frequency growth hacking.",
    keywords: ["Digital Marketing Blog", "Strategic SEO Insights", "Growth Hacking Case Studies", "Performance Advertising Research", "Tellora Media Marketing Insights", "CRO Strategies"],
    alternates: {
        canonical: "https://tellora.media/blog",
    },
    openGraph: {
        title: "Growth Engine Blog | Marketing Intelligence | Tellora Media",
        description: "Tactical digital strategies and growth framework insights from Tellora Media experts.",
        url: "https://tellora.media/blog",
        siteName: "Tellora Media",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Growth Engine Blog | Tellora Media",
        description: "Read proprietary digital marketing and SEO research from the experts.",
    }
};

export default function BlogPage() {
    return <BlogClient />;
}
