'use client';

import { useState } from 'react';
import { Star, Heart, Share2, Check, X, Shield, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    brand: string;
    price: string;
    originalPrice?: string;
    inStock: boolean;
    rating: number;
    reviews: number;
    description: string;
    features: string[];
    specifications: Record<string, string>;
  };
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('description');

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
          <Badge 
            variant={product.inStock ? "default" : "secondary"} 
            className={product.inStock ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          >
            {product.inStock ? "En stock" : "Rupture"}
          </Badge>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm font-medium ml-2">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} avis)</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl font-bold text-blue-600">{product.price}</span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
          )}
          {product.originalPrice && (
            <Badge className="bg-red-600 hover:bg-red-700">
              Promotion
            </Badge>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button asChild size="lg" className="flex-1" disabled={!product.inStock}>
          <Link href={ROUTES.contact}>
            <Phone className="h-4 w-4 mr-2" />
            Nous Contacter
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Service Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-y border-gray-200">
        <div className="flex items-center space-x-3">
          <Shield className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-sm">Garantie Officielle</p>
            <p className="text-xs text-gray-500">2 ans constructeur</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Truck className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium text-sm">Livraison Rapide</p>
            <p className="text-xs text-gray-500">24-48h partout</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-purple-600" />
          <div>
            <p className="font-medium text-sm">Support Expert</p>
            <p className="text-xs text-gray-500">Conseil personnalisé</p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="features">Caractéristiques</TabsTrigger>
          <TabsTrigger value="specifications">Spécifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-900">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}