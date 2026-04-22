export const ROUTES = {
  home: '/',
  catalogue: '/catalogue',
  contact: '/contact',
  about: '/a-propos',
  cgv: '/cgv',
  legal: '/mentions-legales',
  privacy: '/politique-confidentialite',
  admin: '/admin',
  adminLogin: '/admin/login',
} as const;

export const productPath = (slug: string) => `/produit/${slug}`;

export const catalogueWithCategory = (categorySlug: string) =>
  `/catalogue?category=${encodeURIComponent(categorySlug)}`;

export const catalogueWithSearch = (query: string) =>
  `/catalogue?q=${encodeURIComponent(query)}`;

export const contactWithProduct = (productName: string) =>
  `/contact?product=${encodeURIComponent(productName)}`;
