import { expect, test } from './fixtures';

test.describe('Home', () => {
  test.beforeEach(async ({ home }) => home.goto());

  test('role cards: one open at a time, the first on load, and the scenic route follows', async ({
    home,
  }) => {
    await expect(home.roleCards.first()).toHaveAttribute('open', '');
    await expect(home.currentStage).toHaveAttribute('data-stage', 'staff');

    await home.roleSummary('Technology Practice Director').click();
    await expect(home.openRoleCards).toHaveCount(1);
    await expect(home.currentStage).toHaveAttribute('data-stage', 'director');

    await home.roleSummary('Technology Practice Director').click();
    await expect(home.openRoleCards).toHaveCount(0);
    await expect(home.currentStage).toHaveAttribute('data-stage', 'staff');
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
