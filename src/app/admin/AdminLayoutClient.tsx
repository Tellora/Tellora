"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3,
    Users,
    Settings,
    Layers,
    LogOut,
    PieChart,
    ShieldCheck,
    Search,
    LayoutDashboard,
    MessageSquare,
    Image as ImageIcon,
    PlusCircle,
    Bell,
    Menu,
    X,
    Instagram
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase, AdminProfile, getAdminProfile } from "@/lib/supabase";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<AdminProfile | null>(null);

    const pathname = usePathname();
    const router = useRouter();
    // Use startsWith to handle both /admin/login and /admin/login/ (trailing slash)
    const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/" || pathname.startsWith("/admin/login?");

    // Open sidebar by default on desktop
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setIsSidebarOpen(true);
        }
    }, []);

    // ── Supabase Auth ──────────────────────────────────────────────────────────
    useEffect(() => {
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setIsAuthenticated(true);
                const profile = await getAdminProfile(session.user.id);
                if (profile) setCurrentUser(profile);
            } else if (!isLoginPage) {
                router.push("/admin/login");
            }

            setIsLoading(false);
        };

        initAuth();

        // Listen for auth state changes (login / logout events)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_OUT") {
                setIsAuthenticated(false);
                setCurrentUser(null);
                router.push("/admin/login");
            } else if (event === "SIGNED_IN" && session) {
                setIsAuthenticated(true);
                const profile = await getAdminProfile(session.user.id);
                if (profile) setCurrentUser(profile);
            }
        });

        return () => subscription.unsubscribe();
    }, [isLoginPage, router]);

    // ── Logout ─────────────────────────────────────────────────────────────────
    const handleLogout = async () => {
        await supabase.auth.signOut();
        // onAuthStateChange will handle the redirect
    };

    // ── Render logic ───────────────────────────────────────────────────────────
    // Always render login page without the admin shell
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Show a full-screen loader while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#080B12] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                        Verifying Session...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect already called — show loading skeleton instead of blank page
        return (
            <div className="min-h-screen bg-[#080B12] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Redirecting...</p>
                </div>
            </div>
        );
    }

    // ── Display values ─────────────────────────────────────────────────────────
    const displayName = currentUser?.name || "Administrator";
    const displayRole = currentUser?.role || "System Root";
    const displayDept = currentUser?.department || "";
    const displayInitials = currentUser?.initials || "AD";

    // ── Nav items ──────────────────────────────────────────────────────────────
    const menuItems = [
        { name: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Services", icon: Layers, path: "/admin/services" },
        { name: "Case Studies", icon: ImageIcon, path: "/admin/case-studies" },
        { name: "Team Members", icon: Users, path: "/admin/team" },
        { name: "Recruitment", icon: PlusCircle, path: "/admin/recruitment" },
        { name: "Customer Reels", icon: PieChart, path: "/admin/reels" },
        { name: "IG Preview", icon: ImageIcon, path: "/admin/ig-preview" },
        { name: "Inbox", icon: MessageSquare, path: "/admin/inbox" },
        { name: "Instagram Portal", icon: Instagram, path: "/admin/instagram" },
        { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
        { name: "Settings", icon: Settings, path: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#080B12] text-white flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* ── Sidebar ─────────────────────────────────────────────────────── */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className={`fixed md:relative z-50 h-screen bg-[#0D121F]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Logo */}
                <div className="p-6 flex items-center justify-between overflow-hidden whitespace-nowrap">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5">
                            <ShieldCheck size={18} className="text-primary" />
                        </div>
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2"
                            >
                                <Image
                                    src="/tellora-logo.png"
                                    alt="Tellora"
                                    width={100}
                                    height={30}
                                    className="object-contain filter invert"
                                    priority
                                />
                                <span className="text-primary font-bold text-xs tracking-widest uppercase">ADM</span>
                            </motion.div>
                        )}
                    </Link>
                </div>

                {/* Nav links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => {
                                    if (typeof window !== "undefined" && window.innerWidth < 768) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all group relative ${
                                    isActive
                                        ? "bg-primary text-white shadow-[0_8px_20px_rgba(74,192,228,0.3)]"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Icon
                                    size={20}
                                    className={isActive ? "text-white" : "group-hover:text-primary transition-colors"}
                                />
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="font-bold text-sm"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute inset-0 bg-primary rounded-xl -z-10"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User card + Logout */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    {/* Personalized user card */}
                    {isSidebarOpen && currentUser && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-2"
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark p-[1px] shrink-0">
                                <div className="w-full h-full rounded-xl bg-[#0D121F] flex items-center justify-center font-black text-[10px] text-primary">
                                    {displayInitials}
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-black text-white truncate">{displayName}</p>
                                <p className="text-[9px] font-bold text-primary/60 uppercase tracking-wider truncate">{displayRole}</p>
                            </div>
                        </motion.div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-bold text-sm text-inherit">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* ── Main Content ─────────────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#080B12]/50 backdrop-blur-md z-30 shrink-0">
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 focus-within:border-primary/30 transition-all">
                            <Search size={16} className="text-white/20" />
                            <input
                                type="text"
                                placeholder="Universal Search..."
                                className="bg-transparent border-none outline-none text-sm font-medium w-64 text-white placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    {/* Right: Personalized user info */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <button className="relative p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all hidden sm:block">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-4 ring-[#080B12]" />
                        </button>
                        <div className="h-8 w-px bg-white/5 mx-0 md:mx-2 hidden sm:block" />

                        {/* Personalized user block */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-white">{displayName.toUpperCase()}</p>
                                <p className="text-[10px] font-bold text-primary/60">{displayRole}</p>
                                {displayDept && (
                                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-wider">{displayDept}</p>
                                )}
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark p-[1px]">
                                <div className="w-full h-full rounded-xl bg-[#080B12] flex items-center justify-center font-black text-xs text-primary">
                                    {displayInitials}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide p-4 md:p-8 relative">
                    {children}

                    {/* Ambient Background Glow */}
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
                </main>
            </div>
        </div>
    );
}
