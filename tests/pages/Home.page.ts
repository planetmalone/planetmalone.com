import type { Locator, Page } from '@playwright/test';
import { Site } from './Site.page';

/** The home page: hero, rail, sections, role cards, bio switcher, print résumé. */
export class HomePage extends Site {
  readonly heroCopyEmail: Locator;
  readonly copyEmailButtons: Locator;
  readonly roleCards: Locator;
  readonly openRoleCards: Locator;
  readonly activeMoon: Locator;
  readonly rocket: Locator;
  readonly currentRailLink: Locator;
  readonly clock: Locator;
  readonly resume: Locator;
  readonly caseCardLinks: Locator;
  readonly dragon: Locator;

  constructor(page: Page) {
    super(page);
    this.heroCopyEmail = page.locator('section[aria-label="Introduction"] pm-copy-email a');
    this.copyEmailButtons = page.locator('pm-copy-email a');
    this.roleCards = page.locator('details[name="role"]');
    this.openRoleCards = page.locator('details[name="role"][open]');
    this.activeMoon = page.locator('pm-flight-path [data-moon][data-current]');
    this.rocket = page.locator('pm-flight-path [data-rocket]');
    this.currentRailLink = page.locator('[data-rail-link][aria-current="true"]');
    this.clock = page.locator('pm-clock time');
    this.resume = page.locator('.resume');
    this.caseCardLinks = page.locator('#impact h3 a');
    this.dragon = page.locator('pm-dragon');
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

  moon(role: string) {
    return this.page.locator(`pm-flight-path [data-moon="${role}"]`);
  }

  /** Pixels between the rocket's center and a role's moon. */
  async rocketDistanceTo(role: string) {
    const [r, m] = await Promise.all([
      this.rocket.boundingBox(),
      this.moon(role).locator('span').first().boundingBox(),
    ]);
    return Math.hypot(
      r!.x + r!.width / 2 - (m!.x + m!.width / 2),
      r!.y + r!.height / 2 - (m!.y + m!.height / 2),
    );
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
