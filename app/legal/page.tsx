import type { Metadata } from 'next';
import Link from 'next/link';
import { legalDocs } from '@/content/legal';
import { Arrow } from '@/components/icons';
import { Breadcrumbs, Button, Note, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Legal',
  description:
    'HeatCloud Slovakia legal documents: terms and conditions, acceptable use policy, SLA, privacy policy, data processing agreement, cookie policy and legal notice.',
};

const BLURBS: Record<string, string> = {
  terms: 'The contract: how a service is ordered, billed, suspended and terminated, and who is liable for what.',
  aup: 'What may not be run on our infrastructure, how abuse is reported, and how enforcement works.',
  sla: 'Availability commitments per service, how downtime is measured, and the credits you can claim.',
  privacy: 'What personal data we process as a controller, why, for how long, and your rights under the GDPR.',
  dpa: 'Article 28 terms for the data you process using our services, including the sub-processor list.',
  cookies: 'What this site stores in your browser. Currently: nothing.',
  imprint: 'Company identification, supervisory authorities and dispute resolution.',
};

const ORIENTATION: [string, React.ReactNode][] = [
  ['Buying any service', <>The <Link href="/legal/terms/" className="text-teal-600 hover:underline">Terms</Link>, <Link href="/legal/aup/" className="text-teal-600 hover:underline">AUP</Link> and <Link href="/legal/sla/" className="text-teal-600 hover:underline">SLA</Link> — together they are the contract.</>],
  ['A consumer, buying outside a business', <>The Terms, plus clause 18 on withdrawal rights under Act 102/2014 Coll.</>],
  ['Storing other people’s personal data with us', <>The <Link href="/legal/dpa/" className="text-teal-600 hover:underline">DPA</Link>. It applies automatically and needs no separate signature.</>],
  ['Just visiting this website', <><Link href="/legal/privacy/" className="text-teal-600 hover:underline">Privacy</Link> and <Link href="/legal/cookies/" className="text-teal-600 hover:underline">Cookies</Link> — both very short.</>],
  ['Reporting abuse or a vulnerability', <>The <Link href="/legal/aup/" className="text-teal-600 hover:underline">AUP</Link>, sections on reporting and on security research.</>],
  ['A district heating operator', <>None of these. Heat offtake is a bilateral contract negotiated separately.</>],
];

export default function LegalIndexPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Legal']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Legal"
          title="Terms, policies and the small print"
          lede="Seven documents, all written to be read. Where a term is genuinely unusual we say so in the text instead of burying it."
        />
      </Section>

      <Section className="!pt-10">
        <Note tone="warn">
          <b>Drafts, not legal advice.</b> These were written for a preview of a company that is not
          yet incorporated. They have not been reviewed by a Slovak advocate, no contract can be
          concluded on this site, and they should be treated as a statement of intended commercial
          policy rather than an enforceable agreement.
        </Note>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {legalDocs.map((d) => (
            <Link
              key={d.slug}
              href={`/legal/${d.slug}/`}
              className="group flex flex-col rounded-2xl border border-sand-300 bg-white p-6 transition hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-card"
            >
              <h2 className="text-[1.08rem] font-bold">{d.title}</h2>
              <p className="mt-2 flex-1 text-[0.89rem] leading-relaxed text-ink-muted">{BLURBS[d.slug]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-ember-600">
                {d.sections.length} sections
                <Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Orientation" title="Which document applies to you" />
        <div className="tbl mt-8">
          <table>
            <thead><tr><th>If you are…</th><th>Read</th></tr></thead>
            <tbody>
              {ORIENTATION.map(([who, what], i) => (
                <tr key={i}>
                  <td className="font-semibold text-ink">{who}</td>
                  <td>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-sand-300 bg-gradient-to-br from-sand-100 to-white px-6 py-12 text-center sm:px-12">
          <h2 className="text-[1.6rem] font-bold tracking-tight sm:text-[1.9rem]">
            Something here that would stop you buying?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] text-ink-muted">
            Tell us which clause. Terms that only work for us are a bug, and this is the stage at
            which they are cheap to fix.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact/" size="lg">Send us the objection</Button>
            <Button href="/products/" variant="secondary" size="lg">Back to products</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
