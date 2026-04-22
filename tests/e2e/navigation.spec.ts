import { test, expect } from '@playwright/test';
import { waitForReactHydration, waitForFormHydration } from './helpers';

test.describe('Navigation', () => {
  test('header search navigates to catalogue with query', async ({ page }) => {
    await page.goto('/');
    await waitForFormHydration(page, 'form:has(#nav-search)');

    const searchInput = page.locator('#nav-search');
    await searchInput.fill('iphone');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/catalogue\?.*q=iphone/);
  });

  test('clicking a category card goes to filtered catalogue', async ({ page }) => {
    await page.goto('/');
    await waitForReactHydration(page);

    // product-categories.tsx renders a Link with heading "Smartphones".
    // Multiple links mention "Smartphones" (footer, nav) — scope to the categories
    // section by filtering on the card text "150+ modèles".
    const smartphoneCard = page
      .getByRole('link', { name: /Smartphones/i })
      .filter({ hasText: /150\+ modèles/i });
    await smartphoneCard.click();

    await expect(page).toHaveURL(/\/catalogue\?category=smartphones/);
  });

  test('footer legal link navigates to /mentions-legales', async ({ page }) => {
    await page.goto('/');
    await waitForReactHydration(page);

    const legalLink = page.getByRole('link', { name: /Mentions Légales/i });
    await legalLink.scrollIntoViewIfNeeded();
    await legalLink.click();

    await expect(page).toHaveURL(/\/mentions-legales$/);
  });

  test('unknown route shows 404 page with link home', async ({ page }) => {
    await page.goto(`/route-inexistante-${Date.now()}`);
    await waitForReactHydration(page);

    await expect(page.getByText(/Page non trouvée/i)).toBeVisible();

    await page.getByRole('link', { name: /Retour à l'accueil/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
