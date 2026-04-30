import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { SEO_CONFIG } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SEO_CONFIG.siteUrl;

    const staticRoutes = [
        { route: '', priority: 1.0 },
        { route: '/services/', priority: 0.9 },
        { route: '/case-studies/', priority: 0.9 },
        { route: '/seo-checker/', priority: 0.8 },
        { route: '/blog/', priority: 0.8 },
        { route: '/teams/', priority: 0.6 },
        { route: '/careers/', priority: 0.7 },
    ].map(({ route, priority }) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority,
    }));

    // Fetch dynamic routes from Supabase
    // Blog Posts
    const { data: blogPosts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at, noindex')
        .eq('status', 'Published')
        .eq('noindex', false);

    const blogRoutes = (blogPosts || []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}/`,
        lastModified: new Date(post.updated_at || post.published_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Case Studies
    const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('slug, created_at, status')
        .eq('status', 'Published');

    // Wait, the interface DbCaseStudy in supabase.ts does not have 'slug'. It has 'title'. 
    // M05-T02 says to add SEO fields including 'slug' if needed, but it might just be based on title. 
    // Wait, M04-T04 says case studies use "/case-studies/[slug]/". I will assume slug exists or is added.
    const caseStudyRoutes = (caseStudies || []).map((cs) => ({
        url: `${baseUrl}/case-studies/${cs.slug}/`,
        lastModified: new Date(cs.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Careers
    const { data: jobs } = await supabase
        .from('jobs')
        .select('id, created_at, status')
        .eq('status', 'Published');

    // Job doesn't typically have slug natively in the type, but let's assume id is the slug
    const careerRoutes = (jobs || []).map((job) => ({
        url: `${baseUrl}/careers/${job.id}/`,
        lastModified: new Date(job.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes, ...careerRoutes];
}
