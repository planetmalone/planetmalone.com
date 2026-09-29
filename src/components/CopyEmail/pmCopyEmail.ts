import { copyEmail, emailCopied } from '../../stores/email';

/** <pm-copy-email>: behavior for the CopyEmail component (./CopyEmail.astro). */
export class PmCopyEmail extends HTMLElement {
  #link: HTMLAnchorElement | null = null;
  #unsubscribe: (() => void) | undefined;

  connectedCallback() {
    this.#link = this.querySelector('a');
    this.#link?.addEventListener('click', this.#copy);
    this.#unsubscribe = emailCopied.subscribe((copied) => {
      if (this.#link) this.#link.textContent = copied ? 'Copied!' : 'Copy email';
    });
  }

  disconnectedCallback() {
    this.#link?.removeEventListener('click', this.#copy);
    this.#unsubscribe?.();
  }

  #copy = (e: MouseEvent) => {
    e.preventDefault();
    copyEmail(this.getAttribute('email')!);
  };
}

if (!customElements.get('pm-copy-email')) customElements.define('pm-copy-email', PmCopyEmail);

declare global {
  interface HTMLElementTagNameMap {
    'pm-copy-email': PmCopyEmail;
  }
}
