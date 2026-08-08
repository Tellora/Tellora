import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);

if (!urlMatch || !keyMatch) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabaseUrl = urlMatch[1].trim();
const serviceKey = keyMatch[1].trim();
const supabase = createClient(supabaseUrl, serviceKey);

const REELS_DATA = [
    { id: "1", filename: "reel-01.mp4", title: "Cinema Production #24", tag: "Production", likes: "24.5k" },
    { id: "2", filename: "reel-02.mp4", title: "Connect With Us", tag: "Studio", likes: "18.2k" },
    { id: "3", filename: "reel-03.mp4", title: "Brand Narrative", tag: "Case Study", likes: "12.1k" },
    { id: "4", filename: "reel-04.mp4", title: "Growth Architecture", tag: "Strategy", likes: "31.4k" },
    { id: "5", filename: "reel-05.mp4", title: "Visual Storytelling", tag: "Production", likes: "15.2k" },
    { id: "6", filename: "reel-06.mp4", title: "Studio Protocol", tag: "Studio", likes: "42.7k" },
    { id: "7", filename: "reel-07.mp4", title: "Creative Final Cut", tag: "BTS", likes: "19.7k" },
    { id: "8", filename: "reel-08.mp4", title: "Goodlife Campaign", tag: "Case Study", likes: "11.4k" },
    { id: "9", filename: "reel-09.mp4", title: "Sequence 01", tag: "Strategy", likes: "14.2k" },
    { id: "10", filename: "reel-10.mp4", title: "Airright Final Edit", tag: "Production", likes: "16.1k" },
    { id: "11", filename: "reel-11.mp4", title: "Master Edit", tag: "Studio", likes: "28.3k" },
    { id: "12", filename: "reel-12.mp4", title: "The Tellora Story", tag: "Brand", likes: "55.0k" },
    { id: "13", filename: "reel-13.mp4", title: "Alfa Testimonial", tag: "Testimonials", likes: "22.9k" },
    { id: "14", filename: "reel-14.mp4", title: "Digital Ecosystem", tag: "Strategy", likes: "33.1k" },
    { id: "15", filename: "reel-15.mp4", title: "Commercial Cut", tag: "Production", likes: "20.8k" },
    { id: "16", filename: "reel-16.mp4", title: "Tellora Vision", tag: "Brand", likes: "48.2k" },
];

async function main() {
    console.log("=== 1. Ensuring 'reels' bucket exists in Supabase Storage ===");
    const { data: bucket, error: bucketErr } = await supabase.storage.createBucket('reels', {
        public: true,
        fileSizeLimit: 150000000,
    });
    if (bucketErr) {
        console.log("Bucket status:", bucketErr.message);
        await supabase.storage.updateBucket('reels', { public: true, fileSizeLimit: 150000000 });
    } else {
        console.log("Bucket 'reels' created!");
    }

    console.log("\n=== 2. Uploading 16 Video Files to Supabase Storage Bucket 'reels' ===");
    for (const reel of REELS_DATA) {
        const filePath = path.join(process.cwd(), 'public', 'reels', reel.filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            continue;
        }

        const fileBuffer = fs.readFileSync(filePath);
        console.log(`Uploading ${reel.filename} (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB)...`);
        
        const { data: uploadData, error: uploadErr } = await supabase.storage
            .from('reels')
            .upload(reel.filename, fileBuffer, {
                contentType: 'video/mp4',
                upsert: true
            });

        if (uploadErr) {
            console.error(`Failed to upload ${reel.filename}:`, uploadErr.message);
        } else {
            const publicUrl = `${supabaseUrl}/storage/v1/object/public/reels/${reel.filename}`;
            console.log(`Uploaded successfully! Public CDN URL: ${publicUrl}`);

            // Upsert into Supabase database 'reels' table with valid UUID
            const uuid = `00000000-0000-4000-8000-${String(reel.id).padStart(12, '0')}`;
            const { error: dbErr } = await supabase.from('reels').upsert({
                id: uuid,
                title: reel.title,
                embed_url: publicUrl,
                tag: reel.tag,
                likes: reel.likes,
                views: "100k+",
                status: "Live"
            });

            if (dbErr) {
                console.error(`DB error for ${reel.title}:`, dbErr.message);
            } else {
                console.log(`DB record synced for ${reel.title}`);
            }
        }
    }

    console.log("\n=== ALL REELS UPLOADED & SYNCED TO SUPABASE STORAGE & DATABASE ===");
}

main().catch(err => {
    console.error("Fatal upload error:", err);
    process.exit(1);
});
