export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // --- SEO API Proxy ---
        // Handles the Lighthouse audit bridge through Google's API
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
                return new Response(JSON.stringify({ error: "Tellora Proxy Failure" }), { status: 500 });
            }
        }

        // --- Static Asset Serving ---
        // Serves the Next.js static export from the ./out directory
        try {
            // Check for the binding name defined in wrangler.toml
            const assets = env.ASSETS || env.STATIC_ASSETS || env.__STATIC_CONTENT;
            if (assets) {
                return await assets.fetch(request);
            }
        } catch (e) {
            console.error("Asset fetch error:", e);
        }

        return new Response("Asset Binding Not Found. Ensure 'assets' is configured in wrangler.toml", { status: 500 });
    }
};
