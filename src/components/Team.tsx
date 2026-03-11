"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, ExternalLink, Sparkles, Users, Instagram } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Abhay Sehdev",
        role: "Co-Founder · Tech",
        image: "/teams/abhay tellora.png",
        color: "#A855F7", /* Purple */
        rotate: "-2deg",
        linkedin: "https://www.linkedin.com/in/abhaysehdev",
        instagram: "https://www.instagram.com/abhays3hdev/"
    },
    {
        name: "Prakhar Saxena",
        role: "Co-Founder · Content",
        image: "/teams/prakhar tellora.png",
        color: "#22C55E", /* Green */
        rotate: "1.5deg",
        linkedin: "https://www.linkedin.com/in/prakhar-saxena-a13876274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagram: "https://www.instagram.com/_prakkhar_?igsh=MTEyYTRmZ3dyd3VnMg%3D%3D&utm_source=qr"
    },
    {
        name: "Vansh Sharma",
        role: "Co-Founder · Sales",
        image: "/teams/vansh tellora.png",
        color: "#F3E84A", /* Yellow */
        rotate: "-1.2deg",
        linkedin: "https://www.linkedin.com/in/vansh-sharma-3b6b0a3b5?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
        instagram: "https://www.instagram.com/vanssh._.sharma?igsh=cXFpOTZnbnc2eDNw&utm_source=qr"
    },
    {
        name: "Nandini",
        role: "Design Lead",
        image: "/teams/nandini tellora.png",
        color: "#FFFFFF", /* White */
        rotate: "2.5deg",
        linkedin: "#",
        instagram: "#"
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
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                    <div>
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-1 mb-8">
                            <Users size={16} className="text-primary fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Talent</span>
                        </div>
                        <h2 className="heading-massive !text-7xl md:!text-9xl tracking-tight">
                            MEET THE <br /> <span className="text-primary italic">SQUAD</span>
                        </h2>
                    </div>

                    <div className="max-w-xs text-right hidden lg:block">
                        <p className="text-sm font-black uppercase leading-tight bg-white p-6 brutalist-border brutalist-shadow-sm -rotate-2">
                            Combining deep technical expertise with relentless creative innovation to architect the future.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {team.map((member, idx) => (
                        <TeamCard key={idx} member={member} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TeamCard({ member, idx }: { member: any; idx: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: member.rotate }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -10, rotate: "0deg", zIndex: 20 }}
            className="group relative flex flex-col items-center cursor-pointer h-[500px]"
        >
            {/* Main Card */}
            <div className="w-full h-full brutalist-card relative overflow-hidden flex flex-col" style={{ background: member.color }}>
                {/* Character/Image Container */}
                <div className="relative h-[70%] w-full flex items-end justify-center overflow-hidden">
                    {/* Circle burst in background on hover */}
                    <div className="absolute inset-x-0 bottom-0 w-full h-full bg-black/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full translate-y-1/2" />

                    <motion.div
                        className="relative z-10 w-full h-full flex items-end justify-center"
                        whileHover={{ scale: 1.1, y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Image
                            src={member.image}
                            alt={member.name}
                            width={500}
                            height={500}
                            className="w-auto h-full object-contain group-hover:drop-shadow-[10px_10px_0px_rgba(0,0,0,0.4)] transition-all duration-300"
                        />
                    </motion.div>

                    {/* Social Stickers */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-12 transition-all duration-500">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white brutalist-border flex items-center justify-center hover:bg-black hover:text-white transition-all">
                            <Linkedin size={16} />
                        </a>
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white brutalist-border flex items-center justify-center hover:bg-black hover:text-white transition-all">
                            <Instagram size={16} />
                        </a>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white brutalist-border flex items-center justify-center hover:bg-black hover:text-white transition-all">
                            <ExternalLink size={16} />
                        </a>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-6 left-6 -rotate-6">
                        <div className="px-4 py-2 bg-black text-white brutalist-border text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={12} className="text-primary" /> Specialist
                        </div>
                    </div>
                </div>

                {/* Info Area */}
                <div className="p-8 flex flex-col justify-center flex-1 bg-white border-t-[3px] border-black">
                    <h3 className="text-2xl font-heading font-black uppercase tracking-tighter leading-none mb-2">
                        {member.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="h-[2px] w-6 bg-black" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                            {member.role}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sticker Shadow */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-black -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
        </motion.div>
    );
}
