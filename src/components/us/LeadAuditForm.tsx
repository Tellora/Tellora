"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/lib/store";
import { trackEvent } from "@/lib/gtag";

/**
 * Lead magnet: free local SEO audit for electricians.
 * Saved to the same inbox as the contact form (service = "Free local SEO audit (electricians)").
 * TODO (Phase 4): attach region = "United States" once the region field exists in Supabase.
 */
export default function LeadAuditForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("loading");
        const fd = new FormData(form);
        const business = String(fd.get("business") || "");
        try {
            const saved = await submitContactForm({
                name: fd.get("name") as string,
                email: fd.get("email") as string,
                company: business,
                service: "Free local SEO audit (electricians)",
                message: `Website: ${fd.get("website")}\nService area: ${fd.get("area")}\nBusiness: ${business}`,
            });
            if (!saved) throw new Error("save failed");
            setStatus("success");
            trackEvent("electrical_audit_form_submit", { form: "local_seo_audit" });
            form.reset();
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-white brutalist-border shadow-[8px_8px_0px_#000] p-8 text-center">
                <CheckCircle className="mx-auto mb-4 text-emerald-500" size={48} />
                <h3 className="font-heading font-black uppercase text-2xl mb-2">Request received</h3>
                <p className="font-medium text-black/70">We will review your local search presence and get back to you.</p>
            </div>
        );
    }

    const field = "w-full bg-white brutalist-border p-4 text-sm font-bold focus:outline-none focus:bg-primary/10";
    const label = "block text-[10px] font-black uppercase tracking-[0.2em] mb-2";

    return (
        <form onSubmit={handleSubmit} className="bg-white brutalist-border shadow-[8px_8px_0px_#000] p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className={label} htmlFor="audit-name">Your name</label>
                    <input id="audit-name" name="name" required className={field} autoComplete="name" />
                </div>
                <div>
                    <label className={label} htmlFor="audit-business">Business name</label>
                    <input id="audit-business" name="business" required className={field} autoComplete="organization" />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className={label} htmlFor="audit-website">Website</label>
                    <input id="audit-website" name="website" type="url" required placeholder="https://" className={field} autoComplete="url" />
                </div>
                <div>
                    <label className={label} htmlFor="audit-email">Email</label>
                    <input id="audit-email" name="email" type="email" required className={field} autoComplete="email" />
                </div>
            </div>
            <div>
                <label className={label} htmlFor="audit-area">Service area</label>
                <input id="audit-area" name="area" required placeholder="e.g. Eureka, MO and surrounding cities" className={field} />
            </div>
            {status === "error" && (
                <p role="alert" className="text-sm font-bold text-secondary">Something went wrong. Please try again or use our contact page.</p>
            )}
            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#A855F7] hover:-translate-y-1 transition-all disabled:opacity-60"
            >
                {status === "loading" ? "Sending…" : "Get my free audit"} <Send size={16} />
            </button>
        </form>
    );
}
