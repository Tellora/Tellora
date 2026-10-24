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
    /** Optional rich-detail fields (used by flagship / international case studies) */
    location?: string;
    owner?: string;
    scope?: { service: string; detail: string }[];
    timeline?: { period: string; milestone: string }[];
    results?: { label: string; note: string }[];
    testimonial?: { quote: string; author: string; role: string };
    seoTitle?: string;
    seoDescription?: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: "goodlife-diagnostics",
        title: "Goodlife Diagnostics",
        clientSummary: "A leading modern diagnostic center and pathology laboratory in Ramnagar offering comprehensive clinical testing, blood diagnostics, and preventive health packages.",
        industry: "Healthcare",
        services: ["Digital Marketing", "Local SEO", "Content Creation", "Performance Marketing"],
        description: "Driving patient acquisition and local healthcare authority for Ramnagar's trusted diagnostic center and pathology laboratory.",
        impact: "Patient Surge",
        challenge: "Limited local digital visibility and heavy reliance on traditional doctor referrals in Ramnagar, leading to underutilized diagnostic equipment and low direct walk-in volume.",
        execution: "Executed hyper-local SEO ranking Goodlife #1 on Google Maps in Ramnagar, created engaging healthcare reels explaining test procedures, and launched targeted Meta Ads for preventive wellness packages.",
        strategicInsight: "Patients seek rapid report turnaround, hygiene, and local trust. By positioning Goodlife as Ramnagar's highest-tech diagnostic lab with seamless home sample collection, patient bookings accelerated rapidly.",
        roadmap: [
            { phase: "Local SEO Dominance", details: "Optimizing Google Business Profile and local keywords for Ramnagar and neighboring areas." },
            { phase: "Health Awareness Campaigns", details: "Producing educational video content on seasonal health risks and preventive checkups." },
            { phase: "Home Collection Funnels", details: "Deploying high-converting WhatsApp and call lead generation campaigns." },
            { phase: "Patient Retention System", details: "Implementing automated test reminder loops and 5-star Google review collection." }
        ],
        techStack: ["Local SEO Suite", "Meta Ads Manager", "Google Ads", "WhatsApp Business", "Canva Enterprise"],
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        color: "#06B6D4",
        links: {
            gmb: "https://maps.google.com/?q=Goodlife+Diagnostics+Ramnagar"
        },
        stats: [
            { label: "Patient Leads", value: "+185%" },
            { label: "Local Rank", value: "#1" }
        ]
    },
    {
        id: "air-right",
        title: "Air Right",
        clientSummary: "An innovative air purification and clean air technology brand delivering advanced multi-stage HEPA filtration solutions for residential and commercial environments.",
        industry: "CleanTech",
        services: ["Digital Marketing", "Performance Marketing", "Content Creation", "E-commerce Growth"],
        description: "Scaling customer acquisition, brand reach, and e-commerce conversions for a premium air purification brand.",
        impact: "Clean Air Scale",
        challenge: "High customer acquisition costs (CAC) and saturated direct-to-consumer market competing with legacy consumer appliance giants.",
        execution: "Engineered high-ROAS Meta and Google performance funnels triggered by real-time regional AQI spikes, paired with 3D product animation reels showcasing filtration superiority.",
        strategicInsight: "Air purifier purchases are intensely weather and AQI-driven. Dynamic ad creative that updated messaging based on live air pollution indices unlocked 3.8x ROAS and massive buyer urgency.",
        roadmap: [
            { phase: "Data & AQI Triggers", details: "Setting up automated ad rules linked to real-time pollution indices in metropolitan hubs." },
            { phase: "Visual Storytelling", details: "Developing cinematic product demonstration reels highlighting CADR and HEPA tech." },
            { phase: "Search & Shopping Takeover", details: "Scaling Google Shopping and high-intent commercial intent keywords." },
            { phase: "Filter Replacement Engine", details: "Building automated subscription and replenishment email/SMS sequences." }
        ],
        techStack: ["Shopify Plus", "Meta Ads", "Google Ads", "Klaviyo", "Adobe Premiere Pro"],
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80",
        color: "#3B82F6",
        links: {},
        stats: [
            { label: "ROAS", value: "3.8x" },
            { label: "Revenue Surge", value: "+210%" }
        ]
    },
    {
        id: "ella-creations",
        title: "Ella Creations",
        clientSummary: "An exquisite online artificial jewelry brand blending traditional artisanal craftsmanship with contemporary fashion aesthetics for the modern trendsetter.",
        industry: "Fashion & Jewelry",
        services: ["Digital Marketing", "Performance Marketing", "Social Media Management", "Influencer Marketing"],
        description: "Architecting a viral social growth engine and high-converting performance marketing funnels for an online artificial jewelry brand.",
        impact: "D2C Explosion",
        challenge: "Fierce online competition in fashion accessories with high cart abandonment and difficulty scaling ad spend profitably beyond break-even.",
        execution: "Revamped visual brand aesthetics with luxury lookbook photography, launched high-tempo Instagram Reels styling guides, partnered with 30+ fashion micro-influencers, and deployed Meta Advantage+ shopping funnels.",
        strategicInsight: "Jewelry is an emotional impulse purchase driven by visual desire. Elevating product presentation with studio editorial lighting and unboxing experiences reduced CAC by 42% and delivered 4.2x ROAS.",
        roadmap: [
            { phase: "Visual Rebranding", details: "Overhauling aesthetic standards with high-definition styling reels and curated lookbooks." },
            { phase: "Influencer Seeding", details: "Orchestrating micro-influencer gifting sprints yielding 50+ user-generated styling videos." },
            { phase: "Performance Scale", details: "Scaling Meta Advantage+ Catalog ads and seasonal festive collection drops." },
            { phase: "Repeat Purchase Loop", details: "Deploying VIP customer loyalty clubs and WhatsApp early-access drops." }
        ],
        techStack: ["Shopify", "Meta Ads", "Instagram Shopping", "Klaviyo", "Canva Enterprise"],
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
        color: "#EC4899",
        links: {
            instagram: "https://www.instagram.com/ellacreations"
        },
        stats: [
            { label: "ROAS", value: "4.2x" },
            { label: "D2C Orders", value: "+280%" }
        ]
    },
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
        clientSummary: "A digital spiritual platform providing subscription-based astrology insights, community, and personalized Vedic guidance.",
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
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
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
        clientSummary: "One of the region's premier TVS two-wheeler dealerships, specializing in authorized motorcycle sales, service, and spare parts.",
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
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
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
        title: "Atoms Electrical Co.",
        clientSummary: "Atoms Electrical Co. is an electrical contractor in Eureka, Missouri, USA, owned by Adam Holes. The company offers electrical services, lighting and fixtures, and power and renewable energy solutions.",
        industry: "Electrical",
        services: ["Website Design & Development", "SEO", "Social Media Marketing", "Performance Marketing"],
        description: "A US electrical contractor in Eureka, MO, supported across website design and development, SEO, social media and performance marketing.",
        impact: "Web + SEO + Social + Ads",
        // TODO: client's starting situation / challenge (brief from Adam Holes)
        challenge: "Detailed challenge write-up coming soon. Atoms Electrical Co. is a local electrical contractor in Eureka, Missouri that needed a stronger online presence to be found and chosen by homeowners and businesses in its service area.",
        // TODO: confirm specifics of each workstream before publishing
        execution: "Tellora Media supports Atoms Electrical Co. across four connected workstreams: website design and development, search engine optimization, social media marketing on Facebook and Instagram (posts and reels), and performance marketing.",
        // TODO: confirm strategic insight with client / team
        strategicInsight: "Local service businesses win when their website, search presence, social proof and paid campaigns all tell the same story to the same nearby customer.",
        roadmap: [
            { phase: "Website design & development", details: "The company website at atomselectrical.com." },
            { phase: "SEO", details: "Search optimization to help local customers find the business." },
            { phase: "Social media marketing", details: "Facebook and Instagram posts and reels showcasing the work." },
            { phase: "Performance marketing", details: "Paid campaigns to generate enquiries." }
        ],
        techStack: ["Website", "SEO", "Facebook", "Instagram", "Paid Ads"],
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80",
        color: "#22C55E",
        links: {
            website: "https://atomselectrical.com",
            facebook: "https://www.facebook.com/AtomsElectricalCo/"
        },
        // TODO: real before/after metrics (traffic, leads, revenue) and permission to publish numbers
        stats: [],
        location: "Eureka, Missouri, USA",
        owner: "Adam Holes",
        scope: [
            { service: "Website Design & Development", detail: "Design and build of the company website, atomselectrical.com." },
            { service: "SEO", detail: "Search engine optimization for local visibility." },
            { service: "Social Media Marketing", detail: "Facebook and Instagram posts and reels." },
            { service: "Performance Marketing", detail: "Paid advertising campaigns." }
        ],
        // TODO: engagement start date and current duration; replace with real 90-day / 6-month / 12-month milestones
        timeline: [
            { period: "First 90 days", milestone: "Milestones to be added." },
            { period: "6 months", milestone: "Milestones to be added." },
            { period: "12 months", milestone: "Milestones to be added." }
        ],
        // TODO: real traffic / leads / revenue data (and permission to publish) to replace these placeholders
        results: [
            { label: "Organic traffic", note: "Before / after data coming soon" },
            { label: "Qualified leads", note: "Before / after data coming soon" },
            { label: "Revenue impact", note: "Shared with client permission" }
        ],
        // TODO: testimonial quote from Adam Holes (do not publish until real and approved)
        testimonial: undefined,
        // TODO: confirm wording once results are approved
        seoTitle: "Atoms Electrical Case Study | Web, SEO & Ads",
        seoDescription: "How Tellora Media supports Atoms Electrical Co., an Eureka, MO electrical contractor, with website design, SEO, social media marketing and performance marketing."
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
