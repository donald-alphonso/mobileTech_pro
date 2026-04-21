import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Chrome as Home, Search, Phone } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page non trouvée
          </h2>
          <p className="text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href={ROUTES.home}>
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href={ROUTES.catalogue}>
              <Search className="h-4 w-4 mr-2" />
              Voir le catalogue
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href={ROUTES.contact}>
              <Phone className="h-4 w-4 mr-2" />
              Nous contacter
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Besoin d'aide ? Contactez-nous au{' '}
            <a href="tel:0123456789" className="text-blue-600 hover:underline">
              01 23 45 67 89
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}