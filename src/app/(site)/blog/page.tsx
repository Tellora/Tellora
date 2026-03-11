import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Growth Lab | Digital Marketing Insights & SEO Strategy",
    description: "Deep dives into the latest SEO strategies, performance marketing trends, and technical growth hacks from the Tellora Media team.",
};

export default function BlogPage() {
    return <BlogClient />;
}
