"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export function ScrollWordReveal({ text, className = "" }: { text: string; className?: string }) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 85%", "end 35%"]
    });

    const words = text.split(" ");

    return (
        <div ref={targetRef} className={`relative z-10 flex flex-wrap justify-center ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length;
                // Add a little overlap to the end so it's smooth
                const end = start + (1 / words.length);

                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </div>
    );
}

const Word = ({
    children,
    progress,
    range,
}: {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    const y = useTransform(progress, range, [20, 0]);
    const rotateX = useTransform(progress, range, [45, 0]);

    return (
        <motion.span
            style={{ opacity, y, rotateX }}
            className="inline-block mr-3 md:mr-5 mb-2 md:mb-4 will-change-[transform,opacity] origin-bottom"
        >
            {children}
        </motion.span>
    );
};
