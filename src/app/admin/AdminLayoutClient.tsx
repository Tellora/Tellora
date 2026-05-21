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
import { getActivityLogs, getMessages } from "@/lib/store";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<AdminProfile | null>(null);

    const [notifications, setNotifications] = useState<any[]>([]);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const pathname = usePathname();
    const router = useRouter();
    // Use startsWith to handle both /admin/login and /admin/login/ (trailing slash)
    const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/" || pathname.startsWith("/admin/login?");

    const loadNotifications = async () => {
        try {
            const [logs, messages] = await Promise.all([
                getActivityLogs(),
                getMessages()
            ]);

            const mappedMessages = (messages || [])
                .filter((m: any) => m.status === "Unread")
                .map((m: any) => ({
                    id: m.id,
                    title: `New Inquiry`,
                    description: `${m.sender}: "${m.subject}"`,
                    time: m.created_at,
                    type: "inquiry",
                    isUnread: true,
                    link: "/admin/inbox"
                }));

            const mappedLogs = (logs || [])
                .slice(-5)
                .reverse()
                .map((l: any) => ({
                    id: l.id,
                    title: l.item,
                    description: `Activity by ${l.user_name} (${l.status})`,
                    time: l.created_at,
                    type: "action",
                    isUnread: false,
                    link: "/admin/dashboard"
                }));

            const allNotifications = [...mappedMessages, ...mappedLogs].sort((a, b) => {
                const timeA = a.time ? new Date(a.time).getTime() : 0;
                const timeB = b.time ? new Date(b.time).getTime() : 0;
                const numA = isNaN(timeA) ? 0 : timeA;
                const numB = isNaN(timeB) ? 0 : timeB;
                return numB - numA;
            });

            setNotifications(allNotifications);
            setUnreadCount(mappedMessages.length);
        } catch (e) {
            console.error("Error loading notifications:", e);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadNotifications();
            const interval = setInterval(loadNotifications, 15000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, pathname]);

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
                        {/* Functional Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all block"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-[#080B12] animate-pulse" />
                                )}
                            </button>

                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <>
                                        {/* Backdrop to close click */}
                                        <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                                        
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-[-60px] sm:right-0 mt-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-[#0D121F] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 space-y-3"
                                        >
                                            <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-white">Alert Logs</span>
                                                {unreadCount > 0 && (
                                                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-[8px] font-black rounded-full uppercase tracking-widest">
                                                        {unreadCount} Unread
                                                    </span>
                                                )}
                                            </div>

                                            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                                {notifications.length === 0 ? (
                                                    <p className="text-white/20 text-[10px] font-bold uppercase text-center py-6">No Activity Detected</p>
                                                ) : (
                                                    notifications.map((notif) => (
                                                        <Link
                                                            key={notif.id}
                                                            href={notif.link}
                                                            onClick={() => setIsNotificationsOpen(false)}
                                                            className={`block p-3 rounded-xl transition-all border ${
                                                                notif.isUnread
                                                                    ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                                                                    : "bg-white/[0.02] border-transparent hover:bg-white/5"
                                                            }`}
                                                        >
                                                            <div className="flex items-start justify-between gap-2">
                                                                <h5 className={`text-xs font-black italic ${notif.isUnread ? "text-primary" : "text-white/80"}`}>
                                                                    {notif.title}
                                                                </h5>
                                                                <span className="text-[8px] text-white/20 font-bold shrink-0">
                                                                    {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                            <p className="text-[10px] text-white/40 mt-1 font-medium leading-normal line-clamp-2">
                                                                {notif.description}
                                                            </p>
                                                        </Link>
                                                    ))
                                                )}
                                            </div>

                                            <div className="pt-2 border-t border-white/5 text-center">
                                                <Link
                                                    href="/admin/inbox"
                                                    onClick={() => setIsNotificationsOpen(false)}
                                                    className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                                                >
                                                    Access Inbox
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
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
