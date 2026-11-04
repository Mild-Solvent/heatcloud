'use client';

import { useEffect, useRef, useState } from 'react';
import type { LabView } from '@/content/heatModel';
import { BASE } from '@/lib/base';
import type { Locale } from '@/lib/i18n';

/**
 * Embeds the static heat model lab (public/heat-lab/) and keeps the frame as
 * tall as its content, so the page scrolls as one document. The view cards on
 * the page switch the lab's tab through a `heat-lab:view` window event.
 */
export function HeatLabFrame({ locale, loading, standalone }: { locale: Locale; loading: string; standalone: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1400);
  const [view, setView] = useState<LabView>('model');
  const src = `${BASE}/heat-lab/index.html?embed=1&lang=${locale}`;

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== ref.current?.contentWindow) return;
      const d = e.data as { type?: string; height?: number; view?: LabView };
      if (d?.type !== 'heat-lab-height' || typeof d.height !== 'number') return;
      setHeight(Math.max(600, Math.ceil(d.height)));
      if (d.view) setView(d.view);
    };
    const onView = (e: Event) => {
      const next = (e as CustomEvent<LabView>).detail;
      const w = ref.current?.contentWindow;
      if (w) w.location.hash = next;
      setView(next);
    };
    window.addEventListener('message', onMessage);
    window.addEventListener('heat-lab:view', onView);
    return () => { window.removeEventListener('message', onMessage); window.removeEventListener('heat-lab:view', onView); };
  }, []);

  return (
    <div className="hm-frame">
      <iframe
        ref={ref}
        src={src}
        title="HeatCloud heat model lab"
        style={{ height }}
        loading="lazy"
      />
      <noscript><p className="il-fine">{loading}</p></noscript>
      <p className="il-fine hm-frame-foot"><a href={`${src.replace('embed=1&', '')}#${view}`} target="_blank" rel="noopener">{standalone} ↗</a></p>
    </div>
  );
}

export function LabViewButton({ view, children }: { view: LabView; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="hm-view"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('heat-lab:view', { detail: view }));
        document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {children}
    </button>
  );
}
