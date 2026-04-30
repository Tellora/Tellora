import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import JobPostingSchema from "@/components/seo/schema/JobPostingSchema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
    const { data: jobs } = await supabase
        .from("jobs")
        .select("id")
        .eq("status", "Published");

    const routes = (jobs || []).map((job) => ({
        id: job.id.toString(),
    }));

    if (routes.length === 0) {
        return [{ id: "placeholder" }];
    }
    return routes;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { data: job } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!job) {
        return {
            title: "Job Not Found | Tellora Media",
        };
    }

    const title = job.seo_title || `${job.title} | Careers | Tellora Media`;
    const description = job.seo_description || (job.description?.substring(0, 155) || SEO_CONFIG.defaultDescription);

    return {
        title,
        description,
        alternates: {
            canonical: getCanonicalUrl(`/careers/${params.id}/`),
        },
        openGraph: {
            title,
            description,
            url: getCanonicalUrl(`/careers/${params.id}/`),
            type: "website",
            siteName: SEO_CONFIG.siteName,
            locale: SEO_CONFIG.locale,
        },
    };
}

export default async function JobPage({ params }: { params: { id: string } }) {
    const { data: job } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!job) {
        notFound();
    }

    return (
        <div className="bg-[#080B12] min-h-screen text-white selection:bg-primary selection:text-white">
            <Header />
            <JobPostingSchema 
                job={{
                    title: job.title,
                    description: job.description,
                    datePosted: job.created_at || new Date().toISOString(),
                    employmentType: job.type === "Full-time" ? "FULL_TIME" : job.type === "Contract" ? "CONTRACTOR" : "OTHER",
                    jobLocation: job.location,
                    isRemote: job.location?.toLowerCase().includes("remote")
                }} 
            />
            <main className="pt-40 pb-32 container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] text-white">
                            {job.title}
                        </h1>
                        <div className="flex flex-wrap gap-4">
                            <span className="bg-white/5 px-6 py-2 rounded-full border border-white/5 text-xs font-black uppercase tracking-widest text-white/60">
                                {job.location}
                            </span>
                            <span className="bg-white/5 px-6 py-2 rounded-full border border-white/5 text-xs font-black uppercase tracking-widest text-white/60">
                                {job.type}
                            </span>
                            <span className="bg-white/5 px-6 py-2 rounded-full border border-white/5 text-xs font-black uppercase tracking-widest text-white/60">
                                {job.department}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.6em] text-primary mb-4">The Mission Context</h2>
                            <p className="text-xl text-white/70 leading-relaxed font-medium tracking-tight italic">{job.description}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.6em] text-primary mb-4">Required Skillset Node</h2>
                            <p className="text-xl text-white/70 leading-relaxed font-medium tracking-tight italic">{job.requirements}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.6em] text-primary mb-4">Global Resonance Perk Matrix</h2>
                            <p className="text-xl text-white/70 leading-relaxed font-medium tracking-tight italic">{job.benefits}</p>
                        </div>
                    </div>
                    <div className="pt-12">
                        <a href="/careers" className="w-full inline-block text-center py-8 bg-primary text-white brutalist-border shadow-[10px_10px_0px_#000] text-xs font-black uppercase tracking-[0.5em] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
                            APPLY VIA CAREERS PORTAL
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
