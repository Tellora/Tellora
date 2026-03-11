"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Search, Share2, Monitor, PenTool, ArrowRight, BarChart3, Lightbulb, Zap, Sparkles, Star } from "lucide-react";
import { GrowthDashboard } from "@/components/GrowthDashboard";
import { ScrollLine, HorizontalReveal, FloatingElement, MagneticElement, ScrollConnector } from "@/components/animations/ScrollChoreography";

const allServices = [
    {
        category: "Traffic & Visibility",
        items: [
            {
                title: "SEO Optimization",
                description: "Drive compounding organic growth with technical SEO, semantic content strategies, and high-authority link building that dominates SERPs.",
                icon: <Search size={24} />,
                features: ["Semantic Content Mapping", "Technical Core Web Vitals", "Authority Network Growth"],
                color: "#A855F7" // Primary
            },
            {
                title: "Paid Search (PPC)",
                description: "Maximize ROAS through hyper-targeted Google & Bing Ads campaigns utilizing machine learning bidding and expert keyword management.",
                icon: <BarChart3 size={24} />,
                features: ["ML Bidding Optimization", "Competitor Conquesting", "Search Query Mining"],
                color: "#F3E84A" // Accent
            },
            {
                title: "Social Media Ads",
                description: "Engage and convert across Meta, LinkedIn, and TikTok with high-impact creative and precision demographic targeting.",
                icon: <Share2 size={24} />,
                features: ["Dynamic Creative Testing", "Lookalike Audience Scaling", "Retargeting Funnels"],
                color: "#22C55E" // Success
            }
        ]
    },
    {
        category: "Creative & Development",
        items: [
            {
                title: "High-End Web Design",
                description: "Award-winning, conversion-focused websites built with modern frameworks like Next.js for insane speed and 3D interactivity.",
                icon: <Monitor size={24} />,
                features: ["Next.js Performance", "3D WebGL Integration", "Conversion Rate Optimization"],
                color: "#F3E84A"
            },
            {
                title: "Content Marketing",
                description: "Building brand authority through editorial-grade content that educates your audience and positions you as a market leader.",
                icon: <PenTool size={24} />,
                features: ["Thought Leadership Blogs", "Whitepaper Production", "Email Automation Strategy"],
                color: "#A855F7"
            },
            {
                title: "Branding & Identity",
                description: "Crafting distinct, unignorable brand identities that resonate with your target audience and stand the test of time.",
                icon: <Lightbulb size={24} />,
                features: ["Visual Identity Systems", "Brand Positioning", "Market Differentiation"],
                color: "#22C55E"
            }
        ]
    }
];

export default function ServicesPage() {
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
                <h1 className="sr-only">Our Digital Growth Services | SEO, PPC, and High-End Web Design by Tellora Media</h1>
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
                                    {/* Stickers */}
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

                <ScrollConnector />

                {allServices.map((group, idx) => (
                    <section key={idx} className="py-40 relative">
                        <div className="container mx-auto px-6">
                            <div className="mb-32">
                                <div className="inline-flex items-center gap-4 mb-6 px-6 py-2 bg-black text-white brutalist-border rounded-full -rotate-1 shadow-[4px_4px_0px_#FFD700]">
                                    <Star size={14} className="text-accent fill-current" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">{group.category} Expertise</span>
                                </div>
                                <h2 className="text-6xl md:text-[10rem] font-heading font-black text-black leading-none tracking-tighter uppercase whitespace-normal">{group.category === "Traffic & Visibility" ? "Traffic & Organic Domination" : "Creative & Technical Innovation"} <br /> <span className="text-primary italic">Solutions</span></h2>
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
                                                {service.icon}
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
                        {idx === 0 && <ScrollConnector />}
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
