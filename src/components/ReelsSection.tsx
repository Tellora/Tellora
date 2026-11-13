"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play, Volume2, VolumeX, X, Heart, MessageCircle,
    Share2, ChevronLeft, ChevronRight, Film, Check, Eye
} from "lucide-react";
import { getReels } from "@/lib/store";

const LOCAL_BASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pteassendcvgngkkybjf.supabase.co") + "/storage/v1/object/public/reels/";

type Reel = {
    id: string;
    src: string;
    title: string;
    author: string;
    tag: string;
    likes: string;
    comments: string;
    color: string;
    isEmbed?: boolean;
};

const staticReels: Reel[] = [
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
];

const TAGS = ["All", "Studio", "Production", "Strategy", "Case Study", "Brand", "BTS"];

function ReelCard({
    reel,
    onOpen,
    priority = false,
    variant = "grid",
}: {
    reel: Reel;
    onOpen: () => void;
    priority?: boolean;
    variant?: "grid" | "feature";
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovered, setHovered] = useState(false);

    const handleEnter = () => {
        setHovered(true);
        const v = videoRef.current;
        if (v) {
            v.currentTime = 0;
            v.play().catch(() => {});
        }
    };
    const handleLeave = () => {
        setHovered(false);
        const v = videoRef.current;
        if (v) v.pause();
    };

    const isFeature = variant === "feature";

    return (
        <motion.button
            type="button"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            onClick={onOpen}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={`group relative block w-full overflow-hidden text-left bg-zinc-950 border-[3px] border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#A855F7] transition-shadow duration-300 ${
                isFeature ? "aspect-[9/16] md:aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem]" : "aspect-[9/16] rounded-2xl"
            }`}
            aria-label={`Play reel: ${reel.title}`}
        >
            <video
                ref={videoRef}
                src={reel.src}
                muted
                loop
                playsInline
                preload={priority ? "metadata" : "none"}
                poster={undefined}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    hovered ? "opacity-100 scale-100" : "opacity-60 scale-[1.02]"
                }`}
            />

            {/* Dark gradient so text stays legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            {/* Top: tag chip */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-1.5 px-2.5 py-1 bg-white text-black border-2 border-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] shadow-[2px_2px_0px_#000]">
                {reel.tag}
            </div>

            {/* Play indicator (shown when idle) */}
            {!hovered && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                        <Play size={isFeature ? 24 : 20} className="text-white ml-0.5" fill="currentColor" />
                    </div>
                </div>
            )}

            {/* Bottom: title + stats */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-5 flex flex-col gap-2 ${isFeature ? "md:p-7" : ""}`}>
                <h3 className={`font-heading font-black uppercase leading-[0.95] tracking-tight text-white ${
                    isFeature ? "text-2xl md:text-4xl" : "text-base md:text-lg"
                }`}>
                    {reel.title}
                </h3>
                <div className="flex items-center gap-3 text-white/80 text-[10px] md:text-xs font-black">
                    <span className="flex items-center gap-1">
                        <Heart size={12} className="text-primary fill-current" />
                        {reel.likes}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageCircle size={12} />
                        {reel.comments}
                    </span>
                </div>
            </div>
        </motion.button>
    );
}

export default function ReelsSection() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [activeTag, setActiveTag] = useState("All");
    const [isMuted, setIsMuted] = useState(true);
    const [allReels, setAllReels] = useState<Reel[]>(staticReels);
    const [copiedShare, setCopiedShare] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const adminReels = await getReels();
                const live: Reel[] = adminReels
                    .filter(r => r.status === "Live" && r.embed_url)
                    .map(r => ({
                        id: r.id,
                        src: r.embed_url!.startsWith('http') ? r.embed_url : `${LOCAL_BASE}${r.embed_url}`,
                        title: r.title,
                        author: "@tellora",
                        tag: r.tag,
                        likes: r.likes,
                        comments: (parseInt(r.likes || "0") * 0.1).toFixed(0),
                        color: "#A855F7",
                        isEmbed: !r.embed_url!.endsWith('.mp4')
                    }));
                if (live.length > 0) setAllReels(live);
            } catch (err) {
                console.error("Failed fetching admin reels", err);
            }
        })();
    }, []);

    const filtered = useMemo(
        () => (activeTag === "All" ? allReels : allReels.filter(r => r.tag === activeTag)),
        [activeTag, allReels]
    );

    const featured = filtered[0];
    const grid = filtered.slice(1);

    const openAt = useCallback((reelId: string) => {
        const idx = filtered.findIndex(r => r.id === reelId);
        if (idx >= 0) setSelectedIdx(idx);
    }, [filtered]);

    const goPrev = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedIdx(i => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    }, [filtered.length]);

    const goNext = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedIdx(i => (i === null ? i : (i + 1) % filtered.length));
    }, [filtered.length]);

    useEffect(() => {
        if (selectedIdx === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedIdx(null);
            else if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "ArrowRight") goNext();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [selectedIdx, goPrev, goNext]);

    const handleShare = async (reel: Reel, e: React.MouseEvent) => {
        e.stopPropagation();
        const shareData = {
            title: `${reel.title} | Tellora Media`,
            text: `Watch "${reel.title}" on Tellora Media`,
            url: typeof window !== "undefined" ? `${window.location.origin}/#reels` : "https://telloramediahq.com/#reels",
        };
        if (typeof navigator !== "undefined" && navigator.share) {
            try { await navigator.share(shareData); return; } catch (err: any) { if (err?.name === "AbortError") return; }
        }
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(shareData.url);
                setCopiedShare(true);
                setTimeout(() => setCopiedShare(false), 2200);
            } catch (err) { console.error("Clipboard copy failed", err); }
        }
    };

    return (
        <section id="reels" className="relative z-10 bg-black text-white overflow-hidden border-y-[4px] border-black">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-24 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 -right-24 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
                {/* ── Header: label + title + filter ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12 mb-10 md:mb-14">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-black border-2 border-white shadow-[3px_3px_0px_#FFF] mb-5">
                            <Film className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.25em]">Reels Vault</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.9] tracking-tighter uppercase mb-4">
                            Behind the<br />
                            <span className="italic text-primary">lens</span>
                            <span className="text-primary">.</span>
                        </h2>
                        <p className="text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
                            Short-form work from the studio — campaigns, BTS, and brand narratives built for high-frequency social.
                        </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Filter</span>
                        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full lg:w-auto lg:flex-wrap lg:justify-end">
                            {TAGS.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setActiveTag(tag)}
                                    className={`flex-shrink-0 px-4 py-2 border-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
                                        activeTag === tag
                                            ? "bg-primary text-black border-primary shadow-[3px_3px_0px_#FFF]"
                                            : "bg-transparent text-white/60 border-white/15 hover:border-white/50 hover:text-white"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Magazine layout: featured + grid ── */}
                {featured && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                        {/* Featured (left, large) */}
                        <div className="lg:col-span-5 xl:col-span-4">
                            <ReelCard
                                reel={featured}
                                onOpen={() => openAt(featured.id)}
                                priority
                                variant="feature"
                            />
                        </div>

                        {/* Grid (right) */}
                        <div className="lg:col-span-7 xl:col-span-8">
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                                {grid.slice(0, 11).map((reel) => (
                                    <ReelCard
                                        key={reel.id}
                                        reel={reel}
                                        onOpen={() => openAt(reel.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* View all strip */}
                <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] border border-white/10 backdrop-blur-sm px-6 py-5 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-primary" />
                        <p className="text-sm md:text-base font-black uppercase tracking-wide">
                            {filtered.length} reels in the {activeTag.toLowerCase()} archive
                        </p>
                    </div>
                    <a
                        href="https://instagram.com/telloramedia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-black uppercase text-xs tracking-[0.2em] border-2 border-primary hover:bg-white hover:border-white transition-colors"
                    >
                        See more on Instagram
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* ─────────── Immersive Player ─────────── */}
            <AnimatePresence>
                {selectedIdx !== null && filtered[selectedIdx] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
                        onClick={() => setSelectedIdx(null)}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedIdx(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1200] w-12 h-12 sm:w-14 sm:h-14 bg-primary text-black rounded-full flex items-center justify-center hover:rotate-90 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                            aria-label="Close reel"
                        >
                            <X size={22} />
                        </button>

                        <button
                            type="button"
                            onClick={goPrev}
                            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-[1200] w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full items-center justify-center transition-colors backdrop-blur-md"
                            aria-label="Previous reel"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-[1200] w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full items-center justify-center transition-colors backdrop-blur-md"
                            aria-label="Next reel"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <motion.div
                            key={filtered[selectedIdx].id}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-[420px] h-full max-h-[88vh] aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-[0_0_80px_rgba(168,85,247,0.25)] border-2 border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                key={filtered[selectedIdx].src}
                                src={filtered[selectedIdx].src}
                                className="w-full h-full object-cover"
                                autoPlay loop playsInline muted={isMuted}
                            />

                            {/* Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 flex flex-col justify-between p-5 sm:p-7">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                                            <span className="text-sm font-black text-black">T</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-heading font-black">TELLORA MEDIA</p>
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Now Playing</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setIsMuted(m => !m); }}
                                        className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                    </button>
                                </div>

                                <div>
                                    <span className="inline-block mb-3 px-2.5 py-1 bg-white/10 border border-white/15 text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                                        {filtered[selectedIdx].tag}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase mb-4 leading-none tracking-tighter">
                                        {filtered[selectedIdx].title}
                                    </h3>
                                    <div className="flex items-center gap-5">
                                        <div className="flex items-center gap-1.5">
                                            <Heart size={18} className="text-primary fill-current" />
                                            <span className="text-sm font-black">{filtered[selectedIdx].likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MessageCircle size={18} className="text-white" />
                                            <span className="text-sm font-black">{filtered[selectedIdx].comments}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => handleShare(filtered[selectedIdx], e)}
                                            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                                            aria-label="Share reel"
                                        >
                                            {copiedShare ? (
                                                <>
                                                    <Check size={14} className="text-emerald-400" />
                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Share2 size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-wider">Share</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
