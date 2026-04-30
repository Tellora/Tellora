"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ArrowUpRight, 
    TrendingUp, 
    Sparkles, 
    Zap, 
    Globe, 
    Instagram, 
    Facebook, 
    MapPin, 
    Shield,
    Activity,
    Cpu,
    Target,
    Briefcase,
    Settings,
    ChevronDown,
    ChevronUp,
    Terminal,
    Layers
} from "lucide-react";
import { 
    ScrollLine, 
    FloatingElement, 
    MagneticElement, 
    ParallaxText 
} from "@/components/animations/ScrollChoreography";
import { caseStudies, CaseStudy } from "@/data/case-studies";

type BrowseMode = "industry" | "service";

export default function CaseStudiesPage() {
    const [mode, setMode] = useState<BrowseMode>("industry");
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const industries = useMemo(() => ["All", ...Array.from(new Set(caseStudies.map(s => s.industry)))], []);
    const services = useMemo(() => ["All", ...Array.from(new Set(caseStudies.flatMap(s => s.services)))], []);

    const filters = mode === "industry" ? industries : services;

    const filteredStudies = useMemo(() => {
        if (activeFilter === "All") return caseStudies;
        if (mode === "industry") {
            return caseStudies.filter(s => s.industry === activeFilter);
        } else {
            return caseStudies.filter(s => s.services.includes(activeFilter));
        }
    }, [mode, activeFilter]);

    return (
        <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
            <div className="fixed top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 rotate-12 z-0">
                <span className="text-[35rem] font-heading font-black uppercase whitespace-nowrap">
                    WINS • WINS • WINS •
                </span>
            </div>

            <Header />

            <main className="relative z-10">
                <PageHeader
                    breadcrumb="Proven Reliability"
                    title="THE PROOF"
                    subtitle="We don't just deliver work; we deliver outcomes. Explore our technical dossiers and strategic roadmaps."
                />

                {/* Filter Section */}
                <section className="py-12 bg-white border-y-[4px] border-black sticky top-[80px] z-[40]">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center justify-between">
                            <div className="flex bg-slate-100 p-2 brutalist-border shadow-[4px_4px_0px_#000]">
                                <button
                                    onClick={() => { setMode("industry"); setActiveFilter("All"); }}
                                    className={`px-8 py-3 flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all ${mode === "industry" ? "bg-black text-white shadow-[4px_4px_0px_#4AC0E4]" : "text-black/40 hover:text-black"}`}
                                >
                                    <Briefcase size={14} /> Browse by Industry
                                </button>
                                <button
                                    onClick={() => { setMode("service"); setActiveFilter("All"); }}
                                    className={`px-8 py-3 flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all ${mode === "service" ? "bg-black text-white shadow-[4px_4px_0px_#4AC0E4]" : "text-black/40 hover:text-black"}`}
                                >
                                    <Settings size={14} /> Browse by Service
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-6 py-2 brutalist-border text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter ? "bg-primary text-white shadow-[4px_4px_0px_#000] -translate-y-1" : "bg-white text-black shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-1 active:translate-y-0"}`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="space-y-40 md:space-y-64">
                            <AnimatePresence mode="wait">
                                {filteredStudies.map((study, idx) => (
                                    <CaseStudyDossier key={study.id} study={study} idx={idx} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                <ScrollLine />
                <div className="py-32 relative overflow-hidden bg-white">
                    <ParallaxText text="PROVEN RELIABILITY • MEASURABLE ROI • SCALABLE SOLUTIONS •" baseVelocity={-20} />
                </div>

                <section className="py-64 relative overflow-hidden bg-black text-white text-center">
                    <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-accent brutalist-border w-32 h-32 flex items-center justify-center mx-auto mb-16 -rotate-12 shadow-[8px_8px_0px_#FFF]"
                    >
                        <Shield size={48} className="text-black animate-pulse" />
                    </motion.div>
                    <h2 className="text-6xl md:text-[8rem] font-heading font-black text-white mb-12 leading-none uppercase tracking-tighter">
                        Deploy your <br />
                        <span className="text-primary italic underline decoration-accent decoration-[8px] underline-offset-8">Growth Architecture.</span>
                    </h2>
                    <MagneticElement>
                        <a href="/contact" className="px-20 py-10 bg-white text-black font-black brutalist-border shadow-[12px_12px_0px_#4AC0E4] hover:shadow-[20px_20px_0px_#4AC0E4] hover:-translate-y-2 inline-block uppercase tracking-widest text-sm transition-all">
                            INITIALIZE PROTOCOL
                        </a>
                    </MagneticElement>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function CaseStudyDossier({ study, idx }: { study: CaseStudy; idx: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className={`group grid lg:grid-cols-12 gap-12 md:gap-24 items-start ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
        >
            {/* Visual Column */}
            <div className={`lg:col-span-6 relative ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="relative brutalist-card h-[400px] md:h-[700px] overflow-hidden group-hover:shadow-[20px_20px_0px_#000] transition-all duration-700">
                    <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
                    
                    <div className="absolute top-8 left-8 bg-black text-white brutalist-border px-6 py-2 rotate-2 shadow-[4px_4px_0px_#FFF]">
                        <span className="text-xs font-black uppercase tracking-widest">{study.impact}</span>
                    </div>

                    <div className="absolute bottom-8 left-8 flex flex-col gap-2">
                        <div className="bg-white brutalist-border px-4 py-2 shadow-[4px_4px_0px_#000] -rotate-2">
                            <span className="text-[10px] font-black uppercase text-black">{study.industry}</span>
                        </div>
                    </div>
                </div>

                {/* Technical Stats Overlay */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                    {study.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="bg-white p-6 brutalist-border shadow-[6px_6px_0px_#000] group-hover:bg-primary group-hover:text-white transition-colors">
                            <p className="text-3xl md:text-5xl font-heading font-black leading-none mb-1 italic">{stat.value}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest opacity-60">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Intel Column */}
            <div className={`lg:col-span-6 flex flex-col ${idx % 2 !== 0 ? "xl:order-1" : ""}`}>
                <div className="flex flex-wrap gap-4 mb-8">
                    {study.services.map((service) => (
                        <span key={service} className="px-4 py-1 bg-black text-white brutalist-border text-[9px] font-black uppercase tracking-widest shadow-[3px_3px_0px_#4AC0E4]">
                            {service}
                        </span>
                    ))}
                </div>

                <h2 className="text-5xl md:text-8xl font-heading font-black text-black mb-8 leading-[0.9] tracking-tighter uppercase group-hover:text-primary transition-all duration-500">
                    {study.title}
                </h2>

                <p className="text-xl md:text-2xl font-black uppercase leading-tight text-black/60 mb-12 max-w-xl">
                    {study.description}
                </p>

                {/* Primary Content Card */}
                <div className="bg-slate-50 p-8 brutalist-border mb-8 shadow-[8px_8px_0px_#000]">
                    <div className="mb-8 p-6 bg-white brutalist-border shadow-[4px_4px_0px_#000] rotate-1">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2"><Target size={14} /> The Brief</h4>
                        <p className="text-sm font-medium text-black/80">{study.clientSummary}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-3 flex items-center gap-2"><Activity size={14} /> The Friction</h4>
                            <p className="text-xs font-medium text-black/70 italic">"{study.challenge}"</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-success mb-3 flex items-center gap-2"><Zap size={14} /> The Intervention</h4>
                            <p className="text-xs font-medium text-black/70 italic">"{study.execution}"</p>
                        </div>
                    </div>
                </div>

                {/* Expandable Dossier Region */}
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full px-8 py-6 bg-black text-white brutalist-border shadow-[6px_6px_0px_#4AC0E4] hover:shadow-[10px_10px_0px_#4AC0E4] transition-all group/btn mb-12"
                >
                    <span className="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-4">
                        <Terminal size={16} className="text-primary" /> 
                        {isExpanded ? "Close Technical Dossier" : "Open Technical Dossier"}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-12 pb-12">
                                {/* Strategic Insight */}
                                <div className="p-8 border-l-[4px] border-primary bg-primary/5">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2"><Sparkles size={14} /> Strategic Insight</h4>
                                    <p className="text-lg font-black uppercase leading-[1.3] text-black">
                                        {study.strategicInsight}
                                    </p>
                                </div>

                                {/* Roadmap */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-8 flex items-center gap-2"><Layers size={14} /> Project Roadmap</h4>
                                    <div className="space-y-4">
                                        {study.roadmap.map((step, sIdx) => (
                                            <div key={sIdx} className="grid grid-cols-12 gap-6 bg-white p-6 brutalist-border shadow-[4px_4px_0px_#000]">
                                                <div className="col-span-1 text-2xl font-heading font-black text-primary/40 italic">0{sIdx + 1}</div>
                                                <div className="col-span-11">
                                                    <p className="text-xs font-black uppercase tracking-widest text-black mb-1">{step.phase}</p>
                                                    <p className="text-[11px] font-medium text-black/60">{step.details}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-6 flex items-center gap-2"><Cpu size={14} /> The Arsenal</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {study.techStack.map(tech => (
                                            <span key={tech} className="px-4 py-2 bg-slate-100 brutalist-border text-[8px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#000]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-wrap gap-6 items-center">
                    <MagneticElement>
                        <a href="/contact" className="inline-flex items-center gap-8 bg-black text-white brutalist-border px-12 py-8 shadow-[10px_10px_0px_#4AC0E4] hover:shadow-[15px_15px_0px_#4AC0E4] transition-all group/btn">
                            <span className="text-sm font-black uppercase tracking-widest">Scale Similar Outcome</span>
                            <ArrowUpRight size={28} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                    </MagneticElement>

                    <div className="flex gap-4">
                        {study.links.website && (
                            <a href={study.links.website} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white brutalist-border flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-black hover:text-white transition-all">
                                <Globe size={24} />
                            </a>
                        )}
                        {study.links.instagram && (
                            <a href={study.links.instagram} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white brutalist-border flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-black hover:text-white transition-all">
                                <Instagram size={24} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
