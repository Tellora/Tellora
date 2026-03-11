import SEOCheckerClient from "./SEOCheckerClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free SEO Audit & Site Performance Checker",
    description: "Get a detailed 250+ point SEO audit. analyze your technical performance, crawler visibility, and organic growth leaks for free with Tellora Media.",
};

export default function SEOCheckerPage() {
    return <SEOCheckerClient />;
}
