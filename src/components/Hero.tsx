"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Globe, Terminal, Activity, Focus, Cpu } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import { TiltCard } from "@/components/animations/TiltCard";
import { getSettings, getCompanyStats, SiteSettings, CompanyStat } from "@/lib/store";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [stats, setStats] = useState<CompanyStat[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const xOffset = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -100]);

    useEffect(() => {
        setIsMounted(true);

        const fetchData = async () => {
            const [sData, stData] = await Promise.all([
                getSettings(),
                getCompanyStats()
            ]);
            setSettings(sData);
            
            if (stData && stData.length > 0) {
                setStats(stData);
            } else {
                // High-energy fallbacks for original hero restoration
                setStats([
                    { value: "6.4X", label: "AVERAGE ROAS", color: "#A855F7" },
                    { value: "100%", label: "GROWTH SCALE", color: "#22C55E" },
                    { value: "GLOBAL", label: "CORE REACH", color: "#F3E84A" }
                ]);
            }
            setLoading(false);
        };

        fetchData();

        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                setMousePos({ x: e.clientX, y: e.clientY });
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
    const interactiveX = useSpring((mousePos.x - (isMounted ? window.innerWidth / 2 : 0)) * 0.015, springConfig);
    const interactiveY = useSpring((mousePos.y - (isMounted ? window.innerHeight / 2 : 0)) * 0.015, springConfig);

    if (loading) return null;

    // SANITIZATION: Remove "Digital Growth Agency" from the site title for the main header
    const rawTitle = settings?.hero_title || settings?.site_title || "TELLORA MEDIA";
    const heroTitle = rawTitle.split('|')[0].trim().toUpperCase();
    
    const heroSubtitle = settings?.hero_subtitle || "Engineering DOPAMINE-DRIVEN growth with absolute intent.";
    const ctaText = settings?.cta_text || "DEPLOY CORE";

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-[100vh] flex flex-col pt-32 md:pt-48 pb-12 z-10 overflow-hidden bg-background gpu-accelerated"
        >
            {/* Brand Halftone (Left) */}
            <div className="absolute top-0 left-0 w-[300px] h-full bg-transparent halftone-overlay -translate-x-1/2 opacity-5 pointer-events-none" />

            {/* Interactive Advanced Glare / Spotlight - Boosted Intensity */}
            <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300 z-0"
                style={{
                    background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.2), transparent 70%)`
                }}
            />

            {/* Top Kinetic Marquee - Restored */}
            <div className="absolute top-24 md:top-32 left-0 w-full overflow-hidden border-y-[4px] border-black bg-white py-3 md:py-6 -rotate-1 z-30 shadow-[0px_6px_0px_rgba(0,0,0,1)] gpu-accelerated font-heading">
                <div className="flex animate-marquee gap-12 md:gap-24 whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6 md:gap-12">
                            <span className="font-black text-xl md:text-4xl uppercase tracking-tighter flex items-center gap-3 md:gap-6">
                                HIGH FREQUENCY GROWTH <Sparkles className="text-secondary fill-current w-5 h-5 md:w-6 md:h-6" />
                            </span>
                            <span className="font-black text-xl md:text-4xl uppercase tracking-tighter flex items-center gap-3 md:gap-6 text-primary">
                                REVENUE ENGINES <Zap className="fill-current w-5 h-5 md:w-6 md:h-6" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Floating Layout Elements - Restored & Parallax Boosted */}
                    <motion.div style={{ x: interactiveX, y: interactiveY }} className="absolute -z-10 w-full h-[150%] pointer-events-none translate-z-0 overflow-visible hidden md:block opacity-60">
                        <div className="absolute top-[5%] left-[5%] bg-primary p-12 brutalist-border shadow-[12px_12px_0px_#000] rotate-12 animate-float">
                            <Globe size={120} className="text-black" />
                        </div>
                        <div className="absolute top-[10%] right-[10%] w-32 h-32 bg-accent brutalist-border rounded-full shadow-[8px_8px_0px_#000] flex items-center justify-center animate-spin-slow">
                            <Focus size={60} className="text-black" />
                        </div>
                        <div className="absolute top-[45%] right-[20%] w-20 h-20 bg-white border-[6px] border-primary rounded-full animate-bounce flex items-center justify-center">
                            <Sparkles size={30} className="text-primary" />
                        </div>
                        <div className="absolute bottom-[20%] left-[2%] bg-white p-6 brutalist-border shadow-[6px_6px_0px_#A855F7] -rotate-[15deg]">
                            <span className="text-[12px] font-black uppercase text-black tracking-widest flex items-center gap-2">
                                <Activity className="text-primary animate-pulse" /> Growth Loop
                            </span>
                        </div>
                        <div className="absolute bottom-[25%] right-[5%] w-24 h-24 bg-black border-[4px] border-primary rotate-45 flex items-center justify-center animate-float-delayed">
                            <Cpu size={40} className="text-primary -rotate-45" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ y: yHero }}
                        className="relative mb-12 md:mb-20 translate-z-0 mt-8 md:mt-0"
                    >
                        <div className="relative group mt-4 md:mt-0">
                            <h1 className="text-[12vw] xl:text-[15rem] font-heading font-black tracking-tighter leading-[0.85] md:leading-none text-black selection:bg-accent select-none uppercase relative z-20">
                                {heroTitle.split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? "animate-red-gradient drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[10px_10px_0px_#000] inline-block -translate-y-2 md:-translate-y-8 gpu-accelerated" : ""}>
                                        {word} {i === 0 && <br />}
                                    </span>
                                ))}
                            </h1>
                            <span className="sr-only">{rawTitle}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-5xl mb-16 md:mb-24"
                    >
                        <p className="text-xl sm:text-2xl md:text-5xl font-black uppercase tracking-tighter leading-[1.2] md:leading-[0.9] text-black">
                            {heroSubtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-10 mb-20 md:mb-40 z-20 relative w-full px-6 md:px-0"
                    >
                        <Magnetic>
                            <Link href="/contact" className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-black text-white font-black uppercase tracking-widest text-lg md:text-xl brutalist-border shadow-[8px_8px_0px_#A855F7] md:shadow-[12px_12px_0px_#A855F7] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#A855F7] md:hover:shadow-[16px_16px_0px_#A855F7] active:translate-y-1 transition-all flex items-center justify-center gap-4 md:gap-6 group">
                                {ctaText} <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-4 transition-transform text-accent" />
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <button className="w-full sm:w-auto px-10 md:px-12 py-6 md:py-8 bg-white text-black font-black uppercase tracking-widest text-lg md:text-xl brutalist-border shadow-[8px_8px_0px_#F3E84A] md:shadow-[12px_12px_0px_#F3E84A] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#F3E84A] md:hover:shadow-[16px_16px_0px_#F3E84A] active:translate-y-1 transition-all flex items-center justify-center gap-4 md:gap-6 group">
                                <Terminal className="w-6 h-6 md:w-6 md:h-6 text-primary" />
                                INTEL LAB
                            </button>
                        </Magnetic>
                    </motion.div>

                    {/* Stats Grid - Restored with Tighter Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-6xl relative z-20">
                        {stats.slice(0, 3).map((stat, i) => (
                            <TiltCard key={i} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                                    className="p-8 md:p-12 bg-white brutalist-border shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] relative overflow-hidden group/stat cursor-pointer h-full"
                                >
                                    <div className="absolute inset-0 bg-transparent halftone-overlay opacity-0 group-hover/stat:opacity-5 transition-opacity" />
                                    <div className="relative z-10 flex flex-col items-center">
                                        <h3 className="text-[4rem] font-heading font-black mb-2 transition-transform duration-500 text-center" style={{ color: stat.color }}>
                                            {stat.value}
                                        </h3>
                                        <p className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-40 group-hover/stat:opacity-80 transition-all text-center">{stat.label}</p>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div
                style={{ rotateX, x: xOffset }}
                className="absolute -bottom-40 left-0 w-[200%] pointer-events-none opacity-[0.02] mix-blend-overlay select-none z-0 gpu-accelerated translate-z-0"
            >
                <span className="text-[35vw] font-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap text-secondary">
                    TELLORA CORE • TELLORA CORE •
                </span>
            </motion.div>
        </section>
    );
}
