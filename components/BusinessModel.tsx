'use client';

import { useMemo, useState } from 'react';
import type { Dict } from '@/content/i18n';
import { eurM, num, pct } from '@/lib/format';
import { fmt, type Locale } from '@/lib/i18n';

/**
 * The unit economics of one site, live. Every number below is a desk estimate
 * from the research dossier — the point of making it interactive is that you can
 * push it until it breaks, which is more honest than a single flattering case.
 */

type Inputs = {
  mw: number;              // IT load, MW electrical
  utilisation: number;     // 0–1, share of installed capacity sold and running
  computeRate: number;     // € per kW of sold IT capacity per month
  powerPrice: number;      // € / MWh electricity
  gasHeat: number;         // € / MWh, the utility's delivered gas heat cost
  discount: number;        // 0–1, our discount to that
  offtake: number;         // 0–1, share of recoverable heat the network takes over a year
  cop: number;             // heat pump coefficient of performance
};

const DEFAULTS: Inputs = {
  mw: 5,
  utilisation: 0.75,
  computeRate: 380,
  powerPrice: 110,
  gasHeat: 93.4,
  discount: 0.20,
  offtake: 0.45,
  cop: 4.5,
};

const PUE = 1.15;               // facility overhead beyond IT load
const RECOVERY = 0.95;          // share of IT electricity recoverable as heat
const HEAT_MAINT = 4;           // € / MWh delivered, maintenance on the thermal kit
const OPEX_PER_MW = 800_000;    // € / MW / year — staff, sales, support, network, licences, spares
const CAPEX_IT_PER_MW = 6_800_000;
const CAPEX_HEAT_PER_MW = 1_100_000;

function model(i: Inputs) {
  const hours = 8760;
  const itEnergy = i.mw * i.utilisation * hours;          // MWh/yr of IT load
  const facilityEnergy = itEnergy * PUE;

  const computeRevenue = i.mw * i.utilisation * 1000 * i.computeRate * 12;

  const recoverable = itEnergy * RECOVERY;                 // MWh thermal available
  const delivered = recoverable * i.offtake;               // MWh actually taken
  const heatPrice = i.gasHeat * (1 - i.discount);
  const heatRevenue = delivered * heatPrice;

  const pumpEnergy = delivered / i.cop;                    // MWh electricity to lift it
  const powerCost = (facilityEnergy + pumpEnergy) * i.powerPrice;
  const heatOpex = delivered * HEAT_MAINT;
  const otherOpex = i.mw * OPEX_PER_MW;

  const revenue = computeRevenue + heatRevenue;
  const opex = powerCost + heatOpex + otherOpex;
  const ebitda = revenue - opex;

  // The same site with the heat contract switched off: heat revenue and its
  // costs disappear, everything else is unchanged.
  const ebitdaNoHeat = computeRevenue - (facilityEnergy * i.powerPrice + otherOpex);

  const capex = i.mw * (CAPEX_IT_PER_MW + CAPEX_HEAT_PER_MW);
  const payback = ebitda > 0 ? capex / ebitda : Infinity;

  const flats = Math.round((delivered / 8.5) / 10) * 10;   // ~8.5 MWh/yr per Slovak flat
  const co2 = delivered * 0.202;                           // t CO2 per MWh of gas heat displaced

  return {
    itEnergy, facilityEnergy, computeRevenue, recoverable, delivered, heatPrice, heatRevenue,
    pumpEnergy, powerCost, heatOpex, otherOpex, revenue, opex, ebitda, ebitdaNoHeat, capex,
    payback, flats, co2,
    margin: revenue > 0 ? ebitda / revenue : 0,
    heatShare: revenue > 0 ? heatRevenue / revenue : 0,
  };
}

function Slider({
  label, value, min, max, step, onChange, format, hint,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void; format: (n: number) => string; hint?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="text-[0.86rem] font-medium text-ink">{label}</label>
        <span className="font-mono text-[0.78rem] tabular-nums text-ink">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      {hint ? <p className="mt-2 text-[0.75rem] leading-snug text-ink-faint">{hint}</p> : null}
    </div>
  );
}

function Bar({ label, value, max, color, locale }: { label: string; value: number; max: number; color: string; locale: Locale }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-[0.84rem]">
        <span className="text-ink-soft">{label}</span>
        <span className="font-mono text-[0.78rem] tabular-nums text-ink">{eurM(locale, value)}</span>
      </div>
      <div className="h-[6px] overflow-hidden bg-paper-2">
        <div className={`h-full ${color} transition-[width] duration-300`} style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

export default function BusinessModel({ locale, t }: { locale: Locale; t: Dict['model'] }) {
  const [i, setI] = useState<Inputs>(DEFAULTS);
  const set = <K extends keyof Inputs>(k: K) => (v: number) => setI((p) => ({ ...p, [k]: v }));
  const m = useMemo(() => model(i), [i]);

  const maxBar = Math.max(m.computeRevenue, m.heatRevenue, m.powerCost, m.otherOpex);
  const heatDelta = m.ebitda - m.ebitdaNoHeat;

  // €380/kW/mo vs 380 €/kW/mes.
  const eurUnit = (n: number, unit: string, dp = 0) =>
    locale === 'sk' ? `${num(locale, n, dp)} €${unit}` : `€${num(locale, n, dp)}${unit}`;
  const n0 = (n: number) => num(locale, Math.round(n));
  const label = 'font-mono text-label uppercase text-ink-muted';
  const big = 'mt-3 font-display text-[2.1rem] leading-none tracking-tight tabular';

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* ------------------------------------------------------- inputs */}
      <div className="min-w-0 rounded-md border border-line bg-card p-6">
        <div className="mb-6 flex items-baseline justify-between border-b border-line pb-3">
          <h3 className="font-display text-[1.2rem]">{t.assumptions}</h3>
          <button
            type="button"
            onClick={() => setI(DEFAULTS)}
            className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-muted underline underline-offset-4 hover:text-ink"
          >
            {t.reset}
          </button>
        </div>

        <div className="space-y-6">
          <Slider label={t.itLoad} value={i.mw} min={1} max={20} step={0.5}
            onChange={set('mw')} format={(n) => `${num(locale, n, n % 1 ? 1 : 0)} MW`}
            hint={t.itLoadHint} />
          <Slider label={t.utilisation} value={i.utilisation} min={0.3} max={0.95} step={0.05}
            onChange={set('utilisation')} format={(n) => pct(locale, n)}
            hint={t.utilisationHint} />
          <Slider label={t.computePrice} value={i.computeRate} min={120} max={900} step={10}
            onChange={set('computeRate')} format={(n) => eurUnit(n, t.computeUnit)}
            hint={t.computePriceHint} />
          <Slider label={t.powerPrice} value={i.powerPrice} min={50} max={250} step={5}
            onChange={set('powerPrice')} format={(n) => eurUnit(n, '/MWh')} />

          <div className="border-t border-line pt-6">
            <p className="mb-5 font-mono text-label uppercase text-heat-600">{t.heatContract}</p>
            <div className="space-y-6">
              <Slider label={t.gasHeat} value={i.gasHeat} min={50} max={150} step={0.5}
                onChange={set('gasHeat')} format={(n) => eurUnit(n, '/MWh', n % 1 ? 1 : 0)}
                hint={t.gasHeatHint} />
              <Slider label={t.discount} value={i.discount} min={0} max={0.45} step={0.01}
                onChange={set('discount')} format={(n) => pct(locale, n)}
                hint={t.discountHint} />
              <Slider label={t.offtake} value={i.offtake} min={0} max={0.85} step={0.05}
                onChange={set('offtake')} format={(n) => pct(locale, n)}
                hint={t.offtakeHint} />
              <Slider label={t.cop} value={i.cop} min={2.5} max={6} step={0.1}
                onChange={set('cop')} format={(n) => num(locale, n, 1)}
                hint={t.copHint} />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ outputs */}
      <div className="min-w-0 space-y-6">
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
          <div className="bg-card p-5">
            <p className={label}>{t.revenueYear}</p>
            <p className={big}>{eurM(locale, m.revenue)}</p>
            <p className="mt-2.5 text-[0.79rem] text-ink-muted">{fmt(t.fromHeat, { pct: pct(locale, m.heatShare) })}</p>
          </div>
          <div className="bg-card p-5">
            <p className={label}>{t.ebitdaYear}</p>
            <p className={`${big} ${m.ebitda >= 0 ? 'text-ink' : 'text-alert'}`}>{eurM(locale, m.ebitda)}</p>
            <p className="mt-2.5 text-[0.79rem] text-ink-muted">{fmt(t.margin, { pct: pct(locale, m.margin) })}</p>
          </div>
          <div className="bg-heat-50 p-5">
            <p className="font-mono text-label uppercase text-heat-700">{t.heatAdds}</p>
            <p className={`${big} text-heat-600`}>
              {heatDelta >= 0 ? '+' : ''}{eurM(locale, heatDelta)}
            </p>
            <p className="mt-2.5 text-[0.79rem] text-heat-800/80">{fmt(t.ebitdaNoHeat, { v: eurM(locale, m.ebitdaNoHeat) })}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="min-w-0 rounded-md border border-line bg-card p-6">
            <h3 className="mb-5 font-display text-[1.15rem]">{t.whereFrom}</h3>
            <div className="space-y-4">
              <Bar label={t.computeRevenue} value={m.computeRevenue} max={maxBar} color="bg-water-500" locale={locale} />
              <Bar label={t.heatRevenue} value={m.heatRevenue} max={maxBar} color="bg-heat-500" locale={locale} />
            </div>
            <h3 className="mb-5 mt-8 font-display text-[1.15rem]">{t.whereTo}</h3>
            <div className="space-y-4">
              <Bar label={t.electricity} value={m.powerCost} max={maxBar} color="bg-night-700" locale={locale} />
              <Bar label={t.staff} value={m.otherOpex} max={maxBar} color="bg-ink-faint" locale={locale} />
              <Bar label={t.thermalMaint} value={m.heatOpex} max={maxBar} color="bg-paper-3" locale={locale} />
            </div>
          </div>

          <div className="rounded-md border border-line bg-card p-6">
            <h3 className="mb-4 font-display text-[1.15rem]">{t.physical}</h3>
            <dl className="kv text-[0.87rem]">
              {[
                [t.itConsumed, `${n0(m.itEnergy)} ${t.mwhYr}`],
                [t.recoverable, `${n0(m.recoverable)} ${t.mwhYr}`],
                [t.delivered, `${n0(m.delivered)} ${t.mwhYr}`],
                [t.heatPrice, eurUnit(m.heatPrice, '/MWh', 1)],
                [t.pumpEnergy, `${n0(m.pumpEnergy)} ${t.mwhYr}`],
                [t.flats, `~${num(locale, m.flats)}`],
                [t.co2, `${n0(m.co2)} ${t.tYr}`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-ink-muted">{k}</dt>
                  <dd className="font-mono text-[0.8rem] tabular-nums text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-t border-ink pt-4">
              <div className="flex items-baseline justify-between text-[0.87rem]">
                <span className="text-ink-muted">{t.capex}</span>
                <span className="font-mono text-[0.8rem] tabular-nums text-ink">{eurM(locale, m.capex)}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between text-[0.87rem]">
                <span className="text-ink-muted">{t.payback}</span>
                <span className="font-mono text-[0.8rem] tabular-nums text-ink">
                  {Number.isFinite(m.payback) ? fmt(t.years, { n: num(locale, m.payback, 1) }) : t.never}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-md border border-line bg-card p-6">
          <h3 className="mb-1 font-display text-[1.15rem]">{t.sensTitle}</h3>
          <p className="mb-2 text-[0.84rem] text-ink-muted">{t.sensLede}</p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>{t.sensGas}</th>
                  <th className="num">{t.sensOurPrice}</th>
                  <th className="num">{t.sensHeatRevenue}</th>
                  <th className="num">{t.sensEbitda}</th>
                  <th className="num">{t.sensVsNoHeat}</th>
                </tr>
              </thead>
              <tbody>
                {[60, 75, 93.4, 110, 130].map((g) => {
                  const s = model({ ...i, gasHeat: g });
                  return (
                    <tr key={g} className={Math.abs(g - i.gasHeat) < 0.05 ? 'hl' : ''}>
                      <td>{eurUnit(g, '/MWh', g % 1 ? 1 : 0)}{g === 93.4 ? ` — ${t.sensToday}` : ''}</td>
                      <td className="num">{eurUnit(s.heatPrice, '', 1)}</td>
                      <td className="num">{eurM(locale, s.heatRevenue)}</td>
                      <td className="num">{eurM(locale, s.ebitda)}</td>
                      <td className="num font-medium text-heat-700">+{eurM(locale, s.ebitda - s.ebitdaNoHeat)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-[0.79rem] leading-relaxed text-ink-faint">{t.footnote}</p>
      </div>
    </div>
  );
}
