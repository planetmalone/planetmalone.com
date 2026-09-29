import type { Locator, Page } from '@playwright/test';
import { Site } from './Site.page';

/** The home page: hero, rail, sections, role cards, bio switcher, print résumé. */
export class HomePage extends Site {
  readonly heroCopyEmail: Locator;
  readonly copyEmailButtons: Locator;
  readonly roleCards: Locator;
  readonly openRoleCards: Locator;
  readonly currentStage: Locator;
  readonly currentRailLink: Locator;
  readonly clock: Locator;
  readonly resume: Locator;
  readonly caseCardLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.heroCopyEmail = page.locator('section[aria-label="Introduction"] pm-copy-email a');
    this.copyEmailButtons = page.locator('pm-copy-email a');
    this.roleCards = page.locator('details[name="role"]');
    this.openRoleCards = page.locator('details[name="role"][open]');
    this.currentStage = page.locator('[data-route] [aria-current="step"]');
    this.currentRailLink = page.locator('[data-rail-link][aria-current="true"]');
    this.clock = page.locator('pm-clock time');
    this.resume = page.locator('.resume');
    this.caseCardLinks = page.locator('#impact h3 a');
  }

  goto() {
    return super.goto('/');
  }

  section(id: string) {
    return this.page.locator(`#${id}`);
  }

  roleSummary(title: string) {
    return this.page.locator('summary', { hasText: title });
  }

  railLink(id: string) {
    return this.page.locator(`[data-rail-link="${id}"]`);
  }

  async chooseBioLength(label: 'Just the facts' | 'Short' | 'Long' | 'Way too long') {
    await this.page.locator('[data-bio-options] label', { hasText: label }).click();
  }

  bioInput(value: 'facts' | 'short' | 'long' | 'way') {
    return this.page.locator(`[data-bio-options] input[value="${value}"]`);
  }

  /** The bio lengths currently shown. */
  visibleBios() {
    return this.page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('[data-bio-length]')]
        .filter((b) => !b.hidden)
        .map((b) => b.dataset.bioLength),
    );
  }
}
