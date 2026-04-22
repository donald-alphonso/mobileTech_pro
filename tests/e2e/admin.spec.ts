import { test, expect, Page } from '@playwright/test';
import { waitForFormHydration } from './helpers';

async function gotoLoginReady(page: Page) {
  await page.goto('/admin/login');
  await expect(page.getByLabel(/^Email$/i)).toBeVisible();
  await waitForFormHydration(page);
}

test.describe('Admin auth', () => {
  test('redirects to login when accessing /admin without session', async ({ page }) => {
    await page.goto('/admin');

    // app/admin/page.tsx performs a client-side redirect via router.push in useEffect.
    await page.waitForURL(/\/admin\/login/);
    await expect(page).toHaveURL(/\/admin\/login$/);
  });

  test('shows validation error on invalid email', async ({ page }) => {
    await gotoLoginReady(page);

    await page.getByLabel(/^Email$/i).fill('not-an-email');
    await page.getByLabel(/Mot de passe/i).fill('x');
    await page.getByRole('button', { name: /Se connecter/i }).click();

    await expect(page.getByText(/Email invalide/i)).toBeVisible();
  });

  // Assumes the dev server is running without Supabase env vars (demo mode).
  // If NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set, this test
  // should be skipped manually — the login will hit a real auth endpoint instead.
  test('shows config-error when Supabase not configured', async ({ page }) => {
    await gotoLoginReady(page);

    await page.getByLabel(/^Email$/i).fill('admin@example.com');
    await page.getByLabel(/Mot de passe/i).fill('anything');
    await page.getByRole('button', { name: /Se connecter/i }).click();

    await expect(page.getByText(/n'est pas configurée/i)).toBeVisible();
  });
});
