"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";

interface Profile {
    slug: string;
    name: string;
    bio?: string;
    profilePic?: string;
    posts: Post[];
}

interface Post {
    id: string;
    type: "image" | "video";
    src: string;
    caption: string;
    createdAt: string;
}

export default function EditProfileClient({ slug }: { slug: string }) {
    const router = useRouter();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState<string | undefined>(undefined);

    const [isPostModal, setIsPostModal] = useState(false);
    const [newCaption, setNewCaption] = useState("");
    const [newFile, setNewFile] = useState<File | null>(null);

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/ig/profiles/${slug}`)
            .then((r) => r.json())
            .then((data) => {
                setProfile(data);
                setName(data.name);
                setBio(data.bio || "");
                setProfilePic(data.profilePic || undefined);
            });
    }, [slug]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const body: any = { name, bio };
        if (profilePic) body.profilePic = profilePic;
        await fetch(`/api/ig/profiles/${slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        router.refresh();
    };

    const handleProfilePicChange = (file?: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setProfilePic(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const addPost = async () => {
        if (!newFile) return;
        const reader = new FileReader();
        reader.onload = async () => {
            const src = reader.result as string;
            const type = newFile.type.startsWith("video") ? "video" : "image";
            const res = await fetch(`/api/ig/profiles/${slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, src, caption: newCaption }),
            });
            const added = await res.json();
            setProfile((p) => p ? { ...p, posts: [...p.posts, added] } : p);
            setIsPostModal(false);
            setNewCaption("");
            setNewFile(null);
        };
        reader.readAsDataURL(newFile);
    };

    const deletePost = async (id: string) => {
        if (!confirm("Delete post?")) return;
        await fetch(`/api/ig/profiles/${slug}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId: id }),
        });
        setProfile((p) => { if (!p) return p; return { ...p, posts: p.posts.filter((x) => x.id !== id) }; });
    };

    if (!profile) return <p className="text-white">Loading…</p>;

    const shareUrl = typeof window !== 'undefined' ? window.location.origin + `/instagram-preview/${slug}` : `/instagram-preview/${slug}`;

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h1 className="text-3xl font-black text-white">Edit Profile: {profile.name}</h1>
                <button onClick={() => router.push('/admin/ig-preview')} className="text-primary underline text-sm">Back</button>
            </div>
            <div>
                <p className="text-white/60 text-sm">
                    Shareable link: <a href={shareUrl} target="_blank" className="text-primary underline break-all">{shareUrl}</a>
                    <button
                        onClick={() => {
                            if (typeof navigator !== 'undefined') {
                                navigator.clipboard.writeText(shareUrl);
                            }
                        }}
                        className="ml-2 text-white/40 hover:text-white"
                    >
                        (copy)
                    </button>
                </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                    <label className="block text-white text-sm mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white outline-none"
                    />
                </div>
                <div>
                    <label className="block text-white text-sm mb-1">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white outline-none"
                    />
                </div>
                <div>
                    <label className="block text-white text-sm mb-1">Profile Picture</label>
                    <input type="file" accept="image/*" onChange={(e) => handleProfilePicChange(e.target.files?.[0])} />
                </div>
                <button type="submit" className="px-6 py-3 rounded-2xl bg-primary text-white font-black uppercase tracking-widest">
                    Save
                </button>
            </form>

            {/* Posts listing */}
            <div className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-black text-white">Posts</h2>
                    <button
                        onClick={() => setIsPostModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-2xl text-sm"
                    >
                        <Plus size={16} /> Add Post
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {profile.posts.map((post) => (
                        <div key={post.id} className="relative group">
                            {post.type === "image" ? (
                                <img src={post.src} alt="" className="w-full h-auto object-cover rounded-2xl" />
                            ) : (
                                <video src={post.src} className="w-full h-auto rounded-2xl" controls />
                            )}
                            <button
                                onClick={() => deletePost(post.id)}
                                className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Post Modal */}
            {isPostModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-[#0D121F] p-8 rounded-3xl w-11/12 max-w-lg">
                        <h2 className="text-2xl font-black text-white mb-4">New Post</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white text-sm mb-1">File</label>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(e) => setNewFile(e.target.files?.[0] || null)}
                                />
                            </div>
                            <div>
                                <label className="block text-white text-sm mb-1">Caption</label>
                                <textarea
                                    value={newCaption}
                                    onChange={(e) => setNewCaption(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => setIsPostModal(false)}
                                    className="px-6 py-3 rounded-2xl bg-white/10 text-white/60 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addPost}
                                    className="px-6 py-3 rounded-2xl bg-primary text-white font-black uppercase tracking-widest"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
