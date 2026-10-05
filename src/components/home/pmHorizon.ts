import { overHero } from '../../stores/hero';

/**
 * <pm-horizon>: a line where the hero's horizon meets the screen's edges
 * (./Hero.astro). While it's below the sticky header, the header is over the
 * hero (`overHero`); once it scrolls up past the header, the whole curve has
 * cleared it and the header turns to glass.
 */
export class PmHorizon extends HTMLElement {
  #observer?: IntersectionObserver;

  connectedCallback() {
    const inset = document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 0;
    this.#observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) overHero.set(entry.boundingClientRect.top > inset);
      },
      { rootMargin: `-${inset}px 0px 0px 0px` },
    );
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
    overHero.set(false);
  }
}

if (!customElements.get('pm-horizon')) customElements.define('pm-horizon', PmHorizon);

declare global {
  interface HTMLElementTagNameMap {
    'pm-horizon': PmHorizon;
  }
}
