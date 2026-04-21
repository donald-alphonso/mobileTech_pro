/*
  # Sécurisation de l'accès admin via une table dédiée

  Le projet utilisait des politiques RLS basées sur `auth.jwt() ->> 'role' = 'admin'`,
  un custom claim qui n'existe pas par défaut dans Supabase Auth. Aucune écriture
  admin ne pouvait passer (ou pire, dépendait d'un système non documenté).

  Cette migration introduit :
    1. Une table `admin_users(user_id)` référençant `auth.users`.
    2. Une fonction `is_admin()` SECURITY DEFINER pour résoudre l'appartenance
       sans déclencher la RLS récursive sur `admin_users`.
    3. La réécriture des politiques d'écriture admin sur `products`, `categories`,
       `brands` et des politiques SELECT/UPDATE sur `leads`.

  Pour ajouter un admin manuellement :
    INSERT INTO admin_users (user_id) VALUES ('uuid-de-l-utilisateur-supabase');
*/

CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_users self-read" ON admin_users;
CREATE POLICY "admin_users self-read"
  ON admin_users
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION is_admin()
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid());
$$;

REVOKE ALL ON FUNCTION is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

DROP POLICY IF EXISTS "Products are editable by admins" ON products;
CREATE POLICY "Products are editable by admins"
  ON products
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Categories are editable by admins" ON categories;
CREATE POLICY "Categories are editable by admins"
  ON categories
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Brands are editable by admins" ON brands;
CREATE POLICY "Brands are editable by admins"
  ON brands
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Leads are viewable by admins only" ON leads;
CREATE POLICY "Leads are viewable by admins only"
  ON leads
  FOR SELECT
  TO authenticated
  USING (is_admin());

DROP POLICY IF EXISTS "Leads are editable by admins only" ON leads;
CREATE POLICY "Leads are editable by admins only"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
