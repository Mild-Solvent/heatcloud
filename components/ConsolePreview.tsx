'use client';

import { useState } from 'react';
import { Icon } from './icons';

/**
 * A mock of the customer console. Nothing here is live — it is a design of what
 * a customer would see on the 1st of the month, including the one panel no other
 * provider can show: how much of a town their workloads heated.
 */

const eur = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);

type Tab = 'overview' | 'compute' | 'storage' | 'invoice' | 'heat';

const TABS: [Tab, string][] = [
  ['overview', 'Overview'],
  ['compute', 'Compute'],
  ['storage', 'Storage'],
  ['invoice', 'Invoice'],
  ['heat', 'Heat contribution'],
];

const INSTANCES = [
  { name: 'web-prod-01', plan: 'HC-4', region: 'sk-bts-1', state: 'running', cpu: 34, price: 11.9 },
  { name: 'web-prod-02', plan: 'HC-4', region: 'sk-bts-1', state: 'running', cpu: 41, price: 11.9 },
  { name: 'db-primary', plan: 'HC-8D', region: 'sk-bts-1', state: 'running', cpu: 62, price: 38.0 },
  { name: 'db-replica', plan: 'HC-8D', region: 'sk-kos-1', state: 'running', cpu: 18, price: 38.0 },
  { name: 'ci-runner', plan: 'HC-2', region: 'sk-bts-1', state: 'stopped', cpu: 0, price: 4.9 },
  { name: 'ml-train-a', plan: 'L40S ×4', region: 'sk-bts-1', state: 'running', cpu: 91, price: 2196.0 },
];

const BUCKETS = [
  { name: 'app-uploads', class: 'standard', tb: 2.4, objects: '1.2m' },
  { name: 'db-backups', class: 'standard', tb: 1.1, objects: '8.4k' },
  { name: 'archive-2024', class: 'archive', tb: 18.6, objects: '412k' },
];

const INVOICE = [
  { line: 'Cloud Servers — 5 running instances', qty: '5', amount: 104.7 },
  { line: 'GPU Cloud — L40S ×4, 720 h reserved', qty: '720 h', amount: 2196.0 },
  { line: 'Object Storage — standard, 3.5 TB', qty: '3.5 TB', amount: 20.65 },
  { line: 'Object Storage — archive, 18.6 TB', qty: '18.6 TB', amount: 35.34 },
  { line: 'Managed Databases — DB-8 with replica', qty: '2', amount: 176.0 },
  { line: 'hSuite Standard — 24 users', qty: '24', amount: 213.6 },
  { line: 'Egress', qty: '4.1 TB', amount: 0 },
];

function Spark({ points, className = '' }: { points: number[]; className?: string }) {
  const max = Math.max(...points, 1);
  const d = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx / (points.length - 1)) * 100} ${28 - (p / max) * 26}`)
    .join(' ');
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={`${d} L 100 30 L 0 30 Z`} fill="currentColor" opacity="0.12" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const USAGE = [12, 18, 15, 22, 28, 24, 31, 36, 30, 34, 41, 38, 44, 47];
const HEAT_MONTH = [61, 58, 52, 44, 31, 18, 12, 14, 26, 41, 55, 63];

export default function ConsolePreview() {
  const [tab, setTab] = useState<Tab>('overview');

  const subtotal = INVOICE.reduce((a, l) => a + l.amount, 0);
  const vat = subtotal * 0.23;

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-300 bg-white shadow-card">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-sand-200 bg-sand-100 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-sand-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-sand-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-sand-400" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 font-mono text-[0.72rem] text-ink-muted">
          console.heatcloud.sk / bratislava-s-r-o
        </div>
        <span className="rounded-full bg-ember-100 px-2 py-0.5 text-[0.66rem] font-bold text-ember-700">MOCK</span>
      </div>

      {/* tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-sand-200 px-3 pt-3">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-current={tab === key}
            className={`whitespace-nowrap rounded-t-lg px-3.5 py-2 text-[0.85rem] font-semibold transition ${
              tab === key
                ? 'bg-white text-ink shadow-[inset_0_-2px_0_0_theme(colors.ember.600)]'
                : 'text-ink-muted hover:bg-sand-100 hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-sand-50 p-5 sm:p-6">
        {/* ------------------------------------------------- overview */}
        {tab === 'overview' ? (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                ['Running instances', '5', 'of 6 provisioned'],
                ['Storage used', '22.1 TB', 'across 3 buckets'],
                ['Month to date', eur(2746.29), 'excl. VAT'],
                ['Heat delivered', '31 MWh', 'this month, from your load'],
              ].map(([label, value, note]) => (
                <div key={label} className="rounded-xl border border-sand-300 bg-white p-4">
                  <p className="text-[0.71rem] font-bold uppercase tracking-[0.12em] text-ink-faint">{label}</p>
                  <p className="mt-1.5 text-[1.4rem] font-bold leading-none tracking-tight tabular-nums">{value}</p>
                  <p className="mt-1.5 text-[0.76rem] text-ink-muted">{note}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-sand-300 bg-white p-5 lg:col-span-2">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-[0.92rem] font-bold">Compute usage, last 14 days</h3>
                  <span className="text-[0.78rem] text-ink-muted">vCPU-hours / day</span>
                </div>
                <div className="text-teal-600">
                  <Spark points={USAGE} className="h-24 w-full" />
                </div>
              </div>
              <div className="rounded-xl border border-sand-300 bg-white p-5">
                <h3 className="mb-3 text-[0.92rem] font-bold">Service health</h3>
                <ul className="space-y-2.5 text-[0.84rem]">
                  {[
                    ['Compute — sk-bts-1', 'operational'],
                    ['Object Storage', 'operational'],
                    ['Managed Databases', 'operational'],
                    ['hSuite', 'degraded'],
                  ].map(([svc, state]) => (
                    <li key={svc} className="flex items-center justify-between gap-3">
                      <span className="text-ink-soft">{svc}</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.72rem] font-semibold ${
                        state === 'operational' ? 'bg-teal-100 text-teal-700' : 'bg-ember-100 text-ember-700'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${state === 'operational' ? 'bg-teal-600' : 'bg-ember-500'}`} />
                        {state}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        {/* -------------------------------------------------- compute */}
        {tab === 'compute' ? (
          <div className="tbl !my-0">
            <table>
              <thead>
                <tr>
                  <th>Instance</th><th>Plan</th><th>Region</th><th>State</th>
                  <th className="num">CPU</th><th className="num">€ / month</th>
                </tr>
              </thead>
              <tbody>
                {INSTANCES.map((n) => (
                  <tr key={n.name}>
                    <td className="font-mono text-[0.82rem] text-ink">{n.name}</td>
                    <td>{n.plan}</td>
                    <td className="font-mono text-[0.8rem]">{n.region}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.72rem] font-semibold ${
                        n.state === 'running' ? 'bg-teal-100 text-teal-700' : 'bg-sand-200 text-ink-muted'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${n.state === 'running' ? 'bg-teal-600' : 'bg-ink-faint'}`} />
                        {n.state}
                      </span>
                    </td>
                    <td className="num">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-sand-200">
                          <span className="block h-full rounded-full bg-teal-500" style={{ width: `${n.cpu}%` }} />
                        </span>
                        {n.cpu}%
                      </span>
                    </td>
                    <td className="num font-semibold">{eur(n.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* -------------------------------------------------- storage */}
        {tab === 'storage' ? (
          <div className="space-y-4">
            <div className="tbl !my-0">
              <table>
                <thead>
                  <tr><th>Bucket</th><th>Class</th><th className="num">Size</th><th className="num">Objects</th><th className="num">€ / month</th></tr>
                </thead>
                <tbody>
                  {BUCKETS.map((b) => (
                    <tr key={b.name}>
                      <td className="font-mono text-[0.82rem] text-ink">{b.name}</td>
                      <td>{b.class}</td>
                      <td className="num">{b.tb} TB</td>
                      <td className="num">{b.objects}</td>
                      <td className="num font-semibold">{eur(b.tb * (b.class === 'archive' ? 1.9 : 5.9))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 text-[0.85rem] text-teal-800">
              <b>4.1 TB egress this month — €0.00.</b> Downloads, requests and lifecycle transitions
              are not billed. At AWS S3 list prices the same egress would have been about €340.
            </div>
          </div>
        ) : null}

        {/* -------------------------------------------------- invoice */}
        {tab === 'invoice' ? (
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="tbl !my-0">
              <table>
                <thead><tr><th>Line</th><th className="num">Quantity</th><th className="num">Amount</th></tr></thead>
                <tbody>
                  {INVOICE.map((l) => (
                    <tr key={l.line}>
                      <td>{l.line}</td>
                      <td className="num">{l.qty}</td>
                      <td className={`num font-semibold ${l.amount === 0 ? 'text-teal-700' : ''}`}>
                        {l.amount === 0 ? 'included' : eur(l.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-sand-300 bg-white p-5">
              <h3 className="text-[0.92rem] font-bold">September 2026</h3>
              <dl className="mt-4 space-y-2.5 text-[0.87rem]">
                <div className="flex justify-between"><dt className="text-ink-muted">Subtotal</dt><dd className="font-semibold tabular-nums">{eur(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-muted">VAT 23%</dt><dd className="font-semibold tabular-nums">{eur(vat)}</dd></div>
                <div className="flex justify-between border-t border-sand-200 pt-2.5 text-[1rem]">
                  <dt className="font-bold">Total</dt><dd className="font-bold tabular-nums">{eur(subtotal + vat)}</dd>
                </div>
              </dl>
              <p className="mt-4 rounded-lg bg-sand-100 p-3 text-[0.78rem] leading-relaxed text-ink-muted">
                Due 14 days from issue. SEPA direct debit on file. A reverse-charge invoice is issued
                instead if you register a VAT number from another member state.
              </p>
            </div>
          </div>
        ) : null}

        {/* ----------------------------------------------------- heat */}
        {tab === 'heat' ? (
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-xl border border-ember-200 bg-ember-50 p-5">
              <div className="flex items-start gap-3">
                <Icon name="flame" className="mt-0.5 h-7 w-7 flex-none text-ember-600" />
                <div>
                  <h3 className="text-[1rem] font-bold text-ember-800">Your workloads heated about 20 flats this month</h3>
                  <p className="mt-2 text-[0.87rem] leading-relaxed text-ember-800/80">
                    Your share of the site&apos;s load produced <b>31 MWh</b> of delivered heat, which
                    the Bratislava network sold on instead of burning gas for it. That displaced about{' '}
                    <b>6.3 t of CO₂</b>.
                  </p>
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ember-200 pt-4 text-[0.85rem]">
                <div><dt className="text-ember-700/70">Your IT energy</dt><dd className="mt-0.5 text-[1.1rem] font-bold tabular-nums text-ember-800">36 MWh</dd></div>
                <div><dt className="text-ember-700/70">Recovered as heat</dt><dd className="mt-0.5 text-[1.1rem] font-bold tabular-nums text-ember-800">31 MWh</dd></div>
                <div><dt className="text-ember-700/70">Flats warmed</dt><dd className="mt-0.5 text-[1.1rem] font-bold tabular-nums text-ember-800">~20</dd></div>
                <div><dt className="text-ember-700/70">CO₂ displaced</dt><dd className="mt-0.5 text-[1.1rem] font-bold tabular-nums text-ember-800">6.3 t</dd></div>
              </dl>
            </div>

            <div className="rounded-xl border border-sand-300 bg-white p-5">
              <h3 className="mb-1 text-[0.92rem] font-bold">Heat delivered by month</h3>
              <p className="mb-4 text-[0.78rem] text-ink-muted">
                MWh from your share of the load. Summer is low because the network cannot take it —
                that seasonality is in every honest version of this business.
              </p>
              <div className="flex h-32 items-end gap-1.5">
                {HEAT_MONTH.map((v, idx) => (
                  <div key={idx} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className={`w-full rounded-t ${idx === 8 ? 'bg-ember-600' : 'bg-ember-300'}`}
                      style={{ height: `${(v / 70) * 100}%` }}
                      title={`${v} MWh`}
                    />
                    <span className="text-[0.6rem] text-ink-faint">{'JFMAMJJASOND'[idx]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[0.78rem] text-ink-muted">
                This panel is the reason a procurement officer signs: it is a sustainability number
                with a meter behind it, not an offset certificate.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
