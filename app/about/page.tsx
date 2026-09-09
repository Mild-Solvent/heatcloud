import type { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/content/company';
import { Breadcrumbs, Button, Card, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Company',
  description:
    'HeatCloud Slovakia: a cloud business being built to sell compute at market rates and its recovered heat to Slovak district heating networks below the cost of gas.',
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Company']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Company"
          title="A hosting company with a second product: heat"
          lede="HeatCloud Slovakia is being built to sell compute at market rates and the heat it produces to district networks below the cost of gas."
        />
      </Section>

      <Section className="!pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="prose-doc max-w-2xl">
            <h2 className="!mb-2 !mt-0 text-[1.3rem] font-bold text-ink">What we are doing</h2>
            <p>
              Slovak district heating is largely gas-fired, and the regulated delivered price sits
              around €93.4/MWh. A datacenter turns electricity into low-grade heat as an unavoidable
              by-product, and that heat can be delivered into a district network for roughly
              €55/MWh once heat pumps and capex are accounted for. Somebody is going to capture that
              spread. We would like it to be a Slovak company, with the servers and the data in
              Slovakia.
            </p>

            <h2 className="!mb-2 !mt-8 text-[1.3rem] font-bold text-ink">The sequence matters</h2>
            <p>
              Infomaniak — the Swiss host whose Geneva datacenter feeds its entire electrical
              consumption into the city network as heat — did it in a specific order: they were a
              profitable hosting business for decades, and the heat recovery came as a by-product of
              infrastructure they were building anyway. Nobody has yet made the reverse sequencing
              work, where the heat is the business and the compute is filler.
            </p>
            <p>
              So we are building the cloud business first. Every product on this site has to stand
              on its own commercial merits with the heat revenue set to zero. The heat contracts are
              what make the economics good; they are not what make them viable. You can check that
              claim yourself on the <Link href="/business/">business model page</Link> — set the
              offtake slider to zero and see what survives.
            </p>

            <h2 className="!mb-2 !mt-8 text-[1.3rem] font-bold text-ink">Where we are</h2>
            <p>
              The company is <b>in formation</b>. There is a research dossier, a service design, a
              pricing model, and conversations with heat utilities. There is not yet an operating
              datacenter, an incorporated entity, or a service you can buy. This website is a
              preview of what is being built, and it says so on every page rather than in a
              footnote.
            </p>

            <h2 className="!mb-2 !mt-8 text-[1.3rem] font-bold text-ink">How we intend to behave</h2>
            <ul>
              <li><b>Publish the numbers, including the bad ones.</b> The research dossier includes
                the kill criteria — the conditions under which this idea should be abandoned.</li>
              <li><b>No lock-in mechanics.</b> No egress fees, no renewal price traps, no
                proprietary API where a standard one exists, no fee for leaving.</li>
              <li><b>Say no clearly.</b> If a workload belongs somewhere else, or if we cannot serve
                the capacity you need on the date you need it, we say so instead of selling a queue
                position.</li>
              <li><b>One support tier.</b> Everybody gets the engineers. Paying more buys capacity
                and response times, not the right to reach a competent person.</li>
            </ul>
          </div>

          <div className="space-y-5">
            <Card>
              <h3 className="text-[1rem] font-bold">Contact</h3>
              <dl className="mt-4 space-y-3 text-[0.87rem]">
                {[
                  ['General enquiries', company.email],
                  ['Abuse reports', company.abuse],
                  ['Security disclosures', company.security],
                  ['Data protection', company.dpo],
                ].map(([label, addr]) => (
                  <div key={addr}>
                    <dt className="text-ink-faint">{label}</dt>
                    <dd><a href={`mailto:${addr}`} className="font-semibold text-teal-600 hover:underline">{addr}</a></dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-t border-sand-200 pt-3 text-[0.8rem] text-ink-muted">
                Full legal identity — or what exists of it so far — is on the{' '}
                <Link href="/legal/imprint/" className="text-teal-600 hover:underline">legal notice</Link>.
              </p>
            </Card>

            <Card className="bg-sand-50">
              <h3 className="text-[1rem] font-bold">Three conversations are open</h3>
              <ul className="mt-3 space-y-2.5 text-[0.87rem] text-ink-muted">
                <li><b className="text-ink">Early customers</b> — reservations are what make the heat contracts financeable.</li>
                <li><b className="text-ink">Heat partners</b> — utilities with a network and a gas bill.</li>
                <li><b className="text-ink">Investors</b> — the thermal asset and the IT asset are financed differently.</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button href="/contact/" size="sm">Get in touch</Button>
                <Button href="https://mild-solvent.github.io/heatcloud-slovakia/" variant="secondary" size="sm">
                  Read the research
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
