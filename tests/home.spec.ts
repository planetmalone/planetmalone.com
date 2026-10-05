import { expect, test } from './fixtures';

test.describe('Home', () => {
  test.beforeEach(async ({ home }) => home.goto());

  test('the journey runs oldest first, with the degree as a satellite in its year', async ({ home }) => {
    await expect(home.stops).toHaveCount(10);
    expect(await home.stops.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.stop))).toEqual([
      'us-army',
      'epic-solutions',
      'ut-dallas',
      'infor',
      'projekt202',
      'redibs',
      'stellar-elements',
      'apollo',
      'redteam',
      'aspira',
    ]);
  });

  test('the rocket flies to the planet nearest the middle, and turns around going back up', async ({
    home,
  }) => {
    await home.centerStop('redteam');
    await expect(home.currentStop).toHaveAttribute('data-stop', 'redteam');
    // Parks just short of the planet: above it on the way down...
    await expect
      .poll(async () => (await home.rocketFrom('redteam')).distance, { timeout: 5000 })
      .toBeLessThan(80);
    expect((await home.rocketFrom('redteam')).dy).toBeLessThan(0);

    await home.centerStop('infor');
    await expect(home.currentStop).toHaveAttribute('data-stop', 'infor');
    // ...and below it on the way back up.
    await expect
      .poll(async () => (await home.rocketFrom('infor')).distance, { timeout: 5000 })
      .toBeLessThan(80);
    expect((await home.rocketFrom('infor')).dy).toBeGreaterThan(0);
  });

  test('the header is clear over the hero and glass past it, even after a refresh', async ({
    home,
    page,
  }) => {
    await expect(home.header.root).toHaveAttribute('data-over-hero', '');
    await home.section('impact').scrollIntoViewIfNeeded();
    await expect(home.header.root).not.toHaveAttribute('data-over-hero');
    await page.reload();
    await expect(home.header.root).not.toHaveAttribute('data-over-hero');
  });

  test('the census dragon ducks out of view and pops up in it', async ({ home, page }) => {
    await expect(home.dragon).toHaveAttribute('ducked', '');
    await home.section('about').scrollIntoViewIfNeeded();
    await expect(home.dragon).not.toHaveAttribute('ducked');
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await expect(home.dragon).toHaveAttribute('ducked', '');
  });

  test('copy email writes the address and confirms', async ({ home, context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await home.copyEmail.click();
    await expect(home.copyEmail).toHaveText('Copied!');
    await expect(home.toast.message).toHaveText('Copied. Your clipboard is now 12% more Malone.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('sean@planetmalone.com');
    await expect(home.copyEmail).toHaveText('Copy email', { timeout: 5000 });
  });

  test('shows the local time on Planet Malone', async ({ home }) => {
    await expect(home.clock).toHaveText(/^\d{1,2}:\d{2}\s[AP]M$/);
  });

  test('prints the two-page résumé instead of the page', async ({ home, page }) => {
    await page.emulateMedia({ media: 'print' });
    await expect(home.resume).toBeVisible();
    await expect(home.section('impact')).toBeHidden();
    const pdf = await page.pdf({ preferCSSPageSize: true });
    expect(pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g)).toHaveLength(2);
  });
});
