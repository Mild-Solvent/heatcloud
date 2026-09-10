import type { CSSProperties } from 'react';
import type { Dict } from '@/content/i18n';
import { BASE } from '@/lib/base';
import { RichText } from './RichText';
import { Button, Container } from './ui';

/**
 * The photograph, full-bleed, with the headline set on a paper panel that
 * overlaps its lower edge — the way a printed prospectus lays a caption over
 * a plate. The image is a visualisation and the caption says so.
 *
 * On load the photograph settles, then the panel rises and its lines follow
 * one another (delays in `--d`); the keyframes live in globals.css.
 */
const d = (s: string) => ({ '--d': s }) as CSSProperties;

export default function Hero({ t, tc }: { t: Dict['home']; tc: Dict['common'] }) {
  return (
    <section className="relative">
      <div className="relative h-[60svh] min-h-[420px] overflow-hidden sm:h-[72svh] lg:h-[min(84svh,880px)]">
        <img
          src={`${BASE}/hero.jpg`}
          srcSet={`${BASE}/hero-1200.jpg 1200w, ${BASE}/hero.jpg 1672w`}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-photo absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '56% 58%' }}
        />
        <div className="fade absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/40 to-transparent" style={d('.6s')} aria-hidden="true" />
      </div>

      <Container className="relative">
        <div className="hero-panel -mt-24 max-w-[47rem] bg-paper p-7 sm:-mt-36 sm:p-11 lg:-mt-44 lg:p-14">
          <p className="rise mb-6 flex items-center gap-3 font-mono text-label uppercase text-heat-600" style={d('.55s')}>
            <span className="draw h-px w-7 flex-none bg-heat-500" style={d('.75s')} aria-hidden="true" />
            {t.heroEyebrow}
          </p>
          <h1 className="rise display-em font-display text-[2.7rem] leading-[1.02] sm:text-[3.7rem] lg:text-[4.5rem]" style={d('.65s')}>
            <RichText text={t.heroTitle} />
          </h1>
          <p className="rise mt-7 max-w-[37rem] text-[1.05rem] leading-[1.6] text-ink-soft sm:text-[1.1rem]" style={d('.8s')}>
            {t.heroLede}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={d('.95s')}>
            <Button href="/products/" size="lg">{t.heroPrimary}</Button>
            <Button href="/business/" variant="ghost" arrow>{t.heroSecondary}</Button>
          </div>
        </div>
        <p className="fade mt-5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint lg:text-right" style={d('1.15s')}>
          {tc.visualisation} — {t.heroCaption}
        </p>
      </Container>
    </section>
  );
}
