import CareersClient from "./CareersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers | Join the Digital Growth Architects | Tellora Media",
    description: "Join Tellora Media's elite collective of Next.js engineers, growth strategists, and performance designers. We operate globally to build the future of digital marketing.",
    keywords: ["Tellora Media Careers", "Digital Marketing Jobs", "Next.js Engineering Roles", "SEO Specialist Jobs", "Growth Marketing Hiring", "Advertising Agency Careers"],
    alternates: {
        canonical: "https://tellora.media/careers",
    },
    openGraph: {
        title: "Careers | Join the Digital Growth Architects | Tellora Media",
        description: "Join Tellora Media's elite collective of engineers and growth strategists.",
        url: "https://tellora.media/careers",
        siteName: "Tellora Media",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Careers | Tellora Media",
        description: "Join our elite global hub of digital architects.",
    }
};

export default function CareersPage() {
    return <CareersClient />;
}
