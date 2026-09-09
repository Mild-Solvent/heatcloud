import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { legalBySlug, legalDocs } from '@/content/legal';
import { company, site } from '@/content/company';
import { slugify } from '@/content/html';
import { Breadcrumbs, Note, Prose, Section } from '@/components/ui';

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  const d = legalBySlug(doc);
  if (!d) return { title: 'Document not found' };
  return { title: d.title, description: d.lede };
}

export default async function LegalDocPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const d = legalBySlug(doc);
  if (!d) notFound();

  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Legal', '/legal/'], [d.title]]} />

      <Section className="!py-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ember-600">Legal</p>
          <h1 className="text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.4rem]">{d.title}</h1>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-muted">{d.lede}</p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-y border-sand-200 py-4 text-[0.82rem]">
            {[
              ['Version', `${site.version} (draft)`],
              ['Effective', d.effective],
              ['Last updated', site.updated],
              ['Sections', String(d.sections.length)],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="font-semibold text-ink">{k}</dt>
                <dd className="text-ink-muted">{v}</dd>
              </div>
            ))}
          </dl>

          <Note tone="warn">
            <b>Draft, not legal advice.</b> This was written for a preview of a company that is not
            yet incorporated. It has not been reviewed by a Slovak advocate, no contract can be
            concluded on this site, and it should be treated as a statement of intended commercial
            policy rather than an enforceable agreement. Before any service is sold it will be
            reviewed, dated and versioned properly.
          </Note>

          {/* table of contents */}
          <nav aria-label="Contents" className="my-8 rounded-2xl border border-sand-300 bg-sand-50 p-5">
            <h2 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Contents</h2>
            <ol className="grid list-decimal gap-1 pl-5 text-[0.88rem] sm:grid-cols-2">
              {d.sections.map((s) => (
                <li key={s.h} className="break-inside-avoid">
                  <a href={`#${slugify(s.h)}`} className="text-teal-600 hover:underline">{s.h}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose-doc">
            {d.sections.map((s, i) => (
              <section key={s.h} className="mt-9 scroll-mt-24" id={slugify(s.h)}>
                <h2 className="mb-3 text-[1.22rem] font-bold text-ink">
                  <span className="text-ember-600">{i + 1}.</span> {s.h}
                </h2>
                <Prose html={s.body} />
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-sand-200 pt-6 text-[0.87rem] text-ink-muted">
            Questions about this document:{' '}
            <a href={`mailto:${company.email}`} className="text-teal-600 hover:underline">{company.email}</a>.
            {' '}Other documents: <Link href="/legal/" className="text-teal-600 hover:underline">the legal index</Link>.
          </div>
        </div>
      </Section>
    </>
  );
}
