import AboutClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | The Architects of Digital Growth & High-Performance Design",
    description: "Meet the collective of designers, developers, and strategists at Tellora Media. We merge high-end aesthetic design with aggressive performance marketing to build systems, not just campaigns.",
    keywords: ["Growth Architecture Team", "Tellora Media Philosophy", "Data-Driven Growth Principles", "Digital Strategy Experts", "Strategic Marketing Collective"],
};

export default function AboutPage() {
    return <AboutClient />;
}
