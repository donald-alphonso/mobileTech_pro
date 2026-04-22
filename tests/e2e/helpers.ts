import { Page } from '@playwright/test';

/**
 * Wait until React Hook Form has finished registering EVERY input in the form.
 * We check that:
 *   1. The form element has a React fiber `onSubmit` prop bound, AND
 *   2. Every text/email input inside the form has a React fiber `onChange`
 *      prop bound (which RHF attaches via its `register` callback ref).
 *
 * Just checking the form's onSubmit is insufficient: RHF's per-field register
 * callbacks fire after the form mounts, and Playwright's `fill()` issued before
 * those callbacks complete will set the DOM value but RHF won't track it,
 * causing the field to read as empty at submit time.
 *
 * `networkidle` is unreliable in Next.js dev mode — the long-poll
 * /_next/webpack-hmr connection keeps the network busy indefinitely.
 */
export async function waitForFormHydration(page: Page, formSelector = 'form') {
  await page.waitForFunction(
    (selector) => {
      const reactProps = (el: Element) => {
        const key = Object.keys(el).find((k) => k.startsWith('__reactProps$'));
        return key ? (el as unknown as Record<string, Record<string, unknown>>)[key] : null;
      };

      const form = document.querySelector(selector) as HTMLFormElement | null;
      if (!form) return false;
      const formProps = reactProps(form);
      if (!formProps || typeof formProps.onSubmit !== 'function') return false;

      const inputs = form.querySelectorAll<HTMLInputElement>(
        'input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="search"], textarea'
      );
      if (inputs.length === 0) return false;

      for (const input of Array.from(inputs)) {
        const props = reactProps(input);
        if (!props || typeof props.onChange !== 'function') return false;
      }
      return true;
    },
    formSelector,
    { timeout: 15_000 }
  );
}

/**
 * Wait until the document body has React fiber props — a coarse signal that the
 * client bundle has executed and hydration is at least underway. Use for pages
 * without a form.
 */
export async function waitForReactHydration(page: Page) {
  await page.waitForFunction(
    () => {
      const root = document.body;
      return Object.keys(root).some(
        (k) => k.startsWith('__reactContainer$') || k.startsWith('__reactProps$')
      );
    },
    { timeout: 15_000 }
  );
}
