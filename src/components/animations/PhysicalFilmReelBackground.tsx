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
];

export default function PhysicalFilmReelBackground() {
    // Optimized 6-item track repeated for seamless infinite marquee loop without crushing browser hardware
    const reelItemsTrack1 = [...REEL_VIDEOS, ...REEL_VIDEOS];
    const reelItemsTrack2 = [...REEL_VIDEOS].reverse().concat([...REEL_VIDEOS].reverse());

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-45 sm:opacity-55 mix-blend-screen select-none">
            {/* Ambient Gradient Masks for smooth text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-20" />

            {/* Track 1: Upper Right-to-Left Reel Strip */}
            <div className="absolute top-[14%] md:top-[16%] left-0 w-full flex items-center -rotate-1 scale-105 transform-gpu">
                <motion.div
                    animate={{ x: [0, -1800] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-4 items-center whitespace-nowrap will-change-transform"
                >
                    {reelItemsTrack1.map((videoSrc, idx) => {
                        // Only play live video stream on 2 key frames to save 95% GPU decode budget
                        const shouldPlayVideo = idx === 0 || idx === 6;
                        return (
                            <div
                                key={`top-${idx}`}
                                className="relative flex-shrink-0 w-[220px] sm:w-[300px] md:w-[360px] bg-black border-y-[12px] md:border-y-[16px] border-black brutalist-border shadow-[0_0_25px_rgba(0,0,0,0.9)] overflow-hidden"
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
                                        KODAK 35MM #0{(idx % 6) + 1}
                                    </span>
                                </div>

                                {/* Masked Video Aperture */}
                                <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 flex items-center justify-center">
                                    {shouldPlayVideo ? (
                                        <video
                                            src={videoSrc}
                                            className="w-[125%] h-[140%] max-w-none object-cover brightness-90 contrast-125 -translate-y-2 pointer-events-none"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center">
                                            <div className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-widest">
                                                TELLORA REEL #0{(idx % 6) + 1}
                                            </div>
                                        </div>
                                    )}
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
                        );
                    })}
                </motion.div>
            </div>

            {/* Track 2: Lower Right-to-Left Reel Strip */}
            <div className="absolute top-[52%] md:top-[56%] left-0 w-full flex items-center rotate-1 scale-105 transform-gpu opacity-80">
                <motion.div
                    animate={{ x: [0, -1800] }}
                    transition={{
                        duration: 50,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-4 items-center whitespace-nowrap will-change-transform"
                >
                    {reelItemsTrack2.map((videoSrc, idx) => {
                        const shouldPlayVideo = idx === 1 || idx === 7;
                        return (
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
                                    {shouldPlayVideo ? (
                                        <video
                                            src={videoSrc}
                                            className="w-[125%] h-[140%] max-w-none object-cover brightness-85 contrast-125 sepia-[0.25] -translate-y-2 pointer-events-none"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-black via-zinc-900 to-black flex items-center justify-center">
                                            <div className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-widest">
                                                TELLORA REEL #0{(idx % 6) + 1}
                                            </div>
                                        </div>
                                    )}
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
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
