## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project conventions

- Spec: `design/README.md` (Claude Design handoff) and `docs/build-plan.md`. The Prototype in `design/` wins over the reference mocks, except for print (Pages 1c) and the OG image (Components 1d).
- Write all copy, comments and labels in **American English** (color, center, behavior), even where the design files use British spelling.
- No UI framework: islands are plain TypeScript `<script>`s in Astro components. Never use React Aria.
- Cut from the spec: the Konami code, the "Don't click this" link, and the ⌘K "Take me somewhere new" command.
- Styling: Tailwind v4. Tokens live in `src/styles/theme.css` (defaults cleared, so only spec values exist); global rules Tailwind can't express go in `src/styles/base.css`. No component `<style>` blocks.
- File names: PascalCase for components (`Switch.astro`), camelCase for every other source file (`pmSwitch.ts`, `viewTransition.ts`). Custom element tag names stay hyphenated (`<pm-switch>`), because the HTML spec requires a hyphen.
- Repeated UI becomes an Astro component once it has a second use.
- Interactive components use a custom element for behavior, as a sibling of the Astro component: `src/components/Switch/{Switch.astro, pmSwitch.ts, index.ts}`. The component's own `<script>` imports the element module to register it.
- A component's `index.ts` re-exports the Astro component and the element's **type only** (`export type { PmSwitch }`). The element class extends `HTMLElement`, which doesn't exist on the server, so the barrel must never load it at runtime.
- Element state that other scripts set lives in **attributes** (like `checked` on `<pm-switch>`), with properties reflecting them. Attributes work before an element is defined, so consumers never wait on script order or use `whenDefined`.
- State shared between components lives in **Nano Stores** in `src/stores/` (Astro's recommended approach), not custom DOM events. Components subscribe and set; they don't call each other.
- `src/utils/` holds plain helpers (storage, view transitions). There is no `src/scripts/`.
- Node comes from nvm (`.nvmrc`); in non-interactive shells run `. ~/.nvm/nvm.sh` first.
