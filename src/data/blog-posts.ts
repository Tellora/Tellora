export interface StaticBlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    /** ISO date (YYYY-MM-DD) */
    date: string;
    readTime: string;
    image: string;
    seoTitle: string;
    seoDescription: string;
    /** Related service landing page slug */
    serviceSlug: string;
    /** Trusted HTML authored in this repo */
    content: string;
    /**
     * Draft posts get a page (noindex) but are NOT listed on /blog, in the sitemap, or in related-post lists.
     * Remove `draft` once the body is written and approved.
     */
    draft?: boolean;
}

export const US_MARKET_CATEGORY = "US Market Insights";

export function formatPostDate(iso: string): string {
    const d = new Date(`${iso}T00:00:00Z`);
    return d.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric", timeZone: "UTC" });
}

export const staticBlogPosts: StaticBlogPost[] = [
    {
        slug: "future-of-seo-ai-search-2026",
        title: "The Future of SEO: AI-Driven Search Optimization in 2026",
        excerpt: "Discover how large language models are fundamentally changing the search landscape and how to stay ahead of the curve.",
        category: "SEO Strategy",
        date: "2026-03-15",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        seoTitle: "Future of SEO: AI Search in 2026",
        seoDescription: "How AI search and large language models are changing SEO in 2026, and the practical steps businesses can take to keep ranking and getting found.",
        serviceSlug: "seo-services-delhi",
        content: `
<p>Search is changing faster than at any point in the last decade. AI-generated answers now appear above traditional results, and people increasingly ask full questions instead of typing short keywords. For businesses that depend on organic traffic, the question is simple: what still works?</p>
<h2>What is actually changing</h2>
<p>Search engines are using large language models to summarise answers directly on the results page. That means fewer clicks for simple, factual queries, and more value for pages that offer depth, original insight, or a clear next step. Searches are also getting longer and more conversational, closer to how people speak.</p>
<h2>Focus on intent, not just keywords</h2>
<p>Matching a keyword is no longer enough. For every page, ask what the searcher is really trying to do. Are they comparing options, looking for a price, or ready to book? Pages that satisfy the full intent, including the follow-up questions, are the ones that get cited and clicked.</p>
<h2>Build real expertise and trust</h2>
<p>Search systems reward content that shows first-hand experience and credibility. Name your authors, show real case studies, include original data or examples from your own work, and keep your business details consistent everywhere. Generic, mass-produced content is exactly what AI summaries replace.</p>
<h2>Structure your content so it is easy to understand</h2>
<ul>
<li>Use clear headings that match the questions people ask.</li>
<li>Answer the question directly in the first lines, then add depth.</li>
<li>Add FAQ sections and structured data (schema) where it fits.</li>
<li>Keep pages fast and usable on mobile.</li>
</ul>
<h2>Do not neglect the technical basics</h2>
<p>Crawlability, indexing, page speed and clean site architecture remain the foundation. If search engines cannot reliably read and understand your pages, nothing else matters. A regular technical audit catches problems before they cost you traffic.</p>
<h2>Where local businesses should start</h2>
<p>If you serve customers in a specific area, your Google Business Profile, reviews and location pages matter more than ever, because AI answers often pull from them. Our guide to <a href="/blog/local-seo-for-delhi-businesses/">local SEO for Delhi businesses</a> walks through the essentials.</p>
<h2>The takeaway</h2>
<p>SEO is not dead, it is maturing. The winners will be brands that publish genuinely useful content, prove their expertise and keep their site technically healthy. If you want a clear view of where your site stands, try our <a href="/seo-checker/">free SEO audit tool</a> or talk to our <a href="/services/seo-services-delhi/">SEO team in Delhi</a>.</p>
`,
    },
    {
        slug: "scaling-paid-ads-high-spend",
        title: "Scaling Paid Ads: Why Most Agencies Fail at High Spend",
        excerpt: "Learn the scientific approach to scaling Meta and Google campaigns without breaking your target CPA benchmarks.",
        category: "Paid Performance",
        date: "2026-03-10",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        seoTitle: "Scale Meta & Google Ads Without Losing ROAS",
        seoDescription: "Why campaigns that work at low budgets fall apart when scaled, and a practical framework for scaling Meta and Google Ads while protecting CPA and ROAS.",
        serviceSlug: "performance-marketing-agency-delhi",
        content: `
<p>Many campaigns look great at small budgets and collapse the moment spend increases. Cost per acquisition climbs, returns drop, and the brand concludes that paid ads "stopped working". Usually the problem is not the channel, it is how the scaling was done.</p>
<h2>Why performance drops when you scale</h2>
<p>At low spend, ad platforms show your ads to the most responsive slice of your audience. As you increase budget, the platform has to reach further into less-qualified audiences. Creative also fatigues faster when more people see it more often. Without fresh creative and sound structure, efficiency falls.</p>
<h2>Fix tracking before you add budget</h2>
<p>Scaling on bad data multiplies waste. Confirm that purchases or leads are tracked accurately across your ad platforms, analytics and CRM. If numbers do not reconcile, solve that first.</p>
<h2>Scale in steps, not leaps</h2>
<p>Large overnight budget jumps can reset the platform's learning and destabilise results. A steadier approach is to increase budgets in controlled increments on campaigns that are already meeting target CPA, and to wait long enough between changes to read the effect.</p>
<h2>Creative is the main growth lever</h2>
<p>On Meta in particular, creative drives results. Build a pipeline: new hooks, formats, offers and angles tested every week. Keep the winners running and retire what fatigues. Teams that treat creative as an ongoing system scale further than teams that rely on one hero ad.</p>
<h2>Protect profit with the right metrics</h2>
<ul>
<li>Track blended return across channels, not just platform-reported ROAS.</li>
<li>Know your break-even CPA based on margin and repeat purchase value.</li>
<li>Watch frequency, click-through rate and cost per result for early warning signs.</li>
</ul>
<h2>Do not ignore the landing page</h2>
<p>If your landing experience converts poorly, every extra rupee of spend is less efficient. Improving page speed, clarity of offer and mobile experience often raises returns more than adjusting bids.</p>
<h2>Work with a team that is accountable to outcomes</h2>
<p>Our <a href="/services/performance-marketing-agency-delhi/">performance marketing team in Delhi</a> plans scaling around your margins and targets, with transparent reporting at every stage. See how that approach played out in our <a href="/case-studies/">case studies</a>, or read <a href="/blog/digital-marketing-cost-india/">what digital marketing costs in India</a> to plan your budget.</p>
`,
    },
    {
        slug: "3d-web-experiences-landing-pages",
        title: "3D Web Experiences: The New Standard for Landing Pages",
        excerpt: "Why static websites are becoming obsolete and how Three.js is driving conversion increases across high-tech industries.",
        category: "Web Design",
        date: "2026-03-05",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
        seoTitle: "3D Landing Pages: Do They Convert?",
        seoDescription: "When 3D and interactive web experiences help landing pages convert, when they hurt SEO and speed, and how to use them responsibly.",
        serviceSlug: "web-design-development-delhi",
        content: `
<p>Interactive and 3D elements can make a landing page memorable. Used well, they explain products, hold attention and set a brand apart. Used badly, they slow the page, frustrate mobile users and hurt search visibility. Here is how to get the benefit without the cost.</p>
<h2>Where 3D genuinely helps</h2>
<ul>
<li><strong>Product explanation:</strong> rotating or configurable models make complex products easier to understand.</li>
<li><strong>Brand storytelling:</strong> motion and depth can communicate personality that static images cannot.</li>
<li><strong>Engagement:</strong> scroll-linked animation can guide visitors through a story step by step.</li>
</ul>
<h2>Where it backfires</h2>
<p>Heavy scripts and large assets increase load time, and most Indian traffic arrives on mobile networks. Slow pages lose visitors and can score poorly on Core Web Vitals. Motion that blocks content or ignores users who prefer reduced motion creates accessibility problems.</p>
<h2>Protect SEO and speed</h2>
<ul>
<li>Keep important text and headings in real HTML so search engines can read them.</li>
<li>Lazy-load heavy 3D scenes below the fold and compress assets.</li>
<li>Offer a lightweight fallback for low-power devices.</li>
<li>Respect the reduced-motion setting.</li>
</ul>
<h2>Design for the conversion goal</h2>
<p>A beautiful animation is not a goal. Every interactive element should either clarify the offer or move the visitor toward the call to action. Test with and without the effect, and keep what improves enquiries or sales.</p>
<h2>Build it right from the start</h2>
<p>Our <a href="/services/web-design-development-delhi/">web design and development team</a> builds fast, mobile-first sites with interactive elements that support SEO and conversions. Pair it with technical optimisation from our <a href="/services/seo-services-delhi/">SEO services</a> so the site performs as well as it looks.</p>
`,
    },
    {
        slug: "content-that-converts-beyond-keywords",
        title: "Content That Converts: Beyond The SEO Keyword",
        excerpt: "Stop writing for bots and start architecting content that addresses actual buyer friction points in the decision cycle.",
        category: "Content Strategy",
        date: "2026-03-01",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
        seoTitle: "Content That Converts Beyond Keywords",
        seoDescription: "How to create content that ranks and also persuades. A practical guide to mapping buyer questions, writing for decisions and measuring content by leads.",
        serviceSlug: "content-marketing-video-production-delhi",
        content: `
<p>Ranking for a keyword is only half the job. If the visitor lands on your page and leaves without taking a step, the traffic did nothing for the business. Content that converts is written for the person making a decision, not just for the search engine.</p>
<h2>Start with buyer questions</h2>
<p>List the questions customers ask before they buy: What does it cost? How long does it take? Will it work for my situation? What if it goes wrong? Your sales calls, emails and reviews are full of them. Each question is a content opportunity and a chance to remove friction.</p>
<h2>Map content to the decision journey</h2>
<ul>
<li><strong>Awareness:</strong> educational articles and short videos that help people understand the problem.</li>
<li><strong>Consideration:</strong> comparisons, guides and case studies that show how you solve it.</li>
<li><strong>Decision:</strong> pricing explanations, FAQs, testimonials and clear calls to action.</li>
</ul>
<h2>Write so it is easy to act on</h2>
<p>Lead with the answer. Use short paragraphs, clear subheadings and plain language. Show proof such as real results, named clients and specifics instead of vague claims. End each piece with one clear next step.</p>
<h2>Use formats your audience prefers</h2>
<p>Some questions are best answered in an article, others in a short reel or a walkthrough video. Repurpose one idea across your blog, social channels and ads so each piece works harder.</p>
<h2>Measure content by outcomes</h2>
<p>Traffic is a starting point. Track the enquiries, calls, sign-ups and sales that content influences, and refresh pages that get visits but no action. See the real-world results in our <a href="/case-studies/">case studies</a>.</p>
<h2>Get help building a content engine</h2>
<p>Our <a href="/services/content-marketing-video-production-delhi/">content and video team</a> plans and produces content tied to business goals, and our <a href="/services/social-media-marketing-agency-delhi/">social media team</a> helps it reach the right people.</p>
`,
    },
    {
        slug: "local-seo-for-delhi-businesses",
        title: "Local SEO for Delhi Businesses: Guide",
        excerpt: "How to show up in Google Maps and local searches across Delhi NCR, with the exact steps to optimise your profile, listings and reviews.",
        category: "Local SEO",
        date: "2026-10-10",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?auto=format&fit=crop&w=800&q=80",
        seoTitle: "Local SEO for Delhi Businesses: Guide",
        seoDescription: "A step-by-step local SEO guide for Delhi businesses: Google Business Profile, reviews, citations and location pages to rank in Google Maps and local search.",
        serviceSlug: "seo-services-delhi",
        content: `
<p>When someone in Delhi searches for a clinic, a salon, a tutor or a service provider "near me", Google shows a map with a handful of businesses. Being in that group brings calls, walk-ins and bookings. Here is how to earn your place.</p>
<h2>1. Claim and complete your Google Business Profile</h2>
<p>This is the single most important local SEO asset. Choose the right primary category, add all relevant secondary categories, write a clear description, list your services, add your hours and keep them updated, and upload real photos regularly. Make sure the business name, address and phone number are accurate.</p>
<h2>2. Keep your name, address and phone consistent</h2>
<p>Search engines compare your details across the web. Use the exact same business name, address format and phone number on your website, social profiles and every directory listing. Fix inconsistencies, and remove duplicate listings.</p>
<h2>3. Earn and respond to reviews</h2>
<p>Reviews influence both rankings and whether people choose you. Ask happy customers for reviews at the right moment, make it easy with a direct link, and reply to every review politely, including critical ones.</p>
<h2>4. Create location-aware pages</h2>
<p>If you serve multiple areas such as South Delhi, Dwarka, Noida or Gurugram, create genuinely useful pages for each, with local details, real examples and clear contact information. Avoid copying the same text and swapping the place name.</p>
<h2>5. Get listed in relevant directories</h2>
<p>Add your business to reputable general and industry directories relevant to India. Accuracy matters more than quantity.</p>
<h2>6. Make your website local-friendly</h2>
<ul>
<li>Put your address, phone and a map on your contact page.</li>
<li>Add local business structured data.</li>
<li>Make sure the site loads fast on mobile.</li>
<li>Show local case studies and testimonials.</li>
</ul>
<h2>7. Track what matters</h2>
<p>Watch calls, direction requests, website clicks and bookings from your profile, not just rankings. Use that data to decide where to invest next.</p>
<h2>Want it done for you?</h2>
<p>Tellora Media is a Delhi-based agency. Our <a href="/services/seo-services-delhi/">local SEO services</a> cover profile optimisation, reviews, citations and content. You can also start with our <a href="/seo-checker/">free SEO audit</a> or <a href="/contact/">contact us</a> for a consultation.</p>
`,
    },
    {
        slug: "digital-marketing-cost-india",
        title: "How Much Does Digital Marketing Cost in India?",
        excerpt: "A realistic breakdown of what businesses pay for SEO, paid ads, social media and web design in India, and how to set a budget that makes sense.",
        category: "Marketing Strategy",
        date: "2026-10-14",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        seoTitle: "How Much Does Digital Marketing Cost in India?",
        seoDescription: "What drives digital marketing costs in India for SEO, ads, social media and web design, plus how to plan a budget that matches your goals.",
        serviceSlug: "performance-marketing-agency-delhi",
        content: `
<p>"How much should I spend on digital marketing?" is the first question most business owners ask, and the honest answer is that it depends. Prices vary widely between agencies and freelancers because the scope, goals and competition differ so much. This guide explains what drives cost so you can plan with confidence.</p>
<h2>What affects the price</h2>
<ul>
<li><strong>Your goals:</strong> brand awareness, leads and online sales need different effort.</li>
<li><strong>Competition:</strong> crowded markets need more investment to stand out.</li>
<li><strong>Scope:</strong> one channel is cheaper than a full growth system.</li>
<li><strong>Content and creative needs:</strong> video and design add production cost.</li>
<li><strong>Starting point:</strong> a site with technical problems needs fixing before growth.</li>
</ul>
<h2>Typical cost components</h2>
<p><strong>SEO</strong> is usually a monthly retainer covering audits, content, and link building. Results build over months, so it is best seen as a long-term investment.</p>
<p><strong>Paid ads</strong> have two costs: the ad spend paid to the platform, and the management fee. Never judge an agency only by its fee, judge it by what the ad spend returns.</p>
<p><strong>Social media management</strong> depends on how many platforms, how many posts and how much video you need.</p>
<p><strong>Web design and development</strong> is usually a one-off project cost that depends on the number of pages, features and custom design.</p>
<h2>How to set a sensible budget</h2>
<ol>
<li>Work out what a new customer is worth to you and your margin.</li>
<li>Decide how many customers you need and what you can afford to pay to get one.</li>
<li>Start with the channel closest to buying intent, often search or Meta lead campaigns.</li>
<li>Reinvest as results prove out.</li>
</ol>
<h2>Red flags to avoid</h2>
<ul>
<li>Guaranteed number one rankings.</li>
<li>Prices far below the market with no clear scope.</li>
<li>No reporting, or reports that show only vanity metrics.</li>
<li>Long lock-in contracts with no accountability.</li>
</ul>
<h2>Get a quote that fits your goals</h2>
<p>Every business is different, so we scope each project individually. <a href="/contact/">Contact Tellora Media</a> for a free consultation, explore our <a href="/services/">services</a>, or see how we delivered results in our <a href="/case-studies/">case studies</a>.</p>
`,
    },
    // ── US Market Insights (DRAFTS: scaffolds only; bodies are TODO and must be written before publishing) ──
    {
        slug: "us-electrical-contractors-local-seo-2026",
        title: "How US electrical contractors can win local SEO in 2026",
        excerpt: "A practical look at what helps electrical contractors show up when homeowners search for help nearby.",
        category: US_MARKET_CATEGORY,
        date: "2026-10-26",
        readTime: "TODO min read",
        image: "/og-us.png", // TODO: designed cover image
        seoTitle: "Local SEO for US Electrical Contractors in 2026",
        seoDescription: "How US electrical contractors can improve local search visibility in 2026: Google Business Profile, service-area pages, reviews and more.",
        serviceSlug: "seo-services-delhi",
        draft: true,
        content: `
<p>TODO: 1-2 line intro. What problem do electrical contractors face getting found locally?</p>
<h2>What do homeowners actually search for?</h2>
<p>TODO: write body.</p>
<h2>Why does your Google Business Profile matter most?</h2>
<p>TODO: write body.</p>
<h2>How should service-area pages be structured?</h2>
<p>TODO: write body.</p>
<h2>How do reviews affect local rankings?</h2>
<p>TODO: write body.</p>
<h2>What should you fix on your website first?</h2>
<p>TODO: write body.</p>
`,
    },
    {
        slug: "google-lsas-vs-google-ads-home-services",
        title: "Google LSAs vs. Google Ads for home service businesses",
        excerpt: "What is the difference between Local Services Ads and Google Ads, and which fits a home service business?",
        category: US_MARKET_CATEGORY,
        date: "2026-10-26",
        readTime: "TODO min read",
        image: "/og-us.png", // TODO: designed cover image
        seoTitle: "Google LSAs vs Google Ads for Home Services",
        seoDescription: "Google Local Services Ads vs Google Ads for home service businesses: how each works, how they are priced, and how to choose.",
        serviceSlug: "performance-marketing-agency-delhi",
        draft: true,
        content: `
<p>TODO: 1-2 line intro. Why do home service owners get confused between the two?</p>
<h2>How do Local Services Ads work?</h2>
<p>TODO: write body (verify against current Google documentation before publishing).</p>
<h2>How do standard Google Ads campaigns work?</h2>
<p>TODO: write body.</p>
<h2>How does pricing differ?</h2>
<p>TODO: write body (no figures without a source).</p>
<h2>Which should you start with?</h2>
<p>TODO: write body.</p>
<h2>Can you run both together?</h2>
<p>TODO: write body.</p>
`,
    },
    {
        slug: "why-us-small-businesses-hire-indian-marketing-agencies",
        title: "Why US small businesses are hiring Indian marketing agencies (and what to look for)",
        excerpt: "What should a US small business consider before hiring a marketing agency based in India?",
        category: US_MARKET_CATEGORY,
        date: "2026-10-26",
        readTime: "TODO min read",
        image: "/og-us.png", // TODO: designed cover image
        seoTitle: "Hiring an Indian Marketing Agency: What to Look For",
        seoDescription: "What US small businesses should look for when hiring a marketing agency based in India: communication, ownership, reporting and pricing.",
        serviceSlug: "seo-services-delhi",
        draft: true,
        content: `
<p>TODO: 1-2 line intro. Frame as a buyer's guide; avoid unsourced claims about market trends.</p>
<h2>What are the real benefits and trade-offs?</h2>
<p>TODO: write body (no statistics without a cited source).</p>
<h2>How does communication work across time zones?</h2>
<p>TODO: write body.</p>
<h2>Who should own your ad accounts, website and data?</h2>
<p>TODO: write body.</p>
<h2>What should reporting look like?</h2>
<p>TODO: write body.</p>
<h2>What questions should you ask before signing?</h2>
<p>TODO: write body.</p>
`,
    },
];

/** Posts that are visible to visitors and search engines. */
export const publishedBlogPosts = (): StaticBlogPost[] => staticBlogPosts.filter((p) => !p.draft);

export function getStaticPost(slug: string): StaticBlogPost | undefined {
    return staticBlogPosts.find((p) => p.slug === slug);
}
