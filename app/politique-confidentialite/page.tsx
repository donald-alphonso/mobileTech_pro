import { Breadcrumb } from '@/components/breadcrumb';
import { ROUTES } from '@/lib/routes';

export const metadata = {
  title: 'Politique de Confidentialité - MobileTech Pro',
  description: 'Consultez notre politique de confidentialité et de protection des données personnelles.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Accueil', href: ROUTES.home },
          { label: 'Politique de Confidentialité', href: ROUTES.privacy }
        ]} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Politique de Confidentialité
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <p className="text-blue-800 font-medium">
                Dernière mise à jour : 1er janvier 2025
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                MobileTech Pro SARL (ci-après "nous", "notre" ou "MobileTech Pro") s'engage à protéger 
                et respecter votre vie privée. Cette politique de confidentialité explique comment nous 
                collectons, utilisons et protégeons vos informations personnelles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Responsable du Traitement</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Responsable :</strong> MobileTech Pro SARL</p>
                <p className="text-gray-700 mb-2"><strong>Adresse :</strong> 123 Rue de la Tech, 75001 Paris, France</p>
                <p className="text-gray-700 mb-2"><strong>Email :</strong> contact@mobiletech-pro.fr</p>
                <p className="text-gray-700"><strong>Téléphone :</strong> 01 23 45 67 89</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Données Collectées</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous collectons les types de données personnelles suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li><strong>Données d'identification :</strong> nom, prénom, adresse email</li>
                <li><strong>Données de contact :</strong> numéro de téléphone, adresse postale</li>
                <li><strong>Données de navigation :</strong> adresse IP, cookies, pages visitées</li>
                <li><strong>Données commerciales :</strong> historique des demandes, préférences produits</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Finalités du Traitement</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vos données personnelles sont traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Traitement de vos demandes de contact et devis</li>
                <li>Gestion de la relation client et service après-vente</li>
                <li>Amélioration de nos services et de notre site web</li>
                <li>Respect de nos obligations légales et réglementaires</li>
                <li>Envoi d'informations commerciales (avec votre consentement)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Base Légale</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le traitement de vos données personnelles est fondé sur :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Votre consentement</strong> pour l'envoi de communications marketing</li>
                <li><strong>L'exécution d'un contrat</strong> pour le traitement de vos commandes</li>
                <li><strong>Notre intérêt légitime</strong> pour l'amélioration de nos services</li>
                <li><strong>Le respect d'obligations légales</strong> pour la comptabilité et la fiscalité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Durée de Conservation</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous conservons vos données personnelles pendant les durées suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Données clients :</strong> 3 ans après la dernière commande</li>
                <li><strong>Données prospects :</strong> 3 ans après le dernier contact</li>
                <li><strong>Données comptables :</strong> 10 ans conformément aux obligations légales</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Partage des Données</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vos données personnelles peuvent être partagées avec :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Nos prestataires techniques (hébergement, maintenance)</li>
                <li>Nos partenaires logistiques pour les livraisons</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Vos Droits</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Pour exercer ces droits, contactez-nous à : <strong>contact@mobiletech-pro.fr</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Notre site utilise des cookies pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Assurer le bon fonctionnement du site</li>
                <li>Améliorer votre expérience de navigation</li>
                <li>Réaliser des statistiques de visite</li>
                <li>Personnaliser le contenu affiché</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Vous pouvez configurer votre navigateur pour refuser les cookies, 
                mais certaines fonctionnalités du site pourraient ne plus être disponibles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Sécurité</h2>
              <p className="text-gray-600 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre la perte, l'utilisation abusive, 
                l'accès non autorisé, la divulgation, l'altération ou la destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Transferts Internationaux</h2>
              <p className="text-gray-600 leading-relaxed">
                Vos données peuvent être transférées vers des pays situés en dehors de l'Union européenne. 
                Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place 
                pour protéger vos données conformément au RGPD.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications</h2>
              <p className="text-gray-600 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pour toute question concernant cette politique de confidentialité ou 
                l'exercice de vos droits, contactez-nous :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email :</strong> contact@mobiletech-pro.fr</p>
                <p className="text-gray-700 mb-2"><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p className="text-gray-700 mb-2"><strong>Courrier :</strong> MobileTech Pro SARL</p>
                <p className="text-gray-700">123 Rue de la Tech, 75001 Paris, France</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Réclamation</h2>
              <p className="text-gray-600 leading-relaxed">
                Si vous estimez que le traitement de vos données personnelles constitue une violation 
                du RGPD, vous avez le droit d'introduire une réclamation auprès de la Commission 
                Nationale de l'Informatique et des Libertés (CNIL) : 
                <a href="https://www.cnil.fr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  www.cnil.fr
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}