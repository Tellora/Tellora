"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOCheckerTool from "@/components/SEOCheckerTool";
import { motion } from "framer-motion";
import { BarChart3, Globe, Zap, ShieldCheck, Sparkles, Rocket } from "lucide-react";

export default function SEOCheckerPage() {
    return (
        <div className="relative bg-background text-black selection:bg-primary selection:text-white">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:40px_40px]" />
            <div className="fixed inset-0 z-0 noise-overlay opacity-[0.05] pointer-events-none" />

            <Header />

            <main className="relative pt-32">
                {/* Custom Page Header with Neobrutalist flair */}
                <section className="pt-20 pb-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-4 px-8 py-3 bg-black text-white brutalist-border rounded-full rotate-2 mb-12 shadow-[8px_8px_0px_#A855F7]"
                        >
                            <Sparkles size={16} className="text-primary fill-current" />
                            <span className="font-black uppercase tracking-widest text-[12px]">Advanced Performance Intelligence</span>
                        </motion.div>

                        <h1 className="text-[12vw] md:text-[8rem] lg:text-[12rem] font-heading font-black tracking-tighter leading-[0.8] mb-12 uppercase">
                            SEO <span className="text-secondary italic">AUDIT</span> <br /> 
                            CORE <span className="underline decoration-primary decoration-[15px] underline-offset-[10px]">ANALYSIS</span>
                        </h1>

                        <p className="max-w-4xl mx-auto text-xl md:text-3xl font-black uppercase tracking-tight leading-none opacity-60 mb-20 text-center">
                            Don't guess your growth. Our advanced algorithms scan 250+ technical parameters to deliver precise, high-impact strategies for absolute search dominance.
                        </p>

                        {/* Top Features Cards before Tool */}
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
                            {[
                                { icon: Globe, title: "Crawler Mapping", desc: "Simulate How Search Engine Spiders See Your Domain Structure.", color: "bg-primary" },
                                { icon: Zap, title: "Velocity Check", desc: "Advanced LCP/FCP Breakdown For Elite Performance Scores.", color: "bg-accent" },
                                { icon: ShieldCheck, title: "Security Intel", desc: "Deep Scan For SSL Certs, Robots.txt, And Redirect Chains.", color: "bg-secondary" }
                            ].map((feature, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="brutalist-card p-10 bg-white hover:translate-y-[-8px] transition-transform text-center flex flex-col items-center"
                                >
                                    <div className={`${feature.color} p-6 brutalist-border shadow-[6px_6px_0px_#000] mb-8 -rotate-3 group-hover:rotate-0 transition-transform`}>
                                        <feature.icon className="w-10 h-10 text-black" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-black uppercase mb-4 tracking-tighter">{feature.title}</h3>
                                    <p className="text-[14px] font-black uppercase opacity-60 leading-tight">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* The Main Tool Section */}
                <section className="py-24 bg-surface/50 border-y-[4px] border-black">
                    <div className="container mx-auto px-6">
                        <SEOCheckerTool />
                    </div>
                </section>

                {/* Why Use Our Tool Section */}
                <section className="py-32 relative overflow-hidden bg-black text-white">
                    <div className="absolute inset-0 halftone-overlay opacity-10 pointer-events-none" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="relative">
                                <div className="brutalist-card p-12 bg-white text-black shadow-[15px_15px_0px_#A855F7] rotate-[-2deg] relative z-10">
                                    <h3 className="text-4xl font-heading font-black uppercase mb-12 tracking-tighter leading-none">The Tellora <span className="text-accent underline">Difference</span></h3>
                                    <ul className="space-y-8">
                                        {[
                                            "Zero-Lag Real-Time Analysis",
                                            "Human-Readable Action Steps",
                                            "Conversion-Centric UX Metrics",
                                            "Advanced Mobile Core Vitals Scan",
                                            "Competitive Intelligence Benchmarking"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-6 group">
                                                <div className="w-8 h-8 bg-primary brutalist-border flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform">
                                                    <span className="font-black text-black">✓</span>
                                                </div>
                                                <span className="text-xl font-black uppercase tracking-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary brutalist-border rounded-full shadow-[8px_8px_0px_white] flex items-center justify-center rotate-12 z-0 animate-bounce">
                                    <Rocket size={60} className="text-white fill-current" />
                                </div>
                            </div>
                            
                            <div className="text-center lg:text-left space-y-12">
                                <h2 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-[0.85]">Dominance Is <br /> <span className="text-primary italic">Engineered.</span></h2>
                                <p className="text-xl font-black uppercase tracking-widest opacity-60 leading-tight">
                                    Generic tools give you generic data. Tellora gives you growth intel. Our report isn't just a list of metrics—it's a roadmap to complete market capture.
                                </p>
                                <button className="inline-flex items-center gap-6 bg-primary text-white px-16 py-8 brutalist-border shadow-[12px_12px_0px_white] hover:translate-y-[-8px] transition-all hover:shadow-[20px_20px_0px_white] group">
                                    <span className="text-2xl font-black uppercase text-black">Request Strategy Audit</span>
                                    <ArrowRight size={32} className="group-hover:translate-x-4 transition-transform text-black" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function ArrowRight({ size, className }: { size: number, className: string }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="square" 
            strokeLinejoin="miter" 
            className={className}
        >
            <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
    );
}
