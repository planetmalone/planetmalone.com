import type { Locator, Page } from '@playwright/test';
import { Site } from './Site.page';

/** The home page: hero, sections, the Experience journey, the census dragon, print résumé. */
export class HomePage extends Site {
  readonly copyEmail: Locator;
  readonly stops: Locator;
  readonly currentStop: Locator;
  readonly rocket: Locator;
  readonly clock: Locator;
  readonly resume: Locator;
  readonly caseCardLinks: Locator;
  readonly dragon: Locator;

  constructor(page: Page) {
    super(page);
    this.copyEmail = page.locator('#contact pm-copy-email a');
    this.stops = page.locator('pm-experience [data-stop]');
    this.currentStop = page.locator('pm-experience [data-stop][data-current]');
    this.rocket = page.locator('pm-experience [data-rocket]');
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

  planet(stop: string) {
    return this.page.locator(`[data-stop="${stop}"] [data-planet]`);
  }

  /** Scrolls a stop's planet to the middle of the screen. */
  async centerStop(stop: string) {
    await this.planet(stop).evaluate((el) => {
      const r = el.getBoundingClientRect();
      scrollTo({ top: scrollY + r.top + r.height / 2 - innerHeight / 2, behavior: 'instant' });
    });
  }

  /** The rocket's center relative to a stop's planet: positive `dy` is below it. */
  async rocketFrom(stop: string) {
    const [r, p] = await Promise.all([this.rocket.boundingBox(), this.planet(stop).boundingBox()]);
    const dx = r!.x + r!.width / 2 - (p!.x + p!.width / 2);
    const dy = r!.y + r!.height / 2 - (p!.y + p!.height / 2);
    return { dy, distance: Math.hypot(dx, dy) };
  }
}
