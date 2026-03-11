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
    title: "Tellora Media | Digital Growth Agency",
    description: "Tellora Media is a premier digital marketing agency transforming businesses with SEO, social media, and performance marketing.",
    icons: {
        icon: "/tellora-logo.png",
        apple: "/tellora-logo.png",
    },
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
                {children}
            </body>
        </html>
    );
}
