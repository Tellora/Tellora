# Supabase Global Storage Setup

To ensure your Tellora Admin Panel settings and content are globally saved and persistent, please follow these steps to configure your Supabase project.

## 1. Create the Database Table

Run the following SQL in the **SQL Editor** of your Supabase dashboard:

```sql
-- Table for storing JSON collections (Settings, Services, Reels, etc.)
create table if not exists admin_data (
  collection text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table admin_data enable row level security;

-- Create a policy that allows anyone with the anon key to read/write 
-- (Note: In a production environment, you should restrict this to authenticated users only)
create policy "Allow public access to admin_data"
  on admin_data for all
  using (true)
  with check (true);
```

## 2. Create the Storage Bucket (Optional)

If you plan to upload images or videos for the Instagram previews:

1. Go to **Storage** in your Supabase dashboard.
2. Create a new bucket named `tellora-media`.
3. Set the bucket to **Public**.
4. (Recommended) Add an RLS policy for the bucket to allow uploads.

## 3. Verify Configuration

1. Open the Admin Panel.
2. Navigate to **Infrastructure**.
3. Ensure the **Supabase Project URL** and **Anon Key** match what you provided.
4. Set **Storage Protocol** to **Supabase Cloud**.
5. Click **Save Settings**.

Your data will now be synced globally via Supabase!
