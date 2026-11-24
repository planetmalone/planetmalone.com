/** <pm-lightbox>: behavior for the Lightbox component (./Lightbox.astro). */
export class PmLightbox extends HTMLElement {
  #open: HTMLButtonElement | null = null;
  #dialog: HTMLDialogElement | null = null;

  connectedCallback() {
    this.#open = this.querySelector('[data-open]');
    this.#dialog = this.querySelector('dialog');
    this.#open?.addEventListener('click', this.#show);
    this.#dialog?.addEventListener('click', this.#close);
  }

  disconnectedCallback() {
    this.#open?.removeEventListener('click', this.#show);
    this.#dialog?.removeEventListener('click', this.#close);
  }

  #show = () => this.#dialog?.showModal();
  #close = () => this.#dialog?.close();
}

if (!customElements.get('pm-lightbox')) customElements.define('pm-lightbox', PmLightbox);

declare global {
  interface HTMLElementTagNameMap {
    'pm-lightbox': PmLightbox;
  }
}
