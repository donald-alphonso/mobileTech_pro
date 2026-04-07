'use client';

import Link from 'next/link';
import { Smartphone, Headphones, Battery, Shield } from 'lucide-react';

export function ProductCategories() {
  const categories = [
    {
      name: 'Smartphones',
      description: 'iPhone, Samsung, Huawei et plus',
      icon: Smartphone,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      href: '/catalogue?category=smartphones',
      count: '150+ modèles'
    },
    {
      name: 'Écouteurs & Audio',
      description: 'AirPods, écouteurs sans fil',
      icon: Headphones,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      href: '/catalogue?category=ecouteurs',
      count: '80+ références'
    },
    {
      name: 'Chargeurs & Batteries',
      description: 'Chargeurs rapides, batteries externes',
      icon: Battery,
      image: 'https://images.pexels.com/photos/163117/phone-cell-phone-mobile-phone-163117.jpeg',
      href: '/catalogue?category=chargeurs',
      count: '60+ produits'
    },
    {
      name: 'Protection & Coques',
      description: 'Coques, verres trempés, étuis',
      icon: Shield,
      image: 'https://images.pexels.com/photos/1440722/pexels-photo-1440722.jpeg',
      href: '/catalogue?category=protection',
      count: '200+ modèles'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Catégories de Produits
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements mobiles et d'accessoires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                    <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}