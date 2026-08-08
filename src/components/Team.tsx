"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Zap, Target, Award, Sparkles, ShieldCheck, Compass } from "lucide-react";
import Image from "next/image";
import { getAllTeamMembers } from "@/lib/store";
import { DbTeamMember } from "@/lib/supabase";

export default function Team({ onlyCore = false, title }: { onlyCore?: boolean; title?: React.ReactNode }) {
    const [team, setTeam] = useState<DbTeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { id: "core", name: "Core Team" },
        { id: "development", name: "Development Team" },
        { id: "designing", name: "Designing Team" }
    ];

    useEffect(() => {
        getAllTeamMembers().then(data => {
            setTeam(data);
            setLoading(false);
        });
    }, []);

    if (loading || team.length === 0) return null;

    const coreMembersRaw = team.filter(m => (m.category === "core") || (!m.category && ["abhay sehdev", "prakhar saxena"].includes(m.name.toLowerCase())));
    const coreMembers = coreMembersRaw.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

    return (
        <section id="team" className="py-20 md:py-36 relative z-10 bg-background overflow-hidden border-t-[4px] border-black">
            {/* Background Marquee */}
            <div className="absolute top-16 left-0 w-full opacity-5 pointer-events-none select-none">
                <span className="text-[12rem] md:text-[20rem] font-heading font-black uppercase whitespace-nowrap">
                    {onlyCore ? "EXECUTIVE CABIN • FOUNDERS •" : "THE VISIONARIES • THE VISIONARIES •"}
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-10">
                    <div>
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-1 mb-6 shadow-[4px_4px_0px_#A855F7]">
                            {onlyCore ? <ShieldCheck size={16} className="text-primary fill-current" /> : <Sparkles size={16} className="text-primary fill-current" />}
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                                {onlyCore ? "Executive Suite" : "Global Talent"}
                            </span>
                        </div>
                        <h2 className="heading-massive !text-4xl sm:!text-6xl md:!text-8xl tracking-tight leading-none text-black">
                            {title || (
                                <>
                                    MEET THE <br /> <span className="text-primary italic">SQUAD</span>
                                </>
                            )}
                        </h2>
                    </div>
                    <div className="max-w-xs text-left lg:text-right">
                        <p className="text-xs md:text-sm font-black uppercase leading-tight bg-white p-5 brutalist-border shadow-[4px_4px_0px_#000] lg:-rotate-2 text-black">
                            {onlyCore 
                                ? "The strategic architects steering Tellora Media's viral production and high-frequency growth systems." 
                                : "Combining deep technical expertise with relentless creative innovation to architect the future."
                            }
                        </p>
                    </div>
                </div>

                {/* ─── FOUNDERS' CABIN CONCEPTUAL LAYOUT (When onlyCore = true) ─── */}
                {onlyCore ? (
                    <div className="space-y-16">
                        {/* Executive Directive Banner */}
                        <div className="bg-black text-white p-8 md:p-12 brutalist-border shadow-[12px_12px_0px_#A855F7] flex flex-col md:flex-row items-center justify-between gap-8 -rotate-1">
                            <div className="max-w-2xl">
                                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-primary mb-2 block">
                                    CABIN DIRECTIVE // 2026
                                </span>
                                <h3 className="text-2xl md:text-4xl font-heading font-black uppercase leading-tight tracking-tight">
                                    &ldquo;We don&apos;t do standard marketing. We architect high-frequency revenue engines.&rdquo;
                                </h3>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl brutalist-border backdrop-blur-md">
                                <Award className="text-accent w-8 h-8" />
                                <div>
                                    <p className="text-xl font-heading font-black">100M+ VIEWS</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Architected for Clients</p>
                                </div>
                            </div>
                        </div>

                        {/* Founder Cards */}
                        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                            {coreMembers.map((member, idx) => (
                                <FounderCard key={member.id || idx} member={member} idx={idx} />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Standard Team View */
                    categories.map((cat) => {
                        const membersRaw = team.filter(m => (m.category === cat.id) || (cat.id === "core" && !m.category && ["abhay sehdev", "prakhar saxena"].includes(m.name.toLowerCase())));
                        const members = membersRaw.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
                        if (members.length === 0) return null;
                        
                        return (
                            <div key={cat.id} className="mb-24 last:mb-0">
                                <div className="flex items-center gap-6 mb-12">
                                    <h3 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter bg-black text-white px-8 py-3 brutalist-border shadow-[6px_6px_0px_#A855F7] -rotate-1">
                                        {cat.name}
                                    </h3>
                                    <div className="h-[2px] flex-1 bg-black/10" />
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-12">
                                    {members.map((member, idx) => (
                                        <TeamCard key={member.id || idx} member={member} idx={idx} />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}

{/* ─── FOUNDER CARD COMPONENT (Conceptual Executive Design) ─── */}
function FounderCard({ member, idx }: { member: DbTeamMember; idx: number }) {
    const isAbhay = member.name.toLowerCase().includes("abhay");
    const roleTitle = isAbhay ? "Co-Founder & CEO" : "Co-Founder & COO";
    const accentColor = isAbhay ? "#A855F7" : "#22C55E";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="bg-white brutalist-border shadow-[12px_12px_0px_#000] overflow-hidden flex flex-col justify-between group"
        >
            {/* Header / Badge */}
            <div className="p-6 md:p-8 bg-black text-white flex justify-between items-center border-b-[4px] border-black">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: accentColor }} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70">
                        EXECUTIVE PASS #0{idx + 1}
                    </span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-white text-black brutalist-border">
                    {roleTitle}
                </span>
            </div>

            {/* Profile Content */}
            <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-40 h-48 sm:w-48 sm:h-56 brutalist-border overflow-hidden relative flex-shrink-0 bg-zinc-100 shadow-[6px_6px_0px_#000] rotate-2 group-hover:rotate-0 transition-transform">
                    <Image
                        src={encodeURI(member.image_url || "/teams/fallback.png")}
                        alt={member.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "/tellora-logo.png";
                        }}
                    />
                </div>

                <div className="flex-1 space-y-4 text-left">
                    <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tighter text-black leading-none">
                        {member.name}
                    </h3>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">
                        {roleTitle}
                    </p>
                    <p className="text-sm font-medium text-black/80 leading-relaxed italic">
                        &ldquo;{member.bio || "Architecting high-frequency growth ecosystems with precision."}&rdquo;
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {(member.skills && member.skills.length > 0 ? member.skills : ["Growth Strategy", "Architecture", "Scale"]).map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest brutalist-border">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Metrics & Socials Footer */}
            <div className="p-6 bg-zinc-50 border-t-[4px] border-black flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-xl font-heading font-black text-black">{isAbhay ? "10X" : "12X"}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-black/50">ROAS Benchmark</p>
                    </div>
                    <div className="h-8 w-[2px] bg-black/20" />
                    <div>
                        <p className="text-xl font-heading font-black text-black">Global</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-black/50">Client Reach</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href={member.linkedin_url || "https://linkedin.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-black text-white brutalist-border flex items-center justify-center hover:bg-primary hover:text-black transition-all shadow-[3px_3px_0px_#A855F7]"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={16} />
                    </a>
                    <a
                        href={member.instagram_url || "https://instagram.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-black text-white brutalist-border flex items-center justify-center hover:bg-primary hover:text-black transition-all shadow-[3px_3px_0px_#22C55E]"
                        aria-label="Instagram Profile"
                    >
                        <Instagram size={16} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

{/* ─── STANDARD TEAM CARD COMPONENT ─── */}
function TeamCard({ member, idx }: { member: DbTeamMember; idx: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: member.rotate }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -10, rotate: "0deg", zIndex: 30 }}
            className="group relative flex flex-col items-center cursor-pointer h-[350px] md:h-[500px]"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: "1500px" }}
        >
            <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 260, damping: 25 }}
            >
                {/* FRONT OF CARD */}
                <div 
                    className="absolute inset-0 w-full h-full brutalist-card overflow-hidden flex flex-col shadow-[8px_8px_0px_#000]" 
                    style={{ background: member.color || "#A855F7", backfaceVisibility: "hidden" }}
                >
                    <div className="relative h-[70%] w-full flex items-end justify-center overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 w-full h-full bg-black/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full translate-y-1/2" />
                        
                        <motion.div
                            className="relative z-10 w-full h-full flex items-end justify-center"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Image
                                src={encodeURI(member.image_url || "/teams/fallback.png")}
                                alt={member.name}
                                width={500}
                                height={500}
                                className="w-auto h-full object-contain group-hover:drop-shadow-[15px_15px_0px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-none"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/tellora-logo.png";
                                }}
                            />
                        </motion.div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-center flex-1 bg-white border-t-[3px] border-black">
                        <h3 className="text-lg lg:text-3xl font-heading font-black uppercase tracking-tighter leading-none mb-1 text-black">
                            {member.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="h-[2px] w-6 bg-black" />
                            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-widest opacity-60 text-black">
                                {member.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* BACK OF CARD */}
                <div 
                    className="absolute inset-0 w-full h-full brutalist-card !bg-black border-[4px] !border-white flex flex-col shadow-[-8px_8px_0px_#FFF]" 
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="p-6 md:p-8 flex-1 flex flex-col border-b-[3px] border-white/20">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white leading-none">
                                    {member.name}
                                </h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">{member.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-white/10" style={{ borderColor: member.color }}>
                                <Zap size={18} style={{ color: member.color }} />
                            </div>
                        </div>

                        <p className="text-white/80 text-xs md:text-sm font-medium leading-relaxed mb-6">
                            &quot;{member.bio}&quot;
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
