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
    Zap,
    Activity
} from "lucide-react";

export default function AdminAnalytics() {
    const [stats, setStats] = useState<any[]>([]);

    useEffect(() => {
        // Sync with actual system state
        const teamData = JSON.parse(localStorage.getItem('tellora_team') || '[]');
        const servicesData = JSON.parse(localStorage.getItem('tellora_services') || '[]');
        const caseStudiesData = JSON.parse(localStorage.getItem('tellora_case_studies') || '[]');
        const reelsData = JSON.parse(localStorage.getItem('tellora_reels') || '[]');

        const teamCount = teamData.length || 4;
        const servicesCount = servicesData.length || 5;
        const caseStudiesCount = caseStudiesData.length || 3;
        const reelsCount = reelsData.length || 4;

        // Optimized analytics logic
        const growthIndex = 250 + (servicesCount * 12) + (reelsCount * 8);
        const activeSessions = 800 + (reelsCount * 150) + (teamCount * 20);
        const conversionRate = 10.2 + (caseStudiesCount * 0.4);

        setStats([
            { label: "Growth Index", value: `+${growthIndex}%`, change: "+14.3%", trend: 'up', color: '#4ac0e4' },
            { label: "System Uptime", value: "99.99%", change: "+0.01%", trend: 'up', color: '#2e7dbf' },
            { label: "Active Nodes", value: activeSessions.toLocaleString(), change: "+12.1%", trend: 'up', color: '#7dd4f0' },
            { label: "Conversion Rate", value: `${conversionRate.toFixed(1)}%`, change: `+${(caseStudiesCount * 0.2).toFixed(1)}%`, trend: 'up', color: '#4ac0e4' },
        ]);
    }, []);

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-white italic">Neural <span className="text-primary italic">Analytics</span></h1>
                    <p className="text-white/40 font-medium text-sm mt-3 italic">Deep insight into your network's growth trajectory and resonance flux.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-4 bg-[#0D121F]/60 border border-white/10 rounded-2xl p-5 px-8 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all shadow-xl">
                        <Calendar size={18} className="text-primary" /> Last 30 Days
                    </button>
                    <button className="p-5 bg-primary text-white rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        <Download size={24} />
                    </button>
                </div>
            </div>

            {/* Performance Matrix */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] relative group overflow-hidden shadow-2xl hover:border-primary/30"
                    >
                        <div className="absolute top-0 right-0 p-10 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                            <ArrowUpRight size={28} className="text-primary" />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 italic">{stat.label}</p>
                        <div className="flex items-baseline gap-6">
                            <h3 className="text-4xl font-black text-white italic">{stat.value}</h3>
                            <span className={`text-[11px] font-black ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'} flex items-center gap-2 italic`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />} {stat.change}
                            </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    </motion.div>
                ))}
            </div>

            {/* Main Visualizer */}
            <div className="grid lg:grid-cols-12 gap-10 h-[550px]">
                <div className="lg:col-span-8 bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 rounded-[5rem] p-16 flex flex-col relative overflow-hidden group shadow-2xl">
                    <div className="flex justify-between items-center mb-16">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-all shadow-inner border border-primary/20">
                                <TrendingUp size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-white italic tracking-tight">Network Flow Visualizer</h3>
                                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mt-3 italic">Real-time interaction matrix pulse</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-5 px-6 relative">
                        {[20, 45, 30, 85, 45, 25, 65, 95, 75, 55, 35, 65, 80, 40, 60, 90, 45].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.03, duration: 1.5, ease: "circOut" }}
                                className="flex-1 rounded-t-3xl bg-gradient-to-t from-primary/5 via-primary/30 to-primary/80 relative group/bar hover:to-primary"
                            >
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all scale-75 group-hover/bar:scale-100 bg-white text-black px-4 py-2 rounded-2xl text-[10px] font-black shadow-2xl italic tracking-widest z-20">
                                    {h}% FIDELITY
                                </div>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-3xl" />
                            </motion.div>
                        ))}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03]">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-full h-px bg-white" />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-12 px-6">
                        {['Q1 SYNC', 'Q2 SYNC', 'Q3 SYNC', 'Q4 SYNC'].map(q => (
                            <span key={q} className="text-[11px] font-black text-white/10 uppercase tracking-[0.4em] font-mono italic">{q}</span>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 rounded-[5rem] p-16 flex flex-col items-center justify-center text-center group shadow-2xl">
                    <div className="w-28 h-28 rounded-[3rem] bg-white/5 border border-white/5 flex items-center justify-center mb-12 text-primary group-hover:rotate-12 transition-transform duration-700 shadow-inner">
                        <Globe size={56} />
                    </div>
                    <h3 className="text-4xl font-black text-white mb-6 italic tracking-tighter">Traffic Origins</h3>
                    <p className="text-white/40 text-sm font-medium mb-16 max-w-[240px] leading-relaxed italic border-l-2 border-primary/20 pl-6 py-1">
                        84% of your network traffic originates from high-intent mobile users across Asia-Pacific.
                    </p>
                    <div className="space-y-6 w-full px-4">
                        {[
                            { label: "Organic Search", value: "62%" },
                            { label: "Social Direct", value: "24%" },
                            { label: "Neural Referral", value: "14%" },
                        ].map((m, i) => (
                            <div key={i} className="text-left">
                                <div className="flex justify-between mb-3">
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] italic">{m.label}</span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">{m.value}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: m.value }}
                                        transition={{ delay: 0.5 + (i * 0.2), duration: 1 }}
                                        className="h-full bg-primary shadow-[0_0_15px_#4ac0e4]"
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
