import type { Locator, Page } from '@playwright/test';
import { Footer } from './components/Footer.page';
import { Header } from './components/Header.page';
import { Palette } from './components/Palette.page';
import { Toast } from './components/Toast.page';

/** Every route, for sweeps (accessibility, links, budgets). */
export const routes = [
  '/',
  '/work/nextgen-design-system',
  '/work/ai-assisted-engineering',
  '/work/micro-frontend-platform',
  '/work/fifty-person-practice',
  '/now',
  '/uses',
  '/colophon',
  '/lost-in-space',
];

/** Any page on the site: the chrome every route shares. Page Objects extend it. */
export class Site {
  readonly header: Header;
  readonly footer: Footer;
  readonly palette: Palette;
  readonly toast: Toast;
  readonly html: Locator;
  readonly main: Locator;

  constructor(readonly page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.palette = new Palette(page);
    this.toast = new Toast(page);
    this.html = page.locator('html');
    this.main = page.locator('main');
  }

  goto(path: string) {
    return this.page.goto(path);
  }

  scrollY() {
    return this.page.evaluate(() => scrollY);
  }
}
