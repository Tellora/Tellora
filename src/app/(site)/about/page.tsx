import AboutClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Architects of Digital Growth",
    description: "Learn about Tellora Media's philosophy, team, and the data-driven principles that fuel our high-performance marketing and design systems.",
};

export default function AboutPage() {
    return <AboutClient />;
}
