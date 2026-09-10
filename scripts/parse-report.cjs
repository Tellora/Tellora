const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/report.json'));

console.log('=== CATEGORY SCORES ===');
for (const [cat, data] of Object.entries(report.categories)) {
  console.log(data.title, ':', Math.round(data.score * 100));
}

console.log('\n=== CORE WEB VITALS ===');
['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].forEach(k => {
  const a = report.audits[k];
  if (a) console.log(`${a.title}: ${a.displayValue} (score: ${a.score})`);
});

console.log('\n=== FAILING AUDITS (score < 0.9) ===');
for (const [k, a] of Object.entries(report.audits)) {
  if (a.score !== null && a.score < 0.9) {
    console.log(`\n[${k}] ${a.title} -> score: ${a.score} (${a.displayValue || ''})`);
    if (a.explanation) console.log(`  Explanation: ${a.explanation}`);
    if (a.description) console.log(`  Description: ${a.description.slice(0, 160)}...`);
    if (a.details && a.details.items && a.details.items.length) {
      console.log('  Items:', a.details.items.slice(0, 5).map(i => i.url || i.node?.snippet || i.label || JSON.stringify(i).slice(0, 120)));
    }
  }
}
