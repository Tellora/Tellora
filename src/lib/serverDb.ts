// Client-side persistence layer using localStorage
// This replaces the fs-based persistence to allow for static site export.

export async function getAdminData(collection: string, defaultData: any = []) {
    if (typeof window === "undefined") return defaultData;
    try {
        const raw = localStorage.getItem(`tellora_${collection}`);
        if (!raw) return defaultData;
        return JSON.parse(raw);
    } catch (e) {
        console.error("Local storage read error", e);
        return defaultData;
    }
}

export async function saveAdminData(collection: string, data: any) {
    if (typeof window === "undefined") return false;
    try {
        localStorage.setItem(`tellora_${collection}`, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error("Local storage write error", e);
        return false;
    }
}
