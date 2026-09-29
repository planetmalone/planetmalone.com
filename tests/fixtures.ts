import { test as base } from '@playwright/test';
import { CaseStudyPage } from './pages/CaseStudy.page';
import { HomePage } from './pages/Home.page';
import { NotFoundPage } from './pages/NotFound.page';
import { Site } from './pages/Site.page';

/**
 * Playwright's `test`, with the site's Page Objects as fixtures. Specs import
 * `test` and `expect` from here and ask for the pages they need:
 *
 *   test('…', async ({ home }) => { await home.goto(); … });
 */
export const test = base.extend<{
  site: Site;
  home: HomePage;
  caseStudy: CaseStudyPage;
  notFound: NotFoundPage;
}>({
  site: async ({ page }, use) => use(new Site(page)),
  home: async ({ page }, use) => use(new HomePage(page)),
  caseStudy: async ({ page }, use) => use(new CaseStudyPage(page)),
  notFound: async ({ page }, use) => use(new NotFoundPage(page)),
});

export { expect } from '@playwright/test';
export { routes } from './pages/Site.page';
