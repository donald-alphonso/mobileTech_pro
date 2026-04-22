# Tests — MobileTech Pro

Suite de tests à trois étages. Vue d'ensemble dans le [README racine](../README.md#tests) et la [section Tests de CLAUDE.md](../CLAUDE.md#tests).

## Layout

```
tests/
├── unit/                      # Vitest + jsdom + @testing-library/react
│   ├── validators.test.ts     # Schémas Zod (contact + admin login)
│   ├── routes.test.ts         # ROUTES + helpers d'URL
│   ├── contact-form.test.tsx  # Composant ContactForm (mocks Supabase)
│   └── admin-login.test.tsx   # Composant AdminLoginPage (mocks Supabase + router)
└── e2e/                       # Playwright (Chromium)
    ├── contact.spec.ts        # Soumission, validation, honey-pot
    ├── admin.spec.ts          # Redirection, validation email, mode non configuré
    ├── navigation.spec.ts     # Recherche, catégorie, footer, 404
    └── helpers.ts             # waitForFormHydration / waitForReactHydration
```

Tests RLS SQL (hors Vitest/Playwright) : `supabase/tests/rls.test.sql` — voir `supabase/tests/README.md`.

## Commandes

```bash
npm test                  # Vitest run (35 tests, ~30s)
npm run test:watch        # Vitest watch
npm run test:coverage     # Coverage v8
npm run test:e2e          # Playwright (10 tests, ~1min, dev server auto-démarré)
npm run test:e2e:ui       # Playwright UI
npm run test:e2e:install  # Installer Chromium (1ère fois)
```

## Conventions

### Mocker Supabase dans un test de composant

`vi.mock` est hoisted au-dessus des imports — utiliser `vi.hoisted` pour les mocks :

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  isConfigured: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: () => mocks.isConfigured(),
  supabase: { from: () => ({ insert: mocks.insert }) },
}));

beforeEach(() => {
  mocks.insert.mockReset();
  mocks.isConfigured.mockReset().mockReturnValue(true);
  mocks.insert.mockResolvedValue({ data: null, error: null });
});
```

### Mocker `useRouter` (next/navigation)

```ts
const mocks = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
}));
```

### Polyfills jsdom (déjà dans `vitest.setup.ts`)

Radix UI requiert : `ResizeObserver`, `IntersectionObserver`, `matchMedia`, `Element.prototype.hasPointerCapture`, `Element.prototype.scrollIntoView`. Ne pas les ajouter individuellement dans chaque test — ils sont injectés globalement.

### Sélecteurs Testing Library

- Préférer `getByLabelText(/Label \*/i)` pour les inputs
- Pour des labels qui matcheraient plusieurs éléments (ex. "Nom" matche "Prénom"), utiliser un anchor : `getByLabelText(/^Nom \*/i)`
- Pour des messages de validation longs, **chaîne exacte plutôt que regex** : `findByText('Le prénom doit contenir au moins 2 caractères')` (évite les ambiguïtés du type "préNOM doit..." vs "NOM doit...")

### Hydratation Playwright

Toujours attendre l'hydratation React avant de cliquer un `<Button type="submit">`, sinon le clic déclenche une soumission HTML native (rechargement GET). Helpers :

```ts
import { waitForFormHydration, waitForReactHydration } from './helpers';

// Pages avec formulaire
await page.goto('/contact');
await waitForFormHydration(page);

// Pages sans formulaire (navigation, 404)
await page.goto('/');
await waitForReactHydration(page);
```

`waitForFormHydration` vérifie que le `<form>` ET tous ses inputs ont leurs handlers React bound (via `__reactProps$xxx`).

### Pourquoi `workers: 1` dans `playwright.config.ts`

Next.js dev mode compile les routes à la demande au premier hit. Plusieurs workers Playwright qui hit le dev server en parallèle créent des courses de compilation HMR — symptômes typiques : champs de formulaire vidés mid-soumission, hydratation incomplète, timeouts aléatoires. Sérialiser supprime ces flaky failures.

En CI (avec un build prod statique), on pourra réactiver `fullyParallel: true` + `workers > 1`.

## Ajouter un test

| Type de changement | Action |
|---|---|
| Nouveau champ dans un schéma Zod | Cas valide + cas invalide dans `tests/unit/validators.test.ts` |
| Nouveau composant interactif | Nouveau fichier `tests/unit/<composant>.test.tsx` (mock Supabase si besoin) |
| Nouveau flux user-facing | Test dans le bon `tests/e2e/*.spec.ts` (créer un nouveau spec si nouveau domaine) |
| Nouvelle policy RLS | Bloc `DO $$ ASSERT ... $$` dans `supabase/tests/rls.test.sql` |
| Nouveau helper de routes | Cas dans `tests/unit/routes.test.ts` (vérifier l'encodage URL) |
