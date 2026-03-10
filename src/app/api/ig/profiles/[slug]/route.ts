import { NextRequest, NextResponse } from "next/server";
import { getProfile, addPost, updateProfile, removePost, listProfiles } from "@/lib/igStorage";

export const dynamic = 'force-static';

export async function generateStaticParams() {
    const profiles = listProfiles();
    if (profiles.length === 0) {
        return [{ slug: "no-profiles" }];
    }
    return profiles.map((p) => ({
        slug: p.slug,
    }));
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const profile = getProfile(params.slug);
    if (!profile) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
}

// NOTE: POST, PUT, DELETE are not supported in static export.
// They are kept here for local development and will be ignored in the static build.
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    const body = await request.json();
    const { name, bio, profilePic } = body;
    const updated = updateProfile(params.slug, { name, bio, profilePic });
    return NextResponse.json(updated);
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    const body = await request.json();
    const { type, src, caption } = body;
    const newPost = addPost(params.slug, { type, src, caption });
    return NextResponse.json(newPost);
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    const body = await request.json().catch(() => ({}));
    const { postId } = body as any;
    if (postId) {
        removePost(params.slug, postId);
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: true });
}
