import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tellora Media | Engineering High-Frequency Revenue Growth",
    description: "Tellora Media is the premier growth architecture firm for ambitious brands. We engineer high-frequency revenue growth engines through technical SEO, performance marketing, and creative digital strategy for global market dominance.",
    keywords: ["High-Frequency SEO Agency", "Revenue Growth Engineers", "Digital Growth Architecture", "Performance Marketing ROAS", "Tellora Media Growth", "Strategic Brand Scaling"],
    openGraph: {
        title: "Tellora Media | Architecting Digital Domination & Revenue Growth",
        description: "Scale your revenue with elite level SEO, performance marketing, and creative strategy from the architects of growth. Deploy your core growth engine now.",
    }
};

export default function Home() {
    return <HomeClient />;
}
