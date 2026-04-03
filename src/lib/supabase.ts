import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pteassendcvgngkkybjf.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Admin Auth ───────────────────────────────────────────────────────────────
export interface AdminProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    initials: string;
    created_at?: string;
}

export async function getAdminProfile(userId: string): Promise<AdminProfile | null> {
    const { data, error } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", userId)
        .single();
    if (error) return null;
    return data;
}


// ── Database Interfaces ──────────────────────────────────────────────────────

export interface DbService {
    id: string;
    title: string;
    description: string;
    category: string;
    icon?: string;
    features: string[];
    color?: string;
    reach?: string;
    status: string;
    sort_order?: number;
    created_at?: string;
}

export interface DbTeamMember {
    id: string;
    name: string;
    role: string;
    image_url?: string;
    color?: string;
    rotate?: string;
    linkedin_url?: string;
    instagram_url?: string;
    bio?: string;
    skills?: string[];
    stats?: { label: string; value: string }[] | any;
    status?: string;
}

export interface DbCaseStudy {
    id: string;
    title: string;
    description: string;
    category: string;
    impact: string;
    tag: string;
    image_url: string;
    stats: { label: string; value: string }[];
    tags: string[];
    status: string;
    created_at?: string;
}

export interface DbReel {
    id: string;
    title: string;
    embed_url: string;
    tag: string;
    likes: string;
    views: string;
    status: string;
    created_at?: string;
}

export interface DbTestimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    image_url: string;
    rating: number;
}

export interface DbFAQ {
    id: string;
    question: string;
    answer: string;
    sort_order: number;
}

// ── Generic Data Access ──────────────────────────────────────────────────────

export async function fetchTableData<T>(table: string, defaultValue: T): Promise<T> {
    try {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
            console.error(`[Supabase] Error fetching ${table}:`, error);
            return defaultValue;
        }
        return (data as any) || defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

export async function upsertTableData(table: string, item: any) {
    try {
        const { error } = await supabase.from(table).upsert(item);
        if (error) throw error;
        return true;
    } catch (e) {
        console.error(`[Supabase] Error upserting ${table}:`, e);
        return false;
    }
}

export async function deleteTableData(table: string, filter: object) {
    try {
        const { error } = await supabase.from(table).delete().match(filter);
        if (error) throw error;
        return true;
    } catch (e) {
        console.error(`[Supabase] Error deleting from ${table}:`, e);
        return false;
    }
}

// ── Legacy Compatibility ─────────────────────────────────────────────────────

export async function getSupabaseData<T>(collection: string, defaultValue: T): Promise<T> {
    const { data, error } = await supabase
        .from("admin_data")
        .select("content")
        .eq("collection", collection)
        .single();

    if (error) {
        if (error.code !== "PGRST116") {
            console.error(`[Supabase] Error fetching ${collection}:`, error);
        }
        return defaultValue;
    }
    return data?.content || defaultValue;
}

export async function saveSupabaseData(collection: string, content: any): Promise<boolean> {
    const { error } = await supabase
        .from("admin_data")
        .upsert({ collection, content, updated_at: new Date().toISOString() }, { onConflict: "collection" });

    if (error) {
        console.error(`[Supabase] Error saving ${collection}:`, error);
        return false;
    }
    return true;
}

export async function uploadFile(bucket: string, path: string, file: File | Blob) {
    try {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, { upsert: true });

        if (error) {
            console.error(`[Supabase] Upload error:`, error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return publicUrl;
    } catch (e) {
        console.error(`[Supabase] Unexpected upload error:`, e);
        return null;
    }
}
