import Link from 'next/link';
import { byGroup, groups } from '@/content/services';
import { company, site } from '@/content/company';
import { Logo } from './icons';

const EXTRA_COLS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Company',
    links: [
      ['Business model', '/business/'],
      ['Heat recovery', '/heat/'],
      ['Data centres', '/datacenters/'],
      ['About us', '/about/'],
      ['Support', '/support/'],
      ['Contact', '/contact/'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms & Conditions', '/legal/terms/'],
      ['Acceptable Use Policy', '/legal/aup/'],
      ['Service Level Agreement', '/legal/sla/'],
      ['Privacy Policy', '/legal/privacy/'],
      ['Data Processing Agreement', '/legal/dpa/'],
      ['Cookie Policy', '/legal/cookies/'],
      ['Legal notice', '/legal/imprint/'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100">
      <div className="mx-auto w-full max-w-page px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <Logo className="h-9 w-9 text-ink" />
              <span className="leading-none">
                <span className="block text-[0.92rem] font-extrabold tracking-[0.08em]">HEATCLOUD</span>
                <span className="mt-1 block text-[0.56rem] font-semibold tracking-[0.24em] text-ember-600">SLOVAKIA</span>
              </span>
            </Link>
            <p className="max-w-xs text-[0.87rem] leading-relaxed text-ink-muted">
              Sovereign Slovak cloud infrastructure whose waste heat is sold into district heating
              networks instead of being thrown at the sky.
            </p>
            <p className="mt-4 text-[0.87rem]">
              <a href={`mailto:${company.email}`} className="text-teal-600 hover:underline">{company.email}</a>
            </p>
          </div>

          {groups.slice(0, 2).map((g) => (
            <div key={g.key}>
              <h3 className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-faint">{g.title}</h3>
              <ul className="space-y-2">
                {byGroup(g.key).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/products/${s.slug}/`} className="text-[0.86rem] text-ink-muted hover:text-ink hover:underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Web &amp; workplace</h3>
            <ul className="space-y-2">
              {[...byGroup('web'), ...byGroup('workplace'), ...byGroup('heat')].map((s) => (
                <li key={s.slug}>
                  <Link href={`/products/${s.slug}/`} className="text-[0.86rem] text-ink-muted hover:text-ink hover:underline">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {EXTRA_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-faint">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-[0.86rem] text-ink-muted hover:text-ink hover:underline">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sand-300 pt-6 text-[0.79rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.legalName} — {company.status}.</p>
          <p>
            Prices in EUR excluding {site.vatRate}% Slovak VAT. Preview {site.version}, updated {site.updated}.{' '}
            <Link href="/legal/imprint/" className="underline hover:text-ink-muted">What this preview is</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
