import React from "react";
import { getIGProfiles } from "@/lib/store";
import EditProfileClient from "./EditProfileClient";

export async function generateStaticParams() {
    try {
        const profiles = await getIGProfiles();
        if (!profiles || profiles.length === 0) {
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
