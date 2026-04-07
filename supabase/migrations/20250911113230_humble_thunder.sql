/*
  # Création des tables catégories et marques

  1. Nouvelles Tables
    - `categories`
      - `id` (integer, primary key, auto-increment)
      - `name` (text, nom de la catégorie)
      - `description` (text, description)
      - `slug` (text, URL slug unique)
      - `icon` (text, nom de l'icône)
      - `image` (text, URL de l'image)
      - `product_count` (integer, nombre de produits)
      - `created_at` (timestamp)

    - `brands`
      - `id` (integer, primary key, auto-increment)
      - `name` (text, nom de la marque)
      - `slug` (text, URL slug unique)
      - `logo` (text, URL du logo optionnel)
      - `product_count` (integer, nombre de produits)
      - `created_at` (timestamp)

  2. Sécurité
    - Enable RLS sur les deux tables
    - Politique de lecture publique
    - Politique d'écriture pour les admins uniquement
*/

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL,
  image TEXT NOT NULL,
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Brands are viewable by everyone"
  ON brands
  FOR SELECT
  USING (true);

-- Politiques d'écriture pour les admins
CREATE POLICY "Categories are editable by admins"
  ON categories
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Brands are editable by admins"
  ON brands
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Index
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);

-- Insertion des données initiales
INSERT INTO categories (name, description, slug, icon, image) VALUES
('Smartphones', 'iPhone, Samsung, Huawei et plus', 'smartphones', 'Smartphone', 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'),
('Écouteurs & Audio', 'AirPods, écouteurs sans fil', 'ecouteurs', 'Headphones', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'),
('Chargeurs & Batteries', 'Chargeurs rapides, batteries externes', 'chargeurs', 'Battery', 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg'),
('Protection & Coques', 'Coques, verres trempés, étuis', 'coques', 'Shield', 'https://images.pexels.com/photos/1440722/pexels-photo-1440722.jpeg')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO brands (name, slug) VALUES
('Apple', 'apple'),
('Samsung', 'samsung'),
('Huawei', 'huawei'),
('Xiaomi', 'xiaomi'),
('OnePlus', 'oneplus'),
('Google', 'google'),
('Anker', 'anker')
ON CONFLICT (slug) DO NOTHING;