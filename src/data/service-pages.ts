export interface ServicePageFAQ {
    question: string;
    answer: string;
}

export interface ServicePageSection {
    heading: string;
    body: string[];
}

export interface ServicePage {
    slug: string;
    /** Short nav label, e.g. footer links */
    label: string;
    /** <title> without brand (the site template appends "| Tellora Media") */
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    h1: string;
    kicker: string;
    intro: string;
    serviceName: string;
    deliverables: string[];
    sections: ServicePageSection[];
    process: { step: string; detail: string }[];
    faqs: ServicePageFAQ[];
    relatedSlugs: string[];
    relatedPosts: string[];
    accent: string;
}

export const servicePages: ServicePage[] = [
    {
        slug: "seo-services-delhi",
        label: "SEO Services in Delhi",
        metaTitle: "SEO Services in Delhi | SEO Agency India",
        metaDescription:
            "Rank higher on Google with Tellora Media, a Delhi SEO agency. Technical SEO, local SEO, content and link building built to bring qualified leads, not vanity traffic.",
        keywords: ["SEO services Delhi", "SEO agency Delhi", "local SEO Delhi", "technical SEO India", "SEO company in Delhi NCR"],
        h1: "SEO Services in Delhi That Bring Customers, Not Just Clicks",
        kicker: "Organic Growth",
        intro:
            "Tellora Media is a Delhi-based SEO agency that helps businesses get found by people who are ready to buy. We combine technical SEO, local SEO, content strategy and ethical link building into one measurable growth system.",
        serviceName: "Search Engine Optimization (SEO)",
        deliverables: [
            "Full technical SEO audit and fix-list",
            "Keyword and search-intent mapping",
            "On-page optimisation for every key page",
            "Local SEO and Google Business Profile management",
            "Content planning and publishing support",
            "Link building and digital PR",
            "Monthly reporting tied to leads and revenue",
        ],
        sections: [
            {
                heading: "Why SEO matters for businesses in Delhi NCR",
                body: [
                    "Delhi is one of the most competitive local markets in India. Whether you run a clinic in South Delhi, an e-commerce brand shipping across India, or a service business serving Gurugram and Noida, your customers start with a search. If you are not on page one, a competitor is.",
                    "Good SEO compounds. Unlike paid ads that stop the moment the budget stops, the rankings, content and authority we build keep working month after month.",
                ],
            },
            {
                heading: "Technical SEO that removes what is holding you back",
                body: [
                    "We start by crawling your site the way Google does. Slow pages, broken links, duplicate content, missing schema, poor mobile experience and indexing issues are fixed first, because great content cannot rank on a weak foundation.",
                    "You get a clear, prioritised list of fixes, and we can implement them with your developer or on your behalf.",
                ],
            },
            {
                heading: "Local SEO for Delhi businesses",
                body: [
                    "For businesses that serve a specific area, we optimise your Google Business Profile, build consistent listings, collect and respond to reviews, and create location-aware pages so you show up in the map pack and in searches like \"near me\".",
                ],
            },
            {
                heading: "Content and authority that earns rankings",
                body: [
                    "We research what your buyers actually search for and build content that answers it better than anyone else. Then we earn relevant links so search engines trust your site more over time.",
                ],
            },
        ],
        process: [
            { step: "Audit", detail: "We analyse your site, competitors and search demand to find the biggest opportunities." },
            { step: "Strategy", detail: "A keyword and content roadmap prioritised by business impact." },
            { step: "Execute", detail: "Technical fixes, on-page work, content and link building run in monthly sprints." },
            { step: "Measure", detail: "Transparent reports on rankings, traffic, leads and what we do next." },
        ],
        faqs: [
            {
                question: "How long does SEO take to show results?",
                answer: "Most businesses start to see movement in 2 to 3 months, with meaningful traffic and lead growth typically building over 4 to 6 months. Timelines depend on your starting point, competition and how much needs fixing.",
            },
            {
                question: "Do you offer local SEO for businesses in Delhi?",
                answer: "Yes. Local SEO is a core part of what we do, including Google Business Profile optimisation, local citations, review strategy and location-focused content for Delhi, Noida, Gurugram and across India.",
            },
            {
                question: "Can you guarantee the number one position on Google?",
                answer: "No ethical SEO agency can guarantee a specific ranking because Google controls the results. What we commit to is a transparent process, clear reporting and a strategy focused on traffic that converts.",
            },
            {
                question: "How is your SEO different from other agencies?",
                answer: "We tie SEO to business outcomes such as leads, calls and sales rather than just rankings. You get honest reporting, a clear roadmap and a senior team that stays involved.",
            },
        ],
        relatedSlugs: ["performance-marketing-agency-delhi", "web-design-development-delhi", "content-marketing-video-production-delhi"],
        relatedPosts: ["local-seo-for-delhi-businesses", "future-of-seo-ai-search-2026"],
        accent: "#F3E84A",
    },
    {
        slug: "performance-marketing-agency-delhi",
        label: "Performance Marketing",
        metaTitle: "Performance Marketing Agency in Delhi",
        metaDescription:
            "Tellora Media is a performance marketing agency in Delhi. We run Meta Ads and Google Ads focused on ROAS, lower cost per lead and scalable revenue for D2C and local brands.",
        keywords: ["performance marketing agency Delhi", "Meta Ads agency India", "Google Ads management Delhi", "PPC agency India", "D2C ads agency"],
        h1: "Performance Marketing Agency in Delhi Built Around ROAS",
        kicker: "Paid Growth",
        intro:
            "We plan, launch and scale paid campaigns on Meta and Google with one question in mind: what does each rupee of ad spend return? Tellora Media builds the creative, tracking and optimisation systems that make paid growth predictable.",
        serviceName: "Performance Marketing and Paid Advertising",
        deliverables: [
            "Meta (Facebook and Instagram) Ads management",
            "Google Search, Shopping and Performance Max campaigns",
            "Conversion tracking, GA4 and pixel setup",
            "Creative testing and ad copy production",
            "Landing page recommendations for higher conversion",
            "Budget pacing and scaling strategy",
            "Weekly optimisation and clear reporting",
        ],
        sections: [
            {
                heading: "Paid media that is accountable to revenue",
                body: [
                    "Clicks and impressions do not pay the bills. We set targets around cost per lead, cost per acquisition and return on ad spend, then build campaigns, creatives and landing journeys to hit them.",
                ],
            },
            {
                heading: "Meta Ads for D2C and local businesses",
                body: [
                    "We test audiences, hooks and creative formats systematically so winning ads are found quickly and losing spend is cut fast. For local businesses we also run lead-generation campaigns that bring in calls and enquiries.",
                ],
            },
            {
                heading: "Google Ads for high-intent demand",
                body: [
                    "People searching on Google already want what you sell. We structure search, shopping and Performance Max campaigns so your budget goes to the queries most likely to convert.",
                ],
            },
            {
                heading: "Tracking you can trust",
                body: [
                    "Before we scale spend we make sure tracking is accurate across GA4, ad platforms and your CRM, so every decision is based on real data.",
                ],
            },
        ],
        process: [
            { step: "Plan", detail: "Define goals, margins, target CPA and the offer worth promoting." },
            { step: "Launch", detail: "Set up tracking, build campaigns and produce the first creative batch." },
            { step: "Optimise", detail: "Daily monitoring and weekly tests on audiences, creative and bids." },
            { step: "Scale", detail: "Increase budget on proven campaigns while protecting efficiency." },
        ],
        faqs: [
            {
                question: "What is the minimum ad budget you work with?",
                answer: "It depends on your market and goal. We will recommend a realistic starting budget after understanding your product, margins and target customer. Contact us for a free consultation.",
            },
            {
                question: "Do you run both Meta Ads and Google Ads?",
                answer: "Yes. We manage Meta Ads (Facebook and Instagram) and Google Ads including Search, Shopping and Performance Max, and align them so they support each other.",
            },
            {
                question: "How do you report on ad performance?",
                answer: "You receive clear reports covering spend, leads or sales, cost per result and return on ad spend, along with what we are testing next and why.",
            },
            {
                question: "Do you create the ad creatives as well?",
                answer: "Yes. Our in-house team produces ad copy, static creatives and short-form video so strategy and creative stay connected.",
            },
        ],
        relatedSlugs: ["seo-services-delhi", "social-media-marketing-agency-delhi", "web-design-development-delhi"],
        relatedPosts: ["scaling-paid-ads-high-spend", "digital-marketing-cost-india"],
        accent: "#A855F7",
    },
    {
        slug: "social-media-marketing-agency-delhi",
        label: "Social Media Marketing",
        metaTitle: "Social Media Marketing Agency Delhi",
        metaDescription:
            "Grow your brand with Tellora Media, a social media marketing agency in Delhi. Strategy, reels, content calendars and community management that build real audiences.",
        keywords: ["social media marketing agency Delhi", "Instagram marketing agency India", "social media management Delhi", "reels agency Delhi", "influencer marketing India"],
        h1: "Social Media Marketing Agency in Delhi That Builds Real Communities",
        kicker: "Social Growth",
        intro:
            "Followers are not the goal, customers are. Tellora Media helps brands in Delhi and across India turn social platforms into a steady source of attention, trust and sales through strategy-led content, reels and community management.",
        serviceName: "Social Media Marketing and Management",
        deliverables: [
            "Social media strategy and content calendar",
            "Reels, short-form video and static design",
            "Instagram, Facebook, LinkedIn and YouTube management",
            "Community engagement and response handling",
            "Influencer and creator collaboration support",
            "Hashtag, trend and competitor research",
            "Monthly analytics and growth reporting",
        ],
        sections: [
            {
                heading: "Content people actually want to watch",
                body: [
                    "Our team plans, shoots and edits scroll-stopping reels and designs that fit your brand voice. We study what is working in your niche and adapt it, instead of copying trends blindly.",
                ],
            },
            {
                heading: "Strategy before posting",
                body: [
                    "Every account gets a clear positioning, content pillars and a posting rhythm. That way each post has a job: awareness, trust or conversion.",
                ],
            },
            {
                heading: "Community management that builds loyalty",
                body: [
                    "Comments and messages are where customers decide whether to trust you. We handle engagement quickly and in your brand voice, and flag real sales enquiries immediately.",
                ],
            },
            {
                heading: "Social that supports your other channels",
                body: [
                    "Social content feeds your ads, your SEO and your email. We plan it as part of the wider growth system so nothing is created twice.",
                ],
            },
        ],
        process: [
            { step: "Discover", detail: "Understand your brand, audience, competitors and goals." },
            { step: "Plan", detail: "Content pillars, calendar and creative direction." },
            { step: "Create", detail: "Shoot, design, edit and publish on a consistent schedule." },
            { step: "Grow", detail: "Engage, analyse performance and double down on what works." },
        ],
        faqs: [
            {
                question: "Which social media platforms do you manage?",
                answer: "We manage Instagram, Facebook, LinkedIn and YouTube, and recommend the platforms that make sense for your audience instead of spreading you thin.",
            },
            {
                question: "Do you create reels and videos as well as posts?",
                answer: "Yes. Short-form video is a major part of our work, from concept and scripting through shooting and editing.",
            },
            {
                question: "How many posts per month will you create?",
                answer: "That depends on your plan and goals. We agree a content calendar up front so you always know what is going out and when.",
            },
            {
                question: "Can social media marketing help my local Delhi business?",
                answer: "Absolutely. Local businesses use social to build trust, showcase work and generate enquiries. We combine organic content with local targeting where it makes sense.",
            },
        ],
        relatedSlugs: ["content-marketing-video-production-delhi", "performance-marketing-agency-delhi", "seo-services-delhi"],
        relatedPosts: ["content-that-converts-beyond-keywords", "digital-marketing-cost-india"],
        accent: "#FF4D6D",
    },
    {
        slug: "web-design-development-delhi",
        label: "Web Design & Development",
        metaTitle: "Web Design & Development in Delhi",
        metaDescription:
            "Fast, SEO-ready websites built by Tellora Media in Delhi. Custom web design and Next.js development focused on speed, mobile experience and conversions.",
        keywords: ["web design agency Delhi", "website development Delhi", "Next.js development India", "ecommerce website design Delhi", "SEO friendly website"],
        h1: "Website Design and Development in Delhi Built to Rank and Convert",
        kicker: "Web Growth",
        intro:
            "Your website is your hardest-working salesperson. Tellora Media designs and builds fast, mobile-first, SEO-ready websites that look distinctive and are engineered to turn visitors into enquiries and customers.",
        serviceName: "Web Design and Development",
        deliverables: [
            "Custom UI and UX design",
            "Next.js and React development",
            "Mobile-first responsive layouts",
            "On-page SEO and schema markup built in",
            "Core Web Vitals and speed optimisation",
            "Analytics, tracking and conversion setup",
            "E-commerce and lead-generation websites",
        ],
        sections: [
            {
                heading: "Design that matches your brand and your goals",
                body: [
                    "We design around what visitors need to do next: call, book, buy or enquire. Every layout decision supports that journey while staying true to your brand.",
                ],
            },
            {
                heading: "Built for speed and search",
                body: [
                    "A slow site loses visitors and rankings. We build with modern frameworks, optimised images and clean code so your pages load quickly on mobile networks, which is where most Indian traffic comes from.",
                ],
            },
            {
                heading: "SEO foundations from day one",
                body: [
                    "Proper heading structure, metadata, schema markup, sitemaps and clean URLs are built in during development, not bolted on later.",
                ],
            },
            {
                heading: "Tracking and iteration after launch",
                body: [
                    "We set up analytics and conversion tracking so you can see what is working, and we keep improving the site based on real behaviour.",
                ],
            },
        ],
        process: [
            { step: "Brief", detail: "Goals, audience, sitemap and content needs." },
            { step: "Design", detail: "Wireframes and visual design for desktop and mobile." },
            { step: "Build", detail: "Development, SEO setup, testing and speed tuning." },
            { step: "Launch", detail: "Go live, track performance and refine." },
        ],
        faqs: [
            {
                question: "How long does it take to build a website?",
                answer: "A typical business website takes 3 to 6 weeks depending on the number of pages and complexity. We share a clear timeline after the briefing call.",
            },
            {
                question: "Will my new website be SEO friendly?",
                answer: "Yes. We build in clean structure, metadata, schema markup, fast loading and mobile-first design so your site is ready to rank.",
            },
            {
                question: "Do you build e-commerce websites?",
                answer: "Yes, we build online stores and lead-generation sites, with tracking set up so you can measure sales and enquiries.",
            },
            {
                question: "Can you redesign my existing website without losing my rankings?",
                answer: "Yes. We plan redirects, preserve important URLs and content, and monitor performance after launch to protect your existing search visibility.",
            },
        ],
        relatedSlugs: ["seo-services-delhi", "performance-marketing-agency-delhi", "content-marketing-video-production-delhi"],
        relatedPosts: ["3d-web-experiences-landing-pages", "future-of-seo-ai-search-2026"],
        accent: "#4AC0E4",
    },
    {
        slug: "content-marketing-video-production-delhi",
        label: "Content & Video Production",
        metaTitle: "Content & Video Production in Delhi",
        metaDescription:
            "Tellora Media creates content that sells: blogs, brand storytelling, reels and video production in Delhi. Strategy-led content for SEO, social and ads.",
        keywords: ["content marketing agency Delhi", "video production Delhi", "video editing agency India", "brand storytelling", "reel production Delhi"],
        h1: "Content Marketing and Video Production in Delhi That Drives Action",
        kicker: "Content Studio",
        intro:
            "Great content earns attention and trust long before someone is ready to buy. Tellora Media produces written content, reels and brand videos that serve your SEO, social and paid campaigns at the same time.",
        serviceName: "Content Marketing and Video Production",
        deliverables: [
            "Content strategy and editorial calendar",
            "SEO blog articles and landing page copy",
            "Brand films, product videos and reels",
            "Video editing and post-production",
            "Motion graphics and thumbnails",
            "Ad creatives for Meta and Google",
            "Content repurposing across channels",
        ],
        sections: [
            {
                heading: "Content built around buyer questions",
                body: [
                    "We map the questions your customers ask at every stage, then create articles, videos and pages that answer them clearly. This is how content earns both rankings and trust.",
                ],
            },
            {
                heading: "Video production and post-production",
                body: [
                    "From concept and scripting to shooting, editing, colour and sound, our studio team delivers polished video that holds attention, whether it is a 20-second reel or a full brand film.",
                ],
            },
            {
                heading: "One shoot, many assets",
                body: [
                    "We plan shoots so a single day produces reels, ad creatives, website clips and photos, getting more from every rupee spent on production.",
                ],
            },
        ],
        process: [
            { step: "Research", detail: "Audience questions, competitor content and keyword demand." },
            { step: "Plan", detail: "Editorial calendar and creative direction." },
            { step: "Produce", detail: "Write, shoot, edit and design." },
            { step: "Distribute", detail: "Publish, promote and repurpose across channels." },
        ],
        faqs: [
            {
                question: "Do you provide both written content and video?",
                answer: "Yes. Our team handles SEO writing, brand copy, short-form video, brand films and post-production under one roof.",
            },
            {
                question: "Can you work with footage we already have?",
                answer: "Yes. We can edit, colour grade and repurpose your existing footage into reels, ads and website videos.",
            },
            {
                question: "How does content marketing help SEO?",
                answer: "Helpful, well-structured content targets the searches your customers make, earns links and keeps visitors engaged, all of which support stronger search rankings.",
            },
            {
                question: "Do you shoot in Delhi NCR?",
                answer: "Yes. We shoot in Delhi NCR and can plan shoots elsewhere in India depending on the project.",
            },
        ],
        relatedSlugs: ["social-media-marketing-agency-delhi", "seo-services-delhi", "performance-marketing-agency-delhi"],
        relatedPosts: ["content-that-converts-beyond-keywords", "future-of-seo-ai-search-2026"],
        accent: "#22C55E",
    },
];

export function getServicePage(slug: string): ServicePage | undefined {
    return servicePages.find((s) => s.slug === slug);
}
