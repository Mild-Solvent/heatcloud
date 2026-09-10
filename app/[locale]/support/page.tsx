import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, Button, Closing, Container, PageHead, RuleGrid, Section, SectionHead } from '@/components/ui';
import { company } from '@/content/company';
import { getDict } from '@/content/i18n';
import { isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).support;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function SupportPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const t = d.support;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [t.metaTitle]]} />
      <PageHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

      <Container className="py-12 sm:py-16">
        <div className="tbl !my-0">
          <table>
            <thead><tr><th>{t.colSeverity}</th><th>{t.colMeaning}</th><th>{t.colResponse}</th><th>{t.colChannel}</th></tr></thead>
            <tbody>
              {t.severities.map((r) => (
                <tr key={r[0]}>
                  <td className="whitespace-nowrap font-mono text-[0.8rem] text-ink">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td className="whitespace-nowrap font-medium text-ink">{r[2]}</td>
                  <td>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-[0.88rem] leading-relaxed text-ink-muted">{t.hours}</p>
      </Container>

      <Section tone="paper2" rule>
        <SectionHead eyebrow={t.opsEyebrow} title={t.opsTitle} />
        <div className="mt-10">
          <RuleGrid items={t.ops} cols={2} />
        </div>
      </Section>

      <Section rule>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={t.slaEyebrow} title={t.slaTitle} />
            <p className="mt-6 text-[0.97rem] leading-[1.7] text-ink-soft">{t.slaBody}</p>
            <div className="mt-7">
              <Button href="/legal/sla/" variant="secondary">{t.readSla}</Button>
            </div>
          </div>
          <div>
            <SectionHead eyebrow={t.channelsEyebrow} title={t.channelsTitle} tone="water" />
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {t.channels.map(([title, key, body]) => (
                <div key={key} className="py-4">
                  <dt className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-medium text-ink">{title}</span>
                    <a href={`mailto:${company[key]}`} className="link font-mono text-[0.78rem]">{company[key]}</a>
                  </dt>
                  <dd className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-muted">{body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Closing
        title={t.ctaTitle}
        lede={t.ctaLede}
        primary={{ href: '/contact/', label: t.ctaPrimary }}
        secondary={{ href: '/legal/', label: t.ctaSecondary }}
      />
    </>
  );
}
