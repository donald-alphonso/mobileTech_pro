import { describe, it, expect } from 'vitest';
import {
  ROUTES,
  productPath,
  catalogueWithCategory,
  catalogueWithSearch,
  contactWithProduct,
} from '@/lib/routes';

describe('ROUTES constants', () => {
  it('exposes the expected static routes', () => {
    expect(ROUTES.home).toBe('/');
    expect(ROUTES.catalogue).toBe('/catalogue');
    expect(ROUTES.contact).toBe('/contact');
    expect(ROUTES.about).toBe('/a-propos');
    expect(ROUTES.cgv).toBe('/cgv');
    expect(ROUTES.legal).toBe('/mentions-legales');
    expect(ROUTES.privacy).toBe('/politique-confidentialite');
    expect(ROUTES.admin).toBe('/admin');
    expect(ROUTES.adminLogin).toBe('/admin/login');
  });
});

describe('productPath', () => {
  it('builds a product URL from a slug', () => {
    expect(productPath('iphone-15-pro-max')).toBe('/produit/iphone-15-pro-max');
  });

  it('handles short slugs', () => {
    expect(productPath('a')).toBe('/produit/a');
  });
});

describe('catalogueWithCategory', () => {
  it('builds a catalogue URL with a category query param', () => {
    expect(catalogueWithCategory('smartphones')).toBe('/catalogue?category=smartphones');
  });

  it('encodes special characters in the category slug', () => {
    expect(catalogueWithCategory('coques & étuis')).toBe(
      '/catalogue?category=coques%20%26%20%C3%A9tuis',
    );
  });
});

describe('catalogueWithSearch', () => {
  it('builds a catalogue search URL with q query param', () => {
    expect(catalogueWithSearch('iphone')).toBe('/catalogue?q=iphone');
  });

  it('encodes special characters in the search query', () => {
    expect(catalogueWithSearch('iphone & samsung')).toBe('/catalogue?q=iphone%20%26%20samsung');
  });

  it('encodes accented characters', () => {
    expect(catalogueWithSearch('téléphone')).toBe('/catalogue?q=t%C3%A9l%C3%A9phone');
  });
});

describe('contactWithProduct', () => {
  it('builds a contact URL with the product name encoded', () => {
    expect(contactWithProduct('iPhone 15 Pro Max')).toBe('/contact?product=iPhone%2015%20Pro%20Max');
  });
});
