-- ============================================================
--  MobileTech Pro — Tests RLS (Row Level Security)
-- ============================================================
--
--  Vérifie les politiques de sécurité critique :
--    - leads   : INSERT anonyme autorisé, SELECT/UPDATE admin-only
--    - products: SELECT public, INSERT/UPDATE admin-only
--    - is_admin(): retourne TRUE seulement si auth.uid() est dans admin_users
--
--  Exécution :
--    1. Supabase Dashboard → SQL Editor → coller ce fichier → Run
--    2. ou : psql "$DATABASE_URL" -f supabase/tests/rls.test.sql
--
--  Le BEGIN/ROLLBACK final garantit ZÉRO effet de bord (aucune donnée laissée).
--  Les sorties [PASS] / [FAIL] sont visibles dans l'onglet "Messages".
-- ============================================================

BEGIN;

-- ============================================================
--  SETUP : crée des fixtures dans la transaction (rollback à la fin)
-- ============================================================

-- Identifiant fixe pour l'utilisateur de test (UUID prévisible, non-collision)
-- Note : l'INSERT dans auth.users peut échouer si le schéma diffère de la
-- version Supabase standard. Adapter les colonnes en cas d'erreur.
DO $setup$
DECLARE
  v_test_uid uuid := '00000000-0000-0000-0000-00000000a001';
  v_pid int;
  v_lid int;
BEGIN
  -- 1. Faux utilisateur authentifié
  INSERT INTO auth.users (
    id, instance_id, aud, role, email,
    encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at
  ) VALUES (
    v_test_uid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated', 'authenticated',
    'rls-test@mobiletech.local',
    '$2a$10$placeholderplaceholderplace',
    now(),
    '{"provider":"email"}'::jsonb,
    '{}'::jsonb,
    now(), now()
  );

  -- 2. Produit de test (cible des tests UPDATE)
  INSERT INTO products (name, brand, price, description, category, slug)
    VALUES (
      'RLS Test Product',
      'TestBrand',
      99.99,
      'Produit éphémère pour tests RLS',
      'test',
      'rls-test-' || replace(v_test_uid::text, '-', '')
    )
  RETURNING id INTO v_pid;

  -- 3. Lead existant (cible des tests SELECT)
  INSERT INTO leads (first_name, last_name, email, subject, message, contact_method)
    VALUES ('Setup', 'Lead', 'setup-lead@test.local', 'Sujet setup', 'Lead inséré pour tests RLS', 'email')
  RETURNING id INTO v_lid;

  -- Mémoriser les IDs pour les tests suivants
  PERFORM set_config('rls_test.uid', v_test_uid::text, false);
  PERFORM set_config('rls_test.pid', v_pid::text, false);
  PERFORM set_config('rls_test.lid', v_lid::text, false);

  RAISE NOTICE '=== SETUP OK : user=%, product=%, lead=% ===', v_test_uid, v_pid, v_lid;
END
$setup$;

-- ============================================================
--  T1  : anon PEUT INSERT dans leads (formulaire de contact)
-- ============================================================
SET LOCAL ROLE anon;

DO $t1$
BEGIN
  INSERT INTO leads (first_name, last_name, email, subject, message, contact_method)
    VALUES ('Anon', 'Test', 'anon-t1@test.local', 'T1', 'T1 message au moins 10 caractères', 'email');
  RAISE NOTICE '[PASS] T1 : anon INSERT into leads accepted';
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION '[FAIL] T1 : anon INSERT into leads denied : %', SQLERRM;
END
$t1$;

-- ============================================================
--  T2  : anon NE PEUT PAS SELECT leads (RLS filtre tout)
-- ============================================================
DO $t2$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM leads;
  IF n <> 0 THEN
    RAISE EXCEPTION '[FAIL] T2 : anon a vu % lead(s), devrait voir 0 (RLS doit tout filtrer)', n;
  END IF;
  RAISE NOTICE '[PASS] T2 : anon SELECT leads → 0 rows (RLS filters)';
EXCEPTION
  WHEN insufficient_privilege THEN
    RAISE NOTICE '[PASS] T2 : anon SELECT leads → insufficient_privilege (équivalent)';
END
$t2$;

-- ============================================================
--  T3  : anon PEUT SELECT products (lecture publique)
-- ============================================================
DO $t3$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM products;
  IF n < 1 THEN
    RAISE EXCEPTION '[FAIL] T3 : anon ne voit aucun produit (devrait voir au moins le produit de setup)';
  END IF;
  RAISE NOTICE '[PASS] T3 : anon SELECT products → % rows', n;
END
$t3$;

-- ============================================================
--  T4  : anon NE PEUT PAS UPDATE products
-- ============================================================
DO $t4$
DECLARE n int;
BEGIN
  UPDATE products SET name = name || ' [tampered]'
    WHERE id = current_setting('rls_test.pid')::int;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n > 0 THEN
    RAISE EXCEPTION '[FAIL] T4 : anon a updaté % produit(s) (devrait être 0)', n;
  END IF;
  RAISE NOTICE '[PASS] T4 : anon UPDATE products → 0 rows affected';
EXCEPTION
  WHEN insufficient_privilege THEN
    RAISE NOTICE '[PASS] T4 : anon UPDATE products → insufficient_privilege';
END
$t4$;

RESET ROLE;

-- ============================================================
--  T5  : authenticated NON-admin → is_admin() = false
--        et UPDATE products bloqué
-- ============================================================
SELECT set_config('request.jwt.claim.sub', current_setting('rls_test.uid'), true);
SET LOCAL ROLE authenticated;

DO $t5$
DECLARE
  v_is_admin boolean;
  n int;
BEGIN
  SELECT is_admin() INTO v_is_admin;
  IF v_is_admin THEN
    RAISE EXCEPTION '[FAIL] T5a : is_admin() = TRUE alors que user n''est pas dans admin_users';
  END IF;
  RAISE NOTICE '[PASS] T5a : is_admin() = false pour utilisateur non admin';

  UPDATE products SET name = name || ' [tampered]'
    WHERE id = current_setting('rls_test.pid')::int;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n > 0 THEN
    RAISE EXCEPTION '[FAIL] T5b : non-admin authenticated a updaté % produit(s)', n;
  END IF;
  RAISE NOTICE '[PASS] T5b : authenticated non-admin UPDATE products → 0 rows';
END
$t5$;

-- ============================================================
--  T6  : authenticated NON-admin → SELECT leads = 0 lignes
-- ============================================================
DO $t6$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM leads;
  IF n <> 0 THEN
    RAISE EXCEPTION '[FAIL] T6 : authenticated non-admin a vu % lead(s)', n;
  END IF;
  RAISE NOTICE '[PASS] T6 : authenticated non-admin SELECT leads → 0 rows';
END
$t6$;

RESET ROLE;

-- ============================================================
--  Promotion en admin : insertion dans admin_users
-- ============================================================
INSERT INTO admin_users (user_id) VALUES (current_setting('rls_test.uid')::uuid);

-- ============================================================
--  T7  : authenticated ADMIN → is_admin() = true
-- ============================================================
SELECT set_config('request.jwt.claim.sub', current_setting('rls_test.uid'), true);
SET LOCAL ROLE authenticated;

DO $t7$
DECLARE v_is_admin boolean;
BEGIN
  SELECT is_admin() INTO v_is_admin;
  IF NOT v_is_admin THEN
    RAISE EXCEPTION '[FAIL] T7 : is_admin() = false alors que user est dans admin_users';
  END IF;
  RAISE NOTICE '[PASS] T7 : is_admin() = true après ajout dans admin_users';
END
$t7$;

-- ============================================================
--  T8  : authenticated ADMIN → UPDATE products autorisé
-- ============================================================
DO $t8$
DECLARE n int;
BEGIN
  UPDATE products SET name = name || ' [admin-edit]'
    WHERE id = current_setting('rls_test.pid')::int;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN
    RAISE EXCEPTION '[FAIL] T8 : admin UPDATE products affecte % ligne(s) (attendu 1)', n;
  END IF;
  RAISE NOTICE '[PASS] T8 : admin UPDATE products → 1 row affected';
END
$t8$;

-- ============================================================
--  T9  : authenticated ADMIN → SELECT leads voit toutes les lignes
-- ============================================================
DO $t9$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM leads;
  -- Setup a inséré 1 + T1 a inséré 1 = au moins 2 visibles pour l'admin
  IF n < 2 THEN
    RAISE EXCEPTION '[FAIL] T9 : admin voit % lead(s) (attendu >= 2)', n;
  END IF;
  RAISE NOTICE '[PASS] T9 : admin SELECT leads → % rows visibles', n;
END
$t9$;

RESET ROLE;

-- ============================================================
--  T10 : Contrainte CHECK anti-DoS sur leads.message > 5000 chars
-- ============================================================
SET LOCAL ROLE anon;

DO $t10$
BEGIN
  INSERT INTO leads (first_name, last_name, email, subject, message, contact_method)
    VALUES ('Abuse', 'Bot', 'abuse@test.local', 'spam', repeat('A', 5001), 'email');
  RAISE EXCEPTION '[FAIL] T10 : INSERT avec message 5001 chars accepté (CHECK manquante ?)';
EXCEPTION
  WHEN check_violation THEN
    RAISE NOTICE '[PASS] T10 : message > 5000 chars rejeté par CHECK constraint';
END
$t10$;

RESET ROLE;

-- ============================================================
--  Résumé
-- ============================================================
DO $summary$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '============================================';
  RAISE NOTICE '  ALL TESTS PASSED ✓';
  RAISE NOTICE '  10 / 10 RLS checks réussis';
  RAISE NOTICE '============================================';
END
$summary$;

-- ============================================================
--  ROLLBACK final : aucune donnée test n'est laissée en base
-- ============================================================
ROLLBACK;
