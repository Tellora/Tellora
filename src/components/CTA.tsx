"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Rocket } from "lucide-react";
import { useRef } from "react";

export default function CTA() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    return (
        <section ref={ref} className="py-32 relative z-10 bg-background border-t-[4px] border-black overflow-hidden">
            {/* Massive Background Text */}
            <div className="absolute top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 -rotate-6">
                <span className="text-[30rem] font-heading font-black uppercase whitespace-nowrap">
                    LET'S GO • LET'S GO •
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-12 md:p-24 text-center brutalist-card !bg-primary overflow-hidden shadow-[12px_12px_0px_#000] transition-colors"
                >
                    {/* Background Decorative Elements */}
                    <motion.div
                        className="absolute top-10 left-10 text-black/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <Zap size={120} />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-10 right-10 text-black/10"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Rocket size={120} />
                    </motion.div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center gap-4 mb-12 px-8 py-3 bg-black text-white brutalist-border rounded-full -rotate-2 shadow-[6px_6px_0px_#FFF]">
                            <Sparkles size={16} className="text-primary fill-current" />
                            <span className="font-black uppercase tracking-widest text-[12px]">Final Growth Step</span>
                        </div>

                        <h2 className="text-6xl md:text-[9.5rem] xl:text-[11rem] font-heading font-black text-black mb-12 leading-[0.9] tracking-tighter">
                            READY TO <br /> 
                            <span className="italic">IGNITE?</span>
                        </h2>

                        <p className="text-xl md:text-3xl font-black text-black uppercase leading-tight mb-16 max-w-3xl mx-auto">
                            Stop wasting budget on strategies that don&apos;t scale. Build a predictable engine for massive revenue impact.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center gap-6 bg-white brutalist-border px-16 py-8 shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#000] transition-all"
                            >
                                <span className="text-2xl font-black uppercase tracking-widest text-black">Start Audit</span>
                                <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform" />
                            </motion.a>

                            <div className="sm:rotate-12 bg-black text-white px-6 py-4 brutalist-border shadow-[4px_4px_0px_white]">
                                <span className="text-sm font-black uppercase whitespace-nowrap">No CC required</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
