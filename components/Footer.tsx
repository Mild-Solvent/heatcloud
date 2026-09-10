import NextLink from 'next/link';
import { company, site } from '@/content/company';
import type { Dict } from '@/content/i18n';
import { getLegalDocs } from '@/content/legal';
import { byGroup, getGroups } from '@/content/services';
import { fmt, localeName, otherLocale, type Locale } from '@/lib/i18n';
import { Link } from '@/lib/locale';
import { Logo } from './icons';

export default function Footer({ locale, t, tc }: { locale: Locale; t: Dict['footer']; tc: Dict['company'] }) {
  const groups = getGroups(locale);
  const other = otherLocale(locale);
  const col = 'mb-4 font-mono text-label uppercase text-ink-muted';
  const link = 'text-[0.86rem] text-ink-soft hover:text-ink hover:underline hover:underline-offset-4';

  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto w-full max-w-page px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-[1.7fr_1fr_1fr_1fr_0.95fr_0.95fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8 text-ink" />
              <span className="font-display text-[1.3rem] font-semibold tracking-tight text-ink">HeatCloud</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">Slovakia</span>
            </Link>
            <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-ink-muted">{t.blurb}</p>
            <p className="mt-4">
              <a href={`mailto:${company.email}`} className="link text-[0.9rem]">{company.email}</a>
            </p>
          </div>

          {groups.slice(0, 2).map((g) => (
            <div key={g.key}>
              <h3 className={col}>{g.title}</h3>
              <ul className="space-y-2">
                {byGroup(locale, g.key).map((s) => (
                  <li key={s.slug}><Link href={`/products/${s.slug}/`} className={link}>{s.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className={col}>{t.webWorkplace}</h3>
            <ul className="space-y-2">
              {[...byGroup(locale, 'web'), ...byGroup(locale, 'workplace'), ...byGroup(locale, 'heat')].map((s) => (
                <li key={s.slug}><Link href={`/products/${s.slug}/`} className={link}>{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={col}>{t.company}</h3>
            <ul className="space-y-2">
              {t.companyLinks.map(([label, href]) => (
                <li key={href}><Link href={href} className={link}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={col}>{t.legal}</h3>
            <ul className="space-y-2">
              {getLegalDocs(locale).map((d) => (
                <li key={d.slug}><Link href={`/legal/${d.slug}/`} className={link}>{d.short}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-3 border-t border-line pt-6 font-mono text-[0.7rem] leading-relaxed text-ink-muted sm:grid-cols-[1fr_auto] sm:items-baseline">
          <div>
            <p>{fmt(t.copyright, { name: company.legalName, status: tc.status })}</p>
            <p className="mt-1">
              {fmt(t.prices, { vat: site.vatRate, version: site.version, date: site.updated })}{' '}
              <Link href="/legal/imprint/" className="underline underline-offset-4 hover:text-ink">{t.whatThisIs}</Link>.
            </p>
          </div>
          <p>
            <NextLink href={`/${other}/`} hrefLang={other} lang={other} className="underline underline-offset-4 hover:text-ink">
              {localeName[other]}
            </NextLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
