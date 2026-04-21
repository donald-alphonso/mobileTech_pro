'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Smartphone, Shield, Truck, Headphones as HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: 'Découvrez les Derniers Smartphones',
      subtitle: 'iPhone 15, Samsung Galaxy S24, et plus encore',
      description: 'Profitez de nos conseils experts et trouvez le smartphone parfait pour vos besoins',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      cta: 'Voir le Catalogue'
    },
    {
      title: 'Accessoires Premium',
      subtitle: 'Protection et style pour votre mobile',
      description: 'Coques, écouteurs, chargeurs sans fil... Tout pour sublimer votre smartphone',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      cta: 'Découvrir'
    },
    {
      title: 'Service Expert & Personnalisé',
      subtitle: 'Conseil gratuit et accompagnement',
      description: 'Notre équipe d\'experts vous guide dans le choix de vos équipements mobiles',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      cta: 'Nous Contacter'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const features = [
    { icon: Shield, label: 'Garantie Officielle', desc: 'Tous nos produits' },
    { icon: Truck, label: 'Livraison Rapide', desc: '24-48h partout' },
    { icon: HeadphonesIcon, label: 'Support Expert', desc: 'Conseil personnalisé' },
    { icon: Smartphone, label: '15 Ans d\'Expérience', desc: 'Votre spécialiste' }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Hero Slider */}
      <div className="relative h-[80vh] min-h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 z-10" />
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-2xl lg:text-3xl font-light text-blue-100">
                  {slide.subtitle}
                </h2>
                <p className="text-lg lg:text-xl text-blue-50 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Link href={ROUTES.catalogue}>
                      {slide.cta}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <Link href={ROUTES.contact}>
                      Demander un Devis
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 text-center lg:text-left">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.label}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}