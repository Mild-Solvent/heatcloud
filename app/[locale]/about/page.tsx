import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { Breadcrumbs, Button, Container, PageHead } from '@/components/ui';
import { company, site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).about;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.about;
  const h = 'font-display text-[1.5rem] leading-snug text-ink';
  const p = 'mt-3 text-[0.97rem] leading-[1.7] text-ink-soft';

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [t.metaTitle]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

      <Container className="py-12 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl space-y-10">
            <section>
              <h2 className={h}>{t.h1}</h2>
              <p className={p}>{t.p1}</p>
            </section>
            <section>
              <h2 className={h}>{t.h2}</h2>
              <p className={p}>{t.p2}</p>
              <p className={p}><RichText text={t.p3} /></p>
            </section>
            <section>
              <h2 className={h}>{t.h3}</h2>
              <p className={p}><RichText text={t.p4} /></p>
            </section>
            <section>
              <h2 className={h}>{t.h4}</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {t.behave.map((b, i) => (
                  <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 py-3.5 text-[0.95rem] leading-relaxed text-ink-soft">
                    <span className="font-mono text-[0.7rem] text-heat-600">{String(i + 1).padStart(2, '0')}</span>
                    <span><RichText text={b} /></span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-10">
            <div className="border-t border-ink pt-5">
              <h3 className="font-display text-[1.25rem]">{t.contactTitle}</h3>
              <dl className="mt-4 space-y-3 text-[0.87rem]">
                {t.contacts.map(([label, key]) => (
                  <div key={key}>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-faint">{label}</dt>
                    <dd className="mt-0.5"><a href={`mailto:${company[key]}`} className="link">{company[key]}</a></dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-line pt-4 text-[0.82rem] leading-relaxed text-ink-muted">
                <RichText text={t.contactFoot} />
              </p>
            </div>

            <div className="border-t border-ink pt-5">
              <h3 className="font-display text-[1.25rem]">{t.openTitle}</h3>
              <ul className="mt-4 space-y-3 text-[0.9rem] leading-relaxed text-ink-muted">
                {t.open.map(([a, b]) => (
                  <li key={a}><b className="font-medium text-ink">{a}</b> — {b}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href="/contact/" size="sm">{d.common.contactUs}</Button>
                <Button href={site.dossier} variant="ghost" arrow>{d.common.readResearch}</Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
