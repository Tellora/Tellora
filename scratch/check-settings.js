const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://pteassendcvgngkkybjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log("Checking site settings in Supabase...");
    const { data, error } = await supabase
        .from("site_settings")
        .select("*");
        
    if (error) {
        console.error("Error fetching settings:", error);
    } else {
        console.log("Settings found:", data);
    }
}

check();
