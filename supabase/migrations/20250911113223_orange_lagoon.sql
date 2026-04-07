/*
  # Création de la table des leads

  1. Nouvelles Tables
    - `leads`
      - `id` (integer, primary key, auto-increment)
      - `first_name` (text, prénom)
      - `last_name` (text, nom)
      - `email` (text, email)
      - `phone` (text, téléphone optionnel)
      - `subject` (text, sujet du message)
      - `message` (text, message)
      - `contact_method` (enum, méthode de contact préférée)
      - `product_name` (text, produit concerné optionnel)
      - `status` (enum, statut du lead)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur `leads`
    - Politique d'insertion publique (pour le formulaire)
    - Politique de lecture/modification pour les admins uniquement
*/

-- Type enum pour les méthodes de contact
DO $$ BEGIN
  CREATE TYPE contact_method_enum AS ENUM ('email', 'phone', 'both');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Type enum pour les statuts de leads
DO $$ BEGIN
  CREATE TYPE lead_status_enum AS ENUM ('new', 'contacted', 'qualified', 'converted', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  contact_method contact_method_enum DEFAULT 'email',
  product_name TEXT,
  status lead_status_enum DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Politique d'insertion publique pour le formulaire de contact
CREATE POLICY "Anyone can create leads"
  ON leads
  FOR INSERT
  WITH CHECK (true);

-- Politique de lecture pour les admins uniquement
CREATE POLICY "Leads are viewable by admins only"
  ON leads
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Politique de modification pour les admins uniquement
CREATE POLICY "Leads are editable by admins only"
  ON leads
  FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);