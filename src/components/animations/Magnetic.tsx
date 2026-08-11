"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const rectRef = useRef<{ height: number; width: number; left: number; top: number } | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!rectRef.current && ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
        if (!rectRef.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = rectRef.current;
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
    };

    const reset = () => {
        rectRef.current = null;
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.1 }}
            className="will-change-transform"
        >
            {children}
        </motion.div>
    );
}
