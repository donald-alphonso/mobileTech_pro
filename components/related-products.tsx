'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase, isSupabaseConfigured, type Product } from '@/lib/supabase';
import { ROUTES, productPath } from '@/lib/routes';

interface RelatedProductsProps {
  currentCategory: string;
  currentProductId: number;
}

const MOCK_RELATED: Product[] = [
  {
    id: -1,
    name: 'iPhone 15 Pro 128GB',
    brand: 'Apple',
    price: 1099,
    description: '',
    features: [],
    specifications: {},
    images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
    category: 'smartphones',
    in_stock: true,
    rating: 4.7,
    reviews_count: 89,
    slug: 'iphone-15-pro',
    is_featured: false,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: -2,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1179,
    original_price: 1299,
    description: '',
    features: [],
    specifications: {},
    images: ['https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'],
    category: 'smartphones',
    in_stock: true,
    rating: 4.6,
    reviews_count: 124,
    slug: 'galaxy-s24-ultra',
    is_featured: false,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: -3,
    name: 'AirPods Pro (3eme generation)',
    brand: 'Apple',
    price: 279,
    original_price: 329,
    description: '',
    features: [],
    specifications: {},
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    category: 'accessoires',
    in_stock: true,
    rating: 4.9,
    reviews_count: 234,
    slug: 'airpods-pro-3',
    is_featured: false,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function RelatedProducts({ currentCategory, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (!isSupabaseConfigured() || !supabase) {
          setProducts(
            MOCK_RELATED.filter((p) => p.id !== currentProductId).slice(0, 3)
          );
          return;
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', currentCategory)
          .neq('id', currentProductId)
          .limit(4);

        if (error) throw error;
        setProducts((data as Product[]) || []);
      } catch (err) {
        console.error('Erreur lors du chargement des produits similaires:', err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [currentCategory, currentProductId]);

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Produits Similaires
          </h2>
          <p className="text-gray-600">
            Decouvrez d&apos;autres produits qui pourraient vous interesser
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Produits Similaires
        </h2>
        <p className="text-gray-600">
          Decouvrez d&apos;autres produits qui pourraient vous interesser
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              {product.original_price && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white">
                    Promo
                  </Badge>
                </div>
              )}

              <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
              </button>

              <div className="aspect-square relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${product.images[0] || 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'})` }}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews_count})</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold text-blue-600">{product.price}€</span>
                {product.original_price && (
                  <span className="text-sm text-gray-500 line-through">{product.original_price}€</span>
                )}
              </div>

              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={productPath(product.slug)}>
                    Voir Details
                  </Link>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link href={`${productPath(product.slug)}#contact`}>
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button asChild variant="outline" size="lg">
          <Link href={ROUTES.catalogue}>
            Voir Plus de Produits
          </Link>
        </Button>
      </div>
    </section>
  );
}
