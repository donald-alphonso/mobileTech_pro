import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Nos Coordonnées</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Adresse</p>
              <p className="text-gray-600">123 Rue de la Tech<br />75001 Paris, France</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Téléphone</p>
              <p className="text-gray-600">01 23 45 67 89</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600">contact@mobiletech-pro.fr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Hours Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          <Clock className="h-5 w-5 text-blue-600 inline mr-2" />
          Horaires d'Ouverture
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Lundi - Vendredi</span>
            <span className="font-medium">9h00 - 18h00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Samedi</span>
            <span className="font-medium">10h00 - 17h00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dimanche</span>
            <span className="text-red-600">Fermé</span>
          </div>
        </div>
      </div>

      {/* Quick Contact Card */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          <MessageCircle className="h-5 w-5 text-blue-600 inline mr-2" />
          Contact Rapide
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Besoin d'une réponse immédiate ? Appelez-nous directement !
        </p>
        <a
          href="tel:0123456789"
          className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Phone className="h-4 w-4 mr-2" />
          Appeler Maintenant
        </a>
      </div>

      {/* Location Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Comment nous trouver</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Métro :</strong> Châtelet-Les Halles (Lignes 1, 4, 7, 11, 14)</p>
          <p><strong>Bus :</strong> Lignes 21, 67, 69, 76, 81, 96</p>
          <p><strong>Parking :</strong> Parking Châtelet-Les Halles (payant)</p>
        </div>
      </div>
    </div>
  );
}