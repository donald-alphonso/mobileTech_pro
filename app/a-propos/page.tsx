import { TeamSection } from '@/components/team-section';
import { CompanyValues } from '@/components/company-values';
import { CompanyHistory } from '@/components/company-history';
import { Breadcrumb } from '@/components/breadcrumb';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'À Propos - MobileTech Pro | Notre Histoire & Équipe',
  description: 'Découvrez MobileTech Pro, spécialiste en téléphones portables depuis 15 ans. Rencontrez notre équipe d\'experts passionnés.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Accueil', href: ROUTES.home },
          { label: 'À Propos', href: ROUTES.about }
        ]} />

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            À Propos de MobileTech Pro
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Depuis plus de 15 ans, MobileTech Pro accompagne les particuliers et professionnels 
            dans le choix de leurs équipements mobiles. Notre expertise et notre passion pour 
            l'innovation technologique font de nous votre partenaire de confiance.
          </p>
        </div>

        <CompanyHistory />
        <CompanyValues />
        <TeamSection />
      </div>
    </div>
  );
}