'use client';

import { useMemo, useState } from 'react';

/**
 * The unit economics of one site, live. Every number below is a desk estimate
 * from the research dossier — the point of making it interactive is that you can
 * push it until it breaks, which is more honest than a single flattering case.
 */

const eur = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

const eurM = (n: number) =>
  Math.abs(n) >= 1_000_000
    ? `€${(n / 1_000_000).toFixed(Math.abs(n) >= 10_000_000 ? 1 : 2)}m`
    : eur(n);

const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

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
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label className="text-[0.86rem] font-semibold text-ink">{label}</label>
        <span className="rounded-md bg-sand-200 px-2 py-0.5 font-mono text-[0.8rem] tabular-nums text-ink">
          {format(value)}
        </span>
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
      {hint ? <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-faint">{hint}</p> : null}
    </div>
  );
}

function Bar({ label, value, max, color, money }: { label: string; value: number; max: number; color: string; money?: boolean }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-[0.83rem]">
        <span className="text-ink-soft">{label}</span>
        <span className="font-semibold tabular-nums">{money ? eurM(value) : value.toFixed(0)}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-sand-200">
        <div className={`h-full rounded-full ${color} transition-[width] duration-300`} style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

export default function BusinessModel() {
  const [i, setI] = useState<Inputs>(DEFAULTS);
  const set = <K extends keyof Inputs>(k: K) => (v: number) => setI((p) => ({ ...p, [k]: v }));
  const m = useMemo(() => model(i), [i]);

  const maxBar = Math.max(m.computeRevenue, m.heatRevenue, m.powerCost, m.otherOpex);
  const heatDelta = m.ebitda - m.ebitdaNoHeat;

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      {/* ------------------------------------------------------- inputs */}
      <div className="min-w-0 rounded-2xl border border-sand-300 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[1.02rem] font-bold">Assumptions</h3>
          <button
            type="button"
            onClick={() => setI(DEFAULTS)}
            className="rounded-full border border-sand-300 px-3 py-1 text-[0.76rem] font-semibold text-ink-muted hover:border-ink-faint hover:text-ink"
          >
            Reset
          </button>
        </div>

        <div className="space-y-5">
          <Slider label="IT load" value={i.mw} min={1} max={20} step={0.5}
            onChange={set('mw')} format={(n) => `${n} MW`}
            hint="Electrical load of the servers themselves, excluding cooling." />
          <Slider label="Utilisation" value={i.utilisation} min={0.3} max={0.95} step={0.05}
            onChange={set('utilisation')} format={pct}
            hint="Share of installed capacity actually sold and running." />
          <Slider label="Compute price" value={i.computeRate} min={120} max={900} step={10}
            onChange={set('computeRate')} format={(n) => `€${n}/kW/mo`}
            hint="Blended monthly revenue per kW of sold IT capacity. Wholesale colocation sits near €150; selling the same rack as cloud VMs is several hundred." />
          <Slider label="Electricity price" value={i.powerPrice} min={50} max={250} step={5}
            onChange={set('powerPrice')} format={(n) => `€${n}/MWh`} />

          <div className="border-t border-sand-200 pt-5">
            <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ember-600">Heat contract</p>
            <div className="space-y-5">
              <Slider label="Utility's gas heat cost" value={i.gasHeat} min={50} max={150} step={0.5}
                onChange={set('gasHeat')} format={(n) => `€${n}/MWh`}
                hint="The regulated Slovak delivered heat price is around €93/MWh." />
              <Slider label="Our discount to it" value={i.discount} min={0} max={0.45} step={0.01}
                onChange={set('discount')} format={pct}
                hint="What the utility saves. Below about 10% they have no reason to sign." />
              <Slider label="Annual offtake" value={i.offtake} min={0} max={0.85} step={0.05}
                onChange={set('offtake')} format={pct}
                hint="Share of recoverable heat the network takes across the year. Summer demand collapses, so this is never near 100%." />
              <Slider label="Heat pump COP" value={i.cop} min={2.5} max={6} step={0.1}
                onChange={set('cop')} format={(n) => n.toFixed(1)}
                hint="Units of heat delivered per unit of electricity consumed lifting it." />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ outputs */}
      <div className="min-w-0 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-sand-300 bg-white p-5">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Revenue / year</p>
            <p className="mt-2 text-[1.9rem] font-bold leading-none tracking-tight tabular-nums">{eurM(m.revenue)}</p>
            <p className="mt-2 text-[0.79rem] text-ink-muted">
              {pct(m.heatShare)} of it from heat
            </p>
          </div>
          <div className="rounded-2xl border border-sand-300 bg-white p-5">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-faint">EBITDA / year</p>
            <p className={`mt-2 text-[1.9rem] font-bold leading-none tracking-tight tabular-nums ${
              m.ebitda >= 0 ? 'text-ink' : 'text-red-600'
            }`}>
              {eurM(m.ebitda)}
            </p>
            <p className="mt-2 text-[0.79rem] text-ink-muted">{pct(m.margin)} margin</p>
          </div>
          <div className="rounded-2xl border-2 border-ember-300 bg-ember-50 p-5">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ember-700">What the heat adds</p>
            <p className="mt-2 text-[1.9rem] font-bold leading-none tracking-tight tabular-nums text-ember-700">
              {heatDelta >= 0 ? '+' : ''}{eurM(heatDelta)}
            </p>
            <p className="mt-2 text-[0.79rem] text-ember-700/80">
              EBITDA without the heat contract: {eurM(m.ebitdaNoHeat)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-sand-300 bg-white p-6">
            <h3 className="mb-4 text-[0.95rem] font-bold">Where the money comes from</h3>
            <div className="space-y-3.5">
              <Bar label="Compute revenue" value={m.computeRevenue} max={maxBar} color="bg-teal-600" money />
              <Bar label="Heat revenue" value={m.heatRevenue} max={maxBar} color="bg-ember-500" money />
            </div>
            <h3 className="mb-4 mt-6 text-[0.95rem] font-bold">Where it goes</h3>
            <div className="space-y-3.5">
              <Bar label="Electricity" value={m.powerCost} max={maxBar} color="bg-night-700" money />
              <Bar label="Staff, network, spares" value={m.otherOpex} max={maxBar} color="bg-ink-faint" money />
              <Bar label="Thermal maintenance" value={m.heatOpex} max={maxBar} color="bg-sand-400" money />
            </div>
          </div>

          <div className="rounded-2xl border border-sand-300 bg-white p-6">
            <h3 className="mb-4 text-[0.95rem] font-bold">What the site physically does</h3>
            <dl className="space-y-3 text-[0.87rem]">
              {[
                ['IT electricity consumed', `${Math.round(m.itEnergy).toLocaleString('en-IE')} MWh/yr`],
                ['Heat recoverable', `${Math.round(m.recoverable).toLocaleString('en-IE')} MWh/yr`],
                ['Heat actually delivered', `${Math.round(m.delivered).toLocaleString('en-IE')} MWh/yr`],
                ['Price we sell heat at', `€${m.heatPrice.toFixed(1)}/MWh`],
                ['Electricity to lift it', `${Math.round(m.pumpEnergy).toLocaleString('en-IE')} MWh/yr`],
                ['Flats heated', `~${m.flats.toLocaleString('en-IE')}`],
                ['Gas CO₂ displaced', `${Math.round(m.co2).toLocaleString('en-IE')} t/yr`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-sand-200 pb-2 last:border-0">
                  <dt className="text-ink-muted">{k}</dt>
                  <dd className="font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-xl bg-sand-100 p-4">
              <div className="flex items-baseline justify-between text-[0.87rem]">
                <span className="text-ink-muted">Capex, both halves</span>
                <span className="font-semibold tabular-nums">{eurM(m.capex)}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between text-[0.87rem]">
                <span className="text-ink-muted">Simple payback</span>
                <span className="font-semibold tabular-nums">
                  {Number.isFinite(m.payback) ? `${m.payback.toFixed(1)} years` : 'never at these inputs'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-sand-300 bg-sand-50 p-6">
          <h3 className="mb-1 text-[0.95rem] font-bold">Sensitivity — EBITDA against the gas price the heat is indexed to</h3>
          <p className="mb-4 text-[0.82rem] text-ink-muted">
            Everything else held at your current settings. This is the line that decides whether a
            heat contract is worth signing for either side.
          </p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Utility&apos;s gas heat cost</th>
                  <th className="num">Our heat price</th>
                  <th className="num">Heat revenue</th>
                  <th className="num">EBITDA</th>
                  <th className="num">vs no heat contract</th>
                </tr>
              </thead>
              <tbody>
                {[60, 75, 93.4, 110, 130].map((g) => {
                  const s = model({ ...i, gasHeat: g });
                  return (
                    <tr key={g} className={Math.abs(g - i.gasHeat) < 0.05 ? 'bg-ember-50' : ''}>
                      <td>€{g.toFixed(1)}/MWh{g === 93.4 ? ' — today' : ''}</td>
                      <td className="num">€{s.heatPrice.toFixed(1)}</td>
                      <td className="num">{eurM(s.heatRevenue)}</td>
                      <td className="num">{eurM(s.ebitda)}</td>
                      <td className="num font-semibold text-ember-700">+{eurM(s.ebitda - s.ebitdaNoHeat)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-[0.79rem] leading-relaxed text-ink-faint">
          Desk estimates for evaluation. Capex is assumed at €6.8m/MW for the datacenter and
          €1.1m/MW for the thermal plant; overhead opex at €800k/MW/year; PUE 1.15; heat recovery
          95% of IT load; a Slovak flat at 8.5 MWh/year; gas heat at 0.202 t CO₂/MWh. These are not
          engineering figures, not an offer, and not investment advice.
        </p>
      </div>
    </div>
  );
}
