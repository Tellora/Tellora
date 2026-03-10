"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Activity, Terminal, Database, Zap, Sparkles } from "lucide-react";
import { DecodeText } from "@/components/animations/ScrollChoreography";
import { AdvancedCard } from "@/components/animations/AdvancedCard";
import Magnetic from "@/components/animations/Magnetic";

export default function AnimatedFeatures() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <section
            id="features"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="py-32 relative z-10 bg-black text-white border-y-[6px] border-primary overflow-hidden w-full cursor-crosshair"
        >
            {/* Background Texture Drop */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none noise-overlay" />

            {/* Interactive Torch Reveal */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-screen"
                animate={{
                    background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.45), transparent 60%)`
                }}
                transition={{ type: "tween", ease: "circOut", duration: 0.1 }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 md:mb-24">
                    <div className="text-white">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white text-black brutalist-border rounded-full rotate-[-2deg] mb-6 shadow-[4px_4px_0px_#F3E84A] hover:rotate-2 transition-transform">
                            <Zap size={16} className="text-primary fill-current" />
                            <span className="font-black uppercase tracking-widest text-[10px]">Ecosystem Infrastructure</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
                            <DecodeText text="PERFORMANCE" /> <br />
                            <span className="text-primary italic"><DecodeText text="ENGINE" /></span>
                        </h2>
                    </div>

                    <Magnetic>
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[4px] border-dashed border-primary flex items-center justify-center animate-spin-slow text-white group cursor-pointer bg-black/50 backdrop-blur-sm">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent brutalist-border flex flex-col items-center justify-center animate-none group-hover:bg-primary transition-colors text-black shadow-[4px_4px_0px_#000]">
                                <Sparkles size={24} className="mb-1" />
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Deploy Map</span>
                            </div>
                        </div>
                    </Magnetic>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* BENTO 1: Data Analytics */}
                    <div className="lg:col-span-2 relative group h-full">
                        <AdvancedCard className="h-full bg-white/5 backdrop-blur-md !border-[2px] !border-primary/30 text-white min-h-[350px] md:min-h-[400px]">
                            <div className="p-10 md:p-14 h-full flex flex-col relative z-10 w-full">
                                <div className="absolute top-8 right-8 text-primary opacity-50">
                                    <Activity size={64} className="animate-pulse" />
                                </div>
                                <div className="mt-auto">
                                    <div className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4">Module_01</div>
                                    <h3 className="text-4xl md:text-5xl font-heading font-black uppercase mb-4 tracking-tighter leading-none">
                                        Predictive Analytics
                                    </h3>
                                    <p className="text-xs md:text-sm uppercase tracking-widest leading-relaxed max-w-md opacity-70">
                                        Data-driven neural pathways that forecast revenue trajectories with absolute mathematical precision.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-tl from-primary/30 to-transparent mix-blend-overlay rounded-br-[3rem] pointer-events-none" />
                        </AdvancedCard>
                    </div>

                    {/* BENTO 2: Automation */}
                    <div className="relative group h-full">
                        <AdvancedCard className="h-full bg-primary !border-none text-white min-h-[350px] md:min-h-[400px] shadow-[8px_8px_0px_#000]">
                            <div className="p-10 md:p-14 h-full flex flex-col items-start justify-end relative z-10 overflow-hidden w-full">
                                <div className="absolute -top-10 -right-10 w-48 h-48 border-[12px] border-black/10 rounded-full group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" />

                                <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black mb-4 bg-white px-3 py-1 brutalist-border shadow-[4px_4px_0px_#000]">Module_02</div>
                                <h3 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter text-black leading-none">
                                    Autonomous Scale
                                </h3>

                                <Magnetic>
                                    <button className="mt-8 w-14 h-14 bg-black rounded-full flex items-center justify-center text-white brutalist-border shadow-[4px_4px_0px_#FFF] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#000] transition-colors pointer-events-auto">
                                        <ArrowRight size={24} className="-rotate-45 group-hover/button:-rotate-0 transition-transform" />
                                    </button>
                                </Magnetic>
                            </div>
                        </AdvancedCard>
                    </div>

                    {/* BENTO 3: Conversion Architect */}
                    <div className="relative group h-full">
                        <AdvancedCard className="h-full bg-[#111] !border-[2px] !border-white/10 text-white min-h-[350px] md:min-h-[400px]">
                            <div className="p-10 md:p-14 h-full flex flex-col justify-end relative z-10 w-full group-hover:bg-[#1a1a1a] transition-colors duration-500 rounded-[3rem]">
                                <Terminal size={48} className="text-secondary mb-auto mt-4 group-hover:rotate-12 transition-transform duration-500" />
                                <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-secondary mb-4 mt-8">Module_03</div>
                                <h3 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tighter leading-none">
                                    Conversion Architect
                                </h3>
                                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none rounded-[3rem]" />
                            </div>
                        </AdvancedCard>
                    </div>

                    {/* BENTO 4: Omnichannel Sync */}
                    <div className="lg:col-span-2 relative group h-full">
                        <AdvancedCard className="h-full bg-accent !border-none text-black min-h-[350px] md:min-h-[400px] overflow-hidden shadow-[8px_8px_0px_#000]">
                            <div className="p-10 md:p-14 h-full flex flex-col lg:flex-row items-start lg:items-end justify-between relative z-10 gap-8 w-full">
                                <div className="max-w-md mt-auto">
                                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white bg-black px-3 py-1 w-max brutalist-border mb-4 shadow-[4px_4px_0px_#FFF]">Module_04</div>
                                    <h3 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-4 leading-none">
                                        Omnichannel Sync
                                    </h3>
                                    <p className="text-xs md:text-sm font-black uppercase tracking-widest leading-relaxed opacity-80">
                                        Synchronizing Meta, Google, TikTok, and web channels into a unified high-velocity growth engine.
                                    </p>
                                </div>
                                <Database size={160} className="text-black/10 absolute -top-10 -right-10 group-hover:text-black/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
                            </div>
                        </AdvancedCard>
                    </div>
                </div>
            </div>

            {/* Massive Parallax Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full flex justify-center opacity-[0.05] mix-blend-overlay z-0">
                <span className="text-[30vw] font-heading font-black uppercase tracking-tighter text-white whitespace-nowrap">
                    ENGINE
                </span>
            </div>
        </section>
    );
}
