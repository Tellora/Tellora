const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://pteassendcvgngkkybjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function clear() {
    console.log("Clearing workforce collections from Supabase database...");
    const collections = ["workforce_employees", "workforce_attendance", "workforce_leaves"];
    
    for (const coll of collections) {
        const { error } = await supabase
            .from("admin_data")
            .delete()
            .eq("collection", coll);
            
        if (error) {
            console.error(`Error deleting collection ${coll}:`, error);
        } else {
            console.log(`Successfully deleted collection: ${coll}`);
        }
    }
    console.log("Database cleanup completed successfully.");
}

clear();
