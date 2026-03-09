"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Search, Trash2, Edit2, Layers, Globe, Zap, ArrowRight, X,
    CheckCircle2, Box, ToggleLeft, ToggleRight
} from "lucide-react";
import { Service, getServices, upsertService, deleteService } from "@/lib/store";

const CATEGORIES = ["Growth", "Media", "Design", "Analytics", "Development", "Strategy"];

const emptyService = (): Omit<Service, "id" | "createdAt"> => ({
    title: "",
    description: "",
    category: "Growth",
    features: ["", "", ""],
    status: "Active",
    reach: "+100%",
});

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [form, setForm] = useState(emptyService());

    const reload = () => setServices(getServices());

    useEffect(() => { reload(); }, []);

    const openCreate = () => {
        setEditingService(null);
        setForm(emptyService());
        setIsModalOpen(true);
    };

    const openEdit = (svc: Service) => {
        setEditingService(svc);
        setForm({
            title: svc.title,
            description: svc.description,
            category: svc.category,
            features: svc.features.length >= 3 ? svc.features : [...svc.features, "", "", ""].slice(0, 3),
            status: svc.status,
            reach: svc.reach,
        });
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanedFeatures = form.features.filter((f) => f.trim() !== "");
        const svc: Service = {
            id: editingService ? editingService.id : `svc-${Date.now()}`,
            title: form.title,
            description: form.description,
            category: form.category,
            features: cleanedFeatures,
            status: form.status,
            reach: form.reach,
            createdAt: editingService ? editingService.createdAt : Date.now(),
        };
        upsertService(svc);
        reload();
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        deleteService(id);
        reload();
    };

    const toggleStatus = (svc: Service) => {
        upsertService({ ...svc, status: svc.status === "Active" ? "Draft" : "Active" });
        reload();
    };

    const filtered = services.filter(
        (s) =>
            s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeCount = services.filter((s) => s.status === "Active").length;

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Layers size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Service Ecosystem</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">
                        Offerings <span className="text-primary text-4xl font-black tracking-tighter italic">Matrix</span>
                    </h1>
                    <p className="text-white/40 font-medium text-sm mt-1">
                        Manage core service deliverables. Changes reflect on the public services page.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95"
                >
                    <Plus size={16} /> Deploy New Offering
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Services", value: activeCount, icon: Box, color: "#4ac0e4" },
                    { label: "Total Services", value: services.length, icon: Layers, color: "#2e7dbf" },
                    { label: "Draft Services", value: services.length - activeCount, icon: Globe, color: "#7dd4f0" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex items-center justify-between group hover:border-primary/20 transition-all">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                            <h3 className="text-4xl font-black text-white italic">{stat.value}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform">
                            <stat.icon size={26} style={{ color: stat.color }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-[#0D121F]/60 backdrop-blur-2xl border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-white/5 flex gap-6 items-center">
                    <div className="flex-1 relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-medium outline-none focus:border-primary/30 transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto p-4">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20 border-b border-white/5">
                                <th className="p-8">Service</th>
                                <th className="p-8">Category</th>
                                <th className="p-8">Features</th>
                                <th className="p-8">Reach</th>
                                <th className="p-8">Status</th>
                                <th className="p-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-16 text-center text-white/20 font-black italic uppercase tracking-widest text-sm">
                                        No services found. Deploy your first offering above.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((svc, i) => (
                                    <motion.tr
                                        key={svc.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="group hover:bg-white/[0.04] transition-all"
                                    >
                                        <td className="p-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 shrink-0">
                                                    <Layers size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-black text-white group-hover:text-primary transition-colors italic tracking-tight">{svc.title}</h4>
                                                    <p className="text-[10px] text-white/30 mt-1 max-w-xs truncate">{svc.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="px-4 py-2 rounded-xl bg-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest border border-white/5">{svc.category}</span>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex flex-col gap-1">
                                                {svc.features.slice(0, 2).map((f, fi) => (
                                                    <span key={fi} className="text-[10px] text-white/30 font-black uppercase tracking-wider">• {f}</span>
                                                ))}
                                                {svc.features.length > 2 && (
                                                    <span className="text-[10px] text-primary/50 font-black">+{svc.features.length - 2} more</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-sm font-black text-white italic">{svc.reach}</span>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <button
                                                onClick={() => toggleStatus(svc)}
                                                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${svc.status === "Active" ? "text-green-400" : "text-orange-400"}`}
                                            >
                                                {svc.status === "Active" ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                                {svc.status}
                                            </button>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(svc)} className="p-4 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all"><Edit2 size={18} /></button>
                                                <button onClick={() => handleDelete(svc.id)} className="p-4 rounded-xl bg-white/5 text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="w-full max-w-2xl bg-[#0D121F] border border-white/10 rounded-[4rem] p-12 relative overflow-hidden my-8"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 text-white/30 hover:text-white"><X size={24} /></button>

                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-4">
                                        <Layers size={32} />
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter italic">{editingService ? "Update Service" : "Deploy New Service"}</h2>
                                </div>

                                {/* Title */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Service Title *</label>
                                    <input
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium text-lg italic"
                                        placeholder="e.g. High-Performance SEO"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Description *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium resize-none"
                                        placeholder="Describe what this service delivers..."
                                    />
                                </div>

                                {/* Category + Reach */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Category</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium cursor-pointer appearance-none"
                                        >
                                            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Impact Metric</label>
                                        <input
                                            value={form.reach}
                                            onChange={(e) => setForm({ ...form, reach: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium italic"
                                            placeholder="+240%"
                                        />
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Key Features (up to 5)</label>
                                    <div className="space-y-3">
                                        {form.features.map((feat, fi) => (
                                            <div key={fi} className="flex gap-3 items-center">
                                                <span className="text-primary/40 font-black text-sm w-6 shrink-0">{fi + 1}.</span>
                                                <input
                                                    value={feat}
                                                    onChange={(e) => {
                                                        const newFeats = [...form.features];
                                                        newFeats[fi] = e.target.value;
                                                        setForm({ ...form, features: newFeats });
                                                    }}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium text-sm"
                                                    placeholder={`Feature ${fi + 1}...`}
                                                />
                                                {form.features.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm({ ...form, features: form.features.filter((_, i) => i !== fi) })}
                                                        className="text-white/20 hover:text-red-400 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {form.features.length < 5 && (
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, features: [...form.features, ""] })}
                                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/50 hover:text-primary transition-colors"
                                            >
                                                <Plus size={14} /> Add Feature
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Publish Status</label>
                                    <div className="flex gap-4">
                                        {(["Active", "Draft"] as const).map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setForm({ ...form, status: s })}
                                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${form.status === s ? "bg-primary text-white" : "bg-white/5 text-white/30 hover:text-white"}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="py-5 rounded-[2rem] border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                        Cancel
                                    </button>
                                    <button type="submit" className="py-5 rounded-[2rem] bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3">
                                        {editingService ? "Update" : "Deploy"} Service <ArrowRight size={16} />
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
