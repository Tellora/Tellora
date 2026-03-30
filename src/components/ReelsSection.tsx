"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play, Pause, Volume2, VolumeX, X, Heart, MessageCircle,
    Share2, Music, ChevronLeft, ChevronRight, Sparkles, Zap, Award, Film,
    Check
} from "lucide-react";
import { DecodeText } from "@/components/animations/ScrollChoreography";
import { getReels, Reel } from "@/lib/store";

// Helper parsers for Admin Data embeds
function getEmbedUrl(url?: string): string | null {
    if (!url) return null;
    try {
        const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
        // We append query params to attempt autoplay/mute for seamless overlay
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytMatch[1]}`;
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&loop=1&muted=1&background=1`;
        if (url.includes("embed")) return url;
        return null;
    } catch {
        return null;
    }
}

function getThumbnail(url?: string): string | null {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    return null; // Fallback to a placeholder design if Vimeo
}

const staticReels = [
    { id: "1", src: "/reels/1.mp4", title: "Creative Shoot #01", author: "@tellora", tag: "BTS", likes: "18.2k", comments: "124", color: "#F3E84A" },
    { id: "2", src: "/reels/2.mp4", title: "Studio Magic", author: "@tellora", tag: "Studio", likes: "12.5k", comments: "89", color: "#A855F7" },
    { id: "3", src: "/reels/10.mp4", title: "Strategy Session", author: "@tellora", tag: "Strategy", likes: "9.1k", comments: "45", color: "#22C55E" },
    { id: "4", src: "/reels/14.mp4", title: "Win Highlight", author: "@tellora", tag: "Case Study", likes: "21.4k", comments: "312", color: "#FFFFFF" },
    { id: "5", src: "/reels/15.mp4", title: "Brand Identity", author: "@tellora", tag: "Production", likes: "11.2k", comments: "105", color: "#F97316" },
    { id: "6", src: "/reels/16.mp4", title: "Viral Execution", author: "@tellora", tag: "Scale", likes: "33.7k", comments: "482", color: "#3B82F6" },
    { id: "7", src: "/reels/8.mp4", title: "High-End Optic", author: "@tellora", tag: "Production", likes: "14.7k", comments: "156", color: "#FF4D6D" },
    { id: "8", src: "/reels/bts1.mp4", title: "Behind The Scenes 1", author: "@tellora", tag: "BTS", likes: "8.4k", comments: "56", color: "#EAB308" },
    { id: "9", src: "/reels/bts2.mp4", title: "Behind The Scenes 2", author: "@tellora", tag: "BTS", likes: "9.2k", comments: "67", color: "#EC4899" },
    { id: "10", src: "/reels/bts3.mp4", title: "Behind The Scenes 3", author: "@tellora", tag: "BTS", likes: "10.1k", comments: "88", color: "#8B5CF6" },
    { id: "11", src: "/reels/cicilreel.mp4", title: "Client Delivery", author: "@tellora", tag: "Case Study", likes: "15.3k", comments: "145", color: "#14B8A6" },
    { id: "12", src: "/reels/officeshoot.mp4", title: "Office Culture", author: "@tellora", tag: "Studio", likes: "19.8k", comments: "210", color: "#6366F1" },
];

const TAGS = ["All", "BTS", "Studio", "Growth", "Case Study", "Production"];

export default function ReelsSection() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [activeTag, setActiveTag] = useState("All");
    const [isMuted, setIsMuted] = useState(true);
    const [allReels, setAllReels] = useState<any[]>(staticReels); // Typed as any to hybridize static + admin models
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Fetch dynamic admin reels and fuse with static reels
    useEffect(() => {
        async function fetchAdminData() {
            try {
                const adminReels = await getReels();
                const liveAdminReels = adminReels
                    .filter(r => r.status === "Live" && r.embedUrl)
                    .map(r => {
                        const isMp4 = r.embedUrl.toLowerCase().endsWith('.mp4');
                        return {
                            id: r.id,
                            src: isMp4 ? (r.embedUrl.startsWith('/') ? r.embedUrl : `/reels/${r.embedUrl}`) : undefined,
                            embedUrl: isMp4 ? undefined : r.embedUrl,
                            title: r.title,
                            author: "@tellora",
                            tag: r.tag,
                            likes: r.likes,
                            comments: Math.floor(parseInt(r.likes || "100") * 0.1).toString(), 
                            color: "#" + Math.floor(Math.random()*16777215).toString(16), 
                            isEmbed: !isMp4
                        };
                    });
                
                // Keep static reels first, append user-created admin reels
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

    // Global keyboard navigation
    useEffect(() => {
        if (selectedIdx === null) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
            if (e.key === "Escape") setSelectedIdx(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIdx, goNext, goPrev]);

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

            {/* Atmospheric Background Marquee */}
            <div className="absolute top-[35%] md:top-[45%] left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] -rotate-[5deg] scale-110 z-0">
                <motion.div
                    animate={{ x: [0, -2000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className="text-[18vw] font-black uppercase text-black font-heading tracking-tighter mx-8">
                            VIRAL MEDIA ENGAGEMENT // HIGH FREQUENCY ARCHITECTURE //
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Rail */}
            <div
                ref={scrollRef}
                className="flex gap-10 overflow-x-auto pb-12 px-6 md:px-12 snap-x snap-mandatory scrollbar-hide select-none relative z-20"
            >
                {filtered.map((reel, idx) => (
                    <ReelCard
                        key={reel.id}
                        reel={reel}
                        idx={idx}
                        onClick={() => setSelectedIdx(idx)}
                    />
                ))}
                
                {filtered.length === 0 && (
                    <div className="w-full text-center py-20 opacity-50 font-black tracking-widest uppercase">
                        No Reels Found For Tag
                    </div>
                )}
            </div>

            {/* Stats Bar - Dashboard Style */}
            <div className="container mx-auto px-6 mt-12 relative z-10 w-full overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 brutalist-border bg-white divide-x-[2px] md:divide-x-[3px] divide-y-[2px] md:divide-y-0 divide-black overflow-hidden shadow-[4px_4px_0px_#000] md:shadow-[8px_8px_0px_#000]">
                    {[
                        { val: `${allReels.length}+`, label: "Original Reels", icon: Film },
                        { val: "Global", label: "Reach", icon: Zap },
                        { val: "Growing", label: "Community", icon: Heart },
                        { val: "Data", label: "Driven Virality", icon: Award },
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
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-4 md:p-6"
                        onClick={() => setSelectedIdx(null)}
                    >
                        <button className="absolute top-6 right-6 md:top-10 md:right-10 z-20 w-12 h-12 md:w-16 md:h-16 bg-primary brutalist-border text-white flex items-center justify-center hover:rotate-90 transition-transform shadow-[4px_4px_0px_#000]">
                            <X size={24} className="md:w-8 md:h-8" />
                        </button>

                        {/* Navigation Arrows */}
                        <button
                            onClick={goPrev}
                            className="absolute left-4 md:left-10 z-[1010] p-3 md:p-5 bg-white brutalist-border shadow-[4px_4px_0px_#000] hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95 hidden sm:block"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <button
                            onClick={goNext}
                            className="absolute right-4 md:right-10 z-[1010] p-3 md:p-5 bg-white brutalist-border shadow-[4px_4px_0px_#000] hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95 hidden sm:block"
                        >
                            <ChevronRight size={32} />
                        </button>

                        <motion.div
                            key={selectedIdx}
                            initial={{ scale: 0.9, y: 40, rotate: -3 }}
                            animate={{ scale: 1, y: 0, rotate: 0 }}
                            exit={{ scale: 0.9, y: 40, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative w-full max-w-[450px] aspect-[9/16] rounded-[2rem] md:rounded-[3rem] brutalist-border bg-black overflow-hidden shadow-[10px_10px_0px_primary]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ReelPlayer
                                reel={filtered[selectedIdx]}
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                                goNext={goNext}
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
        if (!videoRef.current || reel.isEmbed) return;
        if (hovered) videoRef.current.play().catch(() => { });
        else videoRef.current.pause();
    }, [hovered, reel.isEmbed]);

    // Derived thumbnail for embeds
    const thumb = reel.isEmbed ? getThumbnail(reel.embedUrl) : null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex-shrink-0 snap-center w-[280px] h-[480px] brutalist-card cursor-pointer group relative overflow-hidden mt-8 mb-12 transition-all duration-700 ease-out hover:scale-[1.08] hover:-translate-y-4 hover:rotate-1 shadow-[8px_8px_0px_#000] hover:shadow-[16px_16px_0px_#000]"
            style={{ background: reel.color || '#F3E84A' }}
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                className="absolute -top-6 -right-6 z-30 bg-primary p-4 brutalist-border shadow-[4px_4px_0px_#000] rounded-full rotate-12 flex items-center justify-center pointer-events-none"
            >
                <Play size={24} className="text-white fill-current" />
            </motion.div>
            
            {/* Hybrid Rendering: Native MP4 or Embed Thumbnail */}
            {!reel.isEmbed ? (
                <video
                    ref={videoRef}
                    src={reel.src}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    muted playsInline loop
                />
            ) : (
                <div className="w-full h-full bg-black relative">
                    {thumb ? (
                        <img src={thumb} alt={reel.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Play size={48} className="text-primary" />
                            <span className="text-[10px] uppercase font-black tracking-widest">External Reel</span>
                        </div>
                    )}
                </div>
            )}

            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500">
                <div className="bg-white brutalist-border px-3 py-1 w-fit mb-4 -rotate-2 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-[2px_2px_0px_#000]">
                    <span className="text-[8px] font-black uppercase transition-colors duration-500">{reel.tag}</span>
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

function ReelPlayer({ reel, isMuted, setIsMuted, goNext }: { reel: any; isMuted: boolean; setIsMuted: (m: boolean) => void, goNext: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showPlayAnim, setShowPlayAnim] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    
    const isEmbed = !!reel.isEmbed;
    const embedSrc = isEmbed ? getEmbedUrl(reel.embedUrl) : null;
    
    // Core playback control - Only for native mp4s
    const togglePlay = useCallback((e?: React.MouseEvent) => {
        if(e) e.stopPropagation();
        if(isEmbed) return; // cannot dictate play/pause on iframes externally with raw js easily
        if(!videoRef.current) return;
        
        if(videoRef.current.paused) {
            videoRef.current.play().catch(()=>{});
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        
        setShowPlayAnim(true);
        setTimeout(() => setShowPlayAnim(false), 500);
    }, [isEmbed]);

    const handleTimeUpdate = () => {
        if(isEmbed || !videoRef.current) return;
        const current = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        if(duration > 0) {
            setProgress((current / duration) * 100);
        }
    };
    
    const handleVideoEnd = () => goNext();

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handlePlayerKeys = (e: KeyboardEvent) => {
            if (e.key === " " && !isEmbed) {
                e.preventDefault();
                togglePlay();
            } else if (e.key.toLowerCase() === "m") {
                setIsMuted(!isMuted);
            }
        };
        window.addEventListener("keydown", handlePlayerKeys);
        return () => window.removeEventListener("keydown", handlePlayerKeys);
    }, [togglePlay, isMuted, setIsMuted, isEmbed]);
    
    useEffect(() => {
        if(!isEmbed && isPlaying && videoRef.current) {
            videoRef.current.play().catch(()=>{});
        }
    }, [isPlaying, isEmbed]);

    return (
        <div className="relative w-full h-full bg-black cursor-pointer group" onClick={togglePlay}>
            {/* Hybrid Player Mounting */}
            {!isEmbed ? (
                <video
                    ref={videoRef}
                    src={reel.src}
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted={isMuted} 
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnd}
                />
            ) : (
                <div className="w-full h-full overflow-hidden flex items-center bg-black bg-opacity-90">
                    <iframe
                        src={embedSrc || ""}
                        className="w-full aspect-[9/16] pointer-events-auto"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    />
                    {/* Add an invisible guard if we wanted to prevent clicks, but we want users to be able to unmute YT native */}
                </div>
            )}
            
            {/* Play/Pause Pulse Animation - Native Only */}
            <AnimatePresence>
                {!isEmbed && showPlayAnim && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                    >
                        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-full">
                            {isPlaying ? <Play size={64} className="text-white fill-current ml-2" /> : <Pause size={64} className="text-white fill-current" />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Static Pause Indicator - Native Only */}
            {!isEmbed && !isPlaying && !showPlayAnim && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-50">
                    <Play size={80} className="text-white fill-current shadow-2xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" />
                </div>
            )}

            {/* Top Right Utilities (Mute toggle, only works fully for native video unless YouTube exposes controls in iframe attrs) */}
            {!isEmbed && (
                <div className="absolute top-6 right-6 z-40">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                        className="w-12 h-12 bg-white brutalist-border flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_#A855F7]"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>
            )}
            
            {/* Contextual Action Sidebar (Right Side) */}
            <div className="absolute bottom-24 right-4 z-40 flex flex-col items-center gap-6 pointer-events-auto">
                <button onClick={handleLike} className="flex flex-col items-center gap-1 group/like">
                    <motion.div whileTap={{ scale: 0.8 }} className={`w-12 h-12 rounded-full brutalist-border flex items-center justify-center transition-all ${isLiked ? 'bg-primary text-white shadow-[4px_4px_0px_#000]' : 'bg-white text-black hover:bg-black hover:text-white'}`}>
                        <Heart size={20} className={isLiked ? "fill-current" : ""} />
                    </motion.div>
                    <span className="text-white font-black text-[10px] tracking-widest drop-shadow-md">
                        {isLiked ? (parseFloat(reel.likes) + 0.1).toFixed(1) + "k" : reel.likes}
                    </span>
                </button>
                
                <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1">
                    <motion.div whileTap={{ scale: 0.8 }} className="w-12 h-12 bg-white text-black rounded-full brutalist-border flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_#F3E84A]">
                        <MessageCircle size={20} />
                    </motion.div>
                    <span className="text-white font-black text-[10px] tracking-widest drop-shadow-md">{reel.comments}</span>
                </button>

                <button onClick={handleShare} className="flex flex-col items-center gap-1 relative">
                    <motion.div whileTap={{ scale: 0.8 }} className={`w-12 h-12 rounded-full brutalist-border flex items-center justify-center transition-colors ${copied ? 'bg-green-500 text-white shadow-[4px_4px_0px_#000]' : 'bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_#22C55E]'}`}>
                        {copied ? <Check size={20} /> : <Share2 size={20} />}
                    </motion.div>
                    <span className="text-white font-black text-[10px] tracking-widest drop-shadow-md">{copied ? "COPIED!" : "SHARE"}</span>
                </button>
            </div>

            {/* Bottom Info Gradient Area */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent z-20 pointer-events-none" />
            
            {/* Meta Info */}
            <div className="absolute bottom-8 left-6 right-20 z-30 pointer-events-none">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full brutalist-border flex items-center justify-center shadow-[2px_2px_0px_#000]">
                        <span className="text-[10px] font-black">{reel.author.charAt(1).toUpperCase()}</span>
                    </div>
                    <span className="text-white font-heading font-black text-sm">{reel.author}</span>
                </div>
                
                <h3 className="text-2xl font-heading font-black uppercase mb-2 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{reel.title}</h3>
                <p className="font-black text-white/90 bg-black/50 backdrop-blur-md px-2 py-1 w-fit rounded-lg uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                    <Music size={12} className="text-primary" /> {reel.title} · Original Audio
                </p>
            </div>

            {/* Progress Bar Container - Native Only */}
            {!isEmbed && (
                <div className="absolute bottom-0 left-0 w-full h-[6px] bg-white/20 z-40 cursor-pointer pointer-events-auto" onClick={(e) => {
                    e.stopPropagation();
                    if(!videoRef.current) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = clickX / rect.width;
                    videoRef.current.currentTime = percent * videoRef.current.duration;
                }}>
                    <div 
                        className="h-full bg-primary relative pointer-events-none" 
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFF]" />
                    </div>
                </div>
            )}
            
            {/* Fallback Static Bar For Embeds */}
            {isEmbed && (
                <div className="absolute bottom-0 left-0 w-full h-[6px] bg-primary z-40 pointer-events-none" />
            )}
        </div>
    );
}
