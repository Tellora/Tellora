"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { DbTestimonial } from "@/lib/supabase";

const GOOGLE_REVIEWS_URL = "https://share.google/WH6zRtrhnXEJ9R11a";

const ACTUAL_GOOGLE_REVIEWS: DbTestimonial[] = [
    {
        id: "g1",
        name: "Ananya Vig",
        role: "Google Reviewer",
        company: "SEO & Content Client",
        quote: "Hired Tellora Media for SEO and content. They asked about my real customers, not just keywords. Traffic grew steadily and lead quality is noticeably better.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a-/ALV-UjWxttHSlAFzgruCnomcK1DhrUdGPwwlLFDjz0U7nHVMjohhJcu1=s40-c-rp-mo-ba3-br100"
    },
    {
        id: "g2",
        name: "Astrology Light For All",
        role: "Google Reviewer",
        company: "Digital Growth Client",
        quote: "Partnering with Tellora Media completely transformed our approach to digital growth. They bypass the guesswork of digital marketing and deliver clear results.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a/ACg8ocLrgzdt_9gYcT8TY0ttU5qPqinARhz0GD-vIJjSQ9_Sk-i10w=s40-c-rp-mo-br100"
    },
    {
        id: "g3",
        name: "Nuiki Shuaha",
        role: "Google Reviewer",
        company: "USA E-commerce Business",
        quote: "Tellora Media has been a great agency overall. I have a shoe business in the USA, and I have been doing all of my online media marketing with them.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a/ACg8ocKu_VxW8w8yfRu8NUoQJPRwFl_0Ktkd8OjzjLPeLU6A1swmtA4=s40-c-rp-mo-br100"
    },
    {
        id: "g4",
        name: "ARYAN SINGH",
        role: "Google Reviewer",
        company: "Brand Marketing Client",
        quote: "Great experience with Tellora Media. Their team is professional, creative, and delivers quality results. They helped us scale rapidly.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a/ACg8ocLP-fIsP8uI_sru1iwduUia38oFufjasn32SZ1eTM5C7sI6rw=s40-c-rp-mo-br100"
    },
    {
        id: "g5",
        name: "arhama rubab",
        role: "Google Reviewer",
        company: "Media & Content Client",
        quote: "Having a great experience with Tellora Media. Professional team, smooth communication, and a great learning experience working together.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a-/ALV-UjUEB5TwEMr4uVMDz4qw0jPtVvS9aPnKKLI2N4no50rZpE-sBh1vKg=s40-c-rp-mo-br100"
    },
    {
        id: "g6",
        name: "Tanisha",
        role: "Google Reviewer",
        company: "Online Visibility Client",
        quote: "tellora media delivers consistent, results-driven campaigns that have significantly improved our online visibility.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a-/ALV-UjU4j3-650rulEQEE3-AOgA_HKoxmJbg9I_VfvYVdLzjj2BwR0Wz=s40-c-rp-mo-br100"
    },
    {
        id: "g7",
        name: "Erika Mathur",
        role: "Google Reviewer",
        company: "Creative Production Client",
        quote: "the agency is really great and their work is fully up-to my expectation the work is top notch quality",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a/ACg8ocLDm7lkPGxjmkd4m8_tMwX28TXuBP3ERwHF2JmhXfi2CPJpfTQ=s40-c-rp-mo-br100"
    },
    {
        id: "g8",
        name: "NEW CREATOR BLOG",
        role: "Google Reviewer",
        company: "Content Creator Partner",
        quote: "If you are looking for a marketing agency that actually delivers on creativity, Tellora Media is the one. They helped us tremendously.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a/ACg8ocI5S6B_l_s-UUTERzdj1UFwJ0Y55Gg7bR2xmjciNvSgniMWFw=s40-c-rp-mo-br100"
    },
    {
        id: "g9",
        name: "Vansh Sharma",
        role: "Google Reviewer",
        company: "Brand Identity Client",
        quote: "Incredible digital marketing agency! We were struggling with our brand identity and social media management, but Tellora Media delivered.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a/ACg8ocLSyJVwTKgBzgZhJvcWapa_yuUpeo4TyPukAyeNi-DkXmEGvg=s40-c-rp-mo-br100"
    },
    {
        id: "g10",
        name: "Kaushlendra Singh",
        role: "Local Guide · 17 reviews",
        company: "Verified Google Client",
        quote: "Professional digital marketing team delivering dedicated agency services and quality support.",
        rating: 5,
        image_url: "https://lh3.googleusercontent.com/a/ACg8ocKdVgZcMr-QdI3mZxx1wBVLi7O6RMBnXeVZe4l90ok9GmdWAF8=s40-c-rp-mo-br100"
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [40, -40]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section ref={containerRef} id="testimonials" className="py-24 md:py-40 relative z-10 bg-background border-y-[4px] border-black overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div style={{ y: yTitle }} className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
                    {/* Google Rating Badge */}
                    <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-black text-white brutalist-border rounded-full rotate-1 shadow-[4px_4px_0px_#22C55E]">
                        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                        <span className="font-black uppercase tracking-widest text-[10px] sm:text-xs">Google Verified 5.0 Rating</span>
                    </div>

                    <h2 className="heading-massive !text-5xl sm:!text-7xl md:!text-9xl tracking-tighter uppercase leading-none text-black">
                        THE <span className="text-primary italic">VOUCH</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-xl font-bold uppercase tracking-tight text-black/60 max-w-xl mx-auto">
                        Official Google My Business client reviews. Verified outcomes & authentic feedback.
                    </p>
                </motion.div>

                {/* Controls for Scroll Rail */}
                <div className="flex justify-between items-center mb-6 px-2">
                    <span className="text-xs font-black uppercase tracking-widest text-black/40">
                        SHOWING 10 VERIFIED REVIEWS
                    </span>
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all shadow-[3px_3px_0px_#000]"
                            aria-label="Previous reviews"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all shadow-[3px_3px_0px_#000]"
                            aria-label="Next reviews"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Rail of Google Reviews */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-12 pt-2 px-2 snap-x snap-mandatory scrollbar-hide"
                >
                    {ACTUAL_GOOGLE_REVIEWS.map((test, idx) => (
                        <motion.div
                            key={test.id || idx}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex-shrink-0 snap-center w-[300px] sm:w-[380px] md:w-[420px] brutalist-card bg-white p-6 sm:p-8 flex flex-col justify-between border-[4px] border-black hover:shadow-[12px_12px_0px_#A855F7] transition-all duration-300 relative group"
                        >
                            <div className="absolute -top-4 -left-3 bg-primary p-2.5 brutalist-border shadow-[3px_3px_0px_#000] rotate-[-8deg] group-hover:rotate-0 transition-transform">
                                <Quote className="text-black" size={18} />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4 pt-2">
                                    <div className="flex gap-1">
                                        {[...Array(test.rating || 5)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                        <CheckCircle2 size={10} /> Google Review
                                    </div>
                                </div>

                                <p className="text-sm sm:text-base font-black uppercase leading-snug mb-6 text-black/90">
                                    &ldquo;{test.quote}&rdquo;
                                </p>
                            </div>

                            <div className="pt-4 border-t-2 border-black/10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full brutalist-border overflow-hidden flex-shrink-0 bg-zinc-100 relative">
                                    <img
                                        src={test.image_url}
                                        alt={test.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/tellora-logo.png";
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-heading font-black text-lg uppercase tracking-tighter leading-none mb-1 text-black">
                                        {test.name}
                                    </h4>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-black/50">
                                        {test.role} {test.company ? `· ${test.company}` : ''}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Direct Google Reviews Link CTA */}
                <div className="flex justify-center mt-6">
                    <a
                        href={GOOGLE_REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#22C55E] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_#22C55E] active:translate-y-1 transition-all flex items-center gap-4 group"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                        <span>VIEW ALL GOOGLE MY BUSINESS REVIEWS</span>
                        <ExternalLink size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
