"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Globe, Terminal, Activity, Focus, Cpu } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import { DecodeText } from "@/components/animations/ScrollChoreography";
import { TiltCard } from "@/components/animations/TiltCard";

const stats = [
    { value: "500+", label: "Brands Scaled", color: "#A855F7" },
    { value: "4.9×", label: "Avg ROI", color: "#22C55E" },
    { value: "98%", label: "Retention Rate", color: "#F3E84A" },
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const xOffset = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -100]);

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            // Throttled mouse move for performance
            requestAnimationFrame(() => {
                setMousePos({ x: e.clientX, y: e.clientY });
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Optimized interactive mouse parallax with dampened springs
    const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
    const interactiveX = useSpring((mousePos.x - (isMounted ? window.innerWidth / 2 : 0)) * 0.015, springConfig);
    const interactiveY = useSpring((mousePos.y - (isMounted ? window.innerHeight / 2 : 0)) * 0.015, springConfig);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-[100vh] md:min-h-[110vh] flex flex-col pt-40 md:pt-48 pb-20 md:pb-32 z-10 overflow-hidden bg-background gpu-accelerated"
        >
            {/* Optimized Brand Halftone (Left) */}
            <div className="absolute top-0 left-0 w-[300px] h-full bg-transparent halftone-overlay -translate-x-1/2 opacity-5 pointer-events-none" />

            {/* Interactive Advanced Glare / Spotlight Orchestrated by Mouse */}
            <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300 z-0"
                style={{
                    background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.15), transparent 70%)`
                }}
            />

            {/* Optimized Top Kinetic Marquee */}
            <div className="absolute top-24 md:top-32 left-0 w-full overflow-hidden border-y-[4px] border-black bg-white py-3 md:py-6 -rotate-1 z-30 shadow-[0px_6px_0px_rgba(0,0,0,1)] gpu-accelerated">
                <div className="flex animate-marquee gap-12 md:gap-24 whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6 md:gap-12">
                            <span className="font-heading font-black text-xl md:text-4xl uppercase tracking-tighter flex items-center gap-3 md:gap-6">
                                HIGH FREQUENCY GROWTH <Sparkles className="text-secondary fill-current w-5 h-5 md:w-6 md:h-6" />
                            </span>
                            <span className="font-heading font-black text-xl md:text-4xl uppercase tracking-tighter flex items-center gap-3 md:gap-6 text-primary">
                                REVENUE ENGINES <Zap className="fill-current w-5 h-5 md:w-6 md:h-6" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Decorative Background Ornaments - GPU Accelerated */}
                    <motion.div style={{ x: interactiveX, y: interactiveY }} className="absolute -z-10 w-full h-[150%] pointer-events-none translate-z-0 overflow-visible">
                        <div className="absolute top-[5%] left-[10%] bg-primary p-12 brutalist-border shadow-[12px_12px_0px_#000] rotate-12 opacity-40 animate-float translate-z-0">
                            <Globe size={120} className="text-black" />
                        </div>
                        <div className="absolute top-[10%] right-[15%] w-32 h-32 bg-accent brutalist-border rounded-full shadow-[8px_8px_0px_#000] flex items-center justify-center opacity-30 animate-spin-slow">
                            <Focus size={60} className="text-black" />
                        </div>

                        {/* More Floating Shapes Requested */}
                        <div className="absolute top-[30%] left-[20%] w-16 h-16 bg-secondary brutalist-border shadow-[4px_4px_0px_#000] -rotate-45 opacity-50 animate-float-delayed" />
                        <div className="absolute top-[45%] right-[25%] w-20 h-20 bg-white border-[6px] border-primary rounded-full opacity-60 animate-bounce flex items-center justify-center">
                            <Sparkles size={30} className="text-primary" />
                        </div>
                        <div className="absolute top-[25%] left-[80%] bg-black text-white p-4 brutalist-border rotate-12 opacity-30 animate-spin-slow">
                            <Zap size={40} className="text-accent" />
                        </div>
                        <div className="absolute bottom-[40%] left-[10%] w-24 h-24 border-dashed border-[6px] border-secondary rounded-full opacity-40 animate-spin-slow" />

                        <div className="absolute bottom-[20%] left-[5%] bg-white p-6 brutalist-border shadow-[6px_6px_0px_#A855F7] -rotate-[15deg] opacity-60">
                            <span className="text-[12px] font-black uppercase text-black tracking-widest flex items-center gap-2">
                                <Activity className="text-primary animate-pulse" /> Growth Engine
                            </span>
                        </div>
                        <div className="absolute bottom-[25%] right-[10%] w-24 h-24 bg-black border-[4px] border-primary rotate-45 flex items-center justify-center opacity-40 animate-float-delayed">
                            <Cpu size={40} className="text-primary -rotate-45" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ y: yHero }}
                        className="relative mb-12 md:mb-20 translate-z-0 mt-16 md:mt-0"
                    >
                        <div className="relative group">
                            <h1 className="text-[18vw] md:text-[20rem] font-heading font-black tracking-tighter leading-[0.85] md:leading-none text-black selection:bg-accent select-none uppercase relative z-20">
                                TELLORA <br />
                                <span className="animate-red-gradient drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[10px_10px_0px_#000] inline-block -translate-y-2 md:-translate-y-8 gpu-accelerated">
                                    MEDIA
                                </span>
                            </h1>
                            <span className="sr-only">Tellora Media - Premier Digital Growth Agency and SEO Experts</span>
                            <div className="absolute -top-6 md:-top-12 left-1/2 -translate-x-1/2 px-4 md:px-6 py-2 bg-black text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] rough-border shadow-[4px_4px_0px_#F3E84A] md:shadow-[8px_8px_0px_#F3E84A] rotate-2 animate-bounce flex items-center whitespace-nowrap">
                                Global Digital Growth Agency
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-5xl mb-16 md:mb-24"
                    >
                        <p className="text-xl sm:text-2xl md:text-5xl font-black uppercase tracking-tighter leading-[1.2] md:leading-[0.9] text-black">
                            <DecodeText text="Engineering" /> <span className="bg-primary text-black rough-border px-3 md:px-6 py-2 md:py-3 rotate-[-1.5deg] inline-block mx-2 md:mx-4 shadow-[5px_5px_0px_#F3E84A] md:shadow-[10px_10px_0px_#F3E84A]"><DecodeText text="DOPAMINE-DRIVEN" /></span> growth with <span className="text-black underline decoration-secondary decoration-[4px] md:decoration-[10px] underline-offset-[4px] md:underline-offset-[8px] italic"><DecodeText text="absolute intent." /></span>
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
                                DEPLOY CORE <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-4 transition-transform text-accent" />
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <button className="w-full sm:w-auto px-10 md:px-12 py-6 md:py-8 bg-white text-black font-black uppercase tracking-widest text-lg md:text-xl brutalist-border shadow-[8px_8px_0px_#F3E84A] md:shadow-[12px_12px_0px_#F3E84A] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#F3E84A] md:hover:shadow-[16px_16px_0px_#F3E84A] active:translate-y-1 transition-all flex items-center justify-center gap-4 md:gap-6 group">
                                <Terminal className="w-6 h-6 md:w-6 md:h-6 text-primary" />
                                INTEL LAB
                            </button>
                        </Magnetic>
                    </motion.div>

                    {/* Stats Grid - Performance Optimized Bento with 3D Tilt */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-6xl relative z-20">
                        {stats.map((stat, i) => (
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
                                        <h3
                                            className="text-[4rem] md:text-[5rem] font-heading font-black mb-2 md:mb-4 md:group-hover/stat:scale-110 transition-transform duration-500 text-center"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.value}
                                        </h3>
                                        <p className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-40 md:group-hover/stat:opacity-80 transition-all text-center relative z-20">{stat.label}</p>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Marquee Text - Optimized Scale & Calculation */}
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
