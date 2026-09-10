// The catalogue, by locale. The two language files must agree on structure —
// same slugs in the same order, same plan count per product — because the
// URLs, the pricing table and the tests are built from it. Checked once here
// at import time so a drift fails the build rather than a customer.

import type { Locale } from '@/lib/i18n';
import * as en from './services.en';
import * as sk from './services.sk';
import type { GroupKey, Service } from './types';

export type { Group, GroupKey, Plan, Service } from './types';

const catalogue = { en, sk } as const;

for (const [i, s] of en.services.entries()) {
  const t = sk.services[i];
  if (!t || t.slug !== s.slug || t.group !== s.group || (t.plans?.length ?? 0) !== (s.plans?.length ?? 0)) {
    throw new Error(`services.sk.ts diverges from services.en.ts at ${s.slug}`);
  }
}

export const getServices = (locale: Locale): Service[] => catalogue[locale].services;
export const getGroups = (locale: Locale) => catalogue[locale].groups;
export const byGroup = (locale: Locale, key: GroupKey) => getServices(locale).filter((s) => s.group === key);
export const bySlug = (locale: Locale, slug: string) => getServices(locale).find((s) => s.slug === slug);

/** Slugs are shared across locales; used by generateStaticParams. */
export const serviceSlugs = en.services.map((s) => s.slug);
