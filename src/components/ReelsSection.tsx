"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play, Pause, Volume2, VolumeX, X, Heart, MessageCircle,
    Share2, Music, ChevronLeft, ChevronRight, Sparkles, Zap, Award, Film,
    Check, Maximize2
} from "lucide-react";
import { DecodeText } from "@/components/animations/ScrollChoreography";
import { getReels } from "@/lib/store";

// Use local paths since files are in public/reels
const LOCAL_BASE = "/reels/";

const staticReels = [
    { id: "1", src: `${LOCAL_BASE}1.mp4`, title: "Cinema Production #01", author: "@tellora", tag: "Production", likes: "24.5k", comments: "1.2k", color: "#F3E84A" },
    { id: "2", src: `${LOCAL_BASE}2.mp4`, title: "Studio Protocol", author: "@tellora", tag: "Studio", likes: "18.2k", comments: "842", color: "#A855F7" },
    { id: "3", src: `${LOCAL_BASE}10.mp4`, title: "Strategic Audit", author: "@tellora", tag: "Strategy", likes: "12.1k", comments: "450", color: "#22C55E" },
    { id: "4", src: `${LOCAL_BASE}14.mp4`, title: "Growth Architecture", author: "@tellora", tag: "Case Study", likes: "31.4k", comments: "2.1k", color: "#FFFFFF" },
    { id: "5", src: `${LOCAL_BASE}15.mp4`, title: "Brand Identity", author: "@tellora", tag: "Production", likes: "15.2k", comments: "920", color: "#F97316" },
    { id: "6", src: `${LOCAL_BASE}16.mp4`, title: "Viral Flow", author: "@tellora", tag: "Scale", likes: "42.7k", comments: "3.4k", color: "#3B82F6" },
    { id: "7", src: `${LOCAL_BASE}8.mp4`, title: "Optic Nerve", author: "@tellora", tag: "Production", likes: "19.7k", comments: "1.1k", color: "#FF4D6D" },
    { id: "8", src: `${LOCAL_BASE}bts1.mp4`, title: "Behind The Lens 01", author: "@tellora", tag: "BTS", likes: "11.4k", comments: "670", color: "#EAB308" },
    { id: "9", src: `${LOCAL_BASE}bts2.mp4`, title: "Behind The Lens 02", author: "@tellora", tag: "BTS", likes: "14.2k", comments: "890", color: "#EC4899" },
    { id: "10", src: `${LOCAL_BASE}bts3.mp4`, title: "Behind The Lens 03", author: "@tellora", tag: "BTS", likes: "16.1k", comments: "1.2k", color: "#8B5CF6" },
];

const TAGS = ["All", "BTS", "Studio", "Strategy", "Case Study", "Production"];

export default function ReelsSection() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [activeTag, setActiveTag] = useState("All");
    const [isMuted, setIsMuted] = useState(true);
    const [allReels, setAllReels] = useState<any[]>(staticReels);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchAdminData() {
            try {
                const adminReels = await getReels();
                const liveAdminReels = adminReels
                    .filter(r => r.status === "Live" && r.embed_url)
                    .map(r => ({
                        id: r.id,
                        src: r.embed_url!.startsWith('http') ? r.embed_url : `${LOCAL_BASE}${r.embed_url}`,
                        title: r.title,
                        author: "@tellora",
                        tag: r.tag,
                        likes: r.likes,
                        comments: (parseInt(r.likes || "0") * 0.1).toFixed(0),
                        color: "#" + Math.floor(Math.random()*16777215).toString(16),
                        isEmbed: !r.embed_url!.endsWith('.mp4')
                    }));
                setAllReels([...staticReels, ...liveAdminReels]);
            } catch (err) {
                console.error("Failed fetching admin reels", err);
            }
        }
        fetchAdminData();
    }, []);

    const filtered = activeTag === "All" ? allReels : allReels.filter(r => r.tag === activeTag);

    const goPrev = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedIdx === null) return;
        setSelectedIdx((selectedIdx - 1 + filtered.length) % filtered.length);
    }, [selectedIdx, filtered.length]);

    const goNext = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedIdx === null) return;
        setSelectedIdx((selectedIdx + 1) % filtered.length);
    }, [selectedIdx, filtered.length]);

    return (
        <section id="reels" className="relative z-10 py-20 md:py-40 bg-black text-white overflow-hidden border-t-[4px] border-black">
            {/* Immersive Background Marquee */}
            <div className="absolute top-[30%] left-0 w-full overflow-hidden pointer-events-none opacity-[0.05] -rotate-3 z-0">
                <motion.div 
                    animate={{ x: [0, -2000] }} 
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-[25vw] font-black uppercase font-heading tracking-tighter mx-12">
                            CONTENT CORE // REVENUE ENGINE // VIRAL ARCHITECTURE //
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10 mb-20 md:mb-32">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary text-black brutalist-border rounded-full rotate-2 mb-8 shadow-[4px_4px_0px_#FFF]">
                            <Film className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Growth Laboratory</span>
                        </div>
                        <h2 className="text-[5rem] md:text-[12rem] font-heading font-black leading-[0.85] tracking-tighter uppercase mb-6">
                            BEHIND THE <br /> <span className="text-primary italic">LENS</span>
                        </h2>
                        <p className="text-xl md:text-3xl font-bold uppercase tracking-tight text-white/50 max-w-2xl leading-tight">
                            High-frequency media production. Witness the technical precision of our viral frameworks.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
                        {TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border-2 ${
                                    activeTag === tag ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-transparent border-white/10 text-white/40 hover:border-white/40'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cinematic Scroll Rail */}
            <div ref={scrollRef} className="flex gap-8 md:gap-12 overflow-x-auto pb-20 px-6 md:px-24 snap-x snap-mandatory scrollbar-hide relative z-10">
                {filtered.map((reel, idx) => (
                    <motion.div
                        key={reel.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedIdx(idx)}
                        className="group flex-shrink-0 snap-center w-[300px] md:w-[400px] aspect-[9/16] rounded-[3rem] md:rounded-[4rem] overflow-hidden relative cursor-pointer border-[4px] border-white/5 hover:border-primary/50 transition-all duration-700 shadow-2xl hover:shadow-primary/20 hover:-translate-y-4"
                    >
                        <video 
                            src={reel.src}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                            muted playsInline loop
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                            <div className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-white/10">
                                <span className="text-[10px] font-black uppercase tracking-widest">{reel.tag}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-black uppercase leading-none tracking-tighter mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {reel.title}
                            </h3>
                            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Heart size={14} className="text-primary fill-current" />
                                        <span className="text-xs font-black">{reel.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle size={14} className="text-white fill-current" />
                                        <span className="text-xs font-black">{reel.comments}</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Play size={20} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Immersive Overlay Player */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-12"
                        onClick={() => setSelectedIdx(null)}
                    >
                        <button className="absolute top-10 right-10 z-[1100] w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center hover:rotate-90 transition-all shadow-2xl shadow-primary/40 group">
                            <X size={32} className="group-hover:scale-110" />
                        </button>

                        <div className="flex items-center justify-center w-full h-full gap-12">
                            <motion.button
                                onClick={goPrev}
                                className="hidden xl:flex w-20 h-20 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full items-center justify-center transition-all group"
                            >
                                <ChevronLeft size={40} className="group-hover:-translate-x-2 transition-transform" />
                            </motion.button>

                            <motion.div
                                layoutId={`reel-${filtered[selectedIdx].id}`}
                                className="relative h-full max-h-[90vh] aspect-[9/16] rounded-[4rem] md:rounded-[5rem] overflow-hidden bg-black shadow-[0_0_100px_rgba(168,85,247,0.2)] border-2 border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video 
                                    src={filtered[selectedIdx].src}
                                    className="w-full h-full object-cover"
                                    autoPlay loop
                                    muted={isMuted}
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 flex flex-col justify-between p-12">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-primary brutalist-border flex items-center justify-center">
                                                <span className="text-xl font-black">T</span>
                                            </div>
                                            <div>
                                                <p className="text-xl font-heading font-black">TELLORA MEDIA</p>
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Now</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                            className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
                                        >
                                            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-4xl font-heading font-black uppercase mb-6 leading-none tracking-tighter">
                                            {filtered[selectedIdx].title}
                                        </h3>
                                        <div className="flex items-center gap-12">
                                            <div className="flex items-center gap-2 group cursor-pointer">
                                                <Heart size={24} className="text-primary fill-current group-hover:scale-125 transition-transform" />
                                                <span className="text-lg font-black">{filtered[selectedIdx].likes}</span>
                                            </div>
                                            <div className="flex items-center gap-2 group cursor-pointer">
                                                <MessageCircle size={24} className="text-white fill-current group-hover:scale-125 transition-transform" />
                                                <span className="text-lg font-black">{filtered[selectedIdx].comments}</span>
                                            </div>
                                            <button className="flex items-center gap-2 group ml-auto">
                                                <Share2 size={24} className="text-white hover:text-primary transition-colors" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.button
                                onClick={goNext}
                                className="hidden xl:flex w-20 h-20 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full items-center justify-center transition-all group"
                            >
                                <ChevronRight size={40} className="group-hover:translate-x-2 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
