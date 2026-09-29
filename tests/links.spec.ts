import { expect, routes, test } from './fixtures';

/**
 * Every internal link on every page must resolve. The résumé PDFs are added
 * by hand later (see docs/build-plan.md › Phase 6); until they exist the
 * check reports them as a warning instead of failing.
 */
const pending = ['/resume-staff.pdf', '/resume-em.pdf'];

test('internal links resolve', async ({ site, page, request }) => {
  const links = new Set<string>();
  for (const route of routes.filter((r) => r !== '/lost-in-space')) {
    await site.goto(route);
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const url = new URL(href);
      if (url.origin === new URL(page.url()).origin) links.add(url.pathname);
    }
  }

  const broken: string[] = [];
  for (const path of links) {
    const status = (await request.head(path)).status();
    if (status === 200) continue;
    if (pending.includes(path))
      test.info().annotations.push({ type: 'warning', description: `${path} not added yet` });
    else broken.push(`${path} → ${status}`);
  }
  expect(broken).toEqual([]);
});
