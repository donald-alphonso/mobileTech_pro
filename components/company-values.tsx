import { Heart, Shield, Zap, Users, Award, Lightbulb } from 'lucide-react';

export function CompanyValues() {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Nous sommes passionnés par les nouvelles technologies et nous transmettons cette passion à nos clients à travers nos conseils experts.'
    },
    {
      icon: Shield,
      title: 'Confiance',
      description: 'La confiance de nos clients est notre priorité. Nous garantissons l\'authenticité de tous nos produits et un service après-vente irréprochable.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Nous restons à la pointe de l\'innovation pour vous proposer les dernières technologies et les solutions les plus avancées du marché.'
    },
    {
      icon: Users,
      title: 'Proximité',
      description: 'Nous privilégions une relation de proximité avec nos clients, basée sur l\'écoute, le conseil personnalisé et l\'accompagnement.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tout ce que nous faisons : qualité des produits, service client, expertise technique et satisfaction client.'
    },
    {
      icon: Lightbulb,
      title: 'Conseil',
      description: 'Notre expertise nous permet de vous conseiller objectivement pour trouver la solution qui correspond parfaitement à vos besoins et votre budget.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Valeurs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Les principes qui guident notre action quotidienne et notre relation avec nos clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group text-center hover:bg-blue-50 rounded-xl p-6 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <value.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Notre Engagement
          </h3>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Chez MobileTech Pro, nous nous engageons à vous offrir une expérience d'achat exceptionnelle, 
            des produits de qualité et un service client irréprochable. Votre satisfaction est notre réussite.
          </p>
        </div>
      </div>
    </section>
  );
}