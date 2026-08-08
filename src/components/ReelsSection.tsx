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
    { id: "1", src: `${LOCAL_BASE}reel-01.mp4`, title: "Cinema Production #24", author: "@tellora", tag: "Production", likes: "24.5k", comments: "1.2k", color: "#F3E84A" },
    { id: "2", src: `${LOCAL_BASE}reel-02.mp4`, title: "Connect With Us", author: "@tellora", tag: "Studio", likes: "18.2k", comments: "842", color: "#A855F7" },
    { id: "3", src: `${LOCAL_BASE}reel-03.mp4`, title: "Brand Narrative", author: "@tellora", tag: "Case Study", likes: "12.1k", comments: "450", color: "#22C55E" },
    { id: "4", src: `${LOCAL_BASE}reel-04.mp4`, title: "Growth Architecture", author: "@tellora", tag: "Strategy", likes: "31.4k", comments: "2.1k", color: "#FFFFFF" },
    { id: "5", src: `${LOCAL_BASE}reel-05.mp4`, title: "Visual Storytelling", author: "@tellora", tag: "Production", likes: "15.2k", comments: "920", color: "#F97316" },
    { id: "6", src: `${LOCAL_BASE}reel-06.mp4`, title: "Studio Protocol", author: "@tellora", tag: "Studio", likes: "42.7k", comments: "3.4k", color: "#3B82F6" },
    { id: "7", src: `${LOCAL_BASE}reel-07.mp4`, title: "Creative Final Cut", author: "@tellora", tag: "BTS", likes: "19.7k", comments: "1.1k", color: "#FF4D6D" },
    { id: "8", src: `${LOCAL_BASE}reel-08.mp4`, title: "Goodlife Campaign", author: "@tellora", tag: "Case Study", likes: "11.4k", comments: "670", color: "#EAB308" },
    { id: "9", src: `${LOCAL_BASE}reel-09.mp4`, title: "Sequence 01", author: "@tellora", tag: "Strategy", likes: "14.2k", comments: "890", color: "#EC4899" },
    { id: "10", src: `${LOCAL_BASE}reel-10.mp4`, title: "Airright Final Edit", author: "@tellora", tag: "Production", likes: "16.1k", comments: "1.2k", color: "#8B5CF6" },
    { id: "11", src: `${LOCAL_BASE}reel-11.mp4`, title: "Master Edit", author: "@tellora", tag: "Studio", likes: "28.3k", comments: "1.8k", color: "#06B6D4" },
    { id: "12", src: `${LOCAL_BASE}reel-12.mp4`, title: "The Tellora Story", author: "@tellora", tag: "Brand", likes: "55.0k", comments: "4.2k", color: "#F43F5E" },
    { id: "13", src: `${LOCAL_BASE}reel-13.mp4`, title: "Alfa Testimonial", author: "@tellora", tag: "Testimonials", likes: "22.9k", comments: "1.5k", color: "#10B981" },
    { id: "14", src: `${LOCAL_BASE}reel-14.mp4`, title: "Digital Ecosystem", author: "@tellora", tag: "Strategy", likes: "33.1k", comments: "2.4k", color: "#6366F1" },
    { id: "15", src: `${LOCAL_BASE}reel-15.mp4`, title: "Commercial Cut", author: "@tellora", tag: "Production", likes: "20.8k", comments: "1.3k", color: "#D97706" },
    { id: "16", src: `${LOCAL_BASE}reel-16.mp4`, title: "Tellora Vision", author: "@tellora", tag: "Brand", likes: "48.2k", comments: "3.7k", color: "#E11D48" },
];

const TAGS = ["All", "BTS", "Studio", "Strategy", "Case Study", "Production", "Testimonials", "Brand"];

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
                
                if (liveAdminReels.length > 0) {
                    setAllReels(liveAdminReels);
                } else {
                    setAllReels([...staticReels]);
                }
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
        <section id="reels" className="relative z-10 py-16 sm:py-24 md:py-40 bg-black text-white overflow-hidden border-t-[4px] border-black">
            {/* Immersive Background Marquee */}
            <div className="absolute top-[30%] left-0 w-full overflow-hidden pointer-events-none opacity-[0.05] -rotate-3 z-0">
                <motion.div 
                    animate={{ x: [0, -2000] }} 
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-[20vw] md:text-[25vw] font-black uppercase font-heading tracking-tighter mx-6 md:mx-12">
                            CONTENT CORE // REVENUE ENGINE // VIRAL ARCHITECTURE //
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 mb-12 sm:mb-20 md:mb-32">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 sm:px-6 sm:py-2 bg-primary text-black brutalist-border rounded-full rotate-2 mb-4 sm:mb-8 shadow-[3px_3px_0px_#FFF] sm:shadow-[4px_4px_0px_#FFF]">
                            <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Growth Laboratory</span>
                        </div>
                        <h2 className="text-4xl sm:text-7xl md:text-9xl lg:text-[11rem] xl:text-[12rem] font-heading font-black leading-[0.88] tracking-tighter uppercase mb-4 sm:mb-6">
                            BEHIND THE <br /> <span className="text-primary italic">LENS</span>
                        </h2>
                        <p className="text-sm sm:text-xl md:text-3xl font-bold uppercase tracking-tight text-white/50 max-w-2xl leading-tight">
                            High-frequency media production. Witness the technical precision of our viral frameworks.
                        </p>
                    </div>

                    {/* Filter buttons - horizontally scrollable on mobile */}
                    <div className="w-full lg:w-auto flex overflow-x-auto pb-2 pt-1 gap-2 sm:gap-3 scrollbar-hide lg:flex-wrap lg:justify-end">
                        {TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`flex-shrink-0 px-4 py-2 sm:px-8 sm:py-3 rounded-xl sm:rounded-2xl font-black uppercase text-[9px] sm:text-[10px] tracking-widest transition-all border-2 ${
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
            <div ref={scrollRef} className="flex gap-4 sm:gap-8 md:gap-12 overflow-x-auto pb-12 sm:pb-20 px-4 sm:px-8 md:px-24 snap-x snap-mandatory scrollbar-hide relative z-10">
                {filtered.map((reel, idx) => (
                    <motion.div
                        key={reel.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedIdx(idx)}
                        className="group flex-shrink-0 snap-center w-[240px] sm:w-[320px] md:w-[400px] aspect-[9/16] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] overflow-hidden relative cursor-pointer border-[3px] sm:border-[4px] border-white/5 hover:border-primary/50 transition-all duration-700 shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 sm:hover:-translate-y-4"
                    >
                        <video 
                            src={reel.src}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-70 group-hover:opacity-100"
                            muted playsInline loop
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-5 sm:p-8 md:p-10 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3 sm:mb-6 bg-white/10 backdrop-blur-md w-fit px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/10">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{reel.tag}</span>
                            </div>
                            <h3 className="text-xl sm:text-3xl md:text-4xl font-heading font-black uppercase leading-none tracking-tighter mb-3 sm:mb-4 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {reel.title}
                            </h3>
                            <div className="flex items-center justify-between opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex items-center gap-1">
                                        <Heart size={12} className="text-primary fill-current sm:w-3.5 sm:h-3.5" />
                                        <span className="text-[10px] sm:text-xs font-black">{reel.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle size={12} className="text-white fill-current sm:w-3.5 sm:h-3.5" />
                                        <span className="text-[10px] sm:text-xs font-black">{reel.comments}</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Play size={14} className="sm:w-5 sm:h-5 ml-0.5" fill="currentColor" />
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
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-3 sm:p-6 md:p-12"
                        onClick={() => setSelectedIdx(null)}
                    >
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedIdx(null)}
                            className="absolute top-4 right-4 sm:top-8 sm:right-8 md:top-10 md:right-10 z-[1200] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center hover:rotate-90 transition-all shadow-2xl shadow-primary/40 group"
                            aria-label="Close reel modal"
                        >
                            <X size={24} className="sm:w-7 sm:h-7 group-hover:scale-110" />
                        </button>

                        {/* Navigation controls */}
                        <button
                            onClick={goPrev}
                            className="absolute left-2 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-[1200] w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all group backdrop-blur-md"
                            aria-label="Previous reel"
                        >
                            <ChevronLeft size={24} className="sm:w-8 sm:h-8 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={goNext}
                            className="absolute right-2 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 z-[1200] w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all group backdrop-blur-md"
                            aria-label="Next reel"
                        >
                            <ChevronRight size={24} className="sm:w-8 sm:h-8 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center justify-center w-full h-full max-w-lg">
                            <motion.div
                                layoutId={`reel-${filtered[selectedIdx].id}`}
                                className="relative w-full max-w-[420px] h-full max-h-[82vh] sm:max-h-[88vh] aspect-[9/16] rounded-[2rem] sm:rounded-[4rem] md:rounded-[5rem] overflow-hidden bg-black shadow-[0_0_100px_rgba(168,85,247,0.2)] border-2 border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video 
                                    src={filtered[selectedIdx].src}
                                    className="w-full h-full object-cover"
                                    autoPlay loop playsInline
                                    muted={isMuted}
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 flex flex-col justify-between p-5 sm:p-8 md:p-12">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-primary brutalist-border flex items-center justify-center">
                                                <span className="text-base sm:text-xl font-black text-black">T</span>
                                            </div>
                                            <div>
                                                <p className="text-sm sm:text-xl font-heading font-black">TELLORA MEDIA</p>
                                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Now</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                            className="w-10 h-10 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
                                            aria-label="Toggle mute"
                                        >
                                            {isMuted ? <VolumeX size={18} className="sm:w-6 sm:h-6" /> : <Volume2 size={18} className="sm:w-6 sm:h-6" />}
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase mb-3 sm:mb-6 leading-none tracking-tighter">
                                            {filtered[selectedIdx].title}
                                        </h3>
                                        <div className="flex items-center gap-6 sm:gap-12">
                                            <div className="flex items-center gap-2 group cursor-pointer">
                                                <Heart size={18} className="text-primary fill-current sm:w-6 sm:h-6 group-hover:scale-125 transition-transform" />
                                                <span className="text-sm sm:text-lg font-black">{filtered[selectedIdx].likes}</span>
                                            </div>
                                            <div className="flex items-center gap-2 group cursor-pointer">
                                                <MessageCircle size={18} className="text-white fill-current sm:w-6 sm:h-6 group-hover:scale-125 transition-transform" />
                                                <span className="text-sm sm:text-lg font-black">{filtered[selectedIdx].comments}</span>
                                            </div>
                                            <button className="flex items-center gap-2 group ml-auto" aria-label="Share reel">
                                                <Share2 size={18} className="text-white sm:w-6 sm:h-6 hover:text-primary transition-colors" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

