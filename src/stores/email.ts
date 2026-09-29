import { atom } from 'nanostores';
import { showToast } from './toast';

/** True for 2.8s after the email is copied; every Copy email button shows "Copied!" meanwhile. */
export const emailCopied = atom(false);

let timer: number | undefined;

/** Copies the address and confirms it. If the clipboard is unavailable, opens the mail app instead. */
export async function copyEmail(email: string) {
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    location.href = `mailto:${email}`;
    return;
  }
  window.clearTimeout(timer);
  emailCopied.set(true);
  timer = window.setTimeout(() => emailCopied.set(false), 2800);
  showToast('Copied. Your clipboard is now 12% more Malone.');
}
