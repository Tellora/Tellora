-- Adds the visitor's selected region to contact submissions so the admin inbox can filter by it.
-- Run once in the Supabase SQL editor BEFORE deploying the region-aware contact form.
-- Values written by the site: 'India', 'United States', 'United Kingdom', 'Other'.
-- (Until this runs, the site still saves every message: it retries without the column and
--  records the region inside the message text instead.)
alter table inbox_messages add column if not exists region text;
create index if not exists inbox_messages_region_idx on inbox_messages (region);
