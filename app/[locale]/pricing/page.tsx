import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PricingExplorer, { type Row } from '@/components/PricingExplorer';
import { Breadcrumbs, CheckList, Closing, Container, FAQ, PageHead, RuleGrid, SectionHead, Section } from '@/components/ui';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { getGroups, getServices } from '@/content/services';
import { fmt, isLocale, type Locale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).pricing;
  return { title: t.metaTitle, description: t.metaDescription };
}

function buildRows(locale: Locale, perMonth: string): Row[] {
  return getServices(locale).flatMap((s) =>
    (s.plans || []).map((p) => ({
      service: s.name,
      slug: s.slug,
      group: s.group,
      plan: p.name,
      for: p.for,
      includes: p.specs.map((x) => [x[0], x[1]].filter(Boolean).join(' ')).join(', '),
      price: p.price,
      unit: p.unit || perMonth,
      metered: Boolean(p.metered),
    })),
  );
}

export default async function PricingPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.pricing;
  const vat = site.vatRate;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [d.nav.pricing]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={fmt(t.lede, { vat })}>
        <RuleGrid items={t.notes.map(([a, b]) => [a, fmt(b, { vat })])} cols={3} />
      </PageHead>

      <Container className="py-12 sm:py-16">
        <PricingExplorer
          locale={locale}
          t={t}
          tc={d.common}
          groups={getGroups(locale)}
          rows={buildRows(locale, d.common.perMonth)}
          vat={vat}
        />
      </Container>

      <Section tone="paper2" rule>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={t.includedEyebrow} title={t.includedTitle} />
            <CheckList className="mt-8" items={t.included} />
          </div>
          <div>
            <SectionHead eyebrow={t.faqEyebrow} title={t.faqTitle} />
            <FAQ items={t.faq} className="mt-8" />
          </div>
        </div>
      </Section>

      <Closing
        tone="paper"
        title={t.ctaTitle}
        lede={t.ctaLede}
        primary={{ href: '/contact/', label: t.ctaPrimary }}
        secondary={{ href: '/legal/terms/', label: d.common.readTerms }}
      />
    </>
  );
}
