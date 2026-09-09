'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { groups, services } from '@/content/services';
import { site } from '@/content/company';

/**
 * Every plan in the catalogue, in one filterable table. The two toggles are the
 * questions a buyer actually asks first: what does it cost with tax, and what do
 * I save by paying yearly.
 */

type Row = {
  service: string; slug: string; group: string; plan: string; for: string;
  includes: string; price: string; unit: string; numeric: number | null;
};

const ANNUAL_DISCOUNT = 0.15;

// "€11.90" -> 11.9 ; "−50%" / "+100%" / "€0.0061" all handled or skipped.
function parsePrice(p: string): number | null {
  const m = p.match(/^€([\d.]+)$/);
  return m ? Number(m[1]) : null;
}

function buildRows(): Row[] {
  return services.flatMap((s) =>
    (s.plans || []).map((p) => ({
      service: s.name,
      slug: s.slug,
      group: s.group,
      plan: p.name,
      for: p.for,
      includes: p.specs.map((x) => [x[0], x[1]].filter(Boolean).join(' ')).join(', '),
      price: p.price,
      unit: p.unit || '/month',
      numeric: parsePrice(p.price),
    })),
  );
}

export default function PricingExplorer() {
  const [group, setGroup] = useState<string>('all');
  const [withVat, setWithVat] = useState(false);
  const [annual, setAnnual] = useState(false);
  const rows = useMemo(buildRows, []);

  const shown = group === 'all' ? rows : rows.filter((r) => r.group === group);

  const display = (r: Row) => {
    if (r.numeric === null) return r.price;
    let v = r.numeric;
    // Annual billing applies to recurring subscriptions, not to metered rates.
    const recurring = r.unit.includes('month') || r.unit.includes('year');
    if (annual && recurring) v *= 1 - ANNUAL_DISCOUNT;
    if (withVat) v *= 1 + site.vatRate / 100;
    const dp = v < 1 ? 4 : 2;
    return `€${v.toFixed(dp)}`;
  };

  return (
    <div>
      {/* ---------------------------------------------------- controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-sand-300 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by product group">
          <button
            type="button"
            onClick={() => setGroup('all')}
            aria-pressed={group === 'all'}
            className={`rounded-full px-3.5 py-1.5 text-[0.83rem] font-semibold transition ${
              group === 'all' ? 'bg-ink text-white' : 'bg-sand-100 text-ink-soft hover:bg-sand-200'
            }`}
          >
            All
          </button>
          {groups.filter((g) => rows.some((r) => r.group === g.key)).map((g) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setGroup(g.key)}
              aria-pressed={group === g.key}
              className={`rounded-full px-3.5 py-1.5 text-[0.83rem] font-semibold transition ${
                group === g.key ? 'bg-ink text-white' : 'bg-sand-100 text-ink-soft hover:bg-sand-200'
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-[0.85rem] font-medium">
            <input
              type="checkbox"
              checked={annual}
              onChange={(e) => setAnnual(e.target.checked)}
              className="h-4 w-4 rounded border-sand-400 text-ember-600 focus:ring-ember-500"
            />
            Annual billing <span className="text-ink-faint">(−15%)</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[0.85rem] font-medium">
            <input
              type="checkbox"
              checked={withVat}
              onChange={(e) => setWithVat(e.target.checked)}
              className="h-4 w-4 rounded border-sand-400 text-ember-600 focus:ring-ember-500"
            />
            Show with {site.vatRate}% VAT
          </label>
        </div>
      </div>

      <p className="mt-3 text-[0.8rem] text-ink-faint">
        Showing {shown.length} plans{annual ? ', annual rate on recurring subscriptions' : ''}
        {withVat ? `, including ${site.vatRate}% Slovak VAT` : ', excluding VAT'}. Metered rates are
        not discounted for annual billing.
      </p>

      {/* ------------------------------------------------------- table */}
      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Plan</th>
              <th>For</th>
              <th>Includes</th>
              <th className="num">Price</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={`${r.slug}-${r.plan}`}>
                <td>
                  <Link href={`/products/${r.slug}/`} className="font-semibold text-teal-600 hover:underline">
                    {r.service}
                  </Link>
                </td>
                <td className="font-medium text-ink">{r.plan}</td>
                <td>{r.for}</td>
                <td className="text-[0.82rem]">{r.includes}</td>
                <td className="num">
                  <span className="font-bold text-ink">{display(r)}</span>
                  <span className="ml-1 text-[0.76rem] text-ink-faint">{r.unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
