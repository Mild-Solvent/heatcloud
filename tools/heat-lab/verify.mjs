// Checks the browser ports against reference results produced by the original Python
// package (heat_reuse.annual / heat_reuse.pool) and the saved Simulink cooling-fault runs.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEF, SCEN, simulate } from './model.mjs';
import { runPool } from './pool.mjs';
import { coolSim } from './cool.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const json = (f) => JSON.parse(readFileSync(join(here, f), 'utf8'));
const D = json('data.json'), ref = json('ref.json'), poolRef = json('poolref.json');
let fail = 0;
const check = (name, got, want, tol) => {
  let worst = 0;
  for (const k in want) { if (want[k] == null) continue; worst = Math.max(worst, Math.abs(got[k] - want[k]) / Math.max(1e-9, Math.abs(want[k]))); }
  const ok = worst <= tol; if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name.padEnd(28)} max rel. error ${worst.toExponential(2)}`);
};
// Annual inputs in data.json are rounded to 4 decimals, so allow 1e-6.
for (const s in SCEN) check('annual ' + s, simulate(D.syn_T, D.IT, { ...DEF, ...SCEN[s] }).m, ref[s], 1e-6);
const cfgs = { noTES: { tes_enabled: false }, noHX: { hx_enabled: false }, noHPpool: { hp_pool_enabled: false }, noDH: { dh_enabled: false }, noIT: { it_enabled: false }, hp100: { hp_thermal_limit_kw: 100, hp_electric_limit_kw: 30 }, vol1000: { volume_m3: 1000, source_temperature_offset_C: 5 } };
for (const k in poolRef) check('pool ' + k, runPool(cfgs[k] ? 'zaklad' : k, cfgs[k] || {}, D.forcing).m, poolRef[k], 1e-12);
// Saved results from the repository's Simulink run (IT_cooling_failsafe_simulink_results.json).
const cool = [[6, 0, 30, false, 36.439037341579962], [7, .1, 30, false, 35.719518670789981], [7, .1, 300, false, 42.195186707899808], [6, .1, 30, false, 122.75729388068814], [7, .2, 30, false, 70.736093982567013], [7, .1, 30, true, 37.878074683159952]];
for (const [u, d, dur, p, tmax] of cool) {
  const r = coolSim({ units: u, derate: d, dur, pumpFault: p });
  check(`cooling ${u}x2MW -${d * 100}% ${dur}s${p ? ' pump' : ''}`, { t: Math.max(...r.map((x) => x.T)) }, { t: tmax }, 1e-12);
}
if (fail) { console.error(fail + ' check(s) failed'); process.exit(1); }
console.log('all checks passed');
