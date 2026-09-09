import type { Metadata } from 'next';
import Link from 'next/link';
import { regions } from '@/content/company';
import { Badge, Breadcrumbs, Button, Card, Note, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Data centres',
  description:
    'HeatCloud’s Slovak regions — Bratislava, Košice and Žilina — each sited against a district heating network, with liquid cooling, N+1 infrastructure and data residency in Slovakia.',
};

const DESIGN: [string, string][] = [
  ['Liquid cooling as the default', 'Direct-to-chip on accelerators, rear-door heat exchangers on general compute. Air cooling is the exception, because air cannot carry heat anywhere worth selling it.'],
  ['N+1 on everything that can fail', 'Two independent medium-voltage feeds, N+1 UPS and generation, N+1 cooling. Concurrent maintainability is the design target for the primary region.'],
  ['Heat rejection that still works', 'Dry coolers sized for the full load, so the datacenter is never dependent on the district network being able to take heat.'],
  ['Physical access control', 'Two-factor at the perimeter, mantrap, per-rack locks, CCTV with 90-day retention, and an access log you can request for your own cages.'],
  ['Aiming at the usual certifications', 'ISO 27001 and ISO 50001 are the target for the first operating year, and we will publish the certificate rather than the intention when we have it.'],
  ['Efficiency the regulation now expects', 'Waste-heat integration counts towards the efficient district heating criteria under EED 2023/1791 and towards the reporting obligations that come with it.'],
];

export default function DatacentersPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Data centres']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Data centres"
          title="Where your data physically is"
          lede="Three Slovak sites, each chosen against a district heating network. Nothing is replicated out of the country unless you configure it yourself."
        />
      </Section>

      <Section className="!pt-10">
        <Note tone="warn">
          <b>Status, stated plainly.</b> None of these sites is operating today. The company is in
          formation and the regions below are at design and site-selection stage. We publish the
          status of each one rather than implying a footprint we do not have.
        </Note>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {regions.map((r) => (
            <Card key={r.code}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.15rem] font-bold">{r.city}</h3>
                <Badge tone={r.status === 'in design' ? 'ember' : 'sand'}>{r.status}</Badge>
              </div>
              <p className="mt-1 font-mono text-[0.82rem] text-teal-600">{r.code}</p>
              <dl className="mt-4 space-y-2.5 text-[0.86rem]">
                <div>
                  <dt className="text-ink-faint">First phase</dt>
                  <dd className="font-semibold">{r.mw} MW IT load</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Heat network</dt>
                  <dd className="font-semibold">{r.heat}</dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-sand-200 pt-3 text-[0.86rem] leading-relaxed text-ink-muted">{r.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Design" title="How the halls are built" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DESIGN.map(([t, b]) => (
            <Card key={t}>
              <h3 className="text-[1rem] font-bold">{t}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <SectionHead eyebrow="Sovereignty" title="Data residency and access" />
          <div className="prose-doc mt-5">
            <p>
              Customer content is stored in the Slovak region you select. We do not replicate it to
              another country, and we do not operate a region outside Slovakia. Support engineers
              access customer systems only on a ticket you opened or an incident we have told you
              about, and every such access is logged and available to you on request.
            </p>
            <p>
              Sub-processors — the small number of third parties who can touch infrastructure or
              data — are listed by name, role and country in the{' '}
              <Link href="/legal/dpa/">Data Processing Agreement</Link>. We give 30 days notice
              before adding one, and you can object.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact/">Request a due-diligence pack</Button>
            <Button href="/heat/" variant="secondary">How the heat works</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
