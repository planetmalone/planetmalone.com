# Next session brief

Read `CLAUDE.md` first. This replaces the stale parts of `docs/handoff.md`; that file's "How Sean works", "Checks" and "Gotchas" sections still apply. Delete both files when the de-AI pass is done. State as of 2026-11-16 (end of day): lint clean, Playwright 53/53 on a fresh build, everything committed and pushed to `origin/main`.

## What got done

- **Task 1 (kit tells):** radii squarer by role (`--radius-control` 6px, `--radius-chip` 3px, pill only on the Switch); case-card tag chips removed. Sean rejected the stat-card, eyebrow, ruled-list and ⌘K-pill changes, so those are unchanged. The Now page was dropped entirely (`/now` redirects to `/`).
- **Task 2 (stock jokes):** done. "Let's chat." (reply-time line removed); footer "will not" list removed; footer reads "Last updated Sep 2026, by a human, with caffeine"; footer link "My daily drivers" (nav, tab title and H1 still say "Uses", by choice); ⌘K button reads "Search"; the AI case-study title is kept.
- **Housekeeping:** Army stop reads "Honorable discharge"; OG image no longer shows the proof stats (`profile.proof` removed); unused `RuledList` size and `illo-busy.png` removed; `public/resume-staff.pdf` and `public/resume-em.pdf` are in (no phone, sean@planetmalone.com).
- **AI case study (`src/content/cases/ai-assisted-engineering.yaml`) is finished:** Sean wrote the Context (three paragraphs, ending on the quote "AI is an accelerator, but every line still gets a human review."), the Agent skills and Concept-based reviews topics under "How I brought people along", and chose two decision cards (Audit first, Review differently, neither outlined). It has no draft boxes and no reflection section.
- **Template changes made along the way (`src/pages/work/[slug].astro`, `src/content.config.ts`):** context and people text split on blank lines into paragraphs; `people.topics` (heading, text, optional draft) renders sub-headings; `reflection` is optional and its section, plus its "On this page" entry, is hidden when empty.

## Next: the other three case studies

Same process as the AI one, one box at a time, Sean writes the copy and I pull vault facts, show the prompt and the missing parts, and then put his text in. Do not invent copy. Draft boxes left: `micro-frontend-platform` (4), `fifty-person-practice` (4), `nextgen-design-system` (3). Each also has a reflection placeholder; for the AI case Sean had nothing to say and the section was removed, so ask before keeping or hiding each one.

What Sean learned about the cards (applies to all three): the "Key decisions and trade-offs" section takes exactly two cards, each its own decision with a label, a title and a body, and `chosen: true` only adds an ink border. Don't read "before vs. chosen" literally; only the design-system case is a true before/after. A card needs a reason, not necessarily a trade-off. Don't highlight one when the two aren't competing.

## Still waiting on Sean (not for me to write)

1. Case-study copy for the three cases above.
2. Custom domain: planetmalone.com plus the `www` redirect on Cloudflare (his dashboard step). The résumé PDFs and Contact already point at it, so don't announce the site before it's live.
3. Company logos in `src/assets/logos/<id>.svg|png|webp`: `us-army`, `epic-solutions`, `ut-dallas`, `infor`, `projekt202`, `redibs`, `stellar-elements`, `apollo`, `redteam`, `aspira`.
4. Hobby photos: a `photo:` path per hobby in `src/content/about.yaml` (4:3 frame).
5. Uses, Built and Colophon: the `draft` entries in `uses.yaml`, the Built page and `colophon.yaml`.

## Career Hub (Notion) follow-up, needs Sean's approval

I ran `/career-ingest` for tonight's new facts. Done so far: the raw statements are saved as a Sources row, "AI skills program story and Concept-Based Reviews (2026-11-16)". Not yet applied, because the skill requires Sean to approve a change list first. Proposed changes:
- **Projects: new row "Concept-Based Reviews".** Problem (diffs list files arbitrarily and grow with AI), the idea (diff regrouped by concept; every line still reviewed), the skill, the one measurement (about 1,000 lines, 20-30 min to about 5; Sean's own), adoption (about half the team after about two weeks, more joining; introduced around Nov 2). Mark the measurement and "reviewer understanding increases vastly" as Sean's own, unmeasured.
- **Projects: AI Agent Skills Program.** Add the origin (Sean raised shared skills in the weekly Frontend Discussion, the team decided the skills, Sean led a small group, then announced it), the skill-writer testing flow (three models, results evaluated), and the back story (standards drift, complacency about reviews). Resolve the open question "assigned or self-initiated" as self-initiated. Keep the existing facts: 22 skills, Sean wrote 11, used by every engineer on the platform (about 20). The "adoption metrics" gap remains, with unmeasured qualitative claims noted.
- **Experience: Aspira Connect.** Add the concept-based reviews bullet and the skills-program origin to the bullet bank; add a line to *Bodies of work*.
- **Conflict to ask about:** none found, but Jira shows a frontend peer created most of the epic's tickets. That fits "I led a small group" and the Tailoring Guide's team-effort rule, so the wording stays "kicked off and led", never "single-handedly".
- Also update the README index (Projects and Sources lists).

## Before launch

Screen-reader spot check, Lighthouse against production (last known 100/100/100/100), open both résumé PDFs to check them, and `npm run lint` after any further changes.

## Housekeeping

- Delete `docs/handoff.md` and this file when finished.
- The Career source of truth is the Notion Career Hub now; the Obsidian vault is the older copy.
- The home-card morph Playwright test is occasionally flaky in headless Chrome, as the handoff warns. Rerun before treating it as a failure.
