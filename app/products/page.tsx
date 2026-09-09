import type { Metadata } from 'next';
import Link from 'next/link';
import { byGroup, groups, services } from '@/content/services';
import { Arrow, Icon } from '@/components/icons';
import { Breadcrumbs, Button, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Products',
  description: `All ${services.length} HeatCloud products: cloud servers, OpenStack, Kubernetes, GPU, object storage, databases, backup, web hosting, domains, streaming, hSuite, hMail, hDrive and heat offtake.`,
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Products']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Catalogue"
          title="Every product we run"
          lede={`${services.length} products, all on our own hardware in Slovakia, all under the same terms and the same SLA framework.`}
        />
        <nav className="mt-7 flex flex-wrap gap-2" aria-label="Product groups">
          {groups.map((g) => (
            <a
              key={g.key}
              href={`#${g.key}`}
              className="rounded-full border border-sand-300 bg-white px-4 py-1.5 text-[0.85rem] font-semibold text-ink-soft hover:border-ink-faint hover:text-ink"
            >
              {g.title}
            </a>
          ))}
        </nav>
      </Section>

      {groups.map((g, idx) => (
        <Section key={g.key} id={g.key} tone={idx % 2 === 1 ? 'sand' : 'white'}>
          <SectionHead eyebrow={`${byGroup(g.key).length} products`} title={g.title} lede={g.blurb} />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {byGroup(g.key).map((s) => (
              <Link
                key={s.slug}
                href={`/products/${s.slug}/`}
                className="group flex flex-col rounded-2xl border border-sand-300 bg-white p-6 transition hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-card"
              >
                <Icon name={s.icon} className="mb-4 h-8 w-8 text-teal-600" />
                <h3 className="text-[1.08rem] font-bold">{s.name}</h3>
                <p className="mt-1.5 text-[0.86rem] font-medium text-ember-600">{s.from}</p>
                <p className="mt-3 flex-1 text-[0.89rem] leading-relaxed text-ink-muted">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink">
                  Learn more
                  <Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <div className="rounded-3xl border border-sand-300 bg-gradient-to-br from-sand-100 to-white px-6 py-12 text-center sm:px-12">
          <h2 className="text-[1.6rem] font-bold tracking-tight sm:text-[2rem]">Not sure which of these you need?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] text-ink-muted">
            Describe the workload and we will tell you the cheapest thing that will actually hold it
            — including when that is not us.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact/" size="lg">Ask us</Button>
            <Button href="/pricing/" variant="secondary" size="lg">Compare prices</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
