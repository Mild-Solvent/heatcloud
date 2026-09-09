'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { services } from '@/content/services';
import { company } from '@/content/company';

const TOPICS = [
  'General enquiry',
  'Migration from another provider',
  'Heat offtake (district network operator)',
  'Public sector procurement',
  'Investment',
  ...services.map((s) => s.name),
];

const field =
  'w-full rounded-xl border border-sand-300 bg-white px-3.5 py-2.5 text-[0.95rem] ' +
  'placeholder:text-ink-faint focus:border-ember-500 focus:outline-none focus:ring-2 focus:ring-ember-500/20';

export default function ContactForm() {
  const params = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General enquiry');
  const [message, setMessage] = useState('');

  // Deep links from a product page or a plan card arrive with ?service= / ?plan=
  useEffect(() => {
    const service = params.get('service');
    const plan = params.get('plan');
    if (service && TOPICS.includes(service)) setTopic(service);
    if (plan && service) setMessage(`I would like to know more about the ${plan} plan of ${service}.`);
    else if (plan) setMessage(`I would like to know more about the ${plan} plan.`);
    else if (service) setMessage(`I would like to know more about ${service}.`);
  }, [params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[${topic}] ${name || 'Website enquiry'}`;
    const body = [message, '', '--', name, email].join('\n');
    window.location.href =
      `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-sand-300 bg-white p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-[0.85rem] font-semibold">Your name</label>
          <input id="c-name" className={field} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-[0.85rem] font-semibold">Email</label>
          <input id="c-email" type="email" className={field} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div>
        <label htmlFor="c-topic" className="mb-1.5 block text-[0.85rem] font-semibold">Topic</label>
        <select id="c-topic" className={field} value={topic} onChange={(e) => setTopic(e.target.value)}>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-[0.85rem] font-semibold">What do you need?</label>
        <textarea
          id="c-message"
          rows={6}
          className={field}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A workload, a migration date, a heat network, or an objection to a clause in the terms."
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-ember-600 px-5 py-2.5 text-[0.92rem] font-semibold text-white transition hover:bg-ember-700"
        >
          Compose the email
        </button>
        <span className="text-[0.78rem] text-ink-faint">Opens your own mail client with the message filled in.</span>
      </div>
    </form>
  );
}
