import type { Metadata } from 'next';
import Link from 'next/link';
import BusinessModel from '@/components/BusinessModel';
import { Breadcrumbs, Button, Card, Container, Note, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Business model',
  description:
    'How HeatCloud makes money: compute sold at market rates, recovered heat contracted to district networks at gas minus 20%. An interactive model of one site you can push until it breaks.',
};

const PHASES: { when: string; title: string; body: string; state: 'now' | 'next' | 'later' }[] = [
  {
    when: 'Phase 0 — now', state: 'now',
    title: 'Research, and a wedge pilot',
    body: 'The dossier is written and published. The near-term proof is a 300 kW wedge — an aquapark or a hospital with a year-round heat demand — where a small load and a single offtaker prove the interconnection and the metering without a datacenter-scale commitment.',
  },
  {
    when: 'Phase 1', state: 'next',
    title: 'Anchor tenant and the first offtake contract',
    body: 'A signed heat purchase agreement with one Slovak utility before the concrete is poured, and enough contracted compute — most plausibly GPU capacity on a reservation — to underwrite the base load the heat contract depends on. This is the order Infomaniak used, and the order nobody has yet made work in reverse.',
  },
  {
    when: 'Phase 2', state: 'later',
    title: 'sk-bts-1, five megawatts',
    body: 'The first full region in Bratislava, liquid-cooled, with the thermal plant financed against the Modernisation Fund and Programme Slovakia rather than the equity that pays for the servers.',
  },
  {
    when: 'Phase 3', state: 'later',
    title: 'A second region, and the rest of the catalogue',
    body: 'Košice for in-country redundancy, and the workplace products — hSuite, hMail, hDrive — which are what turn a hosting company into an organisation’s default supplier.',
  },
];

const RISKS: [string, string][] = [
  ['The offtake never gets signed', 'A utility that will not commit for 10 years leaves a datacenter with an expensive cooling loop and no second revenue line. Mitigation: no site is built before its heat contract exists, and the model above shows the business must clear on compute alone.'],
  ['Compute demand does not show up', 'Slovak enterprise cloud spend is small and conservative, and GPU capacity is being built everywhere. Mitigation: reservations before racks, and a catalogue broad enough that the workplace products can carry seats when infrastructure is slow.'],
  ['Electricity price moves against us', 'Power is the dominant cost on both sides of the ledger. Move the slider to €250/MWh and watch what happens. Mitigation: heat revenue is indexed to gas, which correlates with power — the hedge is imperfect but real.'],
  ['Regulatory drag', 'Heat supply in Slovakia is licensed and price-regulated under Act 657/2004 and ÚRSO. Mitigation: sell to the utility at the substation flange rather than becoming a regulated heat supplier ourselves.'],
  ['Someone larger does it first', 'A hyperscaler with a Slovak site and a heat contract would be a better-capitalised version of this. Mitigation: honestly, none — that outcome would be good for the country and bad for us, and the dossier says so.'],
];

export default function BusinessPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Business model']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Business model"
          title="Two revenue lines on one electricity bill."
          lede="A datacenter buys electricity once and can sell the result twice — as compute to customers, and as heat to a district network. This page is the whole argument, with the numbers exposed so you can disagree with them precisely."
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="#model">Jump to the model</Button>
          <Button href="https://mild-solvent.github.io/heatcloud-slovakia/" variant="secondary" arrow>
            Read the research dossier
          </Button>
        </div>
      </Section>

      {/* ------------------------------------------------------ the shape */}
      <Section>
        <SectionHead eyebrow="The shape" title="Where the two revenue lines come from" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              n: '01', t: 'Buy electricity once',
              b: 'A megawatt of IT load consumes about 8 760 MWh a year at full utilisation, plus a cooling overhead. That is the single largest cost in the business and it is bought once.',
            },
            {
              n: '02', t: 'Sell compute at market rates',
              b: 'Servers, storage, databases, mail and GPU capacity, priced against European market rates rather than against a heat subsidy. This line has to carry the business on its own.',
            },
            {
              n: '03', t: 'Sell the heat that comes out',
              b: 'About 95% of that electricity leaves the building as heat. Captured at 45 °C, lifted to 75 °C and metered into a district network, it is a contracted, indexed, base-load second line.',
            },
          ].map((s) => (
            <Card key={s.n}>
              <span className="text-[0.72rem] font-bold tracking-[0.14em] text-ember-600">{s.n}</span>
              <h3 className="mt-2 text-[1.05rem] font-bold">{s.t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">{s.b}</p>
            </Card>
          ))}
        </div>

        <Note tone="teal">
          <b>Why the heat line matters more than its size.</b> Sold as cloud, compute dwarfs it:
          at the reference case heat is about 6% of revenue. Its value is not its size. It is
          contracted for 10–15 years, indexed to the gas price it displaces, and delivered as base
          load — which makes it the part of the business a lender or a grant instrument will
          actually underwrite. The thermal plant is financed against the heat contract; the servers
          are financed against the compute revenue.
          <br /><br />
          The share also moves with how cheaply the compute is sold. Drag the compute price slider
          down towards wholesale colocation rates and watch heat become a materially larger part of
          the business — which is exactly why this model fits a GPU and colocation-heavy site better
          than a pure high-margin cloud.
        </Note>
      </Section>

      {/* ---------------------------------------------------------- model */}
      <Section id="model" tone="sand">
        <SectionHead
          eyebrow="Interactive"
          title="One site, and every assumption behind it"
          lede="Move the sliders. The reference case is a 5 MW site at 75% utilisation selling heat at 20% below the utility's gas cost — but the interesting question is where it stops working, so the model lets you take it there."
        />
        <div className="mt-9">
          <BusinessModel />
        </div>
      </Section>

      {/* ------------------------------------------------------- sequence */}
      <Section>
        <SectionHead
          eyebrow="Sequence"
          title="Cloud revenue first, heat second"
          lede="Infomaniak was a profitable hosting company for decades before its Geneva datacenter started feeding the city network. Nobody has yet made the reverse sequencing work, where the heat is the business and the compute is filler. So this is built in the order that has worked."
        />
        <ol className="mt-9 space-y-4">
          {PHASES.map((p) => (
            <li key={p.when} className="relative rounded-2xl border border-sand-300 bg-white p-6 pl-7">
              <span
                className={`absolute left-0 top-6 h-[calc(100%-3rem)] w-1 rounded-r ${
                  p.state === 'now' ? 'bg-ember-600' : p.state === 'next' ? 'bg-ember-300' : 'bg-sand-300'
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[0.73rem] font-bold uppercase tracking-[0.14em] text-ember-600">{p.when}</span>
                <h3 className="text-[1.05rem] font-bold">{p.title}</h3>
              </div>
              <p className="mt-2 max-w-3xl text-[0.92rem] leading-relaxed text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------- risks */}
      <Section tone="night">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ember-400">Kill criteria</p>
          <h2 className="text-[1.8rem] font-bold leading-tight tracking-tight sm:text-[2.1rem]">
            What would make this a bad idea
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-white/70">
            A pitch that only lists reasons to say yes is a pitch you should not trust. These are the
            five things that would sink it, taken from the research dossier, which publishes them
            rather than burying them.
          </p>
        </div>
        <dl className="mt-9 grid gap-5 md:grid-cols-2">
          {RISKS.map(([risk, mitigation]) => (
            <div key={risk} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <dt className="text-[1rem] font-bold text-white">{risk}</dt>
              <dd className="mt-2 text-[0.89rem] leading-relaxed text-white/65">{mitigation}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ------------------------------------------------------------ cta */}
      <Section tone="sand">
        <Container className="!px-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
              <h3 className="text-[1.1rem] font-bold">If you run a district network</h3>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-muted">
                Send your primary and return temperatures, an annual load profile and your delivered
                gas heat cost. That is enough for an indicative term sheet.
              </p>
              <div className="mt-5">
                <Button href="/products/heat-offtake/">Heat offtake →</Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <h3 className="text-[1.1rem] font-bold">If you would buy the compute</h3>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-muted">
                Reservations are what make the heat contract financeable, so early customers matter
                more here than they do at a normal host. Tell us the shape and the date.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="/products/">See the products</Button>
                <Link href="/pricing/" className="inline-flex items-center px-2 py-2.5 text-[0.92rem] font-semibold text-teal-600 hover:underline">
                  Prices
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
