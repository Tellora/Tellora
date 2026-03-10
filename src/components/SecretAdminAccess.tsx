"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function SecretAdminAccess() {
    const router = useRouter();
    const [showHint, setShowHint] = useState(false);
    // Use a ref so the keydown handler always reads the latest buffer
    // without needing to be re-registered on every keystroke
    const bufferRef = useRef("");
    const SECRET = "admin";

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            // Ignore when the user is typing inside a form field
            const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
            if (tag === "input" || tag === "textarea" || tag === "select" || (e.target as HTMLElement)?.isContentEditable) return;

            // Only care about single printable characters (ignore Shift, Ctrl, etc.)
            if (e.key.length !== 1) return;

            // Append to buffer and keep only last N chars needed
            bufferRef.current = (bufferRef.current + e.key).slice(-SECRET.length);

            if (bufferRef.current.toLowerCase() === SECRET) {
                bufferRef.current = ""; // reset
                setShowHint(true);
                setTimeout(() => {
                    setShowHint(false);
                    router.push("/admin/login");
                }, 900);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  // ← empty dep array is intentional: ref keeps value fresh

    return (
        <AnimatePresence>
            {showHint && (
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-5 bg-[#080B12] border border-primary/40 text-white px-8 py-5 rounded-[2.5rem] shadow-[0_0_60px_rgba(74,192,228,0.3)] backdrop-blur-xl"
                >
                    <div className="w-10 h-10 rounded-[1rem] bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                        <ShieldCheck size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic">Neural Handshake Detected</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">Redirecting to Control Hub...</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
