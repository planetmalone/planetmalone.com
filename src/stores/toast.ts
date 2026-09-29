import { atom } from 'nanostores';

/** The message in the toast pill; empty when hidden. */
export const toast = atom('');

let timer: number | undefined;

/** Shows a toast for 2.8s. A new message replaces the current one and restarts the timer. */
export function showToast(message: string) {
  window.clearTimeout(timer);
  toast.set(message);
  timer = window.setTimeout(() => toast.set(''), 2800);
}
