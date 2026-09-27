import { atom } from 'nanostores';
import { readPrefs, savePref } from '../utils/storage';

/** Motion on or off. Defaults to the inverse of prefers-reduced-motion until the visitor chooses. */
export const motion = atom<boolean>(
  readPrefs().motion ?? !matchMedia('(prefers-reduced-motion: reduce)').matches,
);

motion.listen((on) => savePref('motion', on));
motion.subscribe((on) => (document.documentElement.dataset.motion = on ? 'on' : 'off'));
