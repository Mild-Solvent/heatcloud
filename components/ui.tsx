import type { CSSProperties, ReactNode } from 'react';
import { Link } from '@/lib/locale';
import { localizeHref, type Locale } from '@/lib/i18n';
import { BASE } from '@/lib/base';
import { Arrow, Check } from './icons';
import { Reveal } from './Reveal';

/*
 * The site's vocabulary. Hairlines instead of boxes, mono captions instead of
 * badges, serif headings, squared corners, one shadow (the menu). Colour only
 * where it means something.
 */

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children, className = '', id, tone = 'paper', rule = false,
}: {
  children: ReactNode; className?: string; id?: string;
  tone?: 'paper' | 'paper2' | 'night' | 'card'; rule?: boolean;
}) {
  const tones = {
    paper: 'bg-paper',
    paper2: 'bg-paper-2',
    card: 'bg-card',
    night: 'bg-night-900 text-paper',
  } as const;
  return (
    <section id={id} className={`${tones[tone]} ${rule ? 'border-t border-line' : ''} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Mono caption with a short rule — the site's labelling voice. */
export function Eyebrow({
  children, tone = 'heat', className = '',
}: {
  children: ReactNode; tone?: 'heat' | 'water' | 'ink' | 'paper'; className?: string;
}) {
  const color = {
    heat: 'text-heat-600', water: 'text-water-600', ink: 'text-ink-muted', paper: 'text-paper/70',
  }[tone];
  const bar = { heat: 'bg-heat-500', water: 'bg-water-500', ink: 'bg-ink-faint', paper: 'bg-paper/50' }[tone];
  return (
    <p className={`mb-4 flex items-center gap-3 font-mono text-label uppercase ${color} ${className}`}>
      <span className={`eyebrow-rule h-px w-7 flex-none ${bar}`} aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow, title, lede, center = false, className = '', tone = 'heat', level = 'h2', reveal = true,
}: {
  eyebrow?: ReactNode; title: ReactNode; lede?: ReactNode; center?: boolean; className?: string;
  tone?: 'heat' | 'water' | 'ink' | 'paper'; level?: 'h1' | 'h2';
  /** Scroll-reveal; off for anything a visitor lands on, which animates on load instead. */
  reveal?: boolean;
}) {
  const H = level;
  const cls = `${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`;
  const inner = (
    <>
      {eyebrow ? <Eyebrow tone={tone} className={center ? 'justify-center' : ''}>{eyebrow}</Eyebrow> : null}
      <H className={level === 'h1'
        ? 'font-display text-[2.4rem] leading-[1.05] sm:text-[3.2rem]'
        : 'font-display text-[1.9rem] leading-[1.12] sm:text-[2.4rem]'}>
        {title}
      </H>
      {lede ? <p className="mt-5 text-[1.05rem] leading-[1.6] text-ink-muted">{lede}</p> : null}
    </>
  );
  return reveal ? <Reveal className={cls}>{inner}</Reveal> : <div className={cls}>{inner}</div>;
}

/** The introduction at the top of an inner page: title, lede, a hairline. It
 *  is what the visitor lands on, so it rises on load rather than waiting for
 *  a scroll observer. */
export function PageHead({
  eyebrow, title, lede, children, tone = 'heat',
}: {
  eyebrow?: ReactNode; title: ReactNode; lede?: ReactNode; children?: ReactNode; tone?: 'heat' | 'water' | 'ink';
}) {
  return (
    <div className="border-b border-line">
      <Container className="pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div className="rise" style={{ '--d': '.1s' } as CSSProperties}>
          <SectionHead eyebrow={eyebrow} title={title} lede={lede} level="h1" tone={tone} reveal={false} />
        </div>
        {children ? <div className="rise mt-8" style={{ '--d': '.3s' } as CSSProperties}>{children}</div> : null}
      </Container>
    </div>
  );
}

type ButtonProps = {
  href: string; children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'onDark' | 'onDarkGhost';
  size?: 'md' | 'sm' | 'lg';
  className?: string;
  arrow?: boolean;
};

export function Button({ href, children, variant = 'primary', size = 'md', className = '', arrow }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus-visible:outline-none';
  const variants = {
    primary: 'bg-heat-500 text-white hover:bg-heat-600',
    secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper',
    ghost: 'text-ink underline decoration-line-strong underline-offset-[5px] hover:decoration-heat-500 !px-0',
    onDark: 'bg-paper text-ink hover:bg-white',
    onDarkGhost: 'border border-paper/40 text-paper hover:border-paper hover:bg-paper/10',
  } as const;
  const sizes = {
    sm: 'px-3.5 py-1.5 text-[0.83rem]',
    md: 'px-5 py-2.5 text-[0.92rem]',
    lg: 'px-6 py-3 text-[0.97rem]',
  } as const;
  const external = href.startsWith('http');
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <Arrow className="h-3.5 w-3.5 text-heat-600" /> : null}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

/** Small mono tag. Outline by default; a colour only when it means something. */
export function Tag({
  children, tone = 'outline', className = '',
}: {
  children: ReactNode; tone?: 'outline' | 'heat' | 'water' | 'ink'; className?: string;
}) {
  const tones = {
    outline: 'border-line-strong text-ink-muted',
    heat: 'border-heat-500 text-heat-700',
    water: 'border-water-500 text-water-700',
    ink: 'border-ink bg-ink text-paper',
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/** A bordered panel for things that are genuinely a surface: forms, the console, the model. */
export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-md border border-line bg-card ${className}`}>{children}</div>;
}

export function Stat({
  value, label, tone = 'light', size = 'md',
}: {
  value: ReactNode; label: ReactNode; tone?: 'light' | 'dark' | 'heat' | 'water'; size?: 'md' | 'lg';
}) {
  const valueColor = {
    light: 'text-ink', dark: 'text-paper', heat: 'text-heat-500', water: 'text-water-500',
  }[tone];
  const labelColor = tone === 'dark' ? 'text-paper/60' : 'text-ink-muted';
  return (
    <div>
      <div className={`font-display tabular ${size === 'lg' ? 'text-[2.6rem] sm:text-[3rem]' : 'text-[2rem] sm:text-[2.3rem]'} leading-none tracking-tight ${valueColor}`}>
        {value}
      </div>
      <div className={`mt-2.5 max-w-[16rem] text-[0.84rem] leading-snug ${labelColor}`}>{label}</div>
    </div>
  );
}

/** A row of figures separated by hairlines. */
export function Figures({ items, tone = 'light' }: { items: { value: ReactNode; label: ReactNode }[]; tone?: 'light' | 'dark' }) {
  const line = tone === 'dark' ? 'border-paper/15 divide-paper/15' : 'border-line divide-line';
  return (
    <Reveal>
      <dl className={`grid grid-cols-2 border-y md:grid-cols-4 md:divide-x ${line}`}>
        {items.map((f, i) => (
          <div key={i} className={`px-0 py-7 md:px-6 md:first:pl-0 md:last:pr-0 ${i % 2 === 1 ? 'pl-6 md:pl-6' : ''}`}>
            <dt className="sr-only">{f.label}</dt>
            <dd><Stat value={f.value} label={f.label} tone={tone} /></dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/** Numbered items on a hairline grid — the replacement for icon-card rows. */
export function Numbered({
  items, cols = 3, dark = false, start = 1,
}: {
  items: { t: ReactNode; b: ReactNode }[]; cols?: 2 | 3 | 4; dark?: boolean; start?: number;
}) {
  const colCls = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[cols];
  return (
    <ol className={`grid gap-x-10 gap-y-10 ${colCls}`}>
      {items.map((it, i) => (
        <li key={i} className={`border-t pt-5 ${dark ? 'border-paper/25' : 'border-ink'}`}>
          <Reveal delay={i * 90}>
            <span className={`font-mono text-[0.7rem] ${dark ? 'text-heat-400' : 'text-heat-600'}`}>
              {String(start + i).padStart(2, '0')}
            </span>
            <h3 className={`mt-3 font-display text-[1.35rem] leading-snug ${dark ? 'text-paper' : 'text-ink'}`}>{it.t}</h3>
            <p className={`mt-3 text-[0.93rem] leading-relaxed ${dark ? 'text-paper/65' : 'text-ink-muted'}`}>{it.b}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Title/body pairs on a hairline grid. */
export function RuleGrid({
  items, cols = 2, dark = false,
}: {
  items: [ReactNode, ReactNode][]; cols?: 2 | 3; dark?: boolean;
}) {
  const colCls = cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  return (
    <dl className={`grid gap-x-10 gap-y-8 ${colCls}`}>
      {items.map(([t, b], i) => (
        <div key={i} className={`border-t pt-4 ${dark ? 'border-paper/20' : 'border-line'}`}>
          <dt className={`text-[1.02rem] font-semibold ${dark ? 'text-paper' : 'text-ink'}`}>{t}</dt>
          <dd className={`mt-2 text-[0.92rem] leading-relaxed ${dark ? 'text-paper/65' : 'text-ink-muted'}`}>{b}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CheckList({ items, className = '' }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5 py-3 text-[0.95rem] leading-relaxed text-ink-soft">
          <Check className="mt-1.5 h-3.5 w-3.5 flex-none text-heat-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Key/value rows, hairline-separated. */
export function DefList({ rows, className = '' }: { rows: [ReactNode, ReactNode][]; className?: string }) {
  return (
    <dl className={`kv text-[0.9rem] ${className}`}>
      {rows.map(([k, v], i) => (
        <div key={i}>
          <dt className="text-ink-muted">{k}</dt>
          <dd className="text-right font-medium text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FAQ({ items, className = '' }: { items: [string, string][]; className?: string }) {
  return (
    <div className={`border-b border-line ${className}`}>
      {items.map(([q, a]) => (
        <details key={q} className="faq">
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: [string, string?][] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line">
      <Container>
        <ol className="flex flex-wrap items-center gap-2 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint">
          {trail.map(([label, href], i) => (
            <li key={`${label}-${i}`} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden="true" className="text-line-strong">/</span> : null}
              {href ? (
                <Link href={href} className="hover:text-ink">{label}</Link>
              ) : (
                <span className="text-ink-muted">{label}</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}

/**
 * Authored HTML from content/. Trusted, authored in this repo, never user input.
 *
 * Root-relative hrefs inside these fragments are plain <a> tags, so Next does
 * not rewrite them the way it rewrites next/link: they need the locale segment
 * and, on a GitHub Pages project site, the base path.
 */
export function Prose({ html, locale, className = '' }: { html: string; locale: Locale; className?: string }) {
  const rewritten = html.replace(/href="(\/[^"]*)"/g, (_, href: string) => `href="${BASE}${localizeHref(locale, href)}"`);
  return <div className={`prose-doc ${className}`} dangerouslySetInnerHTML={{ __html: rewritten }} />;
}

export function Note({
  children, tone = 'heat', className = '',
}: {
  children: ReactNode; tone?: 'heat' | 'water' | 'warn'; className?: string;
}) {
  const tones = {
    heat: 'border-heat-500',
    water: 'border-water-500',
    warn: 'border-alert',
  } as const;
  return (
    <div className={`my-8 border-l-2 ${tones[tone]} pl-5 text-[0.93rem] leading-relaxed text-ink-soft ${className}`}>
      {children}
    </div>
  );
}

/** The closing block on inner pages: a line, a question, two actions. */
export function Closing({
  title, lede, primary, secondary, tone = 'paper2',
}: {
  title: ReactNode; lede?: ReactNode;
  primary: { href: string; label: ReactNode };
  secondary?: { href: string; label: ReactNode };
  tone?: 'paper2' | 'paper';
}) {
  return (
    <Section tone={tone} rule>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="font-display text-[1.9rem] leading-[1.12] sm:text-[2.4rem]">{title}</h2>
          {lede ? <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-muted">{lede}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
          <Button href={primary.href} size="lg">{primary.label}</Button>
          {secondary ? <Button href={secondary.href} variant="ghost" arrow>{secondary.label}</Button> : null}
        </div>
      </div>
    </Section>
  );
}
