"use client";

import { motion } from "framer-motion";
import { Camera, Film, Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const GALLERY_SHOTS = [
    {
        title: "Cinema Rig 4K Setup",
        category: "Behind The Scenes",
        image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1000&q=80",
        span: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
    },
    {
        title: "Studio Lighting & Color Grading",
        category: "Production",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
        span: "col-span-1 row-span-1",
    },
    {
        title: "Commercial Direction & Framing",
        category: "Directing",
        image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
        span: "col-span-1 row-span-1",
    },
    {
        title: "High-Frequency Shoot Set",
        category: "Studio",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1000&q=80",
        span: "col-span-1 md:col-span-2 row-span-1",
    },
    {
        title: "Post-Production Neural Editing",
        category: "Post-Production",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
        span: "col-span-1 row-span-1",
    },
];

export default function StudioGallery() {
    return (
        <section id="gallery" className="py-20 md:py-36 relative z-10 bg-black text-white overflow-hidden border-t-[4px] border-black">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary text-black brutalist-border rounded-full rotate-1 mb-6 shadow-[4px_4px_0px_#FFF]">
                            <Camera size={16} />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Visual Archives</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tight uppercase leading-none">
                            BEHIND THE <br /> <span className="text-primary italic">SHOOTS</span>
                        </h2>
                    </div>
                    <p className="text-sm md:text-xl font-bold uppercase tracking-tight text-white/50 max-w-md leading-tight">
                        On-set energy, technical camera setups, and behind-the-scenes precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px] md:auto-rows-[280px]">
                    {GALLERY_SHOTS.map((shot, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`group relative brutalist-card overflow-hidden cursor-pointer border-[3px] border-white/20 hover:border-primary transition-all duration-500 shadow-2xl ${shot.span}`}
                        >
                            <img
                                src={shot.image}
                                alt={shot.title}
                                className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-end">
                                <span className="text-[9px] font-black uppercase tracking-widest bg-primary text-black px-3 py-1 rounded-full w-fit mb-2 brutalist-border">
                                    {shot.category}
                                </span>
                                <h3 className="text-xl md:text-2xl font-heading font-black uppercase leading-tight tracking-tight">
                                    {shot.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
