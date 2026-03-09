"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/animations/TiltCard";

const contactInfo = [
    {
        icon: <Mail className="w-6 h-6 text-primary" />,
        label: "Email Us",
        value: "contact@tellora.media",
        subtitle: "Expect a reply within 2 hours"
    },
    {
        icon: <Phone className="w-6 h-6 text-primary" />,
        label: "Call Us",
        value: "+91 981153 9510",
        subtitle: "Mon - Fri, 9am - 6pm EST"
    },
    {
        icon: <MapPin className="w-6 h-6 text-primary" />,
        label: "Visit Us",
        value: "Digital Nomad Hub",
        subtitle: "Remote Worldwide / New York"
    }
];

export default function ContactPage() {
    return (
        <div className="bg-white text-text-main min-h-screen relative overflow-x-hidden font-sans">
            <Header />

            <main>
                <PageHeader
                    breadcrumb="Connect With Us"
                    title="Let's Scale Together"
                    subtitle="Have a vision? We have the blueprints. Send us a message and let's start architecting your digital growth."
                />

                <section className="py-24 relative z-10 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-3 gap-20">
                            {/* Contact Sidebar */}
                            <div className="lg:col-span-1 space-y-10">
                                <h2 className="text-3xl font-heading font-black text-text-main mb-10 uppercase tracking-widest">Connect</h2>
                                {contactInfo.map((info, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex gap-8 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-primary transition-all duration-500 group shadow-lg shadow-slate-200/50"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm">
                                            <div className="group-hover:text-white transition-colors duration-500">
                                                {info.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{info.label}</p>
                                            <p className="text-xl font-black text-text-main mb-1 font-heading">{info.value}</p>
                                            <p className="text-xs text-text-muted font-medium">{info.subtitle}</p>
                                        </div>
                                    </motion.div>
                                ))}

                                <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 mt-16 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10 group-hover:bg-primary/20 transition-all duration-500"></div>
                                    <h3 className="text-xl font-black text-text-main mb-4 flex items-center gap-3 font-heading uppercase tracking-widest">
                                        <Globe className="w-5 h-5 text-primary" /> Global Reach
                                    </h3>
                                    <p className="text-text-muted text-sm leading-relaxed font-medium">
                                        Operating remotely across 4 time zones to ensure continuous delivery for our international partners.
                                    </p>
                                </div>
                            </div>

                            {/* Main Form */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-10 md:p-16 rounded-[4rem] bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden"
                                >
                                    {/* Decorative background blur */}
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

                                    <div className="mb-12">
                                        <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Request a Quote</span>
                                        <h2 className="text-4xl md:text-5xl font-heading font-black text-text-main mb-6 leading-tight">Project Roadmap</h2>
                                        <p className="text-text-muted text-lg font-medium leading-relaxed">Fill out the form below and one of our growth strategists will prepare a custom proposal for you within 24 hours.</p>
                                    </div>

                                    <ContactForm />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-slate-50 border-y border-slate-100">
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-slate-100 shadow-sm mb-12">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Available for New Projects</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-heading font-black text-text-main mb-16 leading-tight">Prefer a <br /> direct chat?</h2>
                        <div className="flex flex-wrap justify-center gap-8">
                            <a href="mailto:contact@tellora.media" className="group px-12 py-6 bg-white border border-slate-100 rounded-2xl hover:border-primary transition-all duration-500 shadow-xl shadow-slate-200/50 hover:shadow-primary/10 flex items-center gap-4 hover:-translate-y-2">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <MessageSquare size={18} />
                                </div>
                                <span className="font-black text-lg uppercase tracking-widest text-text-main">Book a Discovery Call</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
