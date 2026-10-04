// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const bigShoulders = '@fontsource-variable/big-shoulders-display/files';
const spaceMono = '@fontsource/space-mono/files';
const atkinson = '@fontsource-variable/atkinson-hyperlegible-next/files';
const latin =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

// https://astro.build/config
export default defineConfig({
  site: 'https://planetmalone.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      // Display: condensed "mission control" signage.
      name: 'Big Shoulders Display',
      cssVariable: '--font-big-shoulders',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: [`${bigShoulders}/big-shoulders-display-latin-wght-normal.woff2`],
            weight: '100 900',
            style: 'normal',
            unicodeRange: [latin],
          },
        ],
      },
    },
    {
      // Small labels: eyebrows, dates, the flight path's names.
      name: 'Space Mono',
      cssVariable: '--font-space-mono',
      provider: fontProviders.local(),
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: [`${spaceMono}/space-mono-latin-400-normal.woff2`],
            weight: '400',
            style: 'normal',
            unicodeRange: [latin],
          },
          {
            src: [`${spaceMono}/space-mono-latin-700-normal.woff2`],
            weight: '700',
            style: 'normal',
            unicodeRange: [latin],
          },
        ],
      },
    },
    {
      name: 'Atkinson Hyperlegible Next',
      cssVariable: '--font-atkinson',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: [`${atkinson}/atkinson-hyperlegible-next-latin-wght-normal.woff2`],
            weight: '200 800',
            style: 'normal',
            unicodeRange: [latin],
          },
          {
            src: [`${atkinson}/atkinson-hyperlegible-next-latin-wght-italic.woff2`],
            weight: '200 800',
            style: 'italic',
            unicodeRange: [latin],
          },
        ],
      },
    },
  ],
});
