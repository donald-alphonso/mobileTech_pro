'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product-grid';
import { ProductFilters } from '@/components/product-filters';
import { Breadcrumb } from '@/components/breadcrumb';
import { ROUTES } from '@/lib/routes';

interface Filters {
  categories: string[];
  brands: string[];
  priceRange: number[];
  inStockOnly: boolean;
  searchQuery: string;
}

const DEFAULT_FILTERS: Filters = {
  categories: [],
  brands: [],
  priceRange: [0, 2000],
  inStockOnly: false,
  searchQuery: '',
};

function CatalogueContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  useEffect(() => {
    const category = searchParams?.get('category') ?? '';
    const q = searchParams?.get('q') ?? '';
    setFilters((prev) => ({
      ...prev,
      categories: category ? [category] : [],
      searchQuery: q,
    }));
  }, [searchParams]);

  const handleFiltersChange = (next: Omit<Filters, 'searchQuery'>) => {
    setFilters((prev) => ({ ...next, searchQuery: prev.searchQuery }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: ROUTES.home },
            { label: 'Catalogue', href: ROUTES.catalogue },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Notre Catalogue</h1>
          <p className="text-gray-600 text-lg">
            Découvrez notre sélection de smartphones et accessoires de qualité
          </p>
          {filters.searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Résultats pour : <span className="font-medium">{filters.searchQuery}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters
              initialCategories={filters.categories}
              onFiltersChange={handleFiltersChange}
            />
          </aside>
          <main className="flex-1">
            <ProductGrid filters={filters} />
          </main>
        </div>
      </div>
    </div>
  );
}

export function CatalogueClientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <CatalogueContent />
    </Suspense>
  );
}
