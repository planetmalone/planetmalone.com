import { atom } from 'nanostores';

/** Whether the ⌘K command palette is open. Anything can open it; the palette (Phase 4) subscribes. */
export const paletteOpen = atom(false);
