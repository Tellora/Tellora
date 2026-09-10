import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import BlogPostingSchema from "@/components/seo/schema/BlogPostingSchema";
import { caseStudies as staticCaseStudies } from "@/data/case-studies";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, Sparkles, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
    const { data: dbCases } = await supabase
        .from("case_studies")
        .select("slug")
        .eq("status", "Published");

    const dbSlugs = (dbCases || []).map((cs) => cs.slug).filter(Boolean);
    const staticSlugs = staticCaseStudies.map((cs) => cs.id);
    const allSlugs = Array.from(new Set([...staticSlugs, ...dbSlugs]));

    if (allSlugs.length === 0) {
        return [{ slug: "placeholder" }];
    }
    return allSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

async function getCaseStudyData(slug: string) {
    const { data: study } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    const staticMatch = staticCaseStudies.find((c) => c.id === slug);

    if (!study && !staticMatch) return null;

    return {
        title: study?.title || staticMatch?.title || "Case Study",
        description: study?.description || staticMatch?.description || "",
        clientSummary: staticMatch?.clientSummary || study?.description || "",
        industry: staticMatch?.industry || study?.tag || study?.category || "Growth",
        services: staticMatch?.services || study?.tags || [],
        impact: staticMatch?.impact || study?.impact || "Growth Scale",
        challenge: staticMatch?.challenge || "Scaling customer acquisition and digital authority within a competitive market landscape.",
        execution: staticMatch?.execution || "Engineered performance funnels, high-conversion creative assets, and targeted organic SEO systems.",
        strategicInsight: staticMatch?.strategicInsight || "Focusing on user-centric friction elimination unlocks latent customer conversion velocity.",
        roadmap: staticMatch?.roadmap || [
            { phase: "Audit & Architecture", details: "Comprehensive technical review and funnel optimization." },
            { phase: "Campaign Scaling", details: "High-frequency creative deployment and performance scaling." }
        ],
        techStack: staticMatch?.techStack || study?.tags || ["Meta Ads", "Google Ads", "Next.js"],
        image: study?.image_url || staticMatch?.image || SEO_CONFIG.defaultOGImage,
        stats: staticMatch?.stats || study?.stats || [],
        links: staticMatch?.links || {},
        seo_title: study?.seo_title,
        seo_description: study?.seo_description,
        created_at: study?.created_at
    };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const study = await getCaseStudyData(params.slug);

    if (!study) {
        return {
            title: "Case Study Not Found | Tellora Media",
        };
    }

    const title = study.seo_title || `${study.title} | Growth Case Study | Tellora Media`;
    const description = study.seo_description || (study.description?.substring(0, 155) || SEO_CONFIG.defaultDescription);

    return {
        title,
        description,
        alternates: {
            canonical: getCanonicalUrl(`/case-studies/${params.slug}/`),
        },
        openGraph: {
            title,
            description,
            url: getCanonicalUrl(`/case-studies/${params.slug}/`),
            type: "article",
            images: [
                {
                    url: study.image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
    };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
    const study = await getCaseStudyData(params.slug);

    if (!study) {
        notFound();
    }

    return (
        <div className="bg-white text-black min-h-screen selection:bg-primary selection:text-white">
            <Header />
            <BlogPostingSchema 
                post={{
                    title: study.title,
                    description: study.description,
                    url: getCanonicalUrl(`/case-studies/${params.slug}/`),
                    datePublished: study.created_at || new Date().toISOString(),
                    image: study.image,
                }} 
            />
            <main className="pt-36 sm:pt-44 pb-24 container mx-auto px-4 sm:px-6">
                <div className="max-w-4xl mx-auto mb-8">
                    <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-secondary transition-colors mb-6">
                        <ArrowLeft size={16} /> Back to All Case Studies
                    </Link>
                </div>

                <article className="max-w-4xl mx-auto space-y-12 mb-20">
                    <header className="space-y-6 text-center border-b-[4px] border-black pb-10">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 text-black border-2 border-black rounded-full text-xs font-black uppercase tracking-widest">
                            <Sparkles size={14} className="text-secondary fill-current" />
                            {study.industry} • {study.impact}
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
                            {study.title}
                        </h1>
                        <p className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-black/70 max-w-2xl mx-auto">
                            {study.description}
                        </p>
                    </header>

                    {study.stats && study.stats.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {study.stats.map((s, idx) => (
                                <div key={idx} className="p-5 bg-black text-white brutalist-border shadow-[4px_4px_0px_#F3E84A] text-center">
                                    <div className="text-2xl sm:text-4xl font-heading font-black text-primary mb-1">{s.value}</div>
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/70">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="aspect-video w-full rounded-2xl overflow-hidden brutalist-border shadow-[8px_8px_0px_#000] relative">
                        <img 
                            src={study.image} 
                            alt={study.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-8 text-black leading-relaxed">
                        <div className="bg-zinc-50 brutalist-border p-6 sm:p-8 rounded-2xl">
                            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                                <TrendingUp className="text-secondary" /> The Challenge
                            </h2>
                            <p className="text-base sm:text-lg font-medium text-black/80">{study.challenge}</p>
                        </div>

                        <div className="bg-zinc-50 brutalist-border p-6 sm:p-8 rounded-2xl">
                            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500" /> Strategic Execution
                            </h2>
                            <p className="text-base sm:text-lg font-medium text-black/80">{study.execution}</p>
                        </div>

                        <div className="bg-primary/10 brutalist-border p-6 sm:p-8 rounded-2xl">
                            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight mb-4">
                                Strategic Insight
                            </h2>
                            <p className="text-base sm:text-lg font-medium text-black/90 italic">"{study.strategicInsight}"</p>
                        </div>
                    </div>
                </article>

                <div className="max-w-4xl mx-auto text-center border-t-[4px] border-black pt-12">
                    <h3 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight mb-6">
                        Ready to Architect Similar Growth for Your Brand?
                    </h3>
                    <Link 
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-black text-white font-black uppercase tracking-widest text-sm sm:text-base brutalist-border shadow-[6px_6px_0px_#A855F7] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_#A855F7] transition-all"
                    >
                        Request Growth Audit
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
