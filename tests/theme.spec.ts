import { expect, test } from './fixtures';

test.describe('Theme and motion', () => {
  test.describe('in a dark OS', () => {
    test.use({ colorScheme: 'dark' });

    test('follows the OS by default', async ({ home }) => {
      await home.goto();
      await expect(home.html).toHaveAttribute('data-theme', 'dark');
      await home.page.emulateMedia({ colorScheme: 'light' });
      await expect(home.html).toHaveAttribute('data-theme', 'light');
    });
  });

  test('persists a chosen theme with no flash on reload', async ({ home, page }) => {
    await home.goto();
    await home.footer.chooseTheme('Dark');
    await expect(home.html).toHaveAttribute('data-theme', 'dark');

    // Record the theme at the first frame, before any module script runs.
    await page.addInitScript(() =>
      requestAnimationFrame(() => {
        (window as unknown as { firstFrame: string }).firstFrame =
          document.documentElement.dataset.theme ?? '';
      }),
    );
    await page.reload();
    await expect
      .poll(() => page.evaluate(() => (window as unknown as { firstFrame: string }).firstFrame))
      .toBe('dark');
  });

  test('the header button and ⌘K toggle light ↔ dark', async ({ home, page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await home.goto();
    await home.header.themeButton.click();
    await expect(home.html).toHaveAttribute('data-theme', 'dark');
    await home.palette.run('color theme');
    await expect(home.html).toHaveAttribute('data-theme', 'light');
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('Motion defaults off and turns off transitions', async ({ home }) => {
      await home.goto();
      await expect(home.html).toHaveAttribute('data-motion', 'off');
      expect(await home.page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
        'auto',
      );
      expect(await home.header.root.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s');
    });
  });

  test('the footer switch toggles motion', async ({ home }) => {
    await home.goto();
    await expect(home.html).toHaveAttribute('data-motion', 'on');
    await home.footer.toggleMotion();
    await expect(home.html).toHaveAttribute('data-motion', 'off');
    await expect(home.footer.motionSwitch).toHaveAttribute('aria-checked', 'false');
  });
});
