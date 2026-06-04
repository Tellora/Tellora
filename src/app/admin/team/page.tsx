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
    Instagram,
    ArrowRight,
    Filter
} from "lucide-react";
import { 
    getAllTeamMembers, 
    upsertTeamMember, 
    deleteTeamMember, 
    addActivityLog,
} from "@/lib/store";

export default function AdminTeam() {
    const [members, setMembers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [colorVal, setColorVal] = useState("#A855F7");

    const loadTeam = async () => {
        const data = await getAllTeamMembers();
        setMembers(data);
    };

    useEffect(() => {
        loadTeam();
    }, []);

    useEffect(() => {
        if (editingMember) {
            setColorVal(editingMember.color || "#A855F7");
        } else {
            setColorVal("#A855F7");
        }
    }, [editingMember]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const role = formData.get('role') as string;
        const category = formData.get('category') as string;
        const color = formData.get('color') as string;
        const image_url = formData.get('image_url') as string;
        const bio = formData.get('bio') as string;
        const linkedin_url = formData.get('linkedin_url') as string;
        const instagram_url = formData.get('instagram_url') as string;
        const skillsRaw = formData.get('skills') as string;
        
        const stat1Label = formData.get('stat1_label') as string;
        const stat1Value = formData.get('stat1_value') as string;
        const stat2Label = formData.get('stat2_label') as string;
        const stat2Value = formData.get('stat2_value') as string;

        const skills = skillsRaw
            ? skillsRaw.split(',').map(s => s.trim()).filter(s => s.length > 0)
            : [];

        const stats = [];
        if (stat1Label || stat1Value) {
            stats.push({ label: stat1Label || "Stat 1", value: stat1Value || "" });
        }
        if (stat2Label || stat2Value) {
            stats.push({ label: stat2Label || "Stat 2", value: stat2Value || "" });
        }

        const memberData = {
            id: editingMember?.id && !editingMember.id.toString().startsWith("manual-") ? editingMember.id : editingMember?.id || undefined,
            name,
            role,
            category,
            color,
            image_url,
            bio,
            linkedin_url,
            instagram_url,
            skills,
            stats,
            status: category
        };

        await upsertTeamMember(memberData as any);
        await addActivityLog({
            type: editingMember ? "update" : "create",
            item: `Team Member: ${name}`,
            user_name: "Admin",
            status: "Live"
        });
        
        await loadTeam();
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const handleDelete = async (id: string) => {
        const member = members.find(m => m.id === id);
        if (confirm(`Delete ${member?.name}?`)) {
            await deleteTeamMember(id, member?.name);
            await addActivityLog({
                type: "delete",
                item: `Removed: ${member?.name}`,
                user_name: "Admin",
                status: "Removed"
            });
            await loadTeam();
        }
    };

    const filtered = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div className="w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Team Management</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">Agency <span className="text-primary">Team</span></h1>
                    <p className="text-white/40 font-medium text-xs sm:text-sm mt-1">Manage team members, biographies, and access control.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
                        className="w-full md:w-auto flex justify-center items-center gap-2 md:gap-3 px-6 md:px-8 py-4 bg-primary text-white rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95 animate-pulse"
                    >
                        <Plus size={16} className="md:w-[18px] md:h-[18px]" /> Add Team Member
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                    { label: "Total Team Members", value: members.length, icon: Users, color: "#4ac0e4" },
                    { label: "Core Leaders", value: members.filter(m => m.category === "core").length, icon: Zap, color: "#F59E0B" },
                    { label: "Designers & Engineers", value: members.filter(m => m.category !== "core").length, icon: Globe, color: "#3B82F6" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between group hover:border-primary/20 transition-all shadow-inner">
                        <div>
                            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/30 mb-1 md:mb-2">{stat.label}</p>
                            <h3 className="text-3xl md:text-4xl font-black text-white italic">{stat.value}</h3>
                        </div>
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform shrink-0">
                            <stat.icon size={22} className="md:w-[26px] md:h-[26px]" style={{ color: stat.color }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#0D121F]/60 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[3.5rem] overflow-hidden shadow-2xl">
                <div className="p-4 md:p-8 border-b border-white/5 flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 md:w-[18px] md:h-[18px]" />
                        <input
                            type="text"
                            placeholder="Search team members by Name or Role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 md:pl-14 pr-4 md:pr-6 text-white font-medium outline-none focus:border-primary/30 transition-all text-sm"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button className="w-full sm:w-auto flex justify-center items-center p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl text-white/40 hover:text-white transition-all"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="p-0 md:p-4 overflow-x-auto w-full">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/20 border-b border-white/5">
                                <th className="p-4 md:p-6 whitespace-nowrap">Member Name</th>
                                <th className="p-4 md:p-6 whitespace-nowrap hidden sm:table-cell">Role</th>
                                <th className="p-4 md:p-6 whitespace-nowrap">Category</th>
                                <th className="p-4 md:p-6 whitespace-nowrap hidden md:table-cell">Skills</th>
                                <th className="p-4 md:p-6 text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((member, i) => (
                                <motion.tr
                                    key={member.id || i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-white/[0.04] transition-all"
                                >
                                    <td className="p-4 md:p-6">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div 
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-inner shrink-0 relative overflow-hidden"
                                                style={{ backgroundColor: member.color || "#4ac0e4" }}
                                            >
                                                {member.image_url ? (
                                                    <img 
                                                        src={member.image_url} 
                                                        alt={member.name} 
                                                        className="w-full h-full object-cover" 
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                ) : null}
                                                <span className="absolute inset-0 flex items-center justify-center mix-blend-difference font-heading font-black text-[10px]">
                                                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white group-hover:text-primary transition-colors text-sm md:text-base italic">{member.name}</h4>
                                                <p className="text-[9px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest mt-0.5">UID: {member.id?.toString().slice(-4) || "MANUAL"}</p>
                                                <p className="flex sm:hidden text-xs text-white/40 mt-1 font-medium">{member.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-xs md:text-sm font-bold text-white/60 hidden sm:table-cell">{member.role}</td>
                                    <td className="p-4 md:p-6 whitespace-nowrap">
                                        <span className={`px-3 py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border ${
                                            member.category === "core" 
                                                ? "bg-purple-500/10 text-purple-400 border-purple-400/20"
                                                : member.category === "designing"
                                                ? "bg-pink-500/10 text-pink-400 border-pink-400/20"
                                                : "bg-blue-500/10 text-blue-400 border-blue-400/20"
                                        }`}>
                                            {member.category || "development"}
                                        </span>
                                    </td>
                                    <td className="p-4 md:p-6 hidden md:table-cell max-w-xs truncate">
                                        <div className="flex flex-wrap gap-1.5">
                                            {member.skills && member.skills.length > 0 ? (
                                                member.skills.slice(0, 3).map((skill: string, sIdx: number) => (
                                                    <span key={sIdx} className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/60 text-[8px] font-bold uppercase tracking-wider rounded-md">
                                                        {skill}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-white/20 text-[9px] font-bold">NO SKILLS</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-right">
                                        <div className="flex justify-end gap-2 md:gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingMember(member); setIsModalOpen(true); }} className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all"><Edit2 size={14} className="md:w-4 md:h-4" /></button>
                                            <button onClick={() => handleDelete(member.id)} className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white/5 text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 size={14} className="md:w-4 md:h-4" /></button>
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-3xl">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="w-full max-w-2xl bg-[#0D121F] border border-white/10 rounded-3xl md:rounded-[4rem] p-6 md:p-12 relative overflow-hidden"
                        >
                            <form onSubmit={handleSave} className="space-y-6 md:space-y-8">
                                <div className="text-center mb-4">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-3 shadow-2xl">
                                        <Shield size={24} />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter italic">{editingMember ? "Edit Member" : "Add Team Member"}</h2>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mt-1">Team Member Details</p>
                                </div>

                                {/* Scrollable Container */}
                                <div className="max-h-[50vh] overflow-y-auto pr-3 space-y-4 md:space-y-6 scrollbar-thin">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Full Name</label>
                                            <input name="name" defaultValue={editingMember?.name} required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. Ananya" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Role & Title</label>
                                            <input name="role" defaultValue={editingMember?.role} required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. Web Development Expert" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Category</label>
                                            <select name="category" defaultValue={editingMember?.category || "development"} className="w-full bg-[#0D121F] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-medium">
                                                <option value="core">Core Team</option>
                                                <option value="development">Development Team</option>
                                                <option value="designing">Designing Team</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Image URL / Path</label>
                                            <input name="image_url" defaultValue={editingMember?.image_url} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. /teams/ananya tellora.png" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Theme Color</label>
                                        <div className="flex gap-3">
                                            <input type="color" id="theme_color_picker" value={colorVal} onChange={e => setColorVal(e.target.value)} className="w-12 h-10 rounded-xl border-none cursor-pointer bg-transparent shrink-0" />
                                            <input name="color" value={colorVal} onChange={e => setColorVal(e.target.value)} required className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-mono" placeholder="E.g. #F59E0B" />
                                        </div>
                                        {/* Presets */}
                                        <div className="flex gap-2 flex-wrap mt-1">
                                            {["#A855F7", "#22C55E", "#F3E84A", "#EC4899", "#3B82F6", "#F59E0B"].map(c => (
                                                <button key={c} type="button" onClick={() => setColorVal(c)} className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 active:scale-95 transition-transform" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Bio / Quote</label>
                                        <textarea name="bio" rows={3} defaultValue={editingMember?.bio} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none resize-none focus:border-primary transition-all font-medium" placeholder="Engineering pixel-perfect web platforms..." />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Skills (comma-separated)</label>
                                        <input name="skills" defaultValue={editingMember?.skills?.join(', ')} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. WEB APPS, ANIMATION, PERFORMANCE" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">LinkedIn URL</label>
                                            <input name="linkedin_url" defaultValue={editingMember?.linkedin_url} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-medium" placeholder="LinkedIn profile link" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Instagram URL</label>
                                            <input name="instagram_url" defaultValue={editingMember?.instagram_url} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-primary transition-all font-medium" placeholder="Instagram profile link" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Key Statistics (Optional)</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Stat 1 Label</span>
                                                <input name="stat1_label" defaultValue={editingMember?.stats?.[0]?.label} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. ROI" />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Stat 1 Value</span>
                                                <input name="stat1_value" defaultValue={editingMember?.stats?.[0]?.value} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. 10X" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            <div className="space-y-1">
                                                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Stat 2 Label</span>
                                                <input name="stat2_label" defaultValue={editingMember?.stats?.[1]?.label} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. Scale" />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Stat 2 Value</span>
                                                <input name="stat2_value" defaultValue={editingMember?.stats?.[1]?.value} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-primary transition-all font-medium" placeholder="E.g. Global" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="py-3.5 rounded-xl border border-white/10 text-white/40 font-black text-[9px] uppercase tracking-widest hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-3.5 rounded-xl bg-primary text-white font-black text-[9px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
                                    >
                                        Save <ArrowRight size={14} />
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
