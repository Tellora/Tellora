"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    TrendingUp,
    Users,
    Globe,
    MousePointer2,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download,
    Eye,
    Clock
} from "lucide-react";
// Import from lib/store if needed in future, but serverDb is deprecated.

export default function AdminAnalytics() {
    const [stats, setStats] = useState<any[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const loadStats = async () => {
            // These will be replaced by Google Analytics Data API queries
            try {
                const res = await fetch("/api/admin/analytics");
                if (res.ok) {
                    const data = await res.json();
                    
                    // Format duration from seconds (e.g., 141) to "2m 21s"
                    const durationStr = () => {
                        const secs = parseInt(data.durationSecs || 0);
                        return `${Math.floor(secs / 60)}m ${secs % 60}s`;
                    };

                    setStats([
                        { label: "Total Pageviews", value: parseInt(data.pageviews).toLocaleString(), change: "Live", trend: 'up', color: '#4ac0e4', icon: Eye },
                        { label: "Unique Visitors", value: parseInt(data.visitors).toLocaleString(), change: "Live", trend: 'up', color: '#2e7dbf', icon: Users },
                        { label: "Avg. Session Duration", value: durationStr(), change: "Live", trend: 'up', color: '#7dd4f0', icon: Clock },
                        { label: "Bounce Rate", value: `${parseFloat(data.bounce).toFixed(1)}%`, change: "Live", trend: 'neutral', color: '#4ac0e4', icon: MousePointer2 },
                    ]);
                    return;
                }
            } catch (e) {
                console.log("Analytics loading in Dev Isolation or Proxy Unreachable:", e);
            }

            // Local development payload fallback
            setStats([
                { label: "Total Pageviews", value: "0", change: "Prod Only", trend: 'neutral', color: '#4ac0e4', icon: Eye },
                { label: "Unique Visitors", value: "0", change: "Prod Only", trend: 'neutral', color: '#2e7dbf', icon: Users },
                { label: "Avg. Session Duration", value: "0m 0s", change: "Prod Only", trend: 'neutral', color: '#7dd4f0', icon: Clock },
                { label: "Bounce Rate", value: "0%", change: "Prod Only", trend: 'neutral', color: '#4ac0e4', icon: MousePointer2 },
            ]);
        };
        loadStats();
        setIsMobile(window.innerWidth < 640);
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="space-y-8 md:space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Website <span className="text-primary">Analytics</span></h1>
                    <p className="text-white/50 font-medium text-sm">Detailed overview of your website's traffic performance and audience engagement.</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 md:gap-3 bg-[#0D121F]/60 border border-white/10 rounded-xl p-3 px-6 text-xs font-semibold text-white/60 hover:text-white transition-all shadow-md">
                        <Calendar size={16} className="text-primary" /> Last 30 Days
                    </button>
                    <button className="p-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0D121F]/60 border border-white/10 p-6 md:p-8 rounded-2xl relative group overflow-hidden shadow-lg hover:bg-[#0D121F]/80 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">{stat.label}</p>
                            <stat.icon size={18} style={{ color: stat.color }} className="opacity-70" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                            <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-400' : stat.trend === 'down' && stat.label === 'Bounce Rate' ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} 
                                {stat.change} vs last month
                            </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>

            {/* Main Visualizer */}
            <div className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[450px]">
                <div className="lg:col-span-8 bg-[#0D121F]/60 border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col relative overflow-hidden shadow-xl min-h-[400px]">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Audience Overview</h3>
                                <p className="text-sm text-white/40 mt-1">Daily visitors across all channels</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 px-2 relative w-full h-full pb-4">
                        {[20, 45, 30, 85, 45, 25, 65, 95, 75, 55, 35, 65, 80, 40, 60, 90, 45].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.03, duration: 1.5, ease: "circOut" }}
                                className={`flex-1 rounded-t-lg bg-primary/30 relative group/bar hover:bg-primary transition-colors ${isMobile && i % 2 !== 0 ? "hidden" : ""}`}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all bg-[#080B12] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-lg z-20 whitespace-nowrap border border-white/10">
                                    Awaiting Setup
                                </div>
                            </motion.div>
                        ))}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-full h-px bg-white" />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-6 px-2 border-t border-white/5 pt-4">
                        {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => (
                            <span key={w} className="text-xs font-medium text-white/40">{w}</span>
                        ))}
                    </div>
                </div>

                {/* Traffic Origins */}
                <div className="lg:col-span-4 bg-[#0D121F]/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary shadow-inner">
                        <Globe size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Traffic Sources</h3>
                    <p className="text-white/50 text-sm mb-10 max-w-[240px]">
                        Distribution of how visitors are discovering your website this month.
                    </p>
                    
                    <div className="space-y-6 w-full px-2">
                        {[
                            { label: "Organic Search", value: "0%" },
                            { label: "Direct Traffic", value: "0%" },
                            { label: "Social Media", value: "0%" },
                            { label: "Referral", value: "0%" },
                        ].map((m, i) => (
                            <div key={i} className="text-left w-full hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-semibold text-white/70">{m.label}</span>
                                    <span className="text-xs font-bold text-primary">{m.value}</span>
                                </div>
                                <div className="h-2 w-full bg-[#080B12] rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: m.value }}
                                        transition={{ delay: 0.5 + (i * 0.2), duration: 1 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
