'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/product-grid';
import { ProductFilters } from '@/components/product-filters';
import { Breadcrumb } from '@/components/breadcrumb';

export function CatalogueClientPage() {
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 2000],
    inStockOnly: false
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Accueil', href: '/' },
          { label: 'Catalogue', href: '/catalogue' }
        ]} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Notre Catalogue
          </h1>
          <p className="text-gray-600 text-lg">
            Découvrez notre sélection de smartphones et accessoires de qualité
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters onFiltersChange={handleFiltersChange} />
          </aside>
          <main className="flex-1">
            <ProductGrid filters={filters} />
          </main>
        </div>
      </div>
    </div>
  );
}