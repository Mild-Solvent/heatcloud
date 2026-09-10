import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { Breadcrumbs, Container, Eyebrow, Note, Prose } from '@/components/ui';
import { company, site } from '@/content/company';
import { slugify } from '@/content/html';
import { getDict } from '@/content/i18n';
import { legalBySlug, legalSlugs } from '@/content/legal';
import { fmt, isLocale } from '@/lib/i18n';

type Params = Promise<{ locale: string; doc: string }>;

export function generateStaticParams() {
  return legalSlugs.map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale)) return {};
  const d = legalBySlug(locale, doc);
  if (!d) return { title: getDict(locale).legalDoc.notFound };
  return { title: d.title, description: d.lede };
}

export default async function LegalDocPage({ params }: { params: Params }) {
  const { locale, doc } = await params;
  if (!isLocale(locale)) notFound();
  const legal = legalBySlug(locale, doc);
  if (!legal) notFound();
  const dict = getDict(locale);
  const t = dict.legalDoc;

  return (
    <>
      <Breadcrumbs trail={[[dict.common.home, '/'], [dict.legal.metaTitle, '/legal/'], [legal.title]]} />

      <Container className="py-12 sm:py-16">
        <article className="mx-auto max-w-prose">
          <Eyebrow tone="ink">{dict.legal.eyebrow}</Eyebrow>
          <h1 className="font-display text-[2.2rem] leading-[1.08] sm:text-[2.8rem]">{legal.title}</h1>
          <p className="mt-5 text-[1.05rem] leading-[1.6] text-ink-muted">{legal.lede}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-line py-4 font-mono text-[0.72rem] sm:grid-cols-4">
            {[
              [t.version, `${site.version} (${t.draft})`],
              [t.effective, legal.effective],
              [t.updated, site.updated],
              [t.sections, String(legal.sections.length)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="uppercase tracking-[0.1em] text-ink-faint">{k}</dt>
                <dd className="mt-1 text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <Note tone="warn">
            <RichText text={t.warn} />
          </Note>

          {/* table of contents */}
          <nav aria-label={t.contents} className="my-10 border-t border-ink pt-4">
            <h2 className="mb-3 font-mono text-label uppercase text-ink-muted">{t.contents}</h2>
            <ol className="grid gap-x-8 gap-y-1.5 text-[0.88rem] sm:grid-cols-2">
              {legal.sections.map((s, i) => (
                <li key={s.h} className="grid grid-cols-[1.6rem_1fr] gap-1">
                  <span className="font-mono text-[0.72rem] text-ink-faint">{i + 1}.</span>
                  <a href={`#${slugify(s.h)}`} className="link-ink">{s.h}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            {legal.sections.map((s, i) => (
              <section key={s.h} className="mt-10 scroll-mt-24 border-t border-line pt-6" id={slugify(s.h)}>
                <h2 className="mb-4 font-display text-[1.45rem] leading-snug text-ink">
                  <span className="mr-2 font-mono text-[0.8rem] text-heat-600">{i + 1}.</span>
                  {s.h}
                </h2>
                <Prose html={s.body} locale={locale} />
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-ink pt-6 text-[0.88rem] text-ink-muted">
            <RichText text={fmt(t.questions, { email: `[${company.email}](mailto:${company.email})` })} />
          </p>
        </article>
      </Container>
    </>
  );
}
