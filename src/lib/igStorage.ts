import { getAdminData, saveAdminData } from "./serverDb";

export type IGPost = {
    id: string;
    type: "image" | "video";
    src: string; // URL or base64
    caption: string;
    createdAt: string;
};

export type IGProfile = {
    slug: string;
    name: string;
    bio?: string;
    profilePic?: string;
    posts: IGPost[];
};

const KEY = "ig_profiles_v2";

export async function listProfiles(): Promise<IGProfile[]> {
    return getAdminData(KEY, []);
}

export async function getProfile(slug: string): Promise<IGProfile | null> {
    const list = await listProfiles();
    return list.find((p) => p.slug === slug) || null;
}

export async function createProfile(profile: {
    name: string;
    bio?: string;
    profilePic?: string;
}): Promise<IGProfile> {
    const list = await listProfiles();
    const slug = Math.random().toString(36).substr(2, 9);
    const newProfile: IGProfile = {
        slug,
        name: profile.name,
        bio: profile.bio,
        profilePic: profile.profilePic,
        posts: [],
    };
    list.push(newProfile);
    await saveAdminData(KEY, list);
    return newProfile;
}

export async function updateProfile(slug: string, updates: Partial<Omit<IGProfile, 'slug' | 'posts'>>): Promise<IGProfile | null> {
    const list = await listProfiles();
    const idx = list.findIndex((p) => p.slug === slug);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    await saveAdminData(KEY, list);
    return list[idx];
}

export async function addPost(slug: string, post: { type: "image" | "video"; src: string; caption: string }): Promise<IGPost | null> {
    const list = await listProfiles();
    const idx = list.findIndex((p) => p.slug === slug);
    if (idx === -1) return null;
    const newPost: IGPost = {
        id: Date.now().toString(),
        type: post.type,
        src: post.src,
        caption: post.caption,
        createdAt: new Date().toISOString(),
    };
    list[idx].posts.push(newPost);
    await saveAdminData(KEY, list);
    return newPost;
}

export async function removePost(slug: string, postId: string): Promise<boolean> {
    const list = await listProfiles();
    const idx = list.findIndex((p) => p.slug === slug);
    if (idx === -1) return false;
    const originalLen = list[idx].posts.length;
    list[idx].posts = list[idx].posts.filter((p) => p.id !== postId);
    if (list[idx].posts.length === originalLen) return false;
    await saveAdminData(KEY, list);
    return true;
}

export async function removeProfile(slug: string): Promise<boolean> {
    const list = await listProfiles();
    const filtered = list.filter((p) => p.slug !== slug);
    if (filtered.length === list.length) return false;
    await saveAdminData(KEY, filtered);
    return true;
}
