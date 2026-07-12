"use client";

import React, { useState, useEffect } from "react";
import {
    ChevronLeft, MoreHorizontal, Grid as GridIcon, Film,
    User, Heart, MessageCircle, Share, Bookmark,
    MessageSquare, PlusSquare, Compass, Home, Search,
    Lock, ExternalLink, Image as ImageIcon, Check, Menu,
    Settings, Tag, UserPlus, Send, AtSign, Instagram, Camera, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstagramPreview() {
    const [profile, setProfile] = useState<any>(null);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeGridTab, setActiveGridTab] = useState<"posts" | "reels" | "tagged">("posts");
    const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);

    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (!hash) {
            setError("PROTOCOL_ERROR: No profile data string detected in URL hash.");
            setLoading(false);
            return;
        }

        try {
            // Robust base64 decoding handling URI component encoding
            const decoded = decodeURIComponent(atob(hash).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const parsed = JSON.parse(decoded);
            const normalized = {
                ...parsed,
                handle: parsed.handle || parsed.slug || "instagram_user",
                name: parsed.name || parsed.handle || parsed.slug || "Instagram User",
                profilePic: parsed.profilePic || parsed.profile_pic || "",
                isVerified: parsed.isVerified !== undefined ? parsed.isVerified : parsed.is_verified,
                followers_count: parsed.followers_count || "1.2M",
                following_count: parsed.following_count || "854",
                posts: (parsed.posts || []).map((post: any) => ({
                    ...post,
                    url: post.url || post.src || "",
                    type: post.type || "image",
                    likes: post.likes || 0,
                    caption: post.caption || "",
                    created_at: post.created_at || post.timestamp || new Date().toISOString()
                }))
            };
            setProfile(normalized);
            setLoading(false);
        } catch (e) {
            console.error("Failed to decode profile", e);
            setError("ACCESS_DENIED: Neural packet corruption or invalid uplink string.");
            setLoading(false);
        }
    }, []);

    if (error) return (
        <div className="min-h-screen bg-black flex items-center justify-center p-12 text-center font-mono">
            <div className="space-y-10 max-w-lg">
                <div className="relative">
                    <div className="w-24 h-24 bg-red-500/10 rounded-full mx-auto flex items-center justify-center text-red-500 border border-red-500/20 shadow-2xl animate-pulse">
                        <Lock size={40} />
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Secure Uplink Failed</h1>
                    <p className="text-sm text-white/30 leading-relaxed italic uppercase tracking-widest">{error}</p>
                </div>
                <div className="pt-8 flex justify-center">
                    <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-red-500 animate-[shimmer_2s_infinite]" />
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
            `}</style>
        </div>
    );

    if (loading || !profile) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-pink-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram size={20} className="text-gray-200" />
                </div>
            </div>
        </div>
    );

    const posts = profile.posts || [];
    const stories = posts.filter((p: any) => p.type === 'story');
    const hasStories = stories.length > 0;

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-24 selection:bg-pink-100">
            <head>
                <title>{profile.name} (@{profile.handle}) • Instagram photos and videos</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            </head>

            {/* Sticky Header */}
            <div className="sticky top-0 z-[60] bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between ">
                <div className="flex items-center gap-6">
                    <ChevronLeft size={28} strokeWidth={2.5} />
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-base leading-tight">{profile.handle}</span>
                        {profile.isVerified && <div className="w-3.5 h-3.5 bg-[#0095f6] rounded-full flex items-center justify-center text-white"><Check size={8} strokeWidth={5} /></div>}
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-0.5 -right-0.5 border border-white shadow-sm" />
                        <Settings size={24} />
                    </div>
                    <MoreHorizontal size={24} />
                </div>
            </div>

            <div className="max-w-[935px] mx-auto px-4 pt-6 md:pt-14">
                {/* Profile Section */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-24 mb-12 md:mb-16 items-center md:items-start">
                    {/* Profile Avatar with Dynamic Story Ring */}
                    <div className="md:w-[290px] flex justify-center items-center shrink-0">
                        <div 
                            className={`w-24 h-24 md:w-40 md:h-40 rounded-full p-[3px] transition-transform active:scale-95 ${hasStories ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 cursor-pointer ring-2 ring-offset-2 ring-pink-500/20' : 'border border-gray-200'}`}
                            onClick={() => {
                                if (hasStories) {
                                    setActiveStoryIndex(0);
                                    setIsStoryViewerOpen(true);
                                }
                            }}
                        >
                            <div className="w-full h-full rounded-full bg-white p-[2px]">
                                <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-100">
                                    {profile.profilePic ? (
                                        <img src={profile.profilePic} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={60} className="text-gray-300" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="flex-1 space-y-5 md:space-y-7 w-full">
                        <div className="flex flex-col md:flex-row items-center md:items-center gap-5">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl md:text-[28px] font-light leading-none">{profile.handle}</h2>
                                {profile.isVerified && <div className="w-5 h-5 bg-[#0095f6] rounded-full flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div>}
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-6 py-2 bg-gray-100 font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">Edit profile</button>
                                <button className="flex-1 md:flex-none px-6 py-2 bg-gray-100 font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">View archive</button>
                                <button className="p-2 bg-gray-100 rounded-lg"><Settings size={18} /></button>
                            </div>
                        </div>

                        <div className="hidden md:flex gap-10">
                            <div><span className="font-bold text-lg">{posts.filter((p: any) => p.type !== 'story').length}</span> <span className="text-gray-600">posts</span></div>
                            <div><span className="font-bold text-lg">{profile.followers_count || "1.2M"}</span> <span className="text-gray-600">followers</span></div>
                            <div><span className="font-bold text-lg">{profile.following_count || "854"}</span> <span className="text-gray-600">following</span></div>
                        </div>

                        <div className="space-y-1 text-center md:text-left">
                            <p className="font-bold text-sm">{profile.name}</p>
                            <p className="text-sm leading-[1.4] whitespace-pre-wrap max-w-md">{profile.bio}</p>
                            {profile.website && (
                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-1 text-[#00376b] font-semibold text-sm mt-2">
                                    <ExternalLink size={12} /> {profile.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Meta (Followers/Following) */}
                <div className="md:hidden flex justify-around py-4 border-t border-gray-100 mb-0">
                    <div className="text-center flex flex-col items-center">
                        <span className="font-bold text-sm">{posts.filter((p: any) => p.type !== 'story').length}</span>
                        <span className="text-gray-400 text-xs">posts</span>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <span className="font-bold text-sm">{profile.followers_count || "1.2M"}</span>
                        <span className="text-gray-400 text-xs">followers</span>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <span className="font-bold text-sm">{profile.following_count || "854"}</span>
                        <span className="text-gray-400 text-xs">following</span>
                    </div>
                </div>

                {/* Grid Tabs */}
                <div className="border-t border-gray-100 flex justify-center gap-14 md:gap-16">
                    <button 
                        onClick={() => setActiveGridTab("posts")}
                        className={`py-4 md:py-5 flex items-center gap-2 cursor-pointer border-t-[1.5px] -mt-[1.5px] transition-colors ${activeGridTab === "posts" ? 'border-black text-black font-bold' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        <GridIcon size={14} className="md:w-3 md:h-3" strokeWidth={activeGridTab === "posts" ? -0.5 : 1.5} />
                        <span className="text-[12px] uppercase tracking-[0.1em]">Posts</span>
                    </button>
                    <button 
                        onClick={() => setActiveGridTab("reels")}
                        className={`py-4 md:py-5 flex items-center gap-2 cursor-pointer border-t-[1.5px] -mt-[1.5px] transition-colors ${activeGridTab === "reels" ? 'border-black text-black font-bold' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        <Film size={14} className="md:w-3 md:h-3" />
                        <span className="text-[12px] uppercase tracking-[0.1em]">Reels</span>
                    </button>
                    <button 
                        onClick={() => setActiveGridTab("tagged")}
                        className={`py-4 md:py-5 flex items-center gap-2 cursor-pointer border-t-[1.5px] -mt-[1.5px] transition-colors ${activeGridTab === "tagged" ? 'border-black text-black font-bold' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        <Tag size={14} className="md:w-3 md:h-3" />
                        <span className="text-[12px] uppercase tracking-[0.1em]">Tagged</span>
                    </button>
                </div>

                {/* Content Grid */}
                {(() => {
                    const filteredPosts = posts.filter((p: any) => {
                        if (activeGridTab === "posts") {
                            return p.type === 'image' || p.type === 'video' || !p.type;
                        }
                        if (activeGridTab === "reels") {
                            return p.type === 'reel';
                        }
                        return false;
                    });

                    return (
                        <div className="grid grid-cols-3 gap-[1px] md:gap-8">
                            {filteredPosts.length === 0 ? (
                                <div className="col-span-3 py-24 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                                        <Camera size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase">No fragments in this feed</h3>
                                    <p className="text-gray-400 text-sm max-w-[200px]">No content matches the selected layout format.</p>
                                </div>
                            ) : (
                                filteredPosts.map((post: any) => (
                                    <motion.div
                                        key={post.id}
                                        whileHover={{ opacity: 0.9 }}
                                        className="aspect-square bg-gray-50 overflow-hidden relative group cursor-pointer border border-gray-100 md:rounded-lg shadow-sm"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        {post.url ? (
                                            <img src={post.url} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-100">
                                                <ImageIcon size={48} />
                                            </div>
                                        )}

                                        {/* Overlay Shadow Desktop */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all hidden md:flex items-center justify-center gap-8 text-white z-10">
                                            <div className="flex items-center gap-2 font-black text-lg"><Heart size={24} fill="white" stroke="none" /> {post.likes}</div>
                                            <div className="flex items-center gap-2 font-black text-lg"><MessageCircle size={24} fill="white" stroke="none" /> {Math.floor(post.likes * 0.08)}</div>
                                        </div>

                                        {(post.type === 'video' || post.type === 'reel') && (
                                            <div className="absolute top-3 right-3 text-white drop-shadow-lg z-20 bg-black/20 rounded p-1.5 backdrop-blur-sm"><Film size={14} strokeWidth={3} /></div>
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </div>
                    );
                })()}
            </div>

            {/* Bottom Nav Mock (Mobile) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 h-14 flex items-center justify-around px-4 md:hidden z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <Home size={26} strokeWidth={2.5} />
                <Search size={26} strokeWidth={2.5} className="text-gray-400" />
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                    <PlusSquare size={26} strokeWidth={2.5} />
                </div>
                <Film size={26} strokeWidth={2.5} className="text-gray-400" />
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-purple-600">
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden border border-gray-100">
                            {profile.profilePic && <img src={profile.profilePic} className="w-full h-full object-cover" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div
                        className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-0 md:p-14 overflow-y-auto backdrop-blur-md"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute top-6 right-6 text-white p-4 hover:scale-110 transition-transform"
                        >
                            <X size={32} strokeWidth={3} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-[935px] min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row overflow-hidden shadow-4xl rounded-xl md:rounded-none"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Visual Asset Container */}
                            <div className="flex-1 bg-black flex items-center justify-center max-h-[60vh] md:max-h-none overflow-hidden relative">
                                <img src={selectedPost.url} className="w-full h-full object-contain" />
                                {selectedPost.type === 'video' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"><Film size={80} strokeWidth={1} /></div>}
                            </div>

                            {/* Sidebar Interaction Terminal */}
                            <div className="w-full md:w-[400px] flex flex-col bg-white border-l border-gray-100 overflow-hidden">
                                {/* Post Metadata Header */}
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-purple-600">
                                            <div className="w-full h-full rounded-full bg-white p-0.5">
                                                <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden border border-gray-100">
                                                    {profile.profilePic && <img src={profile.profilePic} className="w-full h-full object-cover" />}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-sm">{profile.handle}</span>
                                                {profile.isVerified && <div className="w-3 h-3 bg-[#0095f6] rounded-full flex items-center justify-center text-white"><Check size={7} strokeWidth={5} /></div>}
                                                <span className="text-gray-400 font-bold ml-1">•</span>
                                                <button className="text-[#0095f6] font-bold text-sm ml-1 hover:text-blue-900 transition-colors">Follow</button>
                                            </div>
                                            <span className="text-xs text-gray-500">Location_Neural_Center</span>
                                        </div>
                                    </div>
                                    <MoreHorizontal size={20} className="cursor-pointer hover:text-gray-400" />
                                </div>

                                {/* Comments / Caption Matrix */}
                                <div className="flex-1 p-5 overflow-y-auto max-h-[350px] md:max-h-none space-y-7 custom-scrollbar bg-gray-50/30">
                                    {/* Primary Caption */}
                                    <div className="flex gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                            {profile.profilePic && <img src={profile.profilePic} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="text-sm leading-[1.6]">
                                            <p className="inline">
                                                <span className="font-bold mr-2 hover:underline cursor-pointer">{profile.handle}</span>
                                                <span className="text-gray-800 italic">{selectedPost.caption || "Simulation node synchronization active."}</span>
                                            </p>
                                            <div className="flex gap-4 mt-3 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                                                <span>Just Now</span>
                                                <button className="hover:text-black">Edit</button>
                                                <button className="hover:text-black">Delete</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Artificial Comments Mockup */}
                                    <div className="py-10 border-t border-gray-100/50 text-center space-y-3">
                                        <p className="text-[10px] font-black text-gray-200 uppercase tracking-[0.4em]">Neural Traffic Restricted</p>
                                        <div className="flex justify-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-gray-100" />
                                            <div className="w-1 h-1 rounded-full bg-gray-100" />
                                            <div className="w-1 h-1 rounded-full bg-gray-100" />
                                        </div>
                                    </div>
                                </div>

                                {/* Interaction Tools */}
                                <div className="p-4 border-t border-gray-100 bg-white">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex gap-5">
                                            <Heart size={28} className="hover:scale-110 active:scale-90 transition-transform cursor-pointer hover:text-pink-500" strokeWidth={2.2} />
                                            <MessageCircle size={28} className="hover:scale-110 active:scale-90 transition-transform cursor-pointer" strokeWidth={2.2} />
                                            <Share size={28} className="hover:scale-110 active:scale-90 transition-transform cursor-pointer" strokeWidth={2.2} />
                                        </div>
                                        <Bookmark size={28} strokeWidth={2.2} className="cursor-pointer active:scale-90 transition-transform hover:fill-black" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-sm tracking-tight">{selectedPost.likes?.toLocaleString()} likes</p>
                                        <p className="text-[11px] text-gray-400 uppercase font-black tracking-widest">{new Date(selectedPost.timestamp).toLocaleDateString()} • UPLINK_SYNC</p>
                                    </div>
                                </div>

                                {/* Synthetic Input Terminal */}
                                <div className="p-4 border-t border-gray-100 flex items-center gap-4 bg-gray-50/50">
                                    <div className="text-2xl cursor-pointer hover:scale-120 transition-transform grayscale hover:grayscale-0 tracking-tighter">👽</div>
                                    <input
                                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 font-medium disabled:cursor-not-allowed"
                                        placeholder="Add a fragment comment..."
                                        disabled
                                    />
                                    <button className="text-[#0095f6] font-bold text-sm opacity-30 cursor-not-allowed transition-all">Post</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Story Viewer Modal */}
            <AnimatePresence>
                {isStoryViewerOpen && stories.length > 0 && (
                    <div 
                        className="fixed inset-0 z-[300] bg-[#0d0d0d] flex flex-col items-center justify-center p-0 md:p-6 overflow-hidden select-none"
                        onClick={() => setIsStoryViewerOpen(false)}
                    >
                        {/* Segments Progress Bar at the top */}
                        <div className="absolute top-4 left-0 right-0 z-20 flex gap-1 px-4 max-w-lg mx-auto w-full">
                            {stories.map((s: any, idx: number) => (
                                <div key={s.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: "0%" }}
                                        animate={{ width: idx === activeStoryIndex ? "100%" : idx < activeStoryIndex ? "100%" : "0%" }}
                                        transition={{ duration: idx === activeStoryIndex ? 5 : 0, ease: "linear" }}
                                        className="h-full bg-white"
                                        onAnimationComplete={() => {
                                            if (idx === activeStoryIndex) {
                                                if (activeStoryIndex < stories.length - 1) {
                                                    setActiveStoryIndex(activeStoryIndex + 1);
                                                } else {
                                                    setIsStoryViewerOpen(false);
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Story Header (Avatar & Handle) */}
                        <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between max-w-lg mx-auto w-full px-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                    {profile.profilePic && <img src={profile.profilePic} className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-sm tracking-tight drop-shadow-md">{profile.handle}</span>
                                    {profile.isVerified && <div className="w-3.5 h-3.5 bg-[#0095f6] rounded-full flex items-center justify-center text-white"><Check size={8} strokeWidth={5} /></div>}
                                    <span className="text-white/60 text-xs drop-shadow-md">2h</span>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsStoryViewerOpen(false); }}
                                className="text-white hover:text-white/70 p-2 text-xl font-bold cursor-pointer drop-shadow-md"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Left / Right Nav Area on Mobile / Desktop */}
                        <div 
                            className="relative w-full max-w-lg h-full flex items-center justify-center bg-black overflow-hidden md:rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Tap left area to go back */}
                            <div 
                                className="absolute left-0 top-0 bottom-0 w-1/4 z-30 cursor-pointer"
                                onClick={() => {
                                    if (activeStoryIndex > 0) {
                                        setActiveStoryIndex(activeStoryIndex - 1);
                                    }
                                }}
                            />
                            {/* Tap right area to go forward */}
                            <div 
                                className="absolute right-0 top-0 bottom-0 w-1/4 z-30 cursor-pointer"
                                onClick={() => {
                                    if (activeStoryIndex < stories.length - 1) {
                                        setActiveStoryIndex(activeStoryIndex + 1);
                                    } else {
                                        setIsStoryViewerOpen(false);
                                    }
                                }}
                            />

                            {/* Story Media (Image or Video) */}
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={stories[activeStoryIndex].id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="w-full h-full flex items-center justify-center"
                                >
                                    {stories[activeStoryIndex].url ? (
                                        stories[activeStoryIndex].url.startsWith("data:video/") || stories[activeStoryIndex].url.includes("mp4") || stories[activeStoryIndex].type === "video" ? (
                                            <video 
                                                src={stories[activeStoryIndex].url} 
                                                className="w-full h-full object-contain" 
                                                autoPlay 
                                                playsInline
                                            />
                                        ) : (
                                            <img 
                                                src={stories[activeStoryIndex].url} 
                                                className="w-full h-full object-contain" 
                                                alt="Story" 
                                            />
                                        )
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 flex flex-col items-center justify-center text-white/20 gap-4">
                                            <ImageIcon size={64} />
                                            <span className="text-xs uppercase font-bold tracking-widest text-white/30">Empty Story Fragment</span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Story Caption Overlay */}
                            {stories[activeStoryIndex].caption && (
                                <div className="absolute bottom-10 left-4 right-4 z-20 text-center bg-black/40 backdrop-blur-md text-white p-4 rounded-2xl text-xs border border-white/10 italic">
                                    {stories[activeStoryIndex].caption}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                body { background-color: #fafafa !important; }
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e2e2; border-radius: 10px; }
            `}</style>
        </div>
    );
}

