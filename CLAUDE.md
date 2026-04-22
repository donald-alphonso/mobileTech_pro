# CLAUDE.md — MobileTech Pro

## Vue d'ensemble

Plateforme e-commerce de vente de smartphones et accessoires mobiles.
Modèle de vente par contact (pas de panier/checkout) : les clients passent par un formulaire de contact.

**Stack** : Next.js 13.5.1 · TypeScript 5 (strict) · Tailwind CSS · Shadcn/ui · Supabase (PostgreSQL) · Netlify (déploiement)

---

## Architecture

### Next.js App Router

- `app/` → pages (App Router, Next.js 13)
- `components/` → composants React réutilisables
- `components/ui/` → composants Shadcn/ui (ne pas modifier manuellement)
- `lib/` → utilitaires partagés (supabase client, cn utility)
- `hooks/` → custom React hooks
- `supabase/migrations/` → migrations SQL

### Pattern Server / Client

```
app/catalogue/page.tsx         ← Server Component (SEO, metadata)
app/catalogue/client-page.tsx  ← Client Component (interactivité, filtres)
```

Toujours séparer les concerns : page.tsx pour SEO/metadata, client-page.tsx pour la logique interactive.

### Routing

```
/                          → Home
/catalogue                 → Listing produits
/produit/[slug]            → Détail produit (route dynamique)
/contact                   → Formulaire contact
/a-propos                  → À propos
/admin                     → Dashboard admin
/admin/login               → Login admin
/cgv                       → CGV
/mentions-legales          → Mentions légales
/politique-confidentialite → Politique de confidentialité
```

---

## Base de données (Supabase)

### Tables principales

| Table | Rôle |
|---|---|
| `products` | Catalogue produits (JSONB pour features/specs/images) |
| `leads` | Soumissions formulaire contact |
| `categories` | Catégories produits |
| `brands` | Marques |

### Champs clés — products

- `slug` → URL du produit (`/produit/[slug]`)
- `is_featured` → affichage homepage
- `is_promotion` → badge promo rouge
- `features` (JSONB) → liste de caractéristiques
- `specifications` (JSONB) → fiche technique
- `images` (JSONB) → tableau d'URLs

### Champs clés — leads

- `status` → enum : `new | contacted | qualified | converted | closed`
- `contact_method` → enum : `email | phone | both`

### Sécurité

Row-Level Security (RLS) activé sur toutes les tables :
- Lecture publique : `products`, `categories`, `brands`
- Écriture publique : `leads` (formulaire contact)
- Admin uniquement : écriture sur `products`, lecture/update sur `leads`

### Fallback mock data

Quand Supabase n'est pas configuré (`isSupabaseConfigured()` retourne false), les composants utilisent des données mockées locales. Permet le développement sans backend.

```typescript
if (!isSupabaseConfigured()) {
  setProducts(mockProducts);
  return;
}
```

---

## Patterns de code

### Styling

- **Tailwind CSS** utility-first, mobile-first (`md:`, `lg:` breakpoints)
- **CSS Variables** HSL dans `globals.css` pour le thème (dark mode supporté)
- **cn()** de `lib/utils.ts` pour merger les classes conditionnelles
- **Shadcn/ui** : ne pas modifier les fichiers dans `components/ui/` directement

```typescript
import { cn } from "@/lib/utils"
className={cn("base-classes", condition && "conditional-class")}
```

### Formulaires

React Hook Form + Zod pour la validation :

```typescript
const schema = z.object({ ... })
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema)
})
```

### Fetch de données

Pattern standard dans les client components :

```typescript
useEffect(() => {
  const fetchData = async () => {
    if (!isSupabaseConfigured()) { /* mock */ return; }
    const { data, error } = await supabase.from('products').select('*');
    if (error) { console.error(error); return; }
    setProducts(data);
  };
  fetchData();
}, []);
```

### Loading states

Skeleton avec `animate-pulse` pendant le chargement :

```tsx
{loading ? (
  <div className="animate-pulse bg-gray-200 rounded h-48 w-full" />
) : (
  <ProductCard product={product} />
)}
```

---

## Composants clés

| Composant | Rôle |
|---|---|
| `navigation.tsx` | Header sticky, menu mobile hamburger |
| `hero-section.tsx` | Carousel auto-rotate (5s), slides multiples |
| `product-grid.tsx` | Grille produits, vue liste/grille, tri, pagination (12/page) |
| `product-filters.tsx` | Sidebar filtres : catégorie, prix, marque, stock |
| `product-details.tsx` | Fiche produit, onglets specs/features |
| `product-gallery.tsx` | Galerie images avec zoom, miniatures |
| `contact-form.tsx` | Formulaire → sauvegarde dans `leads` Supabase |
| `admin-dashboard.tsx` | Interface admin tabulée (Stats/Produits/Leads/Catégories) |

### Flux des filtres

```
ProductFilters (état local)
    ↓ callback
CatalogueClientPage (état agrégé)
    ↓ props
ProductGrid (affichage filtré, mémoïsé avec useMemo)
```

---

## État / State management

Pas de store global (pas de Redux, Zustand, ou Context API).
Tout l'état est local via React hooks :

- `useState` → UI locale (filtres, formulaires, modaux)
- `useMemo` → calculs coûteux (liste filtrée/triée)
- `useEffect` → side effects (fetch, timers)
- `useCallback` → callbacks mémoïsés

---

## Configuration importante

### next.config.js

```js
output: 'export'  // ← export statique HTML (important pour Netlify)
images: { unoptimized: true }  // ← requis pour static export
```

### Alias TypeScript

```json
"@/*" → racine du projet
```

Toujours importer avec `@/components/...`, `@/lib/...`.

### Déploiement

- **Netlify** configuré via `netlify.toml`
- Build : `next build` → génère dossier `out/`

---

## Admin

- Login : `admin/login/page.tsx` — credentials hardcodés (**TODO : sécuriser**)
- Pas de garde d'auth réel implémenté encore (**TODO**)
- Dashboard : `admin/page.tsx` → `components/admin/admin-dashboard.tsx`

**Credentials actuels (dev only)** :
- Email : `admin@mobiletech-pro.fr`
- Password : `admin123`

---

## TODO / Points d'attention

- [x] Implémenter la vraie authentification admin (Supabase Auth + fallback env vars)
- [x] Ajouter un garde de route sur `/admin` (useEffect + sessionStorage fallback)
- [x] Sécuriser les credentials admin (supprimés du code, déplacés dans `.env.local`)
- [x] Suite de tests automatisés (Vitest unit + Playwright E2E + RLS SQL)
- [ ] Dark mode : supporté en CSS variables mais pas totalement appliqué dans tous les composants
- [ ] Pas de système de panier/checkout (modèle contact uniquement — intentionnel)
- [ ] CI GitHub Actions pour lancer la suite de tests sur chaque push (hors scope phase dev)

### Auth — fonctionnement actuel

- **Avec Supabase configuré** : `supabase.auth.signInWithPassword()` → session JWT
- **Sans Supabase** : credentials via `NEXT_PUBLIC_ADMIN_EMAIL` / `NEXT_PUBLIC_ADMIN_PASSWORD` dans `.env.local` → flag `sessionStorage`
- La garde de route dans `app/admin/page.tsx` vérifie la session au mount et redirige vers `/admin/login` si non authentifié

---

## Conventions

- Fichiers composants : `kebab-case.tsx`
- Composants React : `PascalCase`
- `'use client'` en haut de tout composant interactif
- Props typées avec `interface ComponentNameProps { ... }`
- Slugs en minuscules avec tirets pour les URLs produits

---

## Tests

Trois couches complémentaires :

| Couche | Outil | Cible |
|---|---|---|
| Unit | Vitest + jsdom + @testing-library/react | Schémas Zod, helpers de routes, composants critiques (ContactForm, AdminLogin) |
| E2E | Playwright (Chromium) | Flux user-facing : contact, admin, navigation, 404 |
| RLS | PL/pgSQL `ASSERT` dans `BEGIN/ROLLBACK` | Politiques Supabase : leads, products, fonction `is_admin()` |

### Commandes

```bash
npm test                  # Vitest run (35 tests)
npm run test:watch        # Vitest watch mode
npm run test:coverage     # Coverage v8 (text + html dans /coverage)
npm run test:e2e          # Playwright (10 tests)
npm run test:e2e:ui       # Playwright UI mode
npm run test:e2e:install  # Installer les browsers Playwright (Chromium)
```

**RLS** : copier `supabase/tests/rls.test.sql` dans Supabase Dashboard → SQL Editor → Run, ou `psql -f`. Voir `supabase/tests/README.md`.

### Localisation

- `tests/unit/` → tests Vitest
- `tests/e2e/` → tests Playwright (helpers communs dans `tests/e2e/helpers.ts`)
- `supabase/tests/` → script SQL RLS + README
- `vitest.config.ts` / `vitest.setup.ts` → config + polyfills jsdom (ResizeObserver, IntersectionObserver, matchMedia, hasPointerCapture pour Radix UI)
- `playwright.config.ts` → config Chromium, `webServer.command = npm run dev`, **workers=1** (Next dev compile à la demande, parallélisme = courses HMR)

### Pattern de mock Supabase (vi.hoisted)

```ts
const mocks = vi.hoisted(() => ({ insert: vi.fn(), isConfigured: vi.fn() }));

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: () => mocks.isConfigured(),
  supabase: { from: () => ({ insert: mocks.insert }) },
}));
```

`vi.hoisted` est obligatoire car `vi.mock` est hoisted au-dessus des imports — les variables module-scope ne sont pas accessibles dans la factory de mock.

### Pattern d'attente d'hydratation Playwright

Les tests Playwright doivent attendre l'hydratation React avant d'interagir avec un formulaire — sinon, cliquer sur `<Button type="submit">` déclenche une soumission HTML native (rechargement GET) qui efface tout le state React. Helper dans `tests/e2e/helpers.ts` :

```ts
await waitForFormHydration(page);  // vérifie form.onSubmit + tous les inputs.onChange via __reactProps$
```

### Convention pour ajouter un test

- **Schéma Zod** ajouté dans `lib/validators.ts` → ajouter au moins un cas valide + un cas invalide dans `tests/unit/validators.test.ts`
- **Composant interactif nouveau** → ajouter `tests/unit/<composant>.test.tsx` (mock Supabase si besoin)
- **Flux user-facing nouveau** → ajouter un test dans le bon fichier `tests/e2e/*.spec.ts`
- **Politique RLS modifiée** → étendre `supabase/tests/rls.test.sql` avec un nouveau bloc `DO $$ ASSERT ... $$`

---

## Pièges récurrents (à connaître avant de toucher au code)

### Tests

1. **`vi.mock` est hoisté au-dessus des imports** — référencer une `const` déclarée à côté = `ReferenceError: Cannot access 'X' before initialization`. Toujours utiliser `vi.hoisted(() => ({ ... }))` pour les mocks.

2. **Radix UI ne tourne pas dans jsdom sans polyfills** — `RadioGroup`, `Select`, `Dialog` plantent avec `ResizeObserver is not defined`, `hasPointerCapture is not a function`, etc. Polyfills déjà dans `vitest.setup.ts` — ajouter là si nouveau composant Radix utilisé dans un test.

3. **Hydratation Playwright = piège silencieux** — un clic sur `<Button type="submit">` avant que React ait bound `onSubmit` = soumission HTML native (GET reload). Le test échoue avec un message style "success alert not visible" alors que la vraie cause est invisible. Toujours utiliser `waitForFormHydration(page)` du helper avant le premier clic submit.

4. **Sélecteurs Testing Library : `Prénom` matche aussi "Nom"** — `getByLabelText(/Nom/i)` retourne 2 éléments car "préNOM" contient "Nom". Utiliser un anchor : `getByLabelText(/^Nom \*/i)`.

5. **Messages de validation : préférer la chaîne exacte au regex** — `findByText(/au moins 2 caractères/i)` matche "Le **prénom** doit contenir au moins 2 caractères" ET "Le **nom** doit contenir au moins 2 caractères" → ambiguïté. Utiliser `findByText('Le prénom doit contenir au moins 2 caractères')` ou `.first()`.

6. **Next dev + Playwright parallèle = flakiness** — Next compile chaque route au premier hit. Plusieurs workers Playwright qui hit le même dev server créent des courses de compilation HMR (formulaires vidés mid-soumission, hydratation incomplète). `playwright.config.ts` est en `workers: 1` pour cette raison.

### Sécurité

7. **Honey-pot doit rester silencieux** — ne JAMAIS rejeter le champ `website` au niveau Zod avec un message d'erreur visible (ex. `z.string().max(0, 'Spam détecté')`). Cela signale au bot qu'il a été détecté. Le rejet doit être silencieux dans `ContactForm.onSubmit` qui simule un succès complet (`setSubmitStatus('success')` + `reset()`).

8. **Politiques RLS ne s'appliquent PAS au rôle `service_role`** — toujours tester avec `SET LOCAL ROLE anon` ou `authenticated`. Une requête depuis le SQL editor sans rôle explicite peut donner un faux positif.

### Frontend

9. **Toutes les images sont des URLs Pexels externes** — `hero-section.tsx`, `featured-products.tsx`, `product-categories.tsx` chargent des images depuis `images.pexels.com`. Si Pexels change/supprime ces URLs, le site se casse. À terme : héberger les images en local ou via Supabase Storage.

10. **Pas de balises `<img>`, uniquement des `background-image` CSS** — donc aucun `alt` text. Mauvais pour l'accessibilité ET le SEO. À fixer pour un projet vraiment "présentable".

11. **`output: 'export'` désactive les API routes et `next/image` optimisé** — `images.unoptimized: true` est obligatoire dans `next.config.js`. Pas de Server Actions, pas de Route Handlers dynamiques, pas de revalidation ISR. Tout est statique au build.

12. **Pas de `public/` ni de favicon** — `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` n'existent pas. Le navigateur affiche le favicon par défaut. À fixer avant toute mise en prod.
