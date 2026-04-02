"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // If already logged in, skip login screen
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.push("/admin/dashboard");
            } else {
                setIsCheckingSession(false);
            }
        });
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const { error: authError } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password,
        });

        if (authError) {
            setError("Invalid credentials. Access denied.");
            setIsLoading(false);
        } else {
            router.push("/admin/dashboard");
        }
    };

    // Show nothing while checking for an existing session (prevents flash)
    if (isCheckingSession) {
        return (
            <div className="min-h-screen bg-[#080B12] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080B12] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-dark/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 grid-overlay opacity-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-[2rem] mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-primary/30"
                    >
                        <ShieldCheck size={36} className="text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tighter text-white mb-2">CONTROL HUB</h1>
                    <p className="text-white/40 font-bold text-xs uppercase tracking-[0.4em]">Administrative Access Only</p>
                </div>

                {/* Card */}
                <div className="bg-[#0D121F]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="admin-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@telloramedia.online"
                                    disabled={isLoading}
                                    required
                                    autoComplete="email"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Security Key"
                                    disabled={isLoading}
                                    required
                                    autoComplete="current-password"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">
                                    {error}
                                </p>
                            </motion.div>
                        )}

                        {/* Submit */}
                        <button
                            id="admin-login-submit"
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 group hover:shadow-[0_8px_30px_rgba(74,192,228,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Initialize System{" "}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-10 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-primary" />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                            Secured by Supabase Auth
                        </span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white/10" />
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                        256-bit Encrypted
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
