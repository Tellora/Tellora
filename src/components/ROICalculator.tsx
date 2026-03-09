"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
    Zap,
    TrendingUp,
    Sparkles,
    RefreshCcw,
    ArrowRight,
    Layout,
    Target,
    DollarSign,
    Activity,
    LineChart,
    PieChart as PieChartIcon
} from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

const industries = [
    { label: "SaaS / B2B", multiplier: 2.8, benchmark: 2.1, icon: Layout },
    { label: "E-commerce", multiplier: 3.5, benchmark: 3.2, icon: Target },
    { label: "Local Services", multiplier: 1.8, benchmark: 1.5, icon: Activity },
    { label: "High Ticket", multiplier: 4.2, benchmark: 0.8, icon: DollarSign },
    { label: "Real Estate", multiplier: 3.1, benchmark: 1.9, icon: Layout },
    { label: "Healthcare", multiplier: 2.4, benchmark: 1.7, icon: Activity },
    { label: "Education", multiplier: 2.2, benchmark: 1.6, icon: Target },
    { label: "Fashion & Apparel", multiplier: 3.8, benchmark: 2.9, icon: Target },
    { label: "Fintech", multiplier: 3.3, benchmark: 2.4, icon: DollarSign },
    { label: "Food & Beverage", multiplier: 2.6, benchmark: 2.0, icon: Activity },
    { label: "Travel & Hospitality", multiplier: 3.0, benchmark: 2.2, icon: Layout },
    { label: "Legal & Consulting", multiplier: 2.9, benchmark: 1.8, icon: DollarSign },
];

export default function ROICalculator() {
    const [industryIdx, setIndustryIdx] = useState(0);
    const [traffic, setTraffic] = useState(10000);
    const [conversion, setConversion] = useState(2.0);
    const [customerValue, setCustomerValue] = useState(150);
    const [budget, setBudget] = useState(3000);
    const [isCalculating, setIsCalculating] = useState(false);

    const industry = industries[industryIdx];

    // Calculations
    const currentRevenue = Math.round((traffic * (conversion / 100)) * customerValue);

    // Tellora Optimisation Logic
    const projectedTraffic = traffic * (1 + (industry.multiplier * 0.15));
    const projectedConversion = conversion * (1 + (industry.multiplier * 0.1));
    const finalProjectedRevenue = Math.round((projectedTraffic * (projectedConversion / 100)) * customerValue);

    const revenueLift = finalProjectedRevenue - currentRevenue;
    const growthPercentage = Math.round((revenueLift / currentRevenue) * 100);
    const monthlyRoas = budget > 0 ? (revenueLift / budget).toFixed(1) : "0";

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMarquee = useTransform(scrollYProgress, [0, 1], [400, -400]);

    const springConfig = { damping: 20, stiffness: 100 };
    const animatedRevenue = useSpring(0, springConfig);
    const animatedLift = useSpring(0, springConfig);

    useEffect(() => {
        animatedRevenue.set(finalProjectedRevenue);
        animatedLift.set(revenueLift);
    }, [finalProjectedRevenue, revenueLift, animatedRevenue, animatedLift]);

    const triggerScan = () => {
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 800);
    };

    return (
        <section ref={containerRef} id="roi-calculator" className="py-40 relative z-10 bg-[#080B12] text-white overflow-hidden">
            {/* High-Tech Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute left-1/4 top-0 w-[1px] h-full bg-white/5" />
                <div className="absolute right-1/4 top-0 w-[1px] h-full bg-white/5" />
            </div>

            <div className="absolute top-1/2 left-0 w-full opacity-[0.03] pointer-events-none -translate-y-1/2">
                <motion.div style={{ x: xMarquee }}>
                    <span className="text-[30rem] font-heading font-black uppercase whitespace-nowrap tracking-tighter">
                        REVENUE GROWTH • DATA DRIVEN •
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Interactive Controls */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
                                    <Sparkles size={12} className="text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Revenue Simulator v4.0</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                                    CALCULATE <br />
                                    <span className="text-primary italic relative">
                                        POTENTIAL
                                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                    </span>
                                </h2>
                            </motion.div>

                            <motion.button
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => {
                                    setTraffic(10000);
                                    setConversion(2.0);
                                    setCustomerValue(150);
                                    setBudget(3000);
                                    triggerScan();
                                }}
                                className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 text-white/40 hover:text-white transition-all shadow-xl"
                            >
                                <RefreshCcw size={24} />
                            </motion.button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Industry Grid Selection */}
                            <div className="col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <Target size={12} className="text-primary/60" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Select Your Industry</span>
                                </div>
                                <div className="relative">
                                    <select
                                        value={industryIdx}
                                        onChange={(e) => { setIndustryIdx(Number(e.target.value)); triggerScan(); }}
                                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-white font-black text-lg italic outline-none focus:border-primary transition-all cursor-pointer"
                                    >
                                        {industries.map((ind, idx) => (
                                            <option key={idx} value={idx} className="bg-[#0D121F] text-white font-black">
                                                {ind.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        {(() => { const Icon = industries[industryIdx]?.icon; return Icon ? <Icon size={20} className="text-primary" /> : null; })()}
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Industry multiplier:</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{industries[industryIdx].multiplier}x</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Benchmark ROAS:</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{industries[industryIdx].benchmark}x</span>
                                </div>
                            </div>

                            {/* Inputs Area */}
                            <div className="col-span-2 space-y-10 bg-white/5 border border-white/5 p-12 rounded-[3.5rem] relative overflow-hidden group/container">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover/container:opacity-100 transition-opacity" />

                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                                    {/* Monthly Sessions — number input */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-white/30">
                                            <Activity size={14} className="text-primary/50" />
                                            <label className="text-[10px] font-black uppercase tracking-widest">Monthly Sessions</label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min={100}
                                                value={traffic}
                                                onChange={(e) => { setTraffic(Math.max(100, Number(e.target.value))); triggerScan(); }}
                                                className="w-full bg-[#080B12] border border-white/10 rounded-[1.5rem] px-6 py-5 text-white font-black text-2xl italic outline-none focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder="10,000"
                                            />
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-widest">visits/mo</span>
                                        </div>
                                        <p className="text-[9px] text-white/20 font-black uppercase tracking-widest ml-1">e.g. 5000, 50000, 200000</p>
                                    </div>

                                    {/* Conv. Rate — keep as slider */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-white/30">
                                                <Target size={14} className="text-primary/50" />
                                                <label className="text-[10px] font-black uppercase tracking-widest">Current Conv. Rate</label>
                                            </div>
                                            <span className="text-2xl font-black italic text-white">{conversion.toFixed(1)}%</span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="range"
                                                min={0.1}
                                                max={15}
                                                step={0.1}
                                                value={conversion}
                                                onChange={(e) => { setConversion(Number(e.target.value)); triggerScan(); }}
                                                className="w-full h-2 appearance-none bg-white/10 rounded-full cursor-pointer accent-primary [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.5)] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary"
                                            />
                                            <div className="flex justify-between mt-2">
                                                <span className="text-[9px] text-white/20 font-black">0.1%</span>
                                                <span className="text-[9px] text-white/20 font-black">15%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer LTV — number input */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-white/30">
                                            <DollarSign size={14} className="text-primary/50" />
                                            <label className="text-[10px] font-black uppercase tracking-widest">Customer LTV ($)</label>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 font-black text-xl">$</span>
                                            <input
                                                type="number"
                                                min={1}
                                                value={customerValue}
                                                onChange={(e) => { setCustomerValue(Math.max(1, Number(e.target.value))); triggerScan(); }}
                                                className="w-full bg-[#080B12] border border-white/10 rounded-[1.5rem] pl-10 pr-6 py-5 text-white font-black text-2xl italic outline-none focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder="150"
                                            />
                                        </div>
                                        <p className="text-[9px] text-white/20 font-black uppercase tracking-widest ml-1">Avg. revenue per customer over lifetime</p>
                                    </div>

                                    {/* Ad Spend Budget — number input */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-white/30">
                                            <PieChartIcon size={14} className="text-primary/50" />
                                            <label className="text-[10px] font-black uppercase tracking-widest">Ad Spend Budget</label>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 font-black text-xl">$</span>
                                            <input
                                                type="number"
                                                min={0}
                                                value={budget}
                                                onChange={(e) => { setBudget(Math.max(0, Number(e.target.value))); triggerScan(); }}
                                                className="w-full bg-[#080B12] border border-white/10 rounded-[1.5rem] pl-10 pr-6 py-5 text-white font-black text-2xl italic outline-none focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder="3000"
                                            />
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-widest">/mo</span>
                                        </div>
                                        <p className="text-[9px] text-white/20 font-black uppercase tracking-widest ml-1">Monthly paid advertising budget</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Advanced Result Display */}
                    <div className="lg:col-span-12 xl:col-span-5 h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="sticky top-12 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group perspective-1000"
                        >
                            {/* Scanning Animation */}
                            <AnimatePresence>
                                {isCalculating && (
                                    <motion.div
                                        initial={{ top: "-10%" }}
                                        animate={{ top: "110%" }}
                                        exit={{ opacity: 0 }}
                                        className="absolute left-0 w-full h-8 bg-primary/20 blur-xl z-20 pointer-events-none"
                                        transition={{ duration: 0.8, ease: "linear" }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <LineChart size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tight">Growth Forecast</h3>
                                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Tellora Optimised Path</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-green-400">98.2% Accuracy</span>
                                    </div>
                                </div>

                                {/* Main Number */}
                                <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem] text-center relative overflow-hidden mb-12 group/number">
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover/number:opacity-30 group-hover/number:rotate-12 transition-all">
                                        <Zap size={100} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Projected Annual Velocity</p>
                                    <div className="text-6xl md:text-8xl font-black italic tracking-tighter text-white">
                                        ${finalProjectedRevenue.toLocaleString()}
                                    </div>
                                    <div className="mt-8 flex items-center justify-center gap-4">
                                        <div className="px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/30">
                                            +{growthPercentage}% Efficiency Lift
                                        </div>
                                    </div>
                                </div>

                                {/* Benchmarks / Micro Stats */}
                                <div className="grid grid-cols-2 gap-6 mb-12">
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] group/box">
                                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2 flex items-center gap-2">
                                            <Activity size={10} className="text-primary" /> Monthly ROAS
                                        </p>
                                        <div className="text-3xl font-black italic group-hover:text-primary transition-colors">{monthlyRoas}x</div>
                                    </div>
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] group/box">
                                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2 flex items-center gap-2">
                                            <TrendingUp size={10} className="text-primary" /> Net Revenue Lift
                                        </p>
                                        <div className="text-3xl font-black italic group-hover:text-primary transition-colors">
                                            +${(revenueLift).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <Magnetic>
                                    <a href="/contact" className="mt-auto w-full py-7 bg-primary group-hover:bg-primary-dark text-white rounded-[2rem] text-center font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 shadow-2xl shadow-primary/20 transition-all hover:gap-6">
                                        Scale My Ecosystem <ArrowRight size={20} />
                                    </a>
                                </Magnetic>

                                <div className="mt-8 text-center">
                                    <p className="text-[9px] font-medium text-white/20 uppercase tracking-[0.2em]">Based on Tellora's 2024 proprietary growth algorithms</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
