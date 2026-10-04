import type { APIRoute, GetStaticPaths } from 'astro';
import { getCases, getSingleton } from '../../utils/content';
import { formatYearsCompact } from '../../utils/format';
import { renderOg, type OgContent } from '../../utils/og';

/** One OG image for home and one per case study, at /og/<slug>.png. */
export const getStaticPaths = (async () => {
  const [profile, cases] = await Promise.all([getSingleton('profile'), getCases()]);
  const home: OgContent = {
    title: profile.name,
    titleSize: 150,
    stacked: true,
    subtitle: profile.og.tagline,
    facts: profile.proof.map((p) => p.value),
  };
  return [
    { params: { slug: 'home' }, props: { og: home } },
    ...cases.map((c) => ({
      params: { slug: c.id },
      props: {
        og: {
          title: c.data.title,
          titleSize: 96,
          subtitle: `${c.data.company} · ${formatYearsCompact(c.data.years)} · Case study`,
          facts: c.data.tags,
        } satisfies OgContent,
      },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderOg(props.og as OgContent)), {
    headers: { 'Content-Type': 'image/png' },
  });
