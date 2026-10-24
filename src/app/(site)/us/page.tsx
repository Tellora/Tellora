import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLogo from "@/components/us/ClientLogo";
import { SEO_CONFIG, US_CONTACT, US_PAGES_LIVE, getCanonicalUrl } from "@/lib/seo";
import {
    US_HERO,
    GOOGLE_RATING,
    US_TRUST_LOGOS,
    WHY_TELLORA,
    US_SERVICES,
    US_MINI_CASES,
    US_FAQS,
    OWNERSHIP_NOTE,
} from "@/data/us-market";
import FaqSchema from "@/components/seo/schema/FaqSchema";
import BreadcrumbSchema from "@/components/seo/schema/BreadcrumbSchema";

const TITLE = "Digital Marketing Agency for US Home Service Businesses";
const DESCRIPTION =
    "Full-service digital marketing agency helping US electrical contractors, HVAC, and home service brands generate qualified leads through SEO and Google Ads.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: getCanonicalUrl("/us/") },
    robots: US_PAGES_LIVE ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
        title: `${TITLE} | Tellora Media`,
        description: DESCRIPTION,
        url: getCanonicalUrl("/us/"),
        siteName: SEO_CONFIG.siteName,
        locale: "en_US",
        type: "website",
        // TODO: replace placeholder OG image with a designed one
        images: [{ url: "/og-us.png", width: 1200, height: 630, alt: "Tellora Media for US home service businesses" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-us.png"] },
};

export default function UsLandingPage() {
    const bookHref = US_CONTACT.calendlyUrl || "/contact/"; // TODO: Calendly US audit link

    return (
        <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
            <FaqSchema questions={US_FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: `${SEO_CONFIG.siteUrl}/` },
                    { name: "For US Businesses", url: getCanonicalUrl("/us/") },
                ]}
            />
            <Header />

            <main className="relative z-10">
                {/* Hero */}
                <section className="pt-32 sm:pt-40 md:pt-48 pb-10 md:pb-16 border-b-[4px] border-black bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <span className="inline-block px-4 py-1.5 bg-primary brutalist-border text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[4px_4px_0px_#000]">
                            For US Businesses
                        </span>
                        <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl font-heading font-black uppercase tracking-tighter leading-[0.95] mb-6 break-words">
                            {US_HERO.h1}
                        </h1>
                        <p className="text-base md:text-xl font-bold leading-relaxed max-w-3xl mb-8 text-black/80">{US_HERO.subhead}</p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link
                                href={bookHref}
                                className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#A855F7] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                            >
                                {US_HERO.primaryCta} <ArrowRight size={18} />
                            </Link>
                            <Link
                                href={US_HERO.caseStudyHref}
                                className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#F3E84A] hover:-translate-y-1 transition-all flex items-center justify-center"
                            >
                                {US_HERO.secondaryCta}
                            </Link>
                        </div>

                        {/* Trust bar */}
                        <div className="space-y-5">
                            <ul className="flex flex-wrap gap-3" aria-label="Selected clients">
                                {US_TRUST_LOGOS.map((l) => (
                                    <li key={l.name}>
                                        <ClientLogo name={l.name} src={l.src} />
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href={GOOGLE_RATING.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white brutalist-border shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors"
                                >
                                    <Star size={14} className="fill-current" /> {GOOGLE_RATING.text}
                                </a>
                                {/* TODO: Clutch badge — swap in the real widget/link once the Clutch profile is live */}
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-black/40 text-xs font-black uppercase tracking-widest text-black/50">
                                    Clutch badge coming soon
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Tellora */}
                <section className="py-12 md:py-20 border-b-[4px] border-black">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">Why Tellora for US businesses</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {WHY_TELLORA.map((w, i) => (
                                <div key={w.title} className="bg-white brutalist-border shadow-[6px_6px_0px_#000] p-6">
                                    <span className="font-heading font-black text-4xl text-accent">0{i + 1}</span>
                                    <h3 className="font-heading font-black uppercase text-xl mt-2 mb-3 leading-tight">{w.title}</h3>
                                    <p className="text-sm font-medium text-black/70 leading-relaxed">{w.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mini case studies */}
                <section className="py-12 md:py-20 border-b-[4px] border-black bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">Selected work</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {US_MINI_CASES.map((c) => (
                                <article key={c.title} className="flex flex-col bg-white brutalist-border shadow-[6px_6px_0px_#000] p-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">{c.market}</span>
                                    <h3 className="font-heading font-black uppercase text-xl mb-3">{c.title}</h3>
                                    <p className="text-sm font-medium text-black/70 leading-relaxed mb-6 flex-grow">{c.summary}</p>
                                    {c.href ? (
                                        <Link href={c.href} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-accent">
                                            Read case study <ArrowRight size={14} />
                                        </Link>
                                    ) : (
                                        <span className="text-xs font-black uppercase tracking-widest text-black/40">Case study coming soon</span>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-12 md:py-20 border-b-[4px] border-black">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">Services for US home service brands</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {US_SERVICES.map((s) => (
                                <li key={s.title} className="flex items-start gap-3 bg-white brutalist-border p-5 shadow-[4px_4px_0px_#000]">
                                    <CheckCircle2 size={22} className="shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-heading font-black uppercase text-lg leading-tight mb-1">{s.title}</h3>
                                        <p className="text-sm font-medium text-black/70">{s.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 font-bold">
                            Electrical contractor?{" "}
                            <Link href="/for-electrical-contractors/" className="underline underline-offset-4 hover:text-accent">
                                See our program built for electricians
                            </Link>
                            .
                        </p>
                    </div>
                </section>

                {/* Ownership */}
                <section className="py-10 border-b-[4px] border-black bg-primary">
                    <div className="container mx-auto px-6 max-w-5xl flex items-center gap-4">
                        <ShieldCheck size={32} className="shrink-0" />
                        <p className="font-heading font-black uppercase text-lg md:text-2xl leading-tight">{OWNERSHIP_NOTE}</p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-12 md:py-20 border-b-[4px] border-black bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {US_FAQS.map((f) => (
                                <details key={f.question} className="group brutalist-border bg-white p-5 shadow-[4px_4px_0px_#000]">
                                    <summary className="cursor-pointer font-black text-base md:text-lg list-none flex justify-between items-center gap-4">
                                        {f.question}
                                        <span className="text-2xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                                    </summary>
                                    <p className="mt-4 text-black/80 font-medium leading-relaxed">{f.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h2 className="text-3xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4">Book your free 20-minute audit</h2>
                        <p className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs mb-8">
                            <Clock size={14} /> {US_CONTACT.responseTime}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* TODO: Calendly embed. Needs approval (third-party script); using a link button for now. */}
                            <Link
                                href={bookHref}
                                className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#A855F7] hover:-translate-y-1 transition-all"
                            >
                                {US_HERO.primaryCta}
                            </Link>
                            {US_CONTACT.email && (
                                <a
                                    href={`mailto:${US_CONTACT.email}`}
                                    className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#F3E84A] hover:-translate-y-1 transition-all"
                                >
                                    {US_CONTACT.email}
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
