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

        // --- Global Database Proxy (KV) ---
        // Interfaces with Cloudflare KV to provide a globally synced database for the purely static frontend
        if (url.pathname.startsWith("/api/admin/db/")) {
            const collection = url.pathname.replace("/api/admin/db/", "");
            
            if (!env.TELLORA_DB) {
                return new Response(JSON.stringify({ error: "Database not bound. Create KV and bind as TELLORA_DB." }), {
                    status: 500, headers: { "Access-Control-Allow-Origin": "*" }
                });
            }

            if (request.method === "GET") {
                const data = await env.TELLORA_DB.get(`collection_${collection}`);
                return new Response(data || '[]', {
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                });
            }

            if (request.method === "POST" || request.method === "PUT") {
                try {
                    const reqJson = await request.json();
                    await env.TELLORA_DB.put(`collection_${collection}`, JSON.stringify(reqJson.data));
                    return new Response(JSON.stringify({ success: true }), {
                        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                    });
                } catch(e) {
                    return new Response(JSON.stringify({ error: "KV Write Error" }), { status: 500 });
                }
            }
        }

        // --- Google Analytics API Proxy ---
        // Securely signs JWT on the Edge and fetches real-time traffic data natively
        if (url.pathname === "/api/admin/analytics") {
            const propertyId = env.GA_PROPERTY_ID;
            const clientEmail = env.GA_CLIENT_EMAIL;
            const privateKey = env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

            if (!propertyId || !privateKey) {
                return new Response(JSON.stringify({ error: "Missing Analytics Credentials in Wrangler Env" }), { status: 500 });
            }

            try {
                // 1. Generate JWT using Edge-compatible Node Crypto
                const crypto = require('node:crypto');
                const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
                const payload = Buffer.from(JSON.stringify({
                    iss: clientEmail,
                    scope: "https://www.googleapis.com/auth/analytics.readonly",
                    aud: "https://oauth2.googleapis.com/token",
                    exp: Math.floor(Date.now() / 1000) + 3600,
                    iat: Math.floor(Date.now() / 1000)
                })).toString('base64url');
                
                const sign = crypto.createSign('RSA-SHA256');
                sign.update(`${header}.${payload}`);
                const signature = sign.sign(privateKey, 'base64url');
                const jwt = `${header}.${payload}.${signature}`;

                // 2. Exchange JWT for Google Access Token
                const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
                });
                
                const tokenData = await tokenRes.json();
                if (!tokenData.access_token) throw new Error("Google Oauth Failed");

                // 3. Query the actual GA4 Datastream
                const gaRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${tokenData.access_token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                        metrics: [
                            { name: "screenPageViews" },
                            { name: "activeUsers" },
                            { name: "averageSessionDuration" },
                            { name: "bounceRate" }
                        ]
                    })
                });
                
                const gaData = await gaRes.json();
                const rows = gaData.rows?.[0]?.metricValues || [];
                
                return new Response(JSON.stringify({
                    pageviews: rows[0]?.value || "0",
                    visitors: rows[1]?.value || "0",
                    durationSecs: rows[2]?.value || "0",
                    bounce: rows[3]?.value || "0"
                }), { 
                    status: 200, 
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } 
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
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
