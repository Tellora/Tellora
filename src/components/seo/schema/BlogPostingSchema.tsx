import { SEO_CONFIG } from "@/lib/seo";

export interface BlogPostSchemaProps {
    title: string;
    description?: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    image?: string;
}

export default function BlogPostingSchema({ post }: { post: BlogPostSchemaProps }) {
    if (!post) return null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description || SEO_CONFIG.defaultDescription,
        "url": post.url,
        "datePublished": post.datePublished,
        "dateModified": post.dateModified || post.datePublished,
        "author": {
            "@type": "Person",
            "name": post.authorName || SEO_CONFIG.organizationName,
            "url": `${SEO_CONFIG.siteUrl}/teams/`
        },
        "publisher": {
            "@type": "Organization",
            "name": SEO_CONFIG.organizationName,
            "logo": {
                "@type": "ImageObject",
                "url": `${SEO_CONFIG.siteUrl}/logo.png`
            }
        },
        "image": post.image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultOGImage}`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": post.url
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
