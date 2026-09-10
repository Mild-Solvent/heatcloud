// The legal documents, by locale. Slugs must agree between the two language
// files — they are the URLs and the tests use them.

import type { Locale } from '@/lib/i18n';
import { legalDocs as en } from './legal.en';
import { legalDocs as sk } from './legal.sk';
import type { LegalDoc } from './types';

export type { LegalDoc, LegalSection } from './types';

const docs: Record<Locale, LegalDoc[]> = { en, sk };

for (const [i, d] of en.entries()) {
  if (sk[i]?.slug !== d.slug) throw new Error(`legal.sk.ts diverges from legal.en.ts at ${d.slug}`);
}

export const getLegalDocs = (locale: Locale) => docs[locale];
export const legalBySlug = (locale: Locale, slug: string) => docs[locale].find((d) => d.slug === slug);
export const legalSlugs = en.map((d) => d.slug);
