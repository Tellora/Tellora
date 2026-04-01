// Refactored data layer connecting to the Main Storage
// Defaults to local placeholder for active development until credentials are provided.

export async function getAdminData(collection: string, defaultData: any = []) {
    try {
        if (typeof window === "undefined") return defaultData;

        // If the main DB URL is provided in the environment, use it to fetch data
        if (process.env.NEXT_PUBLIC_DB_URL) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${collection}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DB_KEY}`
                }
            });
            if (!response.ok) return defaultData;
            const data = await response.json();
            return data || defaultData;
        }

        // Development fallback before credentials are provided
        const raw = localStorage.getItem(`tellora_${collection}`);
        if (!raw) return defaultData;
        return JSON.parse(raw);
    } catch (e) {
        console.error(`[DB] Fetch error for ${collection}:`, e);
        return defaultData;
    }
}

export async function saveAdminData(collection: string, data: any) {
    try {
        if (typeof window === "undefined") return false;

        // If the main DB URL is provided in the environment, use it to persist data
        if (process.env.NEXT_PUBLIC_DB_URL) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${collection}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DB_KEY}`
                },
                body: JSON.stringify({ data }),
            });
            if (!response.ok) return false;
            return true;
        }

        // Development fallback before credentials are provided
        localStorage.setItem(`tellora_${collection}`, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error(`[DB] Save error for ${collection}:`, e);
        return false;
    }
}
