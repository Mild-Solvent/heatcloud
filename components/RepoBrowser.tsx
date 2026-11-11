'use client';

import { useMemo, useState } from 'react';
import type { AreaId } from '@/content/repoMap';
import { formatBytes } from '@/lib/format';

export type BrowserFile = { path: string; note: string; bytes: number; lines: number | null; usedBy: string[] };
export type BrowserArea = { id: AreaId; name: string; body: string; files: BrowserFile[] };
type Copy = { filter: string; filterHint: string; usedBy: string; unused: string; lines: string; open: string; none: string };

const GH = 'https://github.com/Mild-Solvent/heatcloud/blob/main/';
// Files nobody imports by design: entry points, config, data, docs, assets referenced by tooling.
const ENTRY = /^(app\/.*(page|layout|not-found)\.tsx|app\/robots\.ts|app\/globals\.css)$/;
const CODE = /^(components|content|lib)\/.*\.(tsx?|css)$/;


export function RepoBrowser({ areas, t, locale }: { areas: BrowserArea[]; t: Copy; locale: 'sk' | 'en' }) {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const shown = useMemo(() => areas
    .map((a) => ({ ...a, files: needle ? a.files.filter((f) => f.path.toLowerCase().includes(needle) || f.note.toLowerCase().includes(needle)) : a.files }))
    .filter((a) => a.files.length), [areas, needle]);

  return (
    <div className="rp-browser">
      <div className="rp-toc">
        <label className="rp-search">
          <span className="il-label">{t.filter}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.filterHint} />
        </label>
        <nav aria-label={t.filter}>
          {shown.map((a) => <a key={a.id} href={`#area-${a.id}`}>{a.name}<span>{a.files.length}</span></a>)}
        </nav>
      </div>
      <div className="rp-areas">
        {shown.length === 0 && <p className="rp-none">{t.none}</p>}
        {shown.map((a, i) => (
          <section key={a.id} id={`area-${a.id}`} className="rp-area">
            <header>
              <span className="il-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{a.name}</h3>
              <p>{a.body}</p>
            </header>
            <ul>
              {a.files.map((f) => (
                <li key={f.path}>
                  <div className="rp-path">
                    <a href={GH + f.path.split('/').map(encodeURIComponent).join('/')} target="_blank" rel="noopener">{f.path}</a>
                    <span className="rp-meta">{f.lines !== null ? `${f.lines.toLocaleString(locale === 'sk' ? 'sk-SK' : 'en-IE')} ${t.lines} · ` : ''}{formatBytes(f.bytes, locale)}</span>
                  </div>
                  {f.note && <p className="rp-note">{f.note}</p>}
                  {f.usedBy.length > 0
                    ? <p className="rp-used"><b>{t.usedBy}</b> {f.usedBy.join(' · ')}</p>
                    : CODE.test(f.path) && !ENTRY.test(f.path) ? <p className="rp-used rp-unused">{t.unused}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
