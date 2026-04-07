import { Calendar, MapPin, Users, Trophy, Smartphone, TrendingUp } from 'lucide-react';

export function CompanyHistory() {
  const milestones = [
    {
      year: '2009',
      title: 'Création de MobileTech Pro',
      description: 'Pierre Dubois fonde MobileTech Pro avec l\'ambition de démocratiser l\'accès aux smartphones de qualité.',
      icon: Smartphone
    },
    {
      year: '2012',
      title: 'Premier Magasin Physique',
      description: 'Ouverture de notre premier point de vente à Paris, dans le quartier des Halles.',
      icon: MapPin
    },
    {
      year: '2015',
      title: 'Expansion de l\'Équipe',
      description: 'L\'équipe s\'agrandit avec l\'arrivée de spécialistes en conseil client et support technique.',
      icon: Users
    },
    {
      year: '2018',
      title: 'Partenariats Officiels',
      description: 'Signature de partenariats officiels avec Apple, Samsung et les principales marques du marché.',
      icon: Trophy
    },
    {
      year: '2021',
      title: 'Digitalisation',
      description: 'Lancement de notre plateforme en ligne et développement de nos services digitaux.',
      icon: TrendingUp
    },
    {
      year: '2025',
      title: 'Leader Régional',
      description: 'MobileTech Pro devient une référence incontournable avec plus de 5000 clients satisfaits.',
      icon: Trophy
    }
  ];

  const stats = [
    { number: '15+', label: 'Années d\'expérience', icon: Calendar },
    { number: '5000+', label: 'Clients satisfaits', icon: Users },
    { number: '500+', label: 'Références produits', icon: Smartphone },
    { number: '98%', label: 'Taux de satisfaction', icon: Trophy }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Notre Histoire
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez l'évolution de MobileTech Pro, de sa création à aujourd'hui
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform lg:-translate-x-0.5"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-blue-600 rounded-full transform lg:-translate-x-1.5 z-10"></div>

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'} ml-12 lg:ml-0`}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <milestone.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block w-2/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Notre Vision pour l'Avenir
          </h3>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Continuer à être votre partenaire de confiance dans l'univers de la téléphonie mobile, 
            en anticipant les innovations technologiques et en vous accompagnant dans la transition 
            vers les technologies de demain.
          </p>
        </div>
      </div>
    </section>
  );
}