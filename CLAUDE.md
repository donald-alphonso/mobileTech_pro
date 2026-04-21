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
- [ ] Dark mode : supporté en CSS variables mais pas totalement appliqué dans tous les composants
- [ ] Pas de système de panier/checkout (modèle contact uniquement — intentionnel)

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
