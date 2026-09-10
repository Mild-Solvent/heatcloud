'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode, type TouchEvent, type WheelEvent } from 'react';
import { fmt } from '@/lib/i18n';
import { Link } from '@/lib/locale';
import { Logo } from '@/components/icons';

export type DeckSlide = {
  id: string;
  /** Short name shown in the bottom bar. */
  label: string;
  tone: 'night' | 'paper';
  content: ReactNode;
};

export type DeckUi = {
  counter: string;
  next: string;
  prev: string;
  exit: string;
  fullscreen: string;
  exitFullscreen: string;
  hint: string;
  confidential: string;
  deckName: string;
};

/**
 * A full-screen slide deck. One slide is mounted at a time (plus the one on
 * its way out); entering and leaving are CSS animations keyed on the direction
 * of travel, and elements inside a slide marked `.s` rise in one after
 * another. Arrow keys, space, page keys, the wheel, a swipe, the edge zones
 * and the buttons all navigate; the slide number lives in the URL hash so a
 * link opens on the right slide; F toggles full screen.
 */
export default function Deck({ slides, ui, brand }: { slides: DeckSlide[]; ui: DeckUi; brand: string }) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [fs, setFs] = useState(false);
  // The index also lives in a ref so the handlers never read a stale closure,
  // and the throttle is a timestamp rather than a flag, so it cannot stick.
  const cur = useRef(0);
  const movedAt = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const wheelAt = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((to: number) => {
    const t = Math.max(0, Math.min(n - 1, to));
    const from = cur.current;
    if (t === from) return;
    const now = Date.now();
    if (now - movedAt.current < 650) return;
    movedAt.current = now;
    cur.current = t;
    setDir(t > from ? 1 : -1);
    setPrev(from);
    setI(t);
    window.setTimeout(() => setPrev((p) => (p === from ? null : p)), 720);
  }, [n]);

  const next = useCallback(() => go(cur.current + 1), [go]);
  const back = useCallback(() => go(cur.current - 1), [go]);

  // The hash is the slide number, one-based, so it reads like a page number.
  useEffect(() => {
    const m = window.location.hash.match(/^#(\d+)$/);
    if (m) {
      const k = Math.max(0, Math.min(n - 1, parseInt(m[1], 10) - 1));
      if (k !== 0) {
        cur.current = k;
        setI(k);
      }
    }
  }, [n]);
  useEffect(() => {
    window.history.replaceState(null, '', `#${i + 1}`);
  }, [i]);

  // The page behind the deck must not scroll.
  useEffect(() => {
    const el = document.documentElement;
    const was = el.style.overflow;
    el.style.overflow = 'hidden';
    return () => { el.style.overflow = was; };
  }, []);

  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen?.();
  }, []);
  useEffect(() => {
    const on = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter':
          e.preventDefault(); next(); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
          e.preventDefault(); back(); break;
        case 'Home': e.preventDefault(); go(0); break;
        case 'End': e.preventDefault(); go(n - 1); break;
        case 'f': case 'F': toggleFs(); break;
        default: {
          // 1–9 jump straight to a slide.
          if (/^[1-9]$/.test(e.key)) go(parseInt(e.key, 10) - 1);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, back, go, n, toggleFs]);

  // Wheel navigation only when the slide itself has nothing to scroll.
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const scroller = (e.target as HTMLElement).closest('.deck-scroll');
    if (scroller && scroller.scrollHeight > scroller.clientHeight + 2) return;
    if (Math.abs(e.deltaY) < 30) return;
    const now = Date.now();
    if (now - wheelAt.current < 900) return;
    wheelAt.current = now;
    if (e.deltaY > 0) next(); else back();
  };
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next(); else back();
    }
  };

  const cur = slides[i];
  const counter = fmt(ui.counter, { i: String(i + 1).padStart(2, '0'), n: String(n).padStart(2, '0') });

  return (
    <div
      ref={root}
      className="deck fixed inset-0 z-[80] overflow-hidden bg-night-950 text-paper"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="slideshow"
      aria-label={ui.deckName}
    >
      {slides.map((s, k) => {
        if (k !== i && k !== prev) return null;
        const active = k === i;
        return (
          <section
            key={s.id}
            className={`deck-slide deck-${s.tone} ${active ? 'is-active' : 'is-leaving'}`}
            data-dir={dir}
            aria-hidden={!active}
            aria-label={s.label}
          >
            <div className="deck-scroll h-full w-full overflow-y-auto overflow-x-hidden">
              {s.content}
            </div>
          </section>
        );
      })}

      {/* --------------------------------------------------------- chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-white/10">
        <div className="h-full bg-heat-500 transition-[width] duration-700 ease-out" style={{ width: `${((i + 1) / n) * 100}%` }} />
      </div>

      <button
        type="button"
        onClick={back}
        className="deck-edge left-0"
        aria-label={ui.prev}
        disabled={i === 0}
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={next}
        className="deck-edge right-0"
        aria-label={ui.next}
        disabled={i === n - 1}
        tabIndex={-1}
      />

      <div className={`deck-bar ${cur.tone === 'paper' ? 'deck-bar-paper' : ''}`}>
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex flex-none items-center gap-2 opacity-90 hover:opacity-100" aria-label={ui.exit}>
            <Logo className="h-6 w-6" />
            <span className="hidden font-display text-[0.95rem] sm:inline">{brand}</span>
          </Link>
          <span className="hidden truncate font-mono text-[0.62rem] uppercase tracking-[0.12em] opacity-50 md:inline">
            · {ui.deckName} · {cur.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button type="button" onClick={back} className="deck-btn" aria-label={ui.prev} disabled={i === 0}>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
          </button>
          <span className="min-w-[4.6rem] text-center font-mono text-[0.72rem] tabular-nums opacity-80">{counter}</span>
          <button type="button" onClick={next} className="deck-btn" aria-label={ui.next} disabled={i === n - 1}>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
          </button>
        </div>

        <div className="flex items-center justify-end gap-1.5">
          <span className="mr-2 hidden font-mono text-[0.62rem] uppercase tracking-[0.1em] opacity-40 lg:inline">{ui.hint}</span>
          <button type="button" onClick={toggleFs} className="deck-btn" aria-label={fs ? ui.exitFullscreen : ui.fullscreen} aria-pressed={fs}>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {fs ? <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" /> : <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />}
            </svg>
          </button>
          <Link href="/" className="deck-btn deck-btn-wide font-mono text-[0.66rem] uppercase tracking-[0.1em]" aria-label={ui.exit}>
            <span className="hidden sm:inline">{ui.exit}</span>
            <span className="sm:hidden">×</span>
          </Link>
        </div>
      </div>

      <p className={`deck-note ${cur.tone === 'paper' ? 'deck-note-paper' : ''}`}>{ui.confidential}</p>
    </div>
  );
}
