import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { SEO_CONFIG } from "@/lib/seo";
const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const metadata: Metadata = {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: {
        default: SEO_CONFIG.defaultTitle,
        template: SEO_CONFIG.titleTemplate
    },
    description: SEO_CONFIG.defaultDescription,
    keywords: [
        "Digital Growth Agency",
        "High-Frequency SEO",
        "Elite Performance Marketing",
        "Growth Architecture",
        "Revenue Scaling Systems",
        "Next.js Web Design",
        "Tellora Media Dominance",
        "Technical SEO Experts",
        "Conversion Rate Optimization Agency"
    ],
    authors: [{ name: "Tellora Media Growth Architects" }],
    creator: "Tellora Media",
    publisher: "Tellora Media",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: SEO_CONFIG.locale,
        alternateLocale: SEO_CONFIG.alternateLocales,
        url: SEO_CONFIG.siteUrl,
        siteName: SEO_CONFIG.siteName,
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        images: [
            {
                url: SEO_CONFIG.defaultOGImage,
                width: 1200,
                height: 630,
                alt: `${SEO_CONFIG.siteName} - Digital Growth Architects`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        images: [SEO_CONFIG.defaultOGImage],
        creator: SEO_CONFIG.twitterHandle,
        site: SEO_CONFIG.twitterHandle,
    },
    alternates: {
        canonical: SEO_CONFIG.siteUrl,
        languages: {
            "en": SEO_CONFIG.siteUrl,
            "x-default": SEO_CONFIG.siteUrl,
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        ],
        shortcut: "/favicon-32x32.png",
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        other: [
            {
                rel: "mask-icon",
                url: "/tellora-logo.png",
            },
        ],
    },
    manifest: "/site.webmanifest",
};

// Separate viewport export — required by Next.js 14+
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tellora Media",
    "url": "https://tellora.media",
    "logo": "https://tellora.media/tellora-logo.png",
    "sameAs": [
        "https://www.instagram.com/tellora.media",
        "https://www.linkedin.com/company/tellora-media"
    ],
    "description": "Tellora Media is an elite digital growth agency transforming businesses with high-frequency SEO, performance marketing, and architecture-driven scaling.",
    "priceRange": "$$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tellora Hub, South Extension II",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110049",
        "addressCountry": "IN"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-76784-93113",
        "contactType": "customer service",
        "areaServed": "Worldwide",
        "availableLanguage": "English"
    }
};

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import SocialPixels from "@/components/analytics/SocialPixels";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                {/* Add preconnect for any external APIs if needed */}
            </head>
            <body
                className={`${plusJakartaSans.variable} ${outfit.variable} antialiased selection:bg-primary/20 overflow-x-hidden`}
            >
                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>
                <GoogleAnalytics />
                <SocialPixels />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}

                {/* Axeptio Cookie Setup */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.axeptioSettings = {
                            clientId: "69cd47d9268b590b51f2ad12",
                            cookiesVersion: "eaa4ce71-6984-4cd8-b8f9-29a5f714f67a",
                            googleConsentMode: {
                                default: {
                                    analytics_storage: "denied",
                                    ad_storage: "denied",
                                    ad_user_data: "denied",
                                    ad_personalization: "denied",
                                    wait_for_update: 500
                                }
                            }
                        };
                        
                        (function(d, s) {
                            var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
                            e.async = true; e.src = "//static.axept.io/sdk.js";
                            t.parentNode.insertBefore(e, t);
                        })(document, "script");
                        `
                    }}
                />
            </body>
        </html>
    );
}
