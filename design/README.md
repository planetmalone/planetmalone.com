# Handoff: Planet Malone — personal CV site

## Overview
Planet Malone (planetmalone.com) is Sean Malone's personal CV site. Audience: recruiters and hiring managers for **Staff / Principal Frontend Engineer** and **Frontend Engineering Manager** roles (remote, Central Time). It must answer "who is this, what level, what proof" in under 10 seconds, then reward deeper reading with case studies, a bit of personality, and a few easter eggs.

Routes: `/` (home), `/work/[slug]` (4 case studies), `/now`, `/uses`, `/colophon`, 404, plus a print stylesheet and a generated Open Graph image.

## About the design files
The files in this bundle are **design references built in HTML** — prototypes showing intended look and behaviour, not production code. Recreate them in the target stack. There is no existing codebase; the chosen stack (stated on the Colophon page) is **Astro, static-first**, with small interactive islands only where needed (theme toggle, ⌘K palette, bio switcher, role cards). Use Astro components + plain CSS (custom properties) or a lightweight CSS approach; no UI framework is required. Content should live in Markdown/JSON so one résumé source generates the site, the print view and the PDFs.

The `.dc.html` files open directly in a browser (they need `support.js` next to them). They use inline styles and a small runtime — ignore the runtime; lift the values.

## Fidelity
**High-fidelity.** Colours, type, spacing, radii, copy and interactions are final. Recreate pixel-accurately. Exceptions, marked in the UI with pink "Draft:" boxes: copy Sean will write himself (case-study reflections, /uses items, hobby photos). Keep them as clearly marked placeholders — do not invent content.

## Files
- `Planet Malone - Prototype.dc.html` — **primary reference.** The full working site: routing, light/dark, ⌘K, all pages, responsive, print.
- `reference/Planet Malone - Pages.dc.html` — static mocks: case-study page, 404, **2-page US Letter print résumé** (1c — the print layout the real build should match).
- `reference/Planet Malone - Components.dc.html` — role-card states, ⌘K palette, theme picker, **Open Graph image 1200×630** (1d).
- `reference/Planet Malone - Case Studies.dc.html`, `reference/Planet Malone - Secondary Pages.dc.html` — earlier static mocks of the same pages.
- `research.md` — the original research brief (competitive review, recruiter behaviour, feature rationale).
- `assets/` — production assets (see Assets).

Where the Prototype and the reference files disagree, **the Prototype wins**, except the print résumé layout (use Pages 1c) and the OG image (use Components 1d).

---

## Design tokens

### Colour — light theme (default)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F7F2EA` | page background (warm paper) |
| `--surface` | `#FFFBF5` | cards |
| `--sunken` | `#EFE7DB` | chips, segmented-control track, hover fill |
| `--line` | `#E3D8C8` | borders, dividers |
| `--ink` | `#231C15` | primary text |
| `--ink2` | `#5E5246` | secondary text |
| `--ink3` | `#3A3027` | body copy in cards |
| `--accent` | `#C4461C` | Persimmon: links, eyebrows, focus ring |
| `--field` | `#C4461C` | home hero field |
| `--field-deep` | `#A93A14` | planet disc inside hero |
| `--on-field` | `#FFF6EC` | text/buttons on the hero field |
| `--field-btn-ink` | `#231C15` | text inside filled on-field buttons |
| `--btn` / `--btn-ink` | `#231C15` / `#FFFBF5` | primary buttons, selected states |
| `--green` | `#2F5A3A` | metric line on case cards |
| `--green-dot` | `#3F7A4A` | "open to roles" status dot, logo moon |
| `--metric` | `#8FCB9C` | big numbers on dark outcome cards |
| `--dark-card` / `--dark-card-ink` / `--dark-card-2` | `#231C15` / `#F7F2EA` / `#D9CDBC` | contact block, outcome & budget cards |
| `--c-accent` | `#FF8A5B` | accent on dark cards (contact "." and Copy button) |
| `--draft-bg` / `--draft-ink` | `#FBEADF` / `#6E2A10` | "Draft:" placeholder boxes |
| `--stripe` | `#E8DFD1` | photo-placeholder stripes |
| `--overlay` | `rgba(35,28,21,.45)` | modal scrim |

### Colour — dark theme
`--bg #16120E` · `--surface #201A15` · `--sunken #2A231C` · `--line #362D25` · `--ink #F4ECE0` · `--ink2 #B9AC9B` · `--ink3 #E6DCCD` · `--accent #FF8A5B` · `--field #FF8A5B` · `--field-deep #F2774A` · `--on-field #16120E` · `--field-btn-ink #F4ECE0` · `--btn #F4ECE0` · `--btn-ink #16120E` · `--green #8FCB9C` · `--green-dot #2F7A45` · `--metric #8FCB9C` · `--dark-card #2A231C` · `--dark-card-ink #F4ECE0` · `--dark-card-2 #B9AC9B` · `--c-accent #FF8A5B` · `--draft-bg #3A2418` · `--draft-ink #FFC9AE` · `--stripe #332A22` · `--overlay rgba(0,0,0,.6)`. Set `color-scheme: dark`.

**Accent:** Persimmon only. (Earlier mocks show an accent picker with Neptune/Moss/Plum/Sunspot — it was **removed**; do not build it.) Green (Sean's other favourite colour) is the supporting accent: metrics, status dot, logo moon.

Print always uses the light palette on white `#fff`.

### Typography
- **Display:** Bricolage Grotesque (variable, opsz 12–96, wght 400–800). Self-host as variable WOFF2 with a size-adjusted fallback.
- **Text:** Atkinson Hyperlegible Next (wght 400–700). Self-host likewise. Use `font-variant-numeric: tabular-nums` on all metrics, dates, times.
- Antialiased; `text-wrap: pretty` on paragraphs, `balance` on case-study H1.

| Role | Font | Size (desktop / mobile) | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero name "Sean Malone" | Bricolage | 120px (≥1180) · 88px (900–1179) / 60px | 800 | 0.9 | -0.045em |
| Hero lead | Atkinson | 24px / 18px | 400 | 1.4 | — |
| Page H1 (Now/Uses/Colophon) | Bricolage | 72px | 800 | 0.95 | -0.045em |
| 404 H1 "Lost in space." | Bricolage | 104px / 64px | 800 | 0.9 | -0.05em |
| Case-study H1 | Bricolage | 76px / 40px | 800 | 0.98 | -0.045em |
| Section H2 (home) | Bricolage | 36px | 700 | — | -0.03em |
| Case-study H2 | Bricolage | 32px | 700 | — | -0.025em |
| Contact H2 "Say hello." | Bricolage | 56px | 800 | 1 | -0.04em |
| Proof numbers | Bricolage | 32px | 700 | — | -0.02em |
| Case-card title | Bricolage | 24px | 700 | 1.12 | -0.02em |
| Outcome/budget big number | Bricolage | 36px (case) / 34px (colophon) | 800 | 1 | -0.03em |
| Population number | Bricolage | 64px | 800 | 1 | -0.04em |
| Body (case study article) | Atkinson | 18px | 400 | 1.65 | — |
| Body (cards) | Atkinson | 15–16px | 400 | 1.5 | — |
| Eyebrow labels | Atkinson | 12–13px uppercase | 700 | — | 0.08em |
| Chips | Atkinson | 13–14px | 600 | — | — |
| Buttons | Atkinson | 14–15px | 700 | — | — |

### Radii
Pill `999px` (all buttons, chips, segmented controls) · hero field & contact block & case header `28px` · cards `20px` · role cards, decision cards, prev/next `16px` · outcome cards `18px` · hobby photos, draft boxes `12–14px` · ⌘K dialog `20px`, ⌘K rows `12px`.

### Borders, shadows, focus
- Borders are `1.5px solid var(--line)`; hover/selected → `var(--accent)` or `var(--ink)`. Dashed `1.5px dashed var(--line)` above case-card metric.
- Shadows only on floating layers: ⌘K `0 24px 60px rgba(0,0,0,.35)`; mobile menu `0 20px 50px rgba(0,0,0,.3)`; toast `0 12px 30px rgba(0,0,0,.25)`.
- Focus: `:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px }` everywhere.

### Spacing / layout
- Max content width `1240px`, centred. Gutters `32px` desktop / `18px` mobile (hero and case page use `20px` / `10px`).
- Single breakpoint: **900px** (mobile below). Hero has a second step at **1180px**.
- Home body: grid `220px minmax(0,1fr)`, gap `64px`, sections separated by `96px`.
- Links: `a { color: var(--accent) } a:hover { color: var(--ink) }`.

---

## Screens

### Global header (all routes, sticky)
Sticky top, `var(--bg)`, bottom border `1px var(--line)`, inner padding `10px gutter`.
- Left: logo mark (32px) + wordmark "planet malone" (Bricolage 700, 18px, -0.02em), links to `/`. Logo swaps to `logo-mark-dark.svg` in dark mode.
- Right (desktop): page links **Work · Now · Uses · Colophon** (15px/600, pill padding 8×12, current page gets `--sunken` fill + `aria-current="page"`; case studies count as Work). Then the **⌘K button** (44px tall pill, 1.5px border, bold "⌘K" + "Search or do a thing"; label hidden on mobile). Then the **theme button** (44px circle, `--surface`, contains the logo mark at 28px; the mark flips `scaleX(-1)` in dark mode, 300ms `cubic-bezier(.4,0,.2,1)`).
- Mobile: page links hidden; a **Menu** pill button opens a floating sheet (fixed, 12px from edges, top 72px) listing the 7 home sections + Now / Uses / Colophon, 48px rows. Scrim click / Esc closes.
- A "Skip to content" link is the first focusable element (hidden until focused).

### Home `/`
**1. Hero field** — rounded 28px panel, `var(--field)` Persimmon, padding `44px 56px 48px` (mobile `22px 18px 24px`), min-height 600px desktop. Decorative (aria-hidden): a `var(--field-deep)` disc 580px at right -40 / bottom -110, and a tilted orbit ring (820×170, 2px `--on-field` border, rotate -14deg, opacity .45). Avatar `illo-wave.png` bottom-right, flush to the bottom edge, 400px wide (280px at 900–1179; mobile 132px, top-right above the text). Avatar is the same in light and dark.
   Text block (bottom-left, max 680px):
   - Status pill: `--on-field` fill, green dot 8px, "Open to Staff / Principal FE and FE Manager roles · Remote".
   - H1 "Sean Malone".
   - Lead: "Frontend engineer and engineering leader. I build design systems and frontend platforms that let whole teams ship faster, and I've done it from both the IC chair and the manager's chair."
   - Buttons (46px pills; 4 in a row desktop, 2×2 mobile): **Résumé · Staff**, **Résumé · EM** (filled `--on-field`), **Copy email** (outline), **LinkedIn ↗** (outline → linkedin.com/in/malonesean).
**2. Proof strip** under the hero: "18+ years / in tech" · "Teams up to 50+ / people led" · "4 design systems / built · 2 design-system teams managed" · right-aligned "Dallas–Fort Worth · Central Time / Local time on Planet Malone: {h:mm AM}" (live, `America/Chicago`, refresh every 30s).
**3. Left rail** (desktop only, sticky top 96px): section nav with a bar indicator (18px → 40px accent bar on the active item, 200ms), then Résumé · Staff / Résumé · EM / Copy email buttons.
**4. Sections** (ids for anchors): `impact`, `lead`, `experience`, `built`, `skills`, `about`, `contact`.
- **Selected impact** — 2-column grid (1 on mobile) of 4 case cards: tags chips, title, org line, summary, dashed divider, green metric + "Read →". Whole card links to `/work/[slug]`. Hover: border → accent. Cards (title / org / metric):
  1. NextGen design system & React Aria migration / Aspira · 2025–26 / Full React Aria component set
  2. AI-assisted engineering, done responsibly / Aspira · 2026 / Used by ~20 engineers
  3. Micro-frontend platform for 5 teams / RedTeam · 2024–25 / Builds 30+ min → under 5 min
  4. Running a 50-person practice without leaving the code / Stellar Elements · 2021–23 / 1:1 cadence <50% → 100%
- **How I lead** — two columns, "As an IC leader" and "As a manager", 3 principles each (bold 18px title + ink2 description). Copy in the Prototype.
- **Experience** — "The scenic route:" stepper of 5 pills: *U.S. Army → CS degree → Lead → Director → Back to Staff IC, on purpose*. Then 9 expandable role cards (`<ol>`). Card: dates column 104px (on mobile dates sit above the title), title + "· Company", scope line, and a 28px circular +/– indicator. Expanded: bullet wins, tech chips, optional italic aside, optional "Read the case study →". **Only one card open at a time; the first is open on load.** When a card is open, its **stage pill in the scenic route is highlighted** (filled `--btn`), with a 200ms colour transition. Stage mapping: Army→U.S. Army; Epic Solutions→CS degree; Infor, projekt202, Redibs→Lead; Stellar Elements→Director; Apollo, RedTeam, Aspira→Back to Staff IC. Below: education (B.S. CS, UT Dallas, 2013 · 4.0 · Summa Cum Laude) and Habitat for Humanity volunteering.
   Build with `<details>/<summary>` + `interpolate-size: allow-keywords` for height animation, or an equivalent accessible disclosure (`aria-expanded`).
- **Things I've built and written** — ruled list (name / description / kind). Note line: "Talks and posts will land here…".
- **Skills** — 3 groups (Shipped in production / Led teams using / Currently exploring), label column 200px + chip list. No skill bars.
- **About** — bio-length segmented control: **Just the facts** (bullet list) · **Short** (default) · **Long** · **Way too long**; content region is `aria-live="polite"`. Side card "Population of Planet Malone: **12**" — Humans 4, Cats 3, Dogs 2, Mice 2, Bearded dragon 1; caption "Census conducted by the bearded dragon, who counted himself twice." Then 4 hobby photo placeholders (4:3, striped) with captions: 3D printing, Woodworking, Cooking, Board games.
- **Contact** — dark card (28px radius, padding 44px): "Say hello." (orange period), availability line, email `sean@planetmalone.com` + Copy button, links LinkedIn / GitHub (github.com/planetmalone) / Résumé · Staff (PDF, Sep 2026) / Résumé · EM (PDF, Sep 2026).

### Case study `/work/[slug]`
Slugs: `nextgen-design-system`, `ai-assisted-engineering`, `micro-frontend-platform`, `fifty-person-practice`. Unknown slug → 404.
- "← Back to Planet Malone" link.
- Header card (`--surface`, 28px radius, padding 52×60): tag chips, H1 (shares a `view-transition-name` with the home card title so the title morphs between pages), meta row (Where / When / Role / Team-or-Reach).
- Body grid `200px 1fr`: sticky "On this page" nav (desktop only) + article (max 760px, 18px/1.65). Sections: **Context · My role and scope · Key decisions and trade-offs** (2 cards: before vs. chosen, chosen has ink border) **· How I brought people along** (optional pull-quote, Bricolage 32px) **· Outcomes** (3 dark cards, green big numbers) **· What I'd do differently** (Draft box).
- Prev / Next cards at the bottom, looping through the 4 studies.
All copy per study is in the Prototype's `CASES` array. Draft boxes mark copy Sean will supply.

### /now
Max 820px. Illustration `illo-busy.png` at 280px above the H1. H1 "Now", dated pill "Sep 25, 2026" + "What's happening on Planet Malone this month." Ruled rows (label 180px / value): Working on · Looking for · Exploring · Building · Playing (with Draft boxes). Footnote about the date going stale.

### /uses
Max 1040px. H1 "Uses", lead "The tools on my desk and in the garage. No affiliate links." 2-column grid of cards: Desk, Software, Workshop, Kitchen & table. Most items are Draft placeholders.

### /colophon
H1 "Colophon", lead "How Planet Malone is built, and the budgets it's held to. v. 1.0." 4 dark budget cards: **100 × 4** Lighthouse · **< 1.5 s** LCP · **≤ 100 KB** JS · **0** layout shift, trackers, cookies. Ruled rows: Framework, Type, Colour, Accessibility, Content, Metadata, AI (disclosure), Hosting (Draft). These budgets are real requirements for the build.

### 404
Two columns (stack on mobile), min-height 70vh. Eyebrow "Error 404", H1 "Lost in space.", copy with the visitor's actual bad path in a `<code>` chip: "`/{path}` drifted out of orbit. I checked behind the moon and it isn't there either." Buttons: **Back to Planet Malone**, **Open ⌘K**. Right: `illo-astronaut.png`, 280px max (60%), rotated -8deg. No decorative ring. Footer link "Don't click this" deliberately points to a non-existent page.

### Footer (all routes)
"Thanks for visiting Planet Malone." (Bricolage 26px). "This site will not: × track you × drain your battery × make a sound × ask about cookies". Control row between rules: **Theme** segmented control Light / Dark / System, and a **Motion** switch (44×26 track). Bottom: "v. 1.0 · Last updated Sep 25, 2026, by a human, with coffee" + links Now · Uses · Built with Astro (→ /colophon) · Don't click this.

### Print (Ctrl+P from home)
Match `reference/Pages` **1c**: US Letter, 2 pages, white, light palette, no nav/footer/controls, every role expanded, page footers "Sean Malone · Résumé" + page number, a closing line with the logo noting it was printed from planetmalone.com. The Prototype only approximates this (hides chrome, expands roles) — build the proper print stylesheet. The Staff and EM PDFs are generated from the same content source; for now **the EM résumé is a duplicate of the Staff one** (Sean will supply a dedicated EM version later).

### Open Graph image
Match `reference/Components` **1d**: 1200×630, Persimmon field, deep disc + tilted orbit ring, name and positioning line. Generate at build time (e.g. Satori / astro-og) — one for home and one per case study (title swapped in).

---

## Interactions & behaviour

**Theme**
- Three states: light / dark / system (default system, follows `prefers-color-scheme` live). Persist in `localStorage`. Apply before first paint (inline script in `<head>`) — no flash.
- Header theme button toggles light↔dark. With motion on and View Transitions supported: circular reveal from the click point — `clip-path: circle(0 → r)` on `::view-transition-new(root)`, 450ms `cubic-bezier(.4,0,.2,1)`, r = distance to farthest corner. Disable the default cross-fade on root during this transition.

**Motion**
- Default = inverse of `prefers-reduced-motion`. Footer switch overrides; persist. When off: no view transitions, no smooth scroll, instant disclosure.

**⌘K palette**
- Opens with ⌘K / Ctrl+K (toggles), `/` (when not typing in a field), header button, 404 button. Esc or scrim click closes. Locks body scroll. Focus goes to the input.
- Dialog: `role="dialog" aria-modal`, input is a `combobox` controlling a `listbox`; `aria-activedescendant` tracks the selection. ↑/↓ wraps, Enter runs, hover moves the selection. Selected row = `--btn` fill.
- Width min(620px, 100vw-24px); top 12vh (12px on mobile); max-height 70vh; footer hint row "↑↓ move · ↵ run · esc close · Also opens with /".
- Case-insensitive substring filter over label + group + hint. Empty state: "Nothing matches. Even the bearded dragon looked."
- Commands, grouped:
  - **Actions:** Copy email · Download résumé · Staff (PDF) · Download résumé · EM (PDF) · Print résumé · Toggle colour theme (hint shows "Dark → Light" etc.) · Toggle motion
  - **Jump to:** the 7 home sections (navigates home first if needed, then scrolls, offset 80px for the sticky header)
  - **Case studies:** the 4 studies
  - **Pages:** Now · Uses · Colophon
  - **Other:** "Count the population again" → toast "Recount complete: 12. The bearded dragon has filed an objection." · "Take me somewhere new" → a 404 URL

**Copy email** — writes `sean@planetmalone.com` to the clipboard; button label → "Copied!" for 2.8s; toast "Copied. Your clipboard is now 12% more Malone."

**Toast** — bottom-centre pill, `--btn` colours, `aria-live="polite"`, auto-dismiss 2.8s.

**Résumé buttons** — link to real PDFs (`/resume-staff.pdf`, `/resume-em.pdf`, dated Sep 2026). The Prototype shows a toast instead because the PDFs don't exist yet.

**Navigation** — real routes in Astro (the Prototype fakes them with hash routes). Use Astro View Transitions for the card-title → case-study H1 morph; honour the motion setting. On route change, scroll to top and move focus to `<main>`.

**Home section tracking** — the rail highlights whichever section's top has passed 180px from the viewport top (IntersectionObserver is fine).

**Easter eggs**
- **Konami code** (↑↑↓↓←→←→BA) toggles the hero avatar to `illo-confused.png` with toast "Cheat code accepted. Sean is now confused." (again → "Back to normal. Mostly.").
- **Console message** on load: styled "Reading my source? We should talk. I also do 1:1s." then "sean@planetmalone.com · Try ⌘K, or the Konami code."
- "Don't click this" footer link → 404.
- Epic Solutions role aside: "Sleep was briefly deprecated during this period."

**Hover states** — cards/role cards: border → accent (150ms). Outline pills: border → ink. Rail/nav links: colour → ink. Contact links: border → `--c-accent`.

**Responsive** — below 900px: single column everywhere, rail and case-study side nav hidden, Menu button replaces page links, role-card dates move above the title, hero buttons 2×2, avatar moves above the text at 132px. Hit targets ≥ 44px.

**No sound anywhere.**

## State (islands)
- `theme: 'light'|'dark'|'system'`, `motion: boolean` — persisted (`localStorage`).
- `paletteOpen`, `query`, `selectedIndex` — ⌘K island.
- `openRole: number | -1` (default 0) — experience island; drives the scenic-route highlight.
- `bioLength: 'facts'|'short'|'long'|'way'` (default short).
- `copied`, `toast` — transient.
- `konami: boolean` — avatar swap.
- Live Central Time clock (client-only; server-render a static fallback).
No data fetching; all content is static at build time.

## SEO / metadata (from the brief)
Every fact server-rendered as text (no text in images). `ProfilePage` + `Person` JSON-LD, sitemap, `llms.txt`, per-page OG images, favicon from `assets/avatar-favicon.svg`. WCAG 2.2 AA.

## Assets
- `assets/logo-mark-green.svg` — planet logo (Persimmon planet, dark ring, green moon). Light mode.
- `assets/logo-mark-dark.svg` — dark-mode variant (cream ring/outline, `#FF8A5B` planet, `#8FCB9C` moon).
- `assets/avatar-favicon.svg` — favicon.
- `assets/illos/illo-wave.png` (800×800) — home hero avatar, light and dark.
- `assets/illos/illo-busy.png` (700w) — /now.
- `assets/illos/illo-astronaut.png` (280×534) — 404. A ~600px-wide version would allow a larger display.
- `assets/illos/illo-confused.png` — Konami easter egg. Cut from a compressed sheet; replace with a clean transparent render when available.
Illustrations were AI-generated from Sean's photos (supplied by Sean). Convert to AVIF/WebP with `<picture>` and explicit width/height to hold CLS at 0. The Apple logo on the /now laptop may be worth regenerating as a plain lid.
- `reference/assets/*` — only needed to open the older reference mocks.
- Hobby photos: placeholders; Sean will supply.

## Open items for Sean
Draft copy (case-study reflections, context details, /uses, /now "Playing"), hobby photos, the EM résumé, hosting choice, and a cleaner "confused" illustration.
