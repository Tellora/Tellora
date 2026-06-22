const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://pteassendcvgngkkybjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testWrite() {
    console.log("Testing write access to admin_data...");
    const testCollection = "test_collection_write";
    const testContent = { test: true, timestamp: new Date().toISOString() };
    
    // Attempt upsert
    const { error: upsertError } = await supabase
        .from("admin_data")
        .upsert({ collection: testCollection, content: testContent, updated_at: new Date().toISOString() });
        
    if (upsertError) {
        console.error("Upsert failed:", upsertError);
    } else {
        console.log("Upsert succeeded!");
        
        // Cleanup: delete the test row
        const { error: deleteError } = await supabase
            .from("admin_data")
            .delete()
            .eq("collection", testCollection);
            
        if (deleteError) {
            console.error("Cleanup delete failed:", deleteError);
        } else {
            console.log("Cleanup delete succeeded!");
        }
    }
}

testWrite();
