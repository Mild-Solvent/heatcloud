// Locale plumbing. The site is exported statically, so every page exists twice —
// once under /sk/ and once under /en/ — and the locale is a route segment rather
// than a cookie or a header.

export const locales = ['sk', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sk';

export const isLocale = (x: string): x is Locale => (locales as readonly string[]).includes(x);

export const localeName: Record<Locale, string> = { sk: 'Slovensky', en: 'English' };
export const localeShort: Record<Locale, string> = { sk: 'SK', en: 'EN' };

// BCP 47 tags for Intl. Irish English gives euro-first formatting (€4.90)
// without American date and number habits.
export const localeTag: Record<Locale, string> = { sk: 'sk-SK', en: 'en-IE' };

export const otherLocale = (l: Locale): Locale => (l === 'sk' ? 'en' : 'sk');

/** Prefix a site-relative path with the locale segment. Anchors, mailto: and
 *  absolute URLs pass through untouched, as do paths that already carry one. */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith('/')) return href;
  if (/^\/(sk|en)(\/|$)/.test(href)) return href;
  return `/${locale}${href}`;
}

/** The path without its locale segment: /sk/pricing/ -> /pricing/ */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(sk|en)(\/.*)?$/);
  if (!m) return pathname;
  return m[2] || '/';
}

/** The same page in the other language. */
export function swapLocale(pathname: string, to: Locale): string {
  return `/${to}${stripLocale(pathname)}`;
}

/** Plural form index for `[one, few, many]` word lists. English only ever uses
 *  the first two; Slovak has 1 / 2–4 / 5+. */
export function pluralIndex(locale: Locale, n: number): 0 | 1 | 2 {
  const cat = new Intl.PluralRules(localeTag[locale]).select(n);
  if (cat === 'one') return 0;
  if (cat === 'few') return 1;
  return locale === 'en' ? 1 : 2;
}

export function plural(locale: Locale, n: number, forms: readonly string[]): string {
  return forms[Math.min(pluralIndex(locale, n), forms.length - 1)];
}

/** `{name}` substitution for dictionary strings. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
