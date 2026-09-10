'use client';

import { useState } from 'react';
import type { Dict } from '@/content/i18n';
import type { Group } from '@/content/types';
import { money } from '@/lib/format';
import { fmt, plural, type Locale } from '@/lib/i18n';
import { Link } from '@/lib/locale';

/**
 * Every plan in the catalogue, in one filterable table. The two toggles are the
 * questions a buyer actually asks first: what does it cost with tax, and what do
 * I save by paying yearly.
 */

export type Row = {
  service: string; slug: string; group: string; plan: string; for: string;
  includes: string; price: number | string; unit: string; metered: boolean;
};

const ANNUAL_DISCOUNT = 0.15;

export default function PricingExplorer({
  locale, t, tc, groups, rows, vat,
}: {
  locale: Locale; t: Dict['pricing']; tc: Dict['common']; groups: Group[]; rows: Row[]; vat: number;
}) {
  const [group, setGroup] = useState<string>('all');
  const [withVat, setWithVat] = useState(false);
  const [annual, setAnnual] = useState(false);

  const shown = group === 'all' ? rows : rows.filter((r) => r.group === group);

  const display = (r: Row) => {
    if (typeof r.price === 'string') return r.price;
    let v = r.price;
    // Annual billing applies to recurring subscriptions, not to metered rates.
    if (annual && !r.metered) v *= 1 - ANNUAL_DISCOUNT;
    if (withVat) v *= 1 + vat / 100;
    return money(locale, v);
  };

  const chip = (active: boolean) =>
    `rounded-sm border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] transition-colors ${
      active ? 'border-ink bg-ink text-paper' : 'border-line-strong text-ink-soft hover:border-ink hover:text-ink'
    }`;

  return (
    <div>
      {/* ---------------------------------------------------- controls */}
      <div className="flex flex-col gap-4 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.filterLabel}>
          <button type="button" onClick={() => setGroup('all')} aria-pressed={group === 'all'} className={chip(group === 'all')}>
            {t.all}
          </button>
          {groups.filter((g) => rows.some((r) => r.group === g.key)).map((g) => (
            <button key={g.key} type="button" onClick={() => setGroup(g.key)} aria-pressed={group === g.key} className={chip(group === g.key)}>
              {g.title}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <label className="flex cursor-pointer items-center gap-2 text-[0.85rem]">
            <input
              type="checkbox"
              checked={annual}
              onChange={(e) => setAnnual(e.target.checked)}
              className="h-4 w-4 rounded-sm border-line-strong text-heat-500 focus:ring-heat-500"
            />
            {t.annual} <span className="font-mono text-[0.72rem] text-ink-faint">{t.annualNote}</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[0.85rem]">
            <input
              type="checkbox"
              checked={withVat}
              onChange={(e) => setWithVat(e.target.checked)}
              className="h-4 w-4 rounded-sm border-line-strong text-heat-500 focus:ring-heat-500"
            />
            {fmt(t.withVat, { vat })}
          </label>
        </div>
      </div>

      <p className="mt-3 font-mono text-[0.7rem] text-ink-faint">
        {fmt(t.showing, { n: shown.length, plans: plural(locale, shown.length, tc.plans) })}
        {annual ? t.showingAnnual : ''}
        {withVat ? fmt(t.showingVat, { vat }) : t.showingNoVat}
        {t.showingMetered}
      </p>

      {/* ------------------------------------------------------- table */}
      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>{t.colProduct}</th>
              <th>{t.colPlan}</th>
              <th>{t.colFor}</th>
              <th>{t.colIncludes}</th>
              <th className="num">{t.colPrice}</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={`${r.slug}-${r.plan}`}>
                <td>
                  <Link href={`/products/${r.slug}/`} className="link-ink font-medium">{r.service}</Link>
                </td>
                <td className="text-ink">{r.plan}</td>
                <td>{r.for}</td>
                <td className="text-[0.82rem]">{r.includes}</td>
                <td className="num whitespace-nowrap">
                  <span className="font-mono text-[0.85rem] text-ink">{display(r)}</span>
                  <span className="ml-1 font-mono text-[0.68rem] text-ink-faint">{r.unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
