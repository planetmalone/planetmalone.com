/**
 * <pm-dragon>: the census dragon (./Dragon.astro). `ducked` hides him behind
 * the edge; he ducks while out of view and pops up once he's well into it, so
 * he pops up again every time you scroll back to him.
 */
export class PmDragon extends HTMLElement {
  #observer?: IntersectionObserver;

  get ducked() {
    return this.hasAttribute('ducked');
  }

  set ducked(value: boolean) {
    this.toggleAttribute('ducked', value);
  }

  connectedCallback() {
    this.#observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) this.ducked = !entry.isIntersecting;
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
  }
}

if (!customElements.get('pm-dragon')) customElements.define('pm-dragon', PmDragon);

declare global {
  interface HTMLElementTagNameMap {
    'pm-dragon': PmDragon;
  }
}
