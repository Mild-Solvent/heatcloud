'use client';

import { useState, type KeyboardEvent } from 'react';
import type { ZoneId, floorPlan } from '@/content/floorPlan';

type Copy = (typeof floorPlan)['en'];

/*
 * Schematic plan of the pilot annex, drawn in metres and scaled to 40 px/m.
 * Room outlines are the clickable zones; pipes and cables are drawn on top and
 * ignore pointer events. Coordinates match the sizes quoted in content/floorPlan.ts.
 */
const S = 40;
const O = 40;
const m = (v: number) => O + v * S;

const ROOMS: { id: ZoneId; x: number; y: number; w: number; h: number; outdoor?: boolean; existing?: boolean }[] = [
  { id: 'it', x: 1, y: 1, w: 10, h: 6 },
  { id: 'cdu', x: 11, y: 1, w: 3, h: 6 },
  { id: 'heat', x: 14, y: 1, w: 5, h: 6 },
  { id: 'power', x: 1, y: 7, w: 6.5, h: 4 },
  { id: 'control', x: 7.5, y: 7, w: 3.5, h: 4 },
  { id: 'dry', x: 11.5, y: 9.6, w: 4.5, h: 2, outdoor: true },
  { id: 'boiler', x: 20.5, y: 0, w: 5.5, h: 12, existing: true },
];

export function FloorPlan({ t }: { t: Copy }) {
  const [sel, setSel] = useState<ZoneId | null>('it');
  const zone = t.zones.find((z) => z.id === sel);
  const L = t.svg;
  const labels: Record<ZoneId, string> = { it: L.it, cdu: L.cdu, heat: L.heat, tank: L.tank, power: L.power, control: L.control, dry: L.dry, boiler: L.boiler };

  const pick = (id: ZoneId) => setSel(sel === id ? null : id);
  const key = (id: ZoneId) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(id); }
  };
  const zoneProps = (id: ZoneId) => ({
    role: 'button' as const, tabIndex: 0, 'aria-pressed': sel === id, 'aria-label': t.zones.find((z) => z.id === id)?.name,
    onClick: () => pick(id), onKeyDown: key(id), className: `fp-zone${sel === id ? ' is-on' : ''}`,
  });

  return (
    <div className="fp-grid">
      <div className="fp-canvas">
        <svg viewBox="0 0 1160 580" role="img" aria-labelledby="fp-title" className="fp-svg">
          <title id="fp-title">{t.planTitle.replace('\n', ' ')}</title>
          <defs>
            <pattern id="fp-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" className="fp-hatch-line" />
            </pattern>
            <marker id="fp-arrow-h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" className="fp-fill-heat" /></marker>
            <marker id="fp-arrow-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" className="fp-fill-water" /></marker>
            <marker id="fp-arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" className="fp-fill-power" /></marker>
          </defs>

          {/* yard behind everything */}
          <rect x={m(11)} y={m(7)} width={8 * S} height={5 * S} className="fp-yard" />
          <text x={m(18.8)} y={m(11.8)} textAnchor="end" className="fp-note">{L.yard}</text>

          {ROOMS.map((r) => (
            <g key={r.id} {...zoneProps(r.id)}>
              <rect x={m(r.x)} y={m(r.y)} width={r.w * S} height={r.h * S}
                className={r.existing ? 'fp-room fp-existing' : r.outdoor ? 'fp-room fp-outdoor' : 'fp-room'} />
              <text x={m(r.x) + 10} y={m(r.y) + 20} className="fp-room-label">{labels[r.id]}</text>
              {r.existing && <text x={m(r.x) + 10} y={m(r.y) + 36} className="fp-note">{L.existing}</text>}
            </g>
          ))}

          {/* tank: a round zone in the yard */}
          <g {...zoneProps('tank')}>
            <circle cx={m(17.6)} cy={m(8.7)} r={1.1 * S} className="fp-room fp-tank" />
            <text x={m(17.6)} y={m(8.7) - 2} textAnchor="middle" className="fp-room-label fp-small">{L.tank}</text>
            <text x={m(17.6)} y={m(8.7) + 13} textAnchor="middle" className="fp-note">10 m³</text>
          </g>

          {/* equipment, decorative */}
          <g className="fp-equip" aria-hidden="true">
            {/* aisle containment + 8 racks */}
            <rect x={m(2.5)} y={m(2.6)} width={7 * S} height={2.8 * S} className="fp-contain" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={m(2.8 + i * 0.8)} y={m(3.4)} width={0.72 * S} height={1.2 * S} className={i < 6 ? 'fp-rack' : 'fp-rack fp-rack-spare'} />
            ))}
            <text x={m(2.8)} y={m(5.2)} className="fp-note">6 × {L.rack} ≈ 40 kW</text>
            <text x={m(7.6)} y={m(5.2)} className="fp-note">2 × {L.spare}</text>
            {/* CDUs N+1 */}
            <rect x={m(11.7)} y={m(2)} width={1.6 * S} height={1.1 * S} className="fp-box" />
            <rect x={m(11.7)} y={m(4.3)} width={1.6 * S} height={1.1 * S} className="fp-box" />
            <text x={m(12.5)} y={m(2.65)} textAnchor="middle" className="fp-note">CDU A</text>
            <text x={m(12.5)} y={m(4.95)} textAnchor="middle" className="fp-note">CDU B</text>
            {/* heat plant */}
            <rect x={m(14.5)} y={m(1.7)} width={1.3 * S} height={2.2 * S} className="fp-box" />
            <text x={m(15.15)} y={m(4.3)} textAnchor="middle" className="fp-note">{L.hx}</text>
            <rect x={m(16.3)} y={m(1.7)} width={2.3 * S} height={2.2 * S} className="fp-box fp-box-heat" />
            <text x={m(17.45)} y={m(4.3)} textAnchor="middle" className="fp-note">{L.hp}</text>
            {[15.3, 16.3, 17.3].map((x) => <circle key={x} cx={m(x)} cy={m(5.4)} r={0.3 * S} className="fp-box" />)}
            <text x={m(16.3)} y={m(6.3)} textAnchor="middle" className="fp-note">{L.pumps}</text>
            {/* electrical */}
            <rect x={m(1.5)} y={m(7.8)} width={2 * S} height={2 * S} className="fp-box" />
            <text x={m(2.5)} y={m(10.3)} textAnchor="middle" className="fp-note">{L.trafo}</text>
            <rect x={m(4.1)} y={m(7.8)} width={3 * S} height={0.8 * S} className="fp-box" />
            <text x={m(5.6)} y={m(8.3)} textAnchor="middle" className="fp-note">{L.lv}</text>
            <rect x={m(4.1)} y={m(9.1)} width={3 * S} height={1.3 * S} className="fp-box" />
            <text x={m(5.6)} y={m(9.85)} textAnchor="middle" className="fp-note">{L.ups}</text>
            {/* control desk + door */}
            <rect x={m(8)} y={m(7.6)} width={2.4 * S} height={0.7 * S} className="fp-box" />
            <line x1={m(9)} y1={m(11)} x2={m(10)} y2={m(11)} className="fp-door" />
            <text x={m(9.5)} y={m(11.6)} textAnchor="middle" className="fp-note">↑ {L.entrance}</text>
            {/* boiler house header + boilers */}
            <rect x={m(21.2)} y={m(1.5)} width={0.6 * S} height={6 * S} className="fp-box fp-box-heat" />
            {[2, 5, 8.5].map((y) => <rect key={y} x={m(23)} y={m(y)} width={2.3 * S} height={2 * S} rx="30" className="fp-box" />)}
          </g>

          {/* pipes and cables */}
          <g className="fp-lines" aria-hidden="true">
            {/* supply: CDU → HX → HP → header */}
            <path d={`M${m(13.3)} ${m(2.5)} H${m(14.5)}`} className="fp-pipe-heat" />
            <path d={`M${m(15.8)} ${m(2.5)} H${m(16.3)}`} className="fp-pipe-heat" />
            <path d={`M${m(18.6)} ${m(2.2)} H${m(21.2)}`} className="fp-pipe-heat" markerEnd="url(#fp-arrow-h)" />
            {/* return: header → pumps → CDU */}
            <path d={`M${m(21.2)} ${m(6.2)} H${m(17.6)}`} className="fp-pipe-water" markerEnd="url(#fp-arrow-w)" />
            <path d={`M${m(15)} ${m(5.4)} H${m(13.3)}`} className="fp-pipe-water" markerEnd="url(#fp-arrow-w)" />
            {/* tank branch */}
            <path d={`M${m(18.2)} ${m(2.2)} V${m(7.6)}`} className="fp-pipe-heat" />
            <path d={`M${m(17)} ${m(7.6)} V${m(6.2)}`} className="fp-pipe-water" />
            {/* dry cooler branch */}
            <path d={`M${m(12.2)} ${m(5.4)} V${m(9.6)}`} className="fp-pipe-heat fp-dash" markerEnd="url(#fp-arrow-h)" />
            <path d={`M${m(13.4)} ${m(9.6)} V${m(5.6)}`} className="fp-pipe-water fp-dash" markerEnd="url(#fp-arrow-w)" />
            {/* racks → CDU */}
            <path d={`M${m(9.2)} ${m(3.7)} H${m(11.7)}`} className="fp-pipe-heat" />
            <path d={`M${m(11.7)} ${m(4.85)} H${m(9.2)}`} className="fp-pipe-water" />
            {/* network out of the boiler house */}
            <path d={`M${m(26)} ${m(4.3)} H${m(27.6)}`} className="fp-pipe-heat" markerEnd="url(#fp-arrow-h)" />
            <path d={`M${m(27.6)} ${m(4.75)} H${m(26)}`} className="fp-pipe-water" markerEnd="url(#fp-arrow-w)" />
            <path d={`M${m(21.8)} ${m(4.3)} H${m(26)}`} className="fp-pipe-heat fp-thin" />
            <path d={`M${m(26)} ${m(4.75)} H${m(21.8)}`} className="fp-pipe-water fp-thin" />
            {/* grid feed */}
            <path d={`M${m(-0.8)} ${m(8.8)} H${m(1.5)}`} className="fp-cable" markerEnd="url(#fp-arrow-p)" />
            <path d={`M${m(3.5)} ${m(8.2)} H${m(4.1)} M${m(5.6)} ${m(7.8)} V${m(6.6)} H${m(9)} V${m(5.4)}`} className="fp-cable fp-thin" />
          </g>

          <text x={m(26.1)} y={m(4.3) - 10} className="fp-note fp-heat-text">{L.network}</text>
          <text x={m(-0.8)} y={m(8.5)} className="fp-note">{L.grid}</text>

          {/* scale bar + north */}
          <g aria-hidden="true">
            <rect x={m(1)} y={m(12.6)} width={2 * S} height="6" className="fp-scale-a" />
            <rect x={m(3)} y={m(12.6)} width={2 * S} height="6" className="fp-scale-b" />
            <text x={m(1)} y={m(13.3)} className="fp-note">0</text>
            <text x={m(3)} y={m(13.3)} textAnchor="middle" className="fp-note">2</text>
            <text x={m(5)} y={m(13.3)} textAnchor="middle" className="fp-note">4 m</text>
            <path d={`M${m(26.9)} ${m(11.8)} l10 -30 l10 30 l-10 -8z`} className="fp-north" />
            <text x={m(26.9) + 10} y={m(12.4)} textAnchor="middle" className="fp-note">{L.north}</text>
          </g>
        </svg>
      </div>

      <aside className="fp-side">
        <ul className="fp-key">
          <li><i className="fp-swatch fp-sw-heat" />{t.legendHeat}</li>
          <li><i className="fp-swatch fp-sw-water" />{t.legendReturn}</li>
          <li><i className="fp-swatch fp-sw-power" />{t.legendPower}</li>
          <li><i className="fp-swatch fp-sw-existing" />{t.legendExisting}</li>
        </ul>
        <div className="fp-detail" aria-live="polite">
          {zone ? (
            <>
              <p className="il-index">{String(t.zones.indexOf(zone) + 1).padStart(2, '0')}</p>
              <h3>{zone.name}</h3>
              <p className="fp-size">{zone.size}</p>
              <p className="fp-body">{zone.body}</p>
            </>
          ) : <p className="fp-body">{t.planHint}</p>}
        </div>
        <ol className="fp-list">
          {t.zones.map((z, i) => (
            <li key={z.id}>
              <button type="button" aria-pressed={sel === z.id} className={sel === z.id ? 'is-on' : ''} onClick={() => pick(z.id)}>
                <span>{String(i + 1).padStart(2, '0')}</span>{z.name}
              </button>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
