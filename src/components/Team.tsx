"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, ExternalLink, Sparkles, Users, Instagram, Zap, Briefcase, FileCode2, Target } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Abhay Sehdev",
        role: "Co-Founder · Tech",
        image: "/teams/abhay tellora.png",
        color: "#A855F7", /* Purple */
        rotate: "-2deg",
        linkedin: "https://www.linkedin.com/in/abhaysehdev",
        instagram: "https://www.instagram.com/abhays3hdev/",
        bio: "Mastermind behind Tellora's technical architecture. Specializes in building high-performance, scalable web systems and AI-driven growth engines that outperform competitors globally.",
        skills: ["System Architecture", "Next.js & React", "AI Automation"],
        stats: [
            { label: "Focus", value: "Scale" },
            { label: "Execution", value: "Fast" }
        ]
    },
    {
        name: "Prakhar Saxena",
        role: "Co-Founder · Content",
        image: "/teams/prakhar tellora.png",
        color: "#22C55E", /* Green */
        rotate: "1.5deg",
        linkedin: "https://www.linkedin.com/in/prakhar-saxena-a13876274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagram: "https://www.instagram.com/_prakkhar_?igsh=MTEyYTRmZ3dyd3VnMg%3D%3D&utm_source=qr",
        bio: "Strategic visionary for brand narratives. Directs high-converting, viral content that scales engagement exponentially and deeply connects with target consumer psychology.",
        skills: ["Content Strategy", "Viral Media", "Brand Identity"],
        stats: [
            { label: "Impact", value: "Viral" },
            { label: "Creative", value: "High" }
        ]
    },
    {
        name: "Vansh Sharma",
        role: "Co-Founder · Sales",
        image: "/teams/vansh tellora.png",
        color: "#F3E84A", /* Yellow */
        rotate: "-1.2deg",
        linkedin: "https://www.linkedin.com/in/vansh-sharma-3b6b0a3b5?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
        instagram: "https://www.instagram.com/vanssh._.sharma?igsh=cXFpOTZnbnc2eDNw&utm_source=qr",
        bio: "Drives strategic global partnerships and enterprise scaling. Relentless focus on client ROI, maximizing acquisition pipelines natively through structured, aggressive B2B architecture.",
        skills: ["Enterprise Sales", "Client Strategy", "B2B Growth"],
        stats: [
            { label: "Growth", value: "B2B" },
            { label: "Strategy", value: "Macro" }
        ]
    },
    {
        name: "Nandini",
        role: "Design Lead",
        image: "/teams/nandini tellora.png",
        color: "#FFFFFF", /* White */
        rotate: "2.5deg",
        linkedin: "#",
        instagram: "#",
        bio: "Transforms digital interfaces into unforgettable brand experiences. Blends unapologetic brutalist aesthetics with meticulously engineered user-conversion layout methodologies.",
        skills: ["UI/UX Design", "Motion Graphics", "Visual Identity"],
        stats: [
            { label: "Design", value: "Pure" },
            { label: "Aesthetic", value: "UX" }
        ]
    }
];

export default function Team() {
    return (
        <section id="team" className="py-32 relative z-10 bg-background overflow-hidden border-t-[4px] border-black">
            {/* Background Marquee */}
            <div className="absolute top-20 left-0 w-full opacity-5 pointer-events-none">
                <span className="text-[20rem] font-heading font-black uppercase whitespace-nowrap">
                    THE VISIONARIES • THE VISIONARIES •
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-10">
                    <div>
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-1 mb-6 md:mb-8 shadow-[4px_4px_0px_#A855F7]">
                            <Users size={16} className="text-primary fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Talent</span>
                        </div>
                        <h2 className="heading-massive !text-5xl md:!text-7xl lg:!text-9xl tracking-tight">
                            MEET THE <br /> <span className="text-primary italic">SQUAD</span>
                        </h2>
                    </div>

                    <div className="max-w-xs text-left lg:text-right">
                        <p className="text-xs md:text-sm font-black uppercase leading-tight bg-white p-4 md:p-6 brutalist-border shadow-[4px_4px_0px_#000] lg:-rotate-2">
                            Combining deep technical expertise with relentless creative innovation to architect the future.
                            Click a card for intel.
                        </p>
                    </div>
                </div>

                {/* Grid Layout spacing adjusted to account for taller interactive cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-8 md:pt-12">
                    {team.map((member, idx) => (
                        <TeamCard key={idx} member={member} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TeamCard({ member, idx }: { member: any; idx: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: member.rotate }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -10, rotate: "0deg", zIndex: 30 }}
            className="group relative flex flex-col items-center cursor-pointer h-[550px] md:h-[500px]"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: "1500px" }}
        >
            <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 260, damping: 25 }}
            >
                {/* ─── FRONT OF CARD ─── */}
                <div 
                    className="absolute inset-0 w-full h-full brutalist-card overflow-hidden flex flex-col shadow-[8px_8px_0px_#000]" 
                    style={{ background: member.color, backfaceVisibility: "hidden" }}
                >
                    <div className="relative h-[70%] w-full flex items-end justify-center overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 w-full h-full bg-black/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full translate-y-1/2" />
                        
                        <motion.div
                            className="relative z-10 w-full h-full flex items-end justify-center"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={500}
                                height={500}
                                className="w-auto h-full object-contain group-hover:drop-shadow-[15px_15px_0px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-none"
                            />
                        </motion.div>

                        <div className="absolute top-6 left-6 -rotate-6 hidden group-hover:block transition-all">
                            <div className="px-3 py-1.5 bg-black text-white brutalist-border text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[2px_2px_0px_#FFF]">
                                <Target size={10} className="text-primary" /> Click For Intel
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-center flex-1 bg-white border-t-[3px] border-black">
                        <h3 className="text-2xl lg:text-3xl font-heading font-black uppercase tracking-tighter leading-none mb-2">
                            {member.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="h-[2px] w-6 bg-black" />
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest opacity-60">
                                {member.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── BACK OF CARD ─── */}
                <div 
                    className="absolute inset-0 w-full h-full brutalist-card !bg-black border-[4px] !border-white flex flex-col shadow-[-8px_8px_0px_#FFF]" 
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="p-6 md:p-8 flex-1 flex flex-col border-b-[3px] border-white/20">
                        {/* Header */}
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

                        {/* Biography */}
                        <p className="text-white/80 text-xs md:text-sm font-medium leading-relaxed mb-6">
                            "{member.bio}"
                        </p>

                        {/* Skills */}
                        <div className="mt-auto">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-3 border-b border-white/20 pb-2">Core Competencies</p>
                            <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill: string, idx: number) => (
                                    <span key={idx} className="px-3 py-1.5 bg-white/10 text-white text-[9px] font-black uppercase tracking-widest brutalist-border">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats & Socials Footer */}
                    <div className="p-6 h-[30%] bg-[#111] flex flex-col justify-between">
                        <div className="flex justify-between divide-x-2 divide-white/10">
                            {member.stats.map((stat: any, idx: number) => (
                                <div key={idx} className="flex-1 text-center">
                                    <p className="text-xl md:text-2xl font-heading font-black text-white">{stat.value}</p>
                                    <p className="text-[7px] font-black uppercase tracking-widest text-white/50">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4 mt-4 relative z-50">
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white text-black brutalist-border flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95 shadow-[2px_2px_0px_#A855F7]">
                                <Linkedin size={16} />
                            </a>
                            <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white text-black brutalist-border flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95 shadow-[2px_2px_0px_#22C55E]">
                                <Instagram size={16} />
                            </a>
                            <a href="#" onClick={e => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white text-black brutalist-border flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95 shadow-[2px_2px_0px_#F3E84A]">
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
