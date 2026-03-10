"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award, Sparkles, Zap } from "lucide-react";

const clients = [
    { name: "Client 1", logo: "/clients/client logo (10).png" },
    { name: "Client 2", logo: "/clients/clientLogo (2).png" },
    { name: "Client 3", logo: "/clients/clientlogo (3).png" },
    { name: "Client 4", logo: "/clients/clientlogo (4).png" },
    { name: "Client 5", logo: "/clients/clientlogo (5).png" },
    { name: "Client 6", logo: "/clients/clientlogo (6).png" },
    { name: "Client 7", logo: "/clients/clientlogo (7).png" },
    { name: "Client 8", logo: "/clients/clientlogo (8).png" },
    { name: "Client 9", logo: "/clients/clientlogo (9).png" },
    { name: "Client 10", logo: "/clients/clientlogo.png" },
];

export default function LogoCloud() {
    return (
        <section
            id="partners"
            className="relative z-10 py-20 md:py-32 overflow-hidden bg-background border-y-[4px] border-black"
        >
            {/* ── Section heading ── */}
            <div className="container mx-auto px-6 relative z-10 mb-12 md:mb-20 text-center">
                <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 bg-white brutalist-border rounded-full rotate-2 mb-6 md:mb-8 shadow-[4px_4px_0px_#000]">
                    <Award className="text-primary w-4 h-4 md:w-4 md:h-4" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Industry Disruptors</span>
                </div>
                <h2 className="heading-massive !text-4xl sm:!text-6xl md:!text-8xl tracking-tight">
                    TRUSTED BY THE <br className="hidden md:block" /> <span className="text-accent italic">VALIANT</span>
                </h2>
            </div>

            {/* ─── Infinite Marquee Rows ─── */}
            <div className="space-y-6">
                <div className="relative flex overflow-hidden border-y-[4px] border-black bg-white py-8">
                    <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
                    <div className="relative z-10 flex gap-12 whitespace-nowrap animate-marquee">
                        {[...Array(4)].map((_, dupe) => (
                            <div key={dupe} className="flex gap-12 items-center">
                                {clients.map((client, idx) => (
                                    <div
                                        key={`marquee-${idx}`}
                                        className="px-12 py-8 brutalist-border bg-white hover:bg-gray-50 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#A855F7] transition-all group flex items-center justify-center min-w-[280px]"
                                    >
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="h-20 md:h-24 w-auto object-contain transition-all hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Partner CTA card ─── */}
            <div className="container mx-auto px-6 mt-20 md:mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-8 md:p-20 brutalist-card text-white overflow-hidden"
                    style={{ background: "#000" }}
                >
                    <div className="absolute top-4 md:top-8 right-4 md:right-8 rotate-12 bg-primary brutalist-border brutalist-shadow-sm p-3 md:p-4 sticker-animate">
                        <Zap className="w-6 h-6 md:w-8 md:h-8" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
                        <div className="text-center lg:text-left max-w-2xl">
                            <span className="text-primary font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px] mb-4 block">Ready To Scale?</span>
                            <h3 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black uppercase mb-6 md:mb-8 leading-[1] md:leading-[0.9] tracking-tighter">
                                ARCHITECT YOUR <br /> <span className="text-accent underline decoration-white decoration-[4px] md:decoration-8 underline-offset-4 md:underline-offset-8">REVENUE ENGINE</span>
                            </h3>
                            <p className="text-sm md:text-lg font-black uppercase opacity-60 leading-tight">
                                We don't just execute; we disrupt. Ready to join the high-performance family?
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 lg:mt-0">
                            <Link
                                href="/contact"
                                className="btn-brutalist btn-brutalist-accent text-lg px-12"
                            >
                                Collab Now <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="/case-studies"
                                className="btn-brutalist bg-white text-black text-lg px-12"
                            >
                                See Results
                            </Link>
                        </div>
                    </div>

                    {/* Background noise texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none noise-overlay" />
                </motion.div>
            </div>
        </section>
    );
}

import Link from "next/link";
