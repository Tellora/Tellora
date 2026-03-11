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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setIsSidebarOpen(true);
        }
    }, []);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Simple auth check for demo (would be real logic in production)
    useEffect(() => {
        const auth = localStorage.getItem("tellora_admin_auth");
        if (auth === "true" || pathname === "/admin/login") {
            setIsAuthenticated(true);
        } else {
            router.push("/admin/login");
        }
    }, [pathname, router]);

    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage || !isAuthenticated) {
        return <>{children}</>;
    }

    const menuItems = [
        { name: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Services", icon: Layers, path: "/admin/services" },
        { name: "Case Studies", icon: ImageIcon, path: "/admin/case-studies" },
        { name: "Team Members", icon: Users, path: "/admin/team" },
        { name: "Recruitment", icon: PlusCircle, path: "/admin/recruitment" },
        { name: "Customer Reels", icon: PieChart, path: "/admin/reels" },
        // new Instagram preview portal section
        { name: "IG Preview", icon: ImageIcon, path: "/admin/ig-preview" },
        { name: "Inbox", icon: MessageSquare, path: "/admin/inbox" },
        { name: "Instagram Portal", icon: Instagram, path: "/admin/instagram" }, // Added Instagram Portal
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

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className={`fixed md:relative z-50 h-screen bg-[#0D121F]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
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
                                <Image src="/tellora-logo.png" alt="Tellora" width={100} height={30} className="object-contain filter invert" priority />
                                <span className="text-primary font-bold text-xs tracking-widest uppercase">ADM</span>
                            </motion.div>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all group relative ${isActive
                                    ? "bg-primary text-white shadow-[0_8px_20px_rgba(74,192,228,0.3)]"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={20} className={isActive ? "text-white" : "group-hover:text-primary transition-colors"} />
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

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => {
                            localStorage.removeItem("tellora_admin_auth");
                            router.push("/admin/login");
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-bold text-sm text-inherit">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#080B12]/50 backdrop-blur-md z-30">
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

                    <div className="flex items-center gap-4 md:gap-6">
                        <button className="relative p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all hidden sm:block">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-4 ring-[#080B12]" />
                        </button>
                        <div className="h-8 w-px bg-white/5 mx-0 md:mx-2 hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-white">ADMINISTRATOR</p>
                                <p className="text-[10px] font-bold text-primary/60">SYSTEM ROOT</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark p-[1px]">
                                <div className="w-full h-full rounded-xl bg-[#080B12] flex items-center justify-center font-black text-xs">
                                    AD
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
