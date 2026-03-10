"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, MousePointer2 } from "lucide-react";

const stats = [
    { label: "Active Revenue", value: "$452,102", change: "+24%", icon: <DollarSign className="text-green-400" /> },
    { label: "Total Sessions", value: "1.2M", change: "+12%", icon: <Users className="text-blue-400" /> },
    { label: "Conversion Rate", value: "8.4%", change: "+3.2%", icon: <TrendingUp className="text-primary" /> },
    { label: "Cost Per Click", value: "$0.42", change: "-15%", icon: <MousePointer2 className="text-purple-400" /> }
];

export function GrowthDashboard() {
    return (
        <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-10">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/80 animate-pulse"></div>
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-2xl font-black text-text-main mb-2 font-heading uppercase tracking-widest">Growth Intelligence</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Real-time Performance Metrics</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary transition-all duration-300 group/item"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover/item:border-primary transition-colors">
                                {stat.icon}
                            </div>
                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-3xl font-black text-text-main mb-2 font-heading">{stat.value}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "75%" }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary to-primary-dark"
                    />
                </div>
                <div className="flex justify-between mt-5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target ROAS: 10.0x</p>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Current: 8.4x</p>
                </div>
            </div>
        </div>
    );
}
