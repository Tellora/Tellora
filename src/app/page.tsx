"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import WorkShowcase from "@/components/WorkShowcase";
import Testimonials from "@/components/Testimonials";
import ROICalculator from "@/components/ROICalculator";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AnimatedFeatures from "@/components/AnimatedFeatures";
import ReelsSection from "@/components/ReelsSection";
import { ParallaxText, FloatingElement, ScrollLine, ScrollConnector } from "@/components/animations/ScrollChoreography";
import { ScrollWordReveal } from "@/components/animations/ScrollWordReveal";
import Team from "@/components/Team";
import LogoCloud from "@/components/LogoCloud";
import { Zap, Sparkles, Star, Rocket } from "lucide-react";

export default function Home() {
    return (
        <div className="relative bg-background text-black selection:bg-primary selection:text-white">
            {/* Clean Background Grid Pattern - Very subtle */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:40px_40px]" />
            <div className="fixed inset-0 z-0 noise-overlay opacity-[0.05] pointer-events-none" />

            <Header />

            <main className="relative">
                {/* HERO SECTION */}
                <section className="relative overflow-hidden">
                    <Hero />
                    <ScrollLine className="bottom-0" />
                </section>

                <AnimatedFeatures />

                {/* Massive Statement with Dynamic Text - Optimized Decor */}
                <section className="py-24 md:py-64 bg-black text-white relative flex items-center justify-center overflow-hidden">
                    {/* Background noise texture */}
                    <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay pointer-events-none" />

                    {/* Brutalist graphic elements - Hidden on smaller screens for clarity */}
                    <FloatingElement speed={0.1} top="15%" left="10%" rotate={12}>
                        <div className="hidden md:block w-32 h-32 border-8 border-primary rounded-full opacity-80" />
                    </FloatingElement>

                    <FloatingElement speed={-0.15} top="70%" left="5%" rotate={-45}>
                        <div className="hidden md:flex bg-white text-black font-heading font-black text-4xl p-6 brutalist-border shadow-[12px_12px_0px_#A855F7]">
                            100x <br /> ROI
                        </div>
                    </FloatingElement>

                    <FloatingElement speed={0.2} top="60%" left="80%" rotate={-15}>
                        <div className="hidden md:block bg-accent p-6 brutalist-border shadow-[8px_8px_0px_#000] -rotate-12">
                            <Star size={48} className="text-black fill-current" />
                        </div>
                    </FloatingElement>

                    {/* New additions for more visual depth */}
                    <FloatingElement speed={0.15} top="80%" left="15%" rotate={45}>
                        <div className="hidden md:block w-16 h-16 border-[6px] border-primary rounded-full opacity-60 mix-blend-multiply" />
                    </FloatingElement>

                    <FloatingElement speed={-0.2} top="30%" left="85%" rotate={-10}>
                        <div className="hidden md:flex bg-white px-4 py-2 brutalist-border shadow-[4px_4px_0px_#000] rotate-12 items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" />
                            <span className="text-[10px] font-black uppercase text-black">Live Data</span>
                        </div>
                    </FloatingElement>

                    <div className="container mx-auto px-6 relative z-10">
                        <ScrollWordReveal
                            text="WE ARCHITECT HIGH-FREQUENCY REVENUE GROWTH ENGINES FOR THE WORLD'S MOST AMBITIOUS BRANDS."
                            className="max-w-7xl mx-auto text-center font-heading font-black !text-[2.5rem] sm:!text-[3.5rem] md:!text-8xl !tracking-tight !leading-[1] uppercase underline decoration-primary decoration-[4px] md:decoration-[8px] underline-offset-4 md:underline-offset-8"
                        />

                        <div className="flex justify-center mt-16 md:mt-32">
                            <div className="bg-white brutalist-border px-8 py-4 rotate-2 shadow-[4px_4px_0px_#000] hover:rotate-0 transition-transform cursor-pointer group">
                                <span className="text-xs font-black uppercase tracking-widest group-hover:text-primary transition-colors text-black">Learn Our Secret Sauce</span>
                            </div>
                        </div>
                    </div>
                </section>

                <ScrollConnector />

                <Services />

                <ParallaxText text="STRATEGY • PERFORMANCE • GROWTH •" baseVelocity={-30} />

                <Process />

                <ScrollConnector />

                <Team />

                <ParallaxText text="DATA DRIVEN • RESULTS • SCALE •" baseVelocity={30} />

                <WorkShowcase />

                <ScrollConnector />

                <LogoCloud />

                <ReelsSection />

                <Testimonials />

                <ScrollConnector />

                <Pricing />

                <ROICalculator />

                <FAQ />

                <CTA />
            </main>

            <Footer />
        </div>
    );
}
