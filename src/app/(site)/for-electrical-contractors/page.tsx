import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadAuditForm from "@/components/us/LeadAuditForm";
import { SEO_CONFIG, US_CONTACT, US_PAGES_LIVE, getCanonicalUrl } from "@/lib/seo";
import { ELECTRICAL, OWNERSHIP_NOTE, US_HERO } from "@/data/us-market";
import { caseStudies } from "@/data/case-studies";
import BreadcrumbSchema from "@/components/seo/schema/BreadcrumbSchema";

const TITLE = "Marketing Agency for Electrical Contractors | Local SEO & Google Ads";
const DESCRIPTION =
    "We help US electrical contractors rank locally, run profitable Google Ads, and build systems to generate 20+ qualified leads per month.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: getCanonicalUrl("/for-electrical-contractors/") },
    robots: US_PAGES_LIVE ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
        title: `${TITLE} | Tellora`,
        description: DESCRIPTION,
        url: getCanonicalUrl("/for-electrical-contractors/"),
        siteName: SEO_CONFIG.siteName,
        locale: "en_US",
        type: "website",
        // TODO: replace placeholder OG image with a designed one
        images: [{ url: "/og-electrical.png", width: 1200, height: 630, alt: "Marketing for US electrical contractors" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-electrical.png"] },
};

export default function ElectricalContractorsPage() {
    const atoms = caseStudies.find((c) => c.id === "atoms-electrical");
    const bookHref = US_CONTACT.calendlyUrl || "/contact/"; // TODO: Calendly US audit link

    return (
        <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: `${SEO_CONFIG.siteUrl}/` },
                    { name: "For US Businesses", url: getCanonicalUrl("/us/") },
                    { name: "Electrical Contractors", url: getCanonicalUrl("/for-electrical-contractors/") },
                ]}
            />
            <Header />

            <main className="relative z-10">
                <section className="pt-32 sm:pt-40 md:pt-48 pb-12 md:pb-16 border-b-[4px] border-black bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <span className="inline-block px-4 py-1.5 bg-primary brutalist-border text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[4px_4px_0px_#000]">
                            Electrical Contractors
                        </span>
                        <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl font-heading font-black uppercase tracking-tighter leading-[0.95] mb-6 break-words">
                            {ELECTRICAL.h1}
                        </h1>
                        <p className="text-base md:text-xl font-bold leading-relaxed max-w-3xl mb-8 text-black/80">
                            We help electrical contractors build systems to generate 20+ qualified leads per month through local SEO, Google Ads and a website that converts.
                        </p>
                        <Link
                            href={bookHref}
                            className="inline-flex px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#A855F7] hover:-translate-y-1 transition-all items-center gap-3"
                        >
                            {US_HERO.primaryCta} <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* Atoms proof */}
                {atoms && (
                    <section className="py-12 md:py-20 border-b-[4px] border-black">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <div className="bg-black text-white brutalist-border shadow-[8px_8px_0px_#F3E84A] p-6 sm:p-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Case study · {atoms.location}</span>
                                <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mt-2 mb-4">{atoms.title}</h2>
                                <p className="font-medium text-white/80 max-w-3xl mb-6">{atoms.description}</p>
                                <Link href="/case-studies/atoms-electrical/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:underline">
                                    Read the full case study <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Services */}
                <section className="py-12 md:py-20 border-b-[4px] border-black bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">What we do for electricians</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {ELECTRICAL.services.map((s) => (
                                <li key={s.title} className="flex items-start gap-3 bg-white brutalist-border p-5 shadow-[4px_4px_0px_#000]">
                                    <CheckCircle2 size={22} className="shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-heading font-black uppercase text-lg leading-tight mb-1">{s.title}</h3>
                                        <p className="text-sm font-medium text-black/70">{s.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Testimonial slot */}
                {/* TODO: testimonial from Adam Holes (Atoms Electrical Co.). Render a <blockquote> here once a real, approved quote exists. */}

                {/* Ownership */}
                <section className="py-10 border-b-[4px] border-black bg-primary">
                    <div className="container mx-auto px-6 max-w-5xl flex items-center gap-4">
                        <ShieldCheck size={32} className="shrink-0" />
                        <p className="font-heading font-black uppercase text-lg md:text-2xl leading-tight">{OWNERSHIP_NOTE}</p>
                    </div>
                </section>

                {/* Lead magnet */}
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-3">{ELECTRICAL.leadMagnet.title}</h2>
                        <p className="font-bold text-black/70 mb-8">{ELECTRICAL.leadMagnet.body}</p>
                        <LeadAuditForm />
                        <p className="mt-6 text-center font-bold">
                            Prefer to talk?{" "}
                            <Link href={bookHref} className="underline underline-offset-4 hover:text-accent">Book a free 20-min audit</Link>
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
