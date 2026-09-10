import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeatFlow from '@/components/HeatFlow';
import { RichText } from '@/components/RichText';
import {
  Breadcrumbs, Button, Container, Eyebrow, Note, Numbered, RuleGrid, Section, SectionHead, Stat,
} from '@/components/ui';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).heat;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function HeatPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.heat;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [t.metaTitle]]} />

      <div className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="font-display text-[2.6rem] leading-[1.03] sm:text-[3.4rem]">{t.title}</h1>
              <p className="mt-5 max-w-xl text-[1.08rem] leading-[1.6] text-ink-muted">{t.lede}</p>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-7">
                {t.stats.map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd><Stat value={v} label={l} /></dd>
                  </div>
                ))}
              </dl>
            </div>
            <HeatFlow t={d.heatFlow} />
          </div>
        </Container>
      </div>

      <Section>
        <SectionHead eyebrow={t.howEyebrow} title={t.howTitle} />
        <div className="mt-12">
          <Numbered items={t.steps.map(([a, b]) => ({ t: a, b }))} cols={2} />
        </div>
      </Section>

      <Section tone="paper2" rule>
        <SectionHead eyebrow={t.numbersEyebrow} title={t.numbersTitle} lede={t.numbersLede} />
        <div className="tbl mt-8">
          <table>
            <thead><tr><th>{t.colLine}</th><th>{t.colValue}</th><th>{t.colNote}</th></tr></thead>
            <tbody>
              {t.numbers.map((r) => (
                <tr key={r[0]}>
                  <td className="font-medium text-ink">{r[0]}</td>
                  <td className="font-mono text-[0.82rem] text-ink">{r[1]}</td>
                  <td>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="water" className="max-w-4xl">
          <RichText text={t.proven} />
        </Note>

        <div className="mt-8">
          <Button href="/business/" arrow>{t.modelIt}</Button>
        </div>
      </Section>

      <Section rule>
        <SectionHead eyebrow={t.limitsEyebrow} title={t.limitsTitle} tone="ink" />
        <div className="mt-10">
          <RuleGrid items={t.limits} cols={2} />
        </div>
      </Section>

      <Section tone="night">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <Eyebrow tone="paper">{t.sourceEyebrow}</Eyebrow>
            <h2 className="font-display text-[1.9rem] leading-[1.12] sm:text-[2.4rem]">{t.sourceTitle}</h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-paper/70">{t.sourceBody}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={site.dossier} variant="onDark">{d.common.openDossier}</Button>
            <Button href="/products/heat-offtake/" variant="onDarkGhost">{t.sourceSecondary}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
