import type { Metadata } from 'next';
import HeatFlow from '@/components/HeatFlow';
import { Breadcrumbs, Button, Card, Note, Section, SectionHead, Stat } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Heat recovery',
  description:
    'How HeatCloud captures datacenter waste heat at 40–50 °C, lifts it with heat pumps to 70–85 °C and sells it into Slovak district heating networks below the cost of gas.',
};

const STEPS: [string, string][] = [
  ['1 — Capture', 'Servers are cooled by water, not by blowing air at them. Direct-to-chip cold plates on GPU nodes and rear-door heat exchangers on general compute pick the heat up in a closed loop that leaves the hall at 40–50 °C.'],
  ['2 — Lift', 'That temperature is too low for a Slovak district network, which runs its primary at 70–85 °C. Industrial heat pumps lift it, consuming roughly one unit of electricity for every four to five units of heat delivered.'],
  ['3 — Deliver', 'The hot side feeds a plate exchanger at the utility’s substation. Past that flange it is the utility’s network, metered exactly like any other heat source they buy.'],
  ['4 — Fall back', 'When the network cannot take heat — a mild week in April, a planned outage — the loop is rejected to dry coolers instead. The datacenter never depends on the offtake to stay cool.'],
];

const LIMITS: [string, string][] = [
  ['It is not carbon-free compute', 'The servers still draw grid electricity. What changes is that the heat displaces burned gas instead of being wasted, so the same joule does two jobs.'],
  ['It is not a summer product', 'District demand collapses in July. Annual delivery is contracted against a realistic seasonal profile, and summer heat is largely rejected.'],
  ['It does not work everywhere', 'It needs a network within a couple of kilometres, a utility willing to sign a 10–15 year agreement, and a site with power. That is a short list of places, and we are honest about which ones.'],
  ['It is not why you should buy compute', 'Buy the compute because the price, the jurisdiction and the support work for you. The heat is why the price can be what it is.'],
];

export default function HeatPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Heat recovery']]} />

      <section className="border-b border-sand-200 bg-gradient-to-b from-sand-100 to-white">
        <div className="mx-auto w-full max-w-page px-5 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ember-600">Heat recovery</p>
              <h1 className="text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2.8rem]">
                Where the heat goes.
              </h1>
              <p className="mt-4 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted">
                Every watt that enters a datacenter leaves it as heat. The only question is whether
                it leaves through a chimney or through a pipe that ends in somebody&apos;s radiator.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-sand-300 pt-6 sm:grid-cols-4">
                <Stat value="~95%" label="of electrical input recoverable" />
                <Stat value="40–50 °C" label="off the racks" />
                <Stat value="70–85 °C" label="into the network" />
                <Stat value="€93.4" label="per MWh — the gas heat it displaces" />
              </div>
            </div>
            <div className="rounded-2xl border border-sand-300 bg-white p-4 shadow-card sm:p-6">
              <HeatFlow className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="How it works" title="The chain, step by step" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {STEPS.map(([t, b]) => (
            <Card key={t}>
              <h3 className="text-[1.02rem] font-bold">{t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead
          eyebrow="Numbers"
          title="The economics, without the varnish"
          lede="Desk estimates for a reference 5 MW electrical site, taken from the research dossier this company grew out of. Good enough to decide whether to look further; not good enough to sign anything."
        />
        <div className="tbl mt-8">
          <table>
            <thead><tr><th>Line</th><th>Reference value</th><th>Note</th></tr></thead>
            <tbody>
              {[
                ['IT load', '5 MW electrical', 'Base-load, high utilisation — GPU and steady compute'],
                ['Recoverable heat', '~4.7 MW thermal', 'About 95% of electrical input, before heat-pump lift'],
                ['Heat pump COP', '4.0–5.0', 'Lifting a 45 °C loop to 75 °C'],
                ['Delivered heat cost', '~€55/MWh', 'Heat-pump electricity, maintenance, capex amortisation'],
                ['Displaced gas heat', '€93.4/MWh', 'Regulated Slovak delivered heat price, gas-fired'],
                ['Contract discount', 'gas minus ~20%', 'What the utility saves; what makes them sign'],
                ['Households served', '~5 000 flats', 'Marketing conversion at Slovak building stock, not metered delivery'],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="font-semibold text-ink">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="teal">
          <b>Where this is proven.</b> Infomaniak&apos;s D4 datacenter in Geneva has fed essentially
          its entire electricity consumption into the Geneva district network as heat since 11
          November 2024 — 1.7 MW thermal, servers at 40–45 °C, heat-pumped to about 67 °C. The
          engineering is not speculative. The Slovak part — the offtake contracts, the funding, the
          regulated price environment — is what we are building.
        </Note>

        <div className="mt-6">
          <Button href="/business/">Model it yourself →</Button>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Honest limits" title="What it is not" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {LIMITS.map(([t, b]) => (
            <Card key={t}>
              <h3 className="text-[1.02rem] font-bold">{t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="night">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ember-400">Source material</p>
            <h2 className="text-[1.7rem] font-bold leading-tight tracking-tight sm:text-[2.1rem]">
              The research this is based on is published in full.
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-white/70">
              Market sizing, the reference deployment model, the EU funding stack (Modernisation
              Fund, Programme Slovakia, ELENA/TARGET, EIB/EBRD), the regulatory requirements under
              Act 657/2004 and ÚRSO, the pilot, and the kill criteria — including the ones that
              would sink it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href="https://mild-solvent.github.io/heatcloud-slovakia/" variant="onDark">Open the dossier</Button>
            <Button href="/products/heat-offtake/" variant="onDark">Heat offtake for utilities</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
