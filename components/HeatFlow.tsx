import type { Dict } from '@/content/i18n';

/**
 * The whole business as a drawn cross-section of the site in the photograph:
 * a data hall terraced into a hillside, the heat pump beside it, the hot pipe
 * running down the slope into the town, the cooled water coming back
 * underneath, the compute leaving upwards as a cloud. Orange is the hot side,
 * blue the water. Thin ink lines on paper; a slow dash overlay shows the flow.
 */
export default function HeatFlow({ t, className = '' }: { t: Dict['heatFlow']; className?: string }) {
  const ink = '#1b1a17';
  const muted = '#6b665e';
  const faint = '#958f85';
  const line = '#d8cfc0';
  const lineStrong = '#b6aa96';
  const card = '#fbf9f5';
  const paper3 = '#e2dbcd';
  const heat = { 100: '#fbe5d2', 300: '#efa26d', 400: '#e67c3c', 500: '#d9621f', 600: '#b95016', 700: '#933f13' };
  const water = { 50: '#eff5f8', 100: '#d9e7ee', 400: '#5a8dab', 500: '#3a7292', 700: '#254a61' };
  const mono = 'var(--font-mono)';

  const hot2 = 'M352 254 C 420 254, 480 280, 540 298 S 616 312, 646 312';
  const ret2 = 'M648 322 C 600 326, 530 322, 470 302 S 384 268, 352 266';
  const hot1 = 'M230 232 C 262 232, 272 252, 300 252';
  const ret1 = 'M300 264 C 276 264, 262 244, 230 244';

  return (
    <figure className={className}>
      <svg viewBox="0 0 720 400" role="img" aria-label={t.aria} className="h-auto w-full">
        <defs>
          <linearGradient id="hf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fdfcf9" />
            <stop offset="1" stopColor="#f5f1ea" />
          </linearGradient>
          <linearGradient id="hf-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f1ece3" />
            <stop offset="1" stopColor="#ebe4d8" />
          </linearGradient>
          <linearGradient id="hf-hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ebe4d8" />
            <stop offset="1" stopColor="#ddd4c3" />
          </linearGradient>
          <radialGradient id="hf-sun">
            <stop offset="0" stopColor={heat[100]} stopOpacity=".95" />
            <stop offset=".5" stopColor={heat[100]} stopOpacity=".4" />
            <stop offset="1" stopColor={heat[100]} stopOpacity="0" />
          </radialGradient>
          <filter id="hf-blur" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* ------------------------------------------------ sky, sun, hills */}
        <rect x=".5" y=".5" width="719" height="399" rx="3" fill="url(#hf-sky)" stroke={line} />
        <circle cx="612" cy="74" r="104" fill="url(#hf-sun)" />
        <path d="M0 205 C 120 165, 250 200, 400 172 S 620 145, 720 168 L720 400 L0 400 Z" fill="url(#hf-far)" />
        <ellipse cx="470" cy="236" rx="210" ry="12" fill="#fff" opacity=".4" filter="url(#hf-blur)" />
        <path d="M0 248 C 180 242, 380 296, 720 330 L720 400 L0 400 Z" fill="url(#hf-hill)" />
        <path d="M0 248 C 180 242, 380 296, 720 330" fill="none" stroke={lineStrong} strokeOpacity=".55" />
        <g stroke={lineStrong} strokeWidth=".9" strokeLinecap="round" opacity=".75">
          {[[40, 248], [250, 266], [400, 288], [449, 296], [500, 305], [560, 312]].map(([x, y]) => (
            <path key={x} d={`M${x} ${y} l-1.5 -6 M${x + 4} ${y} l1 -5 M${x + 8} ${y} l-1 -4`} />
          ))}
        </g>

        {/* ------------------------------------------- meadow in the foreground */}
        <g stroke={lineStrong} strokeWidth=".9" strokeLinecap="round" opacity=".7">
          {[[60, 330], [130, 392], [210, 372], [290, 340], [350, 388], [420, 372], [490, 392], [600, 386], [680, 372]].map(([x, y]) => (
            <path key={x} d={`M${x} ${y} l-1.5 -6 M${x + 4} ${y} l1 -5 M${x + 8} ${y} l-1 -4`} />
          ))}
        </g>
        <g>
          {[[38, 314, 0], [84, 352, 1], [112, 306, 0], [166, 366, 1], [188, 320, 0], [234, 392, 0], [268, 352, 1], [314, 376, 0],
            [366, 340, 1], [402, 384, 0], [444, 358, 1], [528, 380, 0], [576, 356, 1], [640, 386, 0], [700, 362, 1]].map(([x, y, w]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={w ? 1.6 : 1.3} fill={w ? '#fff' : heat[100]} opacity=".9" />
          ))}
        </g>
        <g stroke={ink} strokeWidth="1" strokeLinejoin="round">
          <path d="M122 362 V330" strokeWidth="1.3" />
          <path d="M122 336 C 104 336, 100 314, 110 304 C 114 292, 132 292, 136 304 C 146 312, 140 336, 122 336 Z" fill={paper3} />
          <path d="M56 248 V226" strokeWidth="1.1" />
          <path d="M56 230 C 44 230, 42 214, 49 206 C 52 197, 62 197, 65 206 C 72 214, 68 230, 56 230 Z" fill={paper3} />
        </g>

        {/* --------------------------------------------- terraces and pads */}
        <path d="M62 248 H240 V266 L62 251 Z" fill={paper3} />
        <path d="M292 276 H360 V286 L292 279 Z" fill={paper3} />
        <path d="M584 316 C 620 312, 680 313, 720 318 L720 342 L584 342 Z" fill={paper3} />

        {/* ------------------------------------------------ grid electricity */}
        <g stroke={faint} strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M28 112 V248" />
          <path d="M17 126 H39 M20 138 H36" />
          <path d="M39 126 C 58 134, 66 140, 74 148" strokeDasharray="2.5 4" strokeWidth="1.1" />
        </g>
        <text x="8" y="100" fontFamily={mono} fontSize="10.5" letterSpacing="1.2" fill={muted}>
          {t.grid.toUpperCase()}
        </text>

        {/* ------------------------------------------------------- pipes */}
        <path d={hot1} fill="none" stroke={heat[300]} strokeWidth="5" strokeLinecap="round" />
        <path d={ret1} fill="none" stroke={water[400]} strokeWidth="3" strokeLinecap="round" />
        <path d={hot2} fill="none" stroke={heat[500]} strokeWidth="6" strokeLinecap="round" />
        <path d={hot2} fill="none" stroke={heat[100]} strokeWidth="2.2" strokeLinecap="round"
          strokeDasharray="12 36" className="animate-flow" opacity=".9" />
        <path d={ret2} fill="none" stroke={water[500]} strokeWidth="4" strokeLinecap="round" />
        <path d={ret2} fill="none" stroke={water[100]} strokeWidth="1.6" strokeLinecap="round"
          strokeDasharray="8 40" className="animate-flow" opacity=".9" />
        <text x="258" y="224" textAnchor="middle" fontFamily={mono} fontSize="10.5" fill={heat[600]}>45 °C</text>
        <text x="410" y="246" textAnchor="middle" fontFamily={mono} fontSize="10.5" fill={heat[700]}>75 °C</text>
        <text x="500" y="336" textAnchor="middle" fontFamily={mono} fontSize="10.5" fill={water[700]}>{t.ret}</text>

        {/* ---------------------------------------------------- heat pump */}
        <rect x="300" y="240" width="52" height="36" rx="3" fill={card} stroke={ink} strokeWidth="1.1" />
        <circle cx="317" cy="258" r="10.5" fill="none" stroke={muted} />
        <circle cx="317" cy="258" r="2.4" fill={muted} />
        <path d="M317 247.5 V268.5 M306.5 258 H327.5 M309.6 250.6 L324.4 265.4 M324.4 250.6 L309.6 265.4"
          stroke={muted} strokeWidth=".8" opacity=".8" />
        <path d="M336 249 h11 M336 255 h11 M336 261 h11 M336 267 h11" stroke={lineStrong} strokeWidth="1.2" />
        <text x="326" y="304" textAnchor="middle" fontFamily={mono} fontSize="10" letterSpacing="1" fill={muted}>
          {t.pump.toUpperCase()} · {t.cop}
        </text>

        {/* ---------------------------------------------------- data hall */}
        <rect x="74" y="150" width="156" height="98" fill={card} stroke={ink} strokeWidth="1.2" />
        <g stroke={line} strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => 82 + i * 7).map((x) => (
            <path key={x} d={`M${x} 156 V246`} />
          ))}
        </g>
        <rect x="92" y="193" width="56" height="14" fill={card} />
        <text x="120" y="203" textAnchor="middle" fontFamily={mono} fontSize="8.5" letterSpacing="1.8" fill={ink}>
          HEATCLOUD
        </text>
        <rect x="172" y="160" width="52" height="86" fill={water[50]} stroke={line} />
        {[181, 201].map((x, r) => (
          <g key={x}>
            <rect x={x} y="170" width="14" height="68" fill={card} stroke={faint} strokeWidth=".9" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={x + 4} cy={178 + i * 10} r="1.3"
                fill={r === 1 && (i === 1 || i === 4) ? heat[400] : water[500]} />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path key={`s${i}`} d={`M${x + 7} ${178 + i * 10} h4`} stroke={line} strokeWidth="1" />
            ))}
          </g>
        ))}
        <rect x="70" y="143" width="164" height="8" fill={paper3} stroke={ink} strokeWidth="1" />
        <g stroke={lineStrong} strokeWidth=".9" strokeLinecap="round">
          {[78, 94, 110, 130, 162, 178, 196, 214].map((x) => (
            <path key={x} d={`M${x} 143 l1.5 -5 M${x + 3} 143 l-1 -4`} />
          ))}
        </g>
        <rect x="96" y="127" width="30" height="16" rx="1.5" fill={card} stroke={ink} strokeWidth="1" />
        <circle cx="111" cy="135" r="5.5" fill="none" stroke={muted} />
        <path d="M111 129.5 V140.5 M105.5 135 H116.5" stroke={muted} strokeWidth=".8" />
        <rect x="134" y="131" width="22" height="12" rx="1.5" fill={card} stroke={ink} strokeWidth="1" />
        <path d="M138 134.5 H152 M138 138.5 H152" stroke={lineStrong} strokeWidth="1" />
        <text x="152" y="264" textAnchor="middle" fontFamily={mono} fontSize="10" letterSpacing="1.2" fill={muted}>
          {t.hall.toUpperCase()}
        </text>

        {/* ------------------------------------------------- compute cloud */}
        <path d="M150 143 C 150 118, 232 126, 284 112" fill="none" stroke={water[500]} strokeWidth="1.4"
          strokeLinecap="round" strokeDasharray="1.5 4.5" />
        <circle cx="286" cy="111.5" r="2.6" fill={water[500]} />
        <g transform="translate(262 20) scale(5)">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill={card} stroke={ink} strokeWidth=".24" strokeLinejoin="round" />
          <g stroke={water[500]} strokeWidth=".55" strokeLinecap="round">
            <path d="M8.6 17.2 H17.4 M9.2 14.9 H16.8 M9.9 12.6 H16.1" />
          </g>
        </g>
        <text x="392" y="74" fontFamily={mono} fontSize="10.5" letterSpacing="1.2" fill={ink}>
          {t.computeSold.toUpperCase()}
        </text>
        <text x="392" y="90" fontFamily={mono} fontSize="10" fill={muted}>{t.computeSub}</text>

        {/* ------------------------------------------------------- the town */}
        <g stroke={ink} strokeWidth="1.1" strokeLinejoin="round">
          <rect x="596" y="296" width="34" height="22" fill={card} />
          <path d="M592 297 L613 277 L634 297 Z" fill={heat[100]} />
          <rect x="651" y="236" width="13" height="52" fill={card} />
          <path d="M649 237 L657.5 208 L666 237 Z" fill={heat[100]} />
          <rect x="640" y="288" width="32" height="30" fill={card} />
          <path d="M636 289 L656 270 L676 289 Z" fill={heat[100]} />
          <rect x="682" y="297" width="30" height="21" fill={card} />
          <path d="M678 298 L697 279 L716 298 Z" fill={heat[100]} />
        </g>
        <g fill={heat[400]}>
          <rect x="602" y="302" width="5" height="5" />
          <rect x="619" y="302" width="5" height="5" />
          <rect x="646" y="298" width="4" height="7" />
          <rect x="662" y="298" width="4" height="7" />
          <rect x="655" y="248" width="5" height="7" fill={heat[300]} />
          <rect x="688" y="303" width="5" height="5" />
          <rect x="701" y="303" width="5" height="5" />
        </g>
        <text x="654" y="350" textAnchor="middle" fontFamily={mono} fontSize="10" letterSpacing="1.2" fill={muted}>
          {t.town.toUpperCase()} · {t.network.toUpperCase()}
        </text>
      </svg>

      <figcaption className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 font-mono text-[0.7rem] text-ink-muted">
        <span><span className="text-water-600">{t.rev1}</span> · {t.rev1Sub}</span>
        <span><span className="text-heat-600">{t.rev2}</span> · {t.rev2Sub}</span>
      </figcaption>
    </figure>
  );
}
