import { atom, computed } from 'nanostores';
import { readPrefs, savePref } from '../utils/storage';

export type ThemePref = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

const darkQuery = matchMedia('(prefers-color-scheme: dark)');
const systemDark = atom(darkQuery.matches);
darkQuery.addEventListener('change', (e) => systemDark.set(e.matches));

/** What the visitor chose: light, dark, or follow the OS. */
export const themePref = atom<ThemePref>(readPrefs().theme ?? 'system');

/** The theme actually showing. "System" follows the OS live. */
export const theme = computed([themePref, systemDark], (pref, dark): Theme =>
  pref === 'system' ? (dark ? 'dark' : 'light') : pref,
);

themePref.listen((pref) => savePref('theme', pref));
theme.subscribe((t) => (document.documentElement.dataset.theme = t));
