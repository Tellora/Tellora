"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Linkedin, Twitter, Sparkles, Zap, Heart, Globe, Terminal, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer id="contact" className="relative z-10 pt-48 pb-16 bg-background text-black border-t-[8px] border-black overflow-hidden selection:bg-black selection:text-white">
            {/* Custom Background Patterning */}
            <div className="absolute top-0 right-0 w-[800px] h-full bg-black/[0.03] halftone-overlay pointer-events-none" />

            {/* Massive Architectural Text */}
            <div className="absolute bottom-10 left-0 w-full opacity-5 pointer-events-none select-none">
                <span className="text-[30vw] font-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap -mb-10 block translate-y-1/2">
                    TELLORA HUB • TELLORA HUB •
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-32 mb-40">
                    {/* Left side: Personalized CTA */}
                    <div className="max-w-2xl relative">
                        <div className="inline-flex items-center gap-4 px-10 py-3 bg-black text-white brutalist-border rounded-full rotate-[-3deg] mb-12 shadow-[12px_12px_0px_#A855F7] hover:rotate-0 transition-transform cursor-help group">
                            <Terminal size={20} className="text-primary group-hover:animate-pulse" />
                            <span className="text-[12px] font-black uppercase tracking-[0.5em]">Open Protocol 2026</span>
                        </div>

                        <h2 className="text-[14vw] md:text-[12rem] font-heading font-black tracking-[0.85] uppercase mb-12 md:mb-16 leading-[0.85] md:leading-[0.8] tracking-tighter">
                            READY TO <br /> <span className="text-secondary italic">DISRUPT?</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                            <Link
                                href="/contact"
                                className="px-10 md:px-16 py-6 md:py-8 bg-primary text-white font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-lg md:text-2xl brutalist-border shadow-[8px_8px_0px_#000] md:shadow-[15px_15px_0px_#000] hover:translate-y-[-8px] hover:shadow-[12px_12px_0px_#000] md:hover:shadow-[20px_20px_0px_#000] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-4 md:gap-8 group"
                            >
                                START INTEL <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-6 transition-transform" />
                            </Link>

                            <div className="flex gap-6">
                                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                                    <button
                                        key={i}
                                        className="w-20 h-20 bg-white brutalist-border shadow-[8px_8px_0px_#000] flex items-center justify-center hover:translate-y-[-6px] hover:shadow-[12px_12px_0px_#A855F7] hover:bg-black hover:text-white transition-all group"
                                    >
                                        <Icon size={28} className="group-hover:scale-125 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Personalised Badge - Bottom Left of CTA */}
                        <div className="absolute -bottom-20 left-0 hidden md:flex items-center gap-4 bg-accent p-6 brutalist-border shadow-[8px_8px_0px_#000] rotate-2 sticker-pulse">
                            <ShieldCheck size={24} className="text-black" />
                            <span className="text-[12px] font-black uppercase tracking-widest text-black">Encryption: Active</span>
                        </div>
                    </div>

                    {/* Right side: Personalized Links Grid */}
                    <div className="grid sm:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-3xl font-heading font-black uppercase mb-10 flex items-center gap-4">
                                    <Zap size={24} className="text-primary fill-current" /> Core Protocols
                                </h3>
                                <ul className="space-y-6">
                                    {["SEO Expansion", "Viral Flux", "Web Architecture", "Data Intel"].map(s => (
                                        <li key={s}>
                                            <Link href="/services" className="text-[12px] font-black uppercase tracking-[0.4em] hover:text-primary transition-colors flex items-center gap-4 group">
                                                <div className="w-2 h-2 bg-black rounded-full group-hover:scale-200 transition-all group-hover:bg-primary" /> {s}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-3xl font-heading font-black uppercase mb-10 flex items-center gap-4">
                                    <Heart size={24} className="text-accent fill-current" /> Tellora DNA
                                </h3>
                                <ul className="space-y-6">
                                    {["The Genesis", "Success Map", "Join Core", "Intel Blog"].map((s, idx) => (
                                        <li key={s}>
                                            <Link href={idx === 0 ? "/about" : idx === 2 ? "/careers" : idx === 3 ? "/blog" : "/#"} className="text-[12px] font-black uppercase tracking-[0.4em] hover:text-accent transition-colors flex items-center gap-4 group">
                                                <div className="w-2 h-2 bg-black rounded-full group-hover:scale-200 transition-all group-hover:bg-accent" /> {s}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {/* Personalised Newsletter Module */}
                            <div className="bg-white p-12 brutalist-border shadow-[15px_15px_0px_#000] -rotate-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 halftone-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-3xl font-heading font-black uppercase mb-6 tracking-tighter">Intel Sync</h3>
                                <p className="text-[12px] font-black uppercase mb-10 opacity-60 leading-tight">No noise. Absolute growth algorithms delivered weekly.</p>
                                <form className="flex flex-col gap-6 relative z-10">
                                    <input
                                        type="email"
                                        placeholder="CORE_IDENTITY@EMAIL.COM"
                                        className="w-full bg-white brutalist-border p-6 text-[12px] font-black focus:outline-none focus:bg-black focus:text-white transition-all placeholder:text-black/30"
                                    />
                                    <button className="w-full bg-black text-white p-6 font-black uppercase tracking-[0.5em] text-[12px] hover:bg-primary transition-all shadow-[6px_6px_0px_#F3E84A] active:translate-y-1 active:shadow-none">
                                        JOIN SYNC
                                    </button>
                                </form>
                            </div>

                            <div className="px-6 flex flex-col gap-4">
                                <h3 className="text-3xl font-heading font-black uppercase tracking-tighter">HQ</h3>
                                <div className="flex items-center gap-4">
                                    <Globe size={24} className="text-primary animate-pulse" />
                                    <p className="text-[14px] font-black uppercase leading-tight tracking-widest">
                                        Universal Node <br />
                                        <span className="text-primary italic">Absolute Execution</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personalized Bottom Bar */}
                <div className="pt-12 md:pt-16 border-t-[4px] md:border-t-[6px] border-black flex flex-col xl:flex-row justify-between items-center gap-8 md:gap-12 relative z-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <Link href="/">
                            <Image src="/tellora-logo.png" alt="Tellora" width={160} height={50} className="object-contain md:w-[200px]" />
                        </Link>
                        <div className="flex items-center gap-3 px-4 md:px-6 py-2 bg-black text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mt-4 md:mt-0">
                            © 2026 Tellora Groups
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12">
                        {["Security_Protocol", "Core_Terms", "Ethical_Data"].map(l => (
                            <Link key={l} href="#" className="text-[10px] font-black uppercase tracking-[0.6em] hover:text-primary transition-all group relative">
                                {l}
                                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final Personalized Ornament */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none rotate-45">
                <Sparkles size={1200} />
            </div>
        </footer>
    );
}
