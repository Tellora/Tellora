import ContactClient from "./ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Initialize Strategy | Contact Tellora Media",
    description: "Ready to scale? Connect with our growth architects for a custom digital strategy audit and roadmap for market dominance.",
};

export default function ContactPage() {
    return <ContactClient />;
}
