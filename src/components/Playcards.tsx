"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, Activity, Zap, BarChart, Target, Cpu } from "lucide-react";

export default function Playcards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const cards = [
        {
            title: "OMNICHANNEL SCALING",
            description: "We orchestrate multi-platform growth ecosystems that capture attention wherever your audience exists. Meta, Google, TikTok, and beyond—synchronized for maximum ROAS.",
            icon: Target,
            color: "#A855F7",
            bgColor: "#1A1A1A",
            textColor: "#FFFFFF"
        },
        {
            title: "CONVERSION ARCHITECTURE",
            description: "Traffic means nothing without conversion. We engineer high-velocity landing pages and funnels optimized through rigorous A/B testing and behavioral psychology.",
            icon: Zap,
            color: "#4AC0E4",
            bgColor: "#FDFCFB",
            textColor: "#000000"
        },
        {
            title: "PREDICTIVE ANALYTICS",
            description: "Stop guessing. Our data stack ingests millions of data points to model customer lifetime value, predicting the precise moment to scale ad spend.",
            icon: BarChart,
            color: "#F3E84A",
            bgColor: "#1A1A1A",
            textColor: "#FFFFFF"
        },
        {
            title: "AUTONOMOUS ACQUISITION",
            description: "Leveraging machine learning models to automate bidding and creative rotation. The engine learns, adapts, and scales 24/7 without human fatigue.",
            icon: Cpu,
            color: "#22C55E",
            bgColor: "#FDFCFB",
            textColor: "#000000"
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full bg-[#0a0a0a] pb-[10vh] border-y-[6px] border-black">
            <div className="absolute top-0 left-0 w-full h-full noise-overlay opacity-[0.2] pointer-events-none" />

            <div className="sticky top-0 w-full h-0 pt-24 md:pt-32 z-10 pointer-events-none">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black brutalist-border mb-6 rotate-[-2deg] shadow-[4px_4px_0px_#A855F7] pointer-events-auto">
                        <div className="w-2 h-2 bg-primary animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest">Core Capabilities</span>
                    </div>
                    <h2 className="text-5xl md:text-[8rem] font-heading font-black uppercase tracking-tighter leading-[0.8] text-white drop-shadow-[4px_4px_0px_#000]">
                        THE GROWTH <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">PLAYBOOK</span>
                    </h2>
                </div>
            </div>

            <div className="relative mt-[40vh] md:mt-[50vh]">
                {cards.map((card, index) => {
                    const targetScale = 1 - ((cards.length - index) * 0.05);
                    return (
                        <Card
                            key={index}
                            i={index}
                            {...card}
                            progress={scrollYProgress}
                            range={[index * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}

const Card = ({
    i,
    title,
    description,
    icon: Icon,
    color,
    bgColor,
    textColor,
    progress,
    range,
    targetScale,
}: {
    i: number;
    title: string;
    description: string;
    icon: any;
    color: string;
    bgColor: string;
    textColor: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0" style={{ paddingTop: `max(5vh, ${i * 40}px)` }}>
            <motion.div
                style={{
                    scale,
                    backgroundColor: bgColor,
                    color: textColor,
                    top: `calc(5vh + ${i * 30}px)`
                }}
                className="relative w-[90vw] md:w-[70vw] h-[65vh] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] brutalist-border shadow-[10px_10px_0px_#000] md:shadow-[20px_20px_0px_#000] flex flex-col md:flex-row overflow-hidden origin-top transform-gpu pointer-events-auto"
            >
                {/* Visual Half */}
                <div className="w-full md:w-5/12 h-2/5 md:h-full border-b-[4px] md:border-b-0 md:border-r-[4px] border-black relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: color }}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                    <div className="absolute inset-0 halftone-overlay opacity-30 mix-blend-overlay" />

                    <motion.div style={{ scale: imageScale }} className="relative z-10 w-20 h-20 md:w-48 md:h-48 bg-black brutalist-border shadow-[8px_8px_0px_rgba(255,255,255,0.2)] rotate-[-10deg] flex items-center justify-center pointer-events-none">
                        <Icon className="w-10 h-10 md:w-24 md:h-24 text-white" />
                    </motion.div>
                </div>

                {/* Content Half */}
                <div className="w-full md:w-7/12 h-3/5 md:h-full p-6 md:p-16 flex flex-col justify-center relative">
                    <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] mb-3 md:mb-6 opacity-80" style={{ color: color }}>
                        Module 0{i + 1}
                    </span>
                    <h3 className="text-2xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tighter leading-[0.9] mb-4 md:mb-8">
                        {title}
                    </h3>
                    <p className="text-sm md:text-xl font-medium opacity-80 leading-relaxed max-w-lg mb-6 md:mb-10 lg:pr-10">
                        {description}
                    </p>

                    <div className="mt-auto pointer-events-auto">
                        <button className="flex items-center gap-3 font-black uppercase text-xs md:text-sm tracking-widest group">
                            <span className="relative z-10 border-b-2 border-transparent group-hover:border-current transition-colors pb-1">Initialize</span>
                            <span className="w-8 h-8 rounded-full border-2 border-inherit flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
