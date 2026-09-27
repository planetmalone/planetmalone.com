import { getCollection, getEntry, type CollectionEntry, type DataEntryMap } from 'astro:content';

type Singleton = Exclude<keyof DataEntryMap, 'cases' | 'roles'>;

/** Reads a single-file collection (profile, lead, about, …) and returns its data. */
export async function getSingleton<C extends Singleton>(name: C): Promise<CollectionEntry<C>['data']> {
  const entry = await getEntry(name, name);
  if (!entry) throw new Error(`Missing content file src/content/${name}.yaml`);
  return entry.data;
}

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) =>
  a.data.order - b.data.order;

/** Case studies in display order. */
export const getCases = async () => (await getCollection('cases')).sort(byOrder);

/**
 * Roles, newest first. Astro only logs a broken `caseStudy` reference, so fail
 * the build here rather than ship a dead "Read the case study" link.
 */
export async function getRoles() {
  const [roles, cases] = await Promise.all([getCollection('roles'), getCollection('cases')]);
  const slugs = new Set(cases.map((c) => c.id));
  for (const role of roles) {
    const ref = role.data.caseStudy;
    if (ref && !slugs.has(ref.id)) {
      throw new Error(
        `Role "${role.id}" links to case study "${ref.id}", which doesn't exist in src/content/cases/.`,
      );
    }
  }
  return roles.sort(byOrder);
}

/** The case studies before and after `slug`, wrapping around. */
export async function getCaseNeighbors(slug: string) {
  const cases = await getCases();
  const i = cases.findIndex((c) => c.id === slug);
  const at = (n: number) => cases[(n + cases.length) % cases.length]!;
  return { prev: at(i - 1), next: at(i + 1) };
}
