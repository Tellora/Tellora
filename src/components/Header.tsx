"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Zap, Star, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "@/components/animations/Magnetic";
import { useRouter } from "next/navigation";


export default function Header() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tapCount, setTapCount] = useState(0);
    const [showTapHint, setShowTapHint] = useState(false);
    const tapResetRef = useRef<NodeJS.Timeout | null>(null);

    const handleLogoTap = () => {
        const next = tapCount + 1;
        setTapCount(next);

        // Reset tap count after 3 seconds of inactivity
        if (tapResetRef.current) clearTimeout(tapResetRef.current);
        tapResetRef.current = setTimeout(() => setTapCount(0), 3000);

        if (next >= 4) {
            setTapCount(0);
            setShowTapHint(true);
            setTimeout(() => {
                setShowTapHint(false);
                router.push("/admin/login");
            }, 900);
        }
    };


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Cases", href: "/case-studies" },
        { name: "SEO Audit", href: "/seo-checker" },
        { name: "Team", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <header
            className={`fixed top-8 left-0 right-0 z-[100] transition-all duration-700 px-6 pointer-events-none text-black`}
        >
            <div className="container mx-auto flex justify-between items-center pointer-events-auto">
                {/* Brand Identity - tap 4x on mobile to access admin */}
                <div
                    className="group relative z-10 cursor-pointer"
                    onClick={handleLogoTap}
                >
                    <Link href="/" onClick={(e) => { /* allow tap tracking but let link work on desktop */ }}>
                        <div className="bg-white text-black px-3 md:px-5 py-2 brutalist-border shadow-[4px_4px_0px_#A855F7] md:shadow-[8px_8px_0px_#A855F7] -rotate-3 hover:rotate-0 transition-all duration-500 flex items-center h-[60px] md:h-[70px] relative overflow-hidden">
                            <Image src="/tellora-logo.png" alt="Tellora Logo" width={160} height={70} className="object-contain w-auto h-full" priority />
                            {/* Subtle tap ripple indicators (mobile only) */}
                            {tapCount > 0 && tapCount < 4 && (
                                <div className="absolute top-1 right-1 flex gap-1 md:hidden">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i < tapCount ? 'bg-primary scale-125' : 'bg-black/10'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                </div>

                {/* Mobile tap success toast */}
                <AnimatePresence>
                    {showTapHint && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.85 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-4 bg-[#080B12] border border-primary/40 text-white px-6 py-4 rounded-[2rem] shadow-[0_0_40px_rgba(74,192,228,0.3)] backdrop-blur-xl"
                        >
                            <ShieldCheck size={20} className="text-primary animate-pulse" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary italic">Control Hub Access...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Dock - Centered Floating Navigation */}
                <nav className="hidden md:flex items-center bg-white/90 backdrop-blur-xl brutalist-border rounded-full px-12 py-4 shadow-[10px_10px_0px_rgba(0,0,0,1)] gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[11px] text-black font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-primary relative group/link"
                        >
                            {link.name}
                            <motion.span
                                className="absolute -bottom-1 left-0 w-0 h-[3px] bg-accent group-hover/link:w-full transition-all duration-500"
                            />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    {/* SEO Audit - High Priority Action */}
                    <Magnetic>
                        <Link
                            href="/seo-checker"
                            className="hidden xl:flex items-center gap-4 px-8 py-5 bg-primary brutalist-border shadow-[8px_8px_0px_#000] text-[11px] font-black uppercase tracking-widest hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000] active:translate-y-1 transition-all group"
                        >
                            FREE AUDIT <Zap size={18} className="text-black group-hover:scale-125 transition-transform" />
                        </Link>
                    </Magnetic>

                    {/* Action Button - Dynamic Angle */}
                    <Magnetic>
                        <Link
                            href="/contact"
                            className="hidden lg:flex items-center gap-4 px-10 py-5 bg-accent brutalist-border shadow-[8px_8px_0px_#000] text-[11px] font-black uppercase tracking-widest hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000] active:translate-y-1 transition-all group"
                        >
                            COLAB? <ArrowUpRight size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                        </Link>
                    </Magnetic>

                    {/* Mobile Toggle - Brutalist Block */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-5 bg-primary text-white brutalist-border shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay - High kinetic transition */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="fixed inset-0 z-[110] bg-background flex flex-col p-12 overflow-hidden border-b-[8px] border-black pointer-events-auto"
                    >
                        {/* Background kinetic text */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none -rotate-12">
                            <span className="text-[40vw] font-heading font-black uppercase leading-none whitespace-nowrap">
                                NAVIGATE •
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-10 md:mb-16 relative z-10">
                            <span className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tighter">THE CORE</span>
                            <button onClick={() => setMobileOpen(false)} className="p-4 md:p-6 bg-black text-white brutalist-border shadow-[4px_4px_0px_#A855F7] md:shadow-[8px_8px_0px_#A855F7] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
                                <X size={32} className="md:w-10 md:h-10" />
                            </button>
                        </div>

                        <div className="space-y-4 md:space-y-6 relative z-10 scrollbar-hide overflow-y-auto pb-8">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block group"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="flex items-center gap-4 md:gap-8"
                                    >
                                        <span className="text-[10px] md:text-[12px] font-black opacity-40 uppercase tracking-[0.5em]">0{idx + 1}</span>
                                        <span className="text-4xl md:text-9xl font-heading font-black uppercase leading-[0.85] tracking-tighter group-hover:text-primary transition-all duration-300 md:group-hover:translate-x-10">
                                            {link.name}
                                        </span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto relative z-10 grid md:grid-cols-2 gap-6 md:gap-10 pb-8 md:pb-0 pt-4">
                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-center py-6 md:py-10 bg-accent brutalist-border shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-lg md:text-2xl hover:bg-white transition-all sticker-pulse"
                            >
                                DEPLOY LOGIC! 🔥
                            </Link>

                            <div className="hidden md:flex flex-col justify-center">
                                <p className="text-xs font-black uppercase leading-tight max-w-xs">
                                    Architecting end-to-end growth ecosystems for the world's most ambitious disruptors.
                                </p>
                            </div>
                        </div>

                        {/* Kinetic Stickers in menu */}
                        <motion.div
                            className="absolute top-1/4 right-1/4 -z-1"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-64 h-64 border-[1px] border-black/10 rounded-full flex items-center justify-center">
                                <Star size={100} className="text-black/5" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
