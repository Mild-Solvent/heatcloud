/**
 * The whole business in one picture: electricity in, compute sold out of the
 * top, heat sold out of the side. Static SVG with a CSS dash animation on the
 * flow lines — no chart library, no client component.
 */
export default function HeatFlow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 340"
      className={className}
      role="img"
      aria-label="Electricity enters the data hall; compute is sold to customers, and the waste heat is captured at 45 °C, lifted by a heat pump to 75 °C and sold into the district heating network."
    >
      <defs>
        <linearGradient id="hf-hot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8823f" />
          <stop offset="100%" stopColor="#c25e1e" />
        </linearGradient>
        <linearGradient id="hf-cool" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3fb5b5" />
          <stop offset="100%" stopColor="#0e6e6e" />
        </linearGradient>
      </defs>

      {/* ---------------- data hall ---------------- */}
      <g>
        <rect x="24" y="120" width="150" height="118" rx="14" fill="#fff" stroke="#e3ddd2" strokeWidth="1.5" />
        <text x="99" y="145" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#141a22">
          DATA HALL
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="44" y={156 + i * 24} width="110" height="15" rx="4" fill="#f7f5f0" stroke="#e3ddd2" />
            <circle cx="55" cy={163.5 + i * 24} r="2.6" fill="#3fb5b5" />
            <rect x="66" y={161 + i * 24} width="76" height="5" rx="2.5" fill="#e3ddd2" />
          </g>
        ))}
      </g>

      {/* electricity in */}
      <g>
        <path d="M99 92 V116" stroke="#98a1ab" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
        <path d="M99 116 l-4.5 -7 h9 z" fill="#98a1ab" />
        <text x="99" y="82" textAnchor="middle" fontSize="10.5" fill="#68727e">
          Grid electricity
        </text>
      </g>

      {/* ---------------- compute sold up ---------------- */}
      <g>
        <path d="M174 152 H236 a10 10 0 0 0 10 -10 V64" fill="none" stroke="url(#hf-cool)" strokeWidth="2.6"
          strokeLinecap="round" strokeDasharray="6 6" className="animate-flow" />
        <path d="M246 60 l-5 8 h10 z" fill="#0e6e6e" />
        <rect x="196" y="24" width="188" height="34" rx="10" fill="#eefaf9" stroke="#a3e5df" />
        <text x="290" y="40" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0c5757">
          COMPUTE SOLD
        </text>
        <text x="290" y="52" textAnchor="middle" fontSize="9.5" fill="#1a8f8f">
          servers, storage, mail, GPU
        </text>
      </g>

      {/* ---------------- hot loop to the heat pump ---------------- */}
      <g>
        <path d="M174 190 H244" fill="none" stroke="url(#hf-hot)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="7 6" className="animate-flow" />
        <text x="209" y="181" textAnchor="middle" fontSize="10" fontWeight="600" fill="#c25e1e">
          45 °C
        </text>
      </g>

      {/* ---------------- heat pump ---------------- */}
      <g>
        <rect x="244" y="158" width="92" height="64" rx="12" fill="#fdf5ef" stroke="#f4cbaa" strokeWidth="1.5" />
        <text x="290" y="182" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#9c4a18">
          HEAT PUMP
        </text>
        <text x="290" y="196" textAnchor="middle" fontSize="9" fill="#c25e1e">
          COP 4–5
        </text>
        <path d="M266 206 q8 -7 16 0 t16 0" fill="none" stroke="#e8823f" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* ---------------- hot output to the network ---------------- */}
      <g>
        <path d="M336 190 H400" fill="none" stroke="url(#hf-hot)" strokeWidth="3.4" strokeLinecap="round"
          strokeDasharray="7 6" className="animate-flow" />
        <text x="368" y="181" textAnchor="middle" fontSize="10" fontWeight="700" fill="#c25e1e">
          75 °C
        </text>
      </g>

      {/* ---------------- the town ---------------- */}
      <g>
        <rect x="400" y="118" width="96" height="120" rx="14" fill="#fff" stroke="#e3ddd2" strokeWidth="1.5" />
        <text x="448" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#141a22">
          THE TOWN
        </text>
        <g fill="#f7f5f0" stroke="#cfc7b8">
          <rect x="414" y="168" width="22" height="52" rx="3" />
          <rect x="442" y="152" width="22" height="68" rx="3" />
          <rect x="470" y="178" width="16" height="42" rx="3" />
        </g>
        <g fill="#e8823f">
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x={418} y={176 + r * 13} width="5" height="5" rx="1" />
              <rect x={428} y={176 + r * 13} width="5" height="5" rx="1" />
              <rect x={446} y={162 + r * 13} width="5" height="5" rx="1" />
              <rect x={456} y={162 + r * 13} width="5" height="5" rx="1" />
            </g>
          ))}
        </g>
        <text x="448" y="234" textAnchor="middle" fontSize="9" fill="#68727e">
          district network
        </text>
      </g>

      {/* ---------------- cool return ---------------- */}
      <g>
        <path d="M400 256 H99 a0 0 0 0 1 0 0 V244" fill="none" stroke="url(#hf-cool)" strokeWidth="2.4"
          strokeLinecap="round" strokeDasharray="6 7" className="animate-flow" />
        <path d="M99 240 l-4.5 8 h9 z" fill="#0e6e6e" />
        <text x="250" y="272" textAnchor="middle" fontSize="10" fill="#0e6e6e">
          return loop, ~30 °C
        </text>
      </g>

      {/* ---------------- money line ---------------- */}
      <g>
        <line x1="24" y1="298" x2="496" y2="298" stroke="#e3ddd2" strokeWidth="1" strokeDasharray="3 4" />
        <text x="24" y="316" fontSize="10.5" fill="#68727e">
          <tspan fontWeight="700" fill="#0e6e6e">Revenue 1</tspan> compute, at market rates
        </text>
        <text x="496" y="316" textAnchor="end" fontSize="10.5" fill="#68727e">
          <tspan fontWeight="700" fill="#c25e1e">Revenue 2</tspan> heat, at gas minus 20%
        </text>
      </g>
    </svg>
  );
}
