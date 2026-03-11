"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Share2, Monitor, Speaker, PenTool, Users, ArrowRight, Sparkles, Zap } from "lucide-react";

const services = [
    {
        title: "SEO Optimization",
        description: "Dominate search rankings with data-backed keyword strategies and technical audits.",
        icon: <Search className="w-8 h-8" />,
        color: "#FFFFFF",
        accent: "#A855F7",
        rotate: "-1deg"
    },
    {
        title: "Social Media",
        description: "Build a loyal community with engaging content strategies and influencer partnerships.",
        icon: <Share2 className="w-8 h-8" />,
        color: "#F3E84A",
        accent: "#000000",
        rotate: "1deg"
    },
    {
        title: "Web Design",
        description: "Stunning, high-performance websites optimized for conversion, speed, and user experience.",
        icon: <Monitor className="w-8 h-8" />,
        color: "#22C55E",
        accent: "#FFFFFF",
        rotate: "-1.5deg"
    },
    {
        title: "Performance",
        description: "Maximize ROI with precision-targeted PPC campaigns and continuous optimization.",
        icon: <Speaker className="w-8 h-8" />,
        color: "#A855F7",
        accent: "#FFFFFF",
        rotate: "1.2deg"
    },
    {
        title: "Content",
        description: "Tell your brand story with compelling narratives that drive engagement and trust.",
        icon: <PenTool className="w-8 h-8" />,
        color: "#FFFFFF",
        accent: "#22C55E",
        rotate: "-0.8deg"
    },
    {
        title: "Influencers",
        description: "Leverage authentic voices to amplify your brand message to new audiences.",
        icon: <Users className="w-8 h-8" />,
        color: "#000000",
        accent: "#F3E84A",
        rotate: "2deg"
    }
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const xMarquee = useTransform(scrollYProgress, [0, 1], [100, -300]);

    return (
        <section ref={containerRef} id="services" className="py-20 md:py-32 relative z-10 bg-background overflow-hidden border-t-[4px] border-black">
            {/* Background Marquee */}
            <div className="absolute top-1/2 left-0 w-full opacity-[0.02] mix-blend-overlay pointer-events-none select-none -translate-y-1/2 z-0 overflow-hidden">
                <motion.div
                    style={{ x: xMarquee }}
                >
                    <span className="text-[15rem] md:text-[30rem] font-heading font-black uppercase whitespace-nowrap">
                        WHAT WE DO • WHAT WE DO •
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <motion.div style={{ y: yTitle }} className="max-w-3xl">
                        <div className="inline-flex items-center gap-4 mb-6 px-4 md:px-6 py-2 bg-black text-white brutalist-border rounded-full -rotate-2">
                            <Zap size={14} className="text-primary fill-current w-3 h-3 md:w-4 md:h-4" />
                            <span className="font-black uppercase tracking-widest text-[8px] md:text-[10px]">Neural Growth Engines</span>
                        </div>
                        <h2 className="heading-massive !text-5xl sm:!text-7xl md:!text-9xl tracking-tighter">
                            CORE <br className="hidden md:block" /> <span className="text-primary italic">SKILLS</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col items-start md:items-end text-left md:text-right">
                        <p className="max-w-xs font-black uppercase text-xs md:text-sm leading-tight mb-8">
                            We don't do boring. We do high-impact, Gen-Z operated digital scale.
                        </p>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 md:w-16 md:h-16 rounded-full brutalist-border flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <ArrowRight className="rotate-180 w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button className="w-12 h-12 md:w-16 md:h-16 rounded-full brutalist-border bg-primary text-white flex items-center justify-center brutalist-shadow-sm hover:translate-y-[-2px] transition-all">
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, idx) => (
                        <Link
                            key={idx}
                            href="/services"
                            className="block h-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30, rotate: 0 }}
                                whileInView={{ opacity: 1, y: 0, rotate: service.rotate }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{
                                    scale: 1.02,
                                    rotate: "0deg",
                                    zIndex: 20
                                }}
                                className="p-8 md:p-10 brutalist-card h-full flex flex-col group relative cursor-pointer"
                                style={{
                                    background: service.color,
                                    color: service.color === "#000000" ? "#FFF" : "#000"
                                }}
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles size={24} style={{ color: service.accent }} />
                                </div>

                                <div
                                    className="w-12 h-12 md:w-16 md:h-16 brutalist-border flex items-center justify-center mb-6 md:mb-8 transition-all group-hover:scale-110"
                                    style={{ background: service.accent, color: service.color === "#000000" ? "#000" : "#FFF" }}
                                >
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-heading font-black uppercase mb-4 tracking-tighter">
                                    {service.title}
                                </h3>
                                <p className="font-black text-xs md:text-sm uppercase leading-relaxed mb-auto opacity-80">
                                    {service.description}
                                </p>

                                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t-[2px] border-current flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-primary transition-colors">Launch Project</span>
                                    <div className="w-8 h-8 rounded-full brutalist-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
