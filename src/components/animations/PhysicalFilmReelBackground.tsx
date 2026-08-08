"use client";

import { motion } from "framer-motion";
import React from "react";

const SUPABASE_BASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pteassendcvgngkkybjf.supabase.co") + "/storage/v1/object/public/reels/";

const REEL_VIDEOS = [
    `${SUPABASE_BASE}reel-01.mp4`,
    `${SUPABASE_BASE}reel-02.mp4`,
    `${SUPABASE_BASE}reel-03.mp4`,
    `${SUPABASE_BASE}reel-04.mp4`,
    `${SUPABASE_BASE}reel-05.mp4`,
    `${SUPABASE_BASE}reel-06.mp4`,
    `${SUPABASE_BASE}reel-07.mp4`,
    `${SUPABASE_BASE}reel-08.mp4`,
    `${SUPABASE_BASE}reel-09.mp4`,
    `${SUPABASE_BASE}reel-10.mp4`,
    `${SUPABASE_BASE}reel-11.mp4`,
    `${SUPABASE_BASE}reel-12.mp4`,
    `${SUPABASE_BASE}reel-13.mp4`,
    `${SUPABASE_BASE}reel-14.mp4`,
    `${SUPABASE_BASE}reel-15.mp4`,
    `${SUPABASE_BASE}reel-16.mp4`,
];

export default function PhysicalFilmReelBackground() {
    // Duplicate list for seamless infinite loop marquee
    const reelItems = [...REEL_VIDEOS, ...REEL_VIDEOS];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-45 sm:opacity-55 mix-blend-screen select-none">
            {/* Ambient Gradient Masks for smooth text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-20" />

            {/* Track 1: Upper Right-to-Left Reel Strip */}
            <div className="absolute top-[14%] md:top-[16%] left-0 w-full flex items-center -rotate-1 scale-105 transform-gpu">
                <motion.div
                    animate={{ x: [0, -3200] }}
                    transition={{
                        duration: 45,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-4 items-center whitespace-nowrap"
                >
                    {reelItems.map((videoSrc, idx) => (
                        <div
                            key={`top-${idx}`}
                            className="relative flex-shrink-0 w-[220px] sm:w-[300px] md:w-[380px] bg-black border-y-[12px] md:border-y-[16px] border-black brutalist-border shadow-[0_0_25px_rgba(0,0,0,0.9)] overflow-hidden"
                        >
                            {/* 35mm Sprocket Holes (Top Strip) */}
                            <div className="absolute -top-[12px] md:-top-[16px] inset-x-0 h-[12px] md:h-[16px] flex justify-between items-center px-2 z-30 bg-black">
                                {[...Array(7)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2.5 h-2 md:w-3.5 md:h-2.5 bg-white/30 rounded-[2px]"
                                    />
                                ))}
                            </div>

                            {/* Film Frame Label */}
                            <div className="absolute top-1 left-2 z-30 flex items-center gap-2">
                                <span className="text-[8px] md:text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
                                    KODAK 35MM #0{(idx % 16) + 1}
                                </span>
                            </div>

                            {/* Masked Video Aperture */}
                            <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 flex items-center justify-center">
                                <video
                                    src={videoSrc}
                                    className="w-[125%] h-[140%] max-w-none object-cover brightness-90 contrast-125 -translate-y-2 pointer-events-none"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70 pointer-events-none" />
                                <div className="absolute inset-x-0 top-0 h-3 bg-black/60 pointer-events-none" />
                                <div className="absolute inset-x-0 bottom-0 h-3 bg-black/60 pointer-events-none" />
                            </div>

                            {/* 35mm Sprocket Holes (Bottom Strip) */}
                            <div className="absolute -bottom-[12px] md:-bottom-[16px] inset-x-0 h-[12px] md:h-[16px] flex justify-between items-center px-2 z-30 bg-black">
                                {[...Array(7)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2.5 h-2 md:w-3.5 md:h-2.5 bg-white/30 rounded-[2px]"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Track 2: Lower Right-to-Left Reel Strip */}
            <div className="absolute top-[52%] md:top-[56%] left-0 w-full flex items-center rotate-1 scale-105 transform-gpu opacity-80">
                <motion.div
                    animate={{ x: [0, -3200] }}
                    transition={{
                        duration: 55,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-4 items-center whitespace-nowrap"
                >
                    {reelItems.slice().reverse().map((videoSrc, idx) => (
                        <div
                            key={`bot-${idx}`}
                            className="relative flex-shrink-0 w-[200px] sm:w-[280px] md:w-[350px] bg-black border-y-[12px] md:border-y-[16px] border-black brutalist-border shadow-[0_0_25px_rgba(0,0,0,0.9)] overflow-hidden"
                        >
                            {/* 35mm Sprocket Holes (Top Strip) */}
                            <div className="absolute -top-[12px] md:-top-[16px] inset-x-0 h-[12px] md:h-[16px] flex justify-between items-center px-2 z-30 bg-black">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2.5 h-2 md:w-3.5 md:h-2.5 bg-white/30 rounded-[2px]"
                                    />
                                ))}
                            </div>

                            {/* Masked Video Aperture */}
                            <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 flex items-center justify-center">
                                <video
                                    src={videoSrc}
                                    className="w-[125%] h-[140%] max-w-none object-cover brightness-85 contrast-125 sepia-[0.25] -translate-y-2 pointer-events-none"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70 pointer-events-none" />
                            </div>

                            {/* 35mm Sprocket Holes (Bottom Strip) */}
                            <div className="absolute -bottom-[12px] md:-bottom-[16px] inset-x-0 h-[12px] md:h-[16px] flex justify-between items-center px-2 z-30 bg-black">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2.5 h-2 md:w-3.5 md:h-2.5 bg-white/30 rounded-[2px]"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
