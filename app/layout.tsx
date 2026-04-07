import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MobileTech Pro - Spécialiste Smartphones & Accessoires | Expert Mobile Paris',
  description: 'Découvrez notre gamme complète de smartphones dernière génération (iPhone, Samsung, Huawei) et accessoires premium. Conseil expert, garantie officielle, livraison rapide. 15 ans d\'expérience à Paris.',
  keywords: 'smartphone, téléphone portable, accessoires mobile, iPhone, Samsung, Huawei, coques, écouteurs',
  authors: [{ name: 'MobileTech Pro' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'MobileTech Pro - Expert Smartphones & Accessoires Paris',
    description: 'Spécialiste smartphones depuis 15 ans. iPhone, Samsung, Huawei + accessoires premium. Conseil expert, garantie officielle.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'MobileTech Pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MobileTech Pro - Expert Smartphones Paris',
    description: 'Spécialiste smartphones depuis 15 ans. Conseil expert, garantie officielle.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}