import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { bySlug, groups, services } from '@/content/services';
import { site } from '@/content/company';
import { Arrow, Icon } from '@/components/icons';
import {
  Badge, Breadcrumbs, Button, Card, Note, Prose, Section, SectionHead,
} from '@/components/ui';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = bySlug(slug);
  if (!s) return { title: 'Product not found' };
  return { title: s.name, description: s.summary };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = bySlug(slug);
  if (!s) notFound();

  const group = groups.find((g) => g.key === s.group)!;
  const related = s.related.map(bySlug).filter(Boolean);

  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Products', '/products/'], [s.name]]} />

      {/* ------------------------------------------------------------ hero */}
      <section className="border-b border-sand-200 bg-gradient-to-b from-sand-100 to-white">
        <div className="mx-auto w-full max-w-page px-5 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <Badge tone="teal" className="mb-4">{group.title}</Badge>
              <h1 className="text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2.7rem]">{s.name}</h1>
              <p className="mt-4 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted">{s.tagline}</p>
              <p className="mt-5">
                <span className="inline-flex items-center rounded-full bg-ember-100 px-3.5 py-1.5 text-[0.88rem] font-bold text-ember-700">
                  {s.from}
                </span>
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={`/contact/?service=${encodeURIComponent(s.name)}`} size="lg">Request access</Button>
                {s.plans ? (
                  <Button href="#plans" variant="secondary" size="lg">See the plans</Button>
                ) : (
                  <Button href="/heat/" variant="secondary" size="lg">How the heat works</Button>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-sand-300 bg-white p-7 shadow-card">
              <Icon name={s.icon} className="mb-4 h-10 w-10 text-teal-600" />
              <Prose html={s.intro} />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- features */}
      <Section>
        <SectionHead eyebrow="Features" title="What you get" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {s.features.map((f) => (
            <Card key={f.title}>
              <h3 className="text-[1.02rem] font-bold">{f.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">{f.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- specs */}
      <Section tone="sand">
        <SectionHead eyebrow="Specification" title="The technical detail" />
        <div className="tbl mt-8">
          <table>
            <tbody>
              {s.specs.map(([k, v]) => (
                <tr key={k}>
                  <td className="w-[34%] font-semibold text-ink">{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ----------------------------------------------------------- plans */}
      <Section id="plans">
        {s.plans ? (
          <>
            <SectionHead
              eyebrow="Pricing"
              title="Plans and prices"
              lede={`All prices exclude ${site.vatRate}% Slovak VAT. Business customers with a valid EU VAT number are invoiced under the reverse charge.`}
            />
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {s.plans.map((p) => (
                <div
                  key={p.name}
                  className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
                    p.featured ? 'border-2 border-ember-500 shadow-card' : 'border-sand-300'
                  }`}
                >
                  {p.featured ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-ember-600 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-white">
                      Most chosen
                    </span>
                  ) : null}
                  <h3 className="text-[1.05rem] font-bold">{p.name}</h3>
                  <p className="mt-0.5 text-[0.82rem] text-ink-muted">{p.for}</p>
                  <p className="mt-4 text-[1.8rem] font-bold leading-none tracking-tight">
                    {p.price}
                    <span className="ml-1 text-[0.78rem] font-medium text-ink-muted">{p.unit || '/month'}</span>
                  </p>
                  <p className="mt-1 text-[0.72rem] text-ink-faint">excl. VAT</p>
                  <ul className="mt-5 flex-1 space-y-2 text-[0.86rem]">
                    {p.specs.map(([a, b], i) => (
                      <li key={i} className="flex gap-1.5">
                        <b className="font-semibold text-ink">{a}</b>
                        <span className="text-ink-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={`/contact/?plan=${encodeURIComponent(p.name)}&service=${encodeURIComponent(s.name)}`}
                    variant={p.featured ? 'primary' : 'secondary'}
                    className="mt-6 w-full"
                  >
                    {p.cta || 'Request access'}
                  </Button>
                </div>
              ))}
            </div>
            {s.planNote ? <p className="mt-6 text-[0.88rem] text-ink-muted">{s.planNote}</p> : null}
          </>
        ) : (
          <>
            <SectionHead eyebrow="How it is sold" title="Commercial shape" />
            <Card className="mt-8 max-w-3xl">
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                Heat is sold under a bilateral heat purchase agreement, not from a price list. Send
                us your network parameters — primary and return temperatures, an annual load profile,
                your delivered gas heat cost — and we will come back with an indicative term sheet.
              </p>
              <div className="mt-5">
                <Button href={`/contact/?service=${encodeURIComponent(s.name)}`}>Start a conversation</Button>
              </div>
            </Card>
          </>
        )}
      </Section>

      {/* ------------------------------------------------------------- faq */}
      <Section tone="sand">
        <SectionHead eyebrow="FAQ" title="Questions we actually get asked" />
        <div className="mt-8 max-w-3xl space-y-3">
          {s.faq.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-sand-300 bg-white px-5 py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-[0.96rem] font-semibold marker:content-['']">
                {q}
                <span className="flex-none text-[1.2rem] font-normal leading-none text-ember-600 group-open:hidden">+</span>
                <span className="hidden flex-none text-[1.2rem] font-normal leading-none text-ember-600 group-open:block">−</span>
              </summary>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-muted">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- related */}
      {related.length ? (
        <Section>
          <SectionHead eyebrow="Related" title="Often bought with this" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r!.slug}
                href={`/products/${r!.slug}/`}
                className="group flex flex-col rounded-2xl border border-sand-300 bg-white p-6 transition hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-card"
              >
                <Icon name={r!.icon} className="mb-3.5 h-7 w-7 text-teal-600" />
                <h3 className="text-[1.02rem] font-bold">{r!.name}</h3>
                <p className="mt-2 flex-1 text-[0.87rem] leading-relaxed text-ink-muted">{r!.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.83rem] font-semibold text-ember-600">
                  {r!.from} <Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="sand" className="!py-10">
        <Note>
          {s.name} is provided under our <Link href="/legal/terms/" className="text-teal-600 hover:underline">General Terms &amp; Conditions</Link>,
          the <Link href="/legal/aup/" className="text-teal-600 hover:underline">Acceptable Use Policy</Link> and
          the <Link href="/legal/sla/" className="text-teal-600 hover:underline">Service Level Agreement</Link>. Where
          we process personal data on your behalf, the <Link href="/legal/dpa/" className="text-teal-600 hover:underline">Data
          Processing Agreement</Link> applies automatically and needs no separate signature.
        </Note>
      </Section>
    </>
  );
}
