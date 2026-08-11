"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const springConfig = { stiffness: 500, damping: 35, mass: 0.1 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (typeof window === "undefined" || window.matchMedia("(max-width: 1024px)").matches) return;

        let visibleSet = false;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visibleSet) {
                visibleSet = true;
                setIsVisible(true);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('interactive-hover');

            setIsHovering(prev => (prev !== !!isClickable ? !!isClickable : prev));
        };

        window.addEventListener("mousemove", updateMousePosition, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (!isMounted || !isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block">
            {/* Chunky Brutalist Pointer */}
            <motion.div
                className="absolute flex items-center justify-center p-1 rounded-full shadow-[2px_2px_0px_#000] will-change-transform"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: isHovering ? 5 : 0,
                    scale: isHovering ? 1.3 : 1,
                    width: isHovering ? "auto" : "1.8rem",
                    height: isHovering ? "1.8rem" : "1.8rem",
                    backgroundColor: isHovering ? "#F3E84A" : "#FFFFFF",
                    border: "2px solid #000",
                    transition: "width 0.15s, height 0.15s, transform 0.15s",
                }}
            >
                {/* Visual marker inside */}
                {isHovering ? (
                    <span className="text-[9px] font-black uppercase tracking-widest text-black px-2 whitespace-nowrap">DISRUPT <span className="rotate-45 inline-block">↗</span></span>
                ) : (
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                )}
            </motion.div>

            {/* Trailing Dot for precision */}
            <motion.div
                className="absolute w-1.5 h-1.5 bg-black rounded-full will-change-transform"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovering ? 0 : 0.8
                }}
            />
        </div>
    );
}
