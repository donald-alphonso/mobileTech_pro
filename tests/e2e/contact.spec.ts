import { test, expect, Page } from '@playwright/test';
import { waitForFormHydration } from './helpers';

async function gotoContactReady(page: Page) {
  await page.goto('/contact');
  await expect(page.getByLabel(/Prénom \*/)).toBeVisible();
  // Crucial: ensure React Hook Form has bound the form's onSubmit handler before
  // we click the submit button. Without this, the click triggers a native HTML
  // form submission (GET reload) and the success/error alert never appears.
  await waitForFormHydration(page);
}

test.describe('Contact form', () => {
  test('submits successfully in demo mode', async ({ page }) => {
    await gotoContactReady(page);

    await page.getByLabel(/Prénom \*/).fill('Jean');
    await page.getByLabel(/Nom \*/).fill('Dupont');
    await page.getByLabel(/Email \*/).fill('jean@example.com');
    await page.getByLabel(/Sujet \*/).fill('Test de contact');
    await page.getByLabel(/Message \*/).fill('Ceci est un message de test avec plus de dix caractères.');

    await page.getByRole('button', { name: /Envoyer le message/i }).click();

    // Demo branch waits ~800ms then sets submitStatus = 'success'.
    await expect(page.getByText(/envoyé avec succès/i)).toBeVisible({ timeout: 10_000 });
  });

  test('shows validation errors when submitted empty', async ({ page }) => {
    await gotoContactReady(page);

    await page.getByRole('button', { name: /Envoyer le message/i }).click();

    // Zod emits messages like "Le prénom doit contenir au moins 2 caractères".
    // Use .first() because the same regex matches both prénom and nom errors.
    await expect(page.getByText(/au moins 2 caractères/i).first()).toBeVisible();
  });

  test('honey-pot does not break submission', async ({ page }) => {
    await gotoContactReady(page);

    // Fill honey-pot FIRST. Filling it last has been observed to race with RHF's
    // auto-focus on the first input after hydration, leaving the visible field
    // value cleared. Honey-pot bots fill all fields including hidden ones, so
    // this ordering is still representative.
    await page.locator('input[name="website"]').fill('http://spam.example');

    await page.getByLabel(/Prénom \*/).fill('Jean');
    await page.getByLabel(/Nom \*/).fill('Dupont');
    await page.getByLabel(/Email \*/).fill('jean@example.com');
    await page.getByLabel(/Sujet \*/).fill('Test honeypot');
    await page.getByLabel(/Message \*/).fill('Message suffisamment long pour passer la validation.');

    await page.getByRole('button', { name: /Envoyer le message/i }).click();

    // Honey-pot branch in contact-form.tsx sets submitStatus = 'success' synchronously
    // without inserting anything. The success alert should appear immediately.
    await expect(page.getByText(/envoyé avec succès/i)).toBeVisible({ timeout: 10_000 });
  });
});
