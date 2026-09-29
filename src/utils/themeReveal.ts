import { theme, themePref } from '../stores/theme';
import { withViewTransition } from './viewTransition';

/**
 * Switches light ↔ dark with a circular reveal growing from (x, y), the
 * header toggle's click point. Without motion or View Transitions it switches
 * instantly.
 */
export function toggleThemeFrom(x: number, y: number) {
  const next = theme.get() === 'dark' ? 'light' : 'dark';
  const vt = withViewTransition(() => themePref.set(next), 'pm-theme');
  vt?.ready.then(() => {
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
}

/** Toggles from the center of the header's theme button (for keyboard use and ⌘K). */
export function toggleTheme() {
  const box = document.querySelector('[data-theme-toggle]')?.getBoundingClientRect();
  toggleThemeFrom(box ? box.left + box.width / 2 : innerWidth - 40, box ? box.top + box.height / 2 : 32);
}
