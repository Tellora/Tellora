"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { 
    Search, Share2, Monitor, PenTool, ArrowRight, BarChart3, 
    Lightbulb, Zap, Sparkles, Star, Database, Cpu, Target, 
    CheckCircle2, Globe, Shield, Rocket, Layout, Code, Play, Users, Speaker
} from "lucide-react";
import { GrowthDashboard } from "@/components/GrowthDashboard";
import { ScrollLine, HorizontalReveal, FloatingElement, MagneticElement, ScrollConnector } from "@/components/animations/ScrollChoreography";
import { getServices, Service } from "@/lib/store";

// Icon mapping helper
const IconMap: Record<string, React.ReactNode> = {
    Search: <Search size={24} />,
    BarChart3: <BarChart3 size={24} />,
    Share2: <Share2 size={24} />,
    Monitor: <Monitor size={24} />,
    PenTool: <PenTool size={24} />,
    Lightbulb: <Lightbulb size={24} />,
    Database: <Database size={24} />,
    Cpu: <Cpu size={24} />,
    Target: <Target size={24} />,
    Globe: <Globe size={24} />,
    Shield: <Shield size={24} />,
    Rocket: <Rocket size={24} />,
    Layout: <Layout size={24} />,
    Code: <Code size={24} />,
    Play: <Play size={24} />,
    Users: <Users size={24} />,
    Speaker: <Speaker size={24} />
};

const defaultServices: Service[] = [
    {
        id: "1",
        title: "SEO Optimization",
        description: "Dominate search engine rankings with semantic high-frequency SEO, programmatic content strategies, and aggressive technical architecture audits that force algorithms to reward your brand.",
        category: "Organic Growth",
        icon: "Search",
        color: "#F3E84A",
        status: "Published",
        features: ["Semantic Architecture Audits", "Programmatic Keyword Matrix", "High-Authority Link Velocity", "Core Web Vitals Optimization"]
    },
    {
        id: "2",
        title: "Social Media",
        description: "Build an impenetrable brand cult. We deploy high-velocity content frameworks that turn passive scrollers into aggressive brand advocates and loyal customers.",
        category: "Organic Growth",
        icon: "Share2",
        color: "#FF3366",
        status: "Published",
        features: ["Viral Content Mechanics", "Community Sentiment Cultivation", "Algorithmic Trend Hacking", "Brand Persona Engineering"]
    },
    {
        id: "3",
        title: "Web Design",
        description: "We don't build websites; we engineer conversion-forced digital ecosystems using Next.js and brutalist motion design to instantly capture and convert elite traffic.",
        category: "Digital Experience",
        icon: "Monitor",
        color: "#4AC0E4",
        status: "Published",
        features: ["Next.js Performance Architecture", "Conversion Rate Optimization (CRO)", "WebGL & Motion Physics", "Headless Commerce Solutions"]
    },
    {
        id: "4",
        title: "Performance Ads",
        description: "Deploy machine-learning optimized PPC campaigns across Meta, Google, and TikTok. We aggressively test variants to scale winning formulas and eliminate wasted ad spend.",
        category: "Paid Acquisition",
        icon: "Speaker",
        color: "#A855F7",
        status: "Published",
        features: ["Predictive Bidding Models", "Omnichannel Ad Sync", "Multivariate Creative Testing", "Advanced Pixel Tracking"]
    },
    {
        id: "5",
        title: "Content Production",
        description: "Command attention with hyper-visual narratives, copy that reads like a weapon, and cinematic micro-content designed for infinite scroll retention.",
        category: "Digital Experience",
        icon: "PenTool",
        color: "#22C55E",
        status: "Published",
        features: ["Cinematic Short-Form Video", "Direct-Response Copywriting", "3D Motion Graphics", "SEO-Driven Editorial"]
    },
    {
        id: "6",
        title: "Influencer Scaling",
        description: "Leverage our private network of macro and micro-creators. We broker algorithmic resonance through authentic human synergy to scale your trust instantly.",
        category: "Paid Acquisition",
        icon: "Users",
        color: "#FF9900",
        status: "Published",
        features: ["Creator Network Arbitration", "Performance-Based Payouts", "UGC Asset Generation", "Niche Community Penetration"]
    }
];

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServices().then((data) => {
            if (data && data.length > 0) {
                setServices(data);
            } else {
                setServices(defaultServices);
            }
            setLoading(false);
        });
    }, []);

    // Group services by category
    const categories = Array.from(new Set(services.map(s => s.category)));
    const groupedServices = categories.map(cat => ({
        category: cat,
        items: services.filter(s => s.category === cat)
    }));

    if (loading) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
            {/* Background Marquee Text */}
            <div className="fixed top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 -rotate-12 z-0">
                <span className="text-[35rem] font-heading font-black uppercase whitespace-nowrap">
                    SERVICES • SERVICES • SERVICES •
                </span>
            </div>

            <Header />

            <main className="relative z-10">
                <PageHeader
                    breadcrumb="Our Expertise"
                    title="GROWTH SYSTEMS"
                    subtitle="We don't offer services; we architect end-to-end growth ecosystems tailored to your unique market challenges."
                />

                <section className="pb-40 pt-20">
                    <div className="container mx-auto px-6">
                        <HorizontalReveal>
                            <div className="grid lg:grid-cols-2 gap-20 items-center brutalist-card bg-white p-12 md:p-24 shadow-[20px_20px_0px_#000] overflow-hidden group">
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="h-6 w-12 bg-primary brutalist-border shadow-[4px_4px_0px_#000]" />
                                        <span className="text-black font-black tracking-[0.4em] uppercase text-[12px]">Tellora Intelligence</span>
                                    </div>
                                    <h2 className="text-5xl md:text-8xl font-heading font-black text-black mb-10 leading-none tracking-tighter uppercase underline decoration-primary decoration-[8px] underline-offset-8">DATA-BACKED <br /> <span className="italic">SMARTS</span></h2>
                                    <p className="text-black font-black uppercase leading-tight text-xl mb-12 max-w-lg opacity-60">
                                        Our proprietary growth framework uses thousands of data points to predict market shifts before they happen. We don't just react; we anticipate.
                                    </p>

                                    <div className="grid gap-6">
                                        {["Predictive Revenue Modeling", "Behavioral Cohort Analysis", "Competitor Sentiment Tracking"].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.15 }}
                                                className="flex items-center gap-6 group/item"
                                            >
                                                <div className="w-12 h-12 bg-black text-white brutalist-border flex items-center justify-center group-hover/item:bg-primary group-hover/item:rotate-12 transition-all shadow-[4px_4px_0px_#4AC0E4]">
                                                    <Zap size={14} className="fill-current" />
                                                </div>
                                                <span className="font-black uppercase tracking-widest text-xs">{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="p-8 brutalist-border bg-black/5 rotate-1 group-hover:rotate-0 transition-transform shadow-[15px_15px_0px_#000]">
                                        <GrowthDashboard />
                                    </div>
                                    <motion.div
                                        className="absolute -top-10 -right-10 hidden lg:block"
                                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <div className="bg-accent p-6 brutalist-border rounded-full shadow-[6px_6px_0px_#000]">
                                            <Sparkles className="text-black" size={32} />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </HorizontalReveal>
                    </div>
                </section>

                <section className="py-32 relative bg-black text-white overflow-hidden border-y-[6px] border-primary">
                    <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="mb-20">
                            <div className="inline-flex items-center gap-4 mb-6 px-6 py-2 bg-white text-black brutalist-border rounded-full rotate-2 shadow-[4px_4px_0px_#A855F7]">
                                <Sparkles size={14} className="text-primary fill-current" />
                                <span className="font-black uppercase tracking-widest text-[10px]">Standard Operating Procedure</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase mb-6 leading-none">
                                The Deployment <br /> <span className="text-primary italic">Protocol</span>
                            </h2>
                            <p className="max-w-2xl text-white/60 font-medium text-lg leading-relaxed">
                                Standard agencies guess. We execute a rigorous, battle-tested operating procedure to guarantee zero wasted ad spend, surgical precision in development, and maximum architectural stability.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: "01", title: "Forensic Audit", desc: "A ruthless breakdown of your entire tech stack, ad accounts, and SEO architecture to find immediate leaks." },
                                { step: "02", title: "Growth Blueprint", desc: "We map out the exact predictive mathematical model and technical roadmap required to hit your target ROI." },
                                { step: "03", title: "Hard Execution", desc: "Our team builds the Next.js landing pages, creates the brutalist motion art, and launches the live ad campaigns." },
                                { step: "04", title: "Infinite Scale", desc: "Daily multivariate testing. We cut losing variants aggressively and pour budget directly into winning formulas." }
                            ].map((phase, i) => (
                                <div key={i} className="p-8 brutalist-card !bg-[#111] hover:bg-primary transition-colors group shadow-[8px_8px_0px_#A855F7] md:hover:-translate-y-4 duration-300">
                                    <div className="text-4xl font-heading font-black text-white/20 mb-6 group-hover:text-white transition-colors">{phase.step}</div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{phase.title}</h3>
                                    <p className="text-xs font-medium text-white/60 group-hover:text-white uppercase tracking-widest leading-relaxed">
                                        {phase.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ScrollConnector />

                {groupedServices.map((group, idx) => (
                    <section key={idx} className="py-40 relative">
                        <div className="container mx-auto px-6">
                            <div className="mb-32">
                                <div className="inline-flex items-center gap-4 mb-6 px-6 py-2 bg-black text-white brutalist-border rounded-full -rotate-1 shadow-[4px_4px_0px_#FFD700]">
                                    <Star size={14} className="text-accent fill-current" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">{group.category} Expertise</span>
                                </div>
                                <h2 className="text-6xl md:text-[10rem] font-heading font-black text-black leading-none tracking-tighter uppercase whitespace-normal">
                                    {group.category} <br /> <span className="text-primary italic">Solutions</span>
                                </h2>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-12">
                                {group.items.map((service, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.12, duration: 0.8 }}
                                        viewport={{ once: true }}
                                        className="brutalist-card p-12 bg-white flex flex-col h-full group hover:shadow-[15px_15px_0px_#000]"
                                    >
                                        <div
                                            className="w-24 h-24 brutalist-border flex items-center justify-center mb-12 rotate-[-3deg] group-hover:rotate-0 transition-all shadow-[8px_8px_0px_#000]"
                                            style={{ backgroundColor: service.color }}
                                        >
                                            <div className="text-black group-hover:scale-125 transition-transform duration-500">
                                                {IconMap[service.icon] || <Zap size={24} />}
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-heading font-black text-black mb-8 leading-none uppercase tracking-tight">
                                            {service.title}
                                        </h3>

                                        <p className="text-black font-black uppercase leading-tight opacity-60 mb-12 flex-grow text-sm">
                                            {service.description}
                                        </p>

                                        <div className="space-y-4 mb-14">
                                            {service.features.map((feature, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-4">
                                                    <div className="w-3 h-3 bg-black brutalist-border rotate-45" />
                                                    <span className="font-black uppercase tracking-widest text-[10px] opacity-80">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto">
                                            <a href="/contact" className="inline-flex items-center gap-4 text-black font-black uppercase tracking-widest text-xs group-hover:text-primary transition-colors">
                                                <span>Deploy Logic</span>
                                                <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        {idx !== groupedServices.length - 1 && <ScrollConnector />}
                    </section>
                ))}

                <ScrollLine />

                <section className="py-64 relative bg-black text-white">
                    <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="w-32 h-32 brutalist-border bg-primary flex items-center justify-center mb-16 rotate-12 shadow-[10px_10px_0px_#FFF] group hover:rotate-0 transition-transform"
                            >
                                <Zap size={48} className="fill-current group-hover:scale-120 transition-transform" />
                            </motion.div>
                            <span className="text-primary font-black tracking-[0.6em] uppercase text-xs mb-10 block">Global Dominance Matrix</span>
                            <h2 className="text-6xl md:text-[12rem] font-heading font-black text-white mb-16 leading-none tracking-tighter uppercase drop-shadow-[10px_10px_0px_#A855F7]">READY TO <br /><span className="italic underline decoration-accent decoration-[12px] underline-offset-12">DOMINATE?</span></h2>
                            <p className="text-white font-black uppercase leading-tight opacity-60 max-w-2xl mx-auto mb-20 text-xl">Our growth stacks are designed for maximum impact with zero friction. Let's build your dominance today.</p>
                            <MagneticElement>
                                <a href="/contact" className="px-16 py-10 bg-white text-black font-black brutalist-border shadow-[12px_12px_0px_#A855F7] hover:shadow-[18px_18px_0px_#A855F7] hover:-translate-y-2 inline-block uppercase tracking-widest text-sm transition-all">
                                    INITIALIZE AUDIT
                                </a>
                            </MagneticElement>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
