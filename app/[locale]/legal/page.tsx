import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/icons';
import { RichText } from '@/components/RichText';
import { Breadcrumbs, Closing, Container, Note, PageHead, Section, SectionHead } from '@/components/ui';
import { getDict } from '@/content/i18n';
import { getLegalDocs } from '@/content/legal';
import { isLocale, plural } from '@/lib/i18n';
import { Link } from '@/lib/locale';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).legal;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function LegalIndexPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.legal;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [t.metaTitle]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} tone="ink" />

      <Container className="py-12 sm:py-16">
        <Note tone="warn" className="!mt-0 max-w-3xl">
          <RichText text={t.drafts} />
        </Note>

        <ol className="mt-12 border-t border-ink">
          {getLegalDocs(locale).map((doc, i) => (
            <li key={doc.slug}>
              <Link
                href={`/legal/${doc.slug}/`}
                className="group -mx-3 grid grid-cols-[2.2rem_1fr] gap-x-4 gap-y-1 border-b border-line px-3 py-5 transition-colors hover:bg-paper-2 md:grid-cols-[2.2rem_18rem_1fr_7rem_1.25rem] md:items-baseline"
              >
                <span className="row-span-3 font-mono text-[0.7rem] text-ink-faint md:row-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-[1.25rem] leading-snug text-ink decoration-heat-500 underline-offset-4 group-hover:underline">{doc.title}</span>
                <span className="col-start-2 text-[0.9rem] leading-snug text-ink-muted md:col-start-auto">{t.blurbs[doc.slug]}</span>
                <span className="col-start-2 font-mono text-[0.72rem] text-ink-faint md:col-start-auto md:text-right">
                  {doc.sections.length} {plural(locale, doc.sections.length, d.common.sections)}
                </span>
                <Arrow className="hidden h-3.5 w-3.5 self-center justify-self-end text-heat-600 transition-transform group-hover:translate-x-0.5 md:block" />
              </Link>
            </li>
          ))}
        </ol>
      </Container>

      <Section tone="paper2" rule>
        <SectionHead eyebrow={t.orientEyebrow} title={t.orientTitle} tone="ink" />
        <div className="tbl mt-8 max-w-4xl">
          <table>
            <thead><tr><th>{t.colIf}</th><th>{t.colRead}</th></tr></thead>
            <tbody>
              {t.orientation.map(([who, what], i) => (
                <tr key={i}>
                  <td className="font-medium text-ink">{who}</td>
                  <td><RichText text={what} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Closing
        tone="paper"
        title={t.ctaTitle}
        lede={t.ctaLede}
        primary={{ href: '/contact/', label: t.ctaPrimary }}
        secondary={{ href: '/products/', label: t.ctaSecondary }}
      />
    </>
  );
}
