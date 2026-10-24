/**
 * Copy and data for the US / international landing pages.
 * Claims here are logged with their basis in CLAIMS_LOG.md. Anything marked TODO needs real data.
 */

export interface UsFaq {
    question: string;
    answer: string;
}

export const US_HERO = {
    h1: "Digital marketing that scales US home service businesses",
    // Capability statement, not a results promise (see CLAIMS_LOG.md #3)
    subhead:
        "We help US electrical contractors, HVAC companies, and home service brands build systems to generate 20+ qualified leads per month through SEO, Google Ads, and local search.",
    primaryCta: "Book a free 20-min audit",
    secondaryCta: "See the Atoms Electrical case study",
    caseStudyHref: "/case-studies/atoms-electrical/",
};

export const GOOGLE_RATING = {
    text: "5.0 ⭐ on Google — 10+ verified reviews",
    url: "https://share.google/WH6zRtrhnXEJ9R11a",
};

/** Trust-bar logos. `src` only where the file is clearly identified. TODO: add logo files for the rest. */
export const US_TRUST_LOGOS: { name: string; src?: string }[] = [
    { name: "Atoms Electrical Co.", src: "/clients/clientlogo (9).png" }, // TODO: confirm logo file mapping
    { name: "US D2C Footwear Brand" }, // anonymised; TODO: permission to name + logo
    { name: "Goodlife Diagnostics" }, // TODO: logo file
    { name: "Air Right" }, // TODO: logo file
    { name: "ALFA" }, // TODO: confirm logo file mapping
];

export const WHY_TELLORA = [
    {
        title: "US business hours by appointment",
        body: "Book a call at a time that suits your team. We schedule around US business hours, by appointment.",
    },
    {
        title: "Founder-led strategy on every account",
        body: "Abhay Sehdev and Prakhar Saxena personally own strategy for every client account.",
    },
    {
        title: "Typically priced 40–60% below comparable US agencies",
        body: "Delhi-based operations let us offer full-service marketing at a lower cost base.",
    },
];

export const US_SERVICES = [
    {
        title: "Local SEO for home service businesses",
        body: "Rank for the searches your customers make in your service area, from emergency calls to planned upgrades.",
    },
    {
        title: "Google Ads & LSAs for lead generation",
        body: "Search campaigns and Google Local Services Ads set up and managed around cost per lead.",
    },
    {
        title: "Website conversion optimization",
        body: "Faster, clearer websites that turn visitors into calls and booked jobs.",
    },
    {
        title: "Google Business Profile management",
        body: "Complete, active profiles that help you show up in the map pack and on mobile.",
    },
    {
        title: "Reputation & review management",
        body: "A steady process for earning and responding to reviews, the signal local customers trust most.",
    },
];

/** Mini case cards. TODO: US footwear brand facts + permission; confirm Goodlife details are accurate. */
export const US_MINI_CASES: {
    title: string;
    market: string;
    summary: string;
    href?: string;
}[] = [
    {
        title: "Atoms Electrical Co.",
        market: "Eureka, Missouri, USA",
        summary: "Website design and development, SEO, social media marketing and performance marketing for a local electrical contractor.",
        href: "/case-studies/atoms-electrical/",
    },
    {
        title: "US-based D2C footwear brand",
        market: "United States",
        summary: "E-commerce brand supported by Tellora Media. Case study details coming soon.", // TODO: scope + permission
    },
    {
        title: "Goodlife Diagnostics",
        market: "India",
        summary: "A transferable example of how we build local visibility and enquiries for a service business.", // TODO: confirm against real engagement
        href: "/case-studies/goodlife-diagnostics/",
    },
];

export const US_FAQS: UsFaq[] = [
    {
        question: "How does working with an India-based agency work day-to-day?",
        answer:
            "You get a named point of contact, a shared plan and regular updates. We schedule calls by appointment during US business hours, and day-to-day work runs asynchronously so progress does not wait on time zones. TODO: confirm tools and weekly rhythm (Slack, email, Loom, etc.).",
    },
    {
        question: "What time zones do you cover? How do we communicate?",
        answer:
            "Our team is based in Delhi (IST). We offer US business hours by appointment for calls, and communicate by email and chat in between. TODO: confirm communication channels.",
    },
    {
        question: "How do you handle US-specific marketing like Google LSAs?",
        answer:
            "Google Local Services Ads, Google Business Profile and local search are part of our home-service playbook. We handle campaign setup and ongoing management with a focus on lead quality and cost per lead. TODO: confirm LSA verification/background-check support wording.",
    },
    {
        question: "What are your reporting cadences?",
        answer:
            "TODO: confirm reporting cadence (for example weekly snapshots and a monthly performance review) before publishing.",
    },
    {
        question: "Who owns the ad accounts, website, and data?",
        answer: "You do. You own your ad accounts, website, creative, and all data from day one.",
    },
    {
        question: "What's the typical engagement length and pricing model?",
        answer:
            "TODO: confirm engagement terms and pricing model (monthly retainer, minimum term, setup fees). Book a free audit and we will recommend a scope and quote for your business.",
    },
];

export const OWNERSHIP_NOTE = "You own your ad accounts, website, creative, and all data from day one.";

/** Electrical contractors page */
export const ELECTRICAL = {
    h1: "SEO & Google Ads built for US electrical contractors",
    services: [
        { title: "Local SEO", body: "Rank in your service area for the electrical searches homeowners and businesses make." },
        { title: "Google LSA setup & management", body: "Local Services Ads configured and managed around lead quality." },
        { title: "Google Business Profile optimization", body: "Complete, active listings that win visibility on maps and mobile." },
        { title: "Service-area pages", body: "Dedicated pages for each city and service you want to be found for." },
        { title: "Review generation", body: "A simple system for turning finished jobs into reviews." },
        { title: "Website conversion", body: "Clear calls to action and fast pages that turn visits into calls." },
    ],
    leadMagnet: {
        title: "Free local SEO audit for electricians",
        body: "Tell us about your business and we will review your local search presence and send back what we find.",
    },
};
