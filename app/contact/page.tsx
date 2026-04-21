import ContactForm from '@/components/contact-form';
import { ContactInfo } from '@/components/contact-info';
import { Breadcrumb } from '@/components/breadcrumb';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'Contact - MobileTech Pro | Nous Contacter',
  description: 'Contactez MobileTech Pro pour vos questions sur nos smartphones et accessoires. Devis personnalisé et conseil expert.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Accueil', href: ROUTES.home },
          { label: 'Contact', href: ROUTES.contact }
        ]} />

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Nous Contacter
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Une question ? Un besoin spécifique ? Notre équipe d'experts est là pour vous conseiller 
            et vous accompagner dans le choix de vos équipements mobiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
          
          <div className="space-y-6">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}