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
        description: "Dominate search engine rankings with advanced SEO, custom content strategies, and technical website audits that help your brand rank higher on search engines.",
        category: "Organic",
        icon: "Search",
        color: "#F3E84A",
        status: "Published",
        features: ["Technical SEO Audits", "Keyword Strategy", "Search Visibility & Link Building", "Website Speed Optimization"]
    },
    {
        id: "2",
        title: "Social Media",
        description: "Build a strong online community. We create engaging content that turns passive scrollers into passionate brand advocates and loyal customers.",
        category: "Organic",
        icon: "Share2",
        color: "#FF3366",
        status: "Published",
        features: ["Social Content Strategy", "Community Engagement", "Market & Audience Analysis", "Brand Identity Design"]
    },
    {
        id: "3",
        title: "Web Design",
        description: "We design high-converting websites using fast, interactive page designs to capture and convert incoming visitors.",
        category: "Digital",
        icon: "Monitor",
        color: "#4AC0E4",
        status: "Published",
        features: ["Fast Loading Speed", "Conversion Design", "Interactive Web Design", "E-Commerce Integrations"]
    },
    {
        id: "4",
        title: "Performance Ads",
        description: "Deploy optimized Ad campaigns across Meta, Google, and TikTok. We continuously test variations to scale winning formulas and eliminate wasted ad spend.",
        category: "Paid",
        icon: "Speaker",
        color: "#A855F7",
        status: "Published",
        features: ["Targeted Advertising", "Multi-Channel Ad Campaigns", "A/B Testing & Ad Optimization", "Ad Performance Tracking"]
    },
    {
        id: "5",
        title: "Content Production",
        description: "Command attention with engaging visual content, copywriting that drives results, and engaging micro-content designed for high viewer retention.",
        category: "Digital",
        icon: "PenTool",
        color: "#22C55E",
        status: "Published",
        features: ["Short-Form Video Production", "Persuasive Writing", "Custom Graphics & Video", "SEO Blog Writing"]
    },
    {
        id: "6",
        title: "Influencer Scaling",
        description: "Leverage our private network of creators. We create authentic connections through influencer partnerships to scale your brand trust instantly.",
        category: "Paid",
        icon: "Users",
        color: "#FF9900",
        status: "Published",
        features: ["Creator Network Management", "Performance-Based Partnerships", "Customer & Creator Videos", "Targeted Audience Reach"]
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
                    breadcrumb="Services"
                    title="OUR SERVICES"
                    subtitle="We showcase custom marketing and growth solutions tailored to your unique business challenges."
                />

                <section className="py-24 relative bg-background">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {services.map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.8 }}
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
                                            <span>Get Started</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

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
                            <span className="text-primary font-black tracking-[0.6em] uppercase text-xs mb-10 block">Let&apos;s Grow Your Brand</span>
                            <h2 className="text-6xl md:text-[12rem] font-heading font-black text-white mb-16 leading-none tracking-tighter uppercase drop-shadow-[10px_10px_0px_#A855F7]">READY TO <br /><span className="italic underline decoration-accent decoration-[12px] underline-offset-12">GROW?</span></h2>
                            <p className="text-white font-black uppercase leading-tight opacity-60 max-w-2xl mx-auto mb-20 text-xl">Our marketing solutions are designed for maximum impact. Let&apos;s scale your business today.</p>
                            <MagneticElement>
                                <a href="/contact" className="px-16 py-10 bg-white text-black font-black brutalist-border shadow-[12px_12px_0px_#A855F7] hover:shadow-[18px_18px_0px_#A855F7] hover:-translate-y-2 inline-block uppercase tracking-widest text-sm transition-all">
                                    GET FREE AUDIT
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
