import type { Locator, Page } from '@playwright/test';
import { Site } from './Site.page';

/** A case study at /work/<slug>. */
export class CaseStudyPage extends Site {
  readonly title: Locator;
  readonly neighborTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('main h1');
    this.neighborTitles = page.locator('nav[aria-label="More case studies"] b');
  }

  goto(slug: string) {
    return super.goto(`/work/${slug}`);
  }
}
