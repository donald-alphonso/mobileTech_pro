import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RelatedProductsProps {
  currentProductId: number;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Simulation des produits similaires - à remplacer par une API/CMS
  const relatedProducts = [
    {
      id: 2,
      name: 'iPhone 15 Pro 128GB',
      brand: 'Apple',
      price: '1099€',
      originalPrice: null,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      rating: 4.7,
      reviews: 89,
      inStock: true,
      slug: 'iphone-15-pro'
    },
    {
      id: 3,
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      price: '1179€',
      originalPrice: '1299€',
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
      rating: 4.6,
      reviews: 124,
      inStock: true,
      slug: 'galaxy-s24-ultra'
    },
    {
      id: 4,
      name: 'AirPods Pro (3ème génération)',
      brand: 'Apple',
      price: '279€',
      originalPrice: '329€',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      slug: 'airpods-pro-3'
    },
    {
      id: 5,
      name: 'Coque iPhone 15 Pro MagSafe',
      brand: 'Apple',
      price: '59€',
      originalPrice: null,
      image: 'https://images.pexels.com/photos/1440722/pexels-photo-1440722.jpeg',
      rating: 4.5,
      reviews: 43,
      inStock: true,
      slug: 'coque-iphone-15-pro'
    }
  ].filter(product => product.id !== currentProductId);

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Produits Similaires
        </h2>
        <p className="text-gray-600">
          Découvrez d'autres produits qui pourraient vous intéresser
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              {/* Product Badge */}
              {product.originalPrice && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white">
                    Promo
                  </Badge>
                </div>
              )}

              {/* Favorite Button */}
              <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
              </button>

              {/* Product Image */}
              <div className="aspect-square relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${product.image})` }}
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
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold text-blue-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/produit/${product.slug}`}>
                    Voir Détails
                  </Link>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/produit/${product.slug}#contact`}>
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
          <Link href="/catalogue">
            Voir Plus de Produits
          </Link>
        </Button>
      </div>
    </section>
  );
}