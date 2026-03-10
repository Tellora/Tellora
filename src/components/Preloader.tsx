"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, Activity } from "lucide-react";

export function Preloader() {
    // Start as TRUE — we want it visible immediately on mount.
    // We'll handle the hydration mismatch by keeping the server
    // render empty via a `mounted` guard.
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing Core...");

    useEffect(() => {
        // This only runs on the client, avoiding SSR mismatch
        setMounted(true);

        const statuses = [
            "Initializing Core...",
            "Loading Growth Intel...",
            "Architecting Revenue...",
            "Deploying Potential...",
            "Ready for Disruption",
        ];

        let idx = 0;
        const statusTimer = setInterval(() => {
            if (idx < statuses.length - 1) {
                idx++;
                setStatus(statuses[idx]);
            }
        }, 400);

        const progressTimer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return Math.min(p + Math.random() * 15 + 8, 100);
            });
        }, 60);

        // Dismiss after 2.5 s
        const done = setTimeout(() => {
            setProgress(100);
            setTimeout(() => setIsLoading(false), 200);
        }, 2500);

        return () => {
            clearInterval(statusTimer);
            clearInterval(progressTimer);
            clearTimeout(done);
        };
    }, []);

    // Don't render anything on the server or before hydration
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-background"
                    initial={{ opacity: 1 }}
                    exit={{
                        clipPath: "circle(0% at 50% 50%)",
                        transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] },
                    }}
                >
                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Orbiting ring */}
                    <motion.div
                        className="absolute w-[400px] h-[400px] border border-black/10 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full brutalist-border" />
                    </motion.div>

                    {/* HUD corners */}
                    <div className="absolute top-12 left-12 hidden md:flex flex-col gap-4">
                        <div className="bg-white p-4 brutalist-border shadow-[4px_4px_0px_#000] flex items-center gap-3">
                            <Cpu size={20} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/40">CPU_CORE_ACTIVE</span>
                        </div>
                    </div>

                    <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-3 bg-black text-white px-6 py-3 brutalist-border shadow-[6px_6px_0px_#A855F7]">
                        <Activity size={16} className="text-primary animate-bounce" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Flux Encrypted</span>
                    </div>

                    {/* Main content */}
                    <div className="relative z-10 flex flex-col items-center px-6 text-center">
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative mb-12 flex flex-col items-center"
                        >
                            <div className="mb-8">
                                <Image
                                    src="/tellora-logo.png"
                                    alt="Tellora"
                                    width={280}
                                    height={100}
                                    className="object-contain drop-shadow-[8px_8px_0px_#A855F7]"
                                    priority
                                />
                            </div>
                            <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-heading font-black tracking-tighter leading-none text-black drop-shadow-[8px_8px_0px_#A855F7] uppercase mt-4">
                                INIT<br />CORE
                            </h1>
                            {/* Status badge */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-4 py-2 brutalist-border shadow-[6px_6px_0px_#000] -rotate-2 flex items-center gap-2 whitespace-nowrap">
                                <Sparkles size={14} className="text-accent fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-widest tabular-nums">{status}</span>
                            </div>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="w-full max-w-sm h-16 bg-white brutalist-border border-[4px] p-1.5 relative overflow-hidden shadow-[12px_12px_0px_#000]">
                            <motion.div
                                className="h-full bg-primary"
                                style={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center mix-blend-difference pointer-events-none">
                                <span className="text-white font-black text-3xl font-heading italic tracking-tighter">
                                    {Math.min(Math.round(progress), 100)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Scanline sweep */}
                    <motion.div
                        className="absolute inset-x-0 h-px bg-primary/30 z-50 pointer-events-none"
                        animate={{ top: ["-5%", "105%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
