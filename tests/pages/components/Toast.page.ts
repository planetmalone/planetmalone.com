import type { Locator, Page } from '@playwright/test';

/** The toast pill (shared by copy email and ⌘K). */
export class Toast {
  readonly message: Locator;

  constructor(readonly page: Page) {
    this.message = page.locator('pm-toast p');
  }
}
