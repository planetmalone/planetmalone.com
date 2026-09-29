/**
 * <pm-bio>: the About section's bio-length switcher. The `length` attribute
 * (facts, short, long, way) is the state: it checks the matching radio and
 * shows the matching `[data-bio-length]` block inside the live region.
 */
export class PmBio extends HTMLElement {
  static observedAttributes = ['length'];

  get length() {
    return this.getAttribute('length') ?? 'short';
  }
  set length(value: string) {
    this.setAttribute('length', value);
  }

  connectedCallback() {
    this.addEventListener('change', this.#onChange);
    this.#sync();
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.#onChange);
  }

  attributeChangedCallback() {
    this.#sync();
  }

  #onChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.name === 'bio') this.length = input.value;
  };

  #sync() {
    this.querySelectorAll<HTMLInputElement>('input[name="bio"]').forEach(
      (r) => (r.checked = r.value === this.length),
    );
    this.querySelectorAll<HTMLElement>('[data-bio-length]').forEach(
      (b) => (b.hidden = b.dataset.bioLength !== this.length),
    );
  }
}

if (!customElements.get('pm-bio')) customElements.define('pm-bio', PmBio);

declare global {
  interface HTMLElementTagNameMap {
    'pm-bio': PmBio;
  }
}
