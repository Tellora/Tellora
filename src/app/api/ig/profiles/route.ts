import { NextRequest, NextResponse } from "next/server";
import { listProfiles, createProfile } from "@/lib/igStorage";

export async function GET(request: NextRequest) {
    const profiles = listProfiles();
    return NextResponse.json(profiles);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, bio, profilePic } = body;
        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }
        const profile = createProfile({ name, bio, profilePic });
        return NextResponse.json(profile);
    } catch (err) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
}
