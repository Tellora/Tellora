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
    keywords: ["Digital Growth Agency", "SEO Optimization", "Performance Marketing", "Social Media Strategy", "Growth Architecture", "Brand Scaling", "Tellora Media"],
    authors: [{ name: "Tellora Media Team" }],
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
        description: "Scale your business with elite level SEO, performance marketing, and creative strategy from the architects of growth.",
        images: [
            {
                url: "/tellora-logo.png",
                width: 1200,
                height: 630,
                alt: "Tellora Media - Digital Growth Agency",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tellora Media | Digital Growth Agency",
        description: "Elite digital growth agency specialized in high-frequency SEO and performance marketing.",
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
        icon: "/tellora-logo.png",
        apple: "/tellora-logo.png",
    },
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
    "description": "Tellora Media is a premier digital marketing agency transforming businesses with SEO, social media, and performance marketing.",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "Remote / worldwide"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98115-39510",
        "contactType": "sales",
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
