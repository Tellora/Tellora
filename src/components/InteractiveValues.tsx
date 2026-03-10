"use client";

import { motion } from "framer-motion";
import { Zap, Target, Crosshair, Hexagon, Layers, Activity } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

const values = [
    {
        id: "01",
        title: "NEURO-MARKETING",
        desc: "We utilize deep psychological triggers and behavioral data to engineer conversion funnels that guarantee response.",
        icon: Target,
        color: "#F3E84A",
    },
    {
        id: "02",
        title: "DATA WEAPONIZATION",
        desc: "Raw analytics are meaningless. We turn aggregated data into aggressive, high-yielding market strategies.",
        icon: Crosshair,
        color: "#FF2A2A",
    },
    {
        id: "03",
        title: "ARCHITECTURAL SCALE",
        desc: "Building infallible digital structures designed to handle hyper-growth and massive market disruption.",
        icon: Hexagon,
        color: "#A855F7",
    }
];

export default function InteractiveValues() {
    return (
        <section className="py-24 md:py-32 bg-background relative z-10 border-b-[4px] border-black overflow-hidden group/section">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-accent/20 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-6">
                <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-black text-white brutalist-border shadow-[4px_4px_0px_#A855F7] rounded-full mb-8 rotate-[-2deg] transition-transform hover:rotate-2">
                        <Zap size={16} className="text-primary fill-current" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">Core Directives</span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-[0.9]">
                        OUR <span className="text-secondary italic">MODUS OPERANDI</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px" }}
                            transition={{ delay: i * 0.15, type: "spring", stiffness: 100, damping: 20 }}
                        >
                            <Magnetic>
                                <div className="brutalist-card bg-white p-8 md:p-12 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-[16px_16px_0px_#000] hover:-translate-y-4 hover:bg-black hover:text-white cursor-crosshair group/card">
                                    {/* Animated Grid Background */}
                                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] group-hover/card:opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] group-hover/card:bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:20px_20px] transition-colors duration-500" />

                                    <div className="relative z-10 flex justify-between items-start mb-16">
                                        <div
                                            className="w-16 h-16 md:w-20 md:h-20 brutalist-border flex items-center justify-center rotate-3 group-hover/card:-rotate-6 transition-transform duration-500"
                                            style={{ backgroundColor: v.color }}
                                        >
                                            <v.icon size={32} className="text-black" />
                                        </div>

                                        <span className="text-4xl md:text-5xl font-heading font-black italic opacity-20 group-hover/card:opacity-100 group-hover/card:text-primary transition-colors duration-500">
                                            {v.id}
                                        </span>
                                    </div>

                                    <div className="relative z-10 mt-auto">
                                        <Layers className="mb-6 opacity-0 group-hover/card:opacity-100 -translate-x-4 group-hover/card:translate-x-0 transition-all duration-500 text-accent" size={24} />
                                        <h3 className="text-3xl md:text-4xl font-heading font-black uppercase mb-4 tracking-tighter leading-none group-hover/card:text-primary transition-colors">
                                            {v.title}
                                        </h3>
                                        <p className="font-black text-xs md:text-sm uppercase tracking-widest leading-relaxed opacity-60 group-hover/card:opacity-90">
                                            {v.desc}
                                        </p>
                                    </div>
                                </div>
                            </Magnetic>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scrolling Kinetic Text Banner */}
            <div className="mt-24 md:mt-32 border-y-[4px] border-black bg-white overflow-hidden py-4 -rotate-1 relative z-20 shadow-[0px_8px_0px_rgba(0,0,0,1)]">
                <div className="flex animate-marquee whitespace-nowrap gap-12 text-black">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12">
                            <span className="text-2xl font-heading font-black uppercase tracking-tighter italic">DISRUPT THE NORM</span>
                            <Activity className="text-secondary" />
                            <span className="text-2xl font-heading font-black uppercase tracking-tighter">ARCHITECT THE FUTURE</span>
                            <Zap className="text-primary" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
