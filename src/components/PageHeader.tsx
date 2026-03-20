"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PageHeader({ title, subtitle, breadcrumb }: { title: string, subtitle?: string, breadcrumb?: string }) {
    return (
        <section className="relative pt-64 pb-32 overflow-hidden bg-white border-b-[4px] border-black">
            {/* Background Decorative Marquee (Subtle) */}
            <div className="absolute top-1/2 left-0 w-full opacity-[0.03] pointer-events-none -translate-y-1/2 rotate-2">
                <span className="text-[20rem] font-heading font-black uppercase whitespace-nowrap">
                    {title} • {title} • {title} •
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center">
                    <Breadcrumbs />
                    {breadcrumb && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 2 }}
                            className="bg-black text-white px-6 py-2 brutalist-border rounded-full mb-12 shadow-[4px_4px_0px_#4AC0E4] flex items-center gap-3"
                        >
                            <Sparkles size={14} className="text-primary fill-current" />
                            <span className="font-black tracking-[0.3em] uppercase text-[10px]">
                                {breadcrumb}
                            </span>
                        </motion.div>
                    )}

                    <div className="relative mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-[10rem] font-heading font-black text-black leading-none tracking-tighter uppercase text-center"
                        >
                            {title}
                        </motion.h1>

                        {/* Interactive floating icon */}
                        <motion.div
                            className="absolute -top-12 -right-12 hidden lg:block"
                            animate={{ rotate: [0, 20, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="bg-primary p-4 brutalist-border shadow-[6px_6px_0px_#000]">
                                <Star size={32} className="text-white fill-current" />
                            </div>
                        </motion.div>
                    </div>

                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-3xl font-black text-black/60 uppercase max-w-3xl mx-auto leading-tight text-center"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="h-[6px] w-32 bg-primary brutalist-border shadow-[4px_4px_0px_#000] mx-auto mt-20"
                    />
                </div>
            </div>
        </section>
    );
}
