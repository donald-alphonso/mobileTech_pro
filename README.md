# MobileTech Pro

Plateforme e-commerce de smartphones et accessoires mobiles. **Modèle de vente par contact** : pas de panier, pas de checkout — les clients passent par un formulaire de contact riche pour demander un devis ou des informations sur un produit.

Développée comme un projet vitrine + production-ready : architecture Next.js 13 App Router, base PostgreSQL via Supabase avec RLS, formulaires React Hook Form + Zod, suite de tests à trois étages (unit + E2E + RLS SQL).

---

## Stack

| Couche | Techno |
|---|---|
| Framework | Next.js 13.5 (App Router, static export) |
| Langage | TypeScript 5 strict |
| UI | Tailwind CSS + Shadcn/ui (Radix UI primitives) |
| Forms | React Hook Form + Zod |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Tests | Vitest + @testing-library/react + Playwright + PL/pgSQL |
| Déploiement | Netlify (static export) |

---

## Démarrage rapide

```bash
git clone <repo-url>
cd mobileTech_pro
npm install
cp .env.local.example .env.local   # remplir si vous voulez le mode connecté
npm run dev                        # http://localhost:3000
```

### Variables d'environnement (`.env.local`)

```bash
# Supabase — sans ces vars le site tourne en mode démo (mock data + console.log au lieu d'inserts)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx

# Fallback admin auth en mode démo (uniquement si vous voulez accéder à /admin sans Supabase Auth)
NEXT_PUBLIC_ADMIN_EMAIL=admin@mobiletech-pro.fr
NEXT_PUBLIC_ADMIN_PASSWORD=changez-moi
```

> **Mode démo** : si `NEXT_PUBLIC_SUPABASE_*` n'est pas configuré, l'app utilise des données mockées et le formulaire de contact log dans la console. Pratique pour le dev, **ne pas déployer en prod**.

---

## Structure du projet

```
mobileTech_pro/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home
│   ├── catalogue/
│   │   ├── page.tsx              # Server component (SEO)
│   │   └── client-page.tsx       # Client component (filtres, tri, pagination)
│   ├── produit/[slug]/page.tsx   # Détail produit (route dynamique)
│   ├── contact/page.tsx          # Formulaire contact
│   ├── admin/
│   │   ├── page.tsx              # Dashboard (avec garde d'auth)
│   │   └── login/page.tsx        # Login Supabase Auth + fallback env
│   ├── (legal pages)
│   └── not-found.tsx             # 404
├── components/
│   ├── contact-form.tsx          # Formulaire avec honey-pot anti-spam
│   ├── navigation.tsx            # Header sticky + menu mobile
│   ├── footer.tsx
│   ├── product-grid.tsx          # Grille produits filtrable
│   ├── product-filters.tsx       # Sidebar de filtres
│   ├── admin/admin-dashboard.tsx
│   └── ui/                       # Shadcn/ui (ne pas modifier)
├── lib/
│   ├── supabase.ts               # Client + isSupabaseConfigured()
│   ├── validators.ts             # Schémas Zod (contact + admin login)
│   ├── routes.ts                 # ROUTES + helpers (productPath, etc.)
│   └── utils.ts                  # cn() pour className
├── supabase/
│   ├── migrations/               # Migrations SQL versionnées
│   └── tests/                    # Script PL/pgSQL pour vérifier RLS
├── tests/
│   ├── unit/                     # Vitest (validators, routes, composants)
│   └── e2e/                      # Playwright (contact, admin, navigation)
├── vitest.config.ts
├── vitest.setup.ts               # Polyfills jsdom pour Radix UI
├── playwright.config.ts
└── CLAUDE.md                     # Doc dev approfondie
```

---

## Architecture

### Pattern Server / Client Components

Pour les pages de listing (catalogue, etc.), on sépare systématiquement :

```
app/catalogue/page.tsx         ← Server Component → metadata SEO, exporte la page
app/catalogue/client-page.tsx  ← Client Component → état, filtres, fetch
```

### Flux du formulaire de contact

1. `ContactForm` utilise React Hook Form + Zod (`contactFormSchema` dans `lib/validators.ts`)
2. **Honey-pot** invisible : champ `website` rempli ⇒ `submitStatus = 'success'` **sans** insert (silencieux pour les bots)
3. **Mode démo** (Supabase non configuré) : log console + alerte amber "Mode démo"
4. **Mode normal** : `supabase.from('leads').insert([{...payload, status: 'new'}])`
5. Sur erreur Supabase : alerte rouge avec message générique

### Sécurité

- **Row-Level Security** activé sur toutes les tables :
  - `products`, `categories`, `brands` → lecture publique
  - `leads` → INSERT public (formulaire), SELECT/UPDATE admin uniquement
  - `products` → écriture admin uniquement (vérifié via fonction `is_admin()`)
- **`is_admin()`** : fonction SECURITY DEFINER qui vérifie `EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())`
- **Aucun secret dans le code** : credentials admin hors démo via Supabase Auth (JWT session), credentials de fallback via env vars `NEXT_PUBLIC_ADMIN_*` (uniquement pour le dev)

### État

Pas de store global. Tout l'état est local via React hooks :

- `useState` → UI locale
- `useMemo` → calculs coûteux (filtrage/tri produits)
- `useEffect` → fetch + side effects
- React Hook Form pour les formulaires

---

## Auth admin

### Production (Supabase configuré)

1. Créer un utilisateur dans Supabase Dashboard → Authentication → Users
2. Insérer une ligne dans `admin_users` :
   ```sql
   INSERT INTO admin_users (user_id) VALUES ('<uuid-de-l-utilisateur>');
   ```
3. Se connecter via `/admin/login` avec email + password Supabase
4. Le dashboard `/admin` vérifie la session au mount et redirige vers `/admin/login` sinon

### Dev / mode démo (sans Supabase)

1. Définir `NEXT_PUBLIC_ADMIN_EMAIL` et `NEXT_PUBLIC_ADMIN_PASSWORD` dans `.env.local`
2. Se connecter via `/admin/login` — un flag `sessionStorage` est posé
3. **Ne pas déployer ce mode en prod** : les credentials sont visibles côté client

---

## Tests

Trois couches complémentaires verrouillent les fonctionnalités critiques.

### Unit (Vitest, 35 tests)

```bash
npm test                  # run unique
npm run test:watch        # watch mode (TDD)
npm run test:coverage     # coverage v8 → /coverage/index.html
```

Couvre :
- `lib/validators.ts` — 14 cas Zod (happy path, edge cases, honey-pot, trim, enum strict)
- `lib/routes.ts` — 8 cas (constantes, encodage URL, accents)
- `components/contact-form.tsx` — 6 cas (rendu, validation, honey-pot, demo, Supabase happy/error)
- `app/admin/login/page.tsx` — 6 cas (rendu, validation, config error, mauvais creds, succès → router.push)

### E2E (Playwright, 10 tests)

```bash
npm run test:e2e:install  # première fois : installer Chromium
npm run test:e2e          # run
npm run test:e2e:ui       # mode UI interactif
```

Tourne contre `npm run dev` (démarré automatiquement) en mode démo. Couvre :
- **Contact** : soumission valide, validation vide, honey-pot silencieux
- **Admin** : redirection sans session, validation email, mode non configuré
- **Navigation** : recherche header, catégorie, lien footer légal, page 404

> Le dev server compile à la demande — les tests sont sérialisés (`workers: 1`) pour éviter les courses de compilation HMR.

### RLS SQL (PL/pgSQL, 10 assertions)

```bash
# Option 1 (recommandée) : Supabase Dashboard → SQL Editor → coller supabase/tests/rls.test.sql → Run
# Option 2 : psql "$DATABASE_URL" -f supabase/tests/rls.test.sql
```

Idempotent (`BEGIN/ROLLBACK`), zéro effet de bord. Vérifie :
- anon peut INSERT mais pas SELECT/UPDATE sur `leads`
- anon peut SELECT mais pas UPDATE sur `products`
- `is_admin()` retourne false pour un user authentifié non-admin
- `is_admin()` retourne true après INSERT dans `admin_users`
- Admin peut UPDATE products et SELECT leads
- CHECK constraints rejettent les payloads invalides (message > 5000 chars)

Voir `supabase/tests/README.md` pour les détails d'exécution.

---

## Déploiement (Netlify)

Le projet est configuré pour un export statique (`output: 'export'` dans `next.config.js`).

```bash
npm run build              # génère /out
```

Variables d'environnement à définir dans Netlify Dashboard → Site Settings → Environment variables :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (optionnel) `NEXT_PUBLIC_ADMIN_EMAIL` / `NEXT_PUBLIC_ADMIN_PASSWORD` pour le fallback admin

Configuration Netlify dans `netlify.toml`.

---

## Conventions de code

- **Fichiers composants** : `kebab-case.tsx` (`contact-form.tsx`, `product-grid.tsx`)
- **Composants React** : `PascalCase`
- **`'use client'`** en haut de tout composant interactif (state, hooks, événements)
- **Props typées** : `interface ComponentNameProps { ... }`
- **Imports** : alias `@/` depuis la racine (`@/lib/...`, `@/components/...`)
- **Slugs URL** : minuscules avec tirets (`iphone-15-pro-max`)
- **Routes** : importer depuis `lib/routes.ts` (`ROUTES.contact`, `productPath(slug)`) — ne jamais hardcoder

---

## Documentation complémentaire

- **[CLAUDE.md](CLAUDE.md)** — guide dev approfondi : patterns détaillés, mocks Supabase pour les tests, hydratation Playwright, sécurité RLS
- **[supabase/tests/README.md](supabase/tests/README.md)** — exécution des tests RLS SQL
- **[tests/README.md](tests/README.md)** — conventions des tests (mocks, fixtures)

---

## Licence

Propriétaire — MobileTech Pro SARL
