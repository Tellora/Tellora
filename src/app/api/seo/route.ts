import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
        return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=SEO&category=PERFORMANCE`
        );

        if (!response.ok) {
            const error = await response.json();
             return NextResponse.json({ error: error.error?.message || "Lighthouse failed" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("SEO Proxy Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
