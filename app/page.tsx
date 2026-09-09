import Link from 'next/link';
import { byGroup, groups, services } from '@/content/services';
import { model } from '@/content/company';
import { Icon, Arrow } from '@/components/icons';
import HeatFlow from '@/components/HeatFlow';
import { Badge, Button, Card, Container, Section, SectionHead, Stat } from '@/components/ui';

export default function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-sand-200 bg-gradient-to-b from-sand-100 to-white">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Badge tone="ember" className="mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
                Sovereign cloud · Slovak racks · recovered heat
              </Badge>
              <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-tight sm:text-[3.1rem]">
                The cloud that <span className="text-ember-600">heats Slovak towns</span>.
              </h1>
              <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-ink-muted">
                Servers, storage, mail and managed services run from data centres in Slovakia. The
                heat they produce is sold into district heating networks instead of being blown at
                the sky — a second revenue stream on the same electricity, and one less gas boiler
                in the town.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/products/" size="lg">Browse the products</Button>
                <Button href="/business/" variant="secondary" size="lg" arrow>See how the business works</Button>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-sand-300 pt-6">
                <div>
                  <dt className="text-[1.35rem] font-bold tracking-tight">€{model.gasHeatPrice}</dt>
                  <dd className="mt-1 text-[0.78rem] leading-snug text-ink-muted">per MWh — what Slovak district heat costs today, gas-fired</dd>
                </div>
                <div>
                  <dt className="text-[1.35rem] font-bold tracking-tight text-ember-600">~€{model.recoveredHeatCost}</dt>
                  <dd className="mt-1 text-[0.78rem] leading-snug text-ink-muted">per MWh — what recovered datacenter heat costs to deliver</dd>
                </div>
                <div>
                  <dt className="text-[1.35rem] font-bold tracking-tight">~5 000</dt>
                  <dd className="mt-1 text-[0.78rem] leading-snug text-ink-muted">flats a 5 MW site heats at full output — fewer once summer is counted</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-sand-300 bg-white p-4 shadow-card sm:p-6">
              <HeatFlow className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- products */}
      <Section id="products">
        <SectionHead
          eyebrow="Products"
          title="Everything a Slovak organisation needs to run"
          lede={`${services.length} products across compute, storage, web, workplace and heat — on the same hardware, in the same halls, under the same terms.`}
        />

        <div className="mt-10 space-y-12">
          {groups.map((g) => (
            <div key={g.key}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-[1.15rem] font-bold">{g.title}</h3>
                  <p className="mt-0.5 text-[0.88rem] text-ink-muted">{g.blurb}</p>
                </div>
                <Link href="/pricing/" className="text-[0.83rem] font-semibold text-teal-600 hover:underline">
                  Prices →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {byGroup(g.key).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/products/${s.slug}/`}
                    className="group flex flex-col rounded-2xl border border-sand-300 bg-white p-5 transition hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-card"
                  >
                    <Icon name={s.icon} className="mb-3 h-7 w-7 text-teal-600" />
                    <h4 className="text-[0.98rem] font-bold">{s.name}</h4>
                    <p className="mt-1.5 flex-1 text-[0.83rem] leading-relaxed text-ink-muted">{s.summary}</p>
                    <span className="mt-4 flex items-center justify-between text-[0.8rem] font-semibold text-ember-600">
                      {s.from}
                      <Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- heat */}
      <Section tone="night">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ember-400">The half nobody else sells</p>
            <h2 className="text-[1.8rem] font-bold leading-tight tracking-tight sm:text-[2.2rem]">
              The waste heat is a product, not an emission.
            </h2>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/70">
              A datacenter turns essentially all of its electricity into low-grade heat. Almost
              everyone throws that away. We take it off the racks at 40–50 °C, lift it with heat
              pumps to the 70–85 °C a Slovak district network runs at, and sell it to the utility
              under a 10–15 year contract at a discount to what gas costs them.
            </p>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/70">
              That contract is why the compute above it can be priced the way it is — and why a town
              gets a base-load heat source that does not burn anything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/heat/" variant="onDark">How the heat recovery works</Button>
              <Link href="/products/heat-offtake/" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[0.92rem] font-semibold text-white hover:bg-white/10">
                For heat utilities <Arrow />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <Stat tone="dark" value="~95%" label="of electrical input recoverable as heat" />
            <Stat tone="dark" value="40–50 °C" label="temperature coming off the racks" />
            <Stat tone="dark" value="70–85 °C" label="delivered into the district network" />
            <Stat tone="dark" value="10–15 yr" label="length of the heat purchase agreement" />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------- business teaser */}
      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHead
              eyebrow="Business model"
              title="Two revenue lines on one electricity bill."
              lede="Compute is sold at market rates and carries the business on its own. Heat is contracted base-load revenue on top, indexed to the gas price it displaces. Move the assumptions yourself and watch the model respond."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/business/" size="lg">Open the interactive model</Button>
              <Button href="/console/" variant="secondary" size="lg">See the customer console</Button>
            </div>
          </div>

          <Card className="shadow-card">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
              Reference 5 MW site — annual
            </p>
            <div className="mt-5 space-y-4">
              {[
                ['Compute revenue', 94, 'bg-teal-600', '€17.1m'],
                ['Heat revenue', 6, 'bg-ember-500', '€1.05m'],
              ].map(([label, pct, color, value]) => (
                <div key={label as string}>
                  <div className="mb-1.5 flex items-baseline justify-between text-[0.85rem]">
                    <span className="font-semibold">{label as string}</span>
                    <span className="tabular-nums text-ink-muted">{value as string}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-sand-200">
                    <div className={`h-full rounded-full ${color as string}`} style={{ width: `${pct as number}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-sand-200 pt-4 text-[0.8rem] leading-relaxed text-ink-muted">
              Sold as cloud, compute dwarfs heat — heat is about 6% of revenue. But it is the
              contracted, indexed, base-load 6%: the part a lender underwrites and the reason the
              thermal plant can be funded separately from the servers. Desk estimates, not an offer.
            </p>
          </Card>
        </div>
      </Section>

      {/* --------------------------------------------------------- why us */}
      <Section>
        <SectionHead
          eyebrow="The case"
          title="Why anyone would buy from a Slovak cloud"
          lede="Three reasons, in the order customers actually raise them."
          center
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: 'scale',
              title: 'Jurisdiction you can point at',
              body: 'Your data sits in Slovakia, under Slovak and EU law, operated by a company with no parent that can be compelled to disclose without an EU legal basis. For public bodies and healthcare that is a procurement requirement, not a preference.',
            },
            {
              icon: 'wave',
              title: 'A price that is not paid for twice',
              body: 'Heat sold to a district network is a second revenue stream on the same electricity. That is what funds no-egress storage and a free Kubernetes control plane instead of a marketing budget.',
            },
            {
              icon: 'headset',
              title: 'Support in Slovak, by people who run it',
              body: 'One support tier for everybody, answered in Slovak, Czech or English by engineers with access to the platform — not a script and an escalation queue.',
            },
          ].map((c) => (
            <Card key={c.title} hover>
              <Icon name={c.icon} className="mb-4 h-8 w-8 text-ember-600" />
              <h3 className="text-[1.02rem] font-bold">{c.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ behaviour */}
      <Section tone="sand">
        <SectionHead eyebrow="Terms, plainly" title="How we behave, written down" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ['No egress ransom', 'Getting data out of Object Storage, hDrive or a managed database costs nothing. A price that only works while you stay is not a price.'],
            ['Renewal at the registration price', 'Domains, hosting and subscriptions renew at what you paid. No introductory rate that triples in year two.'],
            ['30 days before anything is deleted', 'Unpaid invoices suspend after 7 days and delete after a further 30. You can pull a full copy at any point in that window.'],
            ['The SLA pays out without a fight', 'Credits are calculated from our own monitoring and applied to the next invoice. Where we already know we missed, we credit you without waiting for a claim.'],
          ].map(([t, b]) => (
            <Card key={t}>
              <h3 className="text-[0.98rem] font-bold">{t}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">{b}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-[0.86rem] text-ink-muted">
          All of it is in the <Link href="/legal/terms/" className="text-teal-600 hover:underline">Terms</Link>,{' '}
          <Link href="/legal/sla/" className="text-teal-600 hover:underline">SLA</Link> and{' '}
          <Link href="/legal/aup/" className="text-teal-600 hover:underline">Acceptable Use Policy</Link> — written to be read.
        </p>
      </Section>

      {/* ------------------------------------------------------------ cta */}
      <Section>
        <div className="rounded-3xl border border-sand-300 bg-gradient-to-br from-sand-100 to-white px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-[1.7rem] font-bold leading-tight tracking-tight sm:text-[2.1rem]">
            Tell us what you need to run.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ink-muted">
            A workload, a migration date, a heat network, or an objection to a clause in the terms.
            All four are useful, and all four get an answer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact/" size="lg">Talk to us</Button>
            <Button href="/pricing/" variant="secondary" size="lg">See every price</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
