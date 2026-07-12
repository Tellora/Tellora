// Client-side store for Admin Panel data
// Powered by Supabase Relational Tables

import { 
    supabase, 
    fetchTableData, 
    upsertTableData, 
    deleteTableData,
    DbService,
    DbTeamMember,
    DbCaseStudy,
    DbReel,
    DbTestimonial,
    DbFAQ,
    DbJob,
    DbJobApplication,
    DbIGProfile,
    DbIGPost
} from "./supabase";
import { manualMembers } from "@/data/team";
import { caseStudies as staticCaseStudies } from "@/data/case-studies";

export type { DbIGProfile, DbIGPost };

export interface ContactMessage {
    id: string;
    sender: string;
    email: string;
    company: string;
    service: string;
    subject: string;
    message: string;
    status: "Unread" | "Read" | "Replied" | "Archived";
    reply_history: { text: string; sentAt: string }[];
    created_at: string;
}

export interface Service extends DbService {}
export interface CaseStudy extends DbCaseStudy {}
export interface Reel extends DbReel {}

export interface Job extends DbJob {}
export interface JobApplication extends DbJobApplication {}
export interface IGProfile extends DbIGProfile {
    posts?: DbIGPost[];
    followers_count?: string;
    following_count?: string;
}

export interface ActivityLog {
    id: string;
    type: "create" | "update" | "delete" | "reply" | "login";
    item: string;
    user_name: string;
    status: string;
    created_at: string;
}

export interface SiteSettings {
    // Core identity (snake_case matching Supabase columns)
    site_title: string;
    meta_description: string;
    keywords: string[];
    admin_password: string;
    brand_accent: string;
    auto_optimization: boolean;
    neural_cache: boolean;
    stealth_mode: boolean;
    deep_link_sync: boolean;
    // Hero content
    hero_title?: string;
    hero_subtitle?: string;
    cta_text?: string;
    // Infrastructure (stored locally, not in Supabase)
    supabase_url?: string;
    supabase_anon_key?: string;
    storage_mode?: "Local" | "Cloud";
}

export interface CompanyStat {
    label: string;
    value: string;
    color: string;
}

// ── Activity Logs ─────────────────────────────────────────────────────────────
export async function getActivityLogs(): Promise<ActivityLog[]> {
    return fetchTableData("activity_logs", []);
}

export async function addActivityLog(log: Omit<ActivityLog, "id" | "created_at">): Promise<void> {
    await upsertTableData("activity_logs", { ...log, created_at: new Date().toISOString() });
}

// ── Messages (Inbox) ──────────────────────────────────────────────────────────
export async function getMessages(): Promise<ContactMessage[]> {
    return fetchTableData("inbox_messages", []);
}

export async function saveMessage(msg: ContactMessage): Promise<void> {
    await upsertTableData("inbox_messages", msg);
}

export async function deleteMessage(id: string): Promise<void> {
    await deleteTableData("inbox_messages", { id });
}

export async function markMessageRead(id: string): Promise<void> {
    await upsertTableData("inbox_messages", { id, status: "Read" });
}

export async function addReply(id: string, replyText: string): Promise<void> {
    const { data: msg } = await supabase.from("inbox_messages").select("reply_history").eq("id", id).single();
    const history = msg?.reply_history || [];
    await upsertTableData("inbox_messages", {
        id,
        status: "Replied",
        reply_history: [...history, { text: replyText, sentAt: new Date().toISOString() }]
    });
}

export async function submitContactForm(data: any): Promise<void> {
    const msg = {
        sender: data.name,
        email: data.email,
        company: data.company || "N/A",
        service: data.service,
        subject: `Inquiry: ${data.service}`,
        message: data.message,
        status: "Unread",
        created_at: new Date().toISOString()
    };
    await upsertTableData("inbox_messages", msg);
    await addActivityLog({
        type: "create",
        item: `New inquiry from ${data.name}`,
        user_name: "Public",
        status: "Unread"
    });
}

// ── Services ──────────────────────────────────────────────────────────────────
export async function getServices(): Promise<Service[]> {
    return fetchTableData("services", []);
}

export async function upsertService(service: Service): Promise<void> {
    await upsertTableData("services", service);
    await addActivityLog({
        type: "update",
        item: `Service: ${service.title}`,
        user_name: "Admin",
        status: service.status
    });
}

export async function deleteService(id: string): Promise<void> {
    await deleteTableData("services", { id });
}

// ── Case Studies ──────────────────────────────────────────────────────────────
export async function getCaseStudies(): Promise<CaseStudy[]> {
    return fetchTableData("case_studies", []);
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
    const dbCases = await getCaseStudies();
    
    // Merge database updates onto static case studies
    const merged = staticCaseStudies.map(staticCase => {
        const dbOverride = dbCases.find(db => db.id === staticCase.id || db.title.toLowerCase() === staticCase.title.toLowerCase());
        if (dbOverride) {
            return {
                ...staticCase,
                ...dbOverride,
                // Make sure array/object fields are handled safely
                stats: dbOverride.stats && dbOverride.stats.length > 0 ? dbOverride.stats : staticCase.stats,
                tags: dbOverride.tags && dbOverride.tags.length > 0 ? dbOverride.tags : staticCase.techStack,
            };
        }
        return { ...staticCase, status: "Published" }; // Default static to Published
    });

    // Add any database-only case studies that don't match static ones
    dbCases.forEach(db => {
        const matchesStatic = staticCaseStudies.some(s => s.id === db.id || s.title.toLowerCase() === db.title.toLowerCase());
        if (!matchesStatic && db.status !== "Inactive") {
            // Provide defaults for static-only fields
            merged.push({
                ...db,
                clientSummary: db.description,
                industry: db.tag || db.category || "General",
                services: db.tags && db.tags.length > 0 ? db.tags : [db.category || "General"],
                challenge: "Enhancing operations and digital presence to achieve scalable market results.",
                execution: "Implemented tailored growth architecture and full-funnel digital optimizations.",
                strategicInsight: "Focusing on user-centric design and performance marketing unlocks latent customer intent.",
                roadmap: [
                    { phase: "Deployment", details: "Integrating new digital structures." },
                    { phase: "Optimization", details: "A/B testing and performance tuning." }
                ],
                techStack: db.tags || [],
                image: db.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
                color: "#4AC0E4",
                links: {},
            } as any);
        }
    });

    return merged.filter(c => c.status !== "Inactive") as any[];
}

export async function upsertCaseStudy(cs: CaseStudy): Promise<void> {
    const dbCase: any = {
        id: cs.id,
        title: cs.title,
        description: cs.description,
        category: cs.category,
        impact: cs.impact,
        tag: cs.tag,
        image_url: cs.image_url,
        stats: cs.stats,
        tags: cs.tags,
        status: cs.status,
    };
    
    // Check if the id is a valid UUID
    const isUuid = cs.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cs.id);
    if (!isUuid) {
        // Find existing override if any by matching title
        const dbCases = await getCaseStudies();
        const match = dbCases.find(c => c.title.toLowerCase() === cs.title.toLowerCase() || c.id === cs.id);
        if (match) {
            dbCase.id = match.id;
        } else {
            // Let the database generate a UUID
            delete dbCase.id;
        }
    }
    await upsertTableData("case_studies", dbCase);
}

export async function deleteCaseStudy(id: string): Promise<void> {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (!isUuid) {
        // Mark as Inactive in the database
        const dbCases = await getCaseStudies();
        const match = dbCases.find(c => c.id === id);
        await upsertTableData("case_studies", {
            id: match?.id || undefined,
            title: match?.title || id,
            status: "Inactive"
        });
    } else {
        await deleteTableData("case_studies", { id });
    }
}

// ── Reels ─────────────────────────────────────────────────────────────────────
export async function getReels(): Promise<Reel[]> {
    return fetchTableData("reels", []);
}

export async function upsertReel(reel: Reel): Promise<void> {
    await upsertTableData("reels", reel);
}

export async function deleteReel(id: string): Promise<void> {
    await deleteTableData("reels", { id });
}

// ── Settings ──────────────────────────────────────────────────────────────────
export async function getSettings(): Promise<SiteSettings> {
    const data = await fetchTableData("site_settings", []);
    return (data as any)[0] || {};
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
    await upsertTableData("site_settings", { ...settings, id: 1 });
}

// ── Additional Entities ──────────────────────────────────────────────────────
export async function getTeam(): Promise<DbTeamMember[]> {
    const data = await fetchTableData<DbTeamMember[]>("team_members", []);
    const validCategories = ["core", "development", "designing"];
    return data.map(m => ({
        ...m,
        category: validCategories.includes(m.status || "") ? m.status : undefined
    }));
}

export async function getAllTeamMembers(): Promise<DbTeamMember[]> {
    const dbMembers = await getTeam();
    
    // Merge database updates onto manual members
    const merged = manualMembers.map(manual => {
        const dbOverride = dbMembers.find(db => db.name.toLowerCase() === manual.name.toLowerCase());
        if (dbOverride) {
            return {
                ...manual,
                ...dbOverride,
                // Make sure array/object fields are handled safely
                skills: dbOverride.skills && dbOverride.skills.length > 0 ? dbOverride.skills : manual.skills,
                stats: dbOverride.stats && dbOverride.stats.length > 0 ? dbOverride.stats : manual.stats,
            };
        }
        return manual;
    });

    // Filter out inactive members (e.g. deleted manual members)
    const activeMerged = merged.filter(m => m.status !== "Inactive");

    // Add any database-only members that don't match manual members by name
    dbMembers.forEach(db => {
        const matchesManual = manualMembers.some(manual => manual.name.toLowerCase() === db.name.toLowerCase());
        if (!matchesManual && db.status !== "Inactive") {
            activeMerged.push(db);
        }
    });

    return activeMerged;
}

export async function upsertTeamMember(member: DbTeamMember): Promise<void> {
    const dbMember = {
        ...member,
        status: member.category || member.status || "Active"
    };
    delete (dbMember as any).category;
    // Check if the id is a valid UUID
    const isUuid = member.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(member.id);
    if (!isUuid) {
        // Find existing override if any by matching name
        const dbMembers = await getTeam();
        const match = dbMembers.find(m => m.name.toLowerCase() === member.name.toLowerCase());
        if (match) {
            dbMember.id = match.id;
        } else {
            // Let the database generate a UUID
            delete (dbMember as any).id;
        }
    }
    await upsertTableData("team_members", dbMember);
}

export async function deleteTeamMember(id: string, name?: string): Promise<void> {
    const isManual = name && manualMembers.some(m => m.name.toLowerCase() === name.toLowerCase());
    if (isManual) {
        // Find existing override if any
        const dbMembers = await getTeam();
        const match = dbMembers.find(m => m.name.toLowerCase() === name!.toLowerCase());
        await upsertTableData("team_members", {
            id: match?.id || undefined,
            name: name!,
            status: "Inactive"
        });
    } else {
        await deleteTableData("team_members", { id });
    }
}

export async function getFAQs(): Promise<DbFAQ[]> {
    return fetchTableData("faqs", []);
}

export async function upsertFAQ(faq: DbFAQ): Promise<void> {
    await upsertTableData("faqs", faq);
}

export async function deleteFAQ(id: string): Promise<void> {
    await deleteTableData("faqs", { id });
}

export async function getTestimonials(): Promise<DbTestimonial[]> {
    return fetchTableData("testimonials", []);
}

export async function upsertTestimonial(test: DbTestimonial): Promise<void> {
    await upsertTableData("testimonials", test);
}

export async function deleteTestimonial(id: string): Promise<void> {
    await deleteTableData("testimonials", { id });
}

export async function getClients(): Promise<{ name: string; logo_url: string }[]> {
    return fetchTableData("clients", []);
}

export async function upsertClient(client: any): Promise<void> {
    await upsertTableData("clients", client);
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
    return fetchTableData("company_stats", []);
}

export async function upsertCompanyStat(stat: CompanyStat): Promise<void> {
    await upsertTableData("company_stats", stat);
}

// ── Recruitment ───────────────────────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
    return fetchTableData("jobs", []);
}

export async function upsertJob(job: Job): Promise<void> {
    await upsertTableData("jobs", job);
}

export async function deleteJob(id: string): Promise<void> {
    await deleteTableData("jobs", { id });
}

export async function getJobApplications(): Promise<JobApplication[]> {
    return fetchTableData("job_applications", []);
}

export async function upsertJobApplication(app: JobApplication): Promise<void> {
    await upsertTableData("job_applications", app);
}

export async function deleteJobApplication(id: string): Promise<void> {
    await deleteTableData("job_applications", { id });
}

// ── Instagram Preview ─────────────────────────────────────────────────────────
function parseBioMetadata(fullBio: string | undefined | null) {
    if (!fullBio) return { bio: "", followers_count: "1.2M", following_count: "854" };
    const parts = fullBio.split("\n\n===METADATA===\n");
    if (parts.length === 2) {
        try {
            const metadata = JSON.parse(parts[1]);
            return {
                bio: parts[0],
                followers_count: metadata.followers_count || "1.2M",
                following_count: metadata.following_count || "854"
            };
        } catch (e) {
            // ignore
        }
    }
    return { bio: fullBio, followers_count: "1.2M", following_count: "854" };
}

function serializeBioMetadata(bio: string | undefined, followers_count: string | undefined, following_count: string | undefined) {
    const metadata = { 
        followers_count: followers_count || "1.2M", 
        following_count: following_count || "854" 
    };
    return `${bio || ""}\n\n===METADATA===\n${JSON.stringify(metadata)}`;
}

export async function getIGProfiles(): Promise<IGProfile[]> {
    const profiles = await fetchTableData<DbIGProfile[]>("ig_profiles", []);
    // Fetch posts for each profile
    const profilesWithPosts = await Promise.all(profiles.map(async (p) => {
        const { data: posts } = await supabase.from("ig_posts").select("*").eq("profile_id", p.id);
        const meta = parseBioMetadata(p.bio);
        return { 
            ...p, 
            bio: meta.bio,
            followers_count: meta.followers_count,
            following_count: meta.following_count,
            posts: posts || [] 
        };
    }));
    return profilesWithPosts;
}

export async function getIGProfileBySlug(slug: string): Promise<IGProfile | null> {
    const { data: profile, error } = await supabase.from("ig_profiles").select("*").eq("slug", slug).single();
    if (error || !profile) return null;
    const { data: posts } = await supabase.from("ig_posts").select("*").eq("profile_id", profile.id);
    const meta = parseBioMetadata(profile.bio);
    return { 
        ...profile, 
        bio: meta.bio,
        followers_count: meta.followers_count,
        following_count: meta.following_count,
        posts: posts || [] 
    };
}

export async function upsertIGProfile(profile: IGProfile): Promise<void> {
    const dbProfile = { 
        ...profile,
        bio: serializeBioMetadata(profile.bio, profile.followers_count, profile.following_count)
    };
    delete (dbProfile as any).posts;
    delete (dbProfile as any).followers_count;
    delete (dbProfile as any).following_count;
    await upsertTableData("ig_profiles", dbProfile);
}

export async function deleteIGProfile(id: string): Promise<void> {
    await deleteTableData("ig_profiles", { id });
}

export async function upsertIGPost(post: DbIGPost): Promise<void> {
    await upsertTableData("ig_posts", post);
}

export async function deleteIGPost(id: string): Promise<void> {
    await deleteTableData("ig_posts", { id });
}

