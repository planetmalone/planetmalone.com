/**
 * <pm-switch>: behavior for the Switch component (./Switch.astro).
 *
 * The server renders the full <button role="switch"> inside the element, so the
 * switch is visible and accessible before this runs; the element only adds
 * behavior. Like a native checkbox, the `checked` attribute is the source of
 * truth and the `checked` property reflects it. Attributes work before the
 * element is defined, so consumers never need to wait for it:
 *
 *   el.toggleAttribute('checked', true);
 *   el.addEventListener('change', () => el.hasAttribute('checked'));
 */
export class PmSwitch extends HTMLElement {
  static observedAttributes = ['checked'];

  #button: HTMLButtonElement | null = null;

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    this.toggleAttribute('checked', value);
  }

  connectedCallback() {
    this.#button = this.querySelector('button[role="switch"]');
    this.#button?.addEventListener('click', this.#toggle);
    this.#sync();
  }

  disconnectedCallback() {
    this.#button?.removeEventListener('click', this.#toggle);
  }

  attributeChangedCallback() {
    this.#sync();
  }

  #sync() {
    this.#button?.setAttribute('aria-checked', String(this.checked));
  }

  #toggle = () => {
    this.checked = !this.checked;
    this.dispatchEvent(new Event('change', { bubbles: true }));
  };
}

if (!customElements.get('pm-switch')) customElements.define('pm-switch', PmSwitch);

declare global {
  interface HTMLElementTagNameMap {
    'pm-switch': PmSwitch;
  }
}
