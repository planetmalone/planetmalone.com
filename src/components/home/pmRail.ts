/**
 * <pm-rail>: marks the rail link for the section being read: the last section
 * whose top has passed 180px from the top of the viewport, or the first one
 * above that. At the bottom of the page the last section is current, since
 * Contact can't scroll up to the line.
 */
const LINE = 180;

export class PmRail extends HTMLElement {
  #frame = 0;

  connectedCallback() {
    addEventListener('scroll', this.#schedule, { passive: true });
    addEventListener('resize', this.#schedule);
    this.#update();
  }

  disconnectedCallback() {
    removeEventListener('scroll', this.#schedule);
    removeEventListener('resize', this.#schedule);
    cancelAnimationFrame(this.#frame);
  }

  // At most one measurement per frame.
  #schedule = () => {
    cancelAnimationFrame(this.#frame);
    this.#frame = requestAnimationFrame(() => this.#update());
  };

  #update() {
    const links = [...this.querySelectorAll<HTMLElement>('[data-rail-link]')];
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    const passed = links.findLast(
      (link) =>
        (document.getElementById(link.dataset.railLink!)?.getBoundingClientRect().top ?? Infinity) <= LINE,
    );
    const current = atBottom ? links.at(-1) : (passed ?? links[0]);
    for (const link of links) {
      if (link === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }
}

if (!customElements.get('pm-rail')) customElements.define('pm-rail', PmRail);

declare global {
  interface HTMLElementTagNameMap {
    'pm-rail': PmRail;
  }
}
