import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { RichText } from '@/components/RichText';
import { Breadcrumbs, Container, Note, SectionHead } from '@/components/ui';
import { company } from '@/content/company';
import { getDict } from '@/content/i18n';
import { getServices } from '@/content/services';
import { fmt, isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).contact;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.contact;
  const topics = [...d.form.topics, ...getServices(locale).map((s) => s.name)];
  const h3 = 'font-display text-[1.25rem]';

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [t.metaTitle]]} />

      <Container className="py-12 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} level="h1" />

            <Note tone="warn" className="max-w-2xl">
              <RichText text={fmt(t.warn, { email: `[${company.email}](mailto:${company.email})` })} />
            </Note>

            <Suspense fallback={<div className="h-96 animate-pulse rounded-md border border-line bg-paper-2" />}>
              <ContactForm t={d.form} topics={topics} email={company.email} />
            </Suspense>
          </div>

          <aside className="space-y-10 lg:pt-12">
            <div className="border-t border-ink pt-5">
              <h3 className={h3}>{t.directTitle}</h3>
              <dl className="mt-4 divide-y divide-line text-[0.87rem]">
                {t.direct.map(([label, key]) => (
                  <div key={key} className="flex items-baseline justify-between gap-3 py-2">
                    <dt className="text-ink-muted">{label}</dt>
                    <dd><a href={`mailto:${company[key]}`} className="link font-mono text-[0.8rem]">{company[key]}</a></dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-ink pt-5">
              <h3 className={h3}>{t.officeTitle}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                {company.legalName}<br />{d.company.seat}
              </p>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-muted">
                <RichText text={fmt(t.officeNote, { status: d.company.status })} />
              </p>
            </div>

            <div className="border-t border-ink pt-5">
              <h3 className={h3}>{t.usefulTitle}</h3>
              <ul className="mt-3 space-y-2 text-[0.88rem] leading-relaxed text-ink-muted">
                {t.useful.map((u, i) => (
                  <li key={i} className="grid grid-cols-[1rem_1fr] gap-2">
                    <span className="text-heat-600" aria-hidden="true">—</span>
                    <span><RichText text={u} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
