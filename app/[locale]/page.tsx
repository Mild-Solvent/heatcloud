import HeatFlow from '@/components/HeatFlow';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { Button, Eyebrow, Figures, Numbered, RuleGrid, Section, SectionHead, Stat } from '@/components/ui';
import { getDict } from '@/content/i18n';
import { getGroups, getServices } from '@/content/services';
import { eurM } from '@/lib/format';
import { fmt, isLocale } from '@/lib/i18n';
import { Link } from '@/lib/locale';
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.home;
  const services = getServices(locale);

  return (
    <>
      <Hero t={t} tc={d.common} />

      {/* ---------------------------------------------------------- figures */}
      <Section className="!pt-10 sm:!pt-14">
        <Figures items={t.figures} />
      </Section>

      {/* --------------------------------------------------------- how it works */}
      <Section tone="paper2" rule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHead eyebrow={t.howEyebrow} title={t.howTitle} />
            <div className="mt-10">
              <Numbered items={t.howSteps} cols={2} />
            </div>
            <p className="mt-10">
              <Button href="/heat/" variant="ghost" arrow>{t.howLink}</Button>
            </p>
          </div>
          <Reveal className="lg:sticky lg:top-24" delay={120}>
            <HeatFlow t={d.heatFlow} />
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- products */}
      <Section id="products" rule>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow={t.productsEyebrow}
            title={t.productsTitle}
            lede={fmt(t.productsLede, { n: services.length })}
          />
          <Button href="/products/" variant="ghost" arrow className="mb-1">{t.productsAll}</Button>
        </div>
        <div className="mt-12">
          <ProductList groups={getGroups(locale)} services={services} pricesLabel={d.common.prices} showBlurb={false} />
        </div>
      </Section>

      {/* -------------------------------------------------------------- heat */}
      <Section tone="night">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Eyebrow tone="paper">{t.heatEyebrow}</Eyebrow>
            <h2 className="font-display text-[2rem] leading-[1.1] sm:text-[2.6rem]">{t.heatTitle}</h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-paper/70">{t.heatBody1}</p>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-paper/70">{t.heatBody2}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/heat/" variant="onDark">{t.heatPrimary}</Button>
              <Button href="/products/heat-offtake/" variant="onDarkGhost">{t.heatSecondary}</Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-l border-paper/15 pl-8">
            {t.heatStats.map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd><Stat value={v} label={l} tone="heat" /></dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ------------------------------------------------------ business */}
      <Section rule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHead eyebrow={t.bizEyebrow} title={t.bizTitle} lede={t.bizLede} />
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Button href="/business/" size="lg">{t.bizPrimary}</Button>
              <Button href="/console/" variant="ghost" arrow>{t.bizSecondary}</Button>
            </div>
          </div>

          <div className="rounded-md border border-line bg-card p-7">
            <p className="font-mono text-label uppercase text-ink-muted">{t.bizPanelLabel}</p>
            <div className="mt-7 space-y-6">
              {[
                [t.bizCompute, 94, 'bg-water-500', eurM(locale, 17_100_000)],
                [t.bizHeat, 6, 'bg-heat-500', eurM(locale, 1_050_000)],
              ].map(([label, share, color, value]) => (
                <div key={label as string}>
                  <div className="mb-2 flex items-baseline justify-between text-[0.88rem]">
                    <span className="text-ink">{label as string}</span>
                    <span className="font-mono text-[0.78rem] text-ink-muted">{value as string}</span>
                  </div>
                  <div className="h-[6px] w-full bg-paper-2">
                    <div className={`h-full ${color as string}`} style={{ width: `${share as number}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-line pt-5 text-[0.84rem] leading-relaxed text-ink-muted">{t.bizNote}</p>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- why */}
      <Section tone="paper2" rule>
        <SectionHead eyebrow={t.whyEyebrow} title={t.whyTitle} lede={t.whyLede} />
        <div className="mt-12">
          <Numbered items={t.why} cols={3} />
        </div>
      </Section>

      {/* ------------------------------------------------------ behaviour */}
      <Section rule>
        <SectionHead eyebrow={t.termsEyebrow} title={t.termsTitle} />
        <div className="mt-10">
          <RuleGrid items={t.terms} cols={2} />
        </div>
        <p className="mt-8 text-[0.9rem] text-ink-muted">
          <RichText text={t.termsFoot} />
        </p>
      </Section>

      {/* ------------------------------------------------------------ cta */}
      <Section tone="paper2" rule>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h2 className="font-display text-[2rem] leading-[1.1] sm:text-[2.6rem]">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-muted">{t.ctaLede}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 lg:justify-end">
            <Button href="/contact/" size="lg">{t.ctaPrimary}</Button>
            <Link href="/pricing/" className="link-ink text-[0.95rem]">{t.ctaSecondary}</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
