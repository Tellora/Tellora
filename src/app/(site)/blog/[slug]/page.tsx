import { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import BlogPostingSchema from "@/components/seo/schema/BlogPostingSchema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateStaticParams() {
    // Note: We don't have a blog table yet, but this is the scaffold
    const { data: posts } = await supabase
        .from("blog_posts")
        .select("slug")
        .eq("status", "Published");

    const routes = (posts || []).map((post) => ({
        slug: post.slug,
    }));

    if (routes.length === 0) {
        return [{ slug: "placeholder" }];
    }
    return routes;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", params.slug)
        .single();

    if (!post) {
        return {
            title: "Post Not Found | Tellora Media Blog",
        };
    }

    const title = post.seo_title || `${post.title} | Tellora Media Blog`;
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
            <main className="pt-40 pb-32 container mx-auto px-6">
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
