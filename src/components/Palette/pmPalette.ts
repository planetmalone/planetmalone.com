import { copyEmail } from '../../stores/email';
import { motion } from '../../stores/motion';
import { paletteOpen } from '../../stores/palette';
import { theme } from '../../stores/theme';
import { showToast } from '../../stores/toast';
import { toggleTheme } from '../../utils/themeReveal';

/**
 * <pm-palette>: behavior for the Palette component (./Palette.astro).
 *
 * Opens and closes with the `paletteOpen` store, ⌘K / Ctrl+K (toggle) and `/`.
 * The input is a combobox over the listbox of commands: typing filters them,
 * ↑/↓ move the selection (wrapping), Enter runs it. The <dialog> handles Esc,
 * the scrim, focus trapping and returning focus on close.
 */
export class PmPalette extends HTMLElement {
  #dialog!: HTMLDialogElement;
  #input!: HTMLInputElement;
  #options: HTMLElement[] = [];
  #visible: HTMLElement[] = [];
  #index = 0;
  #cleanup: (() => void)[] = [];

  connectedCallback() {
    this.#dialog = this.querySelector('dialog')!;
    this.#input = this.querySelector('input')!;
    this.#options = [...this.querySelectorAll<HTMLElement>('[role="option"]')];
    const listbox = this.querySelector<HTMLElement>('[role="listbox"]')!;

    this.#listen(this.#input, 'input', () => this.#filter());
    this.#listen(this.#input, 'keydown', (e) => this.#onInputKey(e as KeyboardEvent));
    this.#listen(listbox, 'click', (e) => this.#run(this.#optionAt(e)));
    this.#listen(listbox, 'mousemove', (e) => {
      const i = this.#visible.indexOf(this.#optionAt(e)!);
      if (i >= 0 && i !== this.#index) this.#select(i, false);
    });
    this.#listen(this.#dialog, 'close', () => paletteOpen.set(false));
    // Clicks on the backdrop land on the dialog element itself.
    this.#listen(this.#dialog, 'click', (e) => e.target === this.#dialog && this.#dialog.close());
    this.#listen(document, 'keydown', (e) => this.#onShortcut(e as KeyboardEvent));

    this.#cleanup.push(
      paletteOpen.subscribe((open) => (open ? this.#open() : this.#dialog.open && this.#dialog.close())),
      theme.subscribe((t) => this.#hint('theme', t === 'dark' ? 'Dark → Light' : 'Light → Dark')),
      motion.subscribe((on) => this.#hint('motion', on ? 'On → Off' : 'Off → On')),
    );

    this.#printIfAsked();
  }

  disconnectedCallback() {
    this.#cleanup.forEach((fn) => fn());
    this.#cleanup = [];
  }

  #listen(target: EventTarget, type: string, fn: (e: Event) => void) {
    target.addEventListener(type, fn);
    this.#cleanup.push(() => target.removeEventListener(type, fn));
  }

  #open() {
    if (this.#dialog.open) return;
    this.#input.value = '';
    this.#filter();
    this.#dialog.showModal();
    this.#input.focus();
  }

  #onShortcut(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      paletteOpen.set(!paletteOpen.get());
    } else if (e.key === '/' && !paletteOpen.get() && !e.metaKey && !e.ctrlKey && !isTyping()) {
      e.preventDefault();
      paletteOpen.set(true);
    }
  }

  #onInputKey(e: KeyboardEvent) {
    const n = this.#visible.length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (n) this.#select((this.#index + (e.key === 'ArrowDown' ? 1 : n - 1)) % n);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.#run(this.#visible[this.#index]);
    }
  }

  /** Case-insensitive substring match over label, group and hint. */
  #filter() {
    const q = this.#input.value.trim().toLowerCase();
    this.#visible = [];
    for (const option of this.#options) {
      const text = `${option.textContent} ${option.dataset.groupName}`.toLowerCase();
      option.hidden = !text.includes(q);
      if (!option.hidden) this.#visible.push(option);
    }
    this.querySelectorAll<HTMLElement>('[data-group]').forEach(
      (g) => (g.hidden = !g.querySelector('[role="option"]:not([hidden])')),
    );
    this.querySelector<HTMLElement>('[data-empty]')!.hidden = this.#visible.length > 0;
    this.#select(0);
  }

  #select(i: number, scroll = true) {
    this.#index = i;
    this.#options.forEach((o) => o.setAttribute('aria-selected', 'false'));
    const option = this.#visible[i];
    if (!option) {
      this.#input.removeAttribute('aria-activedescendant');
      return;
    }
    option.setAttribute('aria-selected', 'true');
    this.#input.setAttribute('aria-activedescendant', option.id);
    if (scroll) {
      // The first option in a group brings the group's label into view with it.
      const label = option.previousElementSibling;
      if (label && label.getAttribute('role') !== 'option') label.scrollIntoView({ block: 'nearest' });
      option.scrollIntoView({ block: 'nearest' });
    }
  }

  #optionAt(e: Event) {
    return (e.target as Element).closest<HTMLElement>('[role="option"]') ?? undefined;
  }

  #hint(run: string, text: string) {
    const hint = this.querySelector(`[data-run="${run}"] [data-hint]`);
    if (hint) hint.textContent = text;
  }

  #run(option: HTMLElement | undefined) {
    if (!option) return;
    paletteOpen.set(false);
    const { href, run, toast } = option.dataset;
    if (toast) showToast(toast);
    if (href) go(href);
    if (run === 'copy-email') copyEmail(this.getAttribute('email')!);
    if (run === 'theme') toggleTheme();
    if (run === 'motion') motion.set(!motion.get());
    if (run === 'print') {
      if (location.pathname === '/') window.print();
      else location.assign('/?print');
    }
  }

  /** "Print résumé" from another page lands on /?print; print once the page is ready. */
  #printIfAsked() {
    if (!new URLSearchParams(location.search).has('print')) return;
    history.replaceState(null, '', location.pathname + location.hash);
    if (document.readyState === 'complete') window.print();
    else addEventListener('load', () => window.print(), { once: true });
  }
}

/** Section links scroll in place on the home page (smoothly, per the motion setting); anything else navigates. */
function go(href: string) {
  const url = new URL(href, location.href);
  const target = url.pathname === location.pathname && url.hash && document.querySelector(url.hash);
  if (target) {
    history.pushState(null, '', url.hash);
    target.scrollIntoView();
  } else {
    location.assign(url);
  }
}

function isTyping() {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

if (!customElements.get('pm-palette')) customElements.define('pm-palette', PmPalette);

declare global {
  interface HTMLElementTagNameMap {
    'pm-palette': PmPalette;
  }
}
