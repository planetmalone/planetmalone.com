/**
 * Saved preferences, one JSON object in localStorage. The pre-paint script in
 * PrefsScript.astro reads the same key before first paint; keep them in sync.
 */
const KEY = 'pm-prefs';

export interface SavedPrefs {
  theme?: 'light' | 'dark' | 'system';
  motion?: boolean;
}

export function readPrefs(): SavedPrefs {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as SavedPrefs;
  } catch {
    return {};
  }
}

export function savePref<K extends keyof SavedPrefs>(key: K, value: SavedPrefs[K]) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...readPrefs(), [key]: value }));
  } catch {
    // Private mode or blocked storage: the preference lasts for this page only.
  }
}
