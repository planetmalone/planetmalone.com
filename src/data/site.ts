// Site chrome: navigation and site metadata. CV content (contact details,
// roles, case studies, copy) lives in src/content/.

export const site = {
  name: 'Sean Malone',
  title: 'Sean Malone · Planet Malone',
  version: '1.0',
  lastUpdated: 'Sep 25, 2026',
};

export type PageKey = 'work' | 'now' | 'uses' | 'colophon';

export const pages: { key: PageKey; label: string; href: string }[] = [
  { key: 'work', label: 'Work', href: '/' },
  { key: 'now', label: 'Now', href: '/now' },
  { key: 'uses', label: 'Uses', href: '/uses' },
  { key: 'colophon', label: 'Colophon', href: '/colophon' },
];

export const sections = [
  { id: 'impact', label: 'Selected impact' },
  { id: 'lead', label: 'How I lead' },
  { id: 'experience', label: 'Experience' },
  { id: 'built', label: 'Built & written' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;
