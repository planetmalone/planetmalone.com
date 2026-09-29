/**
 * Content model. One source generates the site, the print résumé and the PDFs.
 *
 * - `cases` and `roles` are collections: one YAML file per entry.
 * - Everything else is a singleton: one YAML file with its own schema, loaded
 *   with `singleton()` and read with `getSingleton()` (src/utils/content.ts).
 *
 * Copy that Sean still has to write is a `draft` field, never placeholder text in
 * a real field. The Draft component renders drafts; print omits them.
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const base = './src/content';

/** A single-file collection: `src/content/<name>.yaml` becomes the entry `<name>`. */
const singleton = <T extends z.ZodType>(name: string, schema: T) =>
  defineCollection({ loader: glob({ pattern: `${name}.yaml`, base }), schema });

// Shared shapes
const years = z.object({
  start: z.number().int(),
  /** Omit for "now". */
  end: z.number().int().optional(),
});
const stat = z.object({ value: z.string(), label: z.string() });
/** A row whose value may not exist yet: show `value`, `draft`, or both. */
const draftableRow = z
  .object({ label: z.string(), value: z.string().optional(), draft: z.string().optional() })
  .refine((r) => r.value || r.draft, 'A row needs a value, a draft, or both');
const tag = z.enum(['Strategy', 'People', 'Delivery', 'Craft']);
const stage = z.enum(['army', 'degree', 'lead', 'director', 'staff']);

const cases = defineCollection({
  loader: glob({ pattern: '*.yaml', base: `${base}/cases` }),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    shortTitle: z.string(),
    tags: z.array(tag).min(1),
    company: z.string(),
    years,
    summary: z.string(),
    /** The green line on the home card. */
    metric: z.string(),
    role: z.string(),
    /** Fourth meta item: team size or reach. */
    team: z.object({ label: z.enum(['Team', 'Reach']), value: z.string() }),
    context: z.object({ text: z.string(), draft: z.string().optional() }),
    scope: z.array(z.string()).min(1),
    decisions: z.object({
      cards: z
        .array(
          z.object({
            label: z.string(),
            title: z.string(),
            body: z.string(),
            chosen: z.boolean().default(false),
          }),
        )
        .length(2),
      draft: z.string().optional(),
    }),
    people: z.object({
      text: z.string(),
      quote: z.object({ text: z.string(), by: z.string() }).optional(),
      draft: z.string().optional(),
    }),
    outcomes: z.array(stat).length(3),
    reflection: z.object({ text: z.string().optional(), draft: z.string().optional() }),
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: '*.yaml', base: `${base}/roles` }),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    /** Omit when the title is the organization (U.S. Army). */
    company: z.string().optional(),
    years,
    scope: z.string(),
    wins: z.array(z.string()).min(1),
    tech: z.array(z.string()).default([]),
    /** An italic aside; the one place a role gets a joke. */
    aside: z.string().optional(),
    /** The print résumé's denser lines. Without them, print uses the scope and wins. */
    print: z.array(z.string()).min(1).optional(),
    stage,
    caseStudy: reference('cases').optional(),
  }),
});

const profile = singleton(
  'profile',
  z.object({
    name: z.string(),
    status: z.string(),
    lead: z.string(),
    email: z.email(),
    location: z.string(),
    timezone: z.string(),
    links: z.object({ linkedin: z.url(), github: z.url(), site: z.url() }),
    proof: z.array(stat).length(3),
    resumes: z.array(
      z.object({ track: z.enum(['staff', 'em']), label: z.string(), href: z.string(), updated: z.string() }),
    ),
    contact: z.object({ availability: z.string() }),
    education: z.object({
      degree: z.string(),
      school: z.string(),
      year: z.number().int(),
      honors: z.string(),
    }),
    volunteer: z.object({ org: z.string(), since: z.number().int(), note: z.string() }),
    print: z.object({ headline: z.string(), location: z.string(), summary: z.string(), closing: z.string() }),
  }),
);

const experience = singleton(
  'experience',
  z.object({
    routeLabel: z.string(),
    stages: z.array(z.object({ id: stage, label: z.string() })).length(5),
  }),
);

const lead = singleton(
  'lead',
  z.object({
    columns: z
      .array(
        z.object({
          heading: z.string(),
          principles: z.array(z.object({ title: z.string(), description: z.string() })).length(3),
        }),
      )
      .length(2),
  }),
);

const built = singleton(
  'built',
  z.object({
    items: z.array(z.object({ name: z.string(), description: z.string(), kind: z.string() })),
    note: z.string(),
  }),
);

const skills = singleton(
  'skills',
  z.object({ groups: z.array(z.object({ label: z.string(), items: z.array(z.string()).min(1) })).length(3) }),
);

const about = singleton(
  'about',
  z.object({
    bios: z.object({
      facts: z.object({ label: z.string(), items: z.array(z.string()) }),
      short: z.object({ label: z.string(), paragraphs: z.array(z.string()) }),
      long: z.object({ label: z.string(), paragraphs: z.array(z.string()) }),
      way: z.object({ label: z.string(), paragraphs: z.array(z.string()) }),
    }),
    population: z.object({
      title: z.string(),
      residents: z.array(z.object({ label: z.string(), count: z.number().int().positive() })),
      caption: z.string(),
    }),
    hobbies: z
      .array(
        z.object({
          name: z.string(),
          caption: z.string(),
          /** Describes the photo Sean will supply; shown in the placeholder until then. */
          photoDraft: z.string(),
        }),
      )
      .length(4),
  }),
);

const now = singleton(
  'now',
  z.object({
    updated: z.coerce.date(),
    lead: z.string(),
    rows: z.array(draftableRow),
    footnote: z.string(),
  }),
);

const uses = singleton(
  'uses',
  z.object({
    lead: z.string(),
    groups: z.array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({ name: z.string(), note: z.string().optional(), draft: z.boolean().default(false) }),
        ),
      }),
    ),
  }),
);

const colophon = singleton(
  'colophon',
  z.object({
    lead: z.string(),
    budgets: z.array(stat).length(4),
    rows: z.array(draftableRow),
  }),
);

export const collections = {
  cases,
  roles,
  profile,
  experience,
  lead,
  built,
  skills,
  about,
  now,
  uses,
  colophon,
};
