"use client";

import React, { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    // Track mouse position over the element
    const xPct = useSpring(0, { bounce: 0 });
    const yPct = useSpring(0, { bounce: 0 });

    const rotateX = useTransform(yPct, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(xPct, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!rectRef.current && ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
        if (!rectRef.current) return;

        const rect = rectRef.current;
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        xPct.set(mouseX / width - 0.5);
        yPct.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        rectRef.current = null;
        xPct.set(0);
        yPct.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000
            }}
            className={className}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {React.Children.map(children, (child, index) => {
                    // Inject a Z-translation for a 3D pop effect
                    return (
                        <div key={index} style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
                            {child}
                        </div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
