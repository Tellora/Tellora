import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://tellora.media"),
    title: {
        default: "Tellora Media | Digital Growth Agency & SEO Experts",
        template: "%s | Tellora Media"
    },
    description: "Tellora Media is an elite digital growth agency specialized in high-frequency SEO, performance marketing, and architecture-driven brand scaling. Turn your vision into market dominance.",
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
        locale: "en_US",
        url: "https://tellora.media",
        siteName: "Tellora Media",
        title: "Tellora Media | Architecting Digital Domination",
        description: "Scale your revenue with elite level SEO, performance marketing, and creative growth architecture. Turn your brand into a high-frequency growth engine.",
        images: [
            {
                url: "/tellora-logo.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media - Digital Growth Architects",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tellora Media | Digital Growth Agency",
        description: "Elite digital growth agency specialized in high-frequency SEO and performance marketing systems.",
        images: ["/tellora-logo.png"],
        creator: "@telloramedia",
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
        "addressCountry": "Remote / Worldwide"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98115-39510",
        "contactType": "Strategy Consult",
        "areaServed": "Worldwide",
        "availableLanguage": "English"
    }
};

import Script from "next/script";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${plusJakartaSans.variable} ${outfit.variable} antialiased selection:bg-primary/20 overflow-x-hidden`}
            >
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-MSRGVJ8L"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                {/* Google Tag Manager */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-MSRGVJ8L');
                    `}
                </Script>
                {/* Google tag (gtag.js) */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-BVWRJPJRZ1"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-BVWRJPJRZ1');
                    `}
                </Script>
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
