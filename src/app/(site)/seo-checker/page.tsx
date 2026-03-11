import SEOCheckerClient from "./SEOCheckerClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Technical SEO Audit Tool | Analyze Site Performance & Core Web Vitals",
    description: "Run an advanced 250+ point SEO audit. analyze your technical performance, LCP/FCP velocity, crawler visibility, and discover growth leaks for free with Tellora Media's audit tool.",
    keywords: ["Free SEO Audit Tool", "Technical SEO Scanner", "Website Performance Health Check", "Core Web Vitals Audit", "SEO Growth Leak Analysis", "Online SEO Checker for Brands"],
};

export default function SEOCheckerPage() {
    return <SEOCheckerClient />;
}
