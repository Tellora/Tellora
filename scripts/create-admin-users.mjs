/**
 * Tellora Admin User Creation Script
 * 
 * Uses ONLY Node.js built-ins (fs, path, fetch) — no npm packages required.
 * Run with: node scripts/create-admin-users.mjs
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Read .env.local manually ─────────────────────────────────────────────────
function loadEnv() {
    const envPath = resolve(__dirname, '../.env.local');
    try {
        const text = readFileSync(envPath, 'utf8');
        for (const line of text.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx < 0) continue;
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim();
            if (!process.env[key]) process.env[key] = val;
        }
    } catch {
        console.error('❌ Could not read .env.local');
        process.exit(1);
    }
}

loadEnv();

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || SERVICE_ROLE_KEY === 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE') {
    console.error('\n❌ SUPABASE_SERVICE_ROLE_KEY not configured in .env.local\n');
    process.exit(1);
}

const HEADERS = {
    'apikey':        SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type':  'application/json',
    'Prefer':        'return=representation'
};

// ─── Account Definitions ─────────────────────────────────────────────────────
const ADMIN_USERS = [
    {
        email:    'abhay@telloramedia.online',
        password: 'abhaytellora22@',
        profile:  { name: 'Abhay',          role: 'CEO & Founder', department: 'Operations & Oversight', initials: 'AB' }
    },
    {
        email:    'vansh@telloramedia.online',
        password: 'vanshtellora22@',
        profile:  { name: 'Vansh Sharma',   role: 'Co-founder',    department: 'Client Outreach & PR',   initials: 'VS' }
    },
    {
        email:    'prakhar@telloramedia.online',
        password: 'prakhartellora22@',
        profile:  { name: 'Prakhar Saxena', role: 'Co-founder',    department: 'Creative & Content',     initials: 'PS' }
    }
];

// ─── Supabase Admin Helpers ───────────────────────────────────────────────────

async function listUsers() {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=200`, { headers: HEADERS });
    if (!res.ok) { const t = await res.text(); throw new Error(`List users: ${res.status} ${t}`); }
    const body = await res.json();
    return body.users || [];
}

async function createAuthUser(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password, email_confirm: true })
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.msg || body.message || JSON.stringify(body));
    return body;
}

async function updateAuthUser(userId, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({ password, email_confirm: true })
    });
    if (!res.ok) { const t = await res.text(); throw new Error(`Update user: ${res.status} ${t}`); }
    return await res.json();
}

async function upsertProfile(userId, email, profile) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_profiles`, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({
            id:         userId,
            email,
            name:       profile.name,
            role:       profile.role,
            department: profile.department,
            initials:   profile.initials
        })
    });
    if (!res.ok) {
        const t = await res.text();
        throw new Error(`Profile upsert: ${res.status} ${t}`);
    }
    return await res.json();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    console.log('\n🚀 Tellora Admin User Setup\n' + '═'.repeat(50));

    // First, verify the admin_profiles table exists
    const tableCheck = await fetch(`${SUPABASE_URL}/rest/v1/admin_profiles?limit=1`, { headers: HEADERS });
    if (tableCheck.status === 404 || (await tableCheck.clone().json().catch(() => ({}))).code === '42P01') {
        console.error(`
❌ The admin_profiles table does not exist yet.

Please run this SQL in your Supabase SQL Editor:
https://supabase.com/dashboard/project/pteassendcvgngkkybjf/sql/new

──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'Admin',
  department TEXT,
  initials TEXT NOT NULL DEFAULT 'AD',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth read" ON admin_profiles FOR SELECT TO authenticated USING (true);
──────────────────────────────────────────────────

Then re-run this script.
`);
        process.exit(1);
    }

    // Fetch all existing auth users once
    let existingUsers = [];
    try { existingUsers = await listUsers(); } catch (e) { console.error('❌ Could not list users:', e.message); process.exit(1); }

    let successCount = 0;

    for (const user of ADMIN_USERS) {
        console.log(`\n👤 ${user.profile.name} (${user.email})`);

        const existing = existingUsers.find(u => u.email === user.email);

        try {
            let userId;

            if (existing) {
                console.log('  ⚠️  Auth user exists — updating password...');
                await updateAuthUser(existing.id, user.password);
                console.log('  ✅ Password updated');
                userId = existing.id;
            } else {
                console.log('  ⏳ Creating auth user...');
                const created = await createAuthUser(user.email, user.password);
                console.log('  ✅ Auth account created');
                userId = created.id;
            }

            await upsertProfile(userId, user.email, user.profile);
            console.log(`  ✅ Profile saved: ${user.profile.name} · ${user.profile.role}`);
            successCount++;

        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
        }
    }

    console.log('\n' + '═'.repeat(50));

    if (successCount === ADMIN_USERS.length) {
        console.log(`\n✅ All ${successCount} admin accounts are ready!\n`);
        console.log('📋 Login credentials:');
        for (const u of ADMIN_USERS) {
            console.log(`   ${u.profile.name.padEnd(16)} ${u.email}`);
        }
        console.log('\n🌐 Test at: http://localhost:3000/admin/login\n');
    } else {
        console.log(`\n⚠️  ${successCount}/${ADMIN_USERS.length} accounts created. Check errors above.\n`);
    }
}

main().catch(err => {
    console.error('\n❌ Fatal error:', err.message);
    process.exit(1);
});
