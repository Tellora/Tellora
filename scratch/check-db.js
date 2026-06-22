const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://pteassendcvgngkkybjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log("Checking workforce collections in Supabase...");
    const collections = ["workforce_employees", "workforce_attendance", "workforce_leaves"];
    
    for (const coll of collections) {
        const { data, error } = await supabase
            .from("admin_data")
            .select("*")
            .eq("collection", coll);
            
        if (error) {
            console.error(`Error fetching collection ${coll}:`, error);
        } else {
            console.log(`Collection: ${coll}, Rows count: ${data.length}`);
            if (data.length > 0) {
                console.log(JSON.stringify(data, null, 2));
            }
        }
    }
}

check();
