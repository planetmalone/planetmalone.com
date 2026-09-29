/**
 * Open Graph images (design Components 1d): 1200 × 630, the Persimmon field
 * at full volume with the planet, its ring and the waving avatar. Rendered at
 * build time: Satori lays out the tree and resvg rasterizes it to PNG.
 *
 * Satori needs static fonts, not the site's variable WOFF2. Text sizes come
 * from the static @fontsource packages; the title uses a static cut of
 * Bricolage Grotesque at its display optical size (96) and weight 800, from
 * Google Fonts (src/assets/og/, OFL), because Fontsource's static files are
 * cut at the small optical size, which is wider and rounder than the hero's.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFile(require.resolve(`${pkg}/files/${file}`));
// Relative to the project root: once bundled, import.meta.url points into dist/.
const asset = (path: string) => `src/assets/${path}`;
const dataUri = async (path: string, type: string) =>
  `data:${type};base64,${(await readFile(path)).toString('base64')}`;

// Light-theme values from theme.css: the OG image is always the light field.
const field = '#c4461c';
const fieldDeep = '#a93a14';
const onField = '#fff6ec';

type Style = Record<string, string | number>;
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Style, ...children: (Node | string)[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});
const img = (src: string, style: Style): Node => ({ type: 'img', props: { src, style } });

let assets:
  Promise<{ fonts: Parameters<typeof satori>[1]['fonts']; avatar: string; logo: string }> | undefined;
const loadAssets = () =>
  (assets ??= (async () => ({
    fonts: [
      {
        name: 'Bricolage',
        weight: 700,
        style: 'normal',
        data: await font('@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-700-normal.woff'),
      },
      {
        name: 'Bricolage Display',
        weight: 800,
        style: 'normal',
        data: await readFile(asset('og/bricolage-grotesque-96-800.ttf')),
      },
      {
        name: 'Atkinson',
        weight: 600,
        style: 'normal',
        data: await font(
          '@fontsource/atkinson-hyperlegible-next',
          'atkinson-hyperlegible-next-latin-600-normal.woff',
        ),
      },
      {
        name: 'Atkinson',
        weight: 700,
        style: 'normal',
        data: await font(
          '@fontsource/atkinson-hyperlegible-next',
          'atkinson-hyperlegible-next-latin-700-normal.woff',
        ),
      },
    ],
    avatar: await dataUri(asset('illos/illo-wave.png'), 'image/png'),
    logo: await dataUri(asset('og/logo-mark.svg'), 'image/svg+xml'),
  }))());

export interface OgContent {
  /** The big line: the name on home, the case title on case studies. */
  title: string;
  /** Font size for the title: 120px for the name, smaller for longer case titles. */
  titleSize: number;
  /** One word per line (the name on home). */
  stacked?: boolean;
  subtitle: string;
  /** The small bold row: proof points on home, tags on case studies. */
  facts: string[];
}

export async function renderOg({ title, titleSize, stacked = false, subtitle, facts }: OgContent) {
  const { fonts, avatar, logo } = await loadAssets();

  // The ring is centered on the disc (230px from the right, 190px from the
  // bottom) and drawn in two halves, far half behind the disc and near half in
  // front, so it wraps the planet like the hero's.
  const ring = (half: 'back' | 'front'): Node =>
    h('div', {
      position: 'absolute',
      right: -260,
      bottom: 65,
      width: 980,
      height: 250,
      border: `2.5px solid ${onField}`,
      borderRadius: '50%',
      transform: 'rotate(-12deg)',
      opacity: 0.45,
      clipPath: half === 'back' ? 'inset(0 0 50% 0)' : 'inset(50% 0 0 0)',
    });

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      position: 'relative',
      flexDirection: 'column',
      padding: '64px 72px',
      backgroundColor: field,
      color: onField,
      fontFamily: 'Atkinson',
    },
    ring('back'),
    h('div', {
      position: 'absolute',
      right: -80,
      bottom: -120,
      width: 620,
      height: 620,
      borderRadius: '50%',
      backgroundColor: fieldDeep,
    }),
    ring('front'),
    img(avatar, { position: 'absolute', right: 60, bottom: 0, width: 440, height: 440 }),
    h(
      'div',
      { alignItems: 'center', gap: 12 },
      h(
        'div',
        {
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: onField,
          alignItems: 'center',
          justifyContent: 'center',
        },
        img(logo, { width: 34, height: 34 }),
      ),
      h('div', { fontFamily: 'Bricolage', fontWeight: 700, fontSize: 26 }, 'planetmalone.com'),
    ),
    h(
      'div',
      { marginTop: 'auto', maxWidth: 640, flexDirection: 'column', gap: 22 },
      // One flex item per word, so lines only break between words ("50-person"
      // stays whole; the font has no non-breaking hyphen). `stacked` puts each
      // word on its own line, as the name does in the design.
      h(
        'div',
        {
          flexDirection: stacked ? 'column' : 'row',
          flexWrap: 'wrap',
          columnGap: 0.22 * titleSize,
          fontFamily: 'Bricolage Display',
          fontWeight: 800,
          fontSize: titleSize,
          lineHeight: stacked ? 0.86 : 0.95,
          letterSpacing: -0.05 * titleSize, // Satori ignores em units
        },
        ...title.split(' ').map((word) => h('div', {}, word)),
      ),
      h('div', { fontSize: 30, lineHeight: 1.3, fontWeight: 600 }, subtitle),
      h(
        'div',
        { gap: 22, fontSize: 22, fontWeight: 700 },
        ...facts.flatMap((f, i) => (i ? [h('div', {}, '·'), h('div', {}, f)] : [h('div', {}, f)])),
      ),
    ),
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
