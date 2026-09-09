import type { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/content/company';
import { Breadcrumbs, Button, Card, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'HeatCloud support: one tier for every customer, S1 answered in one hour around the clock, published post-incident reports, and an SLA that pays credits without a fight.',
};

const SEVERITIES: [string, string, string, string][] = [
  ['S1 — Down', 'A production service is unavailable or unusable and there is no workaround.', '1 hour, 24/7', 'Phone and ticket'],
  ['S2 — Degraded', 'Production is impaired, or a workaround exists but is not sustainable.', '4 business hours', 'Ticket'],
  ['S3 — Question', 'A question, a configuration problem, or a non-production issue.', '1 business day', 'Ticket or email'],
  ['S4 — Request', 'A change, a quota increase, or a feature question.', '3 business days', 'Ticket or email'],
];

const OPERATIONS: [string, string][] = [
  ['Status page and incident notices', 'A public status page with per-service state, and an email to every affected customer within 30 minutes of an incident being confirmed — not after it is resolved.'],
  ['Post-incident reports', 'Every S1 gets a written report within five working days: timeline, cause, what we changed. Published, not just sent to the people who complained.'],
  ['Maintenance windows announced', 'Fourteen days notice for anything that can interrupt service, seven for security patching, and immediate for an actively exploited vulnerability — with an explanation afterwards.'],
  ['Migration help', 'Moving in from another provider is free on annual plans, including out-of-hours DNS cutovers.'],
];

export default function SupportPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Support']]} />

      <Section tone="sand" className="!pb-10">
        <SectionHead
          eyebrow="Support"
          title="One support tier, and everybody is on it"
          lede="Answered in Slovak, Czech or English by engineers with access to the platform. Paying more buys faster response times, not a competent human."
        />
      </Section>

      <Section className="!pt-10">
        <div className="tbl">
          <table>
            <thead><tr><th>Severity</th><th>What it means</th><th>First response</th><th>Channel</th></tr></thead>
            <tbody>
              {SEVERITIES.map((r) => (
                <tr key={r[0]}>
                  <td className="whitespace-nowrap font-semibold text-ink">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td className="whitespace-nowrap font-semibold">{r[2]}</td>
                  <td>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[0.86rem] text-ink-muted">
          Business hours are 08:00–18:00 CET, Monday to Friday, Slovak public holidays excluded.
          S1 is answered around the clock on every plan — including the €4.90 one.
        </p>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Operations" title="What we do without being asked" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {OPERATIONS.map(([t, b]) => (
            <Card key={t}>
              <h3 className="text-[1rem] font-bold">{t}</h3>
              <p className="mt-2 text-[0.89rem] leading-relaxed text-ink-muted">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Guarantees" title="The SLA in one paragraph" />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
              Most services carry a 99.9% monthly availability commitment; Kubernetes control planes
              and replicated databases carry 99.95%. If we miss it, you get a credit against the next
              invoice — 10% of the monthly fee below 99.9%, 25% below 99%, 50% below 95% — claimable
              within 30 days and calculated from our own monitoring. Where we already know we missed,
              we apply the credit without waiting for a claim.
            </p>
            <div className="mt-6">
              <Button href="/legal/sla/" variant="secondary">Read the full SLA</Button>
            </div>
          </div>

          <div>
            <SectionHead eyebrow="Channels" title="Reporting things" />
            <div className="mt-5 space-y-4">
              {[
                ['Abuse', company.abuse, 'Spam, phishing, malware or an attack from our address space. Acknowledged within 24 hours; include full headers or logs with timestamps in UTC.'],
                ['Security', company.security, 'Vulnerabilities in our platform. We will not pursue anyone who reports in good faith and does not access other customers’ data.'],
                ['Data protection', company.dpo, 'Access, erasure and other data subject requests. Answered within one month, per the Privacy Policy.'],
              ].map(([title, addr, body]) => (
                <Card key={addr}>
                  <h3 className="text-[0.98rem] font-bold">{title}</h3>
                  <p className="mt-1">
                    <a href={`mailto:${addr}`} className="text-[0.88rem] font-semibold text-teal-600 hover:underline">{addr}</a>
                  </p>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-muted">{body}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="rounded-3xl border border-sand-300 bg-white px-6 py-12 text-center sm:px-12">
          <h2 className="text-[1.6rem] font-bold tracking-tight sm:text-[1.9rem]">Something broken, or about to be?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] text-ink-muted">
            Open a ticket, or tell us about the migration before you start it rather than after.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact/" size="lg">Contact support</Button>
            <Link href="/legal/" className="inline-flex items-center px-4 py-3 text-[1rem] font-semibold text-teal-600 hover:underline">
              All legal documents
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
