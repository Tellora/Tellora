import ServicesClient from "./ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Growth Services | SEO, PPC, Brutalist Design & Performance Systems",
    description: "Explore our end-to-end growth ecosystems. Specialized in High-frequency SEO, technical Core Web Vitals, ML-optimized PPC, and high-end conversion-focused branding for market dominance.",
    keywords: ["Semantic SEO Strategy", "High-Authority Link Building", "ML-Optimized PPC Management", "Next.js Performance Web Design", "Conversion Rate Optimization CRO", "Brand Identity Systems"],
};

export default function ServicesPage() {
    return <ServicesClient />;
}
