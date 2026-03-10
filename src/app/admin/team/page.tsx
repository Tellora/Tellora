"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Plus,
    Trash2,
    Edit2,
    Shield,
    Globe,
    Zap,
    Linkedin,
    Twitter,
    Star,
    ArrowRight,
    X,
    Filter
} from "lucide-react";

const initialTeam = [
    { id: 1, name: "Vansh Gupta", role: "Specialist", performance: "99%", status: "Active" },
    { id: 2, name: "Nandini Mittal", role: "Creative Strategist", performance: "98%", status: "Active" },
    { id: 3, name: "Pranjit Singh", role: "Analyst", performance: "97%", status: "Active" },
];

export default function AdminTeam() {
    const [members, setMembers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);

    // Persistence
    useEffect(() => {
        const saved = localStorage.getItem('tellora_team');
        if (saved) {
            setMembers(JSON.parse(saved));
        } else {
            setMembers(initialTeam);
        }
    }, []);

    useEffect(() => {
        if (members.length > 0) {
            localStorage.setItem('tellora_team', JSON.stringify(members));
        }
    }, [members]);

    const helperRecordActivity = (action: string, item: string) => {
        const logs = JSON.parse(localStorage.getItem('tellora_activity_logs') || '[]');
        const newLog = {
            id: Date.now().toString(),
            type: action === 'Update' ? 'update' : action === 'Create' ? 'create' : 'delete',
            item: item,
            user: "Admin",
            time: "Just Now",
            status: action === 'Delete' ? "Removed" : action === 'Update' ? "Verified" : "Live"
        };
        localStorage.setItem('tellora_activity_logs', JSON.stringify([newLog, ...logs].slice(0, 5)));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const role = formData.get('role') as string;

        if (editingMember) {
            setMembers(members.map(m => m.id === editingMember.id ? { ...editingMember, name, role } : m));
            helperRecordActivity('Update', `Team Node: ${name}`);
        } else {
            const newMember = {
                id: Date.now(),
                name,
                role,
                performance: "98%",
                status: "Active"
            };
            setMembers([...members, newMember]);
            helperRecordActivity('Create', `Personnel: ${name}`);
        }
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const handleDelete = (id: number) => {
        const member = members.find(m => m.id === id);
        if (confirm(`De-authorize ${member?.name}?`)) {
            setMembers(members.filter(m => m.id !== id));
            helperRecordActivity('Delete', `Removed: ${member?.name}`);
        }
    };

    const filtered = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Personnel Command</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Visionary <span className="text-primary">Squad</span></h1>
                    <p className="text-white/40 font-medium text-sm mt-1">Personnel management and network authority levels.</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95"
                    >
                        <Plus size={16} /> Deploy New Specialist
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Specialists", value: members.length, icon: Shield, color: "#4ac0e4" },
                    { label: "Mean Performance", value: "98.4%", icon: Zap, color: "#2e7dbf" },
                    { label: "Global Reach", value: "Area 52", icon: Globe, color: "#7dd4f0" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex items-center justify-between group hover:border-primary/20 transition-all shadow-inner">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                            <h3 className="text-4xl font-black text-white italic">{stat.value}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform">
                            <stat.icon size={26} style={{ color: stat.color }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Matrix View Filter */}
            <div className="bg-[#0D121F]/60 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Query personnel matrix by ID or Role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-medium outline-none focus:border-primary/30 transition-all text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-4 bg-white/5 rounded-2xl text-white/40 hover:text-white transition-all"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 border-b border-white/5">
                                <th className="p-6">Personnel Node</th>
                                <th className="p-6">Direct Role</th>
                                <th className="p-6">Performance</th>
                                <th className="p-6">Auth Status</th>
                                <th className="p-6 text-right">Terminal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((member, i) => (
                                <motion.tr
                                    key={member.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-white/[0.04] transition-all"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs shadow-inner">
                                                {member.name.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white group-hover:text-primary transition-colors text-base italic">{member.name}</h4>
                                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-0.5">UID: {member.id.toString().slice(-4)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm font-bold text-white/60">{member.role}</td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-20 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: member.performance }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                            <span className="text-[11px] font-black text-white">{member.performance}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-[9px] font-black uppercase tracking-widest border border-green-400/10">Authorized</span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingMember(member); setIsModalOpen(true); }} className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(member.id)} className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="w-full max-w-lg bg-[#0D121F] border border-white/10 rounded-[4rem] p-12 relative overflow-hidden"
                        >
                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="text-center mb-10">
                                    <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-6 shadow-2xl">
                                        <Shield size={32} />
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter italic">{editingMember ? "Override Node" : "Ingest Specialist"}</h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-2">Personnel Sync Protocol</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Personnel Legal Name</label>
                                        <input name="name" defaultValue={editingMember?.name} required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. Vansh Gupta" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Operational Designation</label>
                                        <input name="role" defaultValue={editingMember?.role} required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. Creative Specialist" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-12">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="py-5 rounded-2xl border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-5 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                                    >
                                        Commit <ArrowRight size={16} />
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
