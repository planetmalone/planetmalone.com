import type { Locator, Page } from '@playwright/test';
import { Site } from './Site.page';

/** The 404 page ("Lost in space"). */
export class NotFoundPage extends Site {
  readonly badPath: Locator;
  readonly openPaletteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.badPath = page.locator('#bad-path');
    this.openPaletteButton = page.getByRole('button', { name: 'Open ⌘K' });
  }
}
