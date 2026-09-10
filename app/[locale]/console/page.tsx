import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ConsolePreview from '@/components/ConsolePreview';
import { RichText } from '@/components/RichText';
import { Breadcrumbs, Button, Container, Note, Numbered, PageHead } from '@/components/ui';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).console;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ConsolePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.console;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [d.nav.console]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} tone="water" />

      <Container className="py-12 sm:py-16">
        <ConsolePreview locale={locale} t={d.consoleMock} vat={site.vatRate} />

        <Note tone="warn" className="max-w-3xl">
          <RichText text={t.warn} />
        </Note>

        <div className="mt-14">
          <Numbered items={t.points.map(([a, b]) => ({ t: a, b }))} cols={3} />
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Button href="/business/">{t.ctaPrimary}</Button>
          <Button href="/pricing/" variant="ghost" arrow>{t.ctaSecondary}</Button>
        </div>
      </Container>
    </>
  );
}
