# Tests RLS — Supabase

Ce dossier contient les tests SQL qui vérifient les politiques de Row Level Security (RLS) du projet.

## Fichier

- **`rls.test.sql`** — Suite de 10 tests vérifiant que :
  - Les utilisateurs anonymes peuvent insérer des `leads` mais ne peuvent ni les lire ni modifier les `products`
  - Les utilisateurs authentifiés non admin sont bloqués sur tous les writes admin
  - Les utilisateurs présents dans `admin_users` voient les leads et peuvent éditer les produits
  - La fonction `is_admin()` retourne le bon résultat selon l'identité
  - Les contraintes CHECK anti-abus sur `leads` (taille des champs) fonctionnent

## Comment exécuter

### Option 1 — Supabase Dashboard (recommandé)

1. Ouvrir le projet sur [supabase.com](https://supabase.com) → **SQL Editor**
2. Copier le contenu intégral de `rls.test.sql`
3. Cliquer sur **Run**
4. Lire l'onglet **Messages** : chaque test affiche `[PASS]` ou `[FAIL]`
5. Le `ROLLBACK` final garantit qu'aucune donnée test n'est laissée en base

### Option 2 — psql en ligne de commande

```bash
# Récupérer la connection string depuis Supabase Dashboard → Settings → Database
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

psql "$DATABASE_URL" -f supabase/tests/rls.test.sql
```

Sortie attendue (extrait) :

```
NOTICE:  === SETUP OK : user=00000000-..., product=42, lead=99 ===
NOTICE:  [PASS] T1 : anon INSERT into leads accepted
NOTICE:  [PASS] T2 : anon SELECT leads → 0 rows (RLS filters)
NOTICE:  [PASS] T3 : anon SELECT products → 1 rows
...
NOTICE:  ============================================
NOTICE:    ALL TESTS PASSED ✓
NOTICE:    10 / 10 RLS checks réussis
NOTICE:  ============================================
ROLLBACK
```

## Quand relancer ces tests

- Après toute modification d'une politique RLS dans `supabase/migrations/`
- Après toute modification de la fonction `is_admin()`
- Avant un déploiement en production
- Lors d'un audit de sécurité

## Comportement en cas d'échec

Si un test échoue, **l'exécution s'arrête** (RAISE EXCEPTION) et la transaction
est rollback. Le message d'erreur précise quel test (T1–T10) a échoué et pourquoi.
Aucune donnée test n'est laissée en base, même en cas d'échec.

## Limites connues

- Le test `SETUP` insère un faux utilisateur dans `auth.users`. Si le schéma de
  `auth.users` diffère de la version Supabase standard (ex: instance auto-hébergée
  modifiée), adapter les colonnes dans le `DO $setup$` block.
- Pas de test pour la table `categories` ni `brands` car les politiques sont
  identiques à `products` (mêmes USING/WITH CHECK basé sur `is_admin()`).
- Pas de test pour les politiques de `admin_users` self-read (pas critique en
  pratique, et nécessiterait deux contextes JWT).
