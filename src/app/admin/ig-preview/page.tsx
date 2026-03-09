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
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ImageIcon size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Instagram Preview</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Client Profiles</h1>
                    <p className="text-white/40 font-medium text-sm mt-1">
                        Create private mock Instagram feeds for clients and share read‑only links.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95"
                    >
                        <Plus size={16} /> New Profile
                    </button>
                </div>
            </div>

            {/* Table of profiles */}
            <div className="bg-[#0D121F]/60 backdrop-blur-2xl border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto p-4">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20 border-b border-white/5">
                                <th className="p-10">Name</th>
                                <th className="p-10">Slug</th>
                                <th className="p-10">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {profiles.map((p) => (
                                <tr key={p.slug} className="group hover:bg-white/[0.04] transition-all">
                                    <td className="p-10 font-black text-white">{p.name}</td>
                                    <td className="p-10 text-white/40 text-sm">{p.slug}</td>
                                    <td className="p-10 flex items-center gap-4">
                                        <Link href={`/admin/ig-preview/${p.slug}`} className="text-primary hover:underline flex items-center gap-1">
                                            <EditIcon size={16} /> Edit
                                        </Link>
                                        <Link href={`/instagram-preview/${p.slug}`} target="_blank" className="text-white/60 hover:text-white flex items-center gap-1">
                                            <LinkIcon size={16} /> View
                                        </Link>
                                        <button onClick={() => handleDelete(p.slug)} className="text-red-400/60 hover:text-red-400">
                                            <Trash2 size={16} />
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
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-[#0D121F] p-8 rounded-3xl w-11/12 max-w-lg">
                        <h2 className="text-2xl font-black text-white mb-4">New Client Profile</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-white text-sm mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-white text-sm mb-1">Bio</label>
                                <textarea
                                    value={newBio}
                                    onChange={(e) => setNewBio(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-white text-sm mb-1">Profile Picture</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePicChange(e.target.files?.[0])}
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 rounded-2xl bg-white/10 text-white/60 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-2xl bg-primary text-white font-black uppercase tracking-widest"
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
