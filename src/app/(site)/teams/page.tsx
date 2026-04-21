import TeamsClient from "./TeamsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Team | Tellora Media Squad",
    description: "Meet the elite collective of growth architects, technical designers, and security experts at Tellora Media.",
};

export default function TeamsPage() {
    return <TeamsClient />;
}
