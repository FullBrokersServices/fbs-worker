import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = 'https://fbsbroker.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemap: MetadataRoute.Sitemap = [];

    // Generate URLs for all locales and routes
    routing.locales.forEach((locale) => {
        // Base route
        sitemap.push({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        });

        // Core routes
        const routes = [
            'servicios',
            'como-funciona',
            'arquetipos',
            'confianza',
            'faq',
            'contacto',
            'cotizar'
        ];

        routes.forEach((route) => {
            sitemap.push({
                url: `${baseUrl}/${locale}/${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        });
    });

    return sitemap;
}
