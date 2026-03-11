"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Rocket,
    Users,
    Zap,
    ArrowRight,
    ArrowUpRight,
    MapPin,
    Clock,
    Globe,
    Star,
    X,
    Upload,
    CheckCircle2,
    Shield,
    Terminal,
    Cpu,
    Activity,
    RotateCw,
    Plus
} from "lucide-react";
import { getAdminData, saveAdminData } from "@/lib/serverDb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Magnetic from "@/components/animations/Magnetic";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { TiltCard } from "@/components/animations/TiltCard";
import { AdvancedCard } from "@/components/animations/AdvancedCard";
import { FloatingElement } from "@/components/animations/ScrollChoreography";
import { ParallaxLine } from "@/components/animations/ParallaxLine";

const Pillars = [
    {
        title: "Radical Innovation",
        desc: "We don't follow trends; we engineer the futures that others only dream of. Our lab is where physics meets fantasy.",
        color: "#4ac0e4",
        icon: Rocket,
        stat: "100+ PROJECTS"
    },
    {
        title: "Human Synergy",
        desc: "A collective of global elite talent working in perfect, flat-hierarchy resonance. No ego, just execution.",
        color: "#A855F7",
        icon: Users,
        stat: "GLOBAL HUB"
    },
    {
        title: "Data Supremacy",
        desc: "Every creative decision is back-tested against hyper-accurate market datasets. Reality is calculated.",
        color: "#2e7dbf",
        icon: Zap,
        stat: "99.9% ACCURACY"
    }
];

export default function CareersPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [isApplying, setIsApplying] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            const savedJobs = await getAdminData("recruitment_jobs", []);
            if (savedJobs.length > 0) {
                setJobs(savedJobs.filter((j: any) => j.status === "Published"));
            } else {
                const initialJobs = [
                    { id: 1, title: "Creative Director", department: "Design", location: "Remote", type: "Full-time", status: "Published", description: "Lead our creative vision. You'll be responsible for oversight of all visual assets and brand resonance strategies.", requirements: "8+ years experience in digital design, mastery of Figma/Adobe CC.", benefits: "Health, Equity, Remote-first" },
                    { id: 2, title: "Senior Performance Engineer", department: "Engineering", location: "Global (Remote)", type: "Contract", status: "Published", description: "Optimize web performance and lead our technical architecture transitions.", requirements: "Deep knowledge of Next.js, Three.js, and browser rendering engines.", benefits: "Competitive pay, flexible hours" }
                ];
                setJobs(initialJobs);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get('website')) {
            setIsLoading(false);
            return;
        }

        const application = {
            id: Date.now(),
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            candidateName: formData.get('name'),
            candidateEmail: formData.get('email'),
            resumeUrl: "#",
            coverLetter: formData.get('experience'),
            status: "New",
            date: new Date().toISOString().split('T')[0]
        };

        const savedApps = await getAdminData("recruitment_apps", []);
        await saveAdminData("recruitment_apps", [application, ...savedApps]);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsApplying(false);
                setIsSubmitted(false);
                setSelectedJob(null);
            }, 3000);
        }, 1500);
    };

    return (
        <div className="relative bg-[#080B12] selection:bg-primary selection:text-white">
            <Header />

            {/* Kinetic Background Layer */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
                <ParallaxLine velocity={-0.02} direction={"horizontal" as const} color="rgba(74,192,228,0.1)" />
                <ParallaxLine velocity={0.03} direction={"vertical" as const} color="rgba(168,85,247,0.1)" />
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 pt-64 pb-32 text-white">
                {/* Hero section */}
                <section className="container mx-auto px-6 mb-48">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-12 backdrop-blur-xl group cursor-help"
                        >
                            <Terminal size={14} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-primary transition-colors">Career_Initialization_V4.0</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </motion.div>

                        <h1 className="text-[10vw] md:text-[8rem] xl:text-[9rem] font-black tracking-tighter uppercase leading-[0.9] mb-16 relative">
                            <span className="block opacity-40 outline-text mb-4">Architect</span>
                            <span className="block italic group mb-4">
                                <ScrambleText text="THE FUTURE" className="group-hover:text-primary transition-all inline-block" />
                            </span>
                            <span className="block flex items-center gap-8 flex-wrap">
                                <span className="text-primary italic">OF FORCE</span>
                                <div className="hidden md:block h-[4px] flex-1 min-w-[200px] bg-white/5 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="absolute inset-0 bg-primary shadow-[0_0_30px_rgba(74,192,228,0.8)]"
                                    />
                                </div>
                            </span>
                        </h1>

                        <div className="grid md:grid-cols-2 gap-20 items-end">
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl md:text-3xl text-white font-medium leading-[1.1] tracking-tight max-w-xl italic"
                            >
                                Tellora Media is an elite deployment layer for high-impact brands. We're looking for architects of influence to join our global resonance hive.
                            </motion.p>
                            <div className="flex justify-end order-first md:order-last">
                                <FloatingElement speed={0.05} top="0" left="0">
                                    <div className="p-8 bg-black brutalist-border shadow-[12px_12px_0px_#A855F7] -rotate-6 group hover:rotate-0 transition-transform cursor-pointer">
                                        <Cpu size={48} className="text-primary group-hover:scale-125 transition-transform" />
                                    </div>
                                </FloatingElement>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Culture Section */}
                <section className="container mx-auto px-6 mb-60">
                    <div className="flex items-center gap-4 mb-20 overflow-hidden">
                        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-primary whitespace-nowrap italic">Core Resonance Pillars</h2>
                        <div className="h-[1px] w-full bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {Pillars.map((pillar, i) => (
                            <TiltCard key={pillar.title} className="h-full">
                                <div className="bg-white/5 brutalist-border p-12 h-full relative group overflow-hidden hover:bg-white/[0.08] transition-colors border-white/5">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/40 transition-all opacity-0 group-hover:opacity-100" />

                                    <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-[6px_6px_0px_#A855F7] border border-white/10">
                                        <pillar.icon size={36} className="text-primary" />
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{pillar.stat}</span>
                                        <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">{pillar.title}</h3>
                                        <p className="text-white/50 font-medium leading-relaxed md:text-lg">
                                            {pillar.desc}
                                        </p>
                                    </div>

                                    <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary group-hover:translate-x-4 transition-transform">
                                        Core Strategy <ArrowRight size={14} />
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </section>

                {/* Job Board */}
                <section className="container mx-auto px-6 mb-60 relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-5">
                        <span className="text-[30vw] font-black uppercase vertical-text">DEPLOYS</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 relative z-10">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                className="h-[2px] bg-primary mb-12 origin-left"
                            />
                            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-6 italic">Active <span className="text-primary">Missions</span></h2>
                            <p className="text-xl text-white/40 font-medium max-w-lg leading-relaxed">Our grid is expanding. Join the elite operation and scale your potential at 10x velocity.</p>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-4 bg-primary text-white px-8 py-5 brutalist-border shadow-[8px_8px_0px_#000] rotate-2 hover:rotate-0 transition-all cursor-crosshair">
                                <Activity size={20} className="animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest">Global Status: Optimal</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 relative z-10">
                        {jobs.map((job) => (
                            <AdvancedCard key={job.id} className="w-full">
                                <div
                                    className="bg-white/5 brutalist-border p-10 md:p-16 hover:bg-white/[0.08] transition-all cursor-pointer flex flex-col md:flex-row gap-12 items-start md:items-center justify-between group/card border-white/5"
                                    onClick={() => setSelectedJob(job)}
                                >
                                    <div className="flex-1 space-y-8">
                                        <div className="flex flex-wrap items-center gap-6">
                                            <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{job.department}</span>
                                            </div>
                                            <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30 bg-white/5 px-6 py-2 rounded-full border border-white/5 italic">
                                                <MapPin size={12} className="text-primary" /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30 bg-white/5 px-6 py-2 rounded-full border border-white/5 italic">
                                                <Clock size={12} className="text-primary" /> {job.type}
                                            </span>
                                        </div>
                                        <h3 className="text-5xl md:text-7xl font-black tracking-tighter group-hover/card:text-primary transition-colors italic uppercase leading-none">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-white/20 italic">
                                            <span className="w-12 h-[1px] bg-white/10" /> ID Reference_TM-00{job.id}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="hidden xl:flex flex-col items-end gap-2 text-right">
                                            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Mission Status</span>
                                            <span className="text-xs font-black uppercase italic text-primary">Live Connection 🛰️</span>
                                        </div>
                                        <div className="w-20 h-20 bg-white brutalist-border shadow-[8px_8px_0px_#A855F7] group-hover/card:shadow-none group-hover/card:translate-x-2 group-hover/card:translate-y-2 transition-all flex items-center justify-center text-black">
                                            <ArrowUpRight size={40} className="group-hover/card:rotate-45 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </AdvancedCard>
                        ))}
                    </div>
                </section>

                {/* Culture Footer */}
                <section className="container mx-auto px-6 overflow-hidden">
                    <div className="relative p-12 md:p-32 brutalist-border bg-black group overflow-hidden border-white/10">
                        {/* Dynamic background kinetic layer */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-[50%] -right-[50%] w-full h-full border border-primary/20 rounded-full"
                            />
                        </div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-[0.8] italic">
                                    Send us <br />
                                    <span className="text-primary outline-text">The Vector.</span>
                                </h2>
                                <p className="text-xl text-white/60 font-medium leading-relaxed max-w-md">
                                    Elite talent doesn't always wait for an invite. If you operate at a higher frequency, transmit your dossier now.
                                </p>
                                <div className="flex flex-wrap gap-8 pt-8">
                                    <Magnetic>
                                        <button className="px-12 py-8 bg-primary text-white brutalist-border shadow-[10px_10px_0px_#fff] text-[11px] font-black uppercase tracking-[0.4em] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex items-center gap-4 group">
                                            Open Application Node <RotateCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                                        </button>
                                    </Magnetic>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end relative">
                                <FloatingElement speed={0.08} top="0" left="0">
                                    <div className="w-64 h-64 md:w-96 md:h-96 border-[4px] border-primary/20 rounded-full flex items-center justify-center relative backdrop-blur-3xl group-hover:border-primary transition-colors">
                                        <div className="w-full h-full absolute inset-0 rounded-full animate-spin-slow border-t-2 border-primary" style={{ animationDuration: '10s' }} />
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-bounce shadow-[0_0_40px_rgba(255,255,255,0.5)]">
                                            <Star size={24} className="text-black fill-current" />
                                        </div>
                                        <div className="absolute -bottom-6 bg-white text-black px-8 py-3 brutalist-border text-[10px] font-black uppercase tracking-[0.3em] -rotate-3">
                                            Deploy Intel
                                        </div>
                                    </div>
                                </FloatingElement>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />

            {/* Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/98 backdrop-blur-[40px] overflow-y-auto selection:bg-primary">
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full max-w-6xl bg-[#080B12] md:brutalist-border border-white/10 md:rounded-[4rem] p-8 md:p-24 relative min-h-screen md:min-h-0 md:max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => { setSelectedJob(null); setIsApplying(false); }}
                                className="absolute top-12 right-12 p-6 bg-white text-black rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all z-[210] group"
                            >
                                <X size={32} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            {!isApplying ? (
                                <div className="space-y-24">
                                    <div className="grid md:grid-cols-3 gap-16 items-start">
                                        <div className="md:col-span-2 space-y-12">
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Initialization Node_TM: {selectedJob.id}</span>
                                                    <div className="h-[1px] flex-1 bg-white/10" />
                                                </div>
                                                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-12">
                                                    {selectedJob.title}
                                                </h2>
                                                <div className="flex flex-wrap gap-6 md:gap-12">
                                                    <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/5 text-[11px] font-black uppercase tracking-widest text-white/60">
                                                        <MapPin size={18} className="text-primary" /> {selectedJob.location}
                                                    </div>
                                                    <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/5 text-[11px] font-black uppercase tracking-widest text-white/60">
                                                        <Clock size={18} className="text-primary" /> {selectedJob.type}
                                                    </div>
                                                    <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/5 text-[11px] font-black uppercase tracking-widest text-white/60">
                                                        <Briefcase size={18} className="text-primary" /> {selectedJob.department}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-20 pt-12 border-t border-white/10">
                                                <section className="space-y-8">
                                                    <h3 className="text-sm font-black uppercase tracking-[0.6em] text-primary flex items-center gap-4">
                                                        <Terminal size={20} /> The Mission Context
                                                    </h3>
                                                    <p className="text-2xl text-white/70 leading-relaxed font-medium tracking-tight italic">{selectedJob.description}</p>
                                                </section>
                                                <section className="space-y-8">
                                                    <h3 className="text-sm font-black uppercase tracking-[0.6em] text-primary flex items-center gap-4">
                                                        <Cpu size={20} /> Required Skillset Node
                                                    </h3>
                                                    <p className="text-2xl text-white/70 leading-relaxed font-medium tracking-tight italic">{selectedJob.requirements}</p>
                                                </section>
                                                <section className="space-y-8 font-black">
                                                    <h3 className="text-sm font-black uppercase tracking-[0.6em] text-primary flex items-center gap-4">
                                                        <Zap size={20} /> Global Resonance Perk Matrix
                                                    </h3>
                                                    <p className="text-2xl text-white/70 leading-relaxed font-medium tracking-tight italic">{selectedJob.benefits}</p>
                                                </section>
                                            </div>
                                        </div>

                                        <div className="sticky top-0 space-y-12">
                                            <div className="bg-white/5 p-12 brutalist-border border-white/10 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                                                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 text-primary italic">Transmission Integrity</h4>
                                                <p className="text-sm text-white/40 leading-relaxed italic mb-10">
                                                    Tellora Media operates under a global meritocracy protocol. We prioritize raw cognitive power and execution over traditional credentials.
                                                </p>
                                                <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                                                    <Shield size={14} /> Encrypted Transmission Node
                                                </div>
                                            </div>
                                            <Magnetic>
                                                <button
                                                    onClick={() => setIsApplying(true)}
                                                    className="w-full py-10 bg-primary text-white brutalist-border shadow-[15px_15px_0px_#000] text-xs font-black uppercase tracking-[0.5em] hover:shadow-none hover:translate-x-3 hover:translate-y-3 transition-all group relative overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-white/10 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                                        INITIALIZE DEPLOY <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
                                                    </span>
                                                </button>
                                            </Magnetic>

                                            <div className="text-center">
                                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10">MISSION_CONTROL_TM_2026</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-4xl mx-auto py-12">
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-center py-20"
                                        >
                                            <div className="w-40 h-40 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-12 border-2 border-green-500/40 relative">
                                                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
                                                <CheckCircle2 size={64} className="text-green-500" />
                                            </div>
                                            <h2 className="text-7xl font-black uppercase tracking-tighter italic mb-8">Dossier <span className="text-primary italic">Uploaded.</span></h2>
                                            <p className="text-2xl text-white/40 font-medium tracking-tight max-w-xl mx-auto italic">
                                                Your cognitive profile has been successfully ingested by our talent matrix. Our Ops team will resonate soon if a sync is detected.
                                            </p>
                                            <button
                                                onClick={() => { setSelectedJob(null); setIsApplying(false); }}
                                                className="mt-16 text-primary font-black uppercase tracking-[0.5em] text-[10px] hover:text-white transition-colors"
                                            >
                                                ← Terminate Connection
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-6 mb-16">
                                                <button onClick={() => setIsApplying(false)} className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-primary transition-all">
                                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                                                        <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
                                                    </div>
                                                    ABORT PROTOCOL / RETURN TO MISSION
                                                </button>
                                            </div>
                                            <div className="space-y-4 mb-20">
                                                <h2 className="text-8xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">Initialization <span className="text-primary">Phase.</span></h2>
                                                <p className="text-xl text-white/30 font-medium italic">Establishing secure uplink. Please provide your cognitive identifier.</p>
                                            </div>

                                            <form onSubmit={handleApply} className="space-y-12">
                                                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                                                <div className="grid md:grid-cols-2 gap-12">
                                                    <div className="space-y-4">
                                                        <label className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic">Candidate_Identity</label>
                                                        <input required name="name" className="w-full bg-white/5 brutalist-border p-8 text-white outline-none focus:border-primary transition-all font-medium italic text-xl border-white/5" placeholder="FULL_NAME" />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic">Secure_Uplink_Node</label>
                                                        <input required type="email" name="email" className="w-full bg-white/5 brutalist-border p-8 text-white outline-none focus:border-primary transition-all font-medium italic text-xl border-white/5" placeholder="EMAIL_PROTOCOL" />
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic">Cognitive_Summary</label>
                                                    <textarea required name="experience" rows={4} className="w-full bg-white/5 brutalist-border p-8 text-white outline-none focus:border-primary transition-all font-medium italic text-xl resize-none border-white/5" placeholder="Tell us how you break systems and build futures."></textarea>
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic">Dossier_Asset (PDF)</label>
                                                    <div className="relative group">
                                                        <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                        <div className="w-full bg-white/5 brutalist-border p-16 border-dashed border-white/10 flex flex-col items-center justify-center gap-6 group-hover:bg-white/10 group-hover:border-primary/50 transition-all border-white/10">
                                                            <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white/20 group-hover:text-primary transition-colors border border-white/5 shadow-2xl">
                                                                <Upload size={40} className="group-hover:translate-y-[-4px] transition-transform" />
                                                            </div>
                                                            <div className="text-center space-y-2">
                                                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">Connect Secure Dossier</span>
                                                                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">MAX_FILE_SIZE: 12MB / FORMAT: .PDF</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-12 pt-8">
                                                    <div className="flex items-center gap-6 p-8 bg-white/5 brutalist-border border-white/5 max-w-md">
                                                        <Shield size={32} className="text-primary flex-shrink-0" />
                                                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-relaxed italic">
                                                            SECURITY PROTOCOL: Your transmission is encrypted via AES-256 standards. Our data handling is strictly limited to Talent Ops nodes.
                                                        </p>
                                                    </div>
                                                    <button
                                                        disabled={isLoading}
                                                        type="submit"
                                                        className={`w-full py-10 bg-primary text-white brutalist-border shadow-[12px_12px_0px_#000] text-xs font-black uppercase tracking-[0.6em] hover:shadow-none hover:translate-x-3 hover:translate-y-3 transition-all flex items-center justify-center gap-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {isLoading ? (
                                                            <>INGESTING_DATA... <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></>
                                                        ) : (
                                                            <>FINALIZE TRANSMISSION <ArrowRight size={24} /></>
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
