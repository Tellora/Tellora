export async function onRequest(context) {
    const { searchParams } = new URL(context.request.url);
    const targetUrl = searchParams.get("url");

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

        if (!response.ok) {
            const error = await response.json();
            return new Response(JSON.stringify({ error: error.error?.message || "Lighthouse failed" }), { 
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("SEO Proxy Function Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
