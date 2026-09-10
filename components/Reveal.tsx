'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades its children up when they scroll into view, once.
 *
 * Everything renders visible. Only after mount, and only for blocks that are
 * still below the viewport, is the hidden state applied — so nothing a visitor
 * can see ever waits for JavaScript, a page without scripts shows everything,
 * and reduced-motion users are never hidden anything at all. An
 * IntersectionObserver does the revealing; a passive scroll check and a short
 * safety timer make sure nothing can stay hidden if it does not fire.
 */
export function Reveal({
  children, className = '', delay = 0,
}: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.92 && r.bottom > 0;
    };
    // Already on screen (or nearly): leave it alone.
    if (inView()) return;

    setHidden(true);
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setHidden(false);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) show(); },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    const onScroll = () => { if (inView()) show(); };
    const timer = window.setTimeout(show, 5000);
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return show;
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${hidden ? 'is-hidden' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
