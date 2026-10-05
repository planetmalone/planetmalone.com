import { motion } from '../../stores/motion';

/**
 * <pm-experience>: the journey's flight path and rocket (./Experience.astro).
 *
 * Draws a wavy path down through the planets (redrawn whenever the layout
 * changes). Then it follows the scroll: the planet you've reached is the one
 * nearest the middle of the screen. The rocket flies along the path to park
 * just short of it, nose first, so it turns around when you scroll back up.
 * With Motion off it jumps.
 */
type Point = { x: number; y: number };

/** Ease in and out gently (sine), so the rocket cruises rather than darting. */
const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
/** How far short of a planet the rocket parks, along the path, so it doesn't cover it. */
const PARK = 54;
/** How far the path runs past the first and last planets. */
const LEAD = 90;

export class PmExperience extends HTMLElement {
  #path!: SVGPathElement;
  #rocket!: HTMLElement;
  #stops: HTMLElement[] = [];
  /** The path length at each planet. */
  #lengths: number[] = [];
  /** Where the rocket is, along the path, and whether it's facing down it. */
  #at = 0;
  #down = true;
  #current = -1;
  #frame = 0;
  #scrollFrame = 0;
  #cleanup: (() => void)[] = [];

  connectedCallback() {
    this.#path = this.querySelector('[data-path]')!;
    this.#rocket = this.querySelector('[data-rocket]')!;
    this.#stops = [...this.querySelectorAll<HTMLElement>('[data-stop]')];

    const resize = new ResizeObserver(() => this.#layout());
    resize.observe(this);
    const onScroll = () => {
      cancelAnimationFrame(this.#scrollFrame);
      this.#scrollFrame = requestAnimationFrame(() => this.#follow());
    };
    addEventListener('scroll', onScroll, { passive: true });
    this.#cleanup.push(
      () => resize.disconnect(),
      () => removeEventListener('scroll', onScroll),
      () => cancelAnimationFrame(this.#frame),
      () => cancelAnimationFrame(this.#scrollFrame),
    );
  }

  disconnectedCallback() {
    this.#cleanup.forEach((fn) => fn());
    this.#cleanup = [];
  }

  /** A planet's center, in this element's coordinates. */
  #center(stop: HTMLElement): Point {
    const box = this.getBoundingClientRect();
    const r = stop.querySelector('[data-planet]')!.getBoundingClientRect();
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
  }

  /** Draws the path through the planets: S-curves that swing past each one before turning back. */
  #layout() {
    const points = this.#stops.map((s) => this.#center(s));
    const first = points[0];
    const last = points.at(-1);
    if (!first || !last) return;
    const swing = Math.min(200, Math.abs((points[1]?.x ?? first.x) - first.x) * 1.15);

    // Built a segment at a time, measuring as it goes, so each planet's length is known.
    let d = `M ${first.x} ${first.y - LEAD} L ${first.x} ${first.y}`;
    this.#path.setAttribute('d', d);
    this.#lengths = [this.#path.getTotalLength()];
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1]!;
      const b = points[i]!;
      const dir = Math.sign(b.x - a.x);
      const k = (b.y - a.y) * 0.5;
      d += ` C ${a.x - dir * swing} ${a.y + k} ${b.x + dir * swing} ${b.y - k} ${b.x} ${b.y}`;
      this.#path.setAttribute('d', d);
      this.#lengths.push(this.#path.getTotalLength());
    }
    this.#path.setAttribute('d', `${d} L ${last.x} ${last.y + LEAD}`);

    if (this.#current >= 0) this.#place(this.#parkAt(this.#current, this.#down), this.#down);
    this.#follow();
  }

  #parkAt(i: number, down: boolean) {
    return this.#lengths[i]! + (down ? -PARK : PARK);
  }

  /** Picks the planet nearest the middle of the screen and sends the rocket to it. */
  #follow() {
    const middle = innerHeight / 2;
    let reached = 0;
    let nearest = Infinity;
    this.#stops.forEach((s, i) => {
      const r = s.querySelector('[data-planet]')!.getBoundingClientRect();
      const distance = Math.abs(r.top + r.height / 2 - middle);
      if (distance < nearest) {
        nearest = distance;
        reached = i;
      }
    });
    if (reached !== this.#current) this.#flyTo(reached);
  }

  #flyTo(i: number) {
    const from = this.#current;
    this.#current = i;
    this.#stops.forEach((s, j) => s.toggleAttribute('data-current', j === i));

    const down = from < 0 || i > from;
    const to = this.#parkAt(i, down);
    cancelAnimationFrame(this.#frame);
    if (from < 0 || !motion.get()) return this.#place(to, down);

    const start = this.#at;
    // Unhurried: about a second per screen of path, from 0.9 s to 2.4 s.
    const ms = Math.min(2400, Math.max(900, Math.abs(to - start) * 1.1));
    const t0 = performance.now();
    let lastPuff = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      this.#place(start + (to - start) * ease(t), down);
      if (t - lastPuff > Math.max(0.02, 60 / ms) && t < 0.95) {
        lastPuff = t;
        this.#puff();
      }
      if (t < 1) this.#frame = requestAnimationFrame(tick);
    };
    this.#frame = requestAnimationFrame(tick);
  }

  /** Puts the rocket at a length along the path, pointing along it (or back up it). */
  #place(at: number, down: boolean) {
    this.#at = at;
    this.#down = down;
    const p = this.#path.getPointAtLength(at);
    const q = this.#path.getPointAtLength(at + 1);
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI + (down ? 0 : 180);
    this.#rocket.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
  }

  /** A puff of exhaust behind the rocket that fades and removes itself. */
  #puff() {
    const behind = this.#path.getPointAtLength(this.#at + (this.#down ? -22 : 22));
    const el = document.createElement('span');
    el.className = 'pointer-events-none absolute size-2.5 rounded-full bg-ink2/40 animate-puff';
    el.style.left = `${behind.x}px`;
    el.style.top = `${behind.y}px`;
    el.addEventListener('animationend', () => el.remove());
    this.append(el);
  }
}

if (!customElements.get('pm-experience')) customElements.define('pm-experience', PmExperience);

declare global {
  interface HTMLElementTagNameMap {
    'pm-experience': PmExperience;
  }
}
