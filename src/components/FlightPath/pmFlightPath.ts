import { motion } from '../../stores/motion';
import { currentRole } from '../../stores/scenicRoute';

/**
 * <pm-flight-path>: the scenic route's rocket and camera (./FlightPath.astro).
 *
 * Desktop: the first time the window is seen, the rocket flies from the start
 * past every planet to the open role's moon, with the camera following and an
 * exhaust trail behind it. After that it flies to the moon of whichever role
 * card is opened (the `currentRole` store) and parks beside it.
 *
 * Phones: the rocket hops along the stage pills to the open role's stage.
 *
 * With Motion off nothing flies: the rocket and camera jump.
 */
type Point = { x: number; y: number };
type Curve = (Point & { len: number })[];

const ease = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/** A smooth curve through `points` (Catmull-Rom), sampled as a polyline with running lengths. */
function curveThrough(points: Point[], perSegment = 40): Curve {
  const out: Curve = [];
  let len = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;
    for (let s = i ? 1 : 0; s <= perSegment; s++) {
      const t = s / perSegment;
      const at = (a: number, b: number, c: number, d: number) =>
        0.5 *
        (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t ** 2 + (-a + 3 * b - 3 * c + d) * t ** 3);
      const p = { x: at(p0.x, p1.x, p2.x, p3.x), y: at(p0.y, p1.y, p2.y, p3.y) };
      const prev = out.at(-1);
      if (prev) len += Math.hypot(p.x - prev.x, p.y - prev.y);
      out.push({ ...p, len });
    }
  }
  return out;
}

/** The point `len` along a curve, with its heading in degrees. */
function pointAt(curve: Curve, len: number) {
  const i = Math.max(
    1,
    curve.findIndex((p) => p.len >= len),
  );
  const a = curve[i - 1]!;
  const b = curve[i] ?? a;
  const t = b.len > a.len ? (len - a.len) / (b.len - a.len) : 0;
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
  };
}

/** Moves a rocket element (pointing right) to a point, turned to `angle`. */
function place(rocket: HTMLElement, { x, y }: Point, angle: number) {
  rocket.style.left = `${x}px`;
  rocket.style.top = `${y}px`;
  rocket.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
}

/** A puff of exhaust that fades and removes itself. */
function puff(container: HTMLElement, { x, y }: Point) {
  const el = document.createElement('span');
  el.className = 'pointer-events-none absolute size-2.5 rounded-full bg-ink2/40 animate-puff';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.addEventListener('animationend', () => el.remove());
  container.append(el);
}

/**
 * One rocket and the ground it flies over: flies along a curve with an exhaust
 * trail, and remembers where it is so a new flight can start mid-air.
 */
class Flight {
  pos: Point = { x: 0, y: 0 };
  angle = 0;
  #frame = 0;

  constructor(
    readonly rocket: HTMLElement,
    readonly ground: HTMLElement,
    readonly tail: number,
  ) {}

  jump(to: Point, angle: number) {
    this.stop();
    this.pos = to;
    this.angle = angle;
    place(this.rocket, to, angle);
  }

  stop() {
    cancelAnimationFrame(this.#frame);
  }

  /** Flies through `via` to `to`, then turns to `angle`. `onStep` gets the eased progress, 0 to 1. */
  fly(via: Point[], to: Point, angle: number, ms: number, onStep?: (progress: number) => void) {
    this.stop();
    const curve = curveThrough([this.pos, ...via, to]);
    const total = curve.at(-1)!.len;
    const t0 = performance.now();
    let lastPuff = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      const progress = ease(t);
      const p = pointAt(curve, total * progress);
      this.pos = p;
      this.angle = p.angle;
      place(this.rocket, p, p.angle);
      onStep?.(progress);
      if (t - lastPuff > Math.max(0.01, 60 / ms) && t < 0.96) {
        lastPuff = t;
        const a = (p.angle * Math.PI) / 180;
        puff(this.ground, { x: p.x - Math.cos(a) * this.tail, y: p.y - Math.sin(a) * this.tail });
      }
      if (t < 1) this.#frame = requestAnimationFrame(tick);
      else this.jump(to, angle);
    };
    this.#frame = requestAnimationFrame(tick);
  }
}

export class PmFlightPath extends HTMLElement {
  #world!: HTMLElement;
  #desktop!: Flight;
  #mobile!: Flight;
  #pills!: HTMLElement;
  #seen = { desktop: false, mobile: false };
  #pillAt = 0;
  #camera = 0;
  #cleanup: (() => void)[] = [];

  connectedCallback() {
    this.#world = this.querySelector('[data-world]')!;
    this.#pills = this.querySelector('[data-pills]')!;
    this.#desktop = new Flight(this.querySelector('[data-rocket]')!, this.#world, 22);
    this.#mobile = new Flight(this.querySelector('[data-mobile-rocket]')!, this.#pills, 12);

    const role = currentRole.get() || this.#activeMoon();
    if (motion.get()) {
      // Wait at the start until the section is first seen.
      const start = this.#startPoint();
      this.#desktop.jump(start, 0);
      this.#setCamera(start.x + 180);
      this.#mobile.jump(this.#pillCorner(0), -20);
    } else {
      this.#parkAt(role);
      this.#hopTo(role, false);
    }

    this.#onFirstSight(this.querySelector('[data-window]')!, () => {
      this.#seen.desktop = true;
      this.#flyTo(currentRole.get() || role, true);
    });
    this.#onFirstSight(this.#pills, () => {
      this.#seen.mobile = true;
      this.#hopTo(currentRole.get() || role, true);
    });

    const resize = new ResizeObserver(() => this.#hopTo(currentRole.get() || role, false));
    resize.observe(this.#pills);
    this.#cleanup.push(
      () => resize.disconnect(),
      () => this.#desktop.stop(),
      () => this.#mobile.stop(),
      currentRole.subscribe((next) => {
        if (!next) return;
        this.#mark(next);
        if (this.#seen.desktop) this.#flyTo(next, false);
        if (this.#seen.mobile) this.#hopTo(next, true);
      }),
    );
  }

  disconnectedCallback() {
    this.#cleanup.forEach((fn) => fn());
    this.#cleanup = [];
  }

  #onFirstSight(el: Element, run: () => void) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    this.#cleanup.push(() => io.disconnect());
  }

  #mark(role: string) {
    this.querySelectorAll<HTMLElement>('[data-moon]').forEach((m) =>
      m.toggleAttribute('data-current', m.dataset.moon === role),
    );
    const stage = this.#moon(role)?.dataset.stage;
    this.querySelectorAll<HTMLElement>('[data-pill]').forEach((p) =>
      p.toggleAttribute('data-current', p.dataset.pill === stage),
    );
  }

  // Desktop

  #startPoint(): Point {
    const [x, y] = (this.dataset.start ?? '40,75').split(',').map(Number);
    return { x: x!, y: y! };
  }

  #moon(role: string) {
    return this.querySelector<HTMLElement>(`[data-moon="${role}"]`);
  }

  #activeMoon() {
    return this.querySelector<HTMLElement>('[data-moon][data-current]')?.dataset.moon ?? '';
  }

  /** Where the rocket parks for a role, turned to face its moon. */
  #park(role: string) {
    const [x, y, angle] = (this.#moon(role)?.dataset.park ?? '0,0,0').split(',').map(Number);
    return { point: { x: x!, y: y! }, angle: angle! };
  }

  #setCamera(x: number) {
    this.#camera = x;
    this.#world.style.transform = `translateX(${-x}px)`;
  }

  /** Centers the camera between a role's moon and its parked rocket. */
  #cameraFor(role: string) {
    return (parseFloat(this.#moon(role)?.style.left ?? '0') + this.#park(role).point.x) / 2;
  }

  #parkAt(role: string) {
    const { point, angle } = this.#park(role);
    this.#desktop.jump(point, angle);
    this.#setCamera(this.#cameraFor(role));
  }

  /** Flies to a role's moon. The first flight weaves past every planet from the start. */
  #flyTo(role: string, fromStart: boolean) {
    if (!this.#moon(role)) return;
    if (!motion.get()) return this.#parkAt(role);
    const { point, angle } = this.#park(role);
    const from = this.#desktop.pos;
    let via: Point[];
    if (fromStart) {
      // Pass above one planet and below the next, up to the moon's own planet.
      via = [...this.querySelectorAll<HTMLElement>('[data-planet]')]
        .map((p, i) => ({ x: parseFloat(p.style.left), y: parseFloat(p.style.top) + (i % 2 ? 58 : -52) }))
        .filter((p) => p.x < point.x - 150);
    } else {
      // A gentle arc, bowing toward the middle of the window.
      const mid = { x: (from.x + point.x) / 2, y: (from.y + point.y) / 2 };
      via = [{ x: mid.x, y: mid.y < 75 ? mid.y + 30 : mid.y - 30 }];
    }
    const distance = Math.abs(point.x - from.x) + Math.abs(point.y - from.y);
    const ms = fromStart
      ? Math.min(5200, Math.max(2600, distance * 1.5))
      : Math.min(2600, 700 + distance * 0.8);
    // The camera eases to the new framing on the rocket's own timing, so it keeps up.
    const camFrom = this.#camera;
    const camTo = this.#cameraFor(role);
    this.#desktop.fly(via, point, angle, ms, (t) => this.#setCamera(camFrom + (camTo - camFrom) * t));
  }

  // Phones

  /** A point on pill `i`'s top-right corner, where the rocket perches. */
  #pillCorner(i: number): Point {
    const pills = [...this.querySelectorAll<HTMLElement>('[data-pill]')];
    const box = this.#pills.getBoundingClientRect();
    const r = pills.at(i)!.getBoundingClientRect();
    return { x: r.right - box.left - 6, y: r.top - box.top };
  }

  #pillIndex(role: string) {
    const stage = this.#moon(role)?.dataset.stage;
    return Math.max(
      0,
      [...this.querySelectorAll<HTMLElement>('[data-pill]')].findIndex((p) => p.dataset.pill === stage),
    );
  }

  /** Hops along the pills to the role's stage, through any pills in between. */
  #hopTo(role: string, animate: boolean) {
    const to = this.#pillIndex(role);
    const from = this.#pillAt;
    this.#pillAt = to;
    if (!animate || !motion.get() || from === to) return this.#mobile.jump(this.#pillCorner(to), -20);
    const step = to > from ? 1 : -1;
    const via: Point[] = [];
    for (let i = from + step; i !== to; i += step) via.push(this.#pillCorner(i));
    this.#mobile.fly(via, this.#pillCorner(to), -20, Math.min(2600, 600 + Math.abs(to - from) * 450));
  }
}

if (!customElements.get('pm-flight-path')) customElements.define('pm-flight-path', PmFlightPath);

declare global {
  interface HTMLElementTagNameMap {
    'pm-flight-path': PmFlightPath;
  }
}
