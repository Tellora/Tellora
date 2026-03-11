"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, Send } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/animations/TiltCard";

const contactInfo = [
    {
        icon: <Mail className="w-6 h-6 text-primary" />,
        label: "Direct Email",
        value: "contact@tellora.media",
        subtitle: "Architecture & Strategy",
        link: "mailto:contact@tellora.media"
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-primary" />,
        label: "WhatsApp Support",
        value: "+91 98115 39510",
        subtitle: "Instant Consulting",
        link: "https://wa.me/919811539510"
    },
    {
        icon: <Globe className="w-6 h-6 text-primary" />,
        label: "Global HQ",
        value: "Remote Worldwide",
        subtitle: "New York • London • Dubai",
        link: "#"
    }
];

const processSteps = [
    {
        title: "Initial Audit",
        desc: "We analyze your current digital presence and identify immediate growth leaks.",
        icon: "01"
    },
    {
        title: "Strategy Blueprint",
        desc: "Our architects design a custom growth roadmap tailored to your KPIs.",
        icon: "02"
    },
    {
        title: "Precision Execution",
        desc: "We implement high-impact changes with weekly performance iterations.",
        icon: "03"
    },
    {
        title: "Scale & Dominate",
        desc: "Aggressive scaling of winning channels to maximize your ROI.",
        icon: "04"
    }
];

export default function ContactPage() {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getTimeInTimezone = (offset: number) => {
        const date = new Date(currentTime.getTime() + (offset * 3600000));
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="bg-white text-text-main min-h-screen relative overflow-x-hidden font-sans">
            <Header />

            <main>
                <PageHeader
                    breadcrumb="Architecture Phase"
                    title="Design Your Growth"
                    subtitle="Ready to scale? We're currently taking on 2 new high-growth partners this month. Connect with our architects below."
                />

                <section className="py-24 relative z-10 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-12 gap-16">
                            {/* Contact Sidebar */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="mb-12">
                                    <h2 className="text-3xl font-heading font-black text-text-main mb-4 uppercase tracking-[0.2em]">Contact Hub</h2>
                                    <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                                </div>
                                
                                {contactInfo.map((info, idx) => (
                                    <motion.a
                                        href={info.link}
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex gap-6 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-white transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-primary/5"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm relative overflow-hidden">
                                            <div className="group-hover:text-white transition-colors duration-500 relative z-10">
                                                {info.icon}
                                            </div>
                                            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 font-heading uppercase tracking-[0.2em] mb-1.5">{info.label}</p>
                                            <p className="text-lg font-black text-text-main mb-0.5 font-heading group-hover:text-primary transition-colors">{info.value}</p>
                                            <p className="text-xs text-text-muted font-bold opacity-70 italic tracking-wide">{info.subtitle}</p>
                                        </div>
                                    </motion.a>
                                ))}

                                <div className="p-8 rounded-[2.5rem] bg-text-main text-white mt-12 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -z-0"></div>
                                    <h3 className="text-lg font-black mb-6 flex items-center gap-3 font-heading uppercase tracking-widest relative z-10">
                                        <Clock className="w-5 h-5 text-primary" /> Active Hours
                                    </h3>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Global Ops</span>
                                            <span className="font-bold text-sm tracking-widest">24 / 7 Active</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">New York (EST)</span>
                                            <span className="font-bold text-sm tracking-widest">{getTimeInTimezone(-5)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">London (GMT)</span>
                                            <span className="font-bold text-sm tracking-widest">{getTimeInTimezone(0)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/10 text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                        Systems Online
                                    </div>
                                </div>
                            </div>

                            {/* Main Form */}
                            <div className="lg:col-span-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-10 md:p-16 rounded-[4rem] bg-white border border-slate-100 shadow-[0_48px_96px_-32px_rgba(0,0,0,0.12)] relative overflow-hidden group"
                                >
                                    {/* Decorative background blurs */}
                                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
                                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-700"></div>

                                    <div className="mb-14 relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="h-[2px] w-12 bg-primary"></span>
                                            <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">Strategic Intake</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-heading font-black text-text-main mb-6 leading-[1.1]">Project Roadmap</h2>
                                        <p className="text-text-muted text-xl font-bold leading-relaxed max-w-2xl opacity-80">
                                            Submit your project intelligence. Our architects will decrypt your data and return a custom growth blueprint within <span className="text-primary underline decoration-2 underline-offset-4 font-black">24 hours</span>.
                                        </p>
                                    </div>

                                    <ContactForm />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-40 opacity-[0.03] select-none pointer-events-none transform rotate-12">
                        <h2 className="text-[20vw] font-black leading-none uppercase">TELLORA</h2>
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-24">
                            <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">The Partnership Flow</span>
                            <h2 className="text-5xl md:text-7xl font-heading font-black text-text-main mb-8 leading-tight">Growth Architecture</h2>
                            <p className="text-text-muted text-xl font-bold max-w-3xl mx-auto opacity-70 leading-relaxed">
                                Our battle-tested process for turning vision into market dominance.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {processSteps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative group hover:-translate-y-4 transition-all duration-500"
                                >
                                    <div className="text-8xl font-black text-slate-100 absolute bottom-4 right-8 group-hover:text-primary/5 transition-colors duration-500 select-none">{step.icon}</div>
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-black text-lg mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-2xl font-black text-text-main mb-4 font-heading uppercase tracking-widest relative z-10">{step.title}</h3>
                                    <p className="text-text-muted text-sm font-bold opacity-75 leading-relaxed relative z-10">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-white">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-text-main mb-6 uppercase tracking-widest">Growth FAQ</h2>
                            <p className="text-text-muted font-bold opacity-70">Everything you need to know before we build.</p>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { q: "How fast will I see results?", a: "Quick wins (UI/UX & technical SEO fixes) are visible in days. Significant organic scale usually takes 3-6 months depending on niche competition." },
                                { q: "Do you offer custom pricing?", a: "Yes. Every project is unique. We build flexible pricing models based on your specific growth goals and required resources." },
                                { q: "Will I have a dedicated manager?", a: "Absolutely. You'll be paired with a strategic architect who will be your direct point of contact for all phases." },
                                { q: "What industries do you work with?", a: "We specialize in high-growth startups, e-commerce empires, and service leaders looking to dominate their local or global markets." }
                            ].map((item, idx) => (
                                <details key={idx} className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all duration-300">
                                    <summary className="list-none flex justify-between items-center cursor-pointer">
                                        <h4 className="text-lg font-black font-heading text-text-main uppercase tracking-widest flex items-center gap-4">
                                            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] text-primary border border-slate-100 shadow-sm">{idx + 1}</span>
                                            {item.q}
                                        </h4>
                                        <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center group-open:rotate-180 transition-transform duration-500 shadow-sm">
                                            <Send size={14} className="rotate-90 text-primary" />
                                        </div>
                                    </summary>
                                    <div className="mt-6 pt-6 border-t border-slate-200 text-text-muted font-bold leading-relaxed max-w-2xl px-12">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-text-main relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 mb-12 backdrop-blur-xl">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"></span>
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">Direct Protocol Engaged</span>
                        </div>
                        <h2 className="text-5xl md:text-[8rem] font-heading font-black text-white mb-16 leading-[0.9] tracking-tighter">Ready to <br /><span className="text-primary italic">Ignite?</span></h2>
                        <div className="flex flex-wrap justify-center gap-8">
                            <a href="https://wa.me/919811539510" target="_blank" className="group px-12 py-8 bg-white rounded-[2rem] hover:bg-primary transition-all duration-500 shadow-2xl shadow-primary/20 flex items-center gap-6 hover:-translate-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary transition-all duration-500 shadow-sm">
                                    <MessageSquare size={24} />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-white/60 transition-colors">Emergency?</span>
                                    <span className="font-black text-xl uppercase tracking-widest text-text-main group-hover:text-white transition-colors">WhatsApp Us</span>
                                </div>
                            </a>

                            <a href="mailto:contact@tellora.media" className="group px-12 py-8 bg-white/5 border border-white/10 rounded-[2rem] hover:border-primary/50 transition-all duration-500 backdrop-blur-xl flex items-center gap-6 hover:-translate-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-primary transition-all duration-500">
                                    <Mail size={24} />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Corporate</span>
                                    <span className="font-black text-xl uppercase tracking-widest text-white">Discovery Call</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
