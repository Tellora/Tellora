"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Film, Play, Activity, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import { TiltCard } from "@/components/animations/TiltCard";
import PhysicalFilmReelBackground from "@/components/animations/PhysicalFilmReelBackground";
import { getSettings, getCompanyStats, SiteSettings, CompanyStat } from "@/lib/store";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [stats, setStats] = useState<CompanyStat[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -80]);

    useEffect(() => {
        const fetchData = async () => {
            const [sData, stData] = await Promise.all([
                getSettings(),
                getCompanyStats()
            ]);
            setSettings(sData);
            
            if (stData && stData.length > 0) {
                setStats(stData);
            } else {
                setStats([
                    { value: "6.4X", label: "AVERAGE AD RETURN", color: "#A855F7" },
                    { value: "100%", label: "REVENUE GROWTH", color: "#22C55E" },
                    { value: "GLOBAL", label: "CLIENT REACH", color: "#F3E84A" }
                ]);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return null;

    const rawTitle = settings?.hero_title || settings?.site_title || "TELLORA MEDIA";
    const heroTitle = rawTitle.split('|')[0].trim().toUpperCase();
    const heroSubtitle = settings?.hero_subtitle || "ENGINEERING RESULTS-DRIVEN GROWTH FOR YOUR BUSINESS.";
    const ctaText = settings?.cta_text || "GET STARTED";

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-[100vh] flex flex-col pt-32 md:pt-48 pb-16 z-10 overflow-hidden bg-background gpu-accelerated"
        >
            {/* Prominent High-Visibility Continuous Faded Film Reel Background */}
            <PhysicalFilmReelBackground />

            {/* Brand Halftone (Left) */}
            <div className="absolute top-0 left-0 w-[300px] h-full bg-transparent halftone-overlay -translate-x-1/2 opacity-5 pointer-events-none z-0" />

            {/* Kinetic Top Marquee */}
            <div className="absolute top-24 md:top-32 left-0 w-full overflow-hidden border-y-[4px] border-black bg-white py-3 md:py-5 -rotate-1 z-30 shadow-[0px_6px_0px_rgba(0,0,0,1)] gpu-accelerated font-heading">
                <div className="flex animate-marquee gap-12 md:gap-24 whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6 md:gap-12">
                            <span className="font-black text-xl md:text-3xl uppercase tracking-tighter flex items-center gap-3 text-black">
                                HIGH PERFORMANCE GROWTH <Sparkles className="text-secondary fill-current w-5 h-5" />
                            </span>
                            <span className="font-black text-xl md:text-3xl uppercase tracking-tighter flex items-center gap-3 text-primary">
                                REVENUE ENGINES <Zap className="fill-current w-5 h-5" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-20">
                <div className="flex flex-col items-center text-center">

                    {/* Floating Video Reel & HUD Badges (Restructured Hero UI) */}
                    <div className="w-full max-w-6xl flex justify-between items-center mb-6 pointer-events-none relative z-30">
                        {/* Status Badge Left */}
                        <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-black/90 text-white brutalist-border shadow-[4px_4px_0px_#A855F7] rounded-2xl rotate-[-2deg] backdrop-blur-md">
                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">MEDIA CORE: ONLINE</span>
                        </div>

                        {/* Status Badge Right */}
                        <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-white text-black brutalist-border shadow-[4px_4px_0px_#000] rounded-2xl rotate-[2deg]">
                            <Film size={14} className="text-primary" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">35MM REEL STREAM</span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ y: yHero }}
                        className="relative mb-8 md:mb-14 translate-z-0 mt-4 md:mt-0"
                    >
                        <div className="relative group">
                            <h2 className="text-[13vw] xl:text-[15rem] font-heading font-black tracking-tighter leading-[0.85] md:leading-none text-black select-none uppercase relative z-20 drop-shadow-[0_10px_20px_rgba(255,255,255,0.8)]">
                                {heroTitle.split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? "animate-red-gradient drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[10px_10px_0px_#000] inline-block -translate-y-2 md:-translate-y-6 gpu-accelerated" : ""}>
                                        {word} {i === 0 && <br />}
                                    </span>
                                ))}
                            </h2>
                            <span className="sr-only">{rawTitle}</span>
                        </div>
                    </motion.div>

                    {/* Subtitle with High Contrast Backdrop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-4xl mb-12 md:mb-16 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl brutalist-border shadow-[6px_6px_0px_#000]"
                    >
                        <h1 className="text-lg sm:text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-black">
                            {heroSubtitle}
                        </h1>
                    </motion.div>

                    {/* Action CTAs */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16 md:mb-28 z-30 relative w-full px-4 sm:px-0"
                    >
                        <Magnetic>
                            <Link href="/contact" className="w-full sm:w-auto px-8 sm:px-14 py-5 sm:py-7 bg-black text-white font-black uppercase tracking-widest text-base sm:text-lg brutalist-border shadow-[8px_8px_0px_#A855F7] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#A855F7] active:translate-y-1 transition-all flex items-center justify-center gap-4 group">
                                {ctaText} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-3 transition-transform text-accent" />
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <a href="#reels" className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-7 bg-white text-black font-black uppercase tracking-widest text-base sm:text-lg brutalist-border shadow-[8px_8px_0px_#F3E84A] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#F3E84A] active:translate-y-1 transition-all flex items-center justify-center gap-4 group">
                                <Play className="w-5 h-5 sm:w-5 sm:h-5 text-primary fill-current" />
                                WATCH REELS
                            </a>
                        </Magnetic>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 w-full max-w-5xl relative z-30 items-stretch">
                        {stats.slice(0, 3).map((stat, i) => (
                            <TiltCard key={i} className={`h-full ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className="p-4 md:p-10 bg-white brutalist-border shadow-[4px_4px_0px_#000] md:shadow-[10px_10px_0px_#000] relative overflow-hidden group/stat cursor-pointer h-full"
                                >
                                    <div className="relative z-10 flex flex-col items-center justify-center">
                                        <h3 className="text-3xl md:text-[3.5rem] font-heading font-black mb-1 transition-transform duration-500 text-center leading-none" style={{ color: stat.color }}>
                                            {stat.value}
                                        </h3>
                                        <p className="font-black text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-50 group-hover/stat:opacity-90 transition-all text-center leading-tight">{stat.label}</p>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
