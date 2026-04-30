import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/preview/', '/instagram-preview/', '/ig-preview/', '/_next/'],
            },
            {
                userAgent: ['Googlebot', 'Bingbot'],
                allow: '/',
            }
        ],
        sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    };
}
