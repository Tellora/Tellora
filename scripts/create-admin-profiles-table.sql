-- ============================================================
-- Tellora Admin Profiles Table
-- Run this in: https://supabase.com/dashboard/project/pteassendcvgngkkybjf/sql/new
-- ============================================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id         UUID         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT         NOT NULL,
  email      TEXT         NOT NULL UNIQUE,
  role       TEXT         NOT NULL DEFAULT 'Admin',
  department TEXT,
  initials   TEXT         NOT NULL DEFAULT 'AD',
  created_at TIMESTAMPTZ  DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: authenticated users can read any profile (needed for personalized header)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'admin_profiles' AND policyname = 'Auth read'
  ) THEN
    CREATE POLICY "Auth read"
      ON admin_profiles FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- 4. Policy: service_role can do everything (needed for the setup script)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'admin_profiles' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON admin_profiles FOR ALL
      TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 5. Verify it worked
SELECT 'admin_profiles table created successfully ✅' AS result;
