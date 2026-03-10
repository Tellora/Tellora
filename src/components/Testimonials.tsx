"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star, Sparkles, Zap } from "lucide-react";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "CMO, TechNova",
            content: "Tellora completely transformed our online presence. Our inbound leads increased by 150% in just 3 months. Their data-driven approach is absolute magic.",
            initials: "SJ",
            color: "#A855F7",
            rotate: "-2deg"
        },
        {
            name: "David Chen",
            role: "Founder, Apex",
            content: "The ROI we've seen since partnering with Tellora is staggering. Their team doesn't just run ads; they engineer growth engines. 10/10 recommended.",
            initials: "DC",
            color: "#F3E84A",
            rotate: "1.5deg"
        },
        {
            name: "Emily Rod",
            role: "Director, Bloom",
            content: "Not only is their creative work stunning, but the backend analytics integration gave us visibility we never had before. A truly visionary agency.",
            initials: "ER",
            color: "#22C55E",
            rotate: "-1deg"
        }
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const xMarquee = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section ref={containerRef} id="testimonials" className="py-32 relative z-10 bg-background border-y-[4px] border-black overflow-hidden">
            {/* Background Marquee */}
            <div className="absolute top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 rotate-6">
                <motion.div
                    style={{ x: xMarquee }}
                >
                    <span className="text-[25rem] font-heading font-black uppercase whitespace-nowrap">
                        VOUCHERS • VOUCHERS • VOUCHERS •
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div style={{ y: yTitle }} className="text-center max-w-4xl mx-auto mb-24">
                    <div className="inline-flex items-center gap-4 mb-8 px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-1 shadow-[4px_4px_0px_#A855F7]">
                        <Star size={14} className="text-primary fill-current" />
                        <span className="font-black uppercase tracking-widest text-[10px]">Social Proof Mastery</span>
                    </div>
                    <h2 className="heading-massive !text-7xl md:!text-9xl tracking-tighter">
                        THE <br /> <span className="text-accent italic">VOUCH</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-16">
                    {testimonials.map((test, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9, rotate: test.rotate }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, type: "spring" }}
                            whileHover={{ y: -20, rotate: 0, scale: 1.05 }}
                            className="group relative"
                        >
                            {/* Physical 'Ticket' or 'Sticker' background */}
                            <div className="absolute inset-x-4 -top-6 h-12 bg-black border-4 border-black brutalist-shadow select-none pointer-events-none group-hover:-translate-y-4 transition-transform z-0" />

                            <div className="w-full p-12 brutalist-card h-full flex flex-col bg-white group-hover:shadow-[20px_20px_0px_#A855F7] transition-all relative z-10">
                                <div className="absolute -top-10 -left-6 bg-primary p-4 brutalist-border shadow-[6px_6px_0px_#000] rotate-[-15deg] group-hover:rotate-0 transition-transform">
                                    <Quote className="text-white" size={32} />
                                </div>

                                <div className="mb-8 flex gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill="currentColor" className="text-primary sticker-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                    ))}
                                </div>

                                <p className="text-lg font-black uppercase leading-tight mb-12 italic opacity-80">
                                    &ldquo;{test.content}&rdquo;
                                </p>

                                <div className="mt-auto flex items-center gap-6">
                                    <div
                                        className="w-16 h-16 brutalist-border flex items-center justify-center text-white font-black text-xl rotate-3 group-hover:rotate-0 transition-transform"
                                        style={{ background: test.color }}
                                    >
                                        {test.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-black text-2xl uppercase tracking-tighter leading-none mb-1">
                                            {test.name}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <Zap size={10} className="text-primary" />
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                                                {test.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="text-primary fill-current" />
                                </div>
                            </div>

                            {/* Offset Shadow */}
                            <div className="absolute -bottom-3 -right-3 w-full h-full bg-black -z-10 rounded-2xl group-hover:translate-x-2 group-hover:translate-y-2 transition-transform opacity-30 group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
