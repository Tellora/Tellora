"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Sparkles, Zap, Star, Globe, Rocket } from "lucide-react";
import { ScrollLine, HorizontalReveal, FloatingElement, MagneticElement, ParallaxText, ScrollConnector } from "@/components/animations/ScrollChoreography";

const caseStudies = [
    {
        title: "JS Wedding Services",
        impact: "Organic Dominance",
        description: "How we transformed a regional wedding boutique into a national digital authority using semantic SEO and high-performance WebGL design.",
        challenge: "Stuck in local search algorithms with poor visibility and low-quality lead capture.",
        execution: "Completely rebuilt the frontend architecture using Next.js and deployed a semantic content cluster targeting high-intent keywords.",
        tags: ["SEO", "Web Development", "UI/UX"],
        stats: [
            { label: "Search Vis.", value: "Tier 1" },
            { label: "CPA Reduction", value: "Massive" }
        ],
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1200&q=80",
        color: "#A855F7" // Primary
    },
    {
        title: "Astrology Light",
        impact: "Viral Expansion",
        description: "Architecting a viral social growth engine that fueled a subscription-based platform's expansion into new continental markets.",
        challenge: "Saturating existing audiences with fatigue leading to rapidly increasing Customer Acquisition Costs.",
        execution: "Deployed an aggressive TikTok structural testing framework, cutting losing creatives in 24 hours and scaling winning hooks exponentially.",
        tags: ["Social Media", "Paid Performance", "Scaling"],
        stats: [
            { label: "Scale", value: "Global" },
            { label: "Viral Impact", value: "High" }
        ],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
        color: "#F3E84A" // Accent
    },
    {
        title: "FinTech Pro",
        impact: "Frictionless Funnel",
        description: "Redesigning a high-intent financial services funnel using Next.js and complex state management for instantaneous decision results.",
        challenge: "60%+ drop-off rate at the final step of their multi-page application process due to slow load times.",
        execution: "Engineered a single-page localized application with brutalist UI patterns to establish extreme trust and zero wait times.",
        tags: ["Product Design", "Next.js", "Analytics"],
        stats: [
            { label: "Conv Rate", value: "Peak" },
            { label: "Load Time", value: "Instant" }
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        color: "#22C55E" // Success
    }
];

export default function CaseStudiesPage() {
    return (
        <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
            {/* Background Marquee Text */}
            <div className="fixed top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 rotate-12 z-0">
                <span className="text-[35rem] font-heading font-black uppercase whitespace-nowrap">
                    WINS • WINS • WINS •
                </span>
            </div>

            <Header />

            <main className="relative z-10">
                <PageHeader
                    breadcrumb="Proven Reliability"
                    title="SUCCESS BLUEPRINTS"
                    subtitle="We don't just deliver work; we deliver outcomes. Explore how our strategic interventions drive measurable market dominance."
                />

                <section className="py-40 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="space-y-[30rem]">
                            {caseStudies.map((study, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "circOut" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`group grid lg:grid-cols-12 gap-16 md:gap-32 items-center ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                                >
                                    {/* Image with Advanced Container */}
                                    <div className={`lg:col-span-7 relative ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                                        <div className="relative brutalist-card h-[600px] overflow-hidden group-hover:shadow-[20px_20px_0px_#000] transition-all duration-700">
                                            <img
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />

                                            <div className="absolute top-8 left-8 bg-black text-white brutalist-border px-6 py-2 rotate-2 shadow-[4px_4px_0px_#FFF]">
                                                <span className="text-xs font-black uppercase tracking-widest">{study.impact}</span>
                                            </div>

                                            <motion.div
                                                className="absolute bottom-10 right-10 flex gap-4 rotate-[-3deg]"
                                                animate={{ rotate: [-3, 3, -3] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            >
                                                <div className="bg-primary p-6 brutalist-border shadow-[6px_6px_0px_#000]">
                                                    <TrendingUp className="text-white" size={32} />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Background Ornaments */}
                                        <FloatingElement speed={-0.1} top="0" left="0">
                                            <div className="w-64 h-64 bg-accent/20 brutalist-border rotate-45 -z-10 blur-xl" />
                                        </FloatingElement>
                                    </div>

                                    {/* Content */}
                                    <div className={`lg:col-span-5 flex flex-col justify-center ${idx % 2 !== 0 ? "xl:order-1" : ""}`}>
                                        <div className="flex flex-wrap gap-4 mb-12">
                                            {study.tags.map((tag) => (
                                                <span key={tag} className="px-6 py-2 bg-black text-white brutalist-border text-[9px] font-black uppercase tracking-widest rotate-2 group-hover:rotate-0 transition-transform shadow-[4px_4px_0px_#4AC0E4]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h2 className="text-6xl md:text-[8rem] font-heading font-black text-black mb-10 leading-none tracking-tighter uppercase group-hover:text-primary transition-all duration-500 drop-shadow-[5px_5px_0px_rgba(0,0,0,0.1)]">
                                            {study.title}
                                        </h2>

                                        <p className="text-black font-black uppercase leading-tight opacity-60 mb-8 max-w-lg text-lg">
                                            {study.description}
                                        </p>

                                        <div className="bg-slate-50 p-6 brutalist-border mb-12 shadow-[4px_4px_0px_#000]">
                                            <div className="mb-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 flex items-center gap-2"><Zap size={10} /> The Challenge</h4>
                                                <p className="text-sm font-medium text-black/80">{study.challenge}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-success mb-2 flex items-center gap-2"><Sparkles size={10} /> The Execution</h4>
                                                <p className="text-sm font-medium text-black/80">{study.execution}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-12 mb-16 py-12 border-y-[4px] border-black relative overflow-hidden">
                                            {study.stats.map((stat, sIdx) => (
                                                <div key={sIdx} className="flex flex-col z-10">
                                                    <p className="text-4xl lg:text-5xl font-heading font-black text-black mb-3 leading-none group-hover:text-primary transition-colors italic shadow-white text-shadow-sm">{stat.value}</p>
                                                    <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.4em]">{stat.label}</p>
                                                </div>
                                            ))}

                                        </div>

                                        <MagneticElement>
                                            <a href="/contact" className="inline-flex items-center gap-8 bg-black text-white brutalist-border px-12 py-8 shadow-[10px_10px_0px_#4AC0E4] hover:shadow-[15px_15px_0px_#4AC0E4] hover:-translate-y-2 transition-all">
                                                <span className="text-sm font-black uppercase tracking-widest">View Intel</span>
                                                <ArrowUpRight size={28} />
                                            </a>
                                        </MagneticElement>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <ScrollLine />

                <div className="py-32 relative overflow-hidden bg-white">
                    <ParallaxText text="PROVEN RELIABILITY • MEASURABLE ROI • SCALABLE SOLUTIONS •" baseVelocity={-20} />
                </div>

                <section className="py-64 relative overflow-hidden bg-black text-white">
                    <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />
                    <FloatingElement speed={-0.2} top="20%" left="80%">
                        <div className="bg-primary p-12 brutalist-border rotate-12 shadow-[15px_15px_0px_#FFF] opacity-20">
                            <Rocket size={120} />
                        </div>
                    </FloatingElement>

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-accent brutalist-border w-40 h-40 flex items-center justify-center mx-auto mb-16 rotate-[-15deg] shadow-[10px_10px_0px_#FFF] group hover:rotate-0 transition-transform"
                        >
                            <Globe size={64} className="text-black group-hover:scale-110 transition-transform animate-pulse" />
                        </motion.div>
                        <h2 className="text-6xl md:text-[12rem] font-heading font-black text-white mb-16 leading-none tracking-tighter uppercase drop-shadow-[8px_8px_0px_#A855F7]">SCALE YOUR <br /><span className="text-primary italic underline decoration-accent decoration-[12px] underline-offset-12">GLOBAL REACH.</span></h2>
                        <MagneticElement>
                            <a href="/contact" className="px-20 py-10 bg-white text-black font-black brutalist-border shadow-[12px_12px_0px_#A855F7] hover:shadow-[20px_20px_0px_#A855F7] hover:-translate-y-2 inline-block uppercase tracking-widest text-sm transition-all">
                                INITIATE GROWTH
                            </a>
                        </MagneticElement>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
