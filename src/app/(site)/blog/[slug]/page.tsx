import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import BlogPostingSchema from "@/components/seo/schema/BlogPostingSchema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { staticBlogPosts, getStaticPost, formatPostDate } from "@/data/blog-posts";
import { getServicePage } from "@/data/service-pages";
import BreadcrumbSchema from "@/components/seo/schema/BreadcrumbSchema";

export async function generateStaticParams() {
    // Note: We don't have a blog table yet, but this is the scaffold
    const { data: posts } = await supabase
        .from("blog_posts")
        .select("slug")
        .eq("status", "Published");

    const dbRoutes = (posts || []).map((post) => ({
        slug: post.slug,
    }));
    const staticRoutes = staticBlogPosts.map((post) => ({ slug: post.slug }));
    const seen = new Set<string>();
    return [...staticRoutes, ...dbRoutes].filter((r) => {
        if (!r.slug || seen.has(r.slug)) return false;
        seen.add(r.slug);
        return true;
    });
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const staticPost = getStaticPost(params.slug);
    if (staticPost) {
        const url = getCanonicalUrl(`/blog/${staticPost.slug}/`);
        return {
            title: staticPost.seoTitle,
            description: staticPost.seoDescription,
            alternates: { canonical: url },
            openGraph: {
                title: staticPost.seoTitle,
                description: staticPost.seoDescription,
                url,
                type: "article",
                publishedTime: staticPost.date,
                images: [{ url: staticPost.image, width: 1200, height: 630, alt: staticPost.title }],
                siteName: SEO_CONFIG.siteName,
                locale: SEO_CONFIG.locale,
            },
            twitter: {
                card: "summary_large_image",
                title: staticPost.seoTitle,
                description: staticPost.seoDescription,
                images: [staticPost.image],
            },
        };
    }
    const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", params.slug)
        .single();

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    const title = post.seo_title || `${post.title} | Blog`;
    const description = post.seo_description || (post.content?.substring(0, 155) || SEO_CONFIG.defaultDescription);

    return {
        title,
        description,
        alternates: {
            canonical: getCanonicalUrl(`/blog/${params.slug}/`),
        },
        openGraph: {
            title,
            description,
            url: getCanonicalUrl(`/blog/${params.slug}/`),
            type: "article",
            images: [
                {
                    url: post.image_url || SEO_CONFIG.defaultOGImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            siteName: SEO_CONFIG.siteName,
            locale: SEO_CONFIG.locale,
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const staticPost = getStaticPost(params.slug);
    if (staticPost) {
        const url = getCanonicalUrl(`/blog/${staticPost.slug}/`);
        const service = getServicePage(staticPost.serviceSlug);
        const others = staticBlogPosts.filter((p) => p.slug !== staticPost.slug).slice(0, 3);
        return (
            <div className="bg-white text-black min-h-screen selection:bg-primary selection:text-white">
                <Header />
                <BlogPostingSchema
                    post={{
                        title: staticPost.title,
                        description: staticPost.seoDescription,
                        url,
                        datePublished: staticPost.date,
                        image: staticPost.image,
                    }}
                />
                <BreadcrumbSchema
                    items={[
                        { name: "Home", url: `${SEO_CONFIG.siteUrl}/` },
                        { name: "Blog", url: getCanonicalUrl("/blog/") },
                        { name: staticPost.title, url },
                    ]}
                />
                <main className="pt-32 md:pt-40 pb-16 container mx-auto px-6">
                    <article className="max-w-4xl mx-auto space-y-10 mb-16 md:mb-24">
                        <header className="space-y-6 text-center border-b-[4px] border-black pb-10">
                            <nav aria-label="Breadcrumb" className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                                <Link href="/" className="hover:text-primary">Home</Link> / <Link href="/blog/" className="hover:text-primary">Blog</Link>
                            </nav>
                            <span className="inline-block px-4 py-1.5 bg-primary brutalist-border text-[10px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0px_#000]">{staticPost.category}</span>
                            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] break-words">
                                {staticPost.title}
                            </h1>
                            <p className="text-[11px] font-black uppercase tracking-widest text-black/60">
                                By Tellora Media · <time dateTime={staticPost.date}>{formatPostDate(staticPost.date)}</time> · {staticPost.readTime}
                            </p>
                        </header>
                        <div className="article-content">
                            <div dangerouslySetInnerHTML={{ __html: staticPost.content }} />
                        </div>
                        {service && (
                            <aside className="bg-primary brutalist-border shadow-[8px_8px_0px_#000] p-6 md:p-10">
                                <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter mb-3">Need help with this?</h2>
                                <p className="font-bold mb-6">Talk to the Tellora Media team about {service.serviceName} for your business.</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href={`/services/${service.slug}/`} className="px-6 py-3 bg-black text-white font-black uppercase tracking-widest text-xs brutalist-border text-center">Explore the service</Link>
                                    <Link href="/contact/" className="px-6 py-3 bg-white text-black font-black uppercase tracking-widest text-xs brutalist-border text-center">Get a free consultation</Link>
                                </div>
                            </aside>
                        )}
                    </article>
                    <section className="border-t-[4px] border-black pt-12 md:pt-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-center">
                            CONTINUE <span className="text-primary italic">LEARNING</span>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                            {others.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/blog/${item.slug}/`}
                                    className="group flex flex-col bg-white brutalist-border p-6 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#4AC0E4] hover:-translate-y-2 transition-all"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">{item.category}</span>
                                    <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", params.slug)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white text-black min-h-screen selection:bg-primary selection:text-white">
            <Header />
            <BlogPostingSchema 
                post={{
                    title: post.title,
                    description: post.content?.substring(0, 155),
                    url: getCanonicalUrl(`/blog/${params.slug}/`),
                    datePublished: post.created_at || new Date().toISOString(),
                    image: post.image_url,
                }} 
            />
            <main className="pt-40 pb-16 container mx-auto px-6">
                <article className="max-w-4xl mx-auto space-y-12 mb-32">
                    <header className="space-y-8 text-center border-b-[4px] border-black pb-12">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
                            {post.title}
                        </h1>
                    </header>
                    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter">
                        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                    </div>
                </article>

                {/* Related Analysis Section */}
                <RelatedPosts currentSlug={params.slug} />
            </main>
            <Footer />
        </div>
    );
}

async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
    const { data: related } = await supabase
        .from("blog_posts")
        .select("id, title, slug, image_url, category")
        .neq("slug", currentSlug)
        .eq("status", "Published")
        .limit(3);

    if (!related || related.length === 0) return null;

    return (
        <section className="border-t-[4px] border-black pt-24 mt-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
                CONTINUE <span className="text-primary italic">LEARNING</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {related.map((item) => (
                    <Link 
                        key={item.id} 
                        href={`/blog/${item.slug}/`}
                        className="group flex flex-col bg-white brutalist-border p-6 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#4AC0E4] hover:-translate-y-2 transition-all"
                    >
                        <div className="aspect-video mb-6 overflow-hidden brutalist-border">
                            <img 
                                src={item.image_url || SEO_CONFIG.defaultOGImage} 
                                alt={item.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">{item.category}</span>
                        <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
