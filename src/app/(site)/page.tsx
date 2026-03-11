import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tellora Media | Digital Growth Agency & SEO Experts",
    description: "Tellora Media is the elite growth architecture firm for ambitious brands. We engineer high-frequency revenue growth engines through SEO, performance marketing, and creative strategy.",
    openGraph: {
        title: "Tellora Media | Architecting Digital Domination",
        description: "Scale your business with elite level SEO, performance marketing, and creative strategy from the architects of growth.",
    }
};

export default function Home() {
    return <HomeClient />;
}
