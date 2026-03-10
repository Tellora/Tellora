"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Trophy, Target } from "lucide-react";
import { DecodeText, ParallaxImage } from "@/components/animations/ScrollChoreography";

const projects = [
    {
        id: 1,
        title: "JS Wedding",
        category: "web",
        color: "#F3E84A",
        label: "Web & SEO",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80",
        badge: "CONV: +120%",
        rotate: "-2deg"
    },
    {
        id: 2,
        title: "Astrology Light",
        category: "social",
        color: "#A855F7",
        label: "Social Scale",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
        badge: "VIRAL IMPACT",
        rotate: "3deg"
    },
    {
        id: 3,
        title: "Smile Center",
        category: "web",
        color: "#22C55E",
        label: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        badge: "ROAS: 12.5x",
        rotate: "-1deg"
    },
    {
        id: 4,
        title: "Safe Eats",
        category: "web",
        color: "#FFFFFF",
        label: "Product Strategy",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        badge: "BRAND SCALE",
        rotate: "2deg"
    },
    {
        id: 5,
        title: "Tech Sol",
        category: "seo",
        color: "#FF4D6D",
        label: "Performance",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        badge: "SEO DOMINANCE",
        rotate: "-3deg"
    },
    {
        id: 6,
        title: "Glow Beauty",
        category: "social",
        color: "#4AC0E4",
        label: "Branding",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
        badge: "MARKET LEAD",
        rotate: "1.5deg"
    }
];

export default function WorkShowcase() {
    const [filter, setFilter] = useState("all");
    const filteredProjects = projects.filter(p => filter === "all" || p.category.includes(filter));

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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Personalised Choice</span>
                        </div>
                        <h2 className="text-[5rem] md:text-[10rem] font-heading font-black leading-[0.8] tracking-tighter uppercase relative z-10">
                            <DecodeText text="OUR" /> <br /> <span className="text-secondary italic"><DecodeText text="WINS" /></span>
                        </h2>
                    </motion.div>

                    {/* Optimized Filter Navigation */}
                    <div className="flex flex-wrap gap-4">
                        {["all", "web", "seo", "social"].map((f) => (
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -10, zIndex: 10 }}
                                className="group relative aspect-[4/5] brutalist-card overflow-hidden cursor-crosshair bg-white gpu-accelerated"
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

                                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-[1.5px] bg-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                                                {project.label}
                                            </span>
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-heading font-black text-white uppercase leading-[0.9] tracking-tighter">
                                            {project.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-white pt-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <Target size={14} /> OPEN INTEL
                                            </span>
                                            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Optimized Background Marquee */}
            <motion.div
                style={{ x: xMarquee }}
                className="absolute bottom-6 left-0 w-full opacity-[0.02] mix-blend-overlay pointer-events-none select-none z-0 gpu-accelerated"
            >
                <span className="text-[20vw] font-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap block translate-y-1/2">
                    PROOF OF CONCEPT • PROOF OF CONCEPT •
                </span>
            </motion.div>
        </section>
    );
}
