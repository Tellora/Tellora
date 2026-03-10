"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Zap, Sparkles, Star, Target, ShieldCheck, Activity } from "lucide-react";
import { DecodeText, HorizontalReveal } from "@/components/animations/ScrollChoreography";

const plans = [
    {
        name: "Starter",
        price: "$999",
        description: "Perfect for scaling startups looking for their first growth engine.",
        features: ["Social Scale (2 Platforms)", "Basic SEO Arch", "Growth Reports", "24/7 Support"],
        color: "#FFFFFF",
        accent: "#A855F7",
        rotate: "-2deg",
        log: "v1.0 Ready"
    },
    {
        name: "Growth",
        price: "$2,499",
        description: "Comprehensive solution for brands ready to disrupt the market.",
        features: ["Social Scale (4 Platforms)", "Advanced SEO Architecture", "PPC Growth Engine", "Weekly Strategy Sprints", "Premium Production"],
        color: "#F3E84A",
        accent: "#000000",
        rotate: "2deg",
        featured: true,
        log: "High Flux Build"
    },
    {
        name: "Legacy",
        price: "Scale",
        description: "Tailored architectural strategies for enterprise disruption.",
        features: ["Full-Service Growth Team", "Dedicated Content Lab", "Custom AI Development", "Priority Board Access"],
        color: "#22C55E",
        accent: "#FFFFFF",
        rotate: "-1.5deg",
        log: "Custom Core"
    }
];

export default function Pricing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMarquee = useTransform(scrollYProgress, [0, 1], [-200, 200]);
    const yTitle = useTransform(scrollYProgress, [0, 1], [80, -80]);

    return (
        <section ref={containerRef} id="pricing" className="py-24 md:py-48 relative z-10 bg-background border-t-[8px] border-black overflow-hidden">
            {/* Background Marquee with Custom Texture */}
            <div className="absolute top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 rotate-12 flex justify-center overflow-hidden">
                <motion.div
                    style={{ x: xMarquee }}
                >
                    <span className="text-[12rem] md:text-[25rem] font-heading font-black uppercase whitespace-nowrap text-primary">
                        DATA ARCH • DATA ARCH •
                    </span>
                </motion.div>
            </div>

            {/* Geometric Floating Nodes */}
            <div className="absolute top-[20%] right-[10%] w-20 h-20 md:w-32 md:h-32 border-4 border-dashed border-accent rounded-full animate-spin-slow opacity-20 pointer-events-none" />
            <div className="absolute bottom-[20%] left-[5%] w-16 h-16 md:w-24 md:h-24 bg-black border-[4px] md:border-[6px] border-primary rotate-45 opacity-10 flex items-center justify-center animate-bounce pointer-events-none">
                <Zap size={24} className="text-white -rotate-45 md:w-[32px] md:h-[32px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-16">
                    <motion.div style={{ y: yTitle }} className="max-w-3xl">
                        <div className="inline-flex items-center gap-4 md:gap-6 mb-8 md:mb-10 px-6 md:px-8 py-2 md:py-3 bg-black text-white brutalist-border rounded-full rotate-[-1deg] shadow-[8px_8px_0px_#A855F7] md:shadow-[12px_12px_0px_#A855F7]">
                            <Target className="text-primary fill-current w-4 h-4 md:w-5 md:h-5" />
                            <span className="font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-[12px]">Dynamic Investment</span>
                        </div>
                        <h2 className="text-[4.5rem] sm:text-[6rem] md:text-[14rem] font-heading font-black uppercase tracking-tighter leading-[0.8] mb-8">
                            <DecodeText text="SCALE" /> <br className="hidden md:block" /> <span className="text-primary italic"><DecodeText text="PLANS" /></span>
                        </h2>
                        <HorizontalReveal>
                            <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4 px-4 md:px-6 bg-white brutalist-border shadow-[4px_4px_0px_#000] md:shadow-[8px_8px_0px_#000] rotate-1 w-max">
                                <Activity className="text-success w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Market Status: Aggressive</span>
                            </div>
                        </HorizontalReveal>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50, rotate: 0 }}
                            whileInView={{ opacity: 1, y: 0, rotate: plan.rotate }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, type: "spring" }}
                            whileHover={{ y: -20, rotate: 0, zIndex: 100, scale: 1.02 }}
                            className={`group relative flex flex-col ${plan.featured ? "z-10" : "z-0"}`}
                        >
                            <div
                                className={`w-full p-8 md:p-16 brutalist-card h-full flex flex-col md:group-hover:shadow-[20px_20px_0px_#000] transition-all relative overflow-hidden ${plan.featured ? 'scale-105 border-[4px] md:border-[6px]' : ''}`}
                                style={{ background: plan.color }}
                            >
                                {/* Personalised 'System Log' Badge */}
                                <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">{plan.log}</span>
                                </div>

                                {plan.featured && (
                                    <div className="absolute top-4 md:-top-10 -right-4 md:-right-6 bg-accent text-black px-4 md:px-8 py-3 md:py-5 text-[14px] md:text-[18px] font-black uppercase tracking-tighter rotate-12 shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] border-[3px] md:border-4 border-black sticker-pulse z-50 selection:bg-black selection:text-white">
                                        DOMINANT 🔥
                                    </div>
                                )}

                                <div className="mt-12 md:mt-12">
                                    <h3 className="text-4xl md:text-5xl font-heading font-black uppercase mb-4 md:mb-6 tracking-tighter">
                                        <DecodeText text={plan.name} />
                                    </h3>

                                    <div className="flex items-baseline gap-2 md:gap-4 mb-8 md:mb-10 bg-black/5 p-6 md:p-8 brutalist-border rounded-2xl relative">
                                        <div className="absolute inset-0 bg-black/5 halftone-overlay opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                                        <span className="text-6xl md:text-8xl font-heading font-black tracking-tighter italic z-10 relative">
                                            {plan.price}
                                        </span>
                                        {plan.price !== "Scale" && (
                                            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest opacity-40 z-10 relative">/mo_intel</span>
                                        )}
                                    </div>
                                </div>

                                <p className="font-black text-xs md:text-sm uppercase leading-relaxed mb-8 md:mb-12 opacity-80 min-h-[4rem]">
                                    {plan.description}
                                </p>

                                <ul className="space-y-4 md:space-y-6 mb-12 md:mb-16">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-4 md:gap-6 text-[11px] md:text-[13px] font-black uppercase tracking-widest group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black text-white flex items-center justify-center brutalist-border scale-75 shrink-0">
                                                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/contact"
                                    className={`mt-auto w-full py-6 md:py-8 brutalist-border text-center font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm transition-all hover:translate-y-[-4px] md:hover:translate-y-[-8px] hover:shadow-[6px_6px_0px_#000] md:hover:shadow-[10px_10px_0px_#000] active:translate-y-1 active:shadow-none ${plan.featured ? 'bg-black text-white' : 'bg-white text-black'
                                        }`}
                                >
                                    DEPLOY LOGIC
                                </a>

                                <div className="absolute -bottom-10 -right-10 opacity-[0.05] pointer-events-none group-hover:opacity-20 transition-opacity rotate-12 group-hover:scale-150 duration-700 hidden md:block">
                                    <Sparkles size={180} />
                                </div>
                            </div>

                            {/* Offset Personalised Shadow */}
                            <div className={`absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 w-full h-full bg-black -z-10 rounded-2xl group-hover:translate-x-4 md:group-hover:translate-x-6 group-hover:translate-y-4 md:group-hover:translate-y-6 transition-transform ${plan.featured ? 'opacity-50' : 'opacity-20'}`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
