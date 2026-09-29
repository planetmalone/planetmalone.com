import { expect, type Locator, type Page } from '@playwright/test';

/** The ⌘K command palette. */
export class Palette {
  readonly dialog: Locator;
  readonly input: Locator;
  readonly selected: Locator;
  readonly visibleOptions: Locator;
  readonly visibleGroups: Locator;
  readonly emptyState: Locator;

  constructor(readonly page: Page) {
    this.dialog = page.locator('pm-palette dialog');
    this.input = page.locator('pm-palette input');
    this.selected = page.locator('[role="option"][aria-selected="true"]');
    this.visibleOptions = page.locator('[role="option"]:visible');
    this.visibleGroups = page.locator('[data-group]:visible');
    this.emptyState = page.getByText('Nothing matches. Even the bearded dragon looked.');
  }

  async open() {
    await this.page.keyboard.press('ControlOrMeta+k');
    await this.expectOpen();
  }

  async expectOpen() {
    await expect(this.dialog).toHaveAttribute('open', '');
  }

  async expectClosed() {
    await expect(this.dialog).not.toHaveAttribute('open');
  }

  async search(query: string) {
    await this.input.fill(query);
  }

  /** Opens the palette if needed and runs the first command matching `query`. */
  async run(query: string) {
    if (!(await this.dialog.getAttribute('open').then((v) => v !== null))) await this.open();
    await this.search(query);
    await this.page.keyboard.press('Enter');
  }
}
