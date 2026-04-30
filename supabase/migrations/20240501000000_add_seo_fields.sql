-- Migration: Add SEO fields to blog_posts, case_studies, and careers tables

-- 1. Blog Posts Table SEO Fields
-- Assuming table is called `blog_posts`
ALTER TABLE IF EXISTS blog_posts
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(70) NULL,
ADD COLUMN IF NOT EXISTS seo_description VARCHAR(160) NULL,
ADD COLUMN IF NOT EXISTS og_image TEXT NULL,
ADD COLUMN IF NOT EXISTS reading_time INTEGER NULL,
ADD COLUMN IF NOT EXISTS canonical_url TEXT NULL,
ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT FALSE;

-- 2. Case Studies Table SEO Fields
-- Assuming table is called `case_studies`
ALTER TABLE IF EXISTS case_studies
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(70) NULL,
ADD COLUMN IF NOT EXISTS seo_description VARCHAR(160) NULL,
ADD COLUMN IF NOT EXISTS og_image TEXT NULL,
ADD COLUMN IF NOT EXISTS canonical_url TEXT NULL,
ADD COLUMN IF NOT EXISTS slug TEXT NULL;

-- 3. Career Listings Table SEO Fields
-- Assuming table is called `jobs`
ALTER TABLE IF EXISTS jobs
ADD COLUMN IF NOT EXISTS date_posted TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS valid_through TIMESTAMPTZ NULL,
ADD COLUMN IF NOT EXISTS employment_type TEXT DEFAULT 'FULL_TIME',
ADD COLUMN IF NOT EXISTS base_salary JSONB NULL,
ADD COLUMN IF NOT EXISTS job_location TEXT DEFAULT 'Delhi, India',
ADD COLUMN IF NOT EXISTS is_remote BOOLEAN DEFAULT FALSE;
