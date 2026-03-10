"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=<>?/[]{}|";

export function ScrambleText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
    const [scrambled, setScrambled] = useState("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const CYCLES_PER_LETTER = 2;
    const SHUFFLE_TIME = 30;

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const startScramble = () => {
            let pos = 0;
            intervalRef.current = setInterval(() => {
                const scrambledText = text.split("").map((char, index) => {
                    if (pos / CYCLES_PER_LETTER > index) {
                        return char;
                    }
                    if (char === " ") return " ";
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("");

                setScrambled(scrambledText);
                pos++;

                if (pos >= text.length * CYCLES_PER_LETTER) {
                    clearInterval(intervalRef.current!);
                    setScrambled(text);
                }
            }, SHUFFLE_TIME);
        };

        timeout = setTimeout(startScramble, delay * 1000);

        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, delay]);

    const handleHover = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        let pos = 0;
        intervalRef.current = setInterval(() => {
            const scrambledText = text.split("").map((char, index) => {
                if (pos / CYCLES_PER_LETTER > index) {
                    return char;
                }
                if (char === " ") return " ";
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join("");

            setScrambled(scrambledText);
            pos++;

            if (pos >= text.length * CYCLES_PER_LETTER) {
                clearInterval(intervalRef.current!);
                setScrambled(text);
            }
        }, SHUFFLE_TIME);
    };

    return (
        <span className={className} onMouseEnter={handleHover}>
            {scrambled || text}
        </span>
    );
}

