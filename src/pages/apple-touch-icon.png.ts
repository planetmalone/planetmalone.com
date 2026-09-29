import type { APIRoute } from 'astro';
import { renderIcon } from '../utils/icons';

/** iOS home-screen icon: opaque paper background (iOS fills transparency with black), with room around the avatar. */
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await renderIcon(180, { background: '#f7f2ea', inset: 16 })), {
    headers: { 'Content-Type': 'image/png' },
  });
