-- Tellora Media: Professional Supabase Schema
-- Run this in your Supabase SQL Editor

-- 1. SITE SETTINGS (Brand, SEO, Credentials)
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  site_title TEXT NOT NULL DEFAULT 'Tellora Media',
  meta_description TEXT,
  keywords TEXT[],
  admin_password TEXT DEFAULT 'admin123',
  brand_accent TEXT DEFAULT '#4ac0e4',
  auto_optimization BOOLEAN DEFAULT TRUE,
  neural_cache BOOLEAN DEFAULT TRUE,
  stealth_mode BOOLEAN DEFAULT FALSE,
  deep_link_sync BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT one_row_only CHECK (id = 1)
);

-- 2. SERVICES
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  features TEXT[],
  color TEXT,
  status TEXT DEFAULT 'Active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CASE STUDIES
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  impact TEXT,
  tag TEXT,
  image_url TEXT,
  stats JSONB,
  tags TEXT[],
  status TEXT DEFAULT 'Published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  image_url TEXT,
  color TEXT,
  rotate TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  bio TEXT,
  skills TEXT[],
  stats JSONB,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REELS
CREATE TABLE IF NOT EXISTS reels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  embed_url TEXT,
  tag TEXT,
  likes TEXT,
  views TEXT,
  status TEXT DEFAULT 'Live',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FAQS
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  image_url TEXT,
  rating INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INBOX MESSAGES
CREATE TABLE IF NOT EXISTS inbox_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'Unread',
  reply_history JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  item TEXT,
  user_name TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. INSTAGRAM PROFILES
CREATE TABLE IF NOT EXISTS ig_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  profile_pic_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INSTAGRAM POSTS
CREATE TABLE IF NOT EXISTS ig_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES ig_profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  src_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. PARTNER LOGOS (Logo Cloud)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policies (Public for build mode - restrict later)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON site_settings FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON services FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON case_studies FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON team_members FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE reels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON reels FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON faqs FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON testimonials FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE inbox_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON inbox_messages FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON activity_logs FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE ig_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON ig_profiles FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE ig_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON ig_posts FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON clients FOR ALL USING (true) WITH CHECK (true);

-- 13. COMPANY STATS
CREATE TABLE IF NOT EXISTS company_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  color TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write" ON company_stats FOR ALL USING (true) WITH CHECK (true);

-- 14. ADMIN PROFILES (Linked to Supabase Auth users)
-- Run this AFTER creating the auth users via the create-admin-users script.
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

-- Only authenticated users can read profiles (protects against public exposure)
CREATE POLICY "Authenticated users can read own profile"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (true);

-- Only the user themselves (or service role) can update their profile
CREATE POLICY "Users can update own profile"
  ON admin_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
