import { localeTag, type Locale } from './i18n';

/** €4.90 / 4,90 €. Sub-euro metered rates may carry up to four decimals so
 *  €0.0061 survives, while €0.79 stays €0.79. */
export function money(locale: Locale, n: number, opts: { dp?: number } = {}): string {
  const small = n !== 0 && Math.abs(n) < 1;
  const min = opts.dp ?? 2;
  const max = opts.dp ?? (small ? 4 : 2);
  return new Intl.NumberFormat(localeTag[locale], {
    style: 'currency', currency: 'EUR', minimumFractionDigits: min, maximumFractionDigits: max,
  }).format(n);
}

/** Whole euros, for model outputs. */
export const eur = (locale: Locale, n: number) =>
  new Intl.NumberFormat(localeTag[locale], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

/** €17.1m / 17,1 mil. € — compact millions for the business model. */
export function eurM(locale: Locale, n: number): string {
  if (Math.abs(n) < 1_000_000) return eur(locale, n);
  const m = n / 1_000_000;
  const s = new Intl.NumberFormat(localeTag[locale], {
    minimumFractionDigits: Math.abs(n) >= 10_000_000 ? 1 : 2,
    maximumFractionDigits: Math.abs(n) >= 10_000_000 ? 1 : 2,
  }).format(m);
  return locale === 'sk' ? `${s} mil. €` : `€${s}m`;
}

export const num = (locale: Locale, n: number, dp = 0) =>
  new Intl.NumberFormat(localeTag[locale], { minimumFractionDigits: dp, maximumFractionDigits: dp }).format(n);

export const pct = (locale: Locale, n: number) => `${num(locale, n * 100)} %`.replace(' %', locale === 'sk' ? ' %' : '%');

/** 812 B / 4.2 KB / 1.3 MB, in the page's number format. */
export function formatBytes(n: number, locale: 'sk' | 'en') {
  const f = (v: number, d: number) => v.toLocaleString(locale === 'sk' ? 'sk-SK' : 'en-IE', { maximumFractionDigits: d });
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${f(n / 1024, 1)} KB`;
  return `${f(n / 1024 / 1024, 1)} MB`;
}
