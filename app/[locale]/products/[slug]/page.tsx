import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/icons';
import { RichText } from '@/components/RichText';
import {
  Breadcrumbs, Button, Container, Eyebrow, FAQ, Note, Prose, RuleGrid, Section, SectionHead, Tag,
} from '@/components/ui';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { bySlug, getGroups, serviceSlugs } from '@/content/services';
import { money } from '@/lib/format';
import { fmt, isLocale } from '@/lib/i18n';
import { Link } from '@/lib/locale';

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const s = bySlug(locale, slug);
  if (!s) return { title: getDict(locale).product.notFound };
  return { title: s.name, description: s.summary };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const s = bySlug(locale, slug);
  if (!s) notFound();
  const d = getDict(locale);
  const t = d.product;

  const group = getGroups(locale).find((g) => g.key === s.group)!;
  const related = s.related.map((r) => bySlug(locale, r)).filter((x) => x !== undefined);
  const perMonth = d.common.perMonth;

  return (
    <>
      <Breadcrumbs trail={[[d.common.home, '/'], [d.nav.products, '/products/'], [s.name]]} />

      {/* ------------------------------------------------------------ head */}
      <div className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
            <div>
              <Tag tone="water" className="mb-5">{group.title}</Tag>
              <h1 className="font-display text-[2.4rem] leading-[1.05] sm:text-[3.2rem]">{s.name}</h1>
              <p className="mt-5 max-w-xl text-[1.08rem] leading-[1.6] text-ink-muted">{s.tagline}</p>
              <p className="mt-6 font-mono text-[0.8rem] text-heat-700">{s.from}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Button href={`/contact/?service=${encodeURIComponent(s.name)}`} size="lg">{d.common.requestAccess}</Button>
                {s.plans ? (
                  <Button href="#plans" variant="ghost" arrow>{t.seePlans}</Button>
                ) : (
                  <Button href="/heat/" variant="ghost" arrow>{t.howHeatWorks}</Button>
                )}
              </div>
            </div>
            <div className="border-l-2 border-heat-500 pl-6 lg:pl-8">
              <Prose html={s.intro} locale={locale} />
            </div>
          </div>
        </Container>
      </div>

      {/* -------------------------------------------------------- features */}
      <Section>
        <SectionHead eyebrow={t.featuresEyebrow} title={t.featuresTitle} />
        <div className="mt-10">
          <RuleGrid items={s.features.map((f) => [f.title, f.body])} cols={2} />
        </div>
      </Section>

      {/* ----------------------------------------------------------- specs */}
      <Section tone="paper2" rule>
        <SectionHead eyebrow={t.specEyebrow} title={t.specTitle} />
        <div className="tbl mt-8 max-w-4xl">
          <table>
            <tbody>
              {s.specs.map(([k, v]) => (
                <tr key={k}>
                  <td className="w-[32%] font-medium text-ink">{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ----------------------------------------------------------- plans */}
      <Section id="plans" rule className="scroll-mt-16">
        {s.plans ? (
          <>
            <SectionHead eyebrow={t.plansEyebrow} title={t.plansTitle} lede={fmt(t.plansLede, { vat: site.vatRate })} />
            <div className={`mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 ${s.plans.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {s.plans.map((p) => (
                <div key={p.name} className={`flex flex-col border-t-2 pt-5 ${p.featured ? 'border-heat-500' : 'border-ink'}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[1.35rem]">{p.name}</h3>
                    {p.featured ? <Tag tone="heat">{t.mostChosen}</Tag> : null}
                  </div>
                  <p className="mt-1 text-[0.84rem] text-ink-muted">{p.for}</p>
                  <p className="mt-6 font-display text-[2rem] leading-none tracking-tight tabular">
                    {typeof p.price === 'number' ? money(locale, p.price) : p.price}
                    <span className="ml-1.5 font-mono text-[0.72rem] tracking-normal text-ink-muted">{p.unit || perMonth}</span>
                  </p>
                  <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-faint">{d.common.exclVat}</p>
                  <ul className="mt-6 flex-1 divide-y divide-line border-y border-line text-[0.86rem]">
                    {p.specs.map(([a, b], i) => (
                      <li key={i} className="flex gap-1.5 py-2">
                        <b className="font-medium text-ink">{a}</b>
                        <span className="text-ink-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={`/contact/?plan=${encodeURIComponent(p.name)}&service=${encodeURIComponent(s.name)}`}
                    variant={p.featured ? 'primary' : 'secondary'}
                    className="mt-6 w-full"
                  >
                    {p.cta || d.common.requestAccess}
                  </Button>
                </div>
              ))}
            </div>
            {s.planNote ? <p className="mt-8 text-[0.9rem] text-ink-muted">{s.planNote}</p> : null}
          </>
        ) : (
          <>
            <SectionHead eyebrow={t.soldEyebrow} title={t.soldTitle} />
            <div className="mt-8 max-w-3xl border-l-2 border-heat-500 pl-6">
              <p className="text-[0.97rem] leading-relaxed text-ink-soft">{t.soldBody}</p>
              <div className="mt-6">
                <Button href={`/contact/?service=${encodeURIComponent(s.name)}`}>{t.startConversation}</Button>
              </div>
            </div>
          </>
        )}
      </Section>

      {/* ------------------------------------------------------------- faq */}
      <Section tone="paper2" rule>
        <SectionHead eyebrow={t.faqEyebrow} title={t.faqTitle} />
        <FAQ items={s.faq} className="mt-8 max-w-3xl" />
      </Section>

      {/* --------------------------------------------------------- related */}
      {related.length ? (
        <Section rule>
          <SectionHead eyebrow={t.relatedEyebrow} title={t.relatedTitle} />
          <ul className="mt-8 border-t border-ink">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/products/${r.slug}/`}
                  className="group -mx-3 grid grid-cols-1 gap-x-4 gap-y-1 border-b border-line px-3 py-4 transition-colors hover:bg-paper-2 md:grid-cols-[15rem_1fr_13rem_1.25rem] md:items-baseline"
                >
                  <span className="font-medium text-ink decoration-heat-500 underline-offset-4 group-hover:underline">{r.name}</span>
                  <span className="hidden text-[0.9rem] leading-snug text-ink-muted md:block">{r.summary}</span>
                  <span className="font-mono text-[0.76rem] text-ink-soft md:text-right">{r.from}</span>
                  <Arrow className="hidden h-3.5 w-3.5 self-center justify-self-end text-heat-600 md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <div className="border-t border-line">
        <Container className="py-10">
          <Eyebrow tone="ink">{d.legal.eyebrow}</Eyebrow>
          <Note tone="heat" className="!my-0 max-w-4xl">
            <RichText text={fmt(t.legalNote, { name: s.name })} />
          </Note>
        </Container>
      </div>
    </>
  );
}
