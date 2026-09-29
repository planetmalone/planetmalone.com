import { toast } from '../../stores/toast';

/** <pm-toast>: renders the toast store's message. */
export class PmToast extends HTMLElement {
  #unsubscribe: (() => void) | undefined;

  connectedCallback() {
    const pill = this.querySelector('p')!;
    this.#unsubscribe = toast.subscribe((message) => {
      pill.textContent = message;
      pill.hidden = !message;
    });
  }

  disconnectedCallback() {
    this.#unsubscribe?.();
  }
}

if (!customElements.get('pm-toast')) customElements.define('pm-toast', PmToast);

declare global {
  interface HTMLElementTagNameMap {
    'pm-toast': PmToast;
  }
}
