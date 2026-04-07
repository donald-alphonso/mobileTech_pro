'use client';

import { Users, Award, Clock, Shield, Heart, Smartphone } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Users,
      title: '15 Ans d\'Expérience',
      description: 'Une expertise reconnue dans le domaine de la téléphonie mobile et des nouvelles technologies.'
    },
    {
      icon: Award,
      title: 'Produits Certifiés',
      description: 'Tous nos smartphones et accessoires sont authentiques avec garantie officielle constructeur.'
    },
    {
      icon: Clock,
      title: 'Service Rapide',
      description: 'Réponse sous 24h, livraison express et prise en charge immédiate de vos demandes.'
    },
    {
      icon: Shield,
      title: 'Garantie Étendue',
      description: 'Protection complète avec garantie étendue et service après-vente de qualité.'
    },
    {
      icon: Heart,
      title: 'Conseil Personnalisé',
      description: 'Notre équipe d\'experts vous accompagne pour trouver le produit parfait selon vos besoins.'
    },
    {
      icon: Smartphone,
      title: 'Dernières Nouveautés',
      description: 'Accès privilégié aux derniers modèles et innovations du marché de la téléphonie.'
    }
  ];

  const stats = [
    { number: '15+', label: 'Années d\'expérience' },
    { number: '5000+', label: 'Clients satisfaits' },
    { number: '500+', label: 'Références produits' },
    { number: '98%', label: 'Taux de satisfaction' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir MobileTech Pro ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous sommes votre partenaire de confiance pour tous vos besoins 
            en téléphonie mobile et accessoires high-tech.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <reason.icon className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-4xl mb-6">"</div>
            <blockquote className="text-xl lg:text-2xl font-light italic mb-6">
              Excellent service ! L'équipe de MobileTech Pro m'a parfaitement conseillé pour l'achat 
              de mon nouveau smartphone. Livraison rapide et suivi personnalisé. Je recommande vivement !
            </blockquote>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>
            <cite className="block mt-4 text-blue-200">
              - Sarah M., Cliente depuis 3 ans
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}