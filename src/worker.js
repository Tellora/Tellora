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

        // --- Workforce Face Verification API ---
        if (url.pathname === "/api/admin/workforce/verify-face" && request.method === "POST") {
            try {
                const { employeeId, currentGrayscale } = await request.json();
                
                if (!employeeId || !currentGrayscale || !Array.isArray(currentGrayscale)) {
                    return new Response(JSON.stringify({ error: "Invalid parameters" }), {
                        status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" }
                    });
                }

                // Query Supabase for workforce employees
                const dbRes = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL || 'https://pteassendcvgngkkybjf.supabase.co'}/rest/v1/admin_data?collection=eq.workforce_employees`, {
                    headers: {
                        "apikey": env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA',
                        "Content-Type": "application/json"
                    }
                });
                
                if (!dbRes.ok) {
                    return new Response(JSON.stringify({ error: "Failed to query database" }), {
                        status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                    });
                }
                
                const dbData = await dbRes.json();
                const employees = dbData[0]?.content || [];
                const employee = employees.find(e => e.id === employeeId);
                
                if (!employee) {
                    return new Response(JSON.stringify({ error: "Employee not found" }), {
                        status: 404, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                    });
                }

                const enrolledSig = employee.enrolledFaceSignature;
                
                if (!enrolledSig) {
                    if (employee.enrolledFace && employee.enrolledFace.startsWith("data:image/svg+xml")) {
                        return new Response(JSON.stringify({ verified: true, confidence: 100 }), {
                            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                        });
                    }
                    return new Response(JSON.stringify({ error: "No biometric signature enrolled" }), {
                        status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                    });
                }

                const size = 32 * 32;
                if (currentGrayscale.length !== size || enrolledSig.length !== size) {
                    return new Response(JSON.stringify({ error: "Invalid signature sizes" }), {
                        status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                    });
                }

                let sumEnrolled = 0;
                let sumCurrent = 0;
                for (let i = 0; i < size; i++) {
                    sumEnrolled += enrolledSig[i];
                    sumCurrent += currentGrayscale[i];
                }
                const meanEnrolled = sumEnrolled / size;
                const meanCurrent = sumCurrent / size;

                let absoluteDiff = 0;
                for (let i = 0; i < size; i++) {
                    const normEnrolled = Math.max(0, Math.min(255, enrolledSig[i] - meanEnrolled + 128));
                    const normCurrent = Math.max(0, Math.min(255, currentGrayscale[i] - meanCurrent + 128));
                    absoluteDiff += Math.abs(normEnrolled - normCurrent);
                }

                const avgDiff = absoluteDiff / size;
                const similarity = Math.max(0, Math.min(100, 100 - (avgDiff / 255) * 100));

                let adjustedSimilarity;
                if (similarity >= 40) {
                    adjustedSimilarity = 50 + ((similarity - 40) / 60) * 50;
                } else {
                    adjustedSimilarity = (similarity / 40) * 50;
                }

                const confidence = Number(Math.min(100, Math.max(0, adjustedSimilarity)).toFixed(1));
                const verified = confidence >= 75;

                return new Response(JSON.stringify({ verified, confidence }), {
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                });

            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                });
            }
        }

        // --- Workforce Send Email Alert API ---
        if (url.pathname === "/api/admin/workforce/send-alert" && request.method === "POST") {
            try {
                const { employeeId, type, workedHours, expectedHours, shiftEnd } = await request.json();
                
                if (!employeeId || !type) {
                    return new Response(JSON.stringify({ error: "Missing parameters" }), {
                        status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                    });
                }

                const dbRes = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL || 'https://pteassendcvgngkkybjf.supabase.co'}/rest/v1/admin_data?collection=eq.workforce_employees`, {
                    headers: {
                        "apikey": env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA',
                        "Content-Type": "application/json"
                    }
                });
                
                if (!dbRes.ok) {
                    return new Response(JSON.stringify({ error: "Failed to query database" }), { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
                }
                const dbData = await dbRes.json();
                const employees = dbData[0]?.content || [];
                const employee = employees.find(e => e.id === employeeId);
                
                if (!employee) {
                    return new Response(JSON.stringify({ error: "Employee not found" }), { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });
                }

                let subject = "";
                let body = "";
                
                if (type === "undertime") {
                    subject = "Workforce Alert: Under-time Shift Logged";
                    body = `Hello ${employee.name},\n\nYou have completed your shift early today. You worked ${workedHours} hours, which is less than your scheduled ${expectedHours} hours.\n\nIf this was not planned, please check in with your supervisor.\n\nBest regards,\nWorkforce Admin`;
                } else if (type === "overtime") {
                    subject = "Workforce Alert: Over-time Shift Logged";
                    body = `Hello ${employee.name},\n\nYou have clocked out past your scheduled shift end time of ${shiftEnd}. Your worked hours have been logged as ${workedHours} hours.\n\nBest regards,\nWorkforce Admin`;
                }

                const sendResult = await sendEmailHelper(env, employee.email, subject, body, type);

                return new Response(JSON.stringify({ success: true, ...sendResult }), {
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                });

            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                });
            }
        }

        // --- Workforce Check & Send Shift Reminders Cron API ---
        if (url.pathname === "/api/admin/workforce/check-reminders") {
            const result = await checkAndSendReminders(env);
            return new Response(JSON.stringify(result), {
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
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
    },
    
    // Scheduled handler for periodic background Cron Triggers
    async scheduled(event, env, ctx) {
        ctx.waitUntil(checkAndSendReminders(env));
    }
};

// ── Workforce Helper Functions ──────────────────────────────────────────────────

async function sendEmailHelper(env, to, subject, body, type) {
    const apiKey = env.RESEND_API_KEY;
    let status = "Simulated";
    
    if (apiKey) {
        try {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: "Tellora Workforce <workforce@telloramedia.online>",
                    to: [to],
                    subject: subject,
                    text: body
                })
            });
            if (res.ok) {
                status = "Sent";
            } else {
                console.error("Resend API failed:", await res.text());
                status = "Failed";
            }
        } catch (e) {
            console.error("Error sending via Resend:", e);
            status = "Failed";
        }
    }
    
    // Log to Supabase workforce_emails
    try {
        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "https://pteassendcvgngkkybjf.supabase.co";
        const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";
        
        const emailsRes = await fetch(`${supabaseUrl}/rest/v1/admin_data?collection=eq.workforce_emails`, {
            headers: {
                "apikey": supabaseAnonKey,
                "Content-Type": "application/json"
            }
        });
        
        let emailsList = [];
        if (emailsRes.ok) {
            const d = await emailsRes.json();
            emailsList = d[0]?.content || [];
        }
        
        const newEmailLog = {
            id: `EML-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            to: to,
            subject: subject,
            body: body,
            timestamp: new Date().toISOString(),
            type: type,
            status: status
        };
        
        emailsList.push(newEmailLog);
        
        // Upsert back to Supabase
        await fetch(`${supabaseUrl}/rest/v1/admin_data`, {
            method: "POST",
            headers: {
                "apikey": supabaseAnonKey,
                "Content-Type": "application/json",
                "Prefer": "resolution=merge-duplicates"
            },
            body: JSON.stringify({
                collection: "workforce_emails",
                content: emailsList,
                updated_at: new Date().toISOString()
            })
        });
        
    } catch (e) {
        console.error("Error saving email log to Supabase:", e);
    }
    
    return { status };
}

async function checkAndSendReminders(env) {
    try {
        const utc = new Date().getTime();
        const istDate = new Date(utc + (5.5 * 3600000));
        const dateStr = istDate.toISOString().split("T")[0];
        const curHour = istDate.getUTCHours();
        const curMin = istDate.getUTCMinutes();
        const curMins = curHour * 60 + curMin;
        
        const isWeekend = istDate.getUTCDay() === 0 || istDate.getUTCDay() === 6;

        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "https://pteassendcvgngkkybjf.supabase.co";
        const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

        // Fetch employees
        const empsRes = await fetch(`${supabaseUrl}/rest/v1/admin_data?collection=eq.workforce_employees`, {
            headers: { "apikey": supabaseAnonKey, "Content-Type": "application/json" }
        });
        if (!empsRes.ok) return { error: "Failed to fetch employees" };
        const empsData = await empsRes.json();
        const employees = empsData[0]?.content || [];

        // Fetch attendance logs
        const attRes = await fetch(`${supabaseUrl}/rest/v1/admin_data?collection=eq.workforce_attendance`, {
            headers: { "apikey": supabaseAnonKey, "Content-Type": "application/json" }
        });
        if (!attRes.ok) return { error: "Failed to fetch attendance logs" };
        const attData = await attRes.json();
        const logs = attData[0]?.content || [];

        // Fetch sent emails to avoid duplicates
        const emailsRes = await fetch(`${supabaseUrl}/rest/v1/admin_data?collection=eq.workforce_emails`, {
            headers: { "apikey": supabaseAnonKey, "Content-Type": "application/json" }
        });
        const emailsData = emailsRes.ok ? await emailsRes.json() : [];
        const emailLogs = emailsData[0]?.content || [];

        let sentCount = 0;

        for (const employee of employees) {
            if (employee.status !== "Active") continue;

            const [startH, startM] = employee.shiftStart.split(":").map(Number);
            const [endH, endM] = employee.shiftEnd.split(":").map(Number);
            const shiftStartMins = startH * 60 + startM;
            const shiftEndMins = endH * 60 + endM;

            // 1. Clock-in Reminders (only on weekdays)
            if (!isWeekend && curMins >= shiftStartMins + 15) {
                // Check if they clocked in today
                const clockedIn = logs.some(l => l.employeeId === employee.id && l.date === dateStr);
                if (!clockedIn) {
                    // Check if already sent clock_in_reminder today
                    const alreadySent = emailLogs.some(e => 
                        e.to === employee.email && 
                        e.type === "clock_in_reminder" && 
                        e.timestamp.startsWith(dateStr)
                    );
                    if (!alreadySent) {
                        const subject = "Workforce Reminder: Clock-in Schedule Started";
                        const body = `Hello ${employee.name},\n\nThis is a friendly reminder that your scheduled shift started at ${employee.shiftStart}. Please remember to clock in using the face verification portal.\n\nBest regards,\nWorkforce Admin`;
                        await sendEmailHelper(env, employee.email, subject, body, "clock_in_reminder");
                        sentCount++;
                    }
                }
            }

            // 2. Clock-out Reminders (any day)
            // Check if they have an active log today (clocked in but no clockOut)
            const activeLog = logs.find(l => l.employeeId === employee.id && l.date === dateStr && l.clockOut === null);
            if (activeLog && curMins >= shiftEndMins + 30) {
                // Check if already sent clock_out_reminder today
                const alreadySent = emailLogs.some(e => 
                    e.to === employee.email && 
                    e.type === "clock_out_reminder" && 
                    e.timestamp.startsWith(dateStr)
                );
                if (!alreadySent) {
                    const subject = "Workforce Reminder: Pending Clock-out";
                    const body = `Hello ${employee.name},\n\nYour scheduled shift ended at ${employee.shiftEnd}. You are still clocked in. Please remember to clock out using the face verification portal.\n\nBest regards,\nWorkforce Admin`;
                    await sendEmailHelper(env, employee.email, subject, body, "clock_out_reminder");
                    sentCount++;
                }
            }
        }

        return { success: true, sentCount };
    } catch (e) {
        console.error("Reminder check failed:", e);
        return { error: e.message };
    }
}
