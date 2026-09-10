// Shapes shared by both language versions of the catalogue and the legal
// documents. The two locale files must export the same slugs in the same order;
// content/services.ts and content/legal.ts assert that at import time.

export type GroupKey = 'compute' | 'storage' | 'web' | 'workplace' | 'heat';
export type Group = { key: GroupKey; title: string; blurb: string };

export type Plan = {
  name: string;
  for: string;
  /** A number is formatted in the page's locale; a string is shown verbatim (“+100%”, “−50%”). */
  price: number | string;
  /** Per-unit suffix; the locale's default is “/month” when omitted. */
  unit?: string;
  /** Metered rates are not discounted for annual billing. */
  metered?: boolean;
  specs: [string, string?][];
  featured?: boolean;
  cta?: string;
};

export type Service = {
  slug: string;
  name: string;
  group: GroupKey;
  icon: string;
  menuNote: string;
  tagline: string;
  from: string;
  summary: string;
  intro: string;
  features: { title: string; body: string }[];
  specs: [string, string][];
  plans: Plan[] | null;
  planNote: string | null;
  faq: [string, string][];
  related: string[];
};

export type LegalSection = { h: string; body: string };
export type LegalDoc = {
  slug: string;
  title: string;
  short: string;
  lede: string;
  effective: string;
  sections: LegalSection[];
};
