import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { SEO_CONFIG, US_PAGES_LIVE } from '@/lib/seo';
import { servicePages } from '@/data/service-pages';
import { staticBlogPosts } from '@/data/blog-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SEO_CONFIG.siteUrl.replace(/\/$/, '');

    // ── All Public Static Routes of Current Website ──
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/services/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/case-studies/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/seo-checker/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/careers/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/teams/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // ── Service landing pages & authored blog articles ──
    const servicePageRoutes: MetadataRoute.Sitemap = servicePages.map((s) => ({
        url: `${baseUrl}/services/${s.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));
    const staticBlogRoutes: MetadataRoute.Sitemap = staticBlogPosts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}/`,
        lastModified: new Date(`${p.date}T00:00:00Z`),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // ── US pages: only listed once published (see US_PAGES_LIVE in src/lib/seo.ts) ──
    const usRoutes: MetadataRoute.Sitemap = US_PAGES_LIVE
        ? [
              { url: `${baseUrl}/us/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
              { url: `${baseUrl}/for-electrical-contractors/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
          ]
        : [];

    // ── Dynamic Routes from Database ──
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const { data: blogPosts } = await supabase
            .from('blog_posts')
            .select('slug, updated_at, published_at, noindex')
            .eq('status', 'Published')
            .eq('noindex', false);

        blogRoutes = (blogPosts || [])
            .filter((post) => Boolean(post.slug))
            .map((post) => ({
                url: `${baseUrl}/blog/${post.slug}/`,
                lastModified: new Date(post.updated_at || post.published_at || new Date()),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));
    } catch {
        // Fallback gracefully if table not yet present
    }

    let caseStudyRoutes: MetadataRoute.Sitemap = [];
    try {
        const { data: caseStudies } = await supabase
            .from('case_studies')
            .select('slug, created_at, status')
            .eq('status', 'Published');

        caseStudyRoutes = (caseStudies || [])
            .filter((cs) => Boolean(cs.slug))
            .map((cs) => ({
                url: `${baseUrl}/case-studies/${cs.slug}/`,
                lastModified: new Date(cs.created_at || new Date()),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            }));
    } catch {
        // Fallback gracefully
    }

    let careerRoutes: MetadataRoute.Sitemap = [];
    try {
        const { data: jobs } = await supabase
            .from('jobs')
            .select('id, created_at, status')
            .eq('status', 'Published');

        careerRoutes = (jobs || [])
            .filter((job) => Boolean(job.id))
            .map((job) => ({
                url: `${baseUrl}/careers/${job.id}/`,
                lastModified: new Date(job.created_at || new Date()),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));
    } catch {
        // Fallback gracefully
    }

    // De-duplicate in case a database post shares a slug with an authored article
    const seen = new Set<string>();
    return [...staticRoutes, ...usRoutes, ...servicePageRoutes, ...staticBlogRoutes, ...blogRoutes, ...caseStudyRoutes, ...careerRoutes].filter((r) => {
        if (seen.has(r.url)) return false;
        seen.add(r.url);
        return true;
    });
}

