/**
 * <pm-experience>: highlights the open role card's stage on the scenic route.
 * The <details> share a `name`, so the browser already keeps one open at a
 * time. With every card closed, the route falls back to `default-stage`.
 */
export class PmExperience extends HTMLElement {
  connectedCallback() {
    // `toggle` doesn't bubble, so listen in the capture phase.
    this.addEventListener('toggle', this.#sync, true);
    this.#sync();
  }

  disconnectedCallback() {
    this.removeEventListener('toggle', this.#sync, true);
  }

  #sync = () => {
    const open = this.querySelector<HTMLElement>('details[open]');
    const stage = open?.dataset.stage ?? this.getAttribute('default-stage');
    this.querySelectorAll<HTMLElement>('[data-route] [data-stage]').forEach((s) =>
      s.dataset.stage === stage ? s.setAttribute('aria-current', 'step') : s.removeAttribute('aria-current'),
    );
  };
}

if (!customElements.get('pm-experience')) customElements.define('pm-experience', PmExperience);

declare global {
  interface HTMLElementTagNameMap {
    'pm-experience': PmExperience;
  }
}
