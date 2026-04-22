'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured, type Product } from '@/lib/supabase';
import { Star, Heart, Grid3x3 as Grid3X3, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { productPath } from '@/lib/routes';

interface ProductGridProps {
  filters?: {
    categories: string[];
    brands: string[];
    priceRange: number[];
    inStockOnly: boolean;
    searchQuery?: string;
  };
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase not configured. Using mock data.');
        // Mock data for development when Supabase is not configured
        setProducts([
          {
            id: 1,
            name: 'iPhone 15 Pro Max 256GB',
            brand: 'Apple',
            price: 1299,
            original_price: 1399,
            description: 'Le nouveau iPhone 15 Pro Max offre des performances exceptionnelles.',
            features: ['Écran Super Retina XDR 6,7"', 'Puce A17 Pro ultra-rapide'],
            specifications: { 'Écran': '6,7" Super Retina XDR OLED' },
            images: ['/images/products/placeholder.jpg'],
            category: 'smartphones',
            in_stock: true,
            rating: 4.8,
            reviews_count: 156,
            slug: 'iphone-15-pro-max',
            is_featured: true,
            is_promotion: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Samsung Galaxy S24 Ultra',
            brand: 'Samsung',
            price: 1179,
            original_price: null,
            description: 'Le Galaxy S24 Ultra redéfinit l\'excellence mobile.',
            features: ['Écran Dynamic AMOLED 2X 6,8"', 'S Pen intégré'],
            specifications: { 'Écran': '6,8" Dynamic AMOLED 2X' },
            images: ['/images/products/placeholder.jpg'],
            category: 'smartphones',
            in_stock: true,
            rating: 4.7,
            reviews_count: 89,
            slug: 'galaxy-s24-ultra',
            is_featured: true,
            is_promotion: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ] as Product[]);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrage et tri des produits
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply filters if provided
    if (filters) {
      // Filter by categories
      if (filters.categories.length > 0) {
        filtered = filtered.filter(product => 
          filters.categories.includes(product.category)
        );
      }
      
      // Filter by brands
      if (filters.brands.length > 0) {
        filtered = filtered.filter(product => 
          filters.brands.some(brand => 
            product.brand.toLowerCase() === brand.toLowerCase()
          )
        );
      }
      
      // Filter by price range
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) {
        filtered = filtered.filter(product => {
          const price = product.price;
          return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        });
      }
      
      // Filter by stock availability
      if (filters.inStockOnly) {
        filtered = filtered.filter(product => product.in_stock);
      }

      // Filter by search query (name + brand)
      const q = filters.searchQuery?.trim().toLowerCase();
      if (q) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q)
        );
      }
    }
    
    // Sort the filtered products
    switch (sortBy) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'name':
      default:
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [products, sortBy, filters]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <div className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
      <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
        {/* Product Badge */}
        {product.is_promotion && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-red-600 hover:bg-red-700 text-white">
              Promo
            </Badge>
          </div>
        )}

        {/* Stock Status */}
        {!product.in_stock && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="bg-gray-500 text-white">
              Rupture
            </Badge>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>

        {/* Product Image */}
        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'h-full' : 'h-full'}`}>
          <div
            role="img"
            aria-label={product.name}
            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url(${product.images[0] || '/images/products/placeholder.jpg'})` }}
          />
          {!product.in_stock && (
            <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center">
              <span className="text-white font-semibold">Rupture de stock</span>
            </div>
          )}
        </div>
      </div>

      <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
        {/* Brand & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews_count})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
          {product.name}
        </h3>

        <div className={viewMode === 'list' ? 'flex items-center justify-between' : ''}>
          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg font-bold text-blue-600">{product.price}€</span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">{product.original_price}€</span>
            )}
          </div>

          {/* Actions */}
          <div className={`flex gap-2 ${viewMode === 'list' ? 'ml-4' : ''}`}>
            <Button asChild variant="outline" size="sm" className="flex-1" disabled={!product.in_stock}>
              <Link href={productPath(product.slug)}>
                Voir Détails
              </Link>
            </Button>
            <Button asChild size="sm" className="flex-1" disabled={!product.in_stock}>
              <Link href={`${productPath(product.slug)}#contact`}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with view controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-600">
            <span className="font-medium">{filteredAndSortedProducts.length}</span> produits trouvés
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Sort */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Trier par nom</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Meilleures notes</option>
          </select>

          {/* View Mode */}
          <div className="flex rounded-md border border-gray-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className="w-10"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}

      {!isLoading && filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Aucun produit ne correspond à vos critères.</p>
          <Button onClick={() => window.location.reload()}>
            Actualiser
          </Button>
        </div>
      )}
    </div>
  );
}