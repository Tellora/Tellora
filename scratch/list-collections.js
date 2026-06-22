const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://pteassendcvgngkkybjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log("Listing all collections in admin_data...");
    const { data, error } = await supabase
        .from("admin_data")
        .select("collection, updated_at");
        
    if (error) {
        console.error("Error fetching admin_data:", error);
    } else {
        console.log(`admin_data collections count: ${data.length}`);
        console.log(JSON.stringify(data, null, 2));
    }
}

check();
