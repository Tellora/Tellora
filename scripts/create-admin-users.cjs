/**
 * Tellora Admin User Creation Script (CommonJS)
 * Run with: node scripts/create-admin-users.cjs
 */
'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Load .env.local ──────────────────────────────────────────────────────────
const envPath = path.resolve(__dirname, '../.env.local');
const envText = fs.readFileSync(envPath, 'utf8');
for (const line of envText.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim();
    if (!process.env[k]) process.env[k] = v;
}

const SUPABASE_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || SERVICE_ROLE_KEY === 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE') {
    console.error('\n❌ SUPABASE_SERVICE_ROLE_KEY not configured in .env.local\n');
    process.exit(1);
}

// ─── Use @supabase/supabase-js ────────────────────────────────────────────────
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
});

// ─── Account definitions ──────────────────────────────────────────────────────
const ADMIN_USERS = [
    {
        email:    'abhay@telloramedia.online',
        password: 'abhaytellora22@',
        profile:  { name: 'Abhay',          role: 'CEO & Founder', department: 'Operations & Oversight', initials: 'AB' }
    },
    {
        email:    'vansh@telloramedia.online',
        password: 'vanshtellora22@',
        profile:  { name: 'Vansh Sharma',   role: 'Lead Developer',    department: 'Development',   initials: 'VS' }
    },
    {
        email:    'prakhar@telloramedia.online',
        password: 'prakhartellora22@',
        profile:  { name: 'Prakhar Saxena', role: 'Co-founder',    department: 'Creative & Content',     initials: 'PS' }
    }
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function upsertProfile(userId, email, profile) {
    const { error } = await supabase
        .from('admin_profiles')
        .upsert(
            { id: userId, email, name: profile.name, role: profile.role, department: profile.department, initials: profile.initials },
            { onConflict: 'id' }
        );
    if (error) throw new Error(`Profile: ${error.message}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    console.log('\n🚀 Tellora Admin User Setup\n' + '═'.repeat(50));

    // Verify admin_profiles table exists
    const { error: tableErr } = await supabase.from('admin_profiles').select('id').limit(1);
    if (tableErr && (tableErr.code === '42P01' || tableErr.message.includes('does not exist'))) {
        console.error(`
❌ The admin_profiles table does not exist yet.

Please go to:
https://supabase.com/dashboard/project/pteassendcvgngkkybjf/sql/new

And run this SQL:
─────────────────────────────────────────────────────────────
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

CREATE POLICY "Auth read" ON admin_profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service role insert" ON admin_profiles
  FOR ALL TO service_role USING (true) WITH CHECK (true);
─────────────────────────────────────────────────────────────

Then re-run: node scripts/create-admin-users.cjs
`);
        process.exit(1);
    }

    // List current auth users
    const { data: { users: existingUsers }, error: listErr } = await supabase.auth.admin.listUsers();
    if (listErr) { console.error('❌ Cannot list users:', listErr.message); process.exit(1); }

    let successCount = 0;

    for (const user of ADMIN_USERS) {
        console.log(`\n👤 ${user.profile.name} (${user.email})`);
        const existing = existingUsers.find(u => u.email === user.email);

        try {
            let userId;

            if (existing) {
                console.log('  ⚠️  Already exists — updating password...');
                const { error } = await supabase.auth.admin.updateUserById(existing.id, {
                    password: user.password,
                    email_confirm: true
                });
                if (error) throw new Error(error.message);
                console.log('  ✅ Password updated');
                userId = existing.id;
            } else {
                const { data, error } = await supabase.auth.admin.createUser({
                    email:         user.email,
                    password:      user.password,
                    email_confirm: true
                });
                if (error) throw new Error(error.message);
                console.log('  ✅ Auth account created');
                userId = data.user.id;
            }

            await upsertProfile(userId, user.email, user.profile);
            console.log(`  ✅ Profile: ${user.profile.name} · ${user.profile.role}`);
            successCount++;
        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
        }
    }

    console.log('\n' + '═'.repeat(50));

    if (successCount === ADMIN_USERS.length) {
        console.log(`\n✅ All ${successCount} admin accounts are ready!\n`);
        console.log('📋 Credentials:');
        for (const u of ADMIN_USERS) {
            console.log(`   ${u.profile.name.padEnd(16)} ${u.email}`);
        }
        console.log('\n🌐 Test at: http://localhost:3000/admin/login\n');
    } else {
        console.log(`\n⚠️  ${successCount}/${ADMIN_USERS.length} accounts set up. Review errors above.\n`);
    }
}

main().catch(err => { console.error('❌ Fatal:', err.message); process.exit(1); });
