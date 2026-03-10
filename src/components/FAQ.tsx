"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "How is Tellora different from other agencies?",
            answer: "We don't just run campaigns; we build growth engines. We blend high-end creative design with advanced data science and custom ROI tracking, ensuring every dollar spent is measurable."
        },
        {
            question: "What is your typical onboarding process?",
            answer: "Our onboarding takes 1-2 weeks. We start with a deep-dive strategy session, followed by a comprehensive audit of your current assets, pixel implementations, and competitor analysis before launching phase one."
        },
        {
            question: "Do you guarantee results?",
            answer: "While no ethical agency can guarantee specific financial outcomes due to market variables, we guarantee our output, our strategy execution, and a transparent data pipeline. If a strategy isn't scaling, you will know exactly why and how we are pivoting."
        },
        {
            question: "What industries do you specialize in?",
            answer: "We have deep expertise in SaaS, B2B Tech, High-Ticket E-commerce, and specialized Local Services (e.g., Medical, Real Estate). Our frameworks adapt well to any data-driven sector."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 relative z-10 bg-background border-t-[4px] border-black overflow-hidden">
            {/* Background Marquee */}
            <div className="absolute top-1/2 left-0 w-full opacity-5 pointer-events-none -translate-y-1/2 rotate-3">
                <span className="text-[25rem] font-heading font-black uppercase whitespace-nowrap">
                    ANSWERS • ANSWERS • ANSWERS •
                </span>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-4 mb-8 px-6 py-2 bg-black text-white brutalist-border rounded-full -rotate-1 shadow-[4px_4px_0px_#A855F7]">
                        <HelpCircle size={14} className="text-primary fill-current" />
                        <span className="font-black uppercase tracking-widest text-[10px]">Your Intel Base</span>
                    </div>
                    <h2 className="heading-massive !text-7xl md:!text-9xl tracking-tighter">
                        BRAIN <br /> <span className="text-accent italic">DUMP</span>
                    </h2>
                </div>

                <div className="grid gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className={`brutalist-card cursor-pointer group transition-all overflow-hidden ${openIndex === index ? 'bg-white shadow-[10px_10px_0px_#000]' : 'bg-white/50 shadow-[5px_5px_0px_#000] hover:bg-white'
                                }`}
                        >
                            <div className="flex items-center justify-between p-8 text-left">
                                <h3 className={`text-xl md:text-3xl font-heading font-black uppercase tracking-tighter transition-colors ${openIndex === index ? 'text-primary' : 'text-black'
                                    }`}>
                                    {faq.question}
                                </h3>
                                <div className={`shrink-0 w-12 h-12 brutalist-border flex items-center justify-center transition-all ${openIndex === index ? 'bg-primary text-white rotate-180 shadow-[4px_4px_0px_#000]' : 'bg-white text-black'
                                    }`}>
                                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                                </div>
                            </div>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        <div className="px-8 pb-8 pt-2">
                                            <div className="w-full h-[2px] bg-black/10 mb-8" />
                                            <p className="text-lg font-black uppercase leading-tight opacity-70">
                                                {faq.answer}
                                            </p>
                                            <div className="mt-8 flex justify-end">
                                                <Sparkles className="text-primary opacity-20" size={32} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
