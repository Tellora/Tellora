"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import Team from "@/components/Team";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Rocket, Target, Users } from "lucide-react";

export default function TeamsClient() {
    return (
        <div className="bg-white text-black min-h-screen relative overflow-x-hidden">
            <Header />

            <main>
                <PageHeader
                    breadcrumb="Our Squad"
                    title="THE CORE"
                    subtitle="Meet the elite collective of designers, developers, and growth architects engineering the future of digital growth."
                />

                {/* Squad Intro Stats */}
                <section className="py-20 bg-black text-white relative overflow-hidden">
                    <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="p-10 brutalist-border border-white/20 bg-white/5 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500">
                                <Users size={40} className="text-primary group-hover:text-black mb-6" />
                                <h3 className="text-4xl font-heading font-black mb-2">GLOBAL</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:text-black/80">Talent Network</p>
                            </div>
                            <div className="p-10 brutalist-border border-white/20 bg-white/5 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500">
                                <Zap size={40} className="text-secondary group-hover:text-black mb-6" />
                                <h3 className="text-4xl font-heading font-black mb-2">ELITE</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:text-black/80">Execution Speed</p>
                            </div>
                            <div className="p-10 brutalist-border border-white/20 bg-white/5 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500">
                                <Target size={40} className="text-accent group-hover:text-black mb-6" />
                                <h3 className="text-4xl font-heading font-black mb-2">PRECISION</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:text-black/80">UX Strategy</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="py-20">
                    <Team />
                </div>

                {/* Culture CTA */}
                <section className="py-32 bg-slate-50 border-t-[4px] border-black overflow-hidden relative">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block p-4 bg-white brutalist-border shadow-[4px_4px_0_#A855F7] rotate-3 mb-12"
                            >
                                <span className="text-sm font-black uppercase tracking-widest">JOIN THE SQUAD // NOW HIRING</span>
                            </motion.div>
                            <h2 className="text-5xl md:text-8xl font-heading font-black mb-12 tracking-tighter leading-none">
                                THINK YOU HAVE <br /> <span className="text-primary italic">WHAT IT TAKES?</span>
                            </h2>
                            <p className="text-lg md:text-xl font-bold mb-16 opacity-70 uppercase tracking-tight">
                                We are always looking for outlier talent in design, development, and growth architecture.
                            </p>
                            <a 
                                href="/careers"
                                className="inline-flex items-center gap-6 bg-black text-white px-16 py-8 brutalist-border shadow-[12px_12px_0_#4AC0E4] hover:shadow-none hover:translate-x-3 hover:translate-y-3 transition-all text-xl font-black uppercase tracking-widest"
                            >
                                DEPLOY RESUME <Rocket size={24} className="text-primary" />
                            </a>
                        </div>
                    </div>
                    {/* Background floating decals */}
                    <div className="absolute top-20 left-10 opacity-5 -rotate-12 hidden lg:block">
                        <Target size={300} />
                    </div>
                    <div className="absolute bottom-20 right-10 opacity-5 rotate-12 hidden lg:block">
                        <Sparkles size={300} />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
