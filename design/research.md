# Phase 1 Research: Personal CV Site

_Compiled 2026-09-25. Every site was checked live on that date. Sites marked † render only in WebGL/JS, so their descriptions come from secondhand write-ups._

**Direction chosen:**
- Warm and playful, with a bit of bold. Not experimental.
- IC and EM tracks get equal weight.
- Real content comes from the Career vault.
- Built with Astro.
- Visitors should leave smiling and think fondly of the site.

---

## 1. Sites worth studying

### Design engineers / frontend craft
| Site | What's notable | Idea to steal |
|---|---|---|
| [rauno.me](https://rauno.me) | Very little text. Opens with a 7-line manifesto and links to long essays. No resume. | Open with a short list of principles, so visitors see how you think. |
| [emilkowal.ski](https://emilkowal.ski) | One column: a "Today" line, 4 OSS projects, essays, newsletter. | A one-line "Today" status instead of a job-title headline. |
| [paco.me](https://paco.me) | Building / Projects / Writing / Now / Connect, plus ⌘K and Spotify embeds. | A "Now" section. Cheap to keep current and shows the site is alive. |
| [jakub.kr](https://jakub.kr) | Small polished tools (oklch.fyi, loading.dev) stand in for case studies. | Small single-purpose tools as proof of craft. |
| [joshwcomeau.com](https://joshwcomeau.com) | Categories, search, "Popular Content", sounds and springs, interactive demos. | A curated "start here" list rather than only a date-ordered feed. |
| [jhey.dev](https://jhey.dev) | Minimal intro with live weather, location and now-playing widgets. | One small live widget so the page feels like someone is home. |
| [antfu.me](https://antfu.me) | Projects grouped by ecosystem, talks, a generative-art side site. | Group projects to show how wide your impact goes. |
| [leerob.com](https://leerob.com) | Topic-indexed notes, a hand-painted collage footer, a dedicated [/cursor](https://leerob.com/cursor) retrospective page. | A retrospective page for each major role. |

### Engineering leaders
| Site | What's notable | Idea to steal |
|---|---|---|
| [sarah.dev](https://sarah.dev) | Frontend engineer turned exec. "I Make Things" headline, bio that walks up her career ladder. **Closest match to your profile.** | Show the career as a progression of scope. |
| [addyosmani.com](https://addyosmani.com) | Book covers, then a case-study logo wall (eBay, Netflix, YouTube perf work). | Logos tied to measurable case studies. |
| [lethain.com](https://lethain.com) | Books, then Popular posts, Tags, 15 years of archive. | A "Popular" index of your best thinking. |
| [larahogan.me](https://larahogan.me) | Resources sorted by manager problem (1:1s, hiring, feedback). | Organize leadership content by the problem it solves. |
| [noidea.dog](https://noidea.dog) | Staff-eng author, next to a nature blog and a train game. | Separate "work" and "human" channels on one site. |
| [randsinrepose.com](https://randsinrepose.com) | Explicit AI-use disclosure. | An honest statement of how AI was used. |
| [jim-nielsen.com](https://jim-nielsen.com) | Testimonials, HN hits and podcast appearances built in. | "What others say" instead of self-praise. |

### Experience-first / interactive resume
| Site | What's notable | Idea to steal |
|---|---|---|
| [brittanychiang.com](https://brittanychiang.com) | The reference layout: sticky left rail, job entries (dates, role, company, impact, tech chips), résumé PDF link, cursor spotlight, time-travel footer. | The job-entry format and PDF link. |
| [taniarascia.com](https://taniarascia.com) | Retro floppy logo. The timeline starts with "chef (2007–14)". | Own the non-linear path (Army → CS → consulting → director → staff). |
| [chanhdai.com](https://chanhdai.com) | Structured like a CV, backed by a public shadcn registry of 40+ components. | The site's own components are the evidence. |

### Bold, but still works as a CV
| Site | Visual signature | Idea to steal |
|---|---|---|
| [wodniack.dev](https://wodniack.dev) | Two colours (magenta on near-black), big type, binary texture. | A real "change contrast" toggle next to a scannable work grid. |
| [cydstumpel.nl](https://cydstumpel.nl) | Name animates as a stacked headline, role titles cycle, View Transitions. | Motion that loses nothing when switched off. |
| [olivierlarose.com](https://olivierlarose.com) | Huge split-letter name, magnetic buttons. | Work as a plain Project / Category / Client / Year table. |
| [corentinbernadou.com](https://corentinbernadou.com) | Magazine metaphor ("Issue N°003"), black/white plus one orange. | One strong metaphor plus one accent colour. |
| [p5aholic.me](https://p5aholic.me) | WebGL noise field behind stark text. | Light / Dark / Monospaced mode switch. |
| [lynnandtonic.com](https://lynnandtonic.com) | Redesigned yearly (v. XIX) around one CSS idea. | Keep the experiment in one interaction; content stays plain HTML. Versioned archive. |

### Experimental (reference only, not the direction)
[bruno-simon.com](https://bruno-simon.com) (3D driving game) · [henryheffernan.com](https://henryheffernan.com)† (3D room, the CV sits inside a retro PC) · [lhbzr.com](https://lhbzr.com)† (WebGL, good no-JS fallback) · [patrickheng.com](https://patrickheng.com)† · [guillaumecolombel.fr](https://guillaumecolombel.fr)† · [aristidebenoist.com](https://aristidebenoist.com)†

**Checked and dropped:**
- cassie.codes: now a farewell page.
- charity.wtf: now a bare Substack page.
- Generic "best portfolios 2026" roundups: mostly junior sites and templates.

---

## 2. What hiring managers want

**Time budget:** about 15 seconds for the first skim, 30–90 seconds if the page holds interest. Frontend recruiters click through to portfolio sites often, which works in your favour.

**What to show at Staff/Principal level:**
- Breadth of what you own and how far your decisions travel: cross-org migrations, platforms, standards adopted by N teams.
- Which [Staff archetype](https://staffeng.com/guides/staff-archetypes/) you are.
- Written artefacts: ADRs, RFCs, docs.

**What to show for EM readiness:**
- Team size and growth, hiring (0 → 8), retention.
- Process wins (1:1 cadence <50% → 100%).
- Delivery (100% on-schedule).

**Serving both tracks on one site:**
- Present one identity: *a technical leader who multiplies frontend teams*.
- Tag each case study with the dimensions it shows: Technical strategy / People / Delivery / Craft.
- Add a short "How I lead" section covering both.
- Offer two résumé PDFs (Staff IC and EM).
- State plainly what shape of role you want.

**Above the fold:**
- Name
- Positioning line
- 2–3 proof points with numbers
- Availability, target roles, timezone
- Buttons: Résumé / Email / LinkedIn

**Headline formula:** [Level/role] + [domain] + [leverage] + [proof].

**Case-study format:**
1. Context
2. Role and scope
3. Key decisions and trade-offs
4. How you brought people along
5. Outcome metrics
6. What you'd change

**Common mistakes:**
- Stale content, including an old PDF.
- Generic template or AI look. Bento grid plus dark gradient plus "strategic thinker" copy now reads as AI output.
- Heavy animation or slow loads. This hurts twice for a frontend candidate.
- Feature lists instead of scope.
- Skill bars.

**AI era (2026):**
- Recruiters use AI tools (e.g. Perplexity) to build candidate dossiers. That means server-rendered semantic HTML, plain-text facts, and Person/ProfilePage JSON-LD with `sameAs`.
- llms.txt costs little but has no proven payoff.
- Show **AI judgment** (guardrails, review norms, measured effects) rather than just AI use. Your skills program and docs pipeline fit this exactly.
- A specific first-person voice now carries more signal because it's scarce. This is where your humour helps.

**Recommended section order:**
1. Hero
2. Selected impact (3–4 case studies)
3. How I lead
4. Experience timeline
5. Writing and artefacts
6. Skills (grouped, no bars)
7. About
8. Contact and résumé
9. Hidden metadata: JSON-LD, sitemap, OG image, llms.txt

Sources: [profy.dev survey](https://profy.dev/article/portfolio-websites-survey) · [techinterview.org](https://www.techinterview.org/post/3233474627/personal-website-portfolio-engineers/) · [StaffEng promo packets](https://staffeng.com/guides/promo-packets/) · [lethain: interviewing Staff+](https://lethain.com/interviewing-staff-plus-roles/) · [HN thread](https://news.ycombinator.com/item?id=41656015) · [Google ProfilePage docs](https://developers.google.com/search/docs/appearance/structured-data/profile-page)

---

## 3. UX patterns

### Top 10 to use (ranked)
1. **Print stylesheet and auto-generated PDF from one JSON Resume source.** Ctrl+P gives a clean 1–2 page résumé, and CI renders the PDF so it never goes stale.
2. **Case-study pages** (Problem → Approach → Impact → Lessons) with honest metric callouts.
3. **Hybrid structure:** a skimmable one-page CV with a sticky section nav and skip link, plus deep-dive pages.
4. **Lighthouse 100s and a colophon** that states the performance budget.
5. **Light / Dark / System theme** with no flash, using `light-dark()` tokens. The theme switch uses a View Transition circular reveal from the toggle.
6. **Cross-document View Transitions** that morph a card into the case-study header (progressive enhancement).
7. **Expandable role cards** built on `<details>` + `interpolate-size`, with tag filtering instead of skill bars.
8. **⌘K palette with real actions** (copy email, PDF, theme, jump to section) and a visible trigger button.
9. **Copy-email button** with a "Copied" state, ProfilePage JSON-LD, generated OG images.
10. **One small live touch plus /now and /uses.** For example, local time in Texas or now-playing.

### Avoid
- Skill bars.
- Custom cursors and scroll-jacking.
- 3D, game or terminal-only UIs with no fallback.
- Hit counters and guestbooks (dated).
- Animating everything. One or two signature motions are enough.

### Platform notes (Sept 2026)
- **View Transitions:** same-document is Baseline. Cross-document works in Chromium and Safari 18.2+; Firefox is part of Interop 2026.
- **Scroll-driven animations:** Chrome and Safari 26+, Firefox not yet. Treat as enhancement only.
- **Other features that are safe to use:** `linear()` springs, `@starting-style`, anchor positioning.
- **GSAP:** fully free, including SplitText and ScrollTrigger.
- **Motion:** motion.dev, formerly Framer Motion.

### Accessibility and performance baseline
- **Lighthouse and Core Web Vitals:** 100 across the board, LCP < 1.5 s, CLS ≈ 0, INP < 200 ms, about 100 KB of JS or less.
- **Semantic markup:** landmarks, a single h1, `<time datetime>`, a skip link.
- **Focus:** branded `:focus-visible` rings.
- **Contrast:** AA in every theme and accent colour.
- **Fonts:** self-hosted variable WOFF2 with a `size-adjust` fallback.
- **Motion:** respect `prefers-reduced-motion`, plus an in-site motion toggle.

### Delight: still good vs dated
- **Still good:**
  - Local time or now-playing widgets.
  - A Konami code (cheap and harmless).
  - A `/terminal` mode offered as an option, never the only way in.
  - An archive of past site versions.
- **Dated:**
  - Guestbooks (leerob removed his).
  - Hit counters.

---

## 4. Warm and funny sites

All checked live on 2026-09-25. Quotes were confirmed against the page source.

| Site | Where the humour lives | Idea to borrow |
|---|---|---|
| [jason.energy](https://jason.energy) | Bio length switcher ("Shorter-er … Longer-er"). Self-mocking photo captions. Footer: "I'm nicer than I look, I swear." | **Bio length toggle.** Recruiters get the short version, curious readers get the funny long one. Best fit for a CV site. |
| [joshwcomeau.com](https://joshwcomeau.com) | Sounds you can switch off, a confetti Like button, "boop" hovers, a synth easter egg, a flashlight-cursor 404. | Restraint: not everything should make a sound. Turn the 404 into a small bit of play. |
| [jackmcdade.com](https://jackmcdade.com) | "The often imitated, never duplicated, Jack McDade." Costume photos. Footer: "© 1983". | Mock-grandiose boasting. Birth-year copyright. |
| [lynnandtonic.com](https://lynnandtonic.com) | "v. XIX" in the footer. Very specific likes ("pop punk, Diet Dr. Pepper, musicals"). A wistful 404. | Version number in the footer. Specific likes beat a generic hobbies list. |
| [jessicahische.is](https://jessicahische.is) | URL slugs as sentences (/anoversharer). "Blessedly infrequent mailings." | Jokes in the URL slugs. |
| [chriscoyier.net](https://chriscoyier.net) | Captions on childhood photos ("I didn't really turn out to be a robe guy"). | Captioned old photos. |
| [wesbos.com](https://wesbos.com) | "CSS, JavaScript, mediocre jokes." A broken widget apologises in character. | Error states written in your own voice. |
| [sarah.dev](https://sarah.dev) | Distinguished Engineer bio, then "She likes cheese." | **One absurd line after a serious bio.** The best template at leadership level. |
| [noidea.dog](https://noidea.dog) | Deadpan project blurbs. | Proof that a Staff-level voice can be dry and funny. |
| [heydonworks.com](https://heydonworks.com) | Footer: "This website will not… × Track you × Drain your battery × Tell you fibs." | An anti-feature list that also signals craft values. |
| [nerdy.dev](https://nerdy.dev) | 404: "/your-path wandered off", with a glitch effect gated by reduced-motion. | Use the visitor's actual URL in the 404 joke. |
| [bryanbraun.com](https://bryanbraun.com) | `console.log("Greetings traveler…")`. | A console message for engineers who inspect the site. |

Humour reference that isn't a portfolio: [neal.fun](https://neal.fun).

### Guardrails for Staff and EM credibility
1. **Keep jokes out of the facts.** Titles, dates, scope and metrics stay literal. Humour sits next to the credentials.
2. **Put humour in the margins:** captions, the footer, 404, console, alt text, URL slugs. Keep it out of the first 5 seconds of the CV block.
3. **One joke per section, at most.**
4. **Only joke about yourself.** Never about past employers, teammates or reports. Self-mockery reads as secure; mocking "the team" reads as a red flag in an EM.
5. **Offer a straight path.** A "Just the facts" or short-bio toggle, and a résumé PDF that is 100% serious.
6. **Make delight opt-in and accessible.** Sound muted by default, reduced motion respected, alt text still descriptive.
7. **No edgy language or profanity.**
8. **Humour is evidence for EM roles.** Warmth plus good judgement about when to be serious signals psychological safety.

Sources: [Josh Comeau: whimsical animations](https://www.joshwcomeau.com/blog/whimsical-animations/) · [Bryan Braun: ways to hide easter eggs](https://www.bryanbraun.com/2018/04/01/several-ways-to-hide-easter-eggs-on-your-website/)
