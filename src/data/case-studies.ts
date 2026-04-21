export interface CaseStudy {
    id: string;
    title: string;
    clientSummary: string;
    industry: string; // Field of Work
    services: string[]; // Service Types
    description: string;
    impact: string;
    challenge: string;
    execution: string;
    strategicInsight: string;
    roadmap: { phase: string; details: string }[];
    techStack: string[];
    image: string;
    color: string;
    links: {
        website?: string;
        instagram?: string;
        facebook?: string;
        gmb?: string;
    };
    stats: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
    {
        id: "dr-cicil-smile-center",
        title: "Dr. Cicil Smile Center",
        clientSummary: "A leading chain of dental clinics focused on accessible, high-end oral healthcare across regional centers.",
        industry: "Dental",
        services: ["Social Media", "Content Creation", "Web Development"],
        description: "Transforming dental care accessibility through immersive digital storytelling and high-performance booking architecture.",
        impact: "Regional Dominance",
        challenge: "Fragmented digital presence across multiple clinics with low organic patient acquisition and an outdated booking system.",
        execution: "Unified the brand identity across social platforms, deployed high-converting educational content, and engineered a high-performance booking portal.",
        strategicInsight: "We identified that patients prioritize trust and ease of scheduling. By humanizing the clinics through social content and removing friction from the booking process, we tapped into high-intent local demand.",
        roadmap: [
            { phase: "Audit & Analysis", details: "Deep audit of current traffic and patient drop-off points." },
            { phase: "System Architecture", details: "Redesigning the booking funnel for zero-friction conversion." },
            { phase: "Content Deployment", details: "Launching high-authority educational social campaigns." },
            { phase: "Growth Loop", details: "Automated retargeting for patient retention and reviews." }
        ],
        techStack: ["Next.js", "Tailwind CSS", "Supabase", "Meta Ads", "Google Analytics"],
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
        color: "#4AC0E4",
        links: {
            gmb: "https://share.google/sO4Yb7M5DVWkh1Beg",
            instagram: "https://www.instagram.com/dr.cicilsmilecenter"
        },
        stats: [
            { label: "Patient Leads", value: "+240%" },
            { label: "Search Vis.", value: "Tier 1" }
        ]
    },
    {
        id: "astrology-light-for-all",
        title: "Astrology Light for All",
        clientSummary: "A digital spiritual platform providing subscription-based astrology insights and community and personal guidance.",
        industry: "Astrology",
        services: ["Web Development", "Social Media Marketing", "Performance Marketing", "Content Creation"],
        description: "Architecting a viral spiritual growth engine that fueled a subscription-based platform's global expansion.",
        impact: "Viral Expansion",
        challenge: "Struggling to scale beyond local niche audiences while maintaining high engagement rates and subscription growth.",
        execution: "Deployed an aggressive social growth framework, precision-targeted performance marketing funnels, and a high-retention subscription platform.",
        strategicInsight: "Spirituality is a high-retention niche. We leveraged 'shareable wisdom' to drive viral organic growth, which then fueled our lower-funnel performance marketing for subscriptions.",
        roadmap: [
            { phase: "Market Mapping", details: "Identifying high-affinity spiritual micro-communities." },
            { phase: "Viral Engine", details: "Developing high-frequency, shareable astrological content." },
            { phase: "Scaling PPC", details: "Aggressive performance scaling across TikTok and Meta." },
            { phase: "Ecosystem Sync", details: "Unified data tracking across the web platform and socials." }
        ],
        techStack: ["React", "Custom CRM", "TikTok Ads", "Meta Business", "Hotjar"],
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
        color: "#A855F7",
        links: {
            gmb: "https://share.google/CWgsmkR4kCNVUFVxq",
            website: "https://share.google/CWgsmkR4kCNVUFVxq",
            instagram: "https://www.instagram.com/astrologylight4all"
        },
        stats: [
            { label: "ROAS", value: "8.4x" },
            { label: "Community", value: "100k+" }
        ]
    },
    {
        id: "ksc-tvs",
        title: "Keshav Sales Corp (KSC)",
        clientSummary: "One of the region's largest automotive dealerships, specializing in TVS motorbikes and community service.",
        industry: "Automotive",
        services: ["Web Development", "Social Media", "SEO"],
        description: "Engineering a digital-first sales engine for one of the region's leading TVS dealerships.",
        impact: "Sales Velocity",
        challenge: "Offline-heavy business model lacking a digital lead generation pipeline or online inventory visibility.",
        execution: "Built a robust inventory-focused website, implemented localized SEO strategy, and launched high-frequency social campaigns.",
        strategicInsight: "Vehicle buyers start their journey online but close offline. Our strategy focused on dominating 'local' searches and providing instant inventory transparency to drive showroom visits.",
        roadmap: [
            { phase: "Digital Pivot", details: "Transitioning inventory and lead capture to a unified web portal." },
            { phase: "Local SEO Siege", details: "Dominating regional 'bike dealership' search keywords." },
            { phase: "Social Presence", details: "Daily engagement with the local biking community." },
            { phase: "Lead Routing", details: "Integrating web leads directly into the offline sales team." }
        ],
        techStack: ["Next.js", "Cloudflare", "Local SEO Toolkit", "Meta Ads"],
        image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&w=1200&q=80",
        color: "#FF4D6D",
        links: {
            website: "https://ksc-tvs.github.io/KSC/"
        },
        stats: [
            { label: "Local Rank", value: "#1" },
            { label: "Monthly Leads", value: "450+" }
        ]
    },
    {
        id: "gsp-electricians",
        title: "GSP Electricians",
        clientSummary: "A heritage electrical trade company serving the South Wales region with residential and industrial expertise.",
        industry: "Electrical",
        services: ["Content Creation", "Social Media Management"],
        description: "Modernizing a legacy electrical trade brand in South Wales through brutalist content and social engineering.",
        impact: "Brand Authority",
        challenge: "Highly competitive trade market with outdated brand perception among local residents and zero social presence.",
        execution: "Hyper-focused content clusters showcasing technical expertise, high-frequency social posting, and community-driven storytelling.",
        strategicInsight: "Trust is the metric for success in trades. We showed the faces behind the work and the complexity of their industrial projects to build authority and trust.",
        roadmap: [
            { phase: "Brand Audit", details: "Establishing a new digital voice for the legacy company." },
            { phase: "Content Sprint", details: "Capturing and editing raw job-site footage into authority content." },
            { phase: "Social Launch", details: "Establishing presence on Meta-platforms with local targeting." },
            { phase: "Feedback Loop", details: "Leveraging social proof and client reviews for scaling." }
        ],
        techStack: ["Adobe Premiere", "Meta Business Suite", "CANVA Enterprise"],
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
        color: "#F3E84A",
        links: {
            facebook: "https://www.facebook.com/gspelectricians/",
            instagram: "https://www.instagram.com/gspelectrician/"
        },
        stats: [
            { label: "Reach", value: "15k/mo" },
            { label: "Inquiries", value: "+180%" }
        ]
    },
    {
        id: "atoms-electrical",
        title: "Atoms Electrical",
        clientSummary: "Innovative electrical contractors based in Utrecht, focusing on sustainable energy and modern smart-home solutions.",
        industry: "Electrical",
        services: ["Content Creation", "Social Media Management"],
        description: "Injecting high-energy digital presence into the Utrecht electrical sector with strategic content deployment.",
        impact: "Regional Growth",
        challenge: "New market entry in a highly saturated European city with zero existing digital footprint or brand recognition.",
        execution: "Localized content strategy targeting high-intent industrial sectors, high-fidelity social reels, and targeted awareness campaigns.",
        strategicInsight: "Utrecht's market values innovation. We positioned Atoms as the 'Smart Contractor,' focusing content on tech-forward solutions like EV Charging and Home Automation.",
        roadmap: [
            { phase: "Market Entry Plan", details: "Analyzing local competition and identifying gaps." },
            { phase: "Visual Identity", details: "Creating a high-tech, modern visual language for the brand." },
            { phase: "Sector Targeting", details: "Launching content specifically for B2B industrial clients." },
            { phase: "Network Growth", details: "Building local partnerships through digital community work." }
        ],
        techStack: ["Meta Ads", "LinkedIn Business", "Vimeo", "Squarespace"],
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80",
        color: "#22C55E",
        links: {
            facebook: "https://www.facebook.com/AtomsElectricalCo",
            instagram: "https://www.instagram.com/atomselectrical.co/"
        },
        stats: [
            { label: "Engagement", value: "12%" },
            { label: "Awareness", value: "High" }
        ]
    },
    {
        id: "letters-to-ron",
        title: "Letters to Ron",
        clientSummary: "A curated personal brand and lifestyle narrative platform focused on creative storytelling and visual excellence.",
        industry: "Personal Brand",
        services: ["Content Creation"],
        description: "Crafting a unique narrative identity through high-fidelity visual and written content systems.",
        impact: "Creative Integrity",
        challenge: "Developing a consistent multi-channel voice that resonates with a highly curated audience in a competitive lifestyle space.",
        execution: "Strategic content direction focused on storytelling, technical photography, and high-impact aesthetic standards.",
        strategicInsight: "Consistency is more important than volume. We focused on 'Epic Moments' rather than daily noise to create a sense of premium exclusivity.",
        roadmap: [
            { phase: "Voice Discovery", details: "Defining the unique narrative tone for the brand." },
            { phase: "Visual Engine", details: "Setting up high-end photography and video workflows." },
            { phase: "Portfolio Launch", details: "Executing a 30-day narrative content sprint." },
            { phase: "Audience Sync", details: "Leveraging deep-engagement tools for community growth." }
        ],
        techStack: ["Adobe Suite", "VSCO Enterprise", "Notion", "Unsplash Pro"],
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
        color: "#FFFFFF",
        links: {},
        stats: [
            { label: "Aesthetic", value: "Peak" },
            { label: "Retention", value: "90%" }
        ]
    },
    {
        id: "dinanaths-sons",
        title: "Dinanaths & Sons",
        clientSummary: "A legacy heritage retail and luxury fashion brand with deep roots in traditional craftsmanship now expanding globally.",
        industry: "E-commerce",
        services: ["Web Development", "Social Media", "Performance Marketing", "SEO"],
        description: "Scaling a heritage retail brand into a digital e-commerce powerhouse with multi-channel dominance.",
        impact: "Revenue Surge",
        challenge: "Scaling offline heritage to the online mass-market without losing brand prestige or product exclusivity.",
        execution: "Engineered a luxury-focused e-commerce engine, a precision-targeted ROAS-optimized funnel, and organic SEO dominance for fashion keywords.",
        strategicInsight: "Luxury buyers expect an elite digital experience. We rebuilt their entire web architecture to mimic a concierge service, focusing on high-end visuals and fast load times.",
        roadmap: [
            { phase: "Infrastructure Build", details: "Engineering a custom, luxury e-commerce platform." },
            { phase: "Search Takeover", details: "Dominating high-competition fashion and heritage keywords." },
            { phase: "Performance Scale", details: "Global Meta/Google campaigns targeting high-net-worth individuals." },
            { phase: "Retention Engine", details: "Implementing luxury-grade email and loyalty automated loops." }
        ],
        techStack: ["Shopify Plus", "Klaviyo", "Google Merchant", "GTM Server-Side", "Next.js"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        color: "#A855F7",
        links: {
            website: "https://Dinanathandsons.com",
            gmb: "https://share.google/I7Nh5q6g4BS43fPG1",
            instagram: "https://www.instagram.com/dinanathandsons/"
        },
        stats: [
            { label: "Online Sales", value: "5x" },
            { label: "SEO ROAS", value: "12x" }
        ]
    }
];
