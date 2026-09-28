/**
 * <pm-clock>: behavior for the Clock component (./Clock.astro).
 *
 * Shows the current time in the `time-zone` attribute's zone ("6:05 PM") in
 * its <time> child, refreshed every 30 seconds while connected.
 */
export class PmClock extends HTMLElement {
  #timer: number | undefined;

  connectedCallback() {
    this.#tick();
    this.#timer = window.setInterval(this.#tick, 30_000);
  }

  disconnectedCallback() {
    window.clearInterval(this.#timer);
  }

  #tick = () => {
    const time = this.querySelector('time');
    if (!time) return;
    const now = new Date();
    time.dateTime = now.toISOString();
    time.textContent = now.toLocaleTimeString('en-US', {
      timeZone: this.getAttribute('time-zone') ?? undefined,
      hour: 'numeric',
      minute: '2-digit',
    });
  };
}

if (!customElements.get('pm-clock')) customElements.define('pm-clock', PmClock);

declare global {
  interface HTMLElementTagNameMap {
    'pm-clock': PmClock;
  }
}
