"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <title>404 - Page Not Found | Tellora Media</title>
            <meta name="robots" content="noindex, follow" />
            {/* Background Noise & Overlays */}
            <div className="absolute inset-0 noise-overlay opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F3F4F6_100%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center max-w-3xl"
            >
                {/* 404 Glitch Text */}
                <div className="relative mb-8 group">
                    <motion.h1
                        className="text-[12rem] md:text-[20rem] font-heading font-black tracking-tighter leading-none text-black select-none brutalist-text-shadow origin-center"
                        animate={{ x: [-2, 2, -2, 2, 0], y: [1, -1, 1, -1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", repeatDelay: 3 }}
                    >
                        404
                    </motion.h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-4 bg-primary mix-blend-difference rotate-[-5deg] group-hover:rotate-[5deg] transition-transform duration-300" />
                </div>

                <div className="bg-white p-8 md:p-12 border-[8px] border-black shadow-[15px_15px_0px_0px_#A855F7] mb-12 -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Zap className="w-10 h-10 text-primary animate-pulse" />
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter">
                            NODE NOT FOUND
                        </h2>
                    </div>
                    <p className="text-xl md:text-2xl font-bold font-sans uppercase tracking-widest text-black/60 mb-8">
                        The protocol you requested has been redacted or never existed.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-5 bg-black text-white font-black text-lg uppercase tracking-widest brutalist-border shadow-[8px_8px_0px_0px_#F3E84A] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#F3E84A] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-4"
                        >
                            <Home className="w-6 h-6" />
                            Return to Core
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-8 py-5 bg-white text-black font-black text-lg uppercase tracking-widest brutalist-border shadow-[8px_8px_0px_0px_#000000] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000000] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-4"
                        >
                            <ArrowLeft className="w-6 h-6" />
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Status Ticket */}
                <div className="inline-block bg-black text-white px-6 py-2 brutalist-border shadow-[4px_4px_0px_0px_#A855F7] rotate-3 text-sm font-black uppercase tracking-widest">
                    ERROR_CODE: 404_VOID
                </div>
            </motion.div>
        </div>
    );
}
