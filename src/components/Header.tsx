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
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);
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
        // Scroll-aware header: tucks away when scrolling down, returns on scroll up
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 50);
            const delta = y - lastY.current;
            if (Math.abs(delta) > 8) {
                setHidden(y > 240 && delta > 0);
                lastY.current = y;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scrolling when mobile menu overlay is open
    useEffect(() => {
        if (mobileOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") setMobileOpen(false);
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                document.body.style.overflow = originalOverflow;
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [mobileOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Cases", href: "/case-studies" },
        { name: "SEO Audit", href: "/seo-checker" },
        { name: "Team", href: "/teams" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <header
            className={`fixed top-5 md:top-8 left-0 right-0 z-[100] transition-transform duration-500 ease-out px-4 sm:px-6 pointer-events-none text-black ${hidden && !mobileOpen ? "-translate-y-[150%]" : "translate-y-0"}`}
        >
            <div className="container mx-auto flex justify-between items-center pointer-events-auto">
                {/* Brand Identity - tap 4x on mobile to access admin */}
                <div
                    className="group relative z-10 cursor-pointer"
                    onClick={handleLogoTap}
                >
                    <Link href="/" onClick={(e) => { /* allow tap tracking but let link work on desktop */ }}>
                        <div className="bg-white text-black px-3 md:px-5 py-2 brutalist-border shadow-[4px_4px_0px_#A855F7] md:shadow-[8px_8px_0px_#A855F7] -rotate-3 hover:rotate-0 transition-all duration-500 flex items-center justify-center h-[46px] md:h-[70px] relative overflow-hidden">
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
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary italic">Opening Admin Panel...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Dock - Centered Floating Navigation */}
                <nav aria-label="Main navigation" className="hidden md:flex items-center bg-white/90 backdrop-blur-xl brutalist-border rounded-full px-12 py-4 shadow-[10px_10px_0px_rgba(0,0,0,1)] gap-10">
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

                <div className="flex items-center gap-3 md:gap-6">
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
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        className="p-3 md:p-5 min-h-[46px] min-w-[46px] bg-primary text-black md:text-white brutalist-border shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay - Fully scrollable & responsive across all viewports */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        className="fixed inset-0 z-[110] bg-background overflow-y-auto overscroll-contain border-b-[8px] border-black pointer-events-auto selection:bg-primary selection:text-white"
                    >
                        {/* Background kinetic text */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none -rotate-12 select-none overflow-hidden">
                            <span className="text-[25vw] sm:text-[30vw] md:text-[35vw] font-heading font-black uppercase leading-none whitespace-nowrap">
                                NAVIGATE •
                            </span>
                        </div>

                        <div className="min-h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 relative z-10">
                            {/* Top header bar */}
                            <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-12">
                                <span className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tighter">THE CORE</span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Close navigation menu"
                                    className="p-3 sm:p-4 md:p-5 bg-black text-white brutalist-border shadow-[4px_4px_0px_#A855F7] md:shadow-[6px_6px_0px_#A855F7] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                                >
                                    <X size={26} className="md:w-8 md:h-8" />
                                </button>
                            </div>

                            {/* Nav Links - Responsive scalable typography with clean spacing */}
                            <div className="space-y-3 sm:space-y-4 md:space-y-5 my-auto py-4 sm:py-6">
                                {navLinks.map((link, idx) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block group"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: -40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.04 * idx }}
                                            className="flex items-baseline gap-3 sm:gap-4 md:gap-6"
                                        >
                                            <span className="text-[10px] sm:text-xs font-mono font-black opacity-40 uppercase tracking-[0.3em]">
                                                0{idx + 1}
                                            </span>
                                            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black uppercase leading-[0.9] tracking-tighter group-hover:text-primary transition-all duration-300 md:group-hover:translate-x-6">
                                                {link.name}
                                            </span>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>

                            {/* Bottom CTA / Branding row */}
                            <div className="pt-6 sm:pt-8 mt-auto grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 items-center border-t-2 border-black/10">
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full text-center py-4 sm:py-6 bg-accent brutalist-border shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm sm:text-base md:text-xl hover:bg-white transition-all sticker-pulse"
                                >
                                    GET STARTED! 🔥
                                </Link>

                                <div className="hidden md:flex flex-col justify-center">
                                    <p className="text-xs font-black uppercase leading-tight max-w-sm text-black/70">
                                        Creating customized digital marketing solutions for ambitious brands.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Kinetic Stickers in menu */}
                        <motion.div
                            className="absolute top-1/4 right-1/4 -z-1 pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-64 h-64 border border-black/10 rounded-full flex items-center justify-center">
                                <Star size={90} className="text-black/5" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
