import { MetadataRoute } from 'next';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ROUTES, productPath } from '@/lib/routes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mobiletech-pro.fr';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}${ROUTES.home}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}${ROUTES.catalogue}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.about}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.contact}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.legal}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}${ROUTES.privacy}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}${ROUTES.cgv}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const fallbackProductSlugs = ['iphone-15-pro-max', 'galaxy-s24-ultra'];
  let productSlugs: string[] = fallbackProductSlugs;

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from('products').select('slug');
    if (!error && data) {
      productSlugs = (data as { slug: string }[]).map((p) => p.slug);
    }
  }

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}${productPath(slug)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
