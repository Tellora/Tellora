"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Trash2, Plus, Search, Heart, Eye, Video, Clapperboard, Zap, ArrowRight, X, Edit2, ExternalLink } from "lucide-react";
import { Reel, getReels, upsertReel, deleteReel } from "@/lib/store";

const TAGS = ["BTS", "Studio", "Case Study", "Production", "Client Testimonial", "Brand Film", "Tutorial"];

function getEmbedUrl(url: string): string | null {
    if (!url) return null;
    try {
        // YouTube
        const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
        // Vimeo
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        // Direct embed or iframe src
        if (url.includes("embed")) return url;
        return null;
    } catch {
        return null;
    }
}

function getThumbnail(url: string): string | null {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    return null;
}

const emptyReel = (): Omit<Reel, "id" | "createdAt"> => ({
    title: "",
    embedUrl: "",
    tag: "BTS",
    likes: "0",
    views: "0",
    status: "Live",
});

export default function AdminReels() {
    const [reels, setReels] = useState<Reel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReel, setEditingReel] = useState<Reel | null>(null);
    const [form, setForm] = useState(emptyReel());
    const [previewReel, setPreviewReel] = useState<Reel | null>(null);

    const reload = async () => setReels(await getReels());
    useEffect(() => { reload(); }, []);

    const openCreate = () => {
        setEditingReel(null);
        setForm(emptyReel());
        setIsModalOpen(true);
    };

    const openEdit = (r: Reel) => {
        setEditingReel(r);
        setForm({ title: r.title, embedUrl: r.embedUrl, tag: r.tag, likes: r.likes, views: r.views, status: r.status });
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const reel: Reel = {
            id: editingReel ? editingReel.id : `reel-${Date.now()}`,
            title: form.title,
            embedUrl: form.embedUrl,
            tag: form.tag,
            likes: form.likes || "0",
            views: form.views || "0",
            status: form.status,
            createdAt: editingReel ? editingReel.createdAt : Date.now(),
        };
        await upsertReel(reel);
        await reload();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        await deleteReel(id);
        await reload();
        if (previewReel?.id === id) setPreviewReel(null);
    };

    const filtered = reels.filter(
        (r) =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalViews = reels.reduce((acc, r) => {
        const v = r.views.toString().toLowerCase();
        let n = parseFloat(v);
        if (v.includes("m")) n *= 1000000;
        else if (v.includes("k")) n *= 1000;
        return acc + (isNaN(n) ? 0 : n);
    }, 0);

    const formatViews = (n: number) =>
        n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n >= 1000 ? (n / 1000).toFixed(0) + "K" : n.toString();

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Clapperboard size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Viral Media Core</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Reel Command Center</h1>
                    <p className="text-white/40 font-medium text-sm mt-1">Add YouTube or Vimeo URLs to embed videos. Manage your client reel library.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95"
                >
                    <Video size={16} /> Add New Reel
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Reach", value: formatViews(totalViews), icon: Eye, color: "#4ac0e4" },
                    { label: "Live Reels", value: reels.filter((r) => r.status === "Live").length, icon: Zap, color: "#2e7dbf" },
                    { label: "Total Assets", value: reels.length, icon: Video, color: "#ff4d6d" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0D121F]/60 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] flex items-center justify-between group hover:border-primary/20 transition-all">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                            <h3 className="text-4xl font-black text-white italic">{stat.value}</h3>
                        </div>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform">
                            <stat.icon size={26} style={{ color: stat.color }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input
                    type="text"
                    placeholder="Search by title or tag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0D121F]/60 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-medium outline-none focus:border-primary/30 transition-all text-sm"
                />
            </div>

            {/* Reel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filtered.map((reel, i) => {
                    const thumb = getThumbnail(reel.embedUrl);
                    const embed = getEmbedUrl(reel.embedUrl);
                    return (
                        <motion.div
                            key={reel.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#0D121F]/60 border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden group hover:border-primary/30 transition-all"
                        >
                            {/* Thumbnail / Preview */}
                            <div
                                className="relative w-full bg-[#080B12] flex items-center justify-center cursor-pointer overflow-hidden"
                                style={{ aspectRatio: "9/16", maxHeight: 300 }}
                                onClick={() => embed && setPreviewReel(reel)}
                            >
                                {thumb ? (
                                    <img src={thumb} alt={reel.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-3 text-white/10 p-8">
                                        <Video size={48} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-center">{reel.embedUrl ? "Custom Embed" : "No Video URL"}</span>
                                    </div>
                                )}
                                {embed && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all">
                                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl">
                                            <Play size={24} className="text-white ml-1" />
                                        </div>
                                    </div>
                                )}
                                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${reel.status === "Live" ? "bg-green-500/80 text-white" : "bg-orange-400/80 text-white"}`}>
                                    {reel.status}
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <h3 className="text-lg font-black text-white italic tracking-tight leading-tight mb-3">{reel.title}</h3>
                                <div className="flex items-center gap-6 mb-6">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">{reel.tag}</span>
                                    <div className="flex items-center gap-2 text-[11px] text-white/20 font-bold">
                                        <Eye size={14} className="text-primary/40" /> {reel.views}
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-white/20 font-bold">
                                        <Heart size={14} className="text-red-400/40" /> {reel.likes}
                                    </div>
                                </div>

                                {reel.embedUrl && (
                                    <a
                                        href={reel.embedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-primary transition-colors mb-4"
                                    >
                                        <ExternalLink size={12} /> View Source
                                    </a>
                                )}

                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEdit(reel)}
                                        className="flex-1 py-3 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit2 size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(reel.id)}
                                        className="flex-1 py-3 rounded-xl bg-red-400/5 text-[9px] font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Add card */}
                <div
                    onClick={openCreate}
                    className="border-2 border-dashed border-white/5 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center text-white/10 hover:text-primary hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all group p-6 md:p-12"
                    style={{ minHeight: 300 }}
                >
                    <div className="w-16 h-16 rounded-[2rem] border-2 border-current flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all">
                        <Plus size={32} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-center">Add New Reel</span>
                </div>
            </div>

            {/* Video Preview Modal */}
            <AnimatePresence>
                {previewReel && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl" onClick={() => setPreviewReel(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setPreviewReel(null)} className="absolute -top-12 right-0 p-3 text-white/50 hover:text-white"><X size={28} /></button>
                            <div className="w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black" style={{ aspectRatio: "9/16", maxHeight: "80vh" }}>
                                <iframe
                                    src={getEmbedUrl(previewReel.embedUrl) || ""}
                                    className="w-full h-full"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <p className="text-white font-black italic text-xl mt-6 text-center">{previewReel.title}</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="w-full max-w-lg bg-[#0D121F] border border-white/10 rounded-[2rem] md:rounded-[4rem] p-6 md:p-12 relative overflow-hidden my-4 md:my-8"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 md:top-8 right-4 md:right-8 p-3 text-white/30 hover:text-white"><X size={24} /></button>

                            <form onSubmit={handleSave} className="space-y-6 md:space-y-7">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-4">
                                        <Video size={32} />
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter italic">{editingReel ? "Edit Reel" : "Add New Reel"}</h2>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Reel Title *</label>
                                    <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium text-lg italic"
                                        placeholder="e.g. Creative Studio BTS" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">YouTube / Vimeo URL</label>
                                    <input value={form.embedUrl} onChange={(e) => setForm({ ...form, embedUrl: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium text-sm"
                                        placeholder="https://www.youtube.com/watch?v=..." />
                                    {form.embedUrl && getEmbedUrl(form.embedUrl) && (
                                        <p className="text-[10px] text-green-400 font-black uppercase tracking-widest">✓ Valid video URL detected</p>
                                    )}
                                    {form.embedUrl && !getEmbedUrl(form.embedUrl) && (
                                        <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest">⚠ URL format not recognized. Use YouTube or Vimeo links.</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Category Tag</label>
                                        <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-white outline-none appearance-none cursor-pointer">
                                            {TAGS.map((t) => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Status</label>
                                        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Reel["status"] })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-white outline-none appearance-none cursor-pointer">
                                            <option value="Live">Live</option>
                                            <option value="Review">In Review</option>
                                            <option value="Archived">Archived</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Views (display)</label>
                                        <input value={form.views} onChange={(e) => setForm({ ...form, views: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-white outline-none focus:border-primary transition-all font-medium"
                                            placeholder="450k" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Likes (display)</label>
                                        <input value={form.likes} onChange={(e) => setForm({ ...form, likes: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-white outline-none focus:border-primary transition-all font-medium"
                                            placeholder="18.2k" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="py-4 md:py-5 rounded-2xl md:rounded-[2rem] border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                                    <button type="submit" className="py-4 md:py-5 rounded-2xl md:rounded-[2rem] bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3">
                                        {editingReel ? "Save Changes" : "Add Reel"} <ArrowRight size={16} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
