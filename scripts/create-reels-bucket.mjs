import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);

if (urlMatch && keyMatch) {
    const supabase = createClient(urlMatch[1].trim(), keyMatch[1].trim());
    async function run() {
        const { data, error } = await supabase.storage.createBucket('reels', {
            public: true,
            fileSizeLimit: 150000000, // 150MB limit
        });
        if (error) {
            console.log("Bucket might already exist or error:", error.message);
            
            // Try to update it just in case
            await supabase.storage.updateBucket('reels', {
                public: true,
                fileSizeLimit: 150000000
            });
            console.log("Updated bucket settings to public.");
        } else {
            console.log("Bucket 'reels' created successfully!");
        }
    }
    run();
} else {
    console.log("Keys not found in .env.local");
}
