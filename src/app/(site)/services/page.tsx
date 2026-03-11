import ServicesClient from "./ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Growth Services | SEO, PPC & Design",
    description: "Explore our specialized growth ecosystems: High-frequency SEO, performance-driven paid search, and conversion-focused web design systems.",
};

export default function ServicesPage() {
    return <ServicesClient />;
}
