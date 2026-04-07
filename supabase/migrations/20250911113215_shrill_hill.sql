/*
  # Création de la table des produits

  1. Nouvelles Tables
    - `products`
      - `id` (integer, primary key, auto-increment)
      - `name` (text, nom du produit)
      - `brand` (text, marque)
      - `price` (decimal, prix actuel)
      - `original_price` (decimal, prix original pour les promos)
      - `description` (text, description détaillée)
      - `features` (jsonb, liste des caractéristiques)
      - `specifications` (jsonb, spécifications techniques)
      - `images` (jsonb, array d'URLs d'images)
      - `category` (text, catégorie du produit)
      - `in_stock` (boolean, disponibilité)
      - `rating` (decimal, note moyenne)
      - `reviews_count` (integer, nombre d'avis)
      - `slug` (text, URL slug unique)
      - `is_featured` (boolean, produit en vedette)
      - `is_promotion` (boolean, en promotion)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur `products`
    - Politique de lecture publique
    - Politique d'écriture pour les admins uniquement
*/

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  category TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  slug TEXT UNIQUE NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_promotion BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  USING (true);

-- Politique d'écriture pour les admins (à adapter selon votre système d'auth)
CREATE POLICY "Products are editable by admins"
  ON products
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_promotion ON products(is_promotion);