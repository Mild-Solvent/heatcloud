import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { Breadcrumbs, Button, Container, Note, PageHead, RuleGrid, Section, SectionHead, Tag } from '@/components/ui';
import { regions } from '@/content/company';
import { getDict } from '@/content/i18n';
import { fmt, isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).datacenters;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function DatacentersPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.datacenters;
  const r = d.regions;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [t.metaTitle]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} tone="water" />

      <Container className="py-12 sm:py-16">
        <Note tone="warn" className="!mt-0 max-w-3xl">
          <RichText text={t.statusNote} />
        </Note>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {regions.map((region) => {
            const info = r[region.code];
            return (
              <div key={region.code} className={`border-t-2 pt-5 ${region.status === 'in design' ? 'border-heat-500' : 'border-ink'}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[1.6rem]">{region.city}</h3>
                  <Tag tone={region.status === 'in design' ? 'heat' : 'outline'}>{r.status[region.status]}</Tag>
                </div>
                <p className="mt-1 font-mono text-[0.78rem] text-water-600">{region.code}</p>
                <dl className="kv mt-5 text-[0.88rem]">
                  <div>
                    <dt className="text-ink-muted">{r.firstPhase}</dt>
                    <dd className="text-right font-medium text-ink">{fmt(r.itLoad, { mw: region.mw })}</dd>
                  </div>
                  <div className="!block">
                    <dt className="text-ink-muted">{r.heatNetwork}</dt>
                    <dd className="mt-0.5 font-medium text-ink">{info.heat}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-muted">{info.note}</p>
              </div>
            );
          })}
        </div>
      </Container>

      <Section tone="paper2" rule>
        <SectionHead eyebrow={t.designEyebrow} title={t.designTitle} />
        <div className="mt-10">
          <RuleGrid items={t.design} cols={3} />
        </div>
      </Section>

      <Section rule>
        <div className="max-w-3xl">
          <SectionHead eyebrow={t.sovEyebrow} title={t.sovTitle} tone="water" />
          <div className="mt-6 space-y-4 text-[0.97rem] leading-[1.7] text-ink-soft">
            <p>{t.sov1}</p>
            <p><RichText text={t.sov2} /></p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Button href="/contact/">{t.ctaPrimary}</Button>
            <Button href="/heat/" variant="ghost" arrow>{t.ctaSecondary}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
