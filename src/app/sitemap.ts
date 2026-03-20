import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tellora.media';

    const routes = [
        '',
        '/about',
        '/services',
        '/contact',
        '/seo-checker',
        '/case-studies',
        '/careers',
        '/blog',
    ].map((route) => {
        const priority = route === '' ? 1 :
            ['/services', '/about', '/contact', '/case-studies'].includes(route) ? 0.9 :
            ['/blog', '/careers', '/seo-checker'].includes(route) ? 0.8 : 0.7;

        return {
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority,
        };
    });

    return routes;
}
