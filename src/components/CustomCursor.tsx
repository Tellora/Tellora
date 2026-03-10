"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState("");

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { stiffness: 600, damping: 40, mass: 0.1 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (typeof window === "undefined" || window.matchMedia("(max-width: 1024px)").matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive-hover');

            setIsHovering(!!isClickable);
            setCursorText(isClickable ? "CLICK" : "");
        };

        window.addEventListener("mousemove", updateMousePosition, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block mix-blend-difference">
            {/* Chunky Brutalist Pointer */}
            <motion.div
                className="absolute flex items-center justify-center p-1"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: isHovering ? 5 : 0,
                    scale: isHovering ? 1.5 : 1,
                    width: isHovering ? "auto" : "2rem",
                    height: isHovering ? "2rem" : "2rem",
                    backgroundColor: isHovering ? "#F3E84A" : "#FFFFFF",
                    border: "2px solid #000",
                    transition: "width 0.2s, height 0.2s",
                }}
            >
                {/* Visual marker inside */}
                {isHovering ? (
                    <span className="text-[10px] font-black uppercase tracking-widest text-black px-2 whitespace-nowrap">DISRUPT <span className="rotate-45 inline-block">↗</span></span>
                ) : (
                    <div className="w-2 h-2 bg-black rounded-full" />
                )}
            </motion.div>

            {/* Trailing Dot for precision */}
            <motion.div
                className="absolute w-2 h-2 bg-black rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovering ? 0 : 1
                }}
            />
        </div>
    );
}
