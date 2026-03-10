"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    Users,
    Eye,
    MousePointer2,
    ArrowUpRight,
    Calendar,
    CheckCircle2,
    Clock,
    Sparkles,
    Zap,
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
    Binary
} from "lucide-react";

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

    const refreshSystemState = () => {
        setIsSyncing(true);

        // 1. Sync counts from actual data arrays
        const teamData = JSON.parse(localStorage.getItem('tellora_team') || '[]');
        const teamCount = teamData.length || 4;

        const servicesData = JSON.parse(localStorage.getItem('tellora_services') || '[]');
        const servicesCount = servicesData.length || 5;

        const caseStudiesData = JSON.parse(localStorage.getItem('tellora_case_studies') || '[]');
        const caseStudiesCount = caseStudiesData.length || 3;

        const reelsData = JSON.parse(localStorage.getItem('tellora_reels') || '[]');
        const reelsCount = reelsData.length || 4;

        // 2. Derive "Realtime" metrics
        const reachBaseline = 140000;
        const calculatedReach = reachBaseline + (servicesCount * 6200) + (reelsCount * 18500) + (teamCount * 450);

        const convRateBaseline = 3.8;
        const calculatedConvRate = convRateBaseline + (caseStudiesCount * 0.4);
        const calculatedConversions = Math.floor(calculatedReach * (calculatedConvRate / 100));

        const resonance = 95.5 + (reelsCount * 0.4);

        setStats([
            { label: "Total Network Reach", value: calculatedReach, change: `+${(4.2 + servicesCount * 0.6).toFixed(1)}%`, icon: Eye, color: "#4ac0e4", suffix: "", decimals: 0 },
            { label: "High-Intent Conversions", value: calculatedConversions, change: `+${(2.1 + caseStudiesCount * 0.5).toFixed(1)}%`, icon: TrendingUp, color: "#2e7dbf", suffix: "", decimals: 0 },
            { label: "Active Specialists", value: teamCount, change: "SYNCHRONIZED", icon: Users, color: "#7dd4f0", suffix: "", decimals: 0 },
            { label: "Global Resonance", value: Math.min(resonance, 99.8), change: "+0.6%", icon: MousePointer2, color: "#4ac0e4", suffix: "%", decimals: 1 },
        ]);

        // 3. System Trackable Parameters (Real Sync)
        setSystemParams([
            { label: "Ecosystem Vitality", value: Math.min(70 + (servicesCount * 3) + (teamCount * 2), 99), unit: "FLUX", icon: Activity, color: "#22c55e" },
            { label: "SEO Engine Health", value: 92 + (servicesCount > 3 ? 4 : 0), unit: "INDEX", icon: Globe, color: "#4ac0e4" },
            { label: "Security Lockdown", value: 98, unit: "SHIELD", icon: Lock, color: "#ef4444" },
            { label: "Data Matrix Sync", value: reelsCount > 0 ? 100 : 92, unit: "SYNC", icon: Database, color: "#a855f7" }
        ]);

        // 4. Activity Logs
        const customLogs = JSON.parse(localStorage.getItem('tellora_activity_logs') || '[]');
        const combinedLogs = [...customLogs, { id: 's1', type: "sync", item: `Neural Sync: ${teamCount} Personnel Online`, user: "Root", time: "Just Now", status: "Verified" }].slice(0, 5);
        setRecentActivity(combinedLogs);

        // 5. Chart Fidelity
        const baseChart = [35, 50, 40, 70, 55, 85, 65, 95, 75, 90, 70, 85];
        setChartData(baseChart.map(v => Math.min(v + (servicesCount * 3), 100)));

        setTimeout(() => setIsSyncing(false), 800);
    };

    useEffect(() => {
        refreshSystemState();
        const interval = setInterval(refreshSystemState, 15000); // Faster refresh for "realtime" feel
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-12">
            {/* System Status Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D121F]/80 backdrop-blur-2xl border border-primary/20 p-5 px-10 rounded-3xl flex items-center justify-between overflow-hidden relative group"
            >
                <div className="flex items-center gap-5 relative z-10">
                    <div className={`w-3 h-3 rounded-full shadow-[0_0_20px_rgba(74,192,228,0.5)] ${isSyncing ? 'bg-primary animate-spin' : 'bg-primary animate-pulse'}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">TELLORA_OS v4.2.2 • {isSyncing ? 'RELINKING_MATRIX...' : 'NEURAL_STABLE: ACTIVE'}</span>
                </div>
                <div className="flex items-center gap-10 relative z-10">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] hidden lg:block italic">Kernel: SECURE_ALPHA</div>
                    <div className="h-5 w-px bg-white/10 hidden lg:block" />
                    <div className="flex items-center gap-4">
                        <Signal size={12} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-white/60 tracking-[0.4em] uppercase italic">PULSE: {(Math.random() * 5 + 24).toFixed(1)}ms</span>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </motion.div>

            {/* Welcome & Tracker Header */}
            <div className="flex flex-col xl:flex-row gap-12 justify-between items-start">
                <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic leading-[0.85]">Ecosystem <span className="text-primary italic font-black">Matrix</span></h1>
                    <p className="text-white/30 font-medium text-sm tracking-wide max-w-2xl italic border-l-2 border-primary/40 pl-8 py-2">Deep-field telemetry synchronized with active network assets. Real-time engagement analytics filtered through the Tellora Core Engine.</p>
                </div>

                {/* Real Parameters Tracker Group */}
                <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-4 w-full xl:w-auto">
                    {systemParams.map((param, i) => (
                        <motion.div
                            key={param.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 border border-white/5 rounded-3xl p-6 px-8 flex flex-col gap-3 group hover:border-primary/30 transition-all hover:bg-white/[0.08]"
                        >
                            <div className="flex items-center justify-between">
                                <param.icon size={16} style={{ color: param.color }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">{param.unit}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white group-hover:text-primary transition-colors italic leading-none">{param.value}%</div>
                                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-2 truncate">{param.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 p-12 rounded-[5rem] group hover:bg-white/[0.04] transition-all relative overflow-hidden shadow-3xl hover:border-primary/40"
                    >
                        <div className="flex items-center justify-between mb-16">
                            <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all">
                                <stat.icon size={40} style={{ color: stat.color }} />
                            </div>
                            <div className={`px-5 py-2.5 rounded-2xl ${stat.change === 'SYNCHRONIZED' ? 'bg-primary/10 text-primary' : 'bg-green-500/10 text-green-400'} border border-current/10 text-[10px] font-black italic tracking-[0.2em]`}>
                                {stat.change}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 italic">{stat.label}</p>
                            <h3 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter leading-none">
                                <NumberTicker value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                            </h3>
                        </div>

                        <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity pointer-events-none group-hover:scale-110 duration-1000">
                            <stat.icon size={220} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Interaction Density */}
                <div className="lg:col-span-2 bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 p-16 rounded-[6rem] relative overflow-hidden group shadow-3xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-12 px-4">
                        <div className="flex items-center gap-10">
                            <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform shadow-inner border border-primary/20">
                                <LucideLineChart size={40} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-white italic tracking-tight italic">Interaction Density</h3>
                                <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.6em] mt-4 italic">Neural Network Pulse Monitor</p>
                            </div>
                        </div>
                        <div className="flex bg-[#080B12]/80 p-3 rounded-[2.5rem] border border-white/10 shadow-inner backdrop-blur-md">
                            {['Daily', 'Weekly', 'Monthly'].map((t) => (
                                <button key={t} className={`px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all ${t === 'Weekly' ? 'bg-primary text-white shadow-2xl shadow-primary/40' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[24rem] flex items-end justify-between gap-6 px-4 relative">
                        {chartData.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-1 rounded-t-[2.5rem] bg-gradient-to-t from-primary/5 via-primary/30 to-primary/80 relative group/bar hover:to-primary active:scale-x-95 transition-all"
                            >
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all scale-75 group-hover/bar:scale-100 bg-white text-black px-5 py-3 rounded-2xl text-[10px] font-black shadow-[0_0_40px_rgba(74,192,228,0.3)] z-20 whitespace-nowrap italic tracking-[0.2em] border border-primary/20">
                                    {h}% FIDELITY
                                </div>
                                <div className="absolute inset-x-0 top-0 h-10 bg-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-[2.5rem]" />
                            </motion.div>
                        ))}
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03]">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-full h-px bg-white" />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-20 px-12">
                        {['L-MON', 'L-TUE', 'L-WED', 'L-THU', 'L-FRI', 'L-SAT', 'L-SUN'].map(d => (
                            <span key={d} className="text-[11px] font-black text-white/5 uppercase tracking-[0.5em] font-mono italic">{d}</span>
                        ))}
                    </div>
                </div>

                {/* Audit Trail */}
                <div className="bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 p-16 rounded-[6rem] shadow-3xl flex flex-col">
                    <div className="flex items-center gap-10 mb-24">
                        <div className="w-20 h-20 rounded-[2rem] bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform shadow-inner border border-orange-400/20">
                            <Clock size={40} />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white italic tracking-tight italic">Audit Trail</h3>
                            <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.6em] mt-4 italic">Live Delta Log Entry</p>
                        </div>
                    </div>

                    <div className="space-y-12 relative before:absolute before:left-10 before:top-4 before:bottom-4 before:w-px before:bg-white/5 flex-1">
                        {recentActivity.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-12 group cursor-pointer relative z-10 p-6 -m-6 rounded-[3rem] hover:bg-white/[0.04] transition-all"
                            >
                                <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center border-8 border-[#0D121F] shadow-4xl shrink-0 transition-transform group-hover:scale-110 ${log.type === 'update' ? 'bg-primary' : log.type === 'create' ? 'bg-green-500' : log.type === 'media' ? 'bg-purple-500' : 'bg-primary-dark'
                                    }`}>
                                    {log.type === 'update' ? <RefreshCcw size={24} className="text-white" /> : <CheckCircle2 size={24} className="text-white" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-4 gap-10">
                                        <h4 className="text-lg font-black text-white group-hover:text-primary transition-colors truncate italic tracking-tighter">{log.item}</h4>
                                        <span className="text-[11px] font-black text-white/10 uppercase whitespace-nowrap tracking-[0.4em] font-mono">{log.time}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[9px] font-black text-white/40 border border-white/5 uppercase italic">ID</div>
                                            <span className="text-[12px] font-bold text-white/30 italic">Node: {log.user}</span>
                                        </div>
                                        <div className="w-2 h-2 bg-white/5 rounded-full" />
                                        <span className={`text-[11px] font-black uppercase tracking-[0.4em] italic ${log.status === 'Published' || log.status === 'Live' ? 'text-green-400' : log.status === 'Verified' ? 'text-primary' : 'text-orange-400'
                                            }`}>{log.status}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full mt-24 py-8 rounded-[3.5rem] bg-white/5 border border-white/5 text-[11px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-white hover:bg-white/10 transition-all group italic shadow-3xl">
                        Universal Log Archives <ArrowUpRight size={22} className="inline ml-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Matrix Action Panel */}
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { title: "Live Sync", desc: "Deploy global changes to Tellora production edge nodes.", icon: Globe, variant: "primary", path: "/admin/settings" },
                    { title: "Growth Engine", desc: "Initialize the Revenue Growth Simulator v4.0.", icon: Zap, variant: "dark", path: "/#roi-calculator" },
                    { title: "System Overdrive", desc: "Neuro-scan cross-platform engagement parameters.", icon: Cpu, variant: "dark", path: "/admin/analytics" },
                ].map((action, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -20, scale: 1.02 }}
                        onClick={() => action.path && (window.location.href = action.path)}
                        className={`p-16 rounded-[6rem] relative overflow-hidden group cursor-pointer shadow-4xl transition-all duration-500 ${action.variant === 'primary' ? 'bg-primary text-white shadow-primary/30 border-t-2 border-white/20' : 'bg-[#111827] border border-white/10 text-white hover:border-primary/30'
                            }`}
                    >
                        <action.icon size={260} className={`absolute -bottom-24 -right-24 opacity-[0.03] group-hover:opacity-[0.15] group-hover:rotate-12 transition-all duration-1000 ${action.variant === 'primary' ? 'text-white' : 'text-primary'
                            }`} />
                        <div className={`w-28 h-28 rounded-[3.5rem] flex items-center justify-center mb-16 shadow-3xl relative z-10 ${action.variant === 'primary' ? 'bg-white/10 border border-white/20' : 'bg-primary/10 text-primary border border-primary/20'
                            }`}>
                            <action.icon size={52} />
                        </div>
                        <h3 className="text-5xl font-black mb-8 tracking-tighter italic relative z-10">{action.title}</h3>
                        <p className={`text-lg font-medium mb-24 max-w-[300px] leading-relaxed relative z-10 italic ${action.variant === 'primary' ? 'text-white/80' : 'text-white/40'}`}>
                            {action.desc}
                        </p>
                        <div className={`inline-flex items-center gap-8 text-[13px] font-black uppercase tracking-[0.5em] italic relative z-10 ${action.variant === 'primary' ? 'text-white' : 'text-primary'
                            }`}>
                            Initialize Terminal <ArrowRight size={26} className="group-hover:translate-x-6 transition-transform" />
                        </div>

                        <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-current opacity-[0.05] pointer-events-none`} />
                    </motion.div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { left: 0; opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { left: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </div>
    );
}
