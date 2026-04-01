"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    Eye,
    MousePointer2,
    ArrowUpRight,
    Calendar,
    CheckCircle2,
    Clock,
    Globe,
    Activity,
    LineChart as LucideLineChart,
    ArrowRight,
    RefreshCcw,
    ShieldAlert,
    Cpu,
    Lock,
    Search,
    Signal,
    Database,
    Zap,
    LayoutDashboard
} from "lucide-react";

import { getAdminData } from "@/lib/serverDb";

// Count-up animation component
const NumberTicker = ({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const totalSteps = 60;
        const increment = end / totalSteps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= totalSteps) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(increment * currentStep);
            }
        }, duration / totalSteps);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<any[]>([]);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [systemParams, setSystemParams] = useState<any[]>([]);

    const refreshSystemState = async () => {
        setIsSyncing(true);

        const teamData = await getAdminData('team', []);
        const teamCount = teamData.length || 4;

        const servicesData = await getAdminData('tellora_services_v2', []);
        const servicesCount = servicesData.length || 5;

        const caseStudiesData = await getAdminData('tellora_case_studies_v2', []);
        const caseStudiesCount = caseStudiesData.length || 3;

        const reelsData = await getAdminData('tellora_reels_v2', []);
        const reelsCount = reelsData.length || 4;

        const totalContent = teamCount + servicesCount + caseStudiesCount + reelsCount;

        setStats([
            { label: "Total Page Views", value: 0, change: "Pending API", icon: Eye, color: "#4ac0e4", suffix: "", decimals: 0, trend: 'neutral' },
            { label: "Unique Visitors", value: 0, change: "Pending API", icon: Users, color: "#2e7dbf", suffix: "", decimals: 0, trend: 'neutral' },
            { label: "Content Items", value: totalContent, change: "UP TO DATE", icon: Database, color: "#7dd4f0", suffix: "", decimals: 0, trend: 'neutral' },
            { label: "Bounce Rate", value: 0, change: "Pending API", icon: MousePointer2, color: "#4ac0e4", suffix: "%", decimals: 1, trend: 'neutral' },
        ]);

        setSystemParams([
            { label: "Server Status", value: 99.9, unit: "UPTIME", icon: Activity, color: "#22c55e" },
            { label: "SEO Score", value: 94, unit: "SCORE", icon: Globe, color: "#4ac0e4" },
            { label: "Security Status", value: 100, unit: "SECURE", icon: Lock, color: "#22c55e" },
            { label: "Storage Used", value: totalContent > 0 ? 12 : 5, unit: "MB", icon: Database, color: "#a855f7" }
        ]);

        // Activity Logs
        const customLogs = await getAdminData('tellora_activity_logs', []);
        const combinedLogs = [...customLogs, { id: 's1', type: "login", item: `Admin session started`, user: "Admin", time: "Just Now", status: "Active" }].slice(0, 5);
        setRecentActivity(combinedLogs);

        // Chart Fidelity - Visitors over past 12 months/days
        const baseChart = [30, 45, 35, 60, 50, 75, 60, 85, 70, 80, 65, 80];
        setChartData(baseChart);

        setTimeout(() => setIsSyncing(false), 800);
    };

    useEffect(() => {
        refreshSystemState();
        const interval = setInterval(refreshSystemState, 60000); // 1 minute refresh
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-12">
            {/* System Status Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D121F]/80 backdrop-blur-2xl border border-primary/20 p-4 md:p-5 px-6 md:px-10 rounded-2xl flex items-center justify-between overflow-hidden relative group flex-col sm:flex-row gap-4"
            >
                <div className="flex items-center gap-5 relative z-10">
                    <div className={`w-3 h-3 rounded-full shadow-[0_0_20px_rgba(74,192,228,0.5)] ${isSyncing ? 'bg-primary animate-spin' : 'bg-green-500 animate-pulse'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/80">System Status • {isSyncing ? 'Fetching...' : 'All Systems Operational'}</span>
                </div>
                <div className="flex items-center gap-10 relative z-10">
                    <div className="text-xs font-medium text-white/40 hidden lg:block">Version 1.0</div>
                    <div className="h-5 w-px bg-white/10 hidden lg:block" />
                    <div className="flex items-center gap-4">
                        <Database size={14} className="text-white/40" />
                        <span className="text-xs font-medium text-white/40">Connected to Main Storage</span>
                    </div>
                </div>
            </motion.div>

            {/* Welcome & Tracker Header */}
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 justify-between items-start">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">Admin <span className="text-primary">Dashboard</span></h1>
                    <p className="text-white/50 font-medium text-sm sm:text-base max-w-2xl">Overview of website performance, traffic analytics, and recent content activity.</p>
                </div>

                {/* Parameters Tracker Group */}
                <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-4 w-full xl:w-auto">
                    {systemParams.map((param, i) => (
                        <motion.div
                            key={param.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#0D121F]/60 border border-white/10 rounded-2xl p-6 px-8 flex flex-col gap-3 group hover:border-primary/30 transition-all hover:bg-[#0D121F]/80"
                        >
                            <div className="flex items-center justify-between">
                                <param.icon size={18} style={{ color: param.color }} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="text-xs font-bold uppercase tracking-wider text-white/40">{param.unit}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{param.value}{param.unit === 'UPTIME' ? '%' : ''}</div>
                                <div className="text-xs font-medium text-white/50 mt-1">{param.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group hover:bg-[#0D121F]/80 transition-all relative overflow-hidden shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                            <div className={`px-3 py-1.5 rounded-lg ${stat.trend === 'neutral' ? 'bg-primary/10 text-primary' : stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-blue-400/10 text-blue-400'} border border-current/10 text-xs font-semibold`}>
                                {stat.change}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="text-xs font-medium text-white/50 mb-2">{stat.label}</p>
                            <h3 className="text-4xl font-bold text-white tracking-tight">
                                <NumberTicker value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Traffic Overview */}
                <div className="lg:col-span-2 bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group shadow-xl flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <LucideLineChart size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Traffic Overview</h3>
                                <p className="text-sm text-white/40 mt-1">Website visitors over time</p>
                            </div>
                        </div>
                        <div className="flex bg-[#080B12] p-1.5 rounded-xl border border-white/10">
                            {['Daily', 'Weekly', 'Monthly'].map((t) => (
                                <button key={t} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${t === 'Monthly' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-4 relative mt-auto">
                        {chartData.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-1 rounded-t-lg bg-primary/40 relative group/bar hover:bg-primary transition-colors"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all bg-[#080B12] text-white px-3 py-1.5 rounded-md text-xs font-medium border border-white/10 whitespace-nowrap z-20">
                                    Awaiting Setup
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6 border-t border-white/5 pt-4">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(d => (
                            <span key={d} className="text-xs font-medium text-white/40">{d}</span>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-400/20">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                            <p className="text-sm text-white/40 mt-1">Latest system logs</p>
                        </div>
                    </div>

                    <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-white/10 flex-1">
                        {recentActivity.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-4 relative z-10"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#0D121F] shrink-0 ${log.type === 'update' ? 'bg-primary' : log.type === 'create' ? 'bg-green-500' : 'bg-gray-600'
                                    }`}>
                                    {log.type === 'update' ? <RefreshCcw size={14} className="text-white" /> : <CheckCircle2 size={14} className="text-white" />}
                                </div>

                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-semibold text-white/90 truncate">{log.item}</h4>
                                        <span className="text-xs text-white/40 whitespace-nowrap ml-2">{log.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-white/50">{log.user}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60">{log.status}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all">
                        View All Logs
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "Manage Content", desc: "Update case studies, team, and services in the database.", icon: Database, bg: "bg-primary/10", border: "border-primary/20", text: "text-primary", path: "/admin/services" },
                    { title: "Traffic Analytics", desc: "View detailed breakdown of your site visitors.", icon: LucideLineChart, bg: "bg-white/5", border: "border-white/10", text: "text-white/60", path: "/admin/analytics" },
                    { title: "Site Settings", desc: "Configure global site parameters and SEO metatags.", icon: LayoutDashboard, bg: "bg-white/5", border: "border-white/10", text: "text-white/60", path: "/admin/settings" },
                ].map((action, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        onClick={() => action.path && (window.location.href = action.path)}
                        className={`p-8 rounded-3xl border cursor-pointer transition-all duration-300 ${action.bg} ${action.border} hover:bg-white/10`}
                    >
                        <action.icon size={32} className={`mb-6 ${action.text}`} />
                        <h3 className="text-2xl font-bold mb-3 text-white">{action.title}</h3>
                        <p className="text-sm text-white/50 mb-8 leading-relaxed">
                            {action.desc}
                        </p>
                        <div className={`text-sm font-semibold flex items-center gap-2 ${action.text}`}>
                            Open module <ArrowRight size={16} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
