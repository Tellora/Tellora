"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Film, Play, Activity, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import { TiltCard } from "@/components/animations/TiltCard";
import PhysicalFilmReelBackground from "@/components/animations/PhysicalFilmReelBackground";
import { getSettings, getCompanyStats, SiteSettings, CompanyStat } from "@/lib/store";

/** Wraps a stat card in a link when it should point somewhere (the GLOBAL / CLIENT REACH stat opens /us). */
function StatLink({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
    if (!href) return <>{children}</>;
    return (
        <Link href={href} aria-label={`${label}: see how we help US businesses`} className="block h-full">
            {children}
        </Link>
    );
}

const DEFAULT_STATS: CompanyStat[] = [
    { value: "6.4X", label: "AVERAGE AD RETURN", color: "#A855F7" },
    { value: "100%", label: "REVENUE GROWTH", color: "#22C55E" },
    { value: "GLOBAL", label: "CLIENT REACH", color: "#F3E84A" }
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [stats, setStats] = useState<CompanyStat[]>(DEFAULT_STATS);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -80]);
    // Scroll-synced choreography: headline recedes, subtitle/CTAs peel away at different speeds,
    // stat cards fan out like a dealt hand of stickers.
    const titleScale = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0.82]), { stiffness: 120, damping: 24 });
    const subY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const ctaY = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.95], [1, 0]);
    const statsY = useTransform(scrollYProgress, [0, 1], [0, -130]);
    const fan0 = useTransform(scrollYProgress, [0, 1], [0, -5]);
    const fan1 = useTransform(scrollYProgress, [0, 1], [0, 3]);
    const fan2 = useTransform(scrollYProgress, [0, 1], [0, 5]);
    const fans = [fan0, fan1, fan2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sData, stData] = await Promise.all([
                    getSettings(),
                    getCompanyStats()
                ]);
                if (sData) setSettings(sData);
                if (stData && stData.length > 0) {
                    setStats(stData);
                }
            } catch (err) {
                // Silently fallback to defaults without throwing
            }
        };

        fetchData();
    }, []);

    const rawTitle = settings?.hero_title || settings?.site_title || "TELLORA MEDIA";
    const heroTitle = rawTitle.split('|')[0].trim().toUpperCase();
    const heroSubtitle = settings?.hero_subtitle || "ENGINEERING RESULTS-DRIVEN GROWTH FOR YOUR BUSINESS.";
    const ctaText = settings?.cta_text || "GET STARTED";

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-[100svh] flex flex-col justify-center pt-32 sm:pt-32 md:pt-32 lg:pt-36 pb-10 sm:pb-12 z-10 overflow-hidden bg-background gpu-accelerated"
        >
            {/* Prominent High-Visibility Continuous Faded Film Reel Background */}
            <PhysicalFilmReelBackground />

            {/* Brand Halftone (Left) */}
            <div className="absolute top-0 left-0 w-[300px] h-full bg-transparent halftone-overlay -translate-x-1/2 opacity-5 pointer-events-none z-0" />

            {/* Kinetic Top Marquee */}
            <div className="absolute top-[5.25rem] sm:top-24 md:top-28 left-0 w-full overflow-hidden border-y-[4px] border-black bg-white py-2.5 sm:py-3 md:py-4 -rotate-1 z-30 shadow-[0px_6px_0px_rgba(0,0,0,1)] gpu-accelerated font-heading">
                <div className="flex animate-marquee gap-12 md:gap-24 whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6 md:gap-12">
                            <span className="font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-3 text-black">
                                HIGH PERFORMANCE GROWTH <Sparkles className="text-secondary fill-current w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <span className="font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-3 text-primary">
                                REVENUE ENGINES <Zap className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-20 mt-6 sm:mt-8 md:mt-10">
                <div className="flex flex-col items-center text-center">

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 1, scale: 1, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        style={{ y: yHero, scale: titleScale }}
                        className="relative mb-4 sm:mb-6 md:mb-8 translate-z-0"
                    >
                        <div className="relative group">
                            <h1 className="text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5vw] xl:text-[8.5rem] 2xl:text-[10rem] font-heading font-black tracking-tighter leading-[0.88] text-black select-none uppercase relative z-20 drop-shadow-[0_10px_20px_rgba(255,255,255,0.8)]">
                                {heroTitle.split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? "animate-red-gradient drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[8px_8px_0px_#000] inline-block -translate-y-1 sm:-translate-y-2 md:-translate-y-4 gpu-accelerated" : ""}>
                                        {word} {i === 0 && <br />}
                                    </span>
                                ))}
                            </h1>
                            <span className="sr-only">{rawTitle}</span>
                        </div>
                    </motion.div>

                    {/* Subtitle with High Contrast Backdrop */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ y: subY }}
                        className="max-w-3xl mb-6 sm:mb-8 md:mb-10 bg-white/90 backdrop-blur-md px-5 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl brutalist-border shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]"
                    >
                        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-snug text-black">
                            {heroSubtitle}
                        </p>
                    </motion.div>

                    {/* Action CTAs */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ y: ctaY, opacity: ctaOpacity }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 md:mb-12 z-30 relative w-full px-4 sm:px-0"
                    >
                        <Magnetic>
                            <Link href="/contact" className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-black text-white font-black uppercase tracking-widest text-sm sm:text-base brutalist-border shadow-[6px_6px_0px_#A855F7] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_#A855F7] active:translate-y-1 transition-all flex items-center justify-center gap-3 group">
                                {ctaText} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform text-accent" />
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <a href="#reels" className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-white text-black font-black uppercase tracking-widest text-sm sm:text-base brutalist-border shadow-[6px_6px_0px_#F3E84A] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_#F3E84A] active:translate-y-1 transition-all flex items-center justify-center gap-3 group">
                                <Play className="w-4 h-4 sm:w-4 sm:h-4 text-primary fill-current" />
                                WATCH REELS
                            </a>
                        </Magnetic>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div style={{ y: statsY }} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-4xl relative z-30 items-stretch">
                        {stats.slice(0, 3).map((stat, i) => (
                            <motion.div key={i} style={{ rotate: fans[i] }} className={`h-full ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <StatLink href={/global/i.test(stat.value) || /client reach/i.test(stat.label) ? "/us" : undefined} label={stat.label}>
                            <TiltCard className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className="p-3 sm:p-5 md:p-6 bg-white brutalist-border shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] relative overflow-hidden group/stat cursor-pointer h-full"
                                >
                                    <div className="relative z-10 flex flex-col items-center justify-center">
                                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-1 transition-transform duration-500 text-center leading-none block" style={{ color: stat.color }}>
                                            {stat.value}
                                        </span>
                                        <p className="font-black text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-60 group-hover/stat:opacity-90 transition-all text-center leading-tight">{stat.label}</p>
                                    </div>
                                </motion.div>
                            </TiltCard>
                            </StatLink>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
