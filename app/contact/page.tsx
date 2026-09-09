import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { company } from '@/content/company';
import { Breadcrumbs, Card, Note, Section, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with HeatCloud Slovakia about cloud services, a migration, a district heating offtake contract, or investment.',
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs trail={[['Home', '/'], ['Contact']]} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead
              eyebrow="Contact"
              title="Talk to us"
              lede="One inbox, answered by the people building this. One working day, usually less."
            />

            <Note tone="warn">
              <b>This preview has no server.</b> The form composes an email in your own mail client —
              nothing is sent to us or stored anywhere by this page. You can also just write to{' '}
              <a href={`mailto:${company.email}`} className="text-teal-600 hover:underline">{company.email}</a>.
            </Note>

            <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl border border-sand-300 bg-sand-100" />}>
              <ContactForm />
            </Suspense>
          </div>

          <div className="space-y-5">
            <Card>
              <h3 className="text-[1rem] font-bold">Direct addresses</h3>
              <dl className="mt-4 space-y-3 text-[0.87rem]">
                {[
                  ['General', company.email],
                  ['Abuse', company.abuse],
                  ['Security', company.security],
                  ['Data protection', company.dpo],
                ].map(([label, addr]) => (
                  <div key={addr} className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink-faint">{label}</dt>
                    <dd><a href={`mailto:${addr}`} className="font-semibold text-teal-600 hover:underline">{addr}</a></dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card>
              <h3 className="text-[1rem] font-bold">Registered office</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-soft">
                {company.legalName}<br />{company.seat}
              </p>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-muted">
                {company.status} — see the{' '}
                <Link href="/legal/imprint/" className="text-teal-600 hover:underline">legal notice</Link>.
              </p>
            </Card>

            <Card className="bg-sand-50">
              <h3 className="text-[1rem] font-bold">Useful before you write</h3>
              <ul className="mt-3 space-y-2 text-[0.86rem] text-ink-muted">
                <li>· <Link href="/pricing/" className="text-teal-600 hover:underline">Every price</Link>, so you do not have to ask for a quote.</li>
                <li>· <Link href="/business/" className="text-teal-600 hover:underline">The business model</Link>, if you are evaluating rather than buying.</li>
                <li>· <Link href="/legal/terms/" className="text-teal-600 hover:underline">The terms</Link>, if you want to object to a clause.</li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
