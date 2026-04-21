"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, Target, Cpu, Sparkles, ArrowRight } from "lucide-react";
import { DecodeText } from "@/components/animations/ScrollChoreography";

const focusAreas = [
    {
        id: "vetting",
        title: "Strategic Vetting",
        description: "We only partner with brands that have the potential for 10x disruption. Our selection process is rigorous, ensuring absolute alignment.",
        icon: <Target className="w-10 h-10" />,
        color: "#F3E84A",
        accent: "#000",
        delay: 0.1
    },
    {
        id: "architecture",
        title: "Growth Architecture",
        description: "Building the technical and social infrastructure required for hyper-growth. No generic templates, only custom-coded performance engines.",
        icon: <Cpu className="w-10 h-10" />,
        color: "#A855F7",
        accent: "#FFF",
        delay: 0.2
    },
    {
        id: "deployment",
        title: "High-Frequency Scale",
        description: "Deploying rapid, data-backed growth sprints across search, social, and influencer networks to dominate market share.",
        icon: <Zap className="w-10 h-10" />,
        color: "#22C55E",
        accent: "#FFF",
        delay: 0.3
    },
    {
        id: "security",
        title: "Autonomous Resilience",
        description: "Ensuring your growth is secure. We integrate elite security protocols to protect your brand assets while you scale to the moon.",
        icon: <Shield className="w-10 h-10" />,
        color: "#4AC0E4",
        accent: "#000",
        delay: 0.4
    }
];

export default function GrowthModel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMarquee = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    return (
        <section ref={containerRef} id="framework" className="py-20 md:py-32 relative z-10 bg-black text-white overflow-hidden">
            {/* Background Marquee */}
            <div className="absolute top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 -rotate-6">
                <motion.div style={{ x: xMarquee }}>
                    <span className="text-[15rem] md:text-[30rem] font-heading font-black uppercase whitespace-nowrap">
                        THE MODEL • THE MODEL •
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mb-20 md:mb-32">
                    <div className="inline-flex items-center gap-4 mb-8 px-6 py-2 bg-primary text-black brutalist-border rounded-full rotate-2 shadow-[4px_4px_0px_#FFF]">
                        <Sparkles size={16} className="fill-current" />
                        <span className="font-black uppercase tracking-widest text-[10px] md:text-[12px]">Partnership Ecosystem</span>
                    </div>
                    <h2 className="text-[4rem] md:text-[10rem] font-heading font-black uppercase leading-[0.85] tracking-tighter mb-12">
                        THE STRATEGIC <br /> <span className="text-primary italic">FRAMEWORK</span>
                    </h2>
                    <p className="text-xl md:text-3xl font-bold uppercase tracking-tight text-white/70 max-w-2xl leading-tight">
                        We don't offer plans. We provide the architecture for absolute market dominance.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                    {focusAreas.map((area, idx) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: area.delay }}
                            className="group relative flex flex-col h-full"
                        >
                            <div className="p-8 md:p-12 brutalist-border border-white/20 bg-white/5 hover:bg-white/10 transition-all h-full flex flex-col relative group">
                                <div 
                                    className="w-16 h-16 md:w-20 md:h-20 brutalist-border flex items-center justify-center mb-10 group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: area.color, color: area.accent }}
                                >
                                    {area.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-heading font-black uppercase mb-6 tracking-tighter">
                                    <DecodeText text={area.title} />
                                </h3>
                                <p className="text-[11px] md:text-xs font-black uppercase tracking-wide leading-relaxed text-white/50 group-hover:text-white/80 transition-colors mb-auto">
                                    {area.description}
                                </p>
                                
                                <div className="mt-12 pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Learn Intel</span>
                                    <ArrowRight className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                            
                            {/* Decorative Shadow */}
                            <div className="absolute -bottom-2 -right-2 w-full h-full bg-white opacity-0 group-hover:opacity-5 -z-10 rounded-sm transition-all" />
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-32 flex justify-center">
                    <button className="px-16 py-8 bg-white text-black font-black uppercase tracking-widest text-xl brutalist-border shadow-[12px_12px_0px_#A855F7] hover:shadow-none hover:translate-x-3 hover:translate-y-3 transition-all flex items-center gap-6 group">
                        REQUEST ACCESS <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
