import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product-gallery';
import { ProductDetails } from '@/components/product-details';
import { RelatedProducts } from '@/components/related-products';
import { Breadcrumb } from '@/components/breadcrumb';
import ContactForm from '@/components/contact-form';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Mock product data for when Supabase is not configured
const getMockProduct = (slug: string) => {
  const mockProducts = {
    'iphone-15-pro-max': {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      brand: 'Apple',
      price: '1299€',
      originalPrice: '1399€',
      inStock: true,
      rating: 4.8,
      reviews: 156,
      description: 'Le nouveau iPhone 15 Pro Max offre des performances exceptionnelles avec la puce A17 Pro, un appareil photo révolutionnaire et un design en titane premium. Découvrez une expérience mobile inégalée avec des fonctionnalités avancées et une qualité de construction exceptionnelle.',
      features: [
        'Écran Super Retina XDR 6,7" avec ProMotion',
        'Puce A17 Pro ultra-rapide avec GPU 6 cœurs',
        'Système photo Pro 48 Mpx avec zoom optique 5x',
        'Autonomie exceptionnelle jusqu\'à 29h de lecture vidéo',
        'Résistant à l\'eau IP68 jusqu\'à 6 mètres',
        'USB-C avec Thunderbolt 3 pour transferts ultra-rapides',
        'Face ID avancé pour une sécurité maximale',
        'Compatible MagSafe et charge sans fil Qi2'
      ],
      specifications: {
        'Écran': '6,7" Super Retina XDR OLED ProMotion 120Hz',
        'Processeur': 'Puce A17 Pro gravée en 3 nanomètres',
        'Stockage': '256 Go',
        'Appareil photo': 'Principal 48 Mpx + Ultra grand-angle 12 Mpx + Téléobjectif 12 Mpx',
        'Caméra frontale': '12 Mpx TrueDepth avec autofocus',
        'Batterie': 'Jusqu\'à 29h de lecture vidéo',
        'Connectivité': '5G, Wi-Fi 6E, Bluetooth 5.3',
        'Résistance': 'IP68 (jusqu\'à 6 mètres pendant 30 minutes)',
        'Dimensions': '159,9 × 76,7 × 8,25 mm',
        'Poids': '221 grammes',
        'Couleurs': 'Titane naturel, Titane bleu, Titane blanc, Titane noir'
      },
      images: [
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
        'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
        'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg'
      ]
    },
    'galaxy-s24-ultra': {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      price: '1179€',
      originalPrice: null,
      inStock: true,
      rating: 4.7,
      reviews: 89,
      description: 'Le Galaxy S24 Ultra redéfinit l\'excellence mobile avec son écran Dynamic AMOLED 2X, son S Pen intégré et ses capacités IA avancées. Un smartphone premium conçu pour les utilisateurs les plus exigeants.',
      features: [
        'Écran Dynamic AMOLED 2X 6,8" avec S Pen intégré',
        'Processeur Snapdragon 8 Gen 3 ultra-performant',
        'Appareil photo 200 Mpx avec zoom optique 10x',
        'Batterie 5000 mAh avec charge rapide 45W',
        'Intelligence artificielle Galaxy AI intégrée',
        'Résistant IP68 avec protection Gorilla Glass Victus 2',
        'Stockage 256 Go extensible via microSD',
        'Connectivité 5G et Wi-Fi 7'
      ],
      specifications: {
        'Écran': '6,8" Dynamic AMOLED 2X 120Hz',
        'Processeur': 'Snapdragon 8 Gen 3 pour Galaxy',
        'Stockage': '256 Go + slot microSD',
        'Appareil photo': '200 Mpx + 50 Mpx + 12 Mpx + 10 Mpx',
        'Batterie': '5000 mAh avec charge rapide 45W',
        'S Pen': 'Intégré avec latence ultra-faible',
        'Connectivité': '5G, Wi-Fi 7, Bluetooth 5.3',
        'Résistance': 'IP68',
        'Dimensions': '162,3 × 79,0 × 8,6 mm',
        'Poids': '232 grammes',
        'Couleurs': 'Phantom Black, Phantom Violet, Phantom Yellow'
      },
      images: [
        'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
        'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg'
      ]
    }
  };

  return mockProducts[slug as keyof typeof mockProducts] || null;
};

async function getProduct(slug: string) {
  if (!isSupabaseConfigured()) {
    return getMockProduct(slug);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    
    if (!data) return null;

    // Transform data to match component expectations
    return {
      id: data.id,
      name: data.name,
      brand: data.brand,
      price: `${data.price}€`,
      originalPrice: data.original_price ? `${data.original_price}€` : null,
      inStock: data.in_stock,
      rating: data.rating,
      reviews: data.reviews_count,
      description: data.description,
      features: data.features || [],
      specifications: data.specifications || {},
      images: data.images || []
    };
  } catch (error) {
    console.error('Erreur lors du chargement du produit:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Produit non trouvé - MobileTech Pro',
      description: 'Le produit que vous recherchez n\'existe pas ou n\'est plus disponible.'
    };
  }

  return {
    title: `${product.name} - ${product.brand} | MobileTech Pro`,
    description: `${product.description.substring(0, 160)}...`,
    keywords: `${product.name}, ${product.brand}, smartphone, mobile, téléphone, MobileTech Pro`,
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      images: product.images,
      type: 'product'
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Accueil', href: '/' },
          { label: 'Catalogue', href: '/catalogue' },
          { label: product.name, href: `/produit/${params.slug}` }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Product Details */}
          <div>
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Intéressé par ce produit ?
              </h2>
              <p className="text-gray-600">
                Contactez-nous pour plus d'informations, un devis personnalisé ou pour passer commande
              </p>
            </div>
            <ContactForm productName={product.name} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}