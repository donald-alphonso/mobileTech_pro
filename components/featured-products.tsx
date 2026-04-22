'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, type Product } from '@/lib/supabase';
import Link from 'next/link';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES, productPath } from '@/lib/routes';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      if (!isSupabaseConfigured()) {
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
          }
        ] as Product[]);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des produits vedette:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Produits en Vedette
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection des meilleurs smartphones et accessoires du moment
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Produits en Vedette
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection des meilleurs smartphones et accessoires du moment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="relative">
                {/* Product Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge 
                    variant={product.is_promotion ? "secondary" : "default"}
                    className={`
                      ${product.is_promotion ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                      text-white
                    `}
                  >
                    {product.is_promotion ? 'Promo' : 'Vedette'}
                  </Badge>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>

                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden">
                  <div
                    role="img"
                    aria-label={product.name}
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${product.images[0] || '/images/products/placeholder.jpg'})` }}
                  />
                </div>
              </div>

              <div className="p-4">
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

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-blue-600">{product.price}€</span>
                  {product.original_price && (
                    <span className="text-sm text-gray-500 line-through">{product.original_price}€</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={productPath(product.slug)}>
                      Voir Détails
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <Link href={`${productPath(product.slug)}#contact`}>
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-600">
              <p className="mb-2">Aucun produit vedette pour le moment.</p>
              {!isSupabaseConfigured() && (
                <p className="text-sm text-orange-600">
                  ⚠️ Supabase non configuré. Veuillez configurer vos variables d'environnement.
                </p>
              )}
            </div>
          </div>
        )}

        {products.length > 0 && (
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href={ROUTES.catalogue}>
              Voir Tout le Catalogue
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
        )}
      </div>
    </section>
  );
}