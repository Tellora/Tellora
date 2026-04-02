import { getSupabaseData, saveSupabaseData } from "./supabase";

export async function getAdminData(collection: string, defaultData: any = []) {
    try {
        if (typeof window === "undefined") return defaultData;

        // 1. Try Supabase if configured
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            const data = await getSupabaseData(collection, null);
            if (data && data.length > 0) return data;
            // If it's an object (like settings), check if it's not empty
            if (data && typeof data === 'object' && Object.keys(data).length > 0) return data;
        }

        // 2. Try hitting the Cloudflare Edge KV globally persistent proxy
        try {
            const res = await fetch(`/api/admin/db/${collection}`);
            if (res.ok) {
                const textData = await res.text();
                if (textData && textData.length > 5) {
                    const globalData = JSON.parse(textData);
                    if (globalData) return globalData;
                }
            }
        } catch (e) {}

        // 3. Fallback for isolated local testing
        const raw = localStorage.getItem(`tellora_${collection}`);
        if (!raw) return defaultData;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return defaultData;
        }
    } catch (e) {
        console.error(`[DB] Fetch error for ${collection}:`, e);
        return defaultData;
    }
}

export async function saveAdminData(collection: string, data: any) {
    try {
        if (typeof window === "undefined") return false;

        // 1. Save to Supabase if configured
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            await saveSupabaseData(collection, data);
        }

        // 2. Write to the global Cloudflare Edge proxy
        try {
            await fetch(`/api/admin/db/${collection}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data }),
            });
        } catch (e) {}

        // 3. Fallback synchronously to local storage
        localStorage.setItem(`tellora_${collection}`, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error(`[DB] Save error for ${collection}:`, e);
        return false;
    }
}
