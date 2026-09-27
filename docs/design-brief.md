# Design Brief: planetmalone (Sean Malone's CV site)

> Paste this into Claude Design. Supporting research: `docs/research.md`.
> Every fact below comes from Sean's Career vault. Lines marked ✏️ are draft copy for Sean to rewrite in his own voice.

---

## 1. The one-paragraph brief

Design a personal CV website for **Sean Malone**, a frontend engineer and engineering leader with 18+ years of experience. It should work equally well for **Staff/Principal Frontend Engineer** and **frontend-leaning Engineering Manager** roles. The personality is **warm and playful with one bold element**: humour is a big part of who Sean is, and a visitor should leave smiling and think fondly of the visit. It must still work as a serious CV. A recruiter should understand who Sean is, what level he works at and how to reach him within 15 seconds. A frontend hiring manager should find the craft impeccable: fast, accessible and polished. **Not experimental**: no 3D, no games, no scroll-jacking.

## 2. Audience and jobs to be done

| Visitor | What they need | Time they'll spend |
|---|---|---|
| Recruiter / sourcer | Name, level, target roles, location and timezone, résumé PDF, contact | 15 seconds |
| Hiring manager (Staff track) | Scope, technical strategy, design-system and platform depth, writing | 2–5 minutes, case studies |
| Hiring manager (EM track) | Teams led, hiring, people process, delivery record | 2–5 minutes, case studies plus "How I lead" |
| Fellow engineer | Craft: interactions, performance, accessibility, "how this was built" | They'll open DevTools |
| AI screeners (Perplexity etc.) | Plain-text facts in semantic HTML | Seconds |

**One story for both tracks:** *a technical leader who multiplies frontend teams, having done it from both chairs.* Each case study is tagged with the dimensions it shows (**Strategy · People · Delivery · Craft**) instead of splitting the site into IC and EM halves.

## 3. Personality and tone

- **Warm and playful:** friendly, self-aware, a bit goofy in the margins. Think Josh Comeau's warmth and Tania Rascia's honesty about a non-linear path.
- **One bold element:** pick one oversized display-type treatment **or** one saturated signature accent colour. Not both at full volume. References: [corentinbernadou.com](https://corentinbernadou.com) (one metaphor plus one accent), [olivierlarose.com](https://olivierlarose.com) (big name, very plain work table), [cydstumpel.nl](https://cydstumpel.nl) (animated name that still reads fine without motion).
- **Where humour goes:**
  - Microcopy, hover states, empty and error states (404), the footer, alt text, console messages, easter eggs, URL slugs, the About section, and a few asides in role descriptions.
- **Where it stays straight:**
  - Metrics, impact statements and case-study outcomes.
  - The hero proof points.
  - Anything a recruiter copies into a req.
  - The résumé PDF.
  - The joke never lands on the work itself.
- **Humour rules:**
  - At most one joke per section.
  - Jokes are only ever at Sean's own expense. Never about employers, teammates or reports.
  - No profanity.
  - The model is a serious bio followed by one absurd line, as in [sarah.dev](https://sarah.dev)'s "She likes cheese."
- **Signature humour device (recommended):**
  - A **bio length switcher**, like [jason.energy](https://jason.energy): "Just the facts / Short / Long / Way too long" ✏️.
  - The default is short and straight, for recruiters. The longer settings get progressively funnier.
  - Doubles as the site's "recruiter mode".
- **Signature theme (confirmed): "Planet Malone."** The site lives at **planetmalone.com**, and the name is the site's single metaphor. Do it in 2D with a light touch: no 3D, no starfield wallpaper. Examples:
  - "Local time on Planet Malone" (Central Time) as the live widget.
  - A "Population" line that counts the family and pets ✏️.
  - A tiny orbiting planet as the logo or theme toggle.
  - A 404 page that reads "lost in space".
  - A footer that reads "Thanks for visiting Planet Malone."
- **Illustrated avatar (confirmed):**
  - Sean appears as an illustrated character, not a photo.
  - It should work at hero size and as a small favicon or OG mark.
  - Expressive variants carry the humour: a default wave, a 404 "lost in space" version (astronaut helmet?), a sleepy dark-mode version, and an easter-egg version.
  - It must not look like generic AI art.

## 4. Information architecture

The home page is a **single scrolling CV with a sticky section nav**, plus separate **case-study pages**.

1. **Hero:** illustrated avatar, name, positioning line, three proof points, availability badge (shown publicly; can be switched off later), location and timezone, buttons for Résumé (Staff / EM), Copy email and LinkedIn. A small live "local time" widget.
2. **Selected impact:** 4 case-study cards, each tagged Strategy / People / Delivery / Craft, each opening its own page.
3. **How I lead:** a short two-column section, "As an IC leader" / "As a manager", with 3 principles each.
4. **Experience:** timeline of expandable role cards (dates, title, company, one-line scope, 2–3 wins, tech chips). The non-linear path is shown with pride: Army → CS degree → consulting → director → back to Staff IC.
5. **Things I've built / written:** open-source work, ADRs, docs site, Storybook, talks or posts later.
6. **Skills:** grouped by context ("Shipped in production", "Led teams using", "Currently exploring"). **No skill bars.**
7. **About:** the bio-length switcher, Habitat for Humanity volunteering, and personal touches limited to **hobbies, family and pets**. No other personal details.
8. **Contact:** email (copy button), LinkedIn, GitHub, two dated PDF résumés.
9. **Footer:** a "Built with…" colophon link, theme and motion toggles, a joke.

Secondary pages (lower priority): **/now** (dated), **/uses**, **/colophon** (stack, fonts, Lighthouse scores), **404**.

## 5. Real content

### Identity
- **Name:** Sean Malone (he/him)
- **Location:** Dallas–Fort Worth, TX · Remote · Central Time (UTC−6/−5)
- **Site:** planetmalone.com · **Email:** sean@planetmalone.com
- **Links:** github.com/planetmalone · linkedin.com/in/malonesean
- **Currently:** Staff Frontend Engineer at Aspira (Sep 2025 – present)

### Hero
- **Positioning line (draft):** "Frontend engineer and engineering leader. I build design systems and frontend platforms that let whole teams ship faster, and I've done it from both the IC chair and the manager's chair." ✏️
- **Alternative (draft):** "Technology leader and frontend expert. 18 years in, still excited about a well-named CSS variable." ✏️
- **Proof points:**
  - **18+ years** in tech
  - **Teams up to 50+** people led
  - **4 design systems** built, 2 design-system teams managed
- **Target roles:** Staff / Principal Frontend Engineer · Frontend Engineering Manager · Remote

### Case studies (pick 4; the 5th is an alternate)
1. **NextGen design system & React Aria migration** (Aspira, 2025–26). *Strategy · Craft*
   - Authored the Figma design system: tokens, oklch palette, full React Aria component set.
   - Made the case to move from shadcn/Radix to React Aria Components, then led the migration inside a six-engineer epic.
   - Established the rule that design handoffs must match the design system.
   - The team lead called Sean the "guardian of quality, consistency and sustainability".
2. **AI-assisted engineering, done responsibly** (Aspira, 2026). *Strategy · People*
   - Started the team's AI agent-skills program: 11 of 22 skills, each grounded in a codebase audit and checked with fresh-agent runs.
   - The skills are used by ~20 engineers, and the backend team is adopting the approach.
   - Built an AI documentation pipeline that updates weekly and is published only after a human reviews the PR.
   - **Framing:** AI speeds things up, but Sean reviews every line.
3. **Micro-frontend platform for 5 teams** (RedTeam, 2024–25). *Strategy · Delivery*
   - Remix/SSR, a backend-for-frontend (BFF) on AWS, used by 50+ engineers.
   - Page loads went from 5–6 s to near-instant.
   - Builds went from 30+ min to under 5 min.
   - Frontend end-to-end test coverage went from 0% to 80%+ across 7 apps.
   - Member of the Architecture Committee.
4. **Running a 50-person practice without leaving the code** (Stellar Elements, 2021–23). *People · Delivery*
   - Directed a 50+ person app-dev practice through 6 managers.
   - 1:1 cadence rose from under 50% to 100%.
   - Stayed hands-on: personally built US Bank's design systems.
5. *(Alternate)* **FedEx Office unified commerce** (projekt202, 2018–20). *Strategy · Delivery*
   - Angular micro-frontend architecture delivered by 11 teams and 100+ engineers under Sean's technical direction.
   - Piloted in 5 stores, then rolled out company-wide.
   - Also: 100% on-schedule record as Managing Architect.

**Case-study page template:**
1. Context
2. My role and scope
3. Key decisions and trade-offs
4. How I brought people along
5. Outcomes (metric callouts)
6. What I'd do differently

### Experience timeline
| Dates | Role | Company | One-line scope |
|---|---|---|---|
| 2025 – now | Staff Frontend Engineer | Aspira | Owns the design system and accessibility for NextGen, a ground-up platform rebuild; leads the AI-assisted engineering program |
| 2024 – 25 | Senior Engineering Architect / Principal FE | RedTeam | Micro-frontend platform for 5 teams; Architecture Committee |
| 2023 – 24 | Senior SWE, Lead of the Artemis design system | Apollo.io | 45 components migrated; data grid ~300% faster |
| 2021 – 23 | Technology Practice Director | Stellar Elements | 50+ person practice, 6 managers, 4+ enterprise clients |
| 2020 – 21 | Principal Frontend Architect | Redibs | Built the team from 0 to 8; Next.js web plus 2 React Native apps; load time from 7 s to under 1 s |
| 2015 – 20 | Senior Dev → Solutions Architect → Managing/Principal Architect | projekt202 | FedEx Office, Cox Automotive (Dealertrack), ExamSoft |
| 2013 – 15 | UI/JavaScript Developer, Lead | Infor (PeopleAnswers) | Brought the frontend in-house and led the new FE team |
| 2011 – 13 | Developer | Epic Solutions | Client web apps while finishing a CS degree |
| 2003 – 11 | U.S. Army | | Honorable discharge |

*Education:* B.S. Computer Science, UT Dallas, 2013. 4.0 GPA, Summa Cum Laude.
*Volunteer:* Dallas Area Habitat for Humanity, 2014 – present (has framed two homes).

### Skills (grouped, no bars)
- **Shipped in production:**
  - TypeScript, React (19), Next.js, Remix
  - React Aria, Tailwind, GraphQL, Nx
  - Storybook, Playwright, Vitest
  - AWS, GitHub Actions
- **Led teams using:**
  - Design systems and tokens, micro-frontends, SSR/SSG, WCAG 2.2 AA
  - CI/CD and developer experience (DX), OKRs, hiring, 1:1 and career frameworks
- **Currently exploring:** Claude Code agent skills, multi-model verification, AI docs pipelines

## 6. Visual and interaction direction

- **Layout:**
  - Single column, typographic and generous, with a sticky section nav (desktop left rail, like [brittanychiang.com](https://brittanychiang.com); a compact top bar on mobile).
  - Bento grid only if it earns its place, and at most one.
- **Type:**
  - One characterful display face for the name and headings (the "bold").
  - One highly readable text face.
  - Tabular numerals for metrics.
- **Colour:**
  - Warm neutrals plus one signature accent.
  - Must pass AA contrast in both light and dark themes.
  - Optionally 4–6 curated accent swatches as a small playful setting.
- **Signature motion (pick 1–2):**
  - The theme toggle does a circular reveal from the button.
  - Case-study cards morph into the page header (View Transition).
  - Everything else stays subtle.
  - All motion has a reduced-motion version.
- **Delight inventory (choose what fits):**
  - A copy-email button that says something cheeky on success ✏️.
  - A ⌘K command palette with real actions: jump to section, copy email, download PDF, toggle theme, and one silly command.
  - A Konami-code easter egg.
  - A `console.log` greeting for engineers who open DevTools, aimed at both tracks, e.g. "Reading my source? We should talk. I also do 1:1s." ✏️ ([bryanbraun.com](https://bryanbraun.com)).
  - A 404 that uses the visitor's actual bad URL in the joke ([nerdy.dev](https://nerdy.dev)).
  - An anti-feature list in the footer: "This site will not × track you × drain your battery × …" ([heydonworks.com](https://heydonworks.com)).
  - A version number in the footer ("v. 1.0"), leaving room for yearly redesigns ([lynnandtonic.com](https://lynnandtonic.com)).
  - Captioned family and pet photos (or illustrations) in About ✏️ ([chriscoyier.net](https://chriscoyier.net)).
  - A print view that adds a short note at the bottom ✏️.
  - A "last updated" stamp with personality.
  - Optional sound effects, muted by default with a visible toggle ([joshwcomeau.com](https://joshwcomeau.com)).
- **Print:** Ctrl+P on the home page must produce a clean 1–2 page résumé: light theme, no nav, all role cards expanded.

## 7. Screens to design

0. Illustrated avatar and its variants (default, 404 astronaut, dark mode, easter egg), plus the Planet Malone logo mark
1. Home, desktop, light theme (full scroll)
2. Home, mobile, dark theme
3. Case-study page, desktop
4. Role card: collapsed and expanded states
5. ⌘K command palette open
6. Theme toggle / accent picker states
7. 404 page
8. Print / PDF résumé view
9. Open Graph share image (1200×630)

## 8. Constraints for implementation (Phase 3: Astro)

- Static-first Astro, with small interactive islands only where needed. Target ~100 KB of JS or less.
- Lighthouse 100 in all four categories. LCP < 1.5 s. No layout shift.
- WCAG 2.2 AA:
  - Visible branded focus rings.
  - Everything works with the keyboard.
  - Honour `prefers-reduced-motion`, and add an in-site motion toggle.
- Light / Dark / System theming with no flash on load.
- Self-hosted variable fonts (keep to 2 families).
- Content lives in Markdown / JSON (one résumé source generates the page, the print view and the PDF).
- Server-rendered text for every fact (for SEO and AI screeners), plus ProfilePage/Person JSON-LD.

## 9. Avoid

- Skill bars, percentages, logo clouds of frameworks.
- Custom cursors, scroll-jacking, splash loaders, per-word text reveals everywhere.
- The generic "AI portfolio" look: dark gradient plus bento plus "strategic thinker" copy.
- Jokes that undercut credibility, or humour inside metrics.
- Positioning Sean as a designer. He's an engineer who cares about design.
- Client names for Aspira work, and colleagues' names (roles only).
- Military rank or specialty. The line is exactly "U.S. Army · 2003–2011 · Honorable discharge".

## 10. Decisions (confirmed by Sean, 2026-09-25)

- **Theme:** Planet Malone, on the domain planetmalone.com.
- **Availability badge:** shown publicly.
- **About:** hobbies, family and pets only.
- **Avatar:** illustrated, not a photo.
- **Contact email:** sean@planetmalone.com.

## 11. Still to fill in (Sean)

- The actual hobbies, family and pet details for About and the "Population" gag.
- Avatar style preference (flat vector, hand-drawn, pixel, etc.) and a reference photo if Claude Design will draw it.
- Writing and talks to link, if any. Otherwise the Writing section starts with ADRs, the docs site and Storybook.
