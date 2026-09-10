import ContactClient from "./ContactClient";
import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Contact Us | Partner with Digital Marketing Experts | Tellora Media",
    description: "Contact Tellora Media to discuss your custom growth strategy audit. Partner with high-frequency SEO experts and PPC performance architects to scale your startup or enterprise.",
    keywords: ["Hire Digital Marketing Agency", "Tellora Media Contact", "Request SEO Audit", "B2B Performance Marketing Consultation", "Startups Scaling Solutions", "Advertising Expert Contact"],
    alternates: {
        canonical: getCanonicalUrl("/contact/"),
    },
    openGraph: {
        title: "Contact Us | Tellora Media Digital Strategy Lab",
        description: "Get in touch with our team for a marketing performance audit.",
        url: getCanonicalUrl("/contact/"),
        siteName: SEO_CONFIG.siteName,
        locale: SEO_CONFIG.locale,
        type: "website",
        images: [
            {
                url: SEO_CONFIG.defaultOGImage,
                width: 1200,
                height: 630,
                alt: "Tellora Media - Contact Us",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Tellora Media",
        description: "Scale your revenue. Partner with the architects of digital growth.",
        images: [SEO_CONFIG.defaultOGImage],
    }
};

export default function ContactPage() {
    return <ContactClient />;
}
