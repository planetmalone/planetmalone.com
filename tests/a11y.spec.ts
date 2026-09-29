import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, routes, test } from './fixtures';

/** WCAG 2.2 AA rules (axe also runs the 2.0 and 2.1 rules under these tags). */
const violations = async (page: Page) =>
  (
    await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
  ).violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`Accessibility (${scheme})`, () => {
    test.use({ colorScheme: scheme });

    for (const route of routes) {
      test(route, async ({ site, page }) => {
        await site.goto(route);
        expect(await violations(page)).toEqual([]);
      });
    }

    test('⌘K palette open', async ({ home, page }) => {
      await home.goto();
      await home.palette.open();
      expect(await violations(page)).toEqual([]);
    });

    test('mobile menu open', async ({ home, page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await home.goto();
      await home.header.openMenu();
      expect(await violations(page)).toEqual([]);
    });
  });
}
