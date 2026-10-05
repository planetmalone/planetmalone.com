import { expect, test } from './fixtures';

test.describe('Keyboard', () => {
  test('the skip link is first and jumps to main', async ({ home, page }) => {
    await home.goto();
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(home.main).toBeFocused();
  });

  test('every focusable element shows a focus ring', async ({ home, page }) => {
    await home.goto();
    const missing: string[] = [];
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const ringOf = (e: Element | null) =>
          !!e && getComputedStyle(e).outlineStyle !== 'none' && getComputedStyle(e).outlineWidth !== '0px';
        // The ring can be on the element, on the card a stretched link draws it around, or on a radio's label.
        const ring =
          ringOf(el) ||
          ringOf(el.closest('article')) ||
          (el.matches('input.sr-only') && ringOf(el.nextElementSibling));
        const name = (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30);
        return { ring, name: `${el.tagName.toLowerCase()} "${name}"` };
      });
      if (info && !info.ring) missing.push(info.name);
    }
    expect(missing).toEqual([]);
  });

  test('the mobile menu traps focus and closes with Escape', async ({ home, page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await home.goto();
    await home.header.openMenu();
    for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('#site-menu'))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(home.header.menuButton).toBeFocused();
    await expect(home.header.menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
