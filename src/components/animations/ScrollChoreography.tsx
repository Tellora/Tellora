"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

/**
 * Neubrutalist SectionHeader
 */
export function SectionHeader({ title, subtitle, number }: { title: string, subtitle?: string, number?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="relative mb-24 md:mb-32">
            {number && (
                <div className="absolute -top-12 -left-6 bg-black text-white brutalist-border px-6 py-2 rotate-6 z-20 shadow-[6px_6px_0px_#4AC0E4]">
                    <span className="text-3xl font-heading font-black italic">{number}</span>
                </div>
            )}
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="w-12 h-3 bg-primary brutalist-border shadow-[2px_2px_0px_#000]" />
                    <span className="font-black tracking-[0.5em] uppercase text-xs text-black">
                        {subtitle}
                    </span>
                </motion.div>

                <div className="overflow-visible">
                    <motion.h2
                        initial={{ opacity: 0, y: 70 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                        className="text-6xl md:text-9xl font-heading font-black text-black leading-[0.9] tracking-tighter uppercase"
                    >
                        {title}
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "200px" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                    className="h-[6px] mt-12 bg-black brutalist-border shadow-[4px_4px_0px_#4AC0E4]"
                />
            </div>
        </div>
    );
}

/**
 * Bold Parallax Marquee 
 */
export function ParallaxText({ text, baseVelocity = 100 }: { text: string, baseVelocity?: number }) {
    const { scrollY } = useScroll();
    const x = useTransform(scrollY, [0, 10000], [0, baseVelocity * 10]);
    const xSmooth = useSpring(x, { stiffness: 50, damping: 20 });

    return (
        <div className="overflow-hidden whitespace-nowrap flex py-20 pointer-events-none select-none border-y-[4px] border-black bg-white/50 backdrop-blur-sm">
            <motion.div style={{ x: xSmooth }} className="flex gap-40 will-change-transform">
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="text-[12rem] md:text-[20rem] font-heading font-black uppercase text-black tracking-tighter leading-none opacity-10">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function FloatingElement({ children, speed = 0.1, top = "0%", left = "0%", rotate = 0 }: { children: React.ReactNode, speed?: number, top?: string, left?: string, rotate?: number }) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 5000], [0, 5000 * speed]);
    const r = useTransform(scrollY, [0, 5000], [0, rotate]);

    return (
        <motion.div
            style={{ y, rotate: r, top, left }}
            className="absolute z-0 pointer-events-none hidden lg:block will-change-transform"
        >
            {children}
        </motion.div>
    );
}

export function HorizontalReveal({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}

export function ScrollLine({ className }: { className?: string }) {
    return (
        <div className={`absolute left-0 right-0 h-[4px] bg-black overflow-hidden ${className}`}>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
                className="w-full h-full origin-left bg-primary"
            />
        </div>
    );
}

export function ScrollConnector() {
    return (
        <div className="relative h-40 flex justify-center items-center overflow-hidden">
            <div className="w-[4px] h-full bg-black relative">
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 bg-primary select-none pointer-events-none"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>
            {/* Sticker badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white brutalist-border p-2 rotate-12 shadow-[4px_4px_0px_#000]">
                <span className="text-[8px] font-black uppercase whitespace-nowrap">Growth Link</span>
            </div>
        </div>
    );
}

/**
 * Neubrutalist Magnetic interaction
 */
export function MagneticElement({ children, distance = 0.5 }: { children: React.ReactNode, distance?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * distance, y: middleY * distance });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.1 }}
            className="will-change-transform inline-block"
        >
            {children}
        </motion.div>
    );
}

/**
 * Advanced Decode Text Animation
 */
export function DecodeText({ text, className = "" }: { text: string, className?: string }) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    React.useEffect(() => {
        if (!isInView) return;
        let iteration = 0;
        let interval: NodeJS.Timeout;

        interval = setInterval(() => {
            setDisplayText((prev) =>
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [isInView, text]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
}

/**
 * Parallax Image Container
 */
export function ParallaxImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <div ref={ref} className={`overflow-hidden relative ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ scale, y }}
                className="w-full h-full object-cover transform-gpu"
            />
        </div>
    );
}
