/**
 * /llms.txt (llmstxt.org): a plain-Markdown summary of the site for language
 * models and the AI tools recruiters use, generated from the same content.
 */
import type { APIRoute } from 'astro';
import { existsSync } from 'node:fs';
import { getCases, getRoles, getSingleton } from '../utils/content';
import { formatYears, timeZoneLabel } from '../utils/format';
import { pages } from '../data/site';

export const GET: APIRoute = async ({ site }) => {
  const [profile, cases, roles, now, uses, colophon] = await Promise.all([
    getSingleton('profile'),
    getCases(),
    getRoles(),
    getSingleton('now'),
    getSingleton('uses'),
    getSingleton('colophon'),
  ]);
  const url = (path: string) => new URL(path, site).href;
  // Only list résumé PDFs that have been added to public/.
  const resumes = profile.resumes.filter((r) => existsSync(`public${r.href}`));
  const leads: Record<string, string> = { now: now.lead, uses: uses.lead, colophon: colophon.lead };

  const body = [
    `# ${profile.name}`,
    `> ${profile.lead}`,
    profile.print.summary,
    [
      `- Status: ${profile.status}`,
      `- Location: ${profile.location} (${timeZoneLabel(profile.timezone)}), remote`,
      `- Email: ${profile.email}`,
      `- LinkedIn: ${profile.links.linkedin}`,
      `- GitHub: ${profile.links.github}`,
      ...resumes.map((r) => `- ${r.label} (PDF, ${r.updated}): ${url(r.href)}`),
    ].join('\n'),
    '## Case studies',
    cases.map((c) => `- [${c.data.title}](${url(`/work/${c.id}`)}): ${c.data.summary}`).join('\n'),
    '## Experience',
    roles
      .map(
        ({ data: r }) =>
          `- ${formatYears(r.years, 'present')}: ${r.company ? `${r.title}, ${r.company}. ${r.scope}` : r.scope}`,
      )
      .join('\n'),
    '## Pages',
    pages
      .filter((p) => p.key !== 'work')
      .map((p) => `- [${p.label}](${url(p.href)}): ${leads[p.key]}`)
      .join('\n'),
  ].join('\n\n');

  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
