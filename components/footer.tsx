import Link from 'next/link';
import { Smartphone, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl text-white">MobileTech Pro</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre spécialiste smartphones et accessoires depuis 15 ans à Paris. 
              Conseil expert, garantie officielle, service premium.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/catalogue" className="hover:text-white transition-colors">Catalogue</Link></li>
              <li><Link href="/a-propos" className="hover:text-white transition-colors">À Propos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Nos Produits</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/catalogue?category=smartphones" className="hover:text-white transition-colors">Smartphones</Link></li>
              <li><Link href="/catalogue?category=coques" className="hover:text-white transition-colors">Coques & Protection</Link></li>
              <li><Link href="/catalogue?category=ecouteurs" className="hover:text-white transition-colors">Écouteurs</Link></li>
              <li><Link href="/catalogue?category=chargeurs" className="hover:text-white transition-colors">Chargeurs</Link></li>
              <li><Link href="/catalogue?category=accessoires" className="hover:text-white transition-colors">Accessoires</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>123 Rue de la Tech<br />75001 Paris, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>contact@mobiletech-pro.fr</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <p>Lun-Ven: 9h00 - 18h00</p>
              <p>Sam: 10h00 - 17h00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 MobileTech Pro SARL. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
              <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
              <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
            <p>SARL au capital de 10 000€ • SIRET: 123 456 789 00012 • RCS Paris B 123 456 789</p>
          </div>
        </div>
      </div>
    </footer>
  );
}