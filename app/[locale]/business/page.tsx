import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BusinessModel from '@/components/BusinessModel';
import { RichText } from '@/components/RichText';
import {
  Breadcrumbs, Button, Eyebrow, Note, Numbered, PageHead, RuleGrid, Section, SectionHead,
} from '@/components/ui';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { isLocale } from '@/lib/i18n';
import { Link } from '@/lib/locale';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).business;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function BusinessPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.business;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [d.nav.business]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={t.lede}>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <Button href="#model">{t.jump}</Button>
          <Button href="/investors/" variant="secondary">{t.deckCta}</Button>
          <Button href={site.dossier} variant="ghost" arrow>{d.common.readResearch}</Button>
        </div>
      </PageHead>

      {/* ------------------------------------------------------ the shape */}
      <Section>
        <SectionHead eyebrow={t.shapeEyebrow} title={t.shapeTitle} />
        <div className="mt-12">
          <Numbered items={t.shape} cols={3} />
        </div>
        <Note tone="water" className="mt-14 max-w-4xl">
          <p><RichText text={t.whyNote} /></p>
          <p className="mt-4">{t.whyNote2}</p>
        </Note>
      </Section>

      {/* ---------------------------------------------------------- model */}
      <Section id="model" tone="paper2" rule className="scroll-mt-16">
        <SectionHead eyebrow={t.modelEyebrow} title={t.modelTitle} lede={t.modelLede} />
        <div className="mt-10">
          <BusinessModel locale={locale} t={d.model} />
        </div>
      </Section>

      {/* ------------------------------------------------------- sequence */}
      <Section rule>
        <SectionHead eyebrow={t.seqEyebrow} title={t.seqTitle} lede={t.seqLede} />
        <ol className="mt-12 border-t border-ink">
          {t.phases.map((p) => (
            <li key={p.when} className="grid gap-x-10 gap-y-2 border-b border-line py-7 md:grid-cols-[11rem_1fr]">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-[0.45rem] h-2 w-2 flex-none rounded-full ${
                    p.state === 'now' ? 'bg-heat-500' : p.state === 'next' ? 'border border-heat-500' : 'border border-line-strong'
                  }`}
                />
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-muted">{p.when}</span>
              </div>
              <div>
                <h3 className="font-display text-[1.35rem] leading-snug">{p.title}</h3>
                <p className="mt-3 max-w-3xl text-[0.93rem] leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------- risks */}
      <Section tone="night">
        <div className="max-w-3xl">
          <Eyebrow tone="paper">{t.risksEyebrow}</Eyebrow>
          <h2 className="font-display text-[2rem] leading-[1.1] sm:text-[2.6rem]">{t.risksTitle}</h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-paper/70">{t.risksLede}</p>
        </div>
        <div className="mt-12">
          <RuleGrid items={t.risks} cols={2} dark />
        </div>
      </Section>

      {/* ------------------------------------------------------- the deck */}
      <Section rule>
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <SectionHead eyebrow={t.deckEyebrow} title={t.deckTitle} lede={t.deckLede} />
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Button href="/investors/" size="lg">{t.deckOpen}</Button>
            <span className="font-mono text-label uppercase text-ink-faint">{t.deckHint}</span>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ cta */}
      <Section tone="paper2" rule>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div className="border-t border-ink pt-5">
            <h3 className="font-display text-[1.5rem]">{t.utilityTitle}</h3>
            <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-muted">{t.utilityBody}</p>
            <div className="mt-6">
              <Button href="/products/heat-offtake/" arrow>{t.utilityCta}</Button>
            </div>
          </div>
          <div className="border-t border-ink pt-5">
            <h3 className="font-display text-[1.5rem]">{t.buyerTitle}</h3>
            <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-muted">{t.buyerBody}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/products/">{t.buyerCta}</Button>
              <Link href="/pricing/" className="link-ink text-[0.92rem]">{d.common.prices}</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
