'use client';

import Link from 'next/link';
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export function CTASection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prêt à Trouver Votre Smartphone Idéal ?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Notre équipe d'experts est là pour vous conseiller et vous accompagner 
            dans le choix de vos équipements mobiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact par téléphone */}
          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Appelez-nous</h3>
            <p className="text-gray-400 mb-4">Conseil immédiat par téléphone</p>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-600">
              <a href="tel:0123456789">
                01 23 45 67 89
              </a>
            </Button>
          </div>

          {/* Contact par email */}
          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Écrivez-nous</h3>
            <p className="text-gray-400 mb-4">Réponse sous 24h garantie</p>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-600">
              <Link href={ROUTES.contact}>
                Formulaire de contact
              </Link>
            </Button>
          </div>

          {/* Demande de rappel */}
          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Demande de rappel</h3>
            <p className="text-gray-400 mb-4">On vous rappelle gratuitement</p>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-600">
              <Link href={ROUTES.contact}>
                Être rappelé
              </Link>
            </Button>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href={ROUTES.catalogue}>
                Découvrir Nos Produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link href={ROUTES.contact}>
                Demander un Devis Personnalisé
              </Link>
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            <strong className="text-white">Ouvert du lundi au vendredi de 9h à 18h</strong> - 
            Samedi de 10h à 17h - Fermé le dimanche
          </p>
          <p className="text-gray-500 mt-2">
            📍 123 Rue de la Tech, 75001 Paris | 🚇 Métro Châtelet-Les Halles (Ligne 1, 4, 7, 11, 14)
          </p>
        </div>
      </div>
    </section>
  );
}