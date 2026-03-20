import type { Metadata } from "next";
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
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${plusJakartaSans.variable} ${outfit.variable} antialiased selection:bg-primary/20`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
            </body>
        </html>
    );
}
