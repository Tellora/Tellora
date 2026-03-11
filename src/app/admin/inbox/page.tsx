"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, Clock, Search, Filter,
    Send, Mail, Sparkles, Trash2, Reply, MoreHorizontal,
    Inbox, ChevronDown, ExternalLink, Tag, RefreshCw, X
} from "lucide-react";
import {
    ContactMessage, getMessages, deleteMessage,
    markMessageRead, addReply, addActivityLog
} from "@/lib/store";

const FILTERS = ["All Messages", "Unread", "Replied", "Archived"] as const;
type Filter = typeof FILTERS[number];

export default function AdminInbox() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<Filter>("All Messages");
    const [replyText, setReplyText] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const replyRef = useRef<HTMLInputElement>(null);

    const loadMessages = async () => setMessages(await getMessages());

    useEffect(() => {
        loadMessages();
        // Poll for new messages every 5 seconds
        const interval = setInterval(loadMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    // Refresh selected message when messages change
    useEffect(() => {
        if (selectedMsg) {
            const updated = messages.find((m) => m.id === selectedMsg.id);
            if (updated) setSelectedMsg(updated);
        }
    }, [messages]);

    const handleSelect = async (msg: ContactMessage) => {
        setSelectedMsg(msg);
        setSent(false);
        setReplyText("");
        if (msg.status === "Unread") {
            await markMessageRead(msg.id);
            setMessages(await getMessages());
        }
    };

    const handleDelete = async (id: string) => {
        await deleteMessage(id);
        if (selectedMsg?.id === id) setSelectedMsg(null);
        await loadMessages();
    };

    const handleArchive = async (id: string) => {
        const msg = messages.find((m) => m.id === id);
        if (msg) {
            import('@/lib/store').then(async ({ saveMessage }) => {
                await saveMessage({ ...msg, status: "Archived" });
                await loadMessages();
            });
        }
    };

    const handleSend = () => {
        if (!replyText.trim() || !selectedMsg) return;
        setSending(true);
        setTimeout(async () => {
            await addReply(selectedMsg.id, replyText);
            await addActivityLog({
                type: "reply",
                item: `Replied to: ${selectedMsg.sender}`,
                user: "Admin",
                time: "Just Now",
                status: "Sent",
            });
            setReplyText("");
            setSending(false);
            setSent(true);
            await loadMessages();
            setTimeout(() => setSent(false), 3000);
        }, 800);
    };

    const handleEmailClient = () => {
        if (!selectedMsg) return;
        window.location.href = `mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}&body=${encodeURIComponent("Hi " + selectedMsg.sender + ",\n\n")}`;
    };

    const filtered = messages.filter((msg) => {
        const matchesSearch =
            msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeFilter === "All Messages") return matchesSearch;
        if (activeFilter === "Unread") return matchesSearch && msg.status === "Unread";
        if (activeFilter === "Replied") return matchesSearch && msg.status === "Replied";
        if (activeFilter === "Archived") return matchesSearch && msg.status === "Archived";
        return matchesSearch;
    });

    const unreadCount = messages.filter((m) => m.status === "Unread").length;

    return (
        <div className="space-y-12 flex flex-col" style={{ minHeight: "calc(100vh - 140px)" }}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <Mail size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Inter-Matrix Dialogue</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white italic leading-none">
                        Dialogue <span className="text-primary italic">Vault</span>
                    </h1>
                    <p className="text-white/30 font-medium text-xs sm:text-sm mt-4 md:mt-6 tracking-wide max-w-xl italic border-l-2 border-primary/20 pl-6 md:pl-8 py-2">
                        Real-time communications from website visitors. Contact form submissions appear here instantly.
                    </p>
                </div>

                <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                    <div className="flex-1 flex items-center gap-3 md:gap-6 bg-[#0D121F]/60 border border-white/10 rounded-2xl md:rounded-[2.5rem] p-3 md:p-4 px-4 md:px-8 shadow-2xl focus-within:border-primary/40 transition-all group">
                        <Search size={22} className="text-white/10 group-focus-within:text-primary transition-colors shrink-0" />
                        <input
                            type="text"
                            placeholder="Search inbox..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm md:text-base font-black italic text-white placeholder:text-white/10 w-full md:w-64"
                        />
                    </div>
                    <button
                        onClick={loadMessages}
                        className="p-4 md:p-6 bg-primary/20 border border-primary/20 text-primary rounded-xl md:rounded-[2rem] hover:bg-primary hover:text-white transition-all active:scale-95 shrink-0"
                        title="Refresh"
                    >
                        <RefreshCw size={24} className="md:w-6 md:h-6 w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-12 gap-6 md:gap-12" style={{ minHeight: 750 }}>
                {/* List Pane */}
                <div className={`${selectedMsg ? "hidden lg:flex lg:col-span-5" : "flex lg:col-span-12"} bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 rounded-3xl md:rounded-[5rem] overflow-hidden flex-col shadow-4xl transition-all duration-700`}>
                    {/* Tabs */}
                    <div className="p-4 md:p-10 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 md:gap-6">
                        <div className="flex bg-[#080B12]/80 p-2 rounded-2xl md:rounded-[2rem] border border-white/5 shadow-inner flex-wrap gap-1 w-full md:w-auto justify-center">
                            {FILTERS.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setActiveFilter(t)}
                                    className={`px-4 md:px-8 py-2 md:py-3.5 rounded-xl md:rounded-[1.5rem] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === t ? "bg-primary text-white shadow-lg md:shadow-2xl shadow-primary/30" : "text-white/30 hover:text-white hover:bg-white/5"}`}
                                >
                                    {t}
                                    {t === "Unread" && unreadCount > 0 && (
                                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-white text-primary text-[9px] font-black rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full py-32 text-center opacity-20">
                                <Inbox size={80} className="mb-8 animate-pulse" />
                                <h3 className="text-2xl font-black text-white italic mb-3 uppercase tracking-tighter">
                                    {searchTerm ? "No matches found" : "Inbox is empty"}
                                </h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white max-w-[280px]">
                                    {searchTerm ? "Try adjusting your search" : "Contact form submissions will appear here."}
                                </p>
                            </div>
                        ) : (
                            filtered.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    onClick={() => handleSelect(msg)}
                                    className={`group p-4 md:p-8 rounded-3xl md:rounded-[3.5rem] border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 relative overflow-hidden ${selectedMsg?.id === msg.id
                                            ? "bg-primary/20 border-primary/40 shadow-inner"
                                            : msg.status === "Unread"
                                                ? "bg-primary/5 border-primary/20"
                                                : "bg-[#080B12]/20 border-white/5 hover:border-primary/20 hover:bg-white/[0.03]"
                                        }`}
                                >
                                    <div className="flex items-center gap-4 md:gap-8 w-full">
                                        {/* Avatar */}
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] flex items-center justify-center font-black text-base md:text-lg italic shadow-inner shrink-0 ${msg.status === "Unread" ? "bg-primary text-white" : "bg-white/5 text-white/30 border border-white/5"}`}>
                                            {msg.avatar}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1 md:mb-2">
                                                <h4 className="text-lg md:text-xl font-black text-white italic tracking-tight flex flex-wrap items-center gap-2 md:gap-3">
                                                    {msg.sender}
                                                    {msg.status === "Unread" && <span className="w-2 md:w-2.5 h-2 md:h-2.5 bg-primary rounded-full shadow-[0_0_10px_#4ac0e4]" />}
                                                    {msg.status === "Replied" && <span className="text-[8px] md:text-[9px] px-2 md:px-3 py-0.5 md:py-1 bg-green-500/20 text-green-400 rounded-full font-black uppercase tracking-wider">Replied</span>}
                                                </h4>
                                                <span className="text-[9px] md:text-[11px] font-black text-white/20 uppercase tracking-widest md:tracking-[0.3em] font-mono shrink-0 ml-2">{msg.time}</span>
                                            </div>
                                            <h5 className="text-xs md:text-sm font-black text-primary/80 mb-1 md:mb-1.5 truncate italic">{msg.subject}</h5>
                                            <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
                                                <span className="px-2 md:px-3 py-1 rounded-lg md:rounded-xl bg-white/5 text-[8px] md:text-[9px] font-black text-white/30 uppercase tracking-widest border border-white/5 shrink-0 hidden sm:inline-block">{msg.service}</span>
                                                <p className="text-xs md:text-sm text-white/40 truncate italic font-medium">{msg.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Unread indicator */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all rounded-l-[3.5rem] ${msg.status === "Unread" ? "bg-primary" : "bg-transparent"}`} />

                                    {/* Hover delete */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                        className="opacity-0 group-hover:opacity-100 p-3 text-white/20 hover:text-red-400 transition-all shrink-0"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail Pane */}
                <AnimatePresence>
                    {selectedMsg && (
                        <motion.div
                            key={selectedMsg.id}
                            initial={{ opacity: 0, scale: 0.95, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, x: 50 }}
                            className="lg:col-span-7 bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 rounded-3xl md:rounded-[5rem] p-6 md:p-12 flex flex-col shadow-5xl relative overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedMsg(null)}
                                className="absolute top-4 right-4 p-3 bg-white/5 rounded-2xl text-white/40 hover:text-white transition-all xl:hidden z-50"
                            >
                                <X size={20} />
                            </button>

                            {/* Sender Info */}
                            <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-6">
                                <div className="flex items-center gap-4 md:gap-8">
                                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[3rem] bg-primary flex items-center justify-center text-white text-xl md:text-2xl font-black italic shadow-2xl md:shadow-4xl shadow-primary/30 shrink-0">
                                        {selectedMsg.avatar}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-white italic tracking-tighter">{selectedMsg.sender}</h2>
                                        <a
                                            href={`mailto:${selectedMsg.email}`}
                                            className="text-primary text-sm font-black hover:underline flex items-center gap-2 mt-1"
                                        >
                                            {selectedMsg.email} <ExternalLink size={12} />
                                        </a>
                                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic font-mono">{selectedMsg.time}</span>
                                            <span className="text-[9px] px-3 py-1 bg-white/5 text-white/30 rounded-full font-black uppercase tracking-wide border border-white/5">{selectedMsg.service}</span>
                                            {selectedMsg.company && selectedMsg.company !== "N/A" && (
                                                <span className="text-[9px] px-3 py-1 bg-primary/10 text-primary/60 rounded-full font-black uppercase tracking-wide border border-primary/20">{selectedMsg.company}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                                    <button
                                        onClick={() => handleArchive(selectedMsg.id)}
                                        className="flex-1 md:flex-none p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl text-white/30 hover:text-orange-400 hover:bg-orange-400/10 transition-all text-[9px] font-black uppercase tracking-wider flex justify-center items-center"
                                        title="Archive"
                                    >
                                        Archive
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedMsg.id)}
                                        className="p-4 bg-white/5 rounded-2xl text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedMsg(null)}
                                        className="hidden xl:flex px-5 py-4 bg-white/5 rounded-2xl text-white/40 hover:text-white transition-all font-black text-[10px] uppercase tracking-wider"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="flex-1 space-y-8 overflow-y-auto scrollbar-hide pb-6">
                                <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem] relative overflow-hidden">
                                    <h3 className="text-2xl font-black text-white mb-6 italic tracking-tight">{selectedMsg.subject}</h3>
                                    <p className="text-lg text-white/70 leading-relaxed font-medium relative z-10 whitespace-pre-wrap">
                                        {selectedMsg.message}
                                    </p>
                                    <Sparkles size={120} className="absolute -bottom-10 -right-10 opacity-[0.02] text-primary rotate-12" />
                                </div>

                                {/* Reply History */}
                                {selectedMsg.replyHistory && selectedMsg.replyHistory.length > 0 && (
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 ml-4">Reply History</p>
                                        {selectedMsg.replyHistory.map((reply, i) => (
                                            <div key={i} className="ml-8 p-8 bg-primary/10 border border-primary/20 rounded-[2.5rem] relative">
                                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-primary/30" />
                                                <p className="text-white/70 text-sm leading-relaxed italic font-medium">{reply.text}</p>
                                                <p className="text-[9px] text-primary/40 font-black uppercase tracking-widest mt-4">{reply.sentAt} · You</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Reply Box */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                {sent && (
                                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="text-green-400 text-[11px] font-black uppercase tracking-widest mb-4 text-center"
                                    >
                                        ✓ Reply saved to thread
                                    </motion.p>
                                )}
                                <div className="bg-[#080B12]/60 rounded-3xl md:rounded-[3rem] p-2 md:p-4 flex items-center gap-2 md:gap-4 shadow-inner border border-white/5">
                                    <input
                                        ref={replyRef}
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder="Type reply note here..."
                                        className="flex-1 bg-transparent border-none outline-none px-8 text-white font-black italic text-base"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!replyText.trim() || sending}
                                        className="h-12 w-12 md:h-16 md:w-16 rounded-2xl md:rounded-[2rem] bg-primary text-white flex items-center justify-center hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shrink-0"
                                    >
                                        {sending ? <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={20} className="md:w-6 md:h-6" />}
                                    </button>
                                </div>
                                <div className="flex justify-center gap-8 mt-6">
                                    <button
                                        onClick={handleEmailClient}
                                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-primary transition-all italic"
                                    >
                                        <Reply size={16} /> Open in Email Client
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedMsg.id)}
                                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-red-400 transition-all italic"
                                    >
                                        <Trash2 size={16} /> Delete Message
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!selectedMsg && (
                    <div className="hidden xl:flex xl:col-span-7 flex-col items-center justify-center text-center p-20 opacity-10 border-2 border-dashed border-white/5 rounded-[5rem]">
                        <Mail size={100} className="mb-12 animate-pulse" />
                        <h3 className="text-3xl font-black text-white italic mb-4 uppercase tracking-tighter">Select a Message</h3>
                        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white max-w-[280px]">Click any conversation to read the full message and reply.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
