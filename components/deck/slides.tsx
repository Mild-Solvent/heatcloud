import type { CSSProperties, ReactNode } from 'react';
import HeatFlow from '@/components/HeatFlow';
import { Logo } from '@/components/icons';
import { RichText } from '@/components/RichText';
import { company, site } from '@/content/company';
import type { Dict } from '@/content/i18n';
import { BASE } from '@/lib/base';
import type { Locale } from '@/lib/i18n';
import type { DeckSlide } from './Deck';
import EuropeMap from './EuropeMap';

/**
 * The sixteen slides. Everything that rises in is marked `.s` with its
 * position in the sequence in `--i`; the CSS in globals.css turns that into a
 * delay. Slides alternate between night and paper so the deck has a rhythm.
 */

const st = (i: number) => ({ '--i': i }) as CSSProperties;

function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`deck-body ${className}`}>{children}</div>;
}

function Eyebrow({ children, i = 0 }: { children: ReactNode; i?: number }) {
  return (
    <p className="s deck-eyebrow" style={st(i)}>
      <span className="s-draw h-px w-7 flex-none bg-current" style={st(i)} aria-hidden="true" />
      {children}
    </p>
  );
}

function Title({ children, i = 1, className = '' }: { children: ReactNode; i?: number; className?: string }) {
  return <h2 className={`s deck-title display-em ${className}`} style={st(i)}>{children}</h2>;
}

function Lede({ children, i = 2, className = '' }: { children: ReactNode; i?: number; className?: string }) {
  return <p className={`s deck-lede ${className}`} style={st(i)}>{children}</p>;
}

function Foot({ children, i = 9, className = '' }: { children: ReactNode; i?: number; className?: string }) {
  return <p className={`s deck-foot ${className}`} style={st(i)}>{children}</p>;
}

function Big({ v, l, i, size = 'md' }: { v: ReactNode; l: ReactNode; i: number; size?: 'md' | 'lg' | 'sm' }) {
  const vs = { sm: 'text-[clamp(1.5rem,2.4vw,2.2rem)]', md: 'text-[clamp(1.9rem,3.2vw,3rem)]', lg: 'text-[clamp(2.4rem,4vw,3.8rem)]' }[size];
  return (
    <div className="s" style={st(i)}>
      <dt className="sr-only">{l}</dt>
      <dd>
        <div className={`deck-num ${vs}`}>{v}</div>
        <div className="deck-num-l">{l}</div>
      </dd>
    </div>
  );
}

function Numbered({ items, from = 3, cols = 3 }: { items: readonly (readonly [string, string])[]; from?: number; cols?: 2 | 3 | 4 }) {
  const c = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[cols];
  return (
    <ol className={`grid gap-x-8 gap-y-7 ${c}`}>
      {items.map(([t, b], k) => (
        <li key={t} className="s deck-rule pt-4" style={st(from + k)}>
          <span className="deck-mono-accent">{String(k + 1).padStart(2, '0')}</span>
          <h3 className="mt-2.5 font-display text-[clamp(1.1rem,1.5vw,1.4rem)] leading-snug">{t}</h3>
          <p className="deck-p mt-2.5">{b}</p>
        </li>
      ))}
    </ol>
  );
}

function Photo({ src, position }: { src: string; position: string }) {
  return (
    <img
      src={`${BASE}${src}`}
      alt=""
      decoding="async"
      className="s-photo absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: position }}
    />
  );
}

export function buildSlides(locale: Locale, d: Dict): DeckSlide[] {
  const t = d.deck;
  const ui = t.ui;
  const modelHref = `${site.origin}/${locale}/business/`;

  const cover: DeckSlide = {
    id: 'cover', label: t.cover.title.replace(/\*/g, ''), tone: 'night',
    content: (
      <div className="relative min-h-full">
        <Photo src="/hero.jpg" position="56% 58%" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-night-950/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950/75 via-night-950/20 to-transparent" aria-hidden="true" />
        <Body className="relative !justify-end">
          <div className="max-w-[56rem]">
            <p className="s flex items-center gap-3" style={st(0)}>
              <Logo className="h-9 w-9" />
              <span className="font-display text-[1.25rem]">
                HeatCloud <span className="ml-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/70">Slovakia</span>
              </span>
            </p>
            <div className="mt-8">
              <Eyebrow i={1}>{t.cover.eyebrow}</Eyebrow>
            </div>
            <h1 className="s deck-title display-em !text-[clamp(2.5rem,6.2vw,5.8rem)]" style={st(2)}>
              <RichText text={t.cover.title} />
            </h1>
            <p className="s mt-7 max-w-[40rem] text-[clamp(1rem,1.5vw,1.28rem)] leading-relaxed text-paper/80" style={st(3)}>{t.cover.sub}</p>
            <p className="s mt-9 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-heat-400" style={st(4)}>{t.cover.tag} · {ui.date}</p>
          </div>
        </Body>
      </div>
    ),
  };

  const problem: DeckSlide = {
    id: 'problem', label: t.problem.eyebrow, tone: 'paper',
    content: (
      <Body>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <Eyebrow>{t.problem.eyebrow}</Eyebrow>
            <Title>{t.problem.title}</Title>
            <Lede>{t.problem.lede}</Lede>
            <Foot i={8}>{t.problem.foot}</Foot>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-l border-line pl-7 sm:pl-10">
            {t.problem.stats.map(([v, l], k) => <Big key={l} v={v} l={l} i={3 + k} size="lg" />)}
          </dl>
        </div>
      </Body>
    ),
  };

  const idea: DeckSlide = {
    id: 'idea', label: t.idea.eyebrow, tone: 'night',
    content: (
      <Body>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <Eyebrow>{t.idea.eyebrow}</Eyebrow>
            <Title>{t.idea.title}</Title>
            <div className="mt-10">
              <Numbered items={t.idea.points} cols={2} />
            </div>
          </div>
          <div className="s [&_figcaption]:text-paper/60" style={st(2)}>
            <HeatFlow t={d.heatFlow} />
          </div>
        </div>
      </Body>
    ),
  };

  const physics: DeckSlide = {
    id: 'physics', label: t.physics.eyebrow, tone: 'paper',
    content: (
      <Body>
        <Eyebrow>{t.physics.eyebrow}</Eyebrow>
        <Title>{t.physics.title}</Title>
        <div className="mt-10">
          <Numbered items={t.physics.steps} cols={4} from={2} />
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
          {t.physics.stats.map(([v, l], k) => <Big key={l} v={v} l={l} i={6 + k} />)}
        </dl>
      </Body>
    ),
  };

  const world: DeckSlide = {
    id: 'world', label: t.world.eyebrow, tone: 'night',
    content: (
      <Body>
        <div className="grid gap-x-12 gap-y-3 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <Eyebrow>{t.world.eyebrow}</Eyebrow>
            <Title className="!text-[clamp(1.7rem,3.3vw,3.1rem)]">{t.world.title}</Title>
          </div>
          <Lede className="!mt-0 lg:pb-1">{t.world.lede}</Lede>
        </div>
        <div className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <div className="s rounded-md border border-paper/10 bg-night-900 p-2" style={st(3)}>
              <EuropeMap points={t.world.cases} here={t.world.here} hereNote={t.world.hereNote} />
            </div>
            <Foot i={11} className="!mt-4">{t.world.foot}</Foot>
          </div>
          <ol className="divide-y divide-paper/12">
            {t.world.cases.map((c, k) => (
              <li key={c.city} className="s grid grid-cols-[7rem_1fr] gap-4 py-2 text-[0.78rem] leading-snug" style={st(4 + k)}>
                <div>
                  <div className="font-medium text-paper">{c.city}</div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-paper/45">{c.country}</div>
                </div>
                <div>
                  <span className="font-mono text-[0.64rem] text-water-300">{c.who}</span>
                  <p className="mt-0.5 text-paper/70">{c.fact}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Body>
    ),
  };

  const town: DeckSlide = {
    id: 'town', label: t.town.eyebrow, tone: 'paper',
    content: (
      <Body>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{t.town.eyebrow}</Eyebrow>
            <Title>{t.town.title}</Title>
            <Lede>{t.town.body}</Lede>
            <blockquote className="s mt-8 max-w-[34rem] border-l-2 border-heat-500 pl-5 font-display text-[clamp(1.1rem,1.6vw,1.45rem)] leading-snug text-ink" style={st(3)}>
              {t.town.quote}
            </blockquote>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
            {t.town.stats.map(([v, l], k) => <Big key={l} v={v} l={l} i={4 + k} size="lg" />)}
          </dl>
        </div>
      </Body>
    ),
  };

  const tailwind: DeckSlide = {
    id: 'tailwind', label: t.tailwind.eyebrow, tone: 'night',
    content: (
      <Body>
        <Eyebrow>{t.tailwind.eyebrow}</Eyebrow>
        <Title>{t.tailwind.title}</Title>
        <div className="mt-10">
          <Numbered items={t.tailwind.items} cols={3} from={2} />
        </div>
        <dl className="mt-12 grid gap-x-8 gap-y-8 border-t border-paper/15 pt-8 md:grid-cols-3">
          {t.tailwind.big.map(([v, l], k) => <Big key={l} v={<span className="text-heat-400">{v}</span>} l={l} i={5 + k} />)}
        </dl>
      </Body>
    ),
  };

  const list = (rows: readonly (readonly [string, string])[], from: number) => (
    <ul className="divide-y divide-current/10">
      {rows.map(([v, l], k) => (
        <li key={v} className="s grid gap-1 py-3.5 sm:grid-cols-[12.5rem_1fr] sm:gap-5" style={st(from + k)}>
          <span className="font-display text-[clamp(1.05rem,1.4vw,1.3rem)] leading-tight">{v}</span>
          <span className="deck-p">{l}</span>
        </li>
      ))}
    </ul>
  );

  const municipality: DeckSlide = {
    id: 'municipality', label: t.municipality.eyebrow, tone: 'paper',
    content: (
      <Body>
        <div className="max-w-[60rem]">
          <Eyebrow>{t.municipality.eyebrow}</Eyebrow>
          <Title>{t.municipality.title}</Title>
          <Lede>{t.municipality.lede}</Lede>
        </div>
        <div className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-2">
          <div>
            <h3 className="s deck-mono-accent border-b border-ink pb-2" style={st(3)}>{t.municipality.leftTitle}</h3>
            {list(t.municipality.left, 4)}
          </div>
          <div>
            <h3 className="s deck-mono-accent border-b border-ink pb-2" style={st(3)}>{t.municipality.rightTitle}</h3>
            {list(t.municipality.right, 4)}
          </div>
        </div>
        <Foot i={9}>{t.municipality.foot}</Foot>
      </Body>
    ),
  };

  const business: DeckSlide = {
    id: 'business', label: t.business.eyebrow, tone: 'night',
    content: (
      <Body>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{t.business.eyebrow}</Eyebrow>
            <Title>{t.business.title}</Title>
            <Lede>{t.business.lede}</Lede>
            <p className="s deck-p mt-7 max-w-[34rem]" style={st(3)}>{t.business.note}</p>
            <p className="s mt-6" style={st(4)}>
              <a href={modelHref} className="deck-link" target="_blank" rel="noopener noreferrer">{t.business.link} →</a>
            </p>
          </div>
          <div className="s deck-on-paper rounded-md bg-paper p-6 text-ink sm:p-8" style={st(2)}>
            <p className="label">{t.business.panelLabel}</p>
            <div className="mt-6 space-y-5">
              {t.business.bars.map(([label, value, share], k) => (
                <div key={label}>
                  <div className="mb-2 flex items-baseline justify-between gap-4 text-[0.9rem]">
                    <span>{label}</span>
                    <span className="font-mono text-[0.78rem] text-ink-muted">{value}</span>
                  </div>
                  <div className="h-[7px] w-full bg-paper-3">
                    <div className={`s-bar h-full ${k === 0 ? 'bg-water-500' : 'bg-heat-500'}`} style={{ width: `${share}%`, ...st(k) }} />
                  </div>
                </div>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6">
              {t.business.kpis.map(([v, l], k) => <Big key={l} v={v} l={l} i={5 + k} size="sm" />)}
            </dl>
          </div>
        </div>
      </Body>
    ),
  };

  const product: DeckSlide = {
    id: 'product', label: t.product.eyebrow, tone: 'paper',
    content: (
      <Body>
        <div className="max-w-[60rem]">
          <Eyebrow>{t.product.eyebrow}</Eyebrow>
          <Title>{t.product.title}</Title>
          <Lede>{t.product.lede}</Lede>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {t.product.groups.map(([g, items], k) => (
            <div key={g} className="s deck-rule pt-4" style={st(3 + k)}>
              <h3 className="deck-mono-accent">{g}</h3>
              <ul className="mt-3 divide-y divide-line">
                {items.map((it) => <li key={it} className="py-2 text-[0.9rem] leading-snug text-ink-soft">{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <Foot i={8} className="max-w-[52rem]">{t.product.foot}</Foot>
      </Body>
    ),
  };

  const half = (title: string, items: readonly string[], i: number, accent: string) => (
    <div className="s rounded-md border border-paper/15 p-6 sm:p-7" style={st(i)}>
      <h3 className={`font-display text-[clamp(1.15rem,1.6vw,1.5rem)] leading-snug ${accent}`}>{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="deck-p relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-heat-400">{it}</li>
        ))}
      </ul>
    </div>
  );

  const funding: DeckSlide = {
    id: 'funding', label: t.funding.eyebrow, tone: 'night',
    content: (
      <Body>
        <Eyebrow>{t.funding.eyebrow}</Eyebrow>
        <Title className="max-w-[54rem]">{t.funding.title}</Title>
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          {half(t.funding.leftTitle, t.funding.left, 2, 'text-water-300')}
          {half(t.funding.rightTitle, t.funding.right, 3, 'text-heat-400')}
        </div>
        <div className="mt-9">
          <h3 className="s deck-mono-accent" style={st(4)}>{t.funding.checkTitle}</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {t.funding.checks.map((c, k) => (
              <li key={c} className="s flex gap-3 text-[0.9rem] leading-snug text-paper/80" style={st(5 + k)}>
                <svg viewBox="0 0 16 16" className="mt-[3px] h-3.5 w-3.5 flex-none text-heat-400" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <Foot i={11} className="max-w-[56rem]">{t.funding.foot}</Foot>
      </Body>
    ),
  };

  const plan: DeckSlide = {
    id: 'plan', label: t.plan.eyebrow, tone: 'paper',
    content: (
      <Body>
        <Eyebrow>{t.plan.eyebrow}</Eyebrow>
        <Title>{t.plan.title}</Title>
        <ol className="mt-12 grid gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-4">
          {t.plan.phases.map(([year, title, body], k) => (
            <li key={year} className="s relative border-t-2 border-ink pt-6" style={st(2 + k)}>
              <span className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-heat-500" aria-hidden="true" />
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-heat-600">{year}</span>
              <h3 className="mt-3 font-display text-[clamp(1.2rem,1.8vw,1.6rem)] leading-snug">{title}</h3>
              <p className="deck-p mt-3">{body}</p>
            </li>
          ))}
        </ol>
      </Body>
    ),
  };

  const risks: DeckSlide = {
    id: 'risks', label: t.risks.eyebrow, tone: 'night',
    content: (
      <Body>
        <Eyebrow>{t.risks.eyebrow}</Eyebrow>
        <Title>{t.risks.title}</Title>
        <ul className="mt-10 divide-y divide-paper/12 border-t border-paper/25">
          {t.risks.items.map(([r, m], k) => (
            <li key={r} className="s grid gap-2 py-4 md:grid-cols-[1fr_1.5fr] md:gap-10" style={st(2 + k)}>
              <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.35rem)] leading-snug">
                <span className="mr-3 font-mono text-[0.68rem] text-heat-400">{String(k + 1).padStart(2, '0')}</span>{r}
              </h3>
              <p className="deck-p">{m}</p>
            </li>
          ))}
        </ul>
      </Body>
    ),
  };

  const ask: DeckSlide = {
    id: 'ask', label: t.ask.eyebrow, tone: 'paper',
    content: (
      <Body>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{t.ask.eyebrow}</Eyebrow>
            <Title>{t.ask.title}</Title>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
              {t.ask.stats.map(([v, l], k) => <Big key={l} v={v} l={l} i={2 + k} />)}
            </dl>
            <Foot i={10}>{t.ask.foot}</Foot>
          </div>
          <div className="s rounded-md border border-line bg-card p-6 sm:p-8" style={st(3)}>
            <p className="label">{t.ask.useTitle}</p>
            <ul className="mt-6 space-y-4">
              {t.ask.use.map(([label, pct], k) => (
                <li key={label}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-4 text-[0.9rem]">
                    <span className="text-ink">{label}</span>
                    <span className="font-mono text-[0.78rem] text-ink-muted">{pct} %</span>
                  </div>
                  <div className="h-[6px] w-full bg-paper-3">
                    <div className="s-bar h-full bg-heat-500" style={{ width: `${pct}%`, ...st(k) }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-line pt-5 text-[0.86rem] leading-relaxed text-ink-muted">{t.ask.next}</p>
          </div>
        </div>
      </Body>
    ),
  };

  const close: DeckSlide = {
    id: 'close', label: t.close.title, tone: 'night',
    content: (
      <div className="relative min-h-full">
        <Photo src="/hero.jpg" position="70% 60%" />
        <div className="absolute inset-0 bg-night-950/80" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" aria-hidden="true" />
        <Body className="relative items-center text-center">
          <p className="s" style={st(0)}><Logo className="mx-auto h-14 w-14" /></p>
          <h2 className="s deck-title mt-8 !text-[clamp(2.2rem,5.4vw,5rem)]" style={st(1)}>{t.close.title}</h2>
          <p className="s mx-auto mt-6 max-w-[38rem] text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-paper/75" style={st(2)}>{t.close.sub}</p>
          <p className="s mt-10" style={st(3)}>
            <a href={`mailto:${company.email}`} className="font-display text-[clamp(1.5rem,3vw,2.6rem)] text-heat-400 underline decoration-heat-400/40 underline-offset-8 hover:decoration-heat-400">
              {company.email}
            </a>
          </p>
          <p className="s mt-8 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/50" style={st(4)}>
            {t.close.siteLabel} · <a href={`${site.origin}/${locale}/`} className="text-paper/80 underline underline-offset-4">{site.origin.replace(/^https?:\/\//, '')}</a>
          </p>
        </Body>
      </div>
    ),
  };

  const sources: DeckSlide = {
    id: 'sources', label: t.sources.eyebrow, tone: 'paper',
    content: (
      <Body>
        <Eyebrow>{t.sources.eyebrow}</Eyebrow>
        <Title>{t.sources.title}</Title>
        <ol className="mt-8 grid gap-x-10 gap-y-2 text-[0.78rem] leading-snug md:grid-cols-2">
          {t.sources.items.map(([label, url], k) => (
            <li key={url} className="s flex gap-3 border-b border-line py-2" style={st(2 + Math.floor(k / 2))}>
              <span className="font-mono text-[0.66rem] text-ink-faint">{String(k + 1).padStart(2, '0')}</span>
              <a href={url} className="text-ink-soft underline decoration-line-strong underline-offset-[3px] hover:decoration-heat-500" target="_blank" rel="noopener noreferrer">{label}</a>
            </li>
          ))}
        </ol>
        <Foot i={11}>{t.sources.model} <a href={modelHref} className="underline underline-offset-2">{modelHref.replace(/^https?:\/\//, '')}</a></Foot>
      </Body>
    ),
  };

  return [cover, problem, idea, physics, world, town, tailwind, municipality, business, product, funding, plan, risks, ask, close, sources];
}
