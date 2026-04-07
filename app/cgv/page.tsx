import { Breadcrumb } from '@/components/breadcrumb';

export const metadata = {
  title: 'Conditions Générales de Vente - MobileTech Pro',
  description: 'Consultez nos conditions générales de vente pour tous vos achats chez MobileTech Pro.',
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Accueil', href: '/' },
          { label: 'CGV', href: '/cgv' }
        ]} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Conditions Générales de Vente
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <p className="text-blue-800 font-medium">
                Dernière mise à jour : 1er janvier 2025
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles 
                entre MobileTech Pro, société spécialisée dans la vente de téléphones portables et 
                d'accessoires, et ses clients.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informations Légales</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Raison sociale :</strong> MobileTech Pro SARL</p>
                <p className="text-gray-700 mb-2"><strong>Adresse :</strong> 123 Rue de la Tech, 75001 Paris, France</p>
                <p className="text-gray-700 mb-2"><strong>SIRET :</strong> 123 456 789 00012</p>
                <p className="text-gray-700 mb-2"><strong>TVA :</strong> FR12345678901</p>
                <p className="text-gray-700 mb-2"><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p className="text-gray-700"><strong>Email :</strong> contact@mobiletech-pro.fr</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Produits et Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                MobileTech Pro propose une gamme complète de smartphones, accessoires et services 
                associés. Tous nos produits sont neufs et bénéficient de la garantie constructeur officielle.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Smartphones de toutes marques (Apple, Samsung, Huawei, etc.)</li>
                <li>Accessoires : coques, écouteurs, chargeurs, batteries externes</li>
                <li>Service de conseil personnalisé</li>
                <li>Support technique et après-vente</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Commandes et Devis</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les commandes peuvent être passées :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>En magasin : 123 Rue de la Tech, 75001 Paris</li>
                <li>Par téléphone : 01 23 45 67 89</li>
                <li>Par email : contact@mobiletech-pro.fr</li>
                <li>Via notre formulaire de contact en ligne</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Tout devis est valable 30 jours à compter de sa date d'émission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prix et Paiement</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les prix sont indiqués en euros TTC. Nous acceptons les modes de paiement suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Espèces (en magasin)</li>
                <li>Carte bancaire</li>
                <li>Chèque</li>
                <li>Virement bancaire</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Livraison</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous proposons plusieurs options de livraison :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Retrait en magasin (gratuit)</li>
                <li>Livraison à domicile (24-48h en région parisienne)</li>
                <li>Livraison express (même jour sur demande)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Garanties</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tous nos produits bénéficient :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>De la garantie légale de conformité (2 ans)</li>
                <li>De la garantie constructeur officielle</li>
                <li>De notre service après-vente expert</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Droit de Rétractation</h2>
              <p className="text-gray-600 leading-relaxed">
                Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours 
                pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Protection des Données</h2>
              <p className="text-gray-600 leading-relaxed">
                Vos données personnelles sont traitées conformément au RGPD. 
                Consultez notre politique de confidentialité pour plus d'informations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question concernant ces conditions générales de vente, 
                contactez-nous par téléphone au 01 23 45 67 89 ou par email à contact@mobiletech-pro.fr.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}