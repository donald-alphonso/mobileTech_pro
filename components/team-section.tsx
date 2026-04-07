import { Mail, Linkedin, Phone } from 'lucide-react';

export function TeamSection() {
  const teamMembers = [
    {
      name: 'Pierre Dubois',
      role: 'Directeur Général',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      description: 'Expert en téléphonie mobile depuis 20 ans, Pierre a fondé MobileTech Pro avec la vision de démocratiser l\'accès aux dernières technologies.',
      email: 'pierre.dubois@mobiletech-pro.fr',
      linkedin: '#'
    },
    {
      name: 'Sophie Martin',
      role: 'Responsable Commercial',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      description: 'Spécialisée dans le conseil client, Sophie vous aide à trouver le smartphone parfait adapté à vos besoins et votre budget.',
      email: 'sophie.martin@mobiletech-pro.fr',
      linkedin: '#'
    },
    {
      name: 'Thomas Leroy',
      role: 'Expert Technique',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Passionné de nouvelles technologies, Thomas assure le support technique et la formation de notre équipe sur les dernières innovations.',
      email: 'thomas.leroy@mobiletech-pro.fr',
      linkedin: '#'
    },
    {
      name: 'Marie Rousseau',
      role: 'Service Client',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
      description: 'Marie garantit un service client exceptionnel et s\'assure que chaque client reparte satisfait de son expérience chez MobileTech Pro.',
      email: 'marie.rousseau@mobiletech-pro.fr',
      linkedin: '#'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Notre Équipe
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rencontrez les experts passionnés qui font de MobileTech Pro votre partenaire de confiance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="aspect-square relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.description}
                </p>
                
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rejoignez Notre Équipe
            </h3>
            <p className="text-gray-600 mb-6">
              Nous recherchons constamment des talents passionnés par les nouvelles technologies 
              pour renforcer notre équipe et offrir le meilleur service à nos clients.
            </p>
            <a
              href="mailto:recrutement@mobiletech-pro.fr"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Mail className="h-4 w-4 mr-2" />
              Candidature Spontanée
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}