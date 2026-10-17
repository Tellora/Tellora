import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    // One rule group for every crawler. Do NOT block /_next/: Google needs the
    // JS/CSS bundles to render the site. A second group for Googlebot would
    // also make it ignore the disallow list below.
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/preview/', '/instagram-preview/', '/ig-preview/'],
            },
        ],
        sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
        host: SEO_CONFIG.siteUrl,
    };
}
