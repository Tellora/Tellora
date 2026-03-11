// Client-side store for Admin Panel data

// ── Tellora Global Admin Data Store ─────────────────────────────────────────
// All admin panel data is persisted via JSON files on the server globally.
// This file provides Server Actions to read/write each data domain.

import { getAdminData, saveAdminData } from "./serverDb";

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

// ── Activity Logs ─────────────────────────────────────────────────────────────
export async function getActivityLogs(): Promise<ActivityLog[]> {
    return getAdminData(KEYS.activity, []);
}

export async function addActivityLog(log: Omit<ActivityLog, "id">): Promise<void> {
    const logs = await getActivityLogs();
    await saveAdminData(KEYS.activity, [{ ...log, id: Date.now().toString() }, ...logs].slice(0, 20));
}

// ── Messages (Inbox) ──────────────────────────────────────────────────────────
export async function getMessages(): Promise<ContactMessage[]> {
    return getAdminData(KEYS.messages, []);
}

export async function saveMessage(msg: ContactMessage): Promise<void> {
    const msgs = await getMessages();
    const exists = msgs.findIndex((m) => m.id === msg.id);
    if (exists >= 0) {
        msgs[exists] = msg;
        await saveAdminData(KEYS.messages, msgs);
    } else {
        await saveAdminData(KEYS.messages, [msg, ...msgs]);
    }
}

export async function deleteMessage(id: string): Promise<void> {
    const msgs = await getMessages();
    await saveAdminData(KEYS.messages, msgs.filter((m) => m.id !== id));
}

export async function markMessageRead(id: string): Promise<void> {
    const msgs = await getMessages();
    await saveAdminData(KEYS.messages, msgs.map((m) =>
        m.id === id ? { ...m, status: "Read" as const } : m
    ));
}

export async function addReply(id: string, replyText: string): Promise<void> {
    const msgs = await getMessages();
    await saveAdminData(KEYS.messages, msgs.map((m) => {
        if (m.id !== id) return m;
        return {
            ...m,
            status: "Replied" as const,
            replyHistory: [
                ...(m.replyHistory || []),
                { text: replyText, sentAt: new Date().toLocaleString() },
            ],
        };
    }));
}

export async function submitContactForm(data: {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
}): Promise<void> {
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

    await saveMessage(msg);
    await addActivityLog({
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

export async function getServices(): Promise<Service[]> {
    return getAdminData(KEYS.services, defaultServices);
}

export async function saveServices(services: Service[]): Promise<void> {
    await saveAdminData(KEYS.services, services);
}

export async function upsertService(service: Service): Promise<void> {
    const all = await getServices();
    const idx = all.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
        all[idx] = service;
    } else {
        all.unshift(service);
    }
    await saveServices(all);
    await addActivityLog({
        type: idx >= 0 ? "update" : "create",
        item: `Service: ${service.title}`,
        user: "Admin",
        time: "Just Now",
        status: service.status,
    });
}

export async function deleteService(id: string): Promise<void> {
    const all = await getServices();
    const svc = all.find((s) => s.id === id);
    await saveServices(all.filter((s) => s.id !== id));
    if (svc) {
        await addActivityLog({ type: "delete", item: `Service removed: ${svc.title}`, user: "Admin", time: "Just Now", status: "Removed" });
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

export async function getCaseStudies(): Promise<CaseStudy[]> {
    return getAdminData(KEYS.cases, defaultCases);
}

export async function saveCaseStudies(cases: CaseStudy[]): Promise<void> {
    await saveAdminData(KEYS.cases, cases);
}

export async function upsertCaseStudy(cs: CaseStudy): Promise<void> {
    const all = await getCaseStudies();
    const idx = all.findIndex((c) => c.id === cs.id);
    if (idx >= 0) {
        all[idx] = cs;
    } else {
        all.unshift(cs);
    }
    await saveCaseStudies(all);
    await addActivityLog({
        type: idx >= 0 ? "update" : "create",
        item: `Case Study: ${cs.title}`,
        user: "Admin",
        time: "Just Now",
        status: cs.status,
    });
}

export async function deleteCaseStudy(id: string): Promise<void> {
    const all = await getCaseStudies();
    const cs = all.find((c) => c.id === id);
    await saveCaseStudies(all.filter((c) => c.id !== id));
    if (cs) {
        await addActivityLog({ type: "delete", item: `Case Study removed: ${cs.title}`, user: "Admin", time: "Just Now", status: "Removed" });
    }
}

// ── Reels ─────────────────────────────────────────────────────────────────────
const defaultReels: Reel[] = [
    { id: "reel-1", title: "Creative Shoot #01", embedUrl: "", tag: "BTS", likes: "18.2k", views: "450k", status: "Live", createdAt: Date.now() - 86400000 },
    { id: "reel-2", title: "Success Showcase", embedUrl: "", tag: "Case Study", likes: "21.4k", views: "1.1M", status: "Live", createdAt: Date.now() - 172800000 },
];

export async function getReels(): Promise<Reel[]> {
    return getAdminData(KEYS.reels, defaultReels);
}

export async function saveReels(reels: Reel[]): Promise<void> {
    await saveAdminData(KEYS.reels, reels);
}

export async function upsertReel(reel: Reel): Promise<void> {
    const all = await getReels();
    const idx = all.findIndex((r) => r.id === reel.id);
    if (idx >= 0) {
        all[idx] = reel;
    } else {
        all.unshift(reel);
    }
    await saveReels(all);
    await addActivityLog({
        type: idx >= 0 ? "update" : "create",
        item: `Reel: ${reel.title}`,
        user: "Admin",
        time: "Just Now",
        status: reel.status,
    });
}

export async function deleteReel(id: string): Promise<void> {
    const all = await getReels();
    const reel = all.find((r) => r.id === id);
    await saveReels(all.filter((r) => r.id !== id));
    if (reel) {
        await addActivityLog({ type: "delete", item: `Reel removed: ${reel.title}`, user: "Admin", time: "Just Now", status: "Removed" });
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

export async function getSettings(): Promise<SiteSettings> {
    return getAdminData(KEYS.settings, defaultSettings);
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
    await saveAdminData(KEYS.settings, settings);
    await addActivityLog({
        type: "update",
        item: "Site Settings updated",
        user: "Admin",
        time: "Just Now",
        status: "Saved",
    });
}

