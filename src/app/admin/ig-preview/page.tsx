"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Link as LinkIcon, Image as ImageIcon, Edit2 as EditIcon } from "lucide-react";
import Link from "next/link";

interface Profile {
    slug: string;
    name: string;
    bio?: string;
    profilePic?: string;
    posts: any[];
}

export default function AdminInstagramPreview() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newPic, setNewPic] = useState<string | undefined>(undefined);

    async function load() {
        const res = await fetch("/api/ig/profiles");
        const data = await res.json();
        setProfiles(data || []);
    }

    useEffect(() => {
        load();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const body: any = { name: newName, bio: newBio };
        if (newPic) body.profilePic = newPic;
        const res = await fetch("/api/ig/profiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const created = await res.json();
        setProfiles((prev) => [...prev, created]);
        setIsModalOpen(false);
        setNewName("");
        setNewBio("");
        setNewPic(undefined);
    };

    const handlePicChange = (file?: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setNewPic(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Remove profile?")) return;
        const res = await fetch(`/api/ig/profiles/${slug}`, { method: "DELETE" });
        if (res.ok) {
            setProfiles((prev) => prev.filter((p) => p.slug !== slug));
        } else {
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-8 md:space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ImageIcon size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Instagram Preview</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">Client Profiles</h1>
                    <p className="text-white/40 font-medium text-xs sm:text-sm mt-1">
                        Create private mock Instagram feeds for clients and share read‑only links.
                    </p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full md:w-auto flex justify-center items-center gap-2 md:gap-3 px-6 md:px-8 py-4 bg-primary text-white rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95"
                    >
                        <Plus size={16} className="md:w-[18px] md:h-[18px]" /> New Profile
                    </button>
                </div>
            </div>

            {/* Table of profiles */}
            <div className="bg-[#0D121F]/60 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto p-2 md:p-4">
                    <table className="w-full text-left min-w-[500px]">
                        <thead>
                            <tr className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20 border-b border-white/5">
                                <th className="p-4 md:p-10 whitespace-nowrap">Name</th>
                                <th className="p-4 md:p-10 whitespace-nowrap">Slug</th>
                                <th className="p-4 md:p-10 text-right md:text-left whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {profiles.map((p) => (
                                <tr key={p.slug} className="group hover:bg-white/[0.04] transition-all">
                                    <td className="p-4 md:p-10 font-black text-white text-sm md:text-base">{p.name}</td>
                                    <td className="p-4 md:p-10 text-white/40 text-xs md:text-sm truncate max-w-[150px] md:max-w-none">{p.slug}</td>
                                    <td className="p-4 md:p-10 flex items-center justify-end md:justify-start gap-3 md:gap-4 flex-wrap">
                                        <Link href={`/admin/ig-preview/${p.slug}`} className="text-primary hover:underline flex items-center gap-1 text-xs md:text-sm">
                                            <EditIcon size={14} className="md:w-4 md:h-4" /> Edit
                                        </Link>
                                        <div className="w-[1px] h-3 bg-white/10 hidden md:block"></div>
                                        <Link href={`/instagram-preview/${p.slug}`} target="_blank" className="text-white/60 hover:text-white flex items-center gap-1 text-xs md:text-sm">
                                            <LinkIcon size={14} className="md:w-4 md:h-4" /> View
                                        </Link>
                                        <div className="w-[1px] h-3 bg-white/10 hidden md:block"></div>
                                        <button onClick={() => handleDelete(p.slug)} className="text-red-400/60 hover:text-red-400 flex items-center">
                                            <Trash2 size={16} className="md:w-5 md:h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-[#0D121F] border border-white/10 p-6 md:p-8 rounded-3xl w-full max-w-lg my-auto shadow-2xl">
                        <h2 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-6">New Client Profile</h2>
                        <form onSubmit={handleCreate} className="space-y-4 md:space-y-5">
                            <div>
                                <label className="block text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 px-4 text-sm md:text-base text-white outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Bio</label>
                                <textarea
                                    value={newBio}
                                    onChange={(e) => setNewBio(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 px-4 text-sm md:text-base text-white outline-none focus:border-primary/50 transition-colors min-h-[100px]"
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Profile Picture</label>
                                <div className="p-4 border border-dashed border-white/20 rounded-xl md:rounded-2xl bg-white/5">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="text-xs md:text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                                        onChange={(e) => handlePicChange(e.target.files?.[0])}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4 mt-6 md:mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors text-xs md:text-sm font-black uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl md:rounded-2xl bg-primary text-white text-xs md:text-sm font-black uppercase tracking-widest hover:bg-primary/80 transition-colors shadow-lg"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
