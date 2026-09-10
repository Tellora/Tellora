const https = require('https');

async function check() {
    const url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://telloramediahq.com/&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo';
    console.log('Fetching Google PageSpeed Insights report for https://telloramediahq.com/ ...');
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.error) {
        console.error('API Error:', data.error);
        return;
    }
    
    const lh = data.lighthouseResult;
    console.log('\n--- SCORES ---');
    for (const [key, cat] of Object.entries(lh.categories)) {
        console.log(`${cat.title}: ${Math.round(cat.score * 100)}`);
    }
    
    console.log('\n--- METRICS ---');
    const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'];
    for (const m of metrics) {
        const audit = lh.audits[m];
        if (audit) console.log(`${audit.title}: ${audit.displayValue} (score: ${audit.score})`);
    }
    
    console.log('\n--- OPPORTUNITIES & DIAGNOSTICS (Score < 0.9) ---');
    for (const [key, audit] of Object.entries(lh.audits)) {
        if (audit.score !== null && audit.score < 0.9) {
            console.log(`\n[${key}] ${audit.title} - score: ${audit.score} ${audit.displayValue ? `(${audit.displayValue})` : ''}`);
            if (audit.description) console.log(`  Desc: ${audit.description.slice(0, 140)}...`);
            if (audit.details && audit.details.items && audit.details.items.length) {
                console.log(`  Top items:`, JSON.stringify(audit.details.items.slice(0, 3), null, 2));
            }
        }
    }
}

check().catch(console.error);
