'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/** Native scrolling, one scheduled frame, and visibility-triggered animations.
 * Content remains readable without JavaScript and with reduced motion. */
export function LandingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) return;
      const animations: Animation[] = [];
      const frames = new Set<number>();
      const originals = new Map<HTMLElement, string>();
      const request = (fn: FrameRequestCallback) => {
        const id = requestAnimationFrame(time => { frames.delete(id); fn(time); });
        frames.add(id);
        return id;
      };
      const count = (node: HTMLElement) => {
        const original = node.textContent || '';
        const match = original.match(/[\d]+(?:[.,]\d+)?/);
        if (!match) return;
        originals.set(node, original);
        const target = Number(match[0].replace(',', '.'));
        const decimals = match[0].includes(',') || match[0].includes('.') ? 2 : 0;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1450, 1);
          const value = (target * (1 - Math.pow(1 - progress, 4))).toFixed(decimals);
          node.textContent = progress === 1 ? original : original.replace(match[0], match[0].includes(',') ? value.replace('.', ',') : value);
          if (progress < 1) request(tick);
        };
        request(tick);
      };
      const animate = (node: Element, delay = 0) => {
        const lines = node.querySelectorAll('.il-line-inner');
        const targets = lines.length ? [...lines] : [node];
        targets.forEach((target, i) => {
          animations.push(target.animate(
            [{ opacity: 0, transform: `translate3d(0,${lines.length ? '110%' : '48px'},0)`, filter: 'blur(3px)' }, { opacity: 1, transform: 'translate3d(0,0,0)', filter: 'blur(0px)' }],
            { duration: lines.length ? 1150 : 1000, delay: delay + i * 115, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' },
          ));
        });
      };
      const pending = [...el.querySelectorAll<HTMLElement>('[data-motion]')];
      pending.forEach(node => {
        if (node.getBoundingClientRect().top > innerHeight * .9) node.classList.add('il-awaiting');
      });
      el.classList.add('il-motion-ready');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          node.classList.remove('il-awaiting');
          node.classList.add('il-arrived');
          const delay = Number(node.dataset.delay || 0);
          const children = [...node.children];
          if (node.matches('.il-section-top, .il-econ-card, .il-stats, .il-pillar, .il-roadmap-step, .il-cta-copy')) {
            children.forEach((child, i) => animate(child, delay + i * 90));
          } else animate(node, delay);
          node.querySelectorAll<HTMLElement>('[data-count]').forEach(count);
          observer.unobserve(node);
        });
      }, { threshold: .08, rootMargin: '0px 0px -8% 0px' });
      pending.forEach(node => observer.observe(node));

      const photo = el.querySelector<HTMLElement>('.il-hero-image');
      const system = el.querySelector<HTMLElement>('.il-system');
      const roadmap = el.querySelector<HTMLElement>('.il-roadmap');
      const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.il-header nav a[href^="#"]')];
      const sections = [...el.querySelectorAll<HTMLElement>('section[id]')];
      let frame = 0;
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const update = () => {
        frame = 0;
        const view = innerHeight;
        const top = el.getBoundingClientRect().top;
        el.style.setProperty('--page-progress', String(clamp(-top / (el.offsetHeight - view))));
        if (photo) {
          const rect = photo.getBoundingClientRect();
          const p = clamp((view - rect.top) / (view + rect.height));
          photo.style.setProperty('--photo-y', `${(p - .5) * 65}px`);
          photo.style.setProperty('--photo-scale', String(1.11 - p * .045));
        }
        if (system) {
          const rect = system.getBoundingClientRect();
          const progress = clamp((view * .65 - rect.top) / (rect.height - view * .25));
          system.style.setProperty('--system-progress', String(progress));
          system.dataset.stage = String(Math.min(3, Math.floor(progress * 3.8)));
        }
        if (roadmap) {
          const rect = roadmap.getBoundingClientRect();
          roadmap.style.setProperty('--roadmap-progress', String(clamp((view * .85 - rect.top) / (rect.height * .8))));
        }
        const active = sections.filter(section => section.getBoundingClientRect().top <= view * .45).at(-1)?.id;
        navLinks.forEach(link => {
          if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      };
      const schedule = () => { if (!frame) frame = request(update); };
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      update();
      dispose = () => {
        observer.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        frames.forEach(cancelAnimationFrame);
        animations.forEach(animation => animation.cancel());
        originals.forEach((text, node) => { node.textContent = text; });
        el.classList.remove('il-motion-ready');
        pending.forEach(node => node.classList.remove('il-awaiting', 'il-arrived'));
        navLinks.forEach(link => link.removeAttribute('aria-current'));
        photo?.style.removeProperty('--photo-y');
        photo?.style.removeProperty('--photo-scale');
      };
    };
    setup();
    preference.addEventListener('change', setup);
    return () => { dispose(); preference.removeEventListener('change', setup); };
  }, []);

  return <div ref={root} className="investor-landing"><div className="il-reading-progress" aria-hidden="true" />{children}</div>;
}

export function MotionReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className} data-motion="" data-delay={delay} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

export function MotionHeading({ text }: { text: string }) {
  return <h2>{text.split('\n').map((line, index) => <span className="il-line-mask" key={line}><span className="il-line-inner">{line}</span>{index === 0 && <span className="sr-only"> </span>}</span>)}</h2>;
}
