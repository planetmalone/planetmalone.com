# Handoff: Planet Malone, next pass

Brief for picking up work on planetmalone.com in a fresh session. Read `CLAUDE.md` first; it has the project conventions. Everything below is current as of 2026-10-26, with the working tree fully committed.

## Where things stand

The build plan (`docs/build-plan.md`) is complete, and the site is deployed to Cloudflare Workers (https://planetmalone-com.toseanmalone.workers.dev/). The work now is a "de-AI" pass: making the site read as Sean's rather than as a templated portfolio. Done so far:

- **Brand:** the "Mission Control" theme. Big Shoulders Display, Space Mono labels and Atkinson Hyperlegible Next. Deep-space navies, a Persimmon accent and aurora mint. The light-mode page is a muted "moon dust" gray-blue, `#e9ecf4`.
- **Hero:** a full-screen starfield with drift and mouse parallax, and a mission-control status readout including Planet Malone's local time. A curved planet horizon sits at the bottom; in light mode it brightens from night to the page color as you scroll. The stat strip and contact buttons are gone.
- **Header:** clear over the hero, then glassmorphism once the horizon has passed under it. `src/components/home/pmHorizon.ts` sets the `overHero` store and the header subscribes to it.
- **Experience:** a vertical, swinging dashed path with one hand-drawn planet per role, oldest first, and UT Dallas as a satellite. The rocket flies to the planet nearest the middle of the screen and turns around when you scroll up. The code is `Experience.astro` and `pmExperience.ts`.
- **Hand-drawn touches:** a bearded dragon pops up over the census card (`Dragon`), the census card has a sketched frame, and the case cards have a hand-drawn arrow (`Doodle`).
- **Removed:** the side nav, the bio switcher (only the long bio remains), the old horizontal flight path, and the hero's stat strip and buttons.
- **Contact:** Sean's waving illustration sits in the "Say hello" card.

## Task 1: cut the remaining kit tells (start here)

The goal is less "component kit", more Mission Control signage. Suggested order:

1. **Pills and corners.** Buttons, chips, the toast and the segmented control are all `rounded-pill`, and the cards share large uniform radii. Try squarer, signage-like shapes (about 4 to 8px), and vary the radii by role instead of using one everywhere. Tokens live in `src/styles/theme.css` (`--radius-*`).
2. **Stat cards.** These are the dark cards with big mint numbers: `StatCard`, used on case-study Outcomes and the Colophon budgets. Keep them only where a number really earns it, and restyle the rest, perhaps as a telemetry readout in Space Mono.
3. **Eyebrows.** These are uppercase, letter-spaced labels: `Eyebrow`, used in How I lead, the census card, case studies, the 404 and the palette. Cut some and make the rest less uniform.
4. **Case cards.** The tag chips, dashed rule and "Read →" make the standard card shape (`CaseCard`).
5. **Ruled label/value lists** on Now and the Colophon (`RuledList`).
6. **The header's ⌘K "Search or do a thing" pill.**

## Task 2: stock jokes (Sean writes these; don't invent copy)

Flag these to Sean and offer options only if he asks:

- "Say hello." with the colored period (`Contact.astro`)
- "This site will not: × track you ×…" (`Footer.astro`)
- "by a human, with coffee" (`Footer.astro`)
- "AI-assisted engineering, done responsibly" (a case-study title)
- "Search or do a thing" (`Header.astro`)

## Waiting on Sean

- **Company logos:** files go in `src/assets/logos/<id>.svg|png|webp`. The ids are `us-army`, `epic-solutions`, `ut-dallas`, `infor`, `projekt202`, `redibs`, `stellar-elements`, `apollo`, `redteam` and `aspira`. `Experience.astro` picks them up automatically, 28px tall, next to the company name.
- **Hobby photos:** add a `photo:` field per hobby in `src/content/about.yaml`, as a path relative to that file. Each one covers a fixed 4:3 frame.
- **Résumé PDFs:** `public/resume-staff.pdf` and `public/resume-em.pdf`, from his résumé skill.
- **Draft copy:** the four case studies, plus Now, Uses, Built and the Colophon (the `draft` fields).
- **Open question:** should the OG image (`src/pages/og/[slug].png.ts`) drop the three proof stats, matching "my website, not a résumé"?
- **Open question:** the Army stop's description repeats its title and dates. Should it be hidden there, or shortened to "Honorable discharge"?
- **Before launch:** the custom domain plus the `www` redirect, a screen-reader spot check, and Lighthouse against production.

## How Sean works

- **Commits:** never commit or push. Stop after each chunk of work so he can review and commit himself.
- **Questions:** asking a question ends the turn. Don't build in the same turn you ask for confirmation. If you're confident, state what you're doing instead of asking.
- **Experimenting:** while he's iterating on visuals, make the change, screenshot it to confirm and report. Don't run lint, tests or Lighthouse each time. Run the full suite once he settles on a direction or asks.
- **Dev server:** his server runs on :4321. Never stop it. For production checks, run your own preview with `npx astro preview --port 4328 --host 127.0.0.1 --ignore-lock` and kill only that one.
- **Installs:** warn before any npm install, because it breaks his running dev server. He'll restart it with `npx astro dev --force`.
- **Comments:** lean. Comment the why, never per-prop or per-class-group.
- **Content:** every fact must trace to his Career vault. Never invent claims or metrics. A fact missing from the vault isn't necessarily false, so flag it and ask.

## Checks (when he asks for the full suite)

Run `. ~/.nvm/nvm.sh` first in non-interactive shells.

- `npm run lint`: Prettier, `astro check` and `tsc` for the tests.
- `npm run build`
- `npx playwright test`: 56 tests, all currently passing.
- `npm run lhci`: currently 100/100/100/100 on all pages, CLS 0, TBT 0.

## Gotchas learned the hard way

- **Prettier reflows Astro markup.** Re-read a file before editing it, because string-match edits against old formatting silently miss.
- **The starfield's drift breaks cross-page view transitions in Chrome.** Its endless drift animation made Chrome drop transitions about 40% of the time. `PageTransitions.astro` sets `data-leaving` on `pageswap` to stop it, and `base.css` holds the matching rule. Keep that if you touch the starfield or the transitions.
- **The back link and the title morph.** "Back to Planet Malone" goes to `/#impact`, and `PageTransitions` jumps there instantly in `pagereveal`, so the case title morphs into an on-screen card. Headless Chrome won't play that morph on a home → case → home round trip, but real browsers do.
- **The `overHero` store starts `undefined`.** That way the first horizon report always reaches the header, even on a refresh partway down the page.
- **Light-mode contrast is tight.** On the darker page, light-mode text colors need checking, which is why the accent and green were deepened to `#a53a15` and `#10694c`. The axe tests in `tests/a11y.spec.ts` cover both themes.
- **Theme tokens.** Defaults are cleared, so only spec tokens exist. Global rules Tailwind can't express go in `base.css`, and there are no component `<style>` blocks.
