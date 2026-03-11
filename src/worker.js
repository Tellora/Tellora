export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // Proxy for SEO API (matches the Pages Function logic)
        if (url.pathname === "/api/seo") {
            const targetUrl = url.searchParams.get("url");
            if (!targetUrl) {
                return new Response(JSON.stringify({ error: "No URL provided" }), { 
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }
            try {
                const response = await fetch(
                    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=SEO&category=PERFORMANCE`
                );
                const data = await response.json();
                return new Response(JSON.stringify(data), { 
                    status: response.status, 
                    headers: { "Content-Type": "application/json" } 
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: "Proxy Error" }), { status: 500 });
            }
        }

        // Default to serving static assets from the binding
        // Renamed from ASSETS to STATIC_ASSETS to avoid Cloudflare Pages reservation conflict
        if (env.STATIC_ASSETS) {
            return env.STATIC_ASSETS.fetch(request);
        }

        // Fallback or error if binding is missing
        return new Response("Static assets binding not found", { status: 500 });
    }
};
