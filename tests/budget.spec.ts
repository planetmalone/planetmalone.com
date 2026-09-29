import { expect, routes, test } from './fixtures';

/** The Colophon's promise: 100 KB of JavaScript or less on any page (uncompressed). */
const BUDGET = 100 * 1024;

for (const route of routes) {
  test(`JS budget: ${route}`, async ({ site, page }) => {
    let bytes = 0;
    page.on('response', async (res) => {
      if (res.request().resourceType() === 'script') bytes += (await res.body()).length;
    });
    await site.goto(route);
    await page.waitForLoadState('networkidle');
    expect(bytes, `${Math.round(bytes / 1024)} KB of JS`).toBeLessThanOrEqual(BUDGET);
  });
}
