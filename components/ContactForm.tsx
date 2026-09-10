'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Dict } from '@/content/i18n';
import { fmt } from '@/lib/i18n';

const field =
  'w-full rounded border border-line-strong bg-card px-3.5 py-2.5 text-[0.95rem] text-ink ' +
  'placeholder:text-ink-faint focus:border-heat-500 focus:outline-none focus:ring-2 focus:ring-heat-500/20';

export default function ContactForm({ t, topics, email }: { t: Dict['form']; topics: string[]; email: string }) {
  const params = useSearchParams();
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState('');

  // Deep links from a product page or a plan card arrive with ?service= / ?plan=
  useEffect(() => {
    const service = params.get('service');
    const plan = params.get('plan');
    if (service && topics.includes(service)) setTopic(service);
    if (plan && service) setMessage(fmt(t.prefillPlan, { plan, service }));
    else if (plan) setMessage(fmt(t.prefillPlanOnly, { plan }));
    else if (service) setMessage(fmt(t.prefillService, { service }));
  }, [params, t, topics]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[${topic}] ${name || t.subjectFallback}`;
    const body = [message, '', '--', name, from].join('\n');
    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const lbl = 'mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-muted';

  return (
    <form onSubmit={submit} className="space-y-5 rounded-md border border-line bg-card p-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={lbl}>{t.name}</label>
          <input id="c-name" className={field} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="c-email" className={lbl}>{t.email}</label>
          <input id="c-email" type="email" className={field} autoComplete="email" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
      </div>

      <div>
        <label htmlFor="c-topic" className={lbl}>{t.topic}</label>
        <select id="c-topic" className={field} value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className={lbl}>{t.message}</label>
        <textarea
          id="c-message"
          rows={6}
          className={field}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.placeholder}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center rounded bg-heat-500 px-5 py-2.5 text-[0.92rem] font-medium text-white transition-colors hover:bg-heat-600"
        >
          {t.submit}
        </button>
        <span className="text-[0.78rem] text-ink-faint">{t.note}</span>
      </div>
    </form>
  );
}
