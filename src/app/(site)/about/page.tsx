"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Target, Users, Zap, Shield, Rocket, Heart } from "lucide-react";
import { TiltCard } from "@/components/animations/TiltCard";

const values = [
    {
        icon: <Target className="w-8 h-8 text-primary" />,
        title: "Precision Execution",
        description: "We don't believe in guesswork. Every pixel and every campaign is backed by hard data and rigorous testing."
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Client-Centricity",
        description: "Your success is our only metric. We integrate seamlessly with your internal team to drive results."
    },
    {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: "Rapid Innovation",
        description: "The digital landscape changes daily. We stay ahead of the curve so your brand never falls behind."
    }
];

const stats = [
    { value: "200+", label: "Projects Completed" },
    { value: "98%", label: "Client Retention" },
    { value: "50M+", label: "Ad Spend Managed" },
    { value: "10+", label: "Industry Awards" }
];

export default function AboutPage() {
    return (
        <div className="bg-white text-text-main min-h-screen relative overflow-x-hidden">
            <Header />

            <main>
                <PageHeader
                    breadcrumb="Our Story"
                    title="Architects of Growth"
                    subtitle="We are a collective of designers, developers, and strategists obsessed with redefining what's possible in the digital space."
                />

                {/* Culture Section */}
                <section className="py-24 relative overflow-hidden bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">Beyond The Agency</span>
                                <h2 className="text-4xl md:text-6xl font-heading font-black text-text-main mt-6 mb-8 leading-tight">
                                    A Modern Approach to <span className="text-gradient-primary">Digital Dominance</span>
                                </h2>
                                <p className="text-text-muted text-lg mb-8 leading-relaxed font-medium">
                                    Founded with a clear mission: to bridge the gap between high-end aesthetic design and aggressive performance marketing. We realized that beauty without conversions is a hobby, and conversions without brand equity are short-lived.
                                </p>
                                <p className="text-text-muted text-lg mb-12 leading-relaxed font-medium">
                                    At Tellora Media, we merge these two worlds into a singular, cohesive growth engine for our clients.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:shadow-md group">
                                            <p className="text-4xl font-black text-text-main mb-2 font-heading group-hover:text-primary transition-colors">{stat.value}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative z-10 rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] aspect-[4/5]"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?auto=format&fit=crop&w=1000&q=80"
                                        alt="Our Team"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-12 left-12 right-12 p-10 bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl">
                                        <p className="text-text-main font-black text-lg mb-3 font-heading italic">"We build systems, not just campaigns."</p>
                                        <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase">— The Tellora Philosophy</p>
                                    </div>
                                </motion.div>

                                <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Grid */}
                <section className="py-24 bg-slate-50 relative z-10 border-y border-slate-100 overflow-hidden">
                    <div className="container mx-auto px-4 text-center mb-20">
                        <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Our DNA</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-text-main">Our Core <span className="text-gradient-primary">Principles</span></h2>
                    </div>
                    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">
                        {values.map((value, i) => (
                            <TiltCard key={i} className="h-full">
                                <motion.div
                                    className="p-12 rounded-[3rem] bg-white border border-slate-100 h-full hover:border-primary transition-all flex flex-col items-center text-center shadow-2xl shadow-slate-200/50 group"
                                >
                                    <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500 shadow-sm border border-slate-100 group-hover:border-primary">
                                        <div className="group-hover:text-white transition-colors duration-500">
                                            {value.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-text-main mb-6 font-heading uppercase tracking-widest">{value.title}</h3>
                                    <p className="text-text-muted leading-relaxed font-medium">{value.description}</p>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                </section>

                {/* Team Philosophy Section */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-4xl md:text-7xl font-heading font-black text-text-main mb-16 text-center leading-tight">Driven by <span className="text-gradient-primary">Impact</span></h2>
                            <div className="grid md:grid-cols-3 gap-16">
                                <div className="space-y-6 text-center group">
                                    <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                                        <Rocket className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-text-main font-black uppercase tracking-widest text-lg">Future-Proof</h4>
                                    <p className="text-text-muted text-sm font-medium leading-relaxed">Building with technologies and strategies that endure market shifts.</p>
                                </div>
                                <div className="space-y-6 text-center group">
                                    <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                                        <Shield className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-text-main font-black uppercase tracking-widest text-lg">Data Integrity</h4>
                                    <p className="text-text-muted text-sm font-medium leading-relaxed">Ensuring your insights are accurate, secure, and uniquely yours.</p>
                                </div>
                                <div className="space-y-6 text-center group">
                                    <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                                        <Heart className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-text-main font-black uppercase tracking-widest text-lg">Absolute Passion</h4>
                                    <p className="text-text-muted text-sm font-medium leading-relaxed">We love the process of growth as much as the final results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
