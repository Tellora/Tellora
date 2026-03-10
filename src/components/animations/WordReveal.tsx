"use client";

import { motion } from "framer-motion";

export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 },
        },
        hidden: {
            opacity: 0,
            y: 30,
            transition: { type: "spring", stiffness: 100, damping: 20 },
        },
    };

    return (
        <motion.div
            className={`relative z-10 flex flex-wrap justify-center overflow-hidden py-4 ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {words.map((word, i) => (
                <motion.span
                    variants={child}
                    key={i}
                    className="inline-block mr-3 md:mr-5 mb-2 md:mb-4 will-change-[transform,opacity]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
