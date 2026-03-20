import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tellora Media | Growth Architecture & Performance Marketing Agency",
    description: "Tellora Media is an elite digital marketing agency for ambitious brands. We engineer high-frequency revenue growth ecosystems through technical SEO, AI-driven PPC, and brutalist performance design.",
    keywords: ["Digital Marketing Agency", "High-Frequency SEO Agency", "Performance Marketing ROAS", "B2B Growth Architecture", "Technical SEO Firm", "Tellora Media", "Strategic Brand Scaling"],
    alternates: {
        canonical: "https://tellora.media",
    },
    openGraph: {
        title: "Tellora Media | Growth Architecture & Performance Marketing Agency",
        description: "Scale your revenue with elite level SEO, performance marketing, and creative strategy from the architects of digital growth.",
        url: "https://tellora.media",
        siteName: "Tellora Media",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tellora Media | Architecture of Digital Growth",
        description: "We engineer high-frequency revenue ecosystems. Deploy your growth protocol now.",
    }
};

export default function Home() {
    return <HomeClient />;
}
