import type { Metadata } from 'next';
import Link from 'next/link';
import PricingExplorer from '@/components/PricingExplorer';
import { site } from '@/content/company';
import { Breadcrumbs, Button, Card, CheckList, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Every HeatCloud price on one page — compute, storage, web, workplace — in EUR excluding 23% Slovak VAT, with no egress charges and no cancellation fees.',
};

const FAQ: [string, string][] = [
  ['Is there a minimum term?', 'No, on monthly billing: everything can be cancelled at the end of the month in which you cancel. Annual plans run to the end of the paid year; if you cancel early we do not refund the remainder, which is the trade for the 15% discount.'],
  ['Do prices change?', 'We can change prices with 30 days written notice, and you can terminate without penalty inside that notice period. Registry price changes on domains are passed through at cost.'],
  ['What happens if I do not pay?', 'A reminder on day 3, suspension on day 7, deletion 30 days after suspension. You can export everything during that whole window. Details are in clause 7 of the Terms.'],
  ['Can we get a purchase order and 30-day invoicing?', 'Yes, for public bodies and companies above roughly €200/month. Ask on the contact form.'],
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Pricing']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Pricing"
          title="Every price, on one page"
          lede={`No quote form to see a number, no "contact sales" on anything that has a price list. All figures are in euro and exclude ${site.vatRate}% Slovak VAT unless you switch it on.`}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['VAT', `Prices exclude VAT. Slovak customers and EU consumers pay ${site.vatRate}%. Businesses elsewhere in the EU with a valid VAT number are invoiced under the reverse charge; customers outside the EU are invoiced without VAT.`],
            ['Billing', 'Monthly in advance for subscriptions, monthly in arrears for metered usage. Card, SEPA direct debit or bank transfer. Annual payment takes 15% off subscription services.'],
            ['Changing plans', 'Upgrade any time — the difference is prorated to the day. Downgrade at the end of a billing period. No cancellation fee, ever.'],
          ].map(([t, b]) => (
            <Card key={t}>
              <h3 className="text-[0.98rem] font-bold">{t}</h3>
              <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-muted">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!pt-10">
        <PricingExplorer />
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Included" title="What is never charged extra" />
            <CheckList
              className="mt-6"
              items={[
                'Egress from Object Storage, hDrive and Managed Backup, within fair use.',
                'Restores, including full disaster-recovery restores into a Cloud Server.',
                'The Kubernetes control plane, on clusters of any size.',
                'DNS hosting and DNSSEC, whether or not the domain is registered with us.',
                'DDoS mitigation on every service.',
                'TLS certificates, including wildcards, on every hosted domain.',
                'Support, in Slovak, Czech or English — there is one tier and everybody is on it.',
                'Migration from your current provider, on annual plans.',
              ]}
            />
          </div>
          <div>
            <SectionHead eyebrow="FAQ" title="Questions about the bill" />
            <div className="mt-6 space-y-3">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group rounded-xl border border-sand-300 bg-white px-5 py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[0.94rem] font-semibold marker:content-['']">
                    {q}
                    <span className="flex-none text-[1.2rem] font-normal leading-none text-ember-600 group-open:hidden">+</span>
                    <span className="hidden flex-none text-[1.2rem] font-normal leading-none text-ember-600 group-open:block">−</span>
                  </summary>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-sand-300 bg-gradient-to-br from-sand-100 to-white px-6 py-12 text-center sm:px-12">
          <h2 className="text-[1.6rem] font-bold tracking-tight sm:text-[2rem]">
            Want this modelled against your current bill?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] text-ink-muted">
            Send last month&apos;s invoice from wherever you are now and we will map it line by line,
            including the parts where we come out more expensive.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact/" size="lg">Send us an invoice</Button>
            <Link href="/legal/terms/" className="inline-flex items-center px-4 py-3 text-[1rem] font-semibold text-teal-600 hover:underline">
              Read the terms
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
