"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { ParallaxText, FloatingElement, ScrollLine, ScrollConnector, VelocityMarquee, StickerSlap, ChapterRail } from "@/components/animations/ScrollChoreography";
import { ScrollWordReveal } from "@/components/animations/ScrollWordReveal";
import { Star } from "lucide-react";
import Link from "next/link";
import ClientLogoBar from "@/components/ClientLogoBar";
import RegionStrip from "@/components/RegionStrip";
import GeoHintBanner from "@/components/GeoHintBanner";

// Dynamic imports for below-the-fold heavy components to boost performance & Eliminate lag
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Process = dynamic(() => import("@/components/Process"), { ssr: true });
const Team = dynamic(() => import("@/components/Team"), { ssr: true });
const WorkShowcase = dynamic(() => import("@/components/WorkShowcase"), { ssr: true });
const LogoCloud = dynamic(() => import("@/components/LogoCloud"), { ssr: true });
const ReelsSection = dynamic(() => import("@/components/ReelsSection"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });

export default function Home() {
    return (
        <div className="relative bg-background text-black selection:bg-primary selection:text-white">
            {/* Clean Background Grid Pattern - Very subtle */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:40px_40px]" />
            <div className="fixed inset-0 z-0 noise-overlay opacity-[0.05] pointer-events-none" />

            <Header />
            <GeoHintBanner />
            <ChapterRail />

            <main className="relative">
                {/* HERO SECTION */}
                <section data-chapter="Intro" className="relative overflow-hidden">
                    <Hero />
                    <ScrollLine className="bottom-0" />
                </section>

                <ClientLogoBar />

                {/* Massive Statement with Dynamic Text */}
                <section data-chapter="Mission" className="py-14 md:py-32 bg-black text-white relative flex items-center justify-center overflow-hidden">
                    {/* Background noise texture */}
                    <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay pointer-events-none" />

                    {/* Brutalist graphic elements */}
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

                    <FloatingElement speed={0.15} top="80%" left="15%" rotate={45}>
                        <div className="hidden md:block w-16 h-16 border-[6px] border-primary rounded-full opacity-60 mix-blend-multiply" />
                    </FloatingElement>

                    <FloatingElement speed={-0.2} top="30%" left="85%" rotate={-10}>
                        <div className="hidden md:flex bg-white px-4 py-2 brutalist-border shadow-[4px_4px_0px_#000] rotate-12 items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" />
                            <span className="text-[10px] font-black uppercase text-black">Live Data</span>
                        </div>
                    </FloatingElement>

                    {/* Phone-sized stickers, choreographed to scroll */}
                    <div className="md:hidden absolute top-6 right-4 z-0">
                        <StickerSlap from="right" tilt={14}>
                            <div className="bg-accent p-3 brutalist-border shadow-[4px_4px_0px_#F3E84A] rotate-6"><Star size={22} className="text-black fill-current" /></div>
                        </StickerSlap>
                    </div>
                    <div className="md:hidden absolute bottom-5 left-4 z-0">
                        <StickerSlap from="left" tilt={14}>
                            <div className="bg-white text-black font-heading font-black text-sm leading-tight px-3 py-2 brutalist-border shadow-[4px_4px_0px_#A855F7] -rotate-6">100x ROI</div>
                        </StickerSlap>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <ScrollWordReveal
                            text="WE ARE THE GROWTH ARCHITECTS BUILDING HIGH-FREQUENCY REVENUE ENGINES FOR MARKET DOMINATION."
                            className="max-w-7xl mx-auto text-center font-heading font-black !text-[2.5rem] sm:!text-[3.5rem] md:!text-8xl !tracking-tight !leading-[1] uppercase underline decoration-primary decoration-[4px] md:decoration-[8px] underline-offset-4 md:underline-offset-8"
                        />

                        <div className="flex justify-center mt-10 md:mt-16">
                            <Link href="/about" className="bg-white brutalist-border px-8 py-4 rotate-2 shadow-[4px_4px_0px_#000] hover:rotate-0 transition-transform cursor-pointer group">
                                <span className="text-xs font-black uppercase tracking-widest group-hover:text-primary transition-colors text-black">Learn Our Secret Sauce</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <ScrollConnector />

                <div data-chapter="Services"><Services /></div>

                <VelocityMarquee text="STRATEGY ✦ PERFORMANCE ✦ GROWTH ✦ " baseVelocity={-3} />

                <RegionStrip />

                <div data-chapter="Process"><Process /></div>

                <ScrollConnector />

                <div data-chapter="Founders"><Team 
                    onlyCore={true} 
                    title={
                        <>
                            FOUNDER&apos;S <br /> <span className="text-primary italic">CABIN</span>
                        </>
                    } 
                /></div>

                <VelocityMarquee text="DATA DRIVEN ✦ RESULTS ✦ SCALE ✦ " baseVelocity={3} />

                <div data-chapter="Work"><WorkShowcase /></div>

                <ScrollConnector />

                <LogoCloud />

                <div data-chapter="Reels"><ReelsSection /></div>

                <div data-chapter="Reviews"><Testimonials /></div>

                <FAQ />

                <div data-chapter="Contact"><CTA /></div>
            </main>

            <Footer />
        </div>
    );
}

