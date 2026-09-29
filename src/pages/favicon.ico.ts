import type { APIRoute } from 'astro';
import { pngToIco, renderIcon } from '../utils/icons';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(pngToIco(await renderIcon(32), 32)), {
    headers: { 'Content-Type': 'image/x-icon' },
  });
