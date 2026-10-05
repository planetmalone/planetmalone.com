import type { Locator, Page } from '@playwright/test';

/**
 * The sticky site header: page links, ⌘K button, theme button and mobile Menu.
 * On the home page it's clear over the hero (`data-over-hero`), then glass.
 */
export class Header {
  readonly root: Locator;
  readonly paletteButton: Locator;
  readonly themeButton: Locator;
  readonly menuButton: Locator;
  readonly menu: Locator;
  readonly currentPage: Locator;

  constructor(readonly page: Page) {
    this.root = page.locator('[data-site-header]');
    this.paletteButton = page.locator('[data-open-palette]');
    this.themeButton = page.locator('[data-theme-toggle]');
    this.menuButton = page.locator('[data-menu-open]');
    this.menu = page.locator('#site-menu');
    this.currentPage = page.locator('nav[aria-label="Pages"] a[aria-current="page"]');
  }

  async openMenu() {
    await this.menuButton.click();
  }
}
