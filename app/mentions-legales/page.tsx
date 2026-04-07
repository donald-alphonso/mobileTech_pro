import { Breadcrumb } from '@/components/breadcrumb';

export const metadata = {
  title: 'Mentions Légales - MobileTech Pro',
  description: 'Consultez les mentions légales de MobileTech Pro, informations légales et réglementaires.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mentions Légales', href: '/mentions-legales' }
        ]} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Mentions Légales
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <p className="text-blue-800 font-medium">
                Dernière mise à jour : 1er janvier 2025
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informations Légales</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Dénomination sociale :</strong> MobileTech Pro SARL</p>
                <p className="text-gray-700 mb-2"><strong>Forme juridique :</strong> Société à Responsabilité Limitée</p>
                <p className="text-gray-700 mb-2"><strong>Capital social :</strong> 10 000 €</p>
                <p className="text-gray-700 mb-2"><strong>Siège social :</strong> 123 Rue de la Tech, 75001 Paris, France</p>
                <p className="text-gray-700 mb-2"><strong>RCS :</strong> Paris B 123 456 789</p>
                <p className="text-gray-700 mb-2"><strong>SIRET :</strong> 123 456 789 00012</p>
                <p className="text-gray-700 mb-2"><strong>Code APE :</strong> 4742Z</p>
                <p className="text-gray-700 mb-2"><strong>N° TVA intracommunautaire :</strong> FR12345678901</p>
                <p className="text-gray-700 mb-2"><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p className="text-gray-700"><strong>Email :</strong> contact@mobiletech-pro.fr</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Directeur de la Publication</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le directeur de la publication du site www.mobiletech-pro.fr est Pierre Dubois, 
                en qualité de gérant de la société MobileTech Pro SARL.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Hébergement</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p className="text-gray-700 mb-2"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p className="text-gray-700"><strong>Site web :</strong> https://vercel.com</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriété Intellectuelle</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-600 leading-relaxed">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit 
                est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Protection des Données Personnelles</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au 
                Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, 
                de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : 
                <strong> contact@mobiletech-pro.fr</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques 
                de visite. En continuant votre navigation sur ce site, vous acceptez l'utilisation de cookies.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités 
                du site pourraient ne plus être disponibles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Responsabilité</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour 
                à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                merci de bien vouloir le signaler par email à contact@mobiletech-pro.fr.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Droit Applicable</h2>
              <p className="text-gray-600 leading-relaxed">
                Tout litige en relation avec l'utilisation du site www.mobiletech-pro.fr est soumis au droit français. 
                Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Par téléphone : 01 23 45 67 89</li>
                <li>Par email : contact@mobiletech-pro.fr</li>
                <li>Par courrier : MobileTech Pro SARL, 123 Rue de la Tech, 75001 Paris</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}