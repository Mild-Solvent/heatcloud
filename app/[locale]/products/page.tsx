import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductList from '@/components/ProductList';
import { Breadcrumbs, Closing, Container, PageHead } from '@/components/ui';
import { getDict } from '@/content/i18n';
import { getGroups, getServices } from '@/content/services';
import { fmt, isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).products;
  return { title: t.metaTitle, description: fmt(t.metaDescription, { n: getServices(locale).length }) };
}

export default async function ProductsPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.products;
  const services = getServices(locale);
  const groups = getGroups(locale);

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [d.nav.products]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={fmt(t.lede, { n: services.length })}>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label={t.groupsNav}>
          {groups.map((g, i) => (
            <a key={g.key} href={`#${g.key}`} className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-muted hover:text-ink">
              <span className="text-heat-600">{String(i + 1).padStart(2, '0')}</span> {g.title}
            </a>
          ))}
        </nav>
      </PageHead>

      <Container className="py-14 sm:py-20">
        <ProductList groups={groups} services={services} pricesLabel={d.common.prices} />
      </Container>

      <Closing
        title={t.ctaTitle}
        lede={t.ctaLede}
        primary={{ href: '/contact/', label: t.ctaPrimary }}
        secondary={{ href: '/pricing/', label: t.ctaSecondary }}
      />
    </>
  );
}
