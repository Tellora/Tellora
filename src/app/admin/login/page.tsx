"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Lock, User, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate auth for demo
        setTimeout(() => {
            if (username === "admin" && password === "tellora2026") {
                localStorage.setItem("tellora_admin_auth", "true");
                router.push("/admin/dashboard");
            } else {
                setError("Invalid secure credentials. Access denied.");
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#080B12] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-dark/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 grid-overlay opacity-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-primary rounded-[2rem] mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-primary/20"
                    >
                        <ShieldCheck size={36} className="text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tighter text-white mb-2">CONTROL HUB</h1>
                    <p className="text-white/40 font-bold text-xs uppercase tracking-[0.4em]">Administrative Access Only</p>
                </div>

                <div className="bg-[#0D121F]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Identity</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter Admin Username"
                                    disabled={isLoading}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Cyber Encryption</label>
                                <span className="text-[9px] font-bold text-white/20 hover:text-primary cursor-pointer transition-colors">Key Retrieval?</span>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Security Key"
                                    disabled={isLoading}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 group hover:shadow-[0_8px_30px_rgba(74,192,228,0.4)] disabled:opacity-50 transition-all active:scale-95"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Initialize System <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-10 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-primary" />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">v2.4.0 Deployment</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white/10" />
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Sync Secured</span>
                </div>
            </motion.div>
        </div>
    );
}
