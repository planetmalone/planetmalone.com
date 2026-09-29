import { currentRole } from '../../stores/scenicRoute';

/**
 * <pm-experience>: publishes the open role card (the `currentRole` store) for
 * the flight path. The <details> share a `name`, so the browser already keeps
 * one open at a time. With every card closed, it falls back to `default-role`.
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
    currentRole.set(open?.dataset.role ?? this.getAttribute('default-role') ?? '');
  };
}

if (!customElements.get('pm-experience')) customElements.define('pm-experience', PmExperience);

declare global {
  interface HTMLElementTagNameMap {
    'pm-experience': PmExperience;
  }
}
