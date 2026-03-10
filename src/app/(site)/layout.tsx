"use client";

import CustomCursor from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BackToTop } from "@/components/BackToTop";
import { FloatingElement } from "@/components/animations/ScrollChoreography";
import { Star, Cpu, Activity } from "lucide-react";
import { motion } from "framer-motion";
import SecretAdminAccess from "@/components/SecretAdminAccess";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background text-foreground noise-overlay overflow-x-hidden min-h-screen relative selection:bg-black selection:text-white">
            {/* Secret admin access — keyboard shortcut & mobile logo tap */}
            <SecretAdminAccess />
            {/* ── Optimized Global Architecture ── */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden gpu-accelerated">
                {/* Simplified Halftone Pattern */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-transparent halftone-overlay translate-x-1/4 -translate-y-1/4 opacity-10" />

                {/* Subtle Dot Grid - CSS Optimized */}
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />

                {/* Massive Stationary Ornaments */}
                <div className="absolute top-[15%] left-[-10%] w-[600px] h-[600px] rounded-full border-[1.5px] border-black/5 flex items-center justify-center -rotate-12 translate-z-0">
                    <div className="w-[500px] h-[500px] border-[1.5px] border-black/5 rounded-full" />
                </div>
            </div>

            <SmoothScroll>
                <Preloader />
                <ScrollProgress />
                <CustomCursor />

                <main className="relative min-h-screen">
                    {children}
                </main>

                <BackToTop />
            </SmoothScroll>

            {/* ── Optimized Custom Command HUD ── */}
            <div className="fixed bottom-12 right-12 z-[400] hidden xl:block pointer-events-auto gpu-accelerated">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="hud-glass p-6 pr-8 flex items-center gap-6 group hover:border-black/20 transition-all cursor-help"
                >
                    <div className="relative">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Cpu size={24} />
                        </div>
                        <div className="absolute -top-1 -right-1 hud-dot bg-success animate-pulse" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Core Intel</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-heading font-black italic tracking-tighter">PHASE: 04</span>
                            <div className="h-[1px] w-8 bg-black/10" />
                            <span className="text-[10px] font-black uppercase opacity-40">Ready to Scale</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Minimal Floating Sticker Layer ── */}
            <div className="fixed inset-0 pointer-events-none z-[200]">
                <FloatingElement speed={-0.03} top="12%" left="2%">
                    <div className="bg-white brutalist-border px-4 py-2 shadow-[4px_4px_0px_#000] rotate-[-5deg] flex items-center gap-2 gpu-accelerated pointer-events-auto">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-black">Vibe Check: Passed</span>
                    </div>
                </FloatingElement>

                <FloatingElement speed={0.05} top="45%" left="94%">
                    <div className="w-12 h-12 bg-primary brutalist-border flex items-center justify-center rotate-45 shadow-[4px_4px_0px_#000] gpu-accelerated pointer-events-auto group">
                        <Star size={20} className="text-white fill-current -rotate-45" />
                    </div>
                </FloatingElement>

                <FloatingElement speed={0.08} top="35%" left="4%">
                    <div className="p-4 bg-white brutalist-border rounded-full shadow-[4px_4px_0px_#A855F7] -rotate-12 pointer-events-auto">
                        <Activity size={20} className="text-primary" />
                    </div>
                </FloatingElement>
            </div>

            {/* Architectural Frame - GPU Optimized */}
            <div className="fixed inset-0 border-[12px] border-black/5 pointer-events-none z-[300] gpu-accelerated translate-z-0" />
        </div>
    );
}
