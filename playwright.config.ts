import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against the production build (`npm run build` first),
 * served by `astro preview` on its own port so a running dev server is never
 * touched. `npm run verify` runs everything.
 */
const port = 4322;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    // Motion on unless a test turns it off, so transitions are exercised.
    reducedMotion: 'no-preference',
  },
  webServer: {
    // --ignore-lock: run alongside a preview you already have open.
    command: `npx astro preview --port ${port} --host 127.0.0.1 --ignore-lock`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
});
