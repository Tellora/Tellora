import SEOCheckerClient from "./SEOCheckerClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import SeoCheckerSchema from "@/components/seo/schema/SeoCheckerSchema";

export const metadata: Metadata = {
    title: "Free SEO Audit Tool | Technical Website Analyzer | Tellora Media",
    description: "Run a comprehensive, 250-point technical SEO audit on your website for free. Analyze Core Web Vitals, semantic structure, security headers, and more in seconds.",
    keywords: [
        "free SEO audit tool",
        "technical SEO checker",
        "Core Web Vitals test",
        "website analyzer",
        "SEO report generator"
    ],
    alternates: {
        canonical: getCanonicalUrl("/seo-checker/"),
    },
    openGraph: {
        title: "Free SEO Audit Tool | Technical Website Analyzer | Tellora Media",
        description: "Run a comprehensive, 250-point technical SEO audit on your website for free. Analyze Core Web Vitals, semantic structure, security headers, and more in seconds.",
        url: getCanonicalUrl("/seo-checker/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: "/og-seo-checker.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media SEO Audit Tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free SEO Audit Tool | Technical Website Analyzer | Tellora Media",
        description: "Run a comprehensive, 250-point technical SEO audit on your website for free. Analyze Core Web Vitals, semantic structure, security headers, and more in seconds.",
        images: ["/og-seo-checker.png"],
    }
};

export default function SEOCheckerPage() {
    return (
        <>
            <SeoCheckerSchema />
            <SEOCheckerClient />
        </>
    );
}
