import React from "react";
import { listProfiles } from "@/lib/igStorage";
import EditProfileClient from "./EditProfileClient";

export async function generateStaticParams() {
    try {
        const profiles = listProfiles();
        if (profiles.length === 0) {
            // Return at least one dummy path to satisfy "output: export" requirement for dynamic routes
            return [{ slug: "no-profiles" }];
        }
        return profiles.map((p) => ({
            slug: p.slug,
        }));
    } catch (err) {
        return [{ slug: "no-profiles" }];
    }
}

export default function Page({ params }: { params: { slug: string } }) {
    return <EditProfileClient slug={params.slug} />;
}
