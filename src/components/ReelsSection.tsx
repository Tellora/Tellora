"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Play, Pause, Volume2, VolumeX, X, Heart, MessageCircle,
    Share2, Music, ChevronLeft, ChevronRight, Expand, Sparkles, Zap, Award, Film
} from "lucide-react";
import { DecodeText } from "@/components/animations/ScrollChoreography";

const reels = [
    { id: 1, src: "/reels/1.mp4", title: "Creative Shoot #01", author: "@tellora", tag: "BTS", likes: "18.2k", color: "#F3E84A" },
    { id: 2, src: "/reels/2.mp4", title: "Studio Magic", author: "@tellora", tag: "Studio", likes: "12.5k", color: "#A855F7" },
    { id: 3, src: "/reels/3.mp4", title: "Strategy Session", author: "@tellora", tag: "Strategy", likes: "9.1k", color: "#22C55E" },
    { id: 4, src: "/reels/4.mp4", title: "Win Highlight", author: "@tellora", tag: "Case Study", likes: "21.4k", color: "#FFFFFF" },
    { id: 8, src: "/reels/8.mp4", title: "High-End Optic", author: "@tellora", tag: "Production", likes: "14.7k", color: "#FF4D6D" },
];

const TAGS = ["All", "BTS", "Studio", "Growth", "Case Study", "Production"];

export default function ReelsSection() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [activeTag, setActiveTag] = useState("All");
    const [isMuted, setIsMuted] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const filtered = activeTag === "All" ? reels : reels.filter(r => r.tag === activeTag);

    const goPrev = useCallback(() => {
        if (selectedIdx === null) return;
        setSelectedIdx((selectedIdx - 1 + filtered.length) % filtered.length);
    }, [selectedIdx, filtered.length]);

    const goNext = useCallback(() => {
        if (selectedIdx === null) return;
        setSelectedIdx((selectedIdx + 1) % filtered.length);
    }, [selectedIdx, filtered.length]);

    return (
        <section
            id="reels"
            ref={sectionRef}
            className="relative z-10 py-20 md:py-32 bg-background border-t-[4px] border-black overflow-hidden"
        >
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20 gap-8 md:gap-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-2 mb-6 md:mb-8 shadow-[4px_4px_0px_#000]">
                            <Film className="text-primary w-4 h-4 md:w-4 md:h-4" />
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Viral Media Core</span>
                        </div>
                        <h2 className="heading-massive !text-5xl sm:!text-7xl md:!text-9xl tracking-tight">
                            <DecodeText text="BEHIND THE" /> <br className="hidden sm:block" /> <span className="text-primary italic"><DecodeText text="LENS" /></span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
                        <p className="max-w-xs font-black uppercase text-xs md:text-sm leading-tight mb-6 md:mb-8">
                            High-performance production. Real stories. Unapologetic results.
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3 justify-start lg:justify-end">
                            {TAGS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`px-6 py-2 brutalist-border text-[9px] font-black uppercase tracking-widest transition-all ${activeTag === tag ? 'bg-primary text-white shadow-[4px_4px_0px_#000]' : 'bg-white text-black'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-[5%] pointer-events-none opacity-20 hidden md:block">
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="w-24 md:w-40 h-24 md:h-40 border-[4px] md:border-[8px] border-primary rounded-full border-dashed"
                />
            </div>
            <div className="absolute bottom-[10%] right-[10%] pointer-events-none opacity-40 hidden md:block">
                <motion.div
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-2 bg-accent px-4 py-2 brutalist-border shadow-[4px_4px_0px_#000] rotate-12"
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase text-black">Trending</span>
                </motion.div>
            </div>

            {/* Scroll Rail */}
            <div
                ref={scrollRef}
                className="flex gap-10 overflow-x-auto pb-12 px-6 md:px-12 snap-x snap-mandatory scrollbar-hide select-none"
            >
                {filtered.map((reel, idx) => (
                    <ReelCard
                        key={reel.id}
                        reel={reel}
                        idx={idx}
                        onClick={() => setSelectedIdx(idx)}
                    />
                ))}
            </div>

            {/* Stats Bar - Dashboard Style */}
            <div className="container mx-auto px-6 mt-12 relative z-10 w-full overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 brutalist-border bg-white divide-x-[2px] md:divide-x-[3px] divide-y-[2px] md:divide-y-0 divide-black overflow-hidden shadow-[4px_4px_0px_#000] md:shadow-[8px_8px_0px_#000]">
                    {[
                        { val: "20+", label: "Original Reels", icon: Film },
                        { val: "2M+", label: "Total Reach", icon: Zap },
                        { val: "180k+", label: "Community", icon: Heart },
                        { val: "98%", label: "Virality", icon: Award },
                    ].map((s, i) => (
                        <div key={i} className={`p-4 md:p-8 flex flex-col items-center justify-center group hover:bg-primary/5 transition-colors ${i < 2 ? 'border-b-[2px] border-black md:border-b-0' : ''}`}>
                            <s.icon className="mb-2 md:mb-4 text-primary w-4 h-4 md:w-5 md:h-5" />
                            <p className="text-2xl sm:text-3xl md:text-4xl font-black font-heading leading-none mb-1 md:mb-2">{s.val}</p>
                            <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 text-center">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Overlay Mock - Playful Gen Z Style */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-6"
                        onClick={() => setSelectedIdx(null)}
                    >
                        <button className="absolute top-10 right-10 z-20 w-16 h-16 bg-primary brutalist-border text-white flex items-center justify-center hover:rotate-90 transition-transform">
                            <X size={32} />
                        </button>

                        <motion.div
                            key={selectedIdx}
                            initial={{ scale: 0.9, y: 40, rotate: -3 }}
                            animate={{ scale: 1, y: 0, rotate: 0 }}
                            className="relative w-full max-w-[450px] aspect-[9/16] rounded-[3rem] brutalist-border bg-white overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ReelPlayer
                                reel={filtered[selectedIdx]}
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function ReelCard({ reel, idx, onClick }: { reel: any; idx: number; onClick: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (!videoRef.current) return;
        if (hovered) videoRef.current.play().catch(() => { });
        else videoRef.current.pause();
    }, [hovered]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex-shrink-0 snap-center w-[280px] h-[480px] brutalist-card cursor-pointer group relative overflow-visible mt-4 mb-8 transition-transform duration-500 hover:scale-[1.05] hover:-rotate-1"
            style={{ background: reel.color }}
        >
            {/* Pop-out Play Sticker on Hover */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                className="absolute -top-6 -right-6 z-30 bg-primary p-4 brutalist-border shadow-[4px_4px_0px_#000] rounded-full rotate-12 flex items-center justify-center pointer-events-none"
            >
                <Play size={24} className="text-white fill-current" />
            </motion.div>
            <video
                ref={videoRef}
                src={reel.src}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                muted playsInline loop
            />

            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                <div className="bg-white brutalist-border px-3 py-1 w-fit mb-4 -rotate-2">
                    <span className="text-[8px] font-black uppercase text-black">{reel.tag}</span>
                </div>
                <h3 className="text-3xl font-heading font-black text-white uppercase leading-none tracking-tighter mb-4">
                    {reel.title}
                </h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Heart size={14} className="text-primary fill-current" />
                        <span className="text-white font-black text-xs">{reel.likes}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white brutalist-border flex items-center justify-center group-hover:bg-primary transition-all">
                        <Play size={16} fill="currentColor" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ReelPlayer({ reel, isMuted, setIsMuted }: { reel: any; isMuted: boolean; setIsMuted: (m: boolean) => void }) {
    return (
        <div className="relative w-full h-full bg-black">
            <video
                src={reel.src}
                className="w-full h-full object-cover"
                autoPlay loop muted={isMuted} playsInline
            />
            <div className="absolute top-6 right-6 z-20">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-12 h-12 bg-white brutalist-border flex items-center justify-center"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>
            <div className="absolute bottom-10 left-8 z-20 text-white">
                <h3 className="text-3xl font-heading font-black uppercase mb-2 italic">#{reel.tag}</h3>
                <p className="font-black opacity-80 uppercase tracking-widest text-[10px]">{reel.title}</p>
            </div>
        </div>
    );
}
