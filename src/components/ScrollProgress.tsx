"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Spring physics wrapper for a smoother, organic loading bar feel
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

    return (
        <div className="fixed top-0 left-0 right-0 h-2 md:h-6 bg-white border-b-[3px] md:border-b-[4px] border-black z-[9999] overflow-hidden flex items-center">
            <motion.div
                className="h-full bg-primary brutalist-border-r flex items-center justify-end px-4"
                style={{ width: "100%", scaleX, originX: 0 }}
            >
                {/* Kinetic indicator inside the bar */}
                <motion.div
                    style={{ rotate }}
                    className="hidden md:flex items-center gap-2 bg-black text-white px-3 py-1 brutalist-border shadow-[2px_2px_0px_#000] scale-75"
                >
                    <Zap size={14} className="text-secondary fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Growth in Progress</span>
                </motion.div>
            </motion.div>

            <div className="absolute right-6 hidden md:flex items-center gap-6">
                {/* US / International entry point (top-right on desktop; phones use the menu and the homepage banner) */}
                <Link
                    href="/us"
                    className="pointer-events-auto text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-2 decoration-2 decoration-accent hover:text-accent transition-colors"
                >
                    US / International →
                </Link>
                <span className="pointer-events-none text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Architecting Future</span>
            </div>
        </div>
    );
}
