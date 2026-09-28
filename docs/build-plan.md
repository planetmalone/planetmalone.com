# Build Plan: planetmalone.com

> Phase 3 (Implementation). The spec is the Claude Design handoff in `planetMalone.com/` (README + `Planet Malone - Prototype.dc.html`).
> Where the Prototype and the reference mocks disagree, the Prototype wins, except for the print résumé (Pages 1c) and the OG image (Components 1d).

## Guiding constraints

- **Budgets are requirements**, as stated on the Colophon page: Lighthouse 100 in all four categories, LCP under 1.5 s, 100 KB of JS or less, and CLS 0. It also promises no trackers and no cookies.
- **WCAG 2.2 AA.** Hit targets are at least 44px, and every interactive piece works from the keyboard.
- **No UI framework.** Islands are Astro components with plain TypeScript `<script>`s, which keeps JS far under budget.
- **Styling is Tailwind v4.** The design tokens are the Tailwind theme (`src/styles/theme.css`), with Tailwind's default palette, radii, shadows, breakpoints and type scale cleared so only the spec's values exist. A small plain-CSS layer (`src/styles/base.css`) covers what utilities can't: theme and motion state, view-transition pseudo-elements and print.
- **One content source.** Markdown/JSON in the repo generates the site, the print view and both PDFs.
- **No invented content.** Anything marked "Draft:" in the design stays a visible Draft placeholder until Sean writes it.

## Phase 0: Project setup

1. **Upgrade Node.** It is currently 18.19, which current Astro no longer supports. Install via `nvm` and pin the version in `.nvmrc`. Use 24 LTS, or 22 LTS at minimum.
2. **Initialize git.** Move the design bundle to `design/` as read-only reference. Keep `docs/`.
3. **Scaffold the project.** Use Astro (minimal template), strict TypeScript and static output.
4. **Tooling:**
   - Prettier with the Astro plugin
   - `astro check` in CI
   - Playwright for tests, screenshots and PDF rendering
5. **Fonts.** Self-host variable WOFF2 for Bricolage Grotesque (opsz and wght axes) and Atkinson Hyperlegible Next. Give each a size-adjusted fallback `@font-face` and preload the two faces used above the fold.
6. **Assets.**
   - The SVG logos and favicon go into `src/assets` / `public`.
   - Illustrations go through `astro:assets` `<Picture>`, producing AVIF/WebP with explicit width and height.

## Phase 1: Foundations

1. **`tokens.css`.** Every color token for light and dark, plus radii, spacing and type scale, taken from the README tables. The dark theme is set via `[data-theme="dark"]` and `color-scheme`.
2. **Base styles:**
   - Antialiasing
   - `text-wrap` rules
   - `tabular-nums` utility
   - Global `:focus-visible` ring
   - Link colors
   - Skip link
3. **`BaseLayout.astro`:**
   - `<head>` metadata slots
   - An inline pre-paint script that resolves theme and motion from `localStorage` / media queries, so there's no flash
   - The sticky header (desktop links, ⌘K button, theme button with the flipping logo mark, mobile Menu sheet)
   - The footer (theme segmented control, Motion switch, "will not" line, version line)
4. **Breakpoints.** 900px, plus 1180px for the hero. Add a container utility at 1240px max width with the specified gutters.

## Phase 2: Content model ✅

Astro content collections in `src/content/`, all YAML, typed with Zod schemas in `src/content.config.ts`:

| File | Holds |
|---|---|
| `cases/*.yaml` | 4 case studies: tags, meta, context, scope, decisions, people and quote, outcomes, reflection |
| `roles/*.yaml` | 9 roles: years, title, company, scope, wins, tech chips, aside, scenic-route stage, case-study link |
| `profile.yaml` | Name, status pill, hero lead, contact, links, proof strip, résumé PDFs, education, volunteering, print-only headline/summary/closing |
| `experience.yaml` | The scenic-route label and stages |
| `lead.yaml`, `built.yaml`, `skills.yaml` | How I lead, Built & written, skill groups |
| `about.yaml` | 4 bio lengths, population census, hobbies |
| `now.yaml`, `uses.yaml`, `colophon.yaml` | Secondary pages |

- **Reading content:** `getSingleton('profile')`, `getCases()`, `getRoles()` and `getCaseNeighbors(slug)` in `src/utils/content.ts`. Display formatting (years, dates, population) is in `src/utils/format.ts`, so content stores facts, not formatted strings.
- **Drafts** are separate `draft` fields, never placeholder text in a real field. The Draft component adds the "Draft:" label; print omits drafts.
- **Validation:** schemas fail the build on missing fields, bad values and rows with neither a value nor a draft. `getRoles()` also fails the build on a broken case-study link, which Astro alone only logs.
- **Cross-check:** see `docs/content-review.md` for every change from the Prototype's copy and the open questions.

## Phase 3: Home page, static first

Build every section with server-rendered HTML and no JS, then layer on behavior in Phase 4:

1. Hero field: disc, orbit ring, avatar, status pill, H1, lead, 4 buttons
2. Proof strip, with a static Central Time fallback
3. Sticky left rail with section nav and résumé buttons
4. Selected impact: 4 case cards, each with a `view-transition-name` on its title
5. How I lead
6. Experience: scenic-route stepper and 9 role cards as `<details>`/`<summary>` with `interpolate-size`, plus education and volunteering
7. Things I've built and written
8. Skills
9. About: bio switcher (renders "Short" without JS), population card, hobby photo placeholders
10. Contact: the dark card

### Shared components

Extract these first, then build the sections from them. Each lives in its own folder (`src/components/Name/`) with an `index.ts`, plus a custom element sibling if it has behavior. Long class lists are split into named groups with `class:list` so each line reads as one concern.

| Component | Replaces / used by |
|---|---|
| `SkipLink` | The skip link's long inline class list in `Header.astro` (hidden state, revealed position, appearance) |
| `Button` | Pill buttons and links: hero, rail, contact, 404, and the inline `outlinePill` string in `Header.astro` |
| `Chip` | Tags on case cards and case studies, skill chips, tech chips on role cards |
| `SegmentedControl` | Footer theme picker and the About bio-length switcher |
| `SectionHeading` | Home section H2s and eyebrows |
| `CaseCard` | Selected impact cards (home) and prev/next cards (case studies) |
| `StatCard` | Dark outcome cards (case studies) and budget cards (Colophon) |
| `Draft` | Pink "Draft:" placeholder boxes |

## Phase 4: Islands and interactions

Each island is a small, self-contained script, and all of them honor the Motion setting:

| Island | Behavior |
|---|---|
| Theme | Light / Dark / System with live `prefers-color-scheme`; header toggle with a circular View Transitions reveal (450ms) from the click point; footer segmented control |
| Motion | Footer switch; defaults to the inverse of `prefers-reduced-motion`; stored as a `data-motion` attribute that CSS and the other scripts read. Section links (rail, mobile menu, ⌘K "Jump to") scroll smoothly when Motion is on and jump instantly when it's off |
| ⌘K palette | Opens via ⌘K / Ctrl+K / `/` / button; ARIA combobox + listbox with `aria-activedescendant`; wrapping ↑/↓; substring filter; grouped commands (Actions, Jump to, Case studies, Pages, Other); scroll lock; focus return; empty state |
| Experience | One card open at a time (first open on load) and scenic-route pill highlighting; works with `aria-expanded` |
| Bio switcher | Segmented control with an `aria-live` region |
| Clock ✅ | "Local time on Planet Malone", `America/Chicago`, refreshes every 30s. Built early, in Phase 3 (`src/components/Clock/`) |
| Copy email + toast | Clipboard, "Copied!" for 2.8s, shared toast service used by ⌘K and the Konami code |
| Rail tracking | IntersectionObserver; active item when its top passes 180px; animated accent bar |
| Mobile menu | Sheet, scrim, Esc, focus trap |
| Easter eggs | Styled console message (second line: "sean@planetmalone.com · Try ⌘K."), ⌘K "Count the population again". **Cut:** Konami code, the "Don't click this" footer link, and ⌘K "Take me somewhere new" (Sean, 2026-09-27) |

## Phase 5: Other routes

- **`/work/[slug]`:**
  - Static paths from the `cases` collection
  - Header card, meta row, sticky "On this page" nav
  - Decision cards, pull-quote, outcome cards, Draft box
  - Prev/next cards that loop
  - The card-title → H1 morph uses Astro `<ClientRouter />` view transitions, disabled when Motion is off
  - On navigation, scroll to top and move focus to `<main>`
- **`/now`, `/uses`, `/colophon`:** built as specified, with the Draft placeholders intact.
- **`404.astro`:** echoes the visitor's bad path in the `<code>` chip, client-side, with a static fallback. Has the astronaut illustration and buttons that open ⌘K.

## Phase 6: Print and PDFs

1. **Print stylesheet** matching Pages **1c**:
   - US Letter, 2 pages, white background, light palette
   - Chrome hidden and every role expanded
   - `@page` footers "Sean Malone · Résumé" plus page numbers
   - The closing line with the logo
2. **`/resume/staff` and `/resume/em` routes.** These print-first views are rendered from the same content, so the print layout isn't tangled into the home page.
3. **PDF generation.** A post-build script (`scripts/buildPdfs.ts`) uses Playwright to `page.pdf()` each route into `dist/resume-staff.pdf` and `dist/resume-em.pdf`. The EM PDF duplicates the Staff one until Sean supplies the EM content.
4. **Page-count check.** A test asserts each PDF is exactly 2 pages.

## Phase 7: SEO and metadata

- Per-page `<title>`, description and canonical
- `ProfilePage` + `Person` JSON-LD on home
- `@astrojs/sitemap`, `robots.txt`, `llms.txt` (generated from content)
- **OG images** generated at build time with Satori + resvg: one for home and one per case study (title swapped in), matching Components **1d**. Fonts are loaded from the self-hosted files.
- Favicon from `avatar-favicon.svg`, plus the PNG and Apple touch sizes

## Phase 8: Quality gates

| Gate | How |
|---|---|
| Visual fidelity | Playwright screenshots of the Prototype vs. the build: every route at 1440 / 1024 / 390 widths, light and dark. Reviewed side by side, fixing drift |
| Accessibility | `@axe-core/playwright` on every route and state (palette open, menu open, dark); manual keyboard pass; screen-reader spot check of ⌘K and the accordion |
| Performance | Lighthouse CI with assertions for the Colophon budgets; a bundle-size check keeps JS ≤ 100 KB |
| Behavior | Playwright tests for ⌘K, theme persistence without flash, one-open-at-a-time roles, bio switcher, copy email, 404 path echo, Motion off |
| Content | `astro check` plus Zod schemas; a link checker |

These run locally with one command, `npm run verify`, and again in CI.

## Phase 9: Deploy

1. Pick a host (decision below).
2. Connect the repo and set up preview deploys on PRs.
3. Point the `planetmalone.com` DNS at the host with HTTPS. Redirect `www` to the apex.
4. Run Lighthouse against production and confirm the Colophon numbers are true before publishing them.

## Suggested order and checkpoints

| Checkpoint | Sean reviews |
|---|---|
| A: after Phases 0–1 | Header, footer and theme switching on an empty page; fonts and colors feel right |
| B: after Phases 2–3 | The full home page, static, beside the Prototype; content cross-check results from the vault |
| C: after Phase 4 | All interactions on desktop and phone |
| D: after Phases 5–7 | Case studies, secondary pages, print/PDFs, OG previews |
| E: after Phases 8–9 | Live on a preview URL, then production |

## Decisions (Sean, 2026-09-27)

1. **Hosting:** Cloudflare Pages.
2. **Repo:** public on GitHub.
3. **Node:** latest LTS via `nvm`.
4. **Scope cuts:** no Konami code, no "Don't click this" link to the 404 page, no ⌘K "Take me somewhere new".
5. **Island framework:** none. Plain TypeScript `<script>`s in Astro components. No React Aria under any circumstances.
6. **Styling:** Tailwind v4 with the tokens as its theme. Reusable UI becomes Astro components (`Switch` so far; the rest are listed under Phase 3 › Shared components).
7. **Client state:** Nano Stores in `src/stores/` (theme, motion, palette), per Astro's docs. Interactive components are custom elements whose state lives in attributes, so they work in any script order.

## Open items from the handoff (Sean supplies later; placeholders until then)

- Case-study reflections ("What I'd do differently") and some context details
- `/uses` items and `/now` "Playing"
- Hobby photos (4)
- The EM résumé content
- Optionally a ~600px astronaut and a /now laptop without the Apple logo (the "confused" illustration is no longer needed)
