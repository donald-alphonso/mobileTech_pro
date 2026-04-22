'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Percent, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/routes';

export function PromotionSection() {
  const [endDate] = useState<string>(() =>
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
  );

  const promotions = [
    {
      id: 1,
      title: 'Offre Flash iPhone',
      description: 'Jusqu\'à 200€ de remise sur les iPhone 15',
      discount: '-200€',
      image: '/images/promotions/iphone-flash.jpg',
      endDate,
      isFlash: true
    },
    {
      id: 2,
      title: 'Pack Accessoires',
      description: 'Coque + Verre trempé + Chargeur',
      discount: '-30%',
      image: '/images/promotions/pack-accessoires.jpg',
      endDate,
      isFlash: false
    }
  ];

  const advantages = [
    {
      icon: Percent,
      title: 'Promotions Exclusives',
      description: 'Jusqu\'à -40% sur une sélection de produits'
    },
    {
      icon: Gift,
      title: 'Offres Bundles',
      description: 'Packs smartphone + accessoires à prix réduit'
    },
    {
      icon: Clock,
      title: 'Ventes Flash',
      description: 'Offres limitées dans le temps'
    },
    {
      icon: Zap,
      title: 'Nouveautés',
      description: 'Soyez les premiers à découvrir nos nouveaux produits'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Promotions & Offres Spéciales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ne manquez pas nos offres exceptionnelles sur les derniers smartphones et accessoires
          </p>
        </div>

        {/* Featured Promotions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="absolute inset-0">
                <div
                  role="img"
                  aria-label={promo.title}
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${promo.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-800/70" />
              </div>

              <div className="relative z-10 p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {promo.isFlash && (
                      <Badge className="bg-red-600 hover:bg-red-700 mb-3">
                        <Zap className="h-3 w-3 mr-1" />
                        Offre Flash
                      </Badge>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-blue-100 mb-4">{promo.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-yellow-400">
                      {promo.discount}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-blue-200">
                    <Clock className="h-4 w-4 mr-1" />
                    Jusqu'au {new Date(promo.endDate).toLocaleDateString('fr-FR')}
                  </div>
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    Découvrir l'offre
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <advantage.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{advantage.title}</h3>
              <p className="text-sm text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href={ROUTES.catalogue}>
              Voir Toutes les Promotions
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}