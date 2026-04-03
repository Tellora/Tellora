-- ==========================================
-- TELLORA MASTER DATABASE SCHEMA
-- This script creates a fully regularized
-- relational structure for the Tellora Admin.
-- ==========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 0. ADMIN AUTH (Existing)
create table if not exists admin_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    name text not null,
    email text not null,
    role text,
    department text,
    initials text,
    created_at timestamp with time zone default now()
);

create table if not exists admin_data (
    collection text primary key,
    content jsonb not null,
    updated_at timestamp with time zone default now()
);

-- 1. SITE SETTINGS
create table if not exists site_settings (
    id int primary key default 1 check (id = 1),
    site_title text default 'Tellora Media',
    meta_description text,
    keywords text[],
    admin_password text,
    brand_accent text default '#4ac0e4',
    auto_optimization boolean default true,
    neural_cache boolean default true,
    stealth_mode boolean default false,
    deep_link_sync boolean default true,
    hero_title text,
    hero_subtitle text,
    cta_text text,
    updated_at timestamp with time zone default now()
);

-- 2. SERVICES
create table if not exists services (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    category text,
    icon text,
    features text[],
    color text,
    reach text,
    status text default 'Active',
    sort_order int default 0,
    created_at timestamp with time zone default now()
);

-- 3. CASE STUDIES
create table if not exists case_studies (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    category text,
    impact text,
    tag text,
    image_url text,
    stats jsonb, -- Array of {label, value}
    tags text[],
    status text default 'Published',
    created_at timestamp with time zone default now()
);

-- 4. REELS
create table if not exists reels (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    embed_url text not null,
    tag text,
    likes text,
    views text,
    status text default 'Active',
    created_at timestamp with time zone default now()
);

-- 5. INBOX MESSAGES
create table if not exists inbox_messages (
    id uuid primary key default uuid_generate_v4(),
    sender text not null,
    email text not null,
    company text,
    service text,
    subject text,
    message text,
    status text default 'Unread', -- Unread, Read, Replied, Archived
    reply_history jsonb default '[]'::jsonb,
    created_at timestamp with time zone default now()
);

-- 6. RECRUITMENT: JOBS
create table if not exists jobs (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    department text,
    location text,
    type text, -- Full-time, Contract, etc.
    status text default 'Published', -- Published, Closed, Draft
    description text,
    requirements text,
    benefits text,
    created_at timestamp with time zone default now()
);

-- 7. RECRUITMENT: APPLICATIONS
create table if not exists job_applications (
    id uuid primary key default uuid_generate_v4(),
    job_id uuid references jobs(id) on delete cascade,
    job_title text, -- Denormalized for easy viewing
    candidate_name text not null,
    candidate_email text not null,
    resume_url text,
    cover_letter text,
    status text default 'New', -- New, In Review, Interviewed, Offered, Rejected
    created_at timestamp with time zone default now()
);

-- 8. TEAM MEMBERS
create table if not exists team_members (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    role text,
    image_url text,
    color text,
    rotate text,
    linkedin_url text,
    instagram_url text,
    bio text,
    skills text[],
    stats jsonb,
    status text default 'Active',
    created_at timestamp with time zone default now()
);

-- 9. FAQs
create table if not exists faqs (
    id uuid primary key default uuid_generate_v4(),
    question text not null,
    answer text not null,
    sort_order int default 0,
    created_at timestamp with time zone default now()
);

-- 10. TESTIMONIALS
create table if not exists testimonials (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    role text,
    company text,
    quote text,
    image_url text,
    rating int default 5,
    created_at timestamp with time zone default now()
);

-- 11. ACTIVITY LOGS
create table if not exists activity_logs (
    id uuid primary key default uuid_generate_v4(),
    type text, -- create, update, delete, login, etc.
    item text,
    user_name text,
    status text,
    created_at timestamp with time zone default now()
);

-- 12. INSTAGRAM PREVIEW
create table if not exists ig_profiles (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    name text not null,
    bio text,
    profile_pic text,
    is_verified boolean default false,
    created_at timestamp with time zone default now()
);

create table if not exists ig_posts (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references ig_profiles(id) on delete cascade,
    type text not null, -- image/video
    src text not null,
    caption text,
    likes int default 0,
    created_at timestamp with time zone default now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) policies
-- ==========================================

-- Enable RLS on all tables
alter table admin_profiles enable row level security;
alter table admin_data enable row level security;
alter table site_settings enable row level security;
alter table services enable row level security;
alter table case_studies enable row level security;
alter table reels enable row level security;
alter table inbox_messages enable row level security;
alter table jobs enable row level security;
alter table job_applications enable row level security;
alter table team_members enable row level security;
alter table faqs enable row level security;
alter table testimonials enable row level security;
alter table activity_logs enable row level security;
alter table ig_profiles enable row level security;
alter table ig_posts enable row level security;

-- Create public access policies (read/write enabled for all for initial setup)
-- NOTE: In production, you should restrict write access to authenticated users.

do $$ 
declare
    t text;
begin
    for t in select table_name from information_schema.tables 
             where table_schema = 'public' and table_name in (
                'admin_profiles', 'admin_data', 'site_settings', 
                'services', 'case_studies', 'reels', 
                'inbox_messages', 'jobs', 'job_applications', 'team_members', 
                'faqs', 'testimonials', 'activity_logs', 'ig_profiles', 'ig_posts'
             )
    loop
        -- Drop if exists (to avoid duplicate errors if re-run)
        execute format('drop policy if exists "Public Access" on %I', t);
        -- Create policy
        execute format('create policy "Public Access" on %I for all using (true) with check (true);', t);
    end loop;
end $$;
