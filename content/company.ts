// Brand, company identity and regions.
//
// The entity is not incorporated. The identifiers below are explicit
// placeholders rather than invented registration numbers — a fabricated IČO on
// a page shaped like a real company's legal notice is exactly the thing the
// legal notice exists to prevent. The wording of the status, seat and register
// lines lives in the dictionaries (content/i18n) so each language reads well.

export const site = {
  name: 'HeatCloud',
  nameFull: 'HeatCloud Slovakia',
  origin: 'https://mild-solvent.github.io/heatcloud',
  dossier: 'https://mild-solvent.github.io/heatcloud-slovakia/',
  vatRate: 23, // Slovak standard rate since 2025-01-01
  updated: '2026-09-09',
  version: '3.0-preview',
} as const;

export const company = {
  legalName: 'HeatCloud Slovakia s. r. o.',
  email: 'hello@heatcloud.sk',
  abuse: 'abuse@heatcloud.sk',
  security: 'security@heatcloud.sk',
  dpo: 'privacy@heatcloud.sk',
} as const;

export type RegionCode = 'sk-bts-1' | 'sk-kos-1' | 'sk-zil-1';
export type Region = {
  code: RegionCode; city: string; status: 'in design' | 'planned' | 'candidate'; mw: number;
};

export const regions: Region[] = [
  { code: 'sk-bts-1', city: 'Bratislava', status: 'in design', mw: 5 },
  { code: 'sk-kos-1', city: 'Košice', status: 'planned', mw: 3 },
  { code: 'sk-zil-1', city: 'Žilina', status: 'candidate', mw: 2 },
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
