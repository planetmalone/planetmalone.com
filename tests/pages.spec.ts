import { expect, test } from './fixtures';

test.describe('Other routes', () => {
  test('case studies loop through Previous / Next', async ({ caseStudy }) => {
    await caseStudy.goto('fifty-person-practice');
    await expect(caseStudy.header.currentPage).toHaveText('Work');
    await expect(caseStudy.neighborTitles).toHaveText([
      'Micro-frontend platform for 5 teams',
      'NextGen design system & React Aria migration',
    ]);
  });

  test('the 404 names the missing path and opens ⌘K', async ({ notFound }) => {
    const response = await notFound.goto('/the-far-side-of-the-moon');
    expect(response?.status()).toBe(404);
    await expect(notFound.badPath).toHaveText('/the-far-side-of-the-moon');
    await notFound.openPaletteButton.click();
    await notFound.palette.expectOpen();
  });

  test('home card → case study morphs exactly one title', async ({ home, caseStudy, page }) => {
    await page.addInitScript(() =>
      addEventListener('pagereveal', (e) => {
        const vt = (e as Event & { viewTransition?: ViewTransition }).viewTransition;
        vt?.ready.then(() => {
          (window as unknown as { groups: string }).groups = [
            ...new Set(
              document
                .getAnimations()
                .map((a) => (a.effect as KeyframeEffect | null)?.pseudoElement ?? '')
                .filter((p) => p.startsWith('::view-transition-group')),
            ),
          ]
            .sort()
            .join(',');
        });
      }),
    );
    await home.goto();
    await home.caseCardLinks.first().click();
    await expect(page).toHaveURL(/\/work\/nextgen-design-system$/);
    await expect(caseStudy.title).toHaveText('NextGen design system & React Aria migration');
    await expect
      .poll(() => page.evaluate(() => (window as unknown as { groups?: string }).groups))
      .toBe('::view-transition-group(case-title),::view-transition-group(root)');
  });
});
