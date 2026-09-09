import type { SVGProps } from 'react';

const PATHS: Record<string, string> = {
  server: 'M3 4h18a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 7.5h.01',
  cloud: 'M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 10.5 3.75 3.75 0 0 0 6.5 19z',
  k8s: 'M12 3 4.5 6.8v8.4L12 21l7.5-5.8V6.8z',
  chip: 'M6.5 6.5h11v11h-11z',
  bucket: 'M4 6h16l-1.6 13.2a1 1 0 0 1-1 .8H6.6a1 1 0 0 1-1-.8z',
  db: 'M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6',
  shield: 'M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6z',
  globe: 'M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z',
  at: 'M16 8v5a3 3 0 0 0 5 2.2A9 9 0 1 0 18 19',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  play: 'm10.5 9.2 5 2.8-5 2.8z',
  archive: 'M4.8 8.5V19a1 1 0 0 0 1 1h12.4a1 1 0 0 0 1-1V8.5M10 12h4',
  flame: 'M12 3s5.2 4.1 5.2 8.6A5.2 5.2 0 0 1 12 21a5.2 5.2 0 0 1-5.2-9.4C6.8 7.1 12 3 12 3z',
  lock: 'M8 10V7.5a4 4 0 0 1 8 0V10',
  scale: 'M12 4v16M6 8h12M8 20h8',
  headset: 'M4 13v-1a8 8 0 0 1 16 0v1',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
};

// Extra strokes that cannot be expressed as a single path.
const EXTRA: Record<string, React.ReactNode> = {
  server: (
    <>
      <rect x="1" y="13" width="22" height="7" rx="2" />
      <path d="M7 16.5h.01" />
    </>
  ),
  k8s: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3v6.4M4.5 6.8 10 11M19.5 6.8 14 11M12 21v-6.4" />
    </>
  ),
  chip: <path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21" />,
  bucket: <ellipse cx="12" cy="6" rx="8" ry="2.4" />,
  db: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </>
  ),
  shield: <path d="m9 12 2 2 4-4" />,
  globe: <circle cx="12" cy="12" r="9" />,
  at: <circle cx="12" cy="12" r="4" />,
  play: <rect x="2.5" y="5" width="19" height="14" rx="2.5" />,
  archive: <rect x="3" y="4" width="18" height="4.5" rx="1.4" />,
  flame: <path d="M12 21a2.6 2.6 0 0 0 2.6-4.4C14.6 14.5 12 12.5 12 12.5s-2.6 2-2.6 4.1A2.6 2.6 0 0 0 12 21z" />,
  lock: <rect x="4.5" y="10" width="15" height="10" rx="2" />,
  scale: <path d="m6 8-3 6a3 3 0 0 0 6 0zM18 8l-3 6a3 3 0 0 0 6 0z" />,
  headset: (
    <>
      <rect x="2.5" y="12.5" width="4.5" height="7" rx="2" />
      <rect x="17" y="12.5" width="4.5" height="7" rx="2" />
    </>
  ),
  suite: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </>
  ),
  wave: (
    <>
      <path d="M3 8c2.2-2.4 4.4-2.4 6.6 0S14.2 10.4 16.4 8 21 5.6 21 5.6" />
      <path d="M3 14c2.2-2.4 4.4-2.4 6.6 0s4.6 2.4 6.8 0 4.6-2.4 4.6-2.4" />
      <path d="M3 20h18" />
    </>
  ),
};

export function Icon({ name, className = 'h-6 w-6', ...rest }: { name: string } & SVGProps<SVGSVGElement>) {
  const d = PATHS[name];
  const extra = EXTRA[name];
  if (!d && !extra) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {d ? <path d={d} /> : null}
      {extra}
    </svg>
  );
}

export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity=".28" strokeWidth="1.7" />
      <g stroke="#0e6e6e" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12.96" y1="38.4" x2="35.04" y2="38.4" />
        <line x1="14.3" y1="33.4" x2="33.7" y2="33.4" />
        <line x1="15.66" y1="28.3" x2="32.34" y2="28.3" />
      </g>
      <g stroke="#c25e1e" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M14.4 21.1 C17.6 23.5, 20.8 23.5, 24 21.1 C27.2 18.7, 30.4 18.7, 33.6 21.1" />
        <path d="M15.9 14.4 C18.6 16.3, 21.3 16.3, 24 14.4 C26.7 12.5, 29.4 12.5, 32.1 14.4" />
      </g>
    </svg>
  );
}

export function Chevron({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      className={className} aria-hidden="true">
      <path d="m2 4 3 3 3-3" />
    </svg>
  );
}

export function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Check({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m3 8.5 3.2 3.2L13 5" />
    </svg>
  );
}
