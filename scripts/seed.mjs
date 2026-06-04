import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pteassendcvgngkkybjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWFzc2VuZGN2Z25na2t5YmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTQ0MDIsImV4cCI6MjA4MjkzMDQwMn0.WCbmfgfqyMgvfJ6NqOsjVw-TcxFX22BrA8wrR1eN_nA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const services = [
    {
        category: "Traffic & Visibility",
        id: "svc-1",
        title: "SEO Optimization",
        description: "Drive compounding organic growth with technical SEO, semantic content strategies, and high-authority link building that dominates SERPs.",
        icon: "Search",
        features: ["Semantic Content Mapping", "Technical Core Web Vitals", "Authority Network Growth"],
        color: "#A855F7",
        status: "Active"
    },
    {
        category: "Traffic & Visibility",
        id: "svc-2",
        title: "Paid Search (PPC)",
        description: "Maximize ROAS through hyper-targeted Google & Bing Ads campaigns utilizing machine learning bidding and expert keyword management.",
        icon: "BarChart3",
        features: ["ML Bidding Optimization", "Competitor Conquesting", "Search Query Mining"],
        color: "#F3E84A",
        status: "Active"
    },
    {
        category: "Traffic & Visibility",
        id: "svc-3",
        title: "Social Media Ads",
        description: "Engage and convert across Meta, LinkedIn, and TikTok with high-impact creative and precision demographic targeting.",
        icon: "Share2",
        features: ["Dynamic Creative Testing", "Lookalike Audience Scaling", "Retargeting Funnels"],
        color: "#22C55E",
        status: "Active"
    },
    {
        category: "Creative & Development",
        id: "svc-4",
        title: "High-End Web Design",
        description: "Award-winning, conversion-focused websites built with modern frameworks like Next.js for insane speed and 3D interactivity.",
        icon: "Monitor",
        features: ["Next.js Performance", "3D WebGL Integration", "Conversion Rate Optimization"],
        color: "#F3E84A",
        status: "Active"
    },
    {
        category: "Creative & Development",
        id: "svc-5",
        title: "Content Marketing",
        description: "Building brand authority through editorial-grade content that educates your audience and positions you as a market leader.",
        icon: "PenTool",
        features: ["Thought Leadership Blogs", "Whitepaper Production", "Email Automation Strategy"],
        color: "#A855F7",
        status: "Active"
    },
    {
        category: "Creative & Development",
        id: "svc-6",
        title: "Branding & Identity",
        description: "Crafting distinct, unignorable brand identities that resonate with your target audience and stand the test of time.",
        icon: "Lightbulb",
        features: ["Visual Identity Systems", "Brand Positioning", "Market Differentiation"],
        color: "#22C55E",
        status: "Active"
    },
    {
        category: "Analytics & Automation",
        id: "svc-7",
        title: "Data Architecture",
        description: "Centralized, real-time tracking systems bridging Meta, Google, and CRM data into a single definitive source of truth.",
        icon: "Database",
        features: ["Server-Side Tracking", "Predictive Dashboards", "Cross-Channel Attribution"],
        color: "#4AC0E4",
        status: "Active"
    },
    {
        category: "Analytics & Automation",
        id: "svc-8",
        title: "AI Workflows",
        description: "Custom AI deployment to automate lead scoring, dynamic creative generation, and high-speed internal CRM routing.",
        icon: "Cpu",
        features: ["Zapier/Make Automation", "LLM-Powered Content", "Dynamic Pricing Tech"],
        color: "#14B8A6",
        status: "Active"
    },
    {
        category: "Analytics & Automation",
        id: "svc-9",
        title: "Conversion Architecture",
        description: "Relentless A/B testing of deep funnel mechanics. We manipulate user psychology to maximize absolute cart value.",
        icon: "Target",
        features: ["A/B Split Testing", "Heatmap Analysis", "Checkout Friction Removal"],
        color: "#F43F5E",
        status: "Active"
    }
];

const team = [
    {
        id: "a6b62c34-a506-4069-8f21-8872cd98b61c",
        name: "Abhay Sehdev",
        role: "Co-Founder · Tech",
        image_url: "/teams/abhay tellora.png",
        color: "#A855F7",
        rotate: "-2deg",
        linkedin_url: "https://www.linkedin.com/in/abhaysehdev",
        instagram_url: "https://www.instagram.com/abhays3hdev/",
        bio: "Mastermind behind Tellora's technical architecture. Specializes in building high-performance, scalable web systems and AI-driven growth engines that outperform competitors globally.",
        skills: ["System Architecture", "Next.js & React", "AI Automation"],
        stats: [
            { label: "Focus", value: "Scale" },
            { label: "Execution", value: "Fast" }
        ]
    },
    {
        id: "eded14f4-798d-4d4e-bc48-bc971da23085",
        name: "Prakhar Saxena",
        role: "Co-Founder · Content",
        image_url: "/teams/prakhar tellora.png",
        color: "#22C55E",
        rotate: "1.5deg",
        linkedin_url: "https://www.linkedin.com/in/prakhar-saxena-a13876274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagram_url: "https://www.instagram.com/_prakkhar_?igsh=MTEyYTRmZ3dyd3VnMg%3D%3D&utm_source=qr",
        bio: "Strategic visionary for brand narratives. Directs high-converting, viral content that scales engagement exponentially and deeply connects with target consumer psychology.",
        skills: ["Content Strategy", "Viral Media", "Brand Identity"],
        stats: [
            { label: "Impact", value: "Viral" },
            { label: "Creative", value: "High" }
        ]
    },
    {
        id: "3146598b-e00e-4ed5-b10a-522bd98a84f4",
        name: "Arhama",
        role: "Video Editing Intern",
        image_url: "/teams/arhama tellora.png",
        color: "#22D3EE",
        rotate: "-1.2deg",
        linkedin_url: "#",
        instagram_url: "#",
        bio: "Bringing fresh, creative energy to visual storytelling and high-retention video edits.",
        skills: ["Video Editing", "Premiere Pro", "Short-form Content"],
        stats: [
            { label: "Retention", value: "85%" },
            { label: "Reels", value: "40+" }
        ],
        status: "designing"
    },
    {
        id: "ed881694-fa11-4acd-b2bd-0c70b33a4f2d",
        name: "Prateek",
        role: "Video Editor",
        image_url: "/teams/prateek tellora.png",
        color: "#8B5CF6",
        rotate: "1deg",
        linkedin_url: "#",
        instagram_url: "#",
        bio: "Crafting dynamic, high-impact videos designed to capture attention and scale brand authority.",
        skills: ["Video Editing", "After Effects", "Sound Design"],
        stats: [
            { label: "Engagement", value: "12%" },
            { label: "Views", value: "1M+" }
        ],
        status: "designing"
    },
    {
        id: "9b863ff0-0a2e-41ba-84f5-113b8cf5d0a2",
        name: "Nandini",
        role: "Design Lead",
        image_url: "/teams/nandini tellora.png",
        color: "#FFFFFF",
        rotate: "2.5deg",
        linkedin_url: "#",
        instagram_url: "#",
        bio: "Transforms digital interfaces into unforgettable brand experiences. Blends unapologetic brutalist aesthetics with meticulously engineered user-conversion layout methodologies.",
        skills: ["UI/UX Design", "Motion Graphics", "Visual Identity"],
        stats: [
            { label: "Design", value: "Pure" },
            { label: "Aesthetic", value: "UX" }
        ],
        status: "designing"
    }
];

const faqs = [
    {
        question: "How is Tellora different from other agencies?",
        answer: "We don't just run campaigns; we build growth engines. We blend high-end creative design with advanced data science and custom ROI tracking, ensuring every dollar spent is measurable."
    },
    {
        question: "What is your typical onboarding process?",
        answer: "Our onboarding takes 1-2 weeks. We start with a deep-dive strategy session, followed by a comprehensive audit of your current assets, pixel implementations, and competitor analysis before launching phase one."
    },
    {
        question: "Do you guarantee results?",
        answer: "While no ethical agency can guarantee specific financial outcomes due to market variables, we guarantee our output, our strategy execution, and a transparent data pipeline. If a strategy isn't scaling, you will know exactly why and how we are pivoting."
    },
    {
        question: "What industries do you specialize in?",
        answer: "We have deep expertise in SaaS, B2B Tech, High-Ticket E-commerce, and specialized Local Services (e.g., Medical, Real Estate). Our frameworks adapt well to any data-driven sector."
    }
];

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CMO, TechNova",
        quote: "Tellora completely transformed our online presence. Our inbound leads increased significantly. Their data-driven approach is absolute magic.",
        image_url: "",
        rating: 5,
        company: "TechNova"
    },
    {
        name: "David Chen",
        role: "Founder, Apex",
        quote: "The ROI we've seen since partnering with Tellora is staggering. Their team doesn't just run ads; they engineer growth engines. 10/10 recommended.",
        image_url: "",
        rating: 5,
        company: "Apex"
    },
    {
        name: "Emily Rod",
        role: "Director, Bloom",
        quote: "Not only is their creative work stunning, but the backend analytics integration gave us visibility we never had before. A truly visionary agency.",
        image_url: "",
        rating: 5,
        company: "Bloom"
    }
];

const site_settings = {
    id: 1,
    site_title: "Tellora Media | Digital Growth Agency",
    meta_description: "Tellora is a high-performance creative media lab specializing in high-end SEO, social growth, and brand identity for global enterprises.",
    keywords: ["SEO Engine", "Global Scale", "Visual Lab", "Delhi NCR", "Tellora Core"],
    admin_password: "admin123",
    brand_accent: "#4ac0e4",
    auto_optimization: true,
    neural_cache: true,
    stealth_mode: false,
    deep_link_sync: true
};

const clients = [
    { name: "Client 1", logo_url: "/clients/client logo (10).png" },
    { name: "Client 2", logo_url: "/clients/clientLogo (2).png" },
    { name: "Client 3", logo_url: "/clients/clientlogo (3).png" },
    { name: "Client 4", logo_url: "/clients/clientlogo (4).png" },
    { name: "Client 5", logo_url: "/clients/clientlogo (5).png" },
    { name: "Client 6", logo_url: "/clients/clientlogo (6).png" },
    { name: "Client 7", logo_url: "/clients/clientlogo (7).png" },
    { name: "Client 8", logo_url: "/clients/clientlogo (8).png" },
    { name: "Client 9", logo_url: "/clients/clientlogo (9).png" },
    { name: "Client 10", logo_url: "/clients/clientlogo.png" },
];

const company_stats = [
    { value: "5+", label: "Core Partners", color: "#A855F7" },
    { value: "Data", label: "Driven Growth", color: "#22C55E" },
    { value: "100%", label: "Performance", color: "#F3E84A" },
];

async function seed() {
    console.log("Seeding services...");
    await supabase.from("services").upsert(services);
    
    console.log("Seeding team...");
    await supabase.from("team_members").upsert(team);
    
    console.log("Seeding FAQs...");
    await supabase.from("faqs").upsert(faqs);
    
    console.log("Seeding Testimonials...");
    await supabase.from("testimonials").upsert(testimonials);
    
    console.log("Seeding Settings...");
    await supabase.from("site_settings").upsert(site_settings);

    console.log("Seeding Clients...");
    await supabase.from("clients").upsert(clients);

    console.log("Seeding Stats...");
    await supabase.from("company_stats").upsert(company_stats);
    
    console.log("Seeding complete!");
}

seed().catch(console.error);
