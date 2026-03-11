"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit3, Trash2, Zap, ArrowRight, X, TrendingUp, Star } from "lucide-react";
import { CaseStudy, getCaseStudies, upsertCaseStudy, deleteCaseStudy } from "@/lib/store";

const CATEGORIES = ["Social Growth", "Performance", "Content", "Design", "SEO", "Product"];

const empty = (): Omit<CaseStudy, "id" | "createdAt"> => ({
    title: "",
    description: "",
    category: "Social Growth",
    impact: "",
    tag: "",
    image: "",
    stats: [{ label: "", value: "" }, { label: "", value: "" }],
    tags: [],
    status: "Draft",
});

export default function AdminCaseStudies() {
    const [cases, setCases] = useState<CaseStudy[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setCurrent] = useState<CaseStudy | null>(null);
    const [form, setForm] = useState(empty());
    const [tagsInput, setTagsInput] = useState("");

    const reload = async () => setCases(await getCaseStudies());
    useEffect(() => { reload(); }, []);

    const openCreate = () => {
        setCurrent(null);
        const e = empty();
        setForm(e);
        setTagsInput("");
        setIsModalOpen(true);
    };

    const openEdit = (cs: CaseStudy) => {
        setCurrent(cs);
        setForm({
            title: cs.title,
            description: cs.description,
            category: cs.category,
            impact: cs.impact,
            tag: cs.tag,
            image: cs.image,
            stats: cs.stats.length >= 2 ? cs.stats : [...cs.stats, { label: "", value: "" }].slice(0, 2),
            tags: cs.tags,
            status: cs.status,
        });
        setTagsInput(cs.tags.join(", "));
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedTags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
        const cs: CaseStudy = {
            id: current ? current.id : `cs-${Date.now()}`,
            title: form.title,
            description: form.description,
            category: form.category,
            impact: form.impact,
            tag: form.tag,
            image: form.image,
            stats: form.stats.filter((s) => s.label && s.value),
            tags: parsedTags,
            status: form.status,
            createdAt: current ? current.createdAt : Date.now(),
        };
        await upsertCaseStudy(cs);
        await reload();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        await deleteCaseStudy(id);
        await reload();
    };

    const toggleStatus = async (cs: CaseStudy) => {
        await upsertCaseStudy({ ...cs, status: cs.status === "Published" ? "Draft" : "Published" });
        await reload();
    };

    const filtered = cases.filter(
        (c) =>
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Work Narratives</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">
                        Case Study <span className="italic text-primary">Archives</span>
                    </h1>
                    <p className="text-white/40 font-medium text-sm mt-1">Showcase transformation impact. Published studies appear on the public Case Studies page.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95"
                >
                    <Plus size={16} /> New Case Study
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0D121F]/60 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-medium outline-none focus:border-primary/30 transition-all text-sm"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 rounded-3xl md:rounded-[3.5rem] group hover:border-primary/30 transition-all p-6 md:p-10 relative overflow-hidden flex flex-col min-h-[380px] shadow-2xl"
                    >
                        {/* Image preview */}
                        {item.image && (
                            <div className="w-full h-40 rounded-[2rem] overflow-hidden mb-6 bg-white/5">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <Zap size={22} />
                            </div>
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => toggleStatus(item)}
                                    className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${item.status === "Published" ? "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20" : "bg-white/5 border-white/10 text-white/30 hover:text-white"}`}
                                >
                                    {item.status}
                                </button>
                                <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-primary italic">{item.tag}</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-black text-white mb-2 italic tracking-tighter leading-tight">{item.title}</h3>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">{item.category}</p>
                            <p className="text-sm text-white/40 mb-6 leading-relaxed">{item.description}</p>

                            <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem]">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-2">Impact</p>
                                <div className="text-xl font-black text-white italic">{item.impact}</div>
                            </div>

                            {item.stats.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {item.stats.map((s, si) => (
                                        <div key={si} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                                            <div className="text-lg font-black text-primary italic">{s.value}</div>
                                            <div className="text-[9px] text-white/30 font-black uppercase tracking-wide">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-8 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => openEdit(item)} className="flex-1 py-4 rounded-2xl bg-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary transition-all flex items-center justify-center gap-2">
                                <Edit3 size={14} /> Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="flex-1 py-4 rounded-2xl bg-red-400/5 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all flex items-center justify-center gap-2">
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>

                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                            <Star size={120} />
                        </div>
                    </motion.div>
                ))}

                {/* Add card */}
                <motion.div
                    onClick={openCreate}
                    className="border-2 border-dashed border-white/5 rounded-3xl md:rounded-[3.5rem] flex flex-col items-center justify-center text-white/10 hover:text-primary hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all min-h-[380px] group p-6"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] md:rounded-[2.5rem] border-2 border-current flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all">
                        <Plus size={32} className="md:w-10 md:h-10" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] italic">New Case Study</span>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="w-full max-w-2xl bg-[#0D121F] border border-white/10 rounded-[2rem] md:rounded-[4rem] p-6 md:p-12 relative overflow-hidden my-4 md:my-8"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 md:top-8 right-4 md:right-8 p-3 text-white/30 hover:text-white"><X size={24} /></button>

                            <form onSubmit={handleSave} className="space-y-7">
                                <div className="text-center mb-6">
                                    <h2 className="text-3xl font-black text-white tracking-tighter italic">{current ? "Edit Case Study" : "New Case Study"}</h2>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Project Title *</label>
                                    <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium text-lg italic"
                                        placeholder="e.g. JS Wedding Services" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Description *</label>
                                    <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium resize-none"
                                        placeholder="What did you achieve for this client?" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Category</label>
                                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-white outline-none appearance-none cursor-pointer">
                                            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Tag / Industry</label>
                                        <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-white outline-none focus:border-primary transition-all font-medium"
                                            placeholder="Enterprise" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Headline Impact Result *</label>
                                    <input required value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium italic"
                                        placeholder="+187% Organic Traffic" />
                                </div>

                                {/* Stats */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Key Stats (2 shown on card)</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {form.stats.map((stat, si) => (
                                            <div key={si} className="space-y-2">
                                                <input value={stat.label} onChange={(e) => { const s = [...form.stats]; s[si].label = e.target.value; setForm({ ...form, stats: s }); }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all text-sm"
                                                    placeholder={`Stat ${si + 1} label (e.g. Rev Growth)`} />
                                                <input value={stat.value} onChange={(e) => { const s = [...form.stats]; s[si].value = e.target.value; setForm({ ...form, stats: s }); }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all text-sm"
                                                    placeholder={`Value (e.g. 3.5x)`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Cover Image URL</label>
                                    <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium text-sm"
                                        placeholder="https://images.unsplash.com/..." />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Detail Tags (comma separated)</label>
                                    <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium"
                                        placeholder="SEO, Web Development, UI/UX" />
                                </div>

                                <div className="space-y-2 mb-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Status</label>
                                    <div className="flex gap-4">
                                        {(["Draft", "Published"] as const).map((s) => (
                                            <button key={s} type="button" onClick={() => setForm({ ...form, status: s })}
                                                className={`flex-1 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${form.status === s ? "bg-primary text-white" : "bg-white/5 text-white/30 hover:text-white"}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="py-4 md:py-5 rounded-2xl md:rounded-[2rem] border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                                    <button type="submit" className="py-4 md:py-5 rounded-2xl md:rounded-[2rem] bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3">
                                        {current ? "Save Changes" : "Publish Study"} <ArrowRight size={16} />
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
