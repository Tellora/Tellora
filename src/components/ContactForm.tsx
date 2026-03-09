"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/lib/store";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        const formData = new FormData(e.currentTarget);

        // Save to localStorage store so it appears in admin inbox
        submitContactForm({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            company: formData.get("company") as string,
            service: formData.get("service") as string,
            message: formData.get("message") as string,
        });

        setTimeout(() => {
            setStatus("success");
            formRef.current?.reset();
        }, 1000);
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-16 bg-emerald-50/30 border border-emerald-100 rounded-[3rem] text-center shadow-xl shadow-emerald-100/20"
            >
                <div className="w-24 h-24 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-200">
                    <CheckCircle className="text-white w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-text-main mb-4 font-heading uppercase tracking-widest">Message Received!</h3>
                <p className="text-text-muted text-lg font-medium">Our growth experts will reach out to you <br /> within 24 hours.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-10 text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:text-primary-dark transition-colors"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                    <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-text-main font-medium placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all hover:bg-slate-100/50"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Email Address</label>
                    <input
                        required
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-text-main font-medium placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all hover:bg-slate-100/50"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Service Required</label>
                    <div className="relative">
                        <select name="service" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-text-main font-medium focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer hover:bg-slate-100/50">
                            <option>SEO Optimization</option>
                            <option>Web Design &amp; Dev</option>
                            <option>Performance Marketing</option>
                            <option>Content Strategy</option>
                            <option>Brand Identity</option>
                            <option>Social Media Management</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Send size={14} className="rotate-90" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Company Name</label>
                    <input
                        name="company"
                        type="text"
                        placeholder="Your Business"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-text-main font-medium placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all hover:bg-slate-100/50"
                    />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Project Details</label>
                <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project goals and requirements..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-text-main font-medium placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none hover:bg-slate-100/50"
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-6 bg-text-main text-white font-black rounded-2xl transition-all flex items-center justify-center gap-4 overflow-hidden group relative shadow-xl shadow-slate-200 ${status === "loading" ? "opacity-70 cursor-wait" : "hover:bg-primary hover:-translate-y-2 hover:shadow-primary/30"}`}
            >
                {status === "loading" ? (
                    <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span className="uppercase tracking-[0.2em] text-xs">Send Strategy Request</span>
                        <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </>
                )}
            </button>
        </form>
    );
}
