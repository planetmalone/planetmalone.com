import { atom } from 'nanostores';

/**
 * Whether the sticky header is over the home hero, above its horizon. The
 * hero's horizon sets it; the header subscribes. It starts unknown, so the
 * horizon's first report always reaches the header, even when the page loads
 * (or a refresh restores the scroll) past the hero.
 */
export const overHero = atom<boolean | undefined>(undefined);
