import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/preview/', '/instagram-preview/', '/ig-preview/'],
        },
        sitemap: 'https://tellora.media/sitemap.xml',
    };
}
