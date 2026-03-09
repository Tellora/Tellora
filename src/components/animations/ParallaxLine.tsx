"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ParallaxLine({
    velocity = 0.05,
    direction = "vertical",
    color = "currentColor",
    className = ""
}: {
    velocity?: number;
    direction?: "vertical" | "horizontal";
    color?: string;
    className?: string;
}) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const move = useTransform(scrollYProgress, [0, 1], [0, 1000 * velocity]);
    const springMove = useSpring(move, { stiffness: 100, damping: 30 });

    return (
        <div ref={targetRef} className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox={direction === "vertical" ? "0 0 100 1000" : "0 0 1000 100"}
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                <motion.line
                    x1={direction === "vertical" ? "50" : "0"}
                    y1={direction === "vertical" ? "0" : "50"}
                    x2={direction === "vertical" ? "50" : "1000"}
                    y2={direction === "vertical" ? "1000" : "50"}
                    stroke={color}
                    strokeWidth="1"
                    strokeDasharray="20 40"
                    style={{
                        [direction === "vertical" ? "y" : "x"]: springMove
                    }}
                />
            </svg>
        </div>
    );
}

export function ScrollConnector({ className = "" }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const ySpring = useSpring(y, { stiffness: 400, damping: 90 });

    return (
        <div ref={ref} className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-100/50 hidden lg:block ${className}`}>
            <motion.div
                style={{ height: ySpring }}
                className="w-full bg-gradient-to-b from-primary to-primary-dark shadow-[0_0_15px_rgba(14,165,233,0.5)]"
            />
        </div>
    );
}
