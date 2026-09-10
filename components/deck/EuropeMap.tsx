/**
 * The precedents as a constellation: cities placed on a plain cylindrical
 * projection of northern and central Europe, joined to Bratislava by
 * hairlines, on a field of dots. No coastlines — an outline drawn from memory
 * is the one thing that would look wrong to anyone who lives there.
 */
export type MapPoint = { city: string; key: string; lon: number; lat: number };

const W = 720;
const H = 440;
const LON = [-14, 34] as const;
const LAT = [46, 63] as const;

const px = (lon: number) => ((lon - LON[0]) / (LON[1] - LON[0])) * W;
const py = (lat: number) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H;

export default function EuropeMap({
  points, here, hereNote, dark = true,
}: {
  points: MapPoint[]; here: string; hereNote: string; dark?: boolean;
}) {
  const home = { x: px(17.11), y: py(48.15) };
  const kosice = { x: px(21.26), y: py(48.72) };
  const ink = dark ? '#f5f1ea' : '#1b1a17';
  const dim = dark ? 'rgba(245,241,234,.35)' : 'rgba(27,26,23,.4)';
  const faint = dark ? 'rgba(245,241,234,.12)' : 'rgba(27,26,23,.12)';
  const mono = 'var(--font-mono)';

  // Label placement: most labels go right of the dot; Stockholm, Oslo, Odense
  // and Espoo go left so the Nordic cluster does not pile up, and Mäntsälä,
  // forty kilometres from Espoo, is lifted clear of it.
  const side = (city: string) => (/Stockholm|Oslo|Odense|Espoo/.test(city) ? -1 : 1);
  const lift = (city: string) => (/Mäntsälä/.test(city) ? -14 : 0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={points.map((p) => p.city).join(', ')}>
      <defs>
        <pattern id="map-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={faint} />
        </pattern>
        <radialGradient id="map-glow">
          <stop offset="0" stopColor="#d9621f" stopOpacity=".55" />
          <stop offset="1" stopColor="#d9621f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#map-dots)" />
      {/* graticule */}
      <g stroke={faint} strokeWidth="1">
        {[50, 55, 60].map((lat) => <line key={lat} x1="0" x2={W} y1={py(lat)} y2={py(lat)} strokeDasharray="2 6" />)}
        {[0, 10, 20].map((lon) => <line key={lon} y1="0" y2={H} x1={px(lon)} x2={px(lon)} strokeDasharray="2 6" />)}
      </g>
      <g fontFamily={mono} fontSize="9" fill={dim}>
        {[50, 55, 60].map((lat) => <text key={lat} x="6" y={py(lat) - 4}>{lat}°N</text>)}
      </g>

      {/* links to Bratislava */}
      <g stroke="#3a7292" strokeOpacity=".45" strokeWidth="1" fill="none">
        {points.map((p) => {
          const x = px(p.lon), y = py(p.lat);
          const mx = (x + home.x) / 2, my = Math.min(y, home.y) - 30;
          return <path key={p.city} d={`M${x} ${y} Q ${mx} ${my} ${home.x} ${home.y}`} className="map-link" />;
        })}
      </g>

      {/* home */}
      <circle cx={home.x} cy={home.y} r="34" fill="url(#map-glow)" />
      <line x1={home.x} y1={home.y} x2={kosice.x} y2={kosice.y} stroke="#d9621f" strokeWidth="1.5" />
      <circle cx={kosice.x} cy={kosice.y} r="3.5" fill="#d9621f" />
      <circle cx={home.x} cy={home.y} r="6" fill="#d9621f" stroke={dark ? '#0e161c' : '#f5f1ea'} strokeWidth="2" />
      <text x={home.x - 8} y={home.y + 24} textAnchor="end" fontFamily={mono} fontSize="10.5" letterSpacing="1" fill="#e67c3c">{here.toUpperCase()}</text>
      <text x={home.x - 8} y={home.y + 37} textAnchor="end" fontFamily={mono} fontSize="9" fill={dim}>{hereNote}</text>

      {/* cases */}
      {points.map((p, k) => {
        const x = px(p.lon), y = py(p.lat);
        const s = side(p.city);
        const tx = x + s * 11;
        const ty = y + lift(p.city);
        return (
          <g key={p.city} className="map-pt" style={{ animationDelay: `${0.5 + k * 0.12}s` }}>
            <circle cx={x} cy={y} r="9" fill="#3a7292" fillOpacity=".18" />
            <circle cx={x} cy={y} r="4" fill="#5a8dab" stroke={dark ? '#0e161c' : '#f5f1ea'} strokeWidth="1.5" />
            <text x={tx} y={ty - 3} textAnchor={s < 0 ? 'end' : 'start'} fontFamily={mono} fontSize="11" fill={ink} fontWeight="500">{p.city}</text>
            <text x={tx} y={ty + 10} textAnchor={s < 0 ? 'end' : 'start'} fontFamily={mono} fontSize="9.5" fill="#86afc5">{p.key}</text>
          </g>
        );
      })}
    </svg>
  );
}
