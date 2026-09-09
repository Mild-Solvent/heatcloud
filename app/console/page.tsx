import type { Metadata } from 'next';
import ConsolePreview from '@/components/ConsolePreview';
import { Breadcrumbs, Button, Card, Note, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Customer console',
  description:
    'A mock of what a HeatCloud customer sees on the first of the month: instances, storage, the invoice — and how much of a town their workloads heated.',
};

export default function ConsolePage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Console']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Product preview"
          title="What a customer sees on the first of the month"
          lede="This is a design, not a running product — no data behind it is real. It is here because the last tab is the one no other provider can show you, and it is easier to argue about a screen than a paragraph."
        />
      </Section>

      <Section className="!pt-10">
        <ConsolePreview />

        <Note tone="warn">
          <b>Nothing here is live.</b> The instances, buckets, invoice and heat figures are
          illustrative. There is no console to log into, because there is no platform yet.
        </Note>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ['The invoice has no surprises on it', 'Egress reads €0.00, because it is. The bill is the price list times what you ran — no request charges, no per-gigabyte retrieval, no support tier to buy.'],
            ['Both regions on one screen', 'A replica in Košice and a primary in Bratislava are the same account, the same invoice and the same support queue. In-country redundancy without a second supplier.'],
            ['A sustainability number with a meter behind it', 'The heat tab reports delivered MWh from your share of the load, metered at the utility substation. It is not an offset purchased from a broker.'],
          ].map(([t, b]) => (
            <Card key={t}>
              <h3 className="text-[1rem] font-bold">{t}</h3>
              <p className="mt-2 text-[0.89rem] leading-relaxed text-ink-muted">{b}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/business/">See the business model behind it</Button>
          <Button href="/pricing/" variant="secondary">Check the prices it bills from</Button>
        </div>
      </Section>
    </>
  );
}
