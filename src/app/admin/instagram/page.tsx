"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Instagram, Plus, Trash2, Edit2, Share2, Eye,
    Camera, Film, AlignLeft, User, Link as LinkIcon,
    Copy, Check, ArrowRight, ExternalLink, X, Image as ImageIcon,
    Save, Sparkles, Smartphone, Settings, ShieldCheck,
    RefreshCw, Zap, ArrowUpRight
} from "lucide-react";
import { getAdminData, saveAdminData } from "@/lib/serverDb";

interface IgPost {
    id: string;
    type: 'image' | 'video';
    url: string;
    caption: string;
    likes: number;
    timestamp: string;
}

interface IgProfile {
    id: string;
    handle: string;
    name: string;
    bio: string;
    profilePic: string;
    posts: IgPost[];
    website?: string;
    isVerified?: boolean;
}

// Utility for image compression
const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7)); // 0.7 quality saves massive space
        };
    });
};

export default function InstagramAdmin() {
    const [profiles, setProfiles] = useState<IgProfile[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const activeProfile = profiles.find(p => p.id === activeId) || null;

    // Load and Sync
    const loadProfiles = async () => {
        const saved = await getAdminData('tellora_ig_profiles_v2', []);
        setProfiles(saved);
    };

    useEffect(() => {
        loadProfiles();
        const interval = setInterval(loadProfiles, 5000);
        return () => clearInterval(interval);
    }, []);

    const triggerSave = async (updated: IgProfile[]) => {
        setProfiles(updated);
        await saveAdminData('tellora_ig_profiles_v2', updated);
    };

    const updateProfile = useCallback(async (updates: Partial<IgProfile>) => {
        if (!activeId) return;
        const updated = profiles.map(p => p.id === activeId ? { ...p, ...updates } : p);
        await triggerSave(updated);
    }, [activeId, profiles]);

    const handleCreateProfile = async () => {
        const newProfile: IgProfile = {
            id: Date.now().toString(),
            handle: "new_client",
            name: "Client Name",
            bio: "Innovative brand strategy and content creation.",
            profilePic: "",
            posts: [],
            isVerified: false
        };
        const updated = [...profiles, newProfile];
        await triggerSave(updated);
        setActiveId(newProfile.id);
        setIsEditing(true);
    };

    const handleDeleteProfile = async (id: string) => {
        if (confirm("Delete this profile and all its resonance nodes?")) {
            const updated = profiles.filter(p => p.id !== id);
            await triggerSave(updated);
            if (activeId === id) setActiveId(null);
        }
    };

    const handleAddPost = async () => {
        if (!activeProfile) return;
        const newPost: IgPost = {
            id: Date.now().toString(),
            type: 'image',
            url: '',
            caption: '',
            likes: Math.floor(Math.random() * 500) + 100,
            timestamp: new Date().toISOString()
        };
        const updatedPosts = [newPost, ...activeProfile.posts];
        await updateProfile({ posts: updatedPosts });
    };

    const handlePostUpdate = async (postId: string, updates: Partial<IgPost>) => {
        if (!activeProfile) return;
        const updatedPosts = activeProfile.posts.map(p => p.id === postId ? { ...p, ...updates } : p);
        await updateProfile({ posts: updatedPosts });
    };

    const handlePostDelete = async (postId: string) => {
        if (!activeProfile) return;
        const updatedPosts = activeProfile.posts.filter(p => p.id !== postId);
        await updateProfile({ posts: updatedPosts });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string, target: 'profile' | 'post') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const rawBase64 = reader.result as string;
            const compressed = await compressImage(rawBase64);

            if (target === 'profile') {
                updateProfile({ profilePic: compressed });
            } else {
                handlePostUpdate(id, { url: compressed });
            }
        };
        reader.readAsDataURL(file);
    };

    const generateShareableLink = (profile: IgProfile) => {
        try {
            const data = JSON.stringify(profile);
            // Use a slightly more robust encoding for large strings
            const encoded = btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, (match, p1) =>
                String.fromCharCode(parseInt(p1, 16))
            ));
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            return `${baseUrl}/preview/instagram/#${encoded}`;
        } catch (err) {
            console.error("Link generation failed", err);
            return "Error: Profile too large for direct uplink. Reduce image count.";
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        if (text.startsWith("Error")) {
            alert(text);
            return;
        }
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-8 md:space-y-12 pb-24 md:pb-32 px-4 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 md:gap-10">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        <div className="px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2 md:gap-3">
                            <Zap size={14} className="text-primary fill-primary w-3 h-3 md:w-3.5 md:h-3.5" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">Ultra-Logic Engine v4.0</span>
                        </div>
                        <div className="px-3 md:px-4 py-1.5 md:py-2 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2 md:gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-green-500">Sub-System Staged</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white italic leading-[0.8] uppercase mt-2 md:mt-0">
                        IG Portal <span className="text-primary block not-italic font-sans tracking-[-0.1em]">Architect</span>
                    </h1>
                    <p className="text-white/40 font-medium text-xs md:text-sm max-w-2xl italic">
                        Deploying hyper-realistic social simulations. Optimize brand narratives through high-fidelity neural previews.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                    <button
                        onClick={handleCreateProfile}
                        className="w-full sm:w-auto group relative overflow-hidden px-8 md:px-12 py-5 md:py-6 bg-white text-black rounded-3xl md:rounded-[2.5rem] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all sm:hover:pr-16 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                            <Plus size={20} strokeWidth={3} className="w-4 h-4 md:w-5 md:h-5" /> Initialize Neural Node
                        </span>
                        <div className="absolute top-0 right-0 h-full w-0 bg-primary group-hover:w-full transition-all duration-500 -z-0 hidden sm:block" />
                    </button>
                    <button className="hidden sm:flex p-5 md:p-6 bg-white/5 border border-white/10 rounded-3xl md:rounded-[2.5rem] text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <RefreshCw size={24} className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 md:gap-12">
                {/* Nodes Sidebar */}
                <div className="lg:col-span-1 space-y-6 md:space-y-8">
                    <div className="bg-[#0D121F]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-2xl">
                        <div className="flex justify-between items-center mb-6 md:mb-10">
                            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/20 italic">Global Nodes</h3>
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-[8px] md:text-[9px] font-black text-white/40">{profiles.length}</span>
                        </div>

                        <div className="space-y-5">
                            {profiles.length === 0 && (
                                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
                                    <Sparkles className="mx-auto text-white/5 mb-6" size={48} />
                                    <p className="text-[11px] font-black uppercase tracking-widest text-white/10">No active portals</p>
                                </div>
                            )}

                            {profiles.map(p => (
                                <motion.div
                                    key={p.id}
                                    layoutId={p.id}
                                    className={`relative p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border transition-all cursor-pointer group ${activeId === p.id
                                        ? 'bg-primary border-primary shadow-[0_15px_40px_rgba(74,192,228,0.3)]'
                                        : 'bg-white/5 border-white/5 hover:border-white/20'
                                        }`}
                                    onClick={() => { setActiveId(p.id); setIsEditing(false); }}
                                >
                                    <div className="flex items-center gap-3 md:gap-5">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner shrink-0">
                                            {p.profilePic ? (
                                                <img src={p.profilePic} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={20} className="text-white/20 md:w-6 md:h-6" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className={`font-black text-base md:text-lg tracking-tighter truncate italic ${activeId === p.id ? 'text-white' : 'text-white/80'}`}>
                                                    @{p.handle}
                                                </h4>
                                                {p.isVerified && <ShieldCheck size={14} className={`md:w-4 md:h-4 ${activeId === p.id ? 'text-white' : 'text-primary'}`} />}
                                            </div>
                                            <p className={`text-[8px] md:text-[9px] font-bold uppercase tracking-widest truncate ${activeId === p.id ? 'text-white/60' : 'text-white/20'}`}>
                                                {p.posts.length} Fragments Detected
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteProfile(p.id); }}
                                        className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl md:opacity-0 md:group-hover:opacity-100 md:scale-75 md:group-hover:scale-100 transition-all z-20"
                                    >
                                        <Trash2 size={14} className="md:w-4 md:h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Workspace */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {activeProfile ? (
                            <motion.div
                                key={activeProfile.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="bg-[#0D121F]/80 backdrop-blur-3xl border border-white/10 rounded-[4rem] overflow-hidden shadow-3xl flex flex-col h-full ring-1 ring-white/5"
                            >
                                {/* Workspace Header */}
                                <div className="p-6 md:p-12 border-b border-white/5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 md:gap-10 bg-white/[0.02]">
                                    <div className="flex items-center gap-4 md:gap-8 w-full sm:w-auto">
                                        <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-[1.2rem] md:rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10">
                                            <Settings className="animate-[spin_10s_linear_infinite] w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                                                <h2 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter uppercase">Terminal</h2>
                                                <div className="px-2 md:px-3 py-0.5 md:py-1 bg-primary text-[8px] md:text-[9px] font-black rounded-lg text-white animate-pulse">LIVE_SYNC</div>
                                            </div>
                                            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30 italic truncate max-w-[150px] sm:max-w-none">Target: [ {activeProfile.handle.toUpperCase()} ]</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 md:gap-5 w-full xl:w-auto">
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className={`flex-1 sm:flex-none flex items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-[9px] md:text-[11px] uppercase tracking-widest transition-all ${isEditing ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/5'
                                                }`}
                                        >
                                            <Settings size={16} className="md:w-[18px] md:h-[18px]" /> <span className="hidden xs:inline">{isEditing ? 'Close Interface' : 'Node Config'}</span>
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(generateShareableLink(activeProfile), activeProfile.id)}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 bg-primary text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-[9px] md:text-[11px] uppercase tracking-widest hover:shadow-[0_15px_40px_rgba(74,192,228,0.4)] transition-all active:scale-95 group"
                                        >
                                            {copiedId === activeProfile.id ? <Check size={16} className="md:w-[18px] md:h-[18px]" /> : <Share2 size={16} className="md:w-[18px] md:h-[18px]" />}
                                            <span className="hidden xs:inline">{copiedId === activeProfile.id ? 'Uplink Secured' : 'Generate Uplink'}</span>
                                            <span className="xs:hidden">Uplink</span>
                                            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 p-6 md:p-12 overflow-y-auto scrollbar-hide max-h-[80vh] md:max-h-[800px]">
                                    {isEditing ? (
                                        <div className="space-y-8 md:space-y-12 max-w-3xl mx-auto py-6 md:py-10">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                                                <div className="space-y-4 md:space-y-6">
                                                    <label className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-primary italic px-2">Visual Identity Ingest</label>
                                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 bg-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/5">
                                                        <div className="w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-[2rem] md:rounded-[2.5rem] bg-black border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-all">
                                                            {activeProfile.profilePic ? (
                                                                <img src={activeProfile.profilePic} className="w-full h-full object-cover transition-transform duration-500 xl:group-hover:scale-110" />
                                                            ) : (
                                                                <Camera className="text-white/10 w-8 h-8 md:w-10 md:h-10" />
                                                            )}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                onChange={(e) => handleFileUpload(e, '', 'profile')}
                                                            />
                                                        </div>
                                                        <div className="space-y-2 text-center sm:text-left">
                                                            <p className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase italic leading-relaxed">Neural circular cropping active. Maximum visual fidelity recommended.</p>
                                                            <button className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Clear Ingest</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6 md:space-y-8">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-primary italic px-2">Entity Handle</label>
                                                        <div className="relative">
                                                            <span className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/20 font-black italic">@</span>
                                                            <input
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 pl-8 md:pl-10 text-xs md:text-sm text-white outline-none focus:border-primary transition-all font-black italic uppercase tracking-tighter"
                                                                value={activeProfile.handle}
                                                                onChange={e => updateProfile({ handle: e.target.value.toLowerCase().replace(/\s/g, '_') })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-primary italic px-2">Official Designation</label>
                                                        <input
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-xs md:text-sm text-white outline-none focus:border-primary transition-all font-black italic tracking-tight"
                                                            value={activeProfile.name}
                                                            onChange={e => updateProfile({ name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between bg-white/5 p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5">
                                                        <div className="flex items-center gap-3 md:gap-4">
                                                            <ShieldCheck className={`${activeProfile.isVerified ? 'text-primary' : 'text-white/20'} md:w-6 md:h-6`} size={20} />
                                                            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest italic text-white/50">Verification Status</span>
                                                        </div>
                                                        <button
                                                            onClick={() => updateProfile({ isVerified: !activeProfile.isVerified })}
                                                            className={`w-12 md:w-14 h-6 md:h-8 rounded-full transition-all relative p-1 ${activeProfile.isVerified ? 'bg-primary' : 'bg-white/10'}`}
                                                        >
                                                            <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full bg-white shadow-lg transition-all ${activeProfile.isVerified ? 'translate-x-6' : 'translate-x-0'}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3 md:space-y-4">
                                                <label className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-primary italic px-2">Neural Narrative Injection (Bio)</label>
                                                <textarea
                                                    rows={5}
                                                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 text-xs md:text-sm text-white outline-none focus:border-primary transition-all font-medium italic resize-none leading-relaxed"
                                                    value={activeProfile.bio}
                                                    onChange={e => updateProfile({ bio: e.target.value })}
                                                    placeholder="Inject core brand architecture narrative. Use '\n' for line breaks..."
                                                />
                                            </div>

                                            <div className="p-6 md:p-8 bg-primary/5 border border-primary/10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group">
                                                <div className="flex items-center gap-4 md:gap-6">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                        <Save size={18} className="md:w-5 md:h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs md:text-sm font-black text-white italic">Auto-Save Protocol Active</h4>
                                                        <p className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase italic">All changes staged to local matrix.</p>
                                                    </div>
                                                </div>
                                                <button className="w-full sm:w-auto px-6 md:px-8 py-3 bg-white text-black rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all">Manual Commit</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-10 md:space-y-16">
                                            {/* Preview Interface */}
                                            <div className="flex flex-col xl:flex-row gap-8 md:gap-16 items-center xl:items-start text-center xl:text-left border-b border-white/5 pb-8 md:pb-16">
                                                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 relative shrink-0 shadow-2xl">
                                                    <div className="w-full h-full rounded-full bg-[#0D121F] p-1.5">
                                                        <div className="w-full h-full rounded-full bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center shadow-inner">
                                                            {activeProfile.profilePic ? (
                                                                <img src={activeProfile.profilePic} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <User size={40} className="text-white/5 md:w-[60px] md:h-[60px]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex-1 space-y-6 md:space-y-8 w-full">
                                                    <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 md:gap-8">
                                                        <div className="flex items-center gap-2 md:gap-3">
                                                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-widest italic">{activeProfile.handle}</h3>
                                                            {activeProfile.isVerified && <div className="p-1 bg-primary rounded-full text-white shadow-lg"><Check size={10} className="md:w-[12px] md:h-[12px]" strokeWidth={4} /></div>}
                                                        </div>
                                                        <div className="flex gap-3 md:gap-4">
                                                            <div className="px-6 md:px-8 py-2 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/60 italic hover:text-primary hover:border-primary/30 transition-all cursor-default shadow-sm tracking-widest">Simulation_Edit</div>
                                                            <div className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white/60 flex items-center justify-center"><Smartphone size={14} className="md:w-4 md:h-4" /></div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between sm:justify-center xl:justify-start gap-4 sm:gap-8 md:gap-12 border-y border-white/5 py-4 md:py-6">
                                                        <div className="flex flex-col items-center xl:items-start"><span className="text-xl md:text-2xl font-black text-white italic tracking-tighter leading-tight">{activeProfile.posts.length}</span><span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 italic">Fragments</span></div>
                                                        <div className="flex flex-col items-center xl:items-start"><span className="text-xl md:text-2xl font-black text-white italic tracking-tighter leading-tight">1.2M</span><span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 italic">Synchronized</span></div>
                                                        <div className="flex flex-col items-center xl:items-start"><span className="text-xl md:text-2xl font-black text-white italic tracking-tighter leading-tight">854</span><span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 italic">Following</span></div>
                                                    </div>

                                                    <div className="space-y-2 px-4 sm:px-0">
                                                        <p className="font-black text-white italic uppercase tracking-tighter text-lg md:text-xl leading-none">{activeProfile.name}</p>
                                                        <p className="text-sm md:text-base font-medium text-white/50 max-w-xl italic leading-relaxed whitespace-pre-wrap">{activeProfile.bio}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Ingest Grid */}
                                            <div className="space-y-6 md:space-y-10">
                                                <div className="flex flex-col sm:flex-row justify-between items-center bg-white/[0.02] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 shadow-sm gap-4">
                                                    <div className="flex items-center gap-3 md:gap-4">
                                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-ping" />
                                                        <h3 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/30 italic">Neural Content Fragments</h3>
                                                    </div>
                                                    <button
                                                        onClick={handleAddPost}
                                                        className="w-full sm:w-auto justify-center px-6 md:px-10 py-3 md:py-4 bg-primary text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 md:gap-3"
                                                    >
                                                        <Plus size={14} className="md:w-4 md:h-4" strokeWidth={3} /> Inject Fragment
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                                    {activeProfile.posts.map(post => (
                                                        <div
                                                            key={post.id}
                                                            className="aspect-square bg-white/[0.03] rounded-3xl md:rounded-[2.5rem] border border-white/5 overflow-hidden relative group hover:border-primary/50 transition-all cursor-pointer shadow-lg"
                                                        >
                                                            {post.url ? (
                                                                <img src={post.url} className="w-full h-full object-cover xl:group-hover:scale-110 transition-transform duration-1000" />
                                                            ) : (
                                                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 md:gap-4">
                                                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center">
                                                                        <ImageIcon className="text-white/10 w-6 h-6 md:w-8 md:h-8" />
                                                                    </div>
                                                                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-white/10 italic">Data_Null</span>
                                                                </div>
                                                            )}

                                                            <div className="absolute inset-0 bg-[#080B12]/95 opacity-0 focus-within:opacity-100 group-hover:opacity-100 transition-all duration-300 flex flex-col p-4 md:p-8 gap-4 md:gap-6 backdrop-blur-3xl">
                                                                <div className="flex items-center justify-between border-b border-white/10 pb-3 md:pb-4">
                                                                    <div className="flex items-center gap-2 md:gap-3">
                                                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                                                            {post.type === 'video' ? <Film size={12} className="md:w-[14px] md:h-[14px]" /> : <Camera size={12} className="md:w-[14px] md:h-[14px]" />}
                                                                        </div>
                                                                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary italic">Fragment Data</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); handlePostDelete(post.id); }}
                                                                        className="p-1.5 md:p-2 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                                    >
                                                                        <Trash2 size={14} className="md:w-4 md:h-4" />
                                                                    </button>
                                                                </div>

                                                                <div className="flex-1 flex flex-col justify-center space-y-3 md:space-y-5">
                                                                    <div className="space-y-1.5 md:space-y-2">
                                                                        <label className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Visual Ingest</label>
                                                                        <div className="relative h-10 md:h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group/btn hover:bg-white/10 transition-all cursor-pointer">
                                                                            <span className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest">Load Media</span>
                                                                            <input
                                                                                type="file"
                                                                                accept="image/*"
                                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                                onChange={(e) => handleFileUpload(e, post.id, 'post')}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-1.5 md:space-y-2">
                                                                        <label className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Neural Caption</label>
                                                                        <textarea
                                                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-[9px] md:text-[10px] font-medium text-white outline-none h-16 md:h-24 resize-none placeholder:text-white/10 italic focus:border-primary/50 transition-all"
                                                                            placeholder="Inject narrative fragment..."
                                                                            value={post.caption}
                                                                            onClick={e => e.stopPropagation()}
                                                                            onChange={e => handlePostUpdate(post.id, { caption: e.target.value })}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="mt-auto pt-3 md:pt-4 border-t border-white/10 flex justify-between items-center text-[7px] md:text-[9px] font-black text-white/20 uppercase tracking-widest italic">
                                                                    <span>TS_{new Date(post.timestamp).getTime().toString().slice(-4)}</span>
                                                                    <span className="text-primary/40">Fragment_Locked</span>
                                                                </div>
                                                            </div>

                                                            {post.type === 'video' && (
                                                                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-white drop-shadow-2xl z-10 p-1.5 md:p-2 bg-black/40 backdrop-blur-md rounded-lg"><Film size={14} className="md:w-4 md:h-4" /></div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full min-h-[400px] md:min-h-[600px] bg-[#0D121F]/40 backdrop-blur-md rounded-[2rem] md:rounded-[4rem] border border-dashed border-white/10 flex flex-col items-center justify-center p-6 md:p-20 text-center shadow-inner group mt-6 lg:mt-0">
                                <div className="w-24 h-24 md:w-40 md:h-40 rounded-3xl md:rounded-[3.5rem] bg-white/[0.02] flex items-center justify-center text-white/5 mb-6 md:mb-10 border border-white/5 xl:group-hover:scale-110 xl:group-hover:border-primary/20 xl:group-hover:text-primary/20 transition-all duration-700">
                                    <Instagram className="w-12 h-12 md:w-20 md:h-20" strokeWidth={1} />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white/10 italic tracking-tighter uppercase mb-4">Neural Architecture: Ready</h2>
                                <p className="text-[9px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/5 max-w-sm italic px-4">
                                    Access Global Matrix. Initialize new client nodes from the peripheral terminal.
                                </p>
                                <div className="mt-8 md:mt-12 flex gap-2 md:gap-3">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/5" />
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/5" />
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/5 animate-pulse" />
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                ::selection { background: #4ac0e4; color: black; }
            `}</style>
        </div>
    );
}
