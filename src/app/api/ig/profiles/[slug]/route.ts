import { NextRequest, NextResponse } from "next/server";
import { getProfile, addPost, updateProfile, removePost } from "@/lib/igStorage";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const profile = getProfile(params.slug);
    if (!profile) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const body = await request.json();
        const { name, bio, profilePic } = body;
        const updated = updateProfile(params.slug, { name, bio, profilePic });
        if (!updated) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (err) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    // We'll interpret POST to add a new post when body contains post data
    try {
        const body = await request.json();
        const { type, src, caption } = body;
        if (!type || !src) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        const newPost = addPost(params.slug, { type, src, caption });
        if (!newPost) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }
        return NextResponse.json(newPost);
    } catch (err) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const body = await request.json().catch(() => ({}));
        const { postId } = body as any;
        if (postId) {
            const ok = removePost(params.slug, postId);
            if (!ok) {
                return NextResponse.json({ error: "Not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true });
        }
        // no postId - remove entire profile
        const { removeProfile } = await import("@/lib/igStorage");
        const ok = removeProfile(params.slug);
        if (!ok) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
}
