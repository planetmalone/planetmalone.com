import { expect, test } from './fixtures';

test.describe('Home', () => {
  test.beforeEach(async ({ home }) => home.goto());

  test('role cards: one open at a time, the first on load, and the flight path follows', async ({ home }) => {
    await expect(home.roleCards.first()).toHaveAttribute('open', '');
    await expect(home.activeMoon).toHaveAttribute('data-moon', 'aspira');

    await home.roleSummary('Technology Practice Director').click();
    await expect(home.openRoleCards).toHaveCount(1);
    await expect(home.activeMoon).toHaveAttribute('data-moon', 'stellar-elements');

    await home.roleSummary('Technology Practice Director').click();
    await expect(home.openRoleCards).toHaveCount(0);
    await expect(home.activeMoon).toHaveAttribute('data-moon', 'aspira');
  });

  test("the rocket flies to the open role's moon and parks beside it", async ({ home }) => {
    await home.section('experience').scrollIntoViewIfNeeded();
    await expect.poll(() => home.rocketDistanceTo('aspira'), { timeout: 8000 }).toBeLessThan(50);
    await home.roleSummary('RedTeam').click();
    await expect.poll(() => home.rocketDistanceTo('redteam'), { timeout: 5000 }).toBeLessThan(50);
    await home.roleSummary('U.S. Army').click();
    await expect.poll(() => home.rocketDistanceTo('us-army'), { timeout: 5000 }).toBeLessThan(50);
  });

  test('the census dragon ducks out of view and pops up in it', async ({ home, page }) => {
    await expect(home.dragon).toHaveAttribute('ducked', '');
    await home.section('about').scrollIntoViewIfNeeded();
    await expect(home.dragon).not.toHaveAttribute('ducked');
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await expect(home.dragon).toHaveAttribute('ducked', '');
  });

  test('bio switcher shows one length at a time', async ({ home }) => {
    expect(await home.visibleBios()).toEqual(['short']);
    await home.chooseBioLength('Way too long');
    expect(await home.visibleBios()).toEqual(['way']);
    await home.bioInput('way').press('ArrowLeft');
    expect(await home.visibleBios()).toEqual(['long']);
  });

  test('copy email writes the address and confirms everywhere', async ({ home, context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await home.heroCopyEmail.click();
    await expect(home.copyEmailButtons).toHaveText(['Copied!', 'Copied!', 'Copied!']);
    await expect(home.toast.message).toHaveText('Copied. Your clipboard is now 12% more Malone.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('sean@planetmalone.com');
    await expect(home.copyEmailButtons.first()).toHaveText('Copy email', { timeout: 5000 });
  });

  test('the rail follows the section being read', async ({ home }) => {
    await expect(home.currentRailLink).toHaveAttribute('data-rail-link', 'impact');
    for (const id of ['experience', 'about', 'contact']) {
      await home.railLink(id).click();
      await expect(home.currentRailLink).toHaveAttribute('data-rail-link', id);
    }
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
