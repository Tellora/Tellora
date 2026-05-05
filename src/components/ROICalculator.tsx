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
    PieChart as PieChartIcon,
    Cpu,
    MousePointer2,
    Shield
} from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

const industries = [
    { label: "SaaS / B2B", multiplier: 2.8, benchmark: 2.1, icon: Layout },
    { label: "E-commerce", multiplier: 3.5, benchmark: 3.2, icon: Target },
    { label: "Local Services", multiplier: 1.8, benchmark: 1.5, icon: Activity },
    { label: "High Ticket", multiplier: 4.2, benchmark: 0.8, icon: DollarSign },
    { label: "Fintech", multiplier: 3.3, benchmark: 2.4, icon: DollarSign },
];

export default function ROICalculator() {
    const [industryIdx, setIndustryIdx] = useState(0);
    const [traffic, setTraffic] = useState(10000);
    const [conversion, setConversion] = useState(2.0);
    const [aov, setAov] = useState(150);
    const [cpa, setCpa] = useState(45);
    const [ltv, setLtv] = useState(450);
    const [isCalculating, setIsCalculating] = useState(false);

    const industry = industries[industryIdx];

    // Current metrics
    const currentMonthlyConv = Math.round(traffic * (conversion / 100));
    const currentMonthlyRevenue = currentMonthlyConv * aov;
    
    // Tellora Architected Growth Logic
    const projectedConvRate = conversion * (1 + (industry.multiplier * 0.12)); 
    const projectedTraffic = traffic * 1.4; 
    const finalMonthlyConv = Math.round(projectedTraffic * (projectedConvRate / 100));
    const finalMonthlyRevenue = finalMonthlyConv * aov;
    
    const revenueLift = finalMonthlyRevenue - currentMonthlyRevenue;
    const ltvLift = (finalMonthlyConv * ltv) - (currentMonthlyConv * ltv);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMarquee = useTransform(scrollYProgress, [0, 1], [400, -400]);

    const springConfig = { damping: 20, stiffness: 100 };
    const animatedRevenue = useSpring(0, springConfig);

    useEffect(() => {
        animatedRevenue.set(finalMonthlyRevenue);
    }, [finalMonthlyRevenue, animatedRevenue]);

    const triggerScan = () => {
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 800);
    };

    return (
        <section ref={containerRef} id="roi-calculator" className="py-20 md:py-40 relative z-10 bg-[#0A0A0A] text-white overflow-hidden border-t-[4px] border-black">
            {/* Terminal Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="absolute top-1/2 left-0 w-full opacity-[0.02] pointer-events-none -translate-y-1/2">
                <motion.div style={{ x: xMarquee }}>
                    <span className="text-[20rem] md:text-[30rem] font-heading font-black uppercase whitespace-nowrap tracking-tighter">
                        ABSOLUTE ROI • DATA ARCHITECTURE •
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
                        <Cpu size={14} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Analysis v5.0</span>
                    </div>
                    <h2 className="text-4xl sm:text-7xl md:text-[10rem] font-heading font-black uppercase leading-[0.85] tracking-tighter">
                        CALCULATE <br /> <span className="text-primary italic">POTENTIAL</span>
                    </h2>
                </div>
                <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
                    {/* Input Module */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-10">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-2 mb-3 md:mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <MousePointer2 size={12} className="text-primary" />
                                    <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">Traffic</label>
                                </div>
                                <input 
                                    type="number" 
                                    value={traffic}
                                    onChange={(e) => { setTraffic(Number(e.target.value)); triggerScan(); }}
                                    className="w-full bg-transparent text-xl md:text-4xl font-heading font-black outline-none border-b border-white/10 focus:border-primary transition-all pb-1 md:pb-2 selection:bg-primary"
                                />
                            </div>

                            <div className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-2 mb-3 md:mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Target size={12} className="text-primary" />
                                    <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">Conv. %</label>
                                </div>
                                <input 
                                    type="number" 
                                    step="0.1"
                                    value={conversion}
                                    onChange={(e) => { setConversion(Number(e.target.value)); triggerScan(); }}
                                    className="w-full bg-transparent text-xl md:text-4xl font-heading font-black outline-none border-b border-white/10 focus:border-primary transition-all pb-1 md:pb-2 selection:bg-primary"
                                />
                            </div>

                            <div className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-2 mb-3 md:mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <DollarSign size={12} className="text-primary" />
                                    <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">Avg. $</label>
                                </div>
                                <div className="flex items-baseline gap-1 md:gap-2">
                                    <span className="text-lg md:text-2xl font-black opacity-20">$</span>
                                    <input 
                                        type="number" 
                                        value={aov}
                                        onChange={(e) => { setAov(Number(e.target.value)); triggerScan(); }}
                                        className="w-full bg-transparent text-xl md:text-4xl font-heading font-black outline-none border-b border-white/10 focus:border-primary transition-all pb-1 md:pb-2 selection:bg-primary"
                                    />
                                </div>
                            </div>

                            <div className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-2 mb-3 md:mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Activity size={12} className="text-primary" />
                                    <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">LTV $</label>
                                </div>
                                <div className="flex items-baseline gap-1 md:gap-2">
                                    <span className="text-lg md:text-2xl font-black opacity-20">$</span>
                                    <input 
                                        type="number" 
                                        value={ltv}
                                        onChange={(e) => { setLtv(Number(e.target.value)); triggerScan(); }}
                                        className="w-full bg-transparent text-xl md:text-4xl font-heading font-black outline-none border-b border-white/10 focus:border-primary transition-all pb-1 md:pb-2 selection:bg-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-8 bg-primary/5 border border-primary/20 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                            <div className="flex items-center gap-3 md:gap-6">
                                <Shield className="text-primary w-6 h-6 md:w-8 md:h-8" />
                                <div>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary">Industry Focus</p>
                                    <p className="text-sm md:text-xl font-heading font-black uppercase tracking-tight">{industry.label}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {industries.map((ind, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => { setIndustryIdx(i); triggerScan(); }}
                                        className={`px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black uppercase text-[7px] md:text-[9px] tracking-widest transition-all ${industryIdx === i ? 'bg-primary text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                    >
                                        {ind.label.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Result Module */}
                    <div className="lg:col-span-5">
                        <div className="md:sticky md:top-12 p-6 md:p-16 bg-white text-black rounded-[2.5rem] md:rounded-[5rem] brutalist-border shadow-[10px_10px_0px_#A855F7] md:shadow-[16px_16px_0px_#A855F7] flex flex-col relative overflow-hidden">
                            {/* Scan Line Animation */}
                            <AnimatePresence>
                                {isCalculating && (
                                    <motion.div 
                                        initial={{ top: "-5%" }}
                                        animate={{ top: "105%" }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "linear" }}
                                        className="absolute left-0 w-full h-[80px] bg-primary/30 blur-2xl z-20 pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="w-16 h-16 bg-black rounded-[2rem] flex items-center justify-center text-white shadow-lg">
                                        <TrendingUp size={32} />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/30 block mb-1">Growth Index</span>
                                        <div className="px-3 py-1 bg-green-500 text-white rounded-lg text-[10px] font-black uppercase">Optimized</div>
                                    </div>
                                </div>

                                <div className="mb-auto">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-black/30">Net Annual Revenue Lift</p>
                                    <h3 className="text-4xl sm:text-5xl md:text-8xl font-heading font-black italic tracking-tighter mb-8 leading-none">
                                        +${(revenueLift * 12).toLocaleString()}
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[11px] font-black uppercase tracking-widest">Architected Efficiency Reached</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-16 mb-8 md:mb-16">
                                    <div className="p-4 md:p-8 bg-black/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-black/5 group hover:bg-black/10 transition-all">
                                        <p className="text-[7px] md:text-[9px] font-black uppercase text-black/40 tracking-widest mb-1 md:mb-3 flex items-center gap-2">
                                            <Zap size={10} className="text-primary" /> ROAS
                                        </p>
                                        <p className="text-xl md:text-3xl font-black italic">{(finalMonthlyRevenue / (currentMonthlyRevenue || 1) * industry.multiplier).toFixed(1)}x</p>
                                    </div>
                                    <div className="p-4 md:p-8 bg-black/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-black/5 group hover:bg-black/10 transition-all">
                                        <p className="text-[7px] md:text-[9px] font-black uppercase text-black/40 tracking-widest mb-1 md:mb-3 flex items-center gap-2">
                                            <Sparkles size={10} className="text-primary" /> Potential
                                        </p>
                                        <p className="text-xl md:text-3xl font-black italic">High</p>
                                    </div>
                                </div>

                                <Magnetic>
                                    <a href="/contact" className="w-full py-5 md:py-8 bg-black text-white rounded-[1.5rem] md:rounded-[2.5rem] text-center font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm flex items-center justify-center gap-2 md:gap-4 hover:gap-8 transition-all shadow-[8px_8px_0px_#A855F7] md:shadow-[12px_12px_0px_#A855F7] group">
                                        DEPLOY <ArrowRight size={16} className="text-primary group-hover:translate-x-4 transition-transform" />
                                    </a>
                                </Magnetic>

                                <p className="mt-8 text-center text-[8px] font-black uppercase tracking-widest opacity-30">
                                    *Analysis based on high-frequency market growth variables
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
