// ── Tellora Admin Data Store ──────────────────────────────────────────────────
// All admin panel data is persisted via localStorage.
// This file provides typed helpers to read/write each data domain.

export interface ContactMessage {
    id: string;
    sender: string;
    email: string;
    company: string;
    service: string;
    subject: string;
    message: string;
    time: string;
    timestamp: number;
    status: "Unread" | "Read" | "Replied" | "Archived";
    avatar: string;
    category: string;
    replyHistory: { text: string; sentAt: string }[];
}

export interface Service {
    id: string;
    title: string;
    description: string;
    category: string;
    features: string[];
    status: "Active" | "Draft";
    reach: string;
    createdAt: number;
}

export interface CaseStudy {
    id: string;
    title: string;
    description: string;
    category: string;
    impact: string;
    tag: string;
    image: string;
    stats: { label: string; value: string }[];
    tags: string[];
    status: "Published" | "Draft";
    createdAt: number;
}

export interface Reel {
    id: string;
    title: string;
    embedUrl: string;
    tag: string;
    likes: string;
    views: string;
    status: "Live" | "Review" | "Archived";
    createdAt: number;
}

export interface ActivityLog {
    id: string;
    type: "create" | "update" | "delete" | "reply" | "login";
    item: string;
    user: string;
    time: string;
    status: string;
}

export interface SiteSettings {
    siteTitle: string;
    metaDescription: string;
    keywords: string[];
    adminPassword: string;
    brandAccent: string;
    autoOptimization: boolean;
    neuralCache: boolean;
    stealthMode: boolean;
    deepLinkSync: boolean;
}

// ── Keys ─────────────────────────────────────────────────────────────────────
const KEYS = {
    messages: "tellora_inbox_messages",
    services: "tellora_services_v2",
    cases: "tellora_case_studies_v2",
    reels: "tellora_reels_v2",
    activity: "tellora_activity_logs",
    settings: "tellora_site_settings",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
}

// ── Activity Logs ─────────────────────────────────────────────────────────────
export function getActivityLogs(): ActivityLog[] {
    return get<ActivityLog[]>(KEYS.activity, []);
}

export function addActivityLog(log: Omit<ActivityLog, "id">): void {
    const logs = getActivityLogs();
    set(KEYS.activity, [{ ...log, id: Date.now().toString() }, ...logs].slice(0, 20));
}

// ── Messages (Inbox) ──────────────────────────────────────────────────────────
export function getMessages(): ContactMessage[] {
    return get<ContactMessage[]>(KEYS.messages, []);
}

export function saveMessage(msg: ContactMessage): void {
    const msgs = getMessages();
    // Check duplicate by id
    const exists = msgs.findIndex((m) => m.id === msg.id);
    if (exists >= 0) {
        msgs[exists] = msg;
        set(KEYS.messages, msgs);
    } else {
        set(KEYS.messages, [msg, ...msgs]);
    }
}

export function deleteMessage(id: string): void {
    const msgs = getMessages().filter((m) => m.id !== id);
    set(KEYS.messages, msgs);
}

export function markMessageRead(id: string): void {
    const msgs = getMessages().map((m) =>
        m.id === id ? { ...m, status: "Read" as const } : m
    );
    set(KEYS.messages, msgs);
}

export function addReply(id: string, replyText: string): void {
    const msgs = getMessages().map((m) => {
        if (m.id !== id) return m;
        return {
            ...m,
            status: "Replied" as const,
            replyHistory: [
                ...(m.replyHistory || []),
                { text: replyText, sentAt: new Date().toLocaleString() },
            ],
        };
    });
    set(KEYS.messages, msgs);
}

export function submitContactForm(data: {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
}): void {
    const id = Date.now().toString();
    const initials = data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const msg: ContactMessage = {
        id,
        sender: data.name,
        email: data.email,
        company: data.company || "N/A",
        service: data.service,
        subject: `Inquiry: ${data.service}`,
        message: data.message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        timestamp: Date.now(),
        status: "Unread",
        avatar: initials,
        category: "Business",
        replyHistory: [],
    };

    saveMessage(msg);
    addActivityLog({
        type: "create",
        item: `New inquiry from ${data.name}`,
        user: "Public",
        time: "Just Now",
        status: "Unread",
    });
}

// ── Services ──────────────────────────────────────────────────────────────────
const defaultServices: Service[] = [
    {
        id: "svc-1",
        title: "High-Performance SEO",
        description:
            "Drive compounding organic growth with technical SEO, semantic content strategies, and high-authority link building.",
        category: "Growth",
        features: ["Semantic Content Mapping", "Technical Core Web Vitals", "Authority Network Growth"],
        status: "Active",
        reach: "+240%",
        createdAt: Date.now() - 86400000,
    },
    {
        id: "svc-2",
        title: "Social Resonance Strategy",
        description:
            "Engage and convert across Meta, LinkedIn, and TikTok with high-impact creative and precision demographic targeting.",
        category: "Media",
        features: ["Dynamic Creative Testing", "Lookalike Audience Scaling", "Retargeting Funnels"],
        status: "Active",
        reach: "+180%",
        createdAt: Date.now() - 172800000,
    },
    {
        id: "svc-3",
        title: "Neural Brand Identity",
        description:
            "Crafting distinct, unignorable brand identities that resonate with your target audience and stand the test of time.",
        category: "Design",
        features: ["Visual Identity Systems", "Brand Positioning", "Market Differentiation"],
        status: "Active",
        reach: "+310%",
        createdAt: Date.now() - 259200000,
    },
];

export function getServices(): Service[] {
    return get<Service[]>(KEYS.services, defaultServices);
}

export function saveServices(services: Service[]): void {
    set(KEYS.services, services);
}

export function upsertService(service: Service): void {
    const all = getServices();
    const idx = all.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
        all[idx] = service;
    } else {
        all.unshift(service);
    }
    saveServices(all);
    addActivityLog({
        type: idx >= 0 ? "update" : "create",
        item: `Service: ${service.title}`,
        user: "Admin",
        time: "Just Now",
        status: service.status,
    });
}

export function deleteService(id: string): void {
    const svc = getServices().find((s) => s.id === id);
    saveServices(getServices().filter((s) => s.id !== id));
    if (svc) {
        addActivityLog({ type: "delete", item: `Service removed: ${svc.title}`, user: "Admin", time: "Just Now", status: "Removed" });
    }
}

// ── Case Studies ──────────────────────────────────────────────────────────────
const defaultCases: CaseStudy[] = [
    {
        id: "cs-1",
        title: "JS Wedding Services",
        description:
            "How we transformed a regional wedding boutique into a national digital authority using semantic SEO and high-performance WebGL design.",
        category: "Social Growth",
        impact: "+187% Organic Traffic",
        tag: "Enterprise",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1200&q=80",
        stats: [
            { label: "Rev Growth", value: "3.5x" },
            { label: "CPA Reduction", value: "42%" },
        ],
        tags: ["SEO", "Web Development", "UI/UX"],
        status: "Published",
        createdAt: Date.now() - 86400000,
    },
    {
        id: "cs-2",
        title: "Astrology Light",
        description:
            "Architecting a viral social growth engine that fueled a subscription-based platform's expansion into new continental markets.",
        category: "Performance",
        impact: "15k+ New Acquisitions",
        tag: "Startup",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
        stats: [
            { label: "CAC", value: "$1.20" },
            { label: "MAU Increase", value: "310%" },
        ],
        tags: ["Social Media", "Paid Performance", "Scaling"],
        status: "Published",
        createdAt: Date.now() - 172800000,
    },
];

export function getCaseStudies(): CaseStudy[] {
    return get<CaseStudy[]>(KEYS.cases, defaultCases);
}

export function saveCaseStudies(cases: CaseStudy[]): void {
    set(KEYS.cases, cases);
}

export function upsertCaseStudy(cs: CaseStudy): void {
    const all = getCaseStudies();
    const idx = all.findIndex((c) => c.id === cs.id);
    if (idx >= 0) {
        all[idx] = cs;
    } else {
        all.unshift(cs);
    }
    saveCaseStudies(all);
    addActivityLog({
        type: idx >= 0 ? "update" : "create",
        item: `Case Study: ${cs.title}`,
        user: "Admin",
        time: "Just Now",
        status: cs.status,
    });
}

export function deleteCaseStudy(id: string): void {
    const cs = getCaseStudies().find((c) => c.id === id);
    saveCaseStudies(getCaseStudies().filter((c) => c.id !== id));
    if (cs) {
        addActivityLog({ type: "delete", item: `Case Study removed: ${cs.title}`, user: "Admin", time: "Just Now", status: "Removed" });
    }
}

// ── Reels ─────────────────────────────────────────────────────────────────────
const defaultReels: Reel[] = [
    { id: "reel-1", title: "Creative Shoot #01", embedUrl: "", tag: "BTS", likes: "18.2k", views: "450k", status: "Live", createdAt: Date.now() - 86400000 },
    { id: "reel-2", title: "Success Showcase", embedUrl: "", tag: "Case Study", likes: "21.4k", views: "1.1M", status: "Live", createdAt: Date.now() - 172800000 },
];

export function getReels(): Reel[] {
    return get<Reel[]>(KEYS.reels, defaultReels);
}

export function saveReels(reels: Reel[]): void {
    set(KEYS.reels, reels);
}

export function upsertReel(reel: Reel): void {
    const all = getReels();
    const idx = all.findIndex((r) => r.id === reel.id);
    if (idx >= 0) {
        all[idx] = reel;
    } else {
        all.unshift(reel);
    }
    saveReels(all);
    addActivityLog({
        type: idx >= 0 ? "update" : "create",
        item: `Reel: ${reel.title}`,
        user: "Admin",
        time: "Just Now",
        status: reel.status,
    });
}

export function deleteReel(id: string): void {
    const reel = getReels().find((r) => r.id === id);
    saveReels(getReels().filter((r) => r.id !== id));
    if (reel) {
        addActivityLog({ type: "delete", item: `Reel removed: ${reel.title}`, user: "Admin", time: "Just Now", status: "Removed" });
    }
}

// ── Settings ──────────────────────────────────────────────────────────────────
const defaultSettings: SiteSettings = {
    siteTitle: "Tellora Media | Digital Growth Agency",
    metaDescription:
        "Tellora is a high-performance creative media lab specializing in high-end SEO, social growth, and brand identity for global enterprises.",
    keywords: ["SEO Engine", "Global Scale", "Visual Lab", "Delhi NCR", "Tellora Core"],
    adminPassword: "admin123",
    brandAccent: "#4ac0e4",
    autoOptimization: true,
    neuralCache: true,
    stealthMode: false,
    deepLinkSync: true,
};

export function getSettings(): SiteSettings {
    return get<SiteSettings>(KEYS.settings, defaultSettings);
}

export function saveSettings(settings: SiteSettings): void {
    set(KEYS.settings, settings);
    addActivityLog({
        type: "update",
        item: "Site Settings updated",
        user: "Admin",
        time: "Just Now",
        status: "Saved",
    });
}
