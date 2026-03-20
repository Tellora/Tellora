import AboutClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | The Architects of Digital Growth | Tellora Media",
    description: "Meet Tellora Media: a collective of elite marketing strategists, Next.js developers, and performance designers engineering high-frequency marketing campaigns. Join the digital growth architecture revolution.",
    keywords: ["Tellora Media Team", "Digital Growth Architecture Form", "Strategy Collective", "Performance Marketing Agency Team", "Data-driven Content Marketing", "ROI Focused Digital Agency"],
    alternates: {
        canonical: "https://tellora.media/about",
    },
    openGraph: {
        title: "About Us | The Architects of Digital Growth | Tellora Media",
        description: "Meet the strategists behind Tellora Media. We build performance systems, not just campaigns.",
        url: "https://tellora.media/about",
        siteName: "Tellora Media",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Tellora Media",
        description: "Meet the collective of designers and strategists driving growth architecture.",
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
