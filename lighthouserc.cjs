const { chromium } = require('@playwright/test');

const port = 4323;
const routes = ['/', '/work/nextgen-design-system', '/now', '/uses', '/colophon'];
const mobile = process.env.LHCI_PRESET === 'mobile';

module.exports = {
  ci: {
    collect: {
      // --ignore-lock: run alongside a preview you already have open.
      startServerCommand: `npx astro preview --port ${port} --host 127.0.0.1 --ignore-lock`,
      startServerReadyPattern: 'Local',
      url: routes.map((r) => `http://127.0.0.1:${port}${r}`),
      numberOfRuns: 1,
      chromePath: chromium.executablePath(),
      settings: {
        ...(mobile ? {} : { preset: 'desktop' }),
        chromeFlags: '--headless=new --no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci/reports' },
  },
};
