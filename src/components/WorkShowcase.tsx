"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Trophy, Target, ExternalLink } from "lucide-react";
import { DecodeText, ParallaxImage } from "@/components/animations/ScrollChoreography";
import { caseStudies } from "@/data/case-studies";

export default function WorkShowcase() {
    const [filter, setFilter] = useState("all");
    
    // Mapping our case studies to the showcase format
    const projects = useMemo(() => {
        return caseStudies.map((study, index) => ({
            id: study.id,
            title: study.title,
            category: study.industry.toLowerCase(),
            displayCategory: study.industry,
            color: study.color,
            label: study.services[0], // Show the primary service
            image: study.image,
            badge: study.impact.toUpperCase(),
            rotate: index % 2 === 0 ? "-2deg" : "2deg"
        }));
    }, []);

    const categories = useMemo(() => {
        return ["all", ...Array.from(new Set(projects.map(p => p.category)))];
    }, [projects]);

    const filteredProjects = projects.filter(p => filter === "all" || p.category === filter).slice(0, 6);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMarquee = useTransform(scrollYProgress, [0, 1], [-200, 200]);
    const yTitle = useTransform(scrollYProgress, [0, 1], [80, -80]);

    return (
        <section ref={containerRef} id="showcase" className="py-32 relative z-10 bg-background border-t-[6px] border-black overflow-hidden gpu-accelerated">
            {/* Optimized Background Pattern */}
            <div className="absolute top-0 right-0 w-[400px] h-full bg-transparent halftone-overlay opacity-5 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-24 gap-12">
                    <motion.div style={{ y: yTitle }} className="relative">
                        <div className="inline-flex items-center gap-4 px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-[-1deg] mb-8 shadow-[6px_6px_0px_#A855F7]">
                            <Trophy size={14} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Client Wins</span>
                        </div>
                        <h2 className="text-[5rem] md:text-[10rem] font-heading font-black leading-[0.8] tracking-tighter uppercase relative z-10">
                            <DecodeText text="THE" /> <br /> <span className="text-secondary italic"><DecodeText text="RESULTS" /></span>
                        </h2>
                    </motion.div>

                    {/* Optimized Filter Navigation */}
                    <div className="flex flex-wrap gap-4">
                        {categories.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-8 py-4 brutalist-border text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:translate-y-[-4px] active:translate-y-0.5 relative ${filter === f ? 'bg-primary text-white shadow-[6px_6px_0px_#000]' : 'bg-white text-black shadow-[4px_4px_0px_#000]'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href="/case-studies"
                                className="block"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -10, zIndex: 10 }}
                                    className="group relative aspect-[4/5] brutalist-card overflow-hidden cursor-crosshair bg-white gpu-accelerated h-full"
                                >
                                    <div className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100 mix-blend-multiply">
                                        <ParallaxImage
                                            src={project.image}
                                            alt={project.title}
                                        />
                                    </div>

                                    <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="px-4 py-2 bg-accent text-black font-black uppercase text-[10px] tracking-widest brutalist-border shadow-[4px_4px_0px_#000] rotate-6">
                                            {project.badge}
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-[1.5px] bg-primary" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                                                    {project.displayCategory} • {project.label}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-5xl font-heading font-black text-white uppercase leading-[0.9] tracking-tighter">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-white pt-4">
                                                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                    <Target size={14} /> VIEW CASE STUDY
                                                </span>
                                                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-24 flex justify-center">
                    <Link href="/case-studies">
                        <button className="group flex items-center gap-4 md:gap-8 bg-black text-white brutalist-border px-8 md:px-16 py-4 md:py-8 shadow-[6px_6px_0px_#4AC0E4] md:shadow-[10px_10px_0px_#4AC0E4] hover:shadow-[15px_15px_0px_#4AC0E4] hover:-translate-y-2 transition-all">
                            <span className="text-[10px] md:text-sm font-black uppercase tracking-widest">Explore Portfolio</span>
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Optimized Background Marquee */}
            <motion.div
                style={{ x: xMarquee }}
                className="absolute bottom-6 left-0 w-full opacity-[0.02] mix-blend-overlay pointer-events-none select-none z-0 gpu-accelerated"
            >
                <span className="text-[20vw] font-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap block translate-y-1/2">
                    REVENUE GROWTH • MARKET DOMINATION •
                </span>
            </motion.div>
        </section>
    );
}
