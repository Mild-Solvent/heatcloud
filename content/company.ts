// Brand, company identity and regions.
//
// The entity is not incorporated. The identifiers below are explicit
// placeholders rather than invented registration numbers — a fabricated IČO on
// a page shaped like a real company's legal notice is exactly the thing the
// legal notice exists to prevent.

export const site = {
  name: 'HeatCloud',
  nameFull: 'HeatCloud Slovakia',
  tagline: 'The Slovak cloud that heats towns',
  origin: 'https://mild-solvent.github.io/heatcloud',
  vatRate: 23, // Slovak standard rate since 2025-01-01
  updated: '2026-09-09',
  version: '2.1-preview',
} as const;

export const company = {
  legalName: 'HeatCloud Slovakia s. r. o.',
  status: 'in formation (v zakladaní) — not yet incorporated',
  seat: 'Bratislava, Slovak Republic',
  ico: 'not yet assigned',
  dic: 'not yet assigned',
  icdph: 'not yet assigned',
  register: 'to be registered in the Commercial Register of the Bratislava City Court',
  email: 'hello@heatcloud.sk',
  abuse: 'abuse@heatcloud.sk',
  security: 'security@heatcloud.sk',
  dpo: 'privacy@heatcloud.sk',
} as const;

export type Region = {
  code: string; city: string; status: 'in design' | 'planned' | 'candidate';
  heat: string; note: string; mw: number;
};

export const regions: Region[] = [
  {
    code: 'sk-bts-1', city: 'Bratislava', status: 'in design', mw: 5,
    heat: 'Bratislava CHP network (MH Teplárenský holding)',
    note: 'Primary region. Two independent MV feeds, N+1 cooling, heat rejected to the city network above 5 °C ambient.',
  },
  {
    code: 'sk-kos-1', city: 'Košice', status: 'planned', mw: 3,
    heat: 'TEKO / Košice district heat',
    note: 'Second region for in-country redundancy and east-Slovak latency.',
  },
  {
    code: 'sk-zil-1', city: 'Žilina', status: 'candidate', mw: 2,
    heat: 'Žilinská teplárenská',
    note: 'Candidate site; heat offtake term sheet not signed.',
  },
];

// Reference figures from the research dossier. Desk estimates, not engineering.
export const model = {
  gasHeatPrice: 93.4,     // €/MWh, regulated Slovak delivered heat, gas-fired
  recoveredHeatCost: 55,  // €/MWh, delivered cost of recovered heat
  heatDiscount: 0.20,     // contracted discount to the customer's gas cost
  recoveryRatio: 0.95,    // share of electrical input recoverable as heat
  copRange: [4.0, 5.0] as const,
  captureTemp: [40, 50] as const,
  deliveryTemp: [70, 85] as const,
  flatsPerMW: 1000,       // ~5 000 flats per 5 MW
  powerPrice: 110,        // €/MWh, industrial electricity
} as const;
