"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Trophy, Rocket, TrendingUp, Zap, Sparkles } from "lucide-react";
import { DecodeText, ScrollLine } from "@/components/animations/ScrollChoreography";

const steps = [
    {
        num: "01",
        icon: <Search size={32} />,
        title: "Discovery",
        description: "We deep dive into your brand, auditing your current presence and identifying key growth levers.",
        color: "#F3E84A",
        rotate: "-2deg"
    },
    {
        num: "02",
        icon: <Trophy size={32} />,
        title: "Strategy",
        description: "We craft a tailored roadmap aligned with your business KPIs, selecting the right digital architecture.",
        color: "#A855F7",
        rotate: "2deg"
    },
    {
        num: "03",
        icon: <Rocket size={32} />,
        title: "Execution",
        description: "Our expert team deploys high-frequency campaigns, content, and optimizations with creative precision.",
        color: "#22C55E",
        rotate: "-1.5deg"
    },
    {
        num: "04",
        icon: <TrendingUp size={32} />,
        title: "Growth",
        description: "We continuously analyze data, optimize performance, and scale what works to maximize your absolute ROI.",
        color: "#4AC0E4",
        rotate: "2.5deg"
    }
];

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yMarquee = useTransform(scrollYProgress, [0, 1], [-200, 200]);

    return (
        <section
            ref={containerRef}
            id="process"
            className="py-32 relative z-10 bg-background border-y-[4px] border-black overflow-hidden"
        >
            {/* Background Marquee */}
            <div className="absolute top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 -rotate-3">
                <motion.div
                    style={{ y: yMarquee }}
                >
                    <span className="text-[25rem] font-heading font-black uppercase whitespace-nowrap">
                        HOW IT WORKS • HOW IT WORKS •
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <motion.div style={{ y: yTitle }} className="max-w-2xl">
                        <div className="inline-flex items-center gap-4 mb-6 px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-2 shadow-[4px_4px_0px_#A855F7]">
                            <Zap size={14} className="text-primary fill-current" />
                            <span className="font-black uppercase tracking-widest text-[10px]">Neural Growth Map</span>
                        </div>
                        <h2 className="heading-massive !text-7xl md:!text-9xl tracking-tight">
                            <DecodeText text="FOUR" /> <br /> <span className="text-primary italic"><DecodeText text="PHASES" /></span>
                        </h2>
                    </motion.div>
                </div>

                <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Visual Connector - Decorative Dash updated to animated line */}
                    <ScrollLine className="hidden lg:block absolute top-[45%] left-0 w-full z-0 pointer-events-none" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40, rotate: step.rotate }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10, rotate: "0deg", zIndex: 20 }}
                            className="group relative flex flex-col items-center"
                        >
                            <div
                                className="w-full p-10 brutalist-card h-full flex flex-col items-center text-center group-hover:shadow-[12px_12px_0px_#000] transition-all"
                                style={{ background: step.color }}
                            >
                                {/* Step Badge */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white brutalist-border px-5 py-2 rotate-6 z-20 shadow-[4px_4px_0px_#FFF]">
                                    <span className="text-xl font-black font-heading italic">{step.num}</span>
                                </div>

                                <div className="w-24 h-24 rounded-full bg-white brutalist-border flex items-center justify-center mb-10 mt-4 group-hover:bg-black group-hover:text-white transition-all transform group-hover:scale-110">
                                    {step.icon}
                                </div>

                                <h3 className="text-3xl font-heading font-black uppercase mb-4 tracking-tighter">
                                    <DecodeText text={step.title} />
                                </h3>
                                <p className="font-black text-xs uppercase leading-relaxed mb-8 opacity-80">
                                    {step.description}
                                </p>

                                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="text-white fill-current" />
                                </div>
                            </div>

                            {/* Offset Shadow */}
                            <div className="absolute -bottom-3 -right-3 w-full h-full bg-black -z-10 rounded-2xl group-hover:translate-x-2 group-hover:translate-y-2 transition-transform opacity-30 group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
