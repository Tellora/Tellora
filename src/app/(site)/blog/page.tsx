import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Growth Lab | Marketing Intelligence & SEO Strategy Insights",
    description: "Deep dive into the tactical strategies driving modern digital brand dominance. Explore proprietary research on SEO, Paid Performance, and high-frequency growth hacks.",
    keywords: ["Digital Marketing Lab", "Strategic SEO Insights", "Growth Hacking Case Studies", "Marketing Intelligence Reports", "Tellora Media Blog", "Performance Advertising Research"],
};

export default function BlogPage() {
    return <BlogClient />;
}
