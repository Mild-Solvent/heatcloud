'use client';

import { useState } from 'react';
import type { Dict } from '@/content/i18n';
import { money, num } from '@/lib/format';
import { fmt, type Locale } from '@/lib/i18n';
import { Icon } from './icons';
import { RichText } from './RichText';

/**
 * A mock of the customer console. Nothing here is live — it is a design of what
 * a customer would see on the 1st of the month, including the one panel no other
 * provider can show: how much of a town their workloads heated.
 */

type Tab = 'overview' | 'compute' | 'storage' | 'invoice' | 'heat';
const TAB_KEYS: Tab[] = ['overview', 'compute', 'storage', 'invoice', 'heat'];

const INSTANCES = [
  { name: 'web-prod-01', plan: 'HC-4', region: 'sk-bts-1', running: true, cpu: 34, price: 11.9 },
  { name: 'web-prod-02', plan: 'HC-4', region: 'sk-bts-1', running: true, cpu: 41, price: 11.9 },
  { name: 'db-primary', plan: 'HC-8D', region: 'sk-bts-1', running: true, cpu: 62, price: 38.0 },
  { name: 'db-replica', plan: 'HC-8D', region: 'sk-kos-1', running: true, cpu: 18, price: 38.0 },
  { name: 'ci-runner', plan: 'HC-2', region: 'sk-bts-1', running: false, cpu: 0, price: 4.9 },
  { name: 'ml-train-a', plan: 'L40S ×4', region: 'sk-bts-1', running: true, cpu: 91, price: 2196.0 },
];

const BUCKETS = [
  { name: 'app-uploads', cls: 'standard', tb: 2.4, objects: '1.2m' },
  { name: 'db-backups', cls: 'standard', tb: 1.1, objects: '8.4k' },
  { name: 'archive-2024', cls: 'archive', tb: 18.6, objects: '412k' },
];

const AMOUNTS = [104.7, 2196.0, 20.65, 35.34, 176.0, 213.6, 0];

function Spark({ points, className = '' }: { points: number[]; className?: string }) {
  const max = Math.max(...points, 1);
  const d = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx / (points.length - 1)) * 100} ${28 - (p / max) * 26}`)
    .join(' ');
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={`${d} L 100 30 L 0 30 Z`} fill="currentColor" opacity="0.1" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const USAGE = [12, 18, 15, 22, 28, 24, 31, 36, 30, 34, 41, 38, 44, 47];
const HEAT_MONTH = [61, 58, 52, 44, 31, 18, 12, 14, 26, 41, 55, 63];

function State({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] ${ok ? 'text-water-600' : 'text-heat-600'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-water-500' : 'bg-heat-500'}`} />
      {label}
    </span>
  );
}

export default function ConsolePreview({ locale, t, vat }: { locale: Locale; t: Dict['consoleMock']; vat: number }) {
  const [tab, setTab] = useState<Tab>('overview');
  const eur = (n: number) => money(locale, n, { dp: 2 });

  const subtotal = AMOUNTS.reduce((a, b) => a + b, 0);
  const vatAmount = subtotal * (vat / 100);
  const label = 'font-mono text-label uppercase text-ink-muted';
  const panel = 'rounded-md border border-line bg-card';

  return (
    <div className="overflow-hidden rounded-md border border-line bg-card">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full border border-line-strong" />
          <span className="h-2 w-2 rounded-full border border-line-strong" />
          <span className="h-2 w-2 rounded-full border border-line-strong" />
        </div>
        <div className="mx-auto font-mono text-[0.7rem] text-ink-muted">
          console.heatcloud.sk / bratislava-s-r-o
        </div>
        <span className="rounded-sm border border-heat-500 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-heat-700">{t.mock}</span>
      </div>

      {/* tabs */}
      <div className="flex gap-0 overflow-x-auto border-b border-line px-4">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-current={tab === key}
            className={`-mb-px whitespace-nowrap border-b-2 px-3.5 py-3 text-[0.85rem] transition-colors ${
              tab === key ? 'border-heat-500 text-ink' : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            {t.tabs[key]}
          </button>
        ))}
      </div>

      <div className="bg-paper p-5 sm:p-6">
        {/* ------------------------------------------------- overview */}
        {tab === 'overview' ? (
          <div className="space-y-5">
            <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
              {[
                [t.running, '5', fmt(t.ofProvisioned, { n: 6 })],
                [t.storageUsed, '22.1 TB', fmt(t.acrossBuckets, { n: 3 })],
                [t.monthToDate, eur(2746.29), t.exclVat],
                [t.heatDelivered, '31 MWh', t.thisMonth],
              ].map(([l, value, note]) => (
                <div key={l} className="bg-card p-4">
                  <p className={label}>{l}</p>
                  <p className="mt-2 font-display text-[1.5rem] leading-none tracking-tight tabular">{value}</p>
                  <p className="mt-2 text-[0.76rem] text-ink-muted">{note}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className={`${panel} p-5 lg:col-span-2`}>
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-[0.92rem] font-semibold">{t.usageTitle}</h3>
                  <span className="font-mono text-[0.7rem] text-ink-muted">{t.usageUnit}</span>
                </div>
                <div className="text-water-500">
                  <Spark points={USAGE} className="h-24 w-full" />
                </div>
              </div>
              <div className={`${panel} p-5`}>
                <h3 className="mb-3 text-[0.92rem] font-semibold">{t.health}</h3>
                <ul className="divide-y divide-line text-[0.84rem]">
                  {[
                    ['Compute — sk-bts-1', true],
                    ['Object Storage', true],
                    ['Managed Databases', true],
                    ['hSuite', false],
                  ].map(([svc, ok]) => (
                    <li key={svc as string} className="flex items-center justify-between gap-3 py-2">
                      <span className="text-ink-soft">{svc as string}</span>
                      <State ok={ok as boolean} label={ok ? t.operational : t.degraded} />
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
                  <th>{t.colInstance}</th><th>{t.colPlan}</th><th>{t.colRegion}</th><th>{t.colState}</th>
                  <th className="num">{t.colCpu}</th><th className="num">{t.colMonth}</th>
                </tr>
              </thead>
              <tbody>
                {INSTANCES.map((n) => (
                  <tr key={n.name}>
                    <td className="font-mono text-[0.8rem] text-ink">{n.name}</td>
                    <td>{n.plan}</td>
                    <td className="font-mono text-[0.78rem]">{n.region}</td>
                    <td><State ok={n.running} label={n.running ? t.stateRunning : t.stateStopped} /></td>
                    <td className="num">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1 w-16 overflow-hidden bg-paper-2">
                          <span className="block h-full bg-water-500" style={{ width: `${n.cpu}%` }} />
                        </span>
                        <span className="font-mono text-[0.78rem]">{n.cpu} %</span>
                      </span>
                    </td>
                    <td className="num font-mono text-[0.8rem] text-ink">{eur(n.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* -------------------------------------------------- storage */}
        {tab === 'storage' ? (
          <div className="space-y-5">
            <div className="tbl !my-0">
              <table>
                <thead>
                  <tr><th>{t.colBucket}</th><th>{t.colClass}</th><th className="num">{t.colSize}</th><th className="num">{t.colObjects}</th><th className="num">{t.colMonth}</th></tr>
                </thead>
                <tbody>
                  {BUCKETS.map((b) => (
                    <tr key={b.name}>
                      <td className="font-mono text-[0.8rem] text-ink">{b.name}</td>
                      <td>{b.cls}</td>
                      <td className="num font-mono text-[0.78rem]">{num(locale, b.tb, 1)} TB</td>
                      <td className="num font-mono text-[0.78rem]">{b.objects}</td>
                      <td className="num font-mono text-[0.8rem] text-ink">{eur(b.tb * (b.cls === 'archive' ? 1.9 : 5.9))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-l-2 border-water-500 pl-4 text-[0.86rem] leading-relaxed text-ink-soft">
              <RichText text={t.egressNote} />
            </div>
          </div>
        ) : null}

        {/* -------------------------------------------------- invoice */}
        {tab === 'invoice' ? (
          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <div className="tbl !my-0">
              <table>
                <thead><tr><th>{t.colLine}</th><th className="num">{t.colQty}</th><th className="num">{t.colAmount}</th></tr></thead>
                <tbody>
                  {t.invoiceLines.map(([line, qty], idx) => (
                    <tr key={line}>
                      <td>{line}</td>
                      <td className="num font-mono text-[0.78rem]">{qty}</td>
                      <td className={`num font-mono text-[0.8rem] ${AMOUNTS[idx] === 0 ? 'text-water-600' : 'text-ink'}`}>
                        {AMOUNTS[idx] === 0 ? t.included : eur(AMOUNTS[idx])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`${panel} p-5`}>
              <h3 className="font-display text-[1.15rem]">{t.invoiceMonth}</h3>
              <dl className="kv mt-3 text-[0.87rem]">
                <div><dt className="text-ink-muted">{t.subtotal}</dt><dd className="font-mono text-[0.8rem]">{eur(subtotal)}</dd></div>
                <div><dt className="text-ink-muted">{fmt(t.vat, { vat })}</dt><dd className="font-mono text-[0.8rem]">{eur(vatAmount)}</dd></div>
                <div className="!border-t !border-ink !pt-3 text-[1rem]">
                  <dt className="font-semibold">{t.total}</dt><dd className="font-mono font-medium">{eur(subtotal + vatAmount)}</dd>
                </div>
              </dl>
              <p className="mt-5 text-[0.78rem] leading-relaxed text-ink-muted">{t.invoiceNote}</p>
            </div>
          </div>
        ) : null}

        {/* ----------------------------------------------------- heat */}
        {tab === 'heat' ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-md border border-heat-300 bg-heat-50 p-5">
              <div className="flex items-start gap-3">
                <Icon name="flame" className="mt-1 h-6 w-6 flex-none text-heat-600" />
                <div>
                  <h3 className="font-display text-[1.3rem] leading-snug text-heat-800">{t.heatTitle}</h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-heat-900/80">
                    <RichText text={t.heatBody} />
                  </p>
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-heat-300 pt-4 text-[0.82rem]">
                {[[t.yourIt, '36 MWh'], [t.recovered, '31 MWh'], [t.flatsWarmed, '~20'], [t.co2, `${num(locale, 6.3, 1)} t`]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-heat-800/70">{k}</dt>
                    <dd className="mt-1 font-display text-[1.35rem] leading-none tabular text-heat-800">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={`${panel} p-5`}>
              <h3 className="mb-1 text-[0.92rem] font-semibold">{t.byMonth}</h3>
              <p className="mb-4 text-[0.78rem] text-ink-muted">{t.byMonthLede}</p>
              <div className="flex h-32 items-end gap-1.5">
                {HEAT_MONTH.map((v, idx) => (
                  <div key={idx} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className={`w-full ${idx === 8 ? 'bg-heat-500' : 'bg-heat-200'}`}
                      style={{ height: `${(v / 70) * 100}%` }}
                      title={`${v} MWh`}
                    />
                    <span className="font-mono text-[0.6rem] text-ink-faint">{t.months[idx]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[0.78rem] text-ink-muted">{t.byMonthFoot}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
