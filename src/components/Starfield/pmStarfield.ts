import { motion } from '../../stores/motion';

/**
 * <pm-starfield>: mouse parallax for the hero. As the pointer moves over the
 * parent, every `[data-parallax="<px>"]` in it shifts up to that many pixels
 * the opposite way, easing toward its target each frame; when the pointer
 * leaves they drift back to center. Mouse and pen only (touch has no hover),
 * and only while Motion is on. Uses the `translate` property, so elements keep
 * any `rotate` they already have.
 */
const EASE = 0.08;

export class PmStarfield extends HTMLElement {
  #layers: { el: HTMLElement; depth: number }[] = [];
  #target = { x: 0, y: 0 };
  #now = { x: 0, y: 0 };
  #frame = 0;
  #cleanup: (() => void)[] = [];

  connectedCallback() {
    const field = this.parentElement!;
    this.#layers = [...field.querySelectorAll<HTMLElement>('[data-parallax]')].map((el) => ({
      el,
      depth: Number(el.dataset.parallax),
    }));

    const fine = matchMedia('(pointer: fine)');
    const move = (e: PointerEvent) => {
      if (!motion.get() || !fine.matches) return;
      const box = field.getBoundingClientRect();
      // -1 to 1 from the center of the hero
      this.#target = {
        x: ((e.clientX - box.left) / box.width) * 2 - 1,
        y: ((e.clientY - box.top) / box.height) * 2 - 1,
      };
      this.#run();
    };
    const leave = () => {
      this.#target = { x: 0, y: 0 };
      this.#run();
    };
    field.addEventListener('pointermove', move);
    field.addEventListener('pointerleave', leave);
    this.#cleanup.push(
      () => field.removeEventListener('pointermove', move),
      () => field.removeEventListener('pointerleave', leave),
      () => cancelAnimationFrame(this.#frame),
      motion.subscribe((on) => {
        if (on) return;
        // Motion off: settle everything at center immediately.
        cancelAnimationFrame(this.#frame);
        this.#frame = 0;
        this.#target = { x: 0, y: 0 };
        this.#now = { x: 0, y: 0 };
        this.#apply();
      }),
    );
  }

  disconnectedCallback() {
    this.#cleanup.forEach((fn) => fn());
    this.#cleanup = [];
  }

  /** Eases toward the target, one step per frame, until it gets there. */
  #run() {
    if (this.#frame) return;
    const step = () => {
      this.#now.x += (this.#target.x - this.#now.x) * EASE;
      this.#now.y += (this.#target.y - this.#now.y) * EASE;
      const settled =
        Math.abs(this.#target.x - this.#now.x) < 0.001 && Math.abs(this.#target.y - this.#now.y) < 0.001;
      // Land exactly on the target, so the layers come to rest at whole positions.
      if (settled) this.#now = { ...this.#target };
      this.#apply();
      this.#frame = settled ? 0 : requestAnimationFrame(step);
    };
    this.#frame = requestAnimationFrame(step);
  }

  #apply() {
    for (const { el, depth } of this.#layers) {
      el.style.translate = `${(-this.#now.x * depth).toFixed(2)}px ${(-this.#now.y * depth).toFixed(2)}px`;
    }
  }
}

if (!customElements.get('pm-starfield')) customElements.define('pm-starfield', PmStarfield);

declare global {
  interface HTMLElementTagNameMap {
    'pm-starfield': PmStarfield;
  }
}
