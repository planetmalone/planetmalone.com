import { expect, test } from './fixtures';

test.describe('⌘K palette', () => {
  test.beforeEach(async ({ home }) => home.goto());

  test('opens with ⌘K / Ctrl+K, /, and the header button, and toggles closed', async ({ home, page }) => {
    const { palette } = home;
    await palette.open();
    await expect(palette.input).toBeFocused();
    await page.keyboard.press('ControlOrMeta+k');
    await palette.expectClosed();

    await page.keyboard.press('/');
    await palette.expectOpen();
    await page.keyboard.press('Escape');
    await palette.expectClosed();

    await home.header.paletteButton.click();
    await palette.expectOpen();
  });

  test('filters, wraps the selection and shows an empty state', async ({ home, page }) => {
    const { palette } = home;
    await palette.open();
    await expect(palette.selected).toContainText('Copy email');
    await page.keyboard.press('ArrowUp');
    await expect(palette.selected).toContainText('Count the population again');

    await palette.search('skil');
    await expect(palette.visibleOptions).toHaveCount(1);
    await expect(palette.visibleGroups).toHaveCount(1);

    await palette.search('zzzz');
    await expect(palette.emptyState).toBeVisible();
    await expect(palette.input).not.toHaveAttribute('aria-activedescendant');
  });

  test('jumps to a section and returns focus', async ({ home, page }) => {
    await home.header.paletteButton.click();
    await home.palette.run('skills');
    await expect(page).toHaveURL(/#skills$/);
    await expect(home.section('skills')).toBeInViewport();
    await expect(home.header.paletteButton).toBeFocused();
  });

  test('counts the population', async ({ home }) => {
    await home.palette.run('population');
    await expect(home.toast.message).toHaveText(
      'Recount complete: 12. The bearded dragon has filed an objection.',
    );
  });

  test('lets the page scroll behind it', async ({ home, page }) => {
    await home.palette.open();
    await page.mouse.move(100, 500);
    await page.mouse.wheel(0, 600);
    await expect.poll(() => home.scrollY()).toBeGreaterThan(300);
  });
});
