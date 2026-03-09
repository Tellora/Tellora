import fs from "fs";
import path from "path";

export type IGPost = {
    id: string;
    type: "image" | "video";
    src: string; // base64 data URI
    caption: string;
    createdAt: string;
};

export type IGProfile = {
    slug: string; // unique token used in preview URL
    name: string;
    bio?: string;
    profilePic?: string; // base64 data URI
    posts: IGPost[];
};

export type IGData = {
    profiles: IGProfile[];
};

const DATA_PATH = path.join(process.cwd(), "data", "igProfiles.json");

function readData(): IGData {
    try {
        const raw = fs.readFileSync(DATA_PATH, "utf-8");
        return JSON.parse(raw) as IGData;
    } catch (err) {
        // if file doesn't exist or is malformed, start fresh
        return { profiles: [] };
    }
}

function writeData(data: IGData) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function listProfiles(): IGProfile[] {
    const d = readData();
    return d.profiles;
}

export function getProfile(slug: string): IGProfile | null {
    const d = readData();
    return d.profiles.find((p) => p.slug === slug) || null;
}

export function createProfile(profile: {
    name: string;
    bio?: string;
    profilePic?: string;
}): IGProfile {
    const d = readData();
    const slug = Math.random().toString(36).substr(2, 9);
    const newProfile: IGProfile = {
        slug,
        name: profile.name,
        bio: profile.bio,
        profilePic: profile.profilePic,
        posts: [],
    };
    d.profiles.push(newProfile);
    writeData(d);
    return newProfile;
}

export function updateProfile(slug: string, updates: Partial<Omit<IGProfile, 'slug' | 'posts'>>): IGProfile | null {
    const d = readData();
    const idx = d.profiles.findIndex((p) => p.slug === slug);
    if (idx === -1) return null;
    d.profiles[idx] = { ...d.profiles[idx], ...updates };
    writeData(d);
    return d.profiles[idx];
}

export function addPost(slug: string, post: { type: "image" | "video"; src: string; caption: string }): IGPost | null {
    const d = readData();
    const prof = d.profiles.find((p) => p.slug === slug);
    if (!prof) return null;
    const newPost: IGPost = {
        id: Date.now().toString(),
        type: post.type,
        src: post.src,
        caption: post.caption,
        createdAt: new Date().toISOString(),
    };
    prof.posts.push(newPost);
    writeData(d);
    return newPost;
}

// Optionally a removePost function
export function removePost(slug: string, postId: string): boolean {
    const d = readData();
    const prof = d.profiles.find((p) => p.slug === slug);
    if (!prof) return false;
    const originalLen = prof.posts.length;
    prof.posts = prof.posts.filter((p) => p.id !== postId);
    if (prof.posts.length === originalLen) return false;
    writeData(d);
    return true;
}

export function removeProfile(slug: string): boolean {
    const d = readData();
    const before = d.profiles.length;
    d.profiles = d.profiles.filter((p) => p.slug !== slug);
    if (d.profiles.length === before) return false;
    writeData(d);
    return true;
}
