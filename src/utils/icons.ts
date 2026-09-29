/**
 * Raster icons rendered at build time from the favicon SVG (public/favicon.svg,
 * the planet mark; rasters use its light colors),
 * so there's one source for every size.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';

const favicon = () => readFile('public/favicon.svg', 'utf8');

/** A square PNG of the favicon. `background` and `inset` pad it for home-screen icons. */
export async function renderIcon(
  size: number,
  { background, inset = 0 }: { background?: string; inset?: number } = {},
) {
  const src = `data:image/svg+xml;base64,${Buffer.from(await favicon()).toString('base64')}`;
  const inner = size - inset * 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${
    background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : ''
  }<image href="${src}" x="${inset}" y="${inset}" width="${inner}" height="${inner}"/></svg>`;
  return new Resvg(svg).render().asPng();
}

/** Wraps a PNG in an ICO container (Vista+ reads PNG entries), for /favicon.ico. */
export function pngToIco(png: Uint8Array, size: number) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 10); // color planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // image data offset
  return Buffer.concat([header, png]);
}
