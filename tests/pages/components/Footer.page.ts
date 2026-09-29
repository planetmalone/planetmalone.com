import type { Locator, Page } from '@playwright/test';

/** The site footer's controls: the theme segmented control and the Motion switch. */
export class Footer {
  readonly motionSwitch: Locator;

  constructor(readonly page: Page) {
    this.motionSwitch = page.locator('#motion-switch button');
  }

  async chooseTheme(label: 'Light' | 'Dark' | 'System') {
    await this.page.locator('footer label', { hasText: label }).click();
  }

  async toggleMotion() {
    await this.motionSwitch.click();
  }
}
