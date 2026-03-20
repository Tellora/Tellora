import ContactClient from "./ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Partner with Digital Marketing Experts | Tellora Media",
    description: "Contact Tellora Media to discuss your custom growth strategy audit. Partner with high-frequency SEO experts and PPC performance architects to scale your startup or enterprise.",
    keywords: ["Hire Digital Marketing Agency", "Tellora Media Contact", "Request SEO Audit", "B2B Performance Marketing Consultation", "Startups Scaling Solutions", "Advertising Expert Contact"],
    alternates: {
        canonical: "https://tellora.media/contact",
    },
    openGraph: {
        title: "Contact Us | Tellora Media Digital Strategy Lab",
        description: "Initialize your growth protocol. Connect with our experts for a marketing performance audit.",
        url: "https://tellora.media/contact",
        siteName: "Tellora Media",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Tellora Media",
        description: "Scale your revenue. Partner with the architects of digital growth.",
    }
};

export default function ContactPage() {
    return <ContactClient />;
}
