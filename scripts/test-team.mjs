const supabaseUrl = "https://pteassendcvgngkkybjf.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM1NDQwMiwiZXhwIjoyMDgyOTMwNDAyfQ.VprPasGOnRvplvWue0dgaSsgYPxjMctfEFSeTbv5EjY";

async function getSpec() {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`
        }
    });
    if (res.ok) {
        const spec = await res.json();
        console.log("Success! Paths available:");
        console.log(Object.keys(spec.paths).filter(p => p.startsWith("/rpc/")));
    } else {
        console.error("Failed to fetch OpenAPI spec:", res.status, await res.text());
    }
}

getSpec();
