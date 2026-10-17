import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { servicePages, getServicePage } from "@/data/service-pages";
import { getStaticPost } from "@/data/blog-posts";
import FaqSchema from "@/components/seo/schema/FaqSchema";
import BreadcrumbSchema from "@/components/seo/schema/BreadcrumbSchema";

export const dynamicParams = false;

export function generateStaticParams() {
    return servicePages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const page = getServicePage(params.slug);
    if (!page) return { title: "Service Not Found" };
    const url = getCanonicalUrl(`/services/${page.slug}/`);
    return {
        title: page.metaTitle,
        description: page.metaDescription,
        keywords: page.keywords,
        alternates: { canonical: url },
        openGraph: {
            title: page.metaTitle,
            description: page.metaDescription,
            url,
            siteName: SEO_CONFIG.siteName,
            locale: SEO_CONFIG.locale,
            type: "website",
            images: [{ url: "/og-services.png", width: 1200, height: 630, alt: page.metaTitle }],
        },
        twitter: {
            card: "summary_large_image",
            title: page.metaTitle,
            description: page.metaDescription,
            images: ["/og-services.png"],
        },
    };
}

export default function ServiceLandingPage({ params }: { params: { slug: string } }) {
    const page = getServicePage(params.slug);
    if (!page) notFound();

    const url = getCanonicalUrl(`/services/${page.slug}/`);
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.serviceName,
        serviceType: page.serviceName,
        description: page.metaDescription,
        url,
        provider: { "@type": "Organization", name: SEO_CONFIG.organizationName, url: SEO_CONFIG.siteUrl },
        areaServed: [
            { "@type": "City", name: "Delhi" },
            { "@type": "Country", name: "India" },
        ],
    };

    const related = page.relatedSlugs.map((s) => getServicePage(s)).filter(Boolean);
    const posts = page.relatedPosts.map((s) => getStaticPost(s)).filter(Boolean);
    const accentText = page.accent === "#F3E84A" ? "#000" : page.accent;

    return (
        <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <FaqSchema questions={page.faqs} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: `${SEO_CONFIG.siteUrl}/` },
                    { name: "Services", url: getCanonicalUrl("/services/") },
                    { name: page.label, url },
                ]}
            />
            <Header />

            <main className="relative z-10">
                {/* Hero */}
                <section className="pt-32 sm:pt-40 md:pt-48 pb-12 md:pb-20 border-b-[4px] border-black bg-white relative overflow-hidden">
                    <div className="container mx-auto px-6 max-w-5xl relative z-10">
                        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest mb-8">
                            <Link href="/" className="hover:text-accent">Home</Link>
                            <span>/</span>
                            <Link href="/services/" className="hover:text-accent">Services</Link>
                            <span>/</span>
                            <span className="opacity-60">{page.label}</span>
                        </nav>
                        <span
                            className="inline-block px-4 py-1.5 brutalist-border text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[4px_4px_0px_#000]"
                            style={{ backgroundColor: page.accent }}
                        >
                            {page.kicker}
                        </span>
                        <h1 className="text-[2rem] sm:text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter leading-[0.95] mb-8 break-words">
                            {page.h1}
                        </h1>
                        <p className="text-base md:text-xl font-bold leading-relaxed max-w-3xl mb-10 text-black/80">{page.intro}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact/"
                                className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#A855F7] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                            >
                                Get a Free Consultation <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/seo-checker/"
                                className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm brutalist-border shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all flex items-center justify-center"
                            >
                                Free SEO Audit
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Deliverables */}
                <section className="py-12 md:py-20 border-b-[4px] border-black">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">What You Get</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {page.deliverables.map((d) => (
                                <li key={d} className="flex items-start gap-3 bg-white brutalist-border p-4 shadow-[4px_4px_0px_#000]">
                                    <CheckCircle2 size={22} className="shrink-0 mt-0.5" style={{ color: accentText }} />
                                    <span className="font-bold text-sm md:text-base">{d}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Body sections */}
                <section className="py-12 md:py-20 border-b-[4px] border-black bg-white">
                    <div className="container mx-auto px-6 max-w-4xl space-y-12">
                        {page.sections.map((s) => (
                            <article key={s.heading}>
                                <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter mb-4">{s.heading}</h2>
                                {s.body.map((p, i) => (
                                    <p key={i} className="text-base md:text-lg leading-relaxed text-black/80 mb-4 font-medium">{p}</p>
                                ))}
                            </article>
                        ))}
                    </div>
                </section>

                {/* Process */}
                <section className="py-12 md:py-20 border-b-[4px] border-black">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">How We Work</h2>
                        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {page.process.map((p, i) => (
                                <li key={p.step} className="bg-white brutalist-border p-6 shadow-[6px_6px_0px_#000]">
                                    <span className="font-heading font-black text-4xl" style={{ color: accentText }}>0{i + 1}</span>
                                    <h3 className="font-heading font-black uppercase text-xl mt-2 mb-2">{p.step}</h3>
                                    <p className="text-sm font-medium text-black/70 leading-relaxed">{p.detail}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-12 md:py-20 border-b-[4px] border-black bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {page.faqs.map((f) => (
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

                {/* Related */}
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter mb-5">Related Services</h2>
                            <ul className="space-y-3">
                                {related.map((r) => r && (
                                    <li key={r.slug}>
                                        <Link href={`/services/${r.slug}/`} className="font-black uppercase tracking-wider text-sm hover:text-accent flex items-center gap-2">
                                            <ArrowRight size={16} /> {r.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href="/case-studies/" className="font-black uppercase tracking-wider text-sm hover:text-accent flex items-center gap-2">
                                        <ArrowRight size={16} /> See Our Case Studies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter mb-5">Read More</h2>
                            <ul className="space-y-3">
                                {posts.map((p) => p && (
                                    <li key={p.slug}>
                                        <Link href={`/blog/${p.slug}/`} className="font-bold text-sm md:text-base hover:text-accent flex items-start gap-2">
                                            <ArrowRight size={16} className="mt-1 shrink-0" /> {p.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
