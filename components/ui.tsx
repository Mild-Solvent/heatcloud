import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow, Check } from './icons';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-5 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  children, className = '', id, tone = 'white',
}: {
  children: ReactNode; className?: string; id?: string;
  tone?: 'white' | 'sand' | 'night' | 'teal';
}) {
  const tones = {
    white: 'bg-white',
    sand: 'bg-sand-100',
    night: 'bg-night-900 text-white',
    teal: 'bg-teal-600 text-white',
  } as const;
  return (
    <section id={id} className={`${tones[tone]} py-14 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ember-600 ${className}`}>
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow, title, lede, center = false, className = '',
}: {
  eyebrow?: string; title: ReactNode; lede?: ReactNode; center?: boolean; className?: string;
}) {
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-[1.7rem] font-bold leading-tight tracking-tight sm:text-[2.1rem]">{title}</h2>
      {lede ? <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-muted">{lede}</p> : null}
    </div>
  );
}

type ButtonProps = {
  href: string; children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'onDark';
  size?: 'md' | 'sm' | 'lg';
  className?: string;
  arrow?: boolean;
};

export function Button({ href, children, variant = 'primary', size = 'md', className = '', arrow }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variants = {
    primary: 'bg-ember-600 text-white hover:bg-ember-700 shadow-sm focus-visible:ring-ember-500',
    secondary: 'border border-sand-300 bg-white text-ink hover:border-ink-faint hover:shadow-sm focus-visible:ring-ember-500',
    ghost: 'text-ink hover:bg-sand-200 focus-visible:ring-ember-500',
    onDark: 'bg-white text-ink hover:bg-sand-100 focus-visible:ring-white',
  } as const;
  const sizes = { sm: 'px-3.5 py-1.5 text-[0.83rem]', md: 'px-5 py-2.5 text-[0.92rem]', lg: 'px-6 py-3 text-[1rem]' } as const;
  const external = href.startsWith('http');
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <Arrow /> : null}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export function Badge({
  children, tone = 'sand', className = '',
}: {
  children: ReactNode; tone?: 'sand' | 'ember' | 'teal' | 'outline'; className?: string;
}) {
  const tones = {
    sand: 'bg-sand-200 text-ink-soft',
    ember: 'bg-ember-100 text-ember-700',
    teal: 'bg-teal-100 text-teal-700',
    outline: 'border border-sand-300 text-ink-muted',
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function Card({
  children, className = '', hover = false,
}: {
  children: ReactNode; className?: string; hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-sand-300 bg-white p-6 ${
        hover ? 'transition hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-card' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Stat({
  value, label, tone = 'light',
}: {
  value: ReactNode; label: ReactNode; tone?: 'light' | 'dark';
}) {
  return (
    <div>
      <div className={`text-[1.75rem] font-bold leading-none tracking-tight sm:text-[2rem] ${
        tone === 'dark' ? 'text-white' : 'text-ink'
      }`}>
        {value}
      </div>
      <div className={`mt-2 text-[0.84rem] leading-snug ${tone === 'dark' ? 'text-white/65' : 'text-ink-muted'}`}>
        {label}
      </div>
    </div>
  );
}

export function CheckList({ items, className = '' }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[0.94rem] leading-relaxed text-ink-soft">
          <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <Check className="h-3 w-3" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumbs({ trail }: { trail: [string, string?][] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-sand-200 bg-sand-50">
      <Container>
        <ol className="flex flex-wrap items-center gap-1.5 py-3 text-[0.8rem] text-ink-faint">
          {trail.map(([label, href], i) => (
            <li key={label} className="flex items-center gap-1.5">
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {href ? (
                <Link href={href} className="text-ink-muted hover:text-ink hover:underline">{label}</Link>
              ) : (
                <span className="text-ink-soft">{label}</span>
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
 * not rewrite them the way it rewrites next/link. On a GitHub Pages project
 * site the whole app lives under /<repo>/, so they are prefixed here — without
 * this, every cross-reference in the legal documents 404s.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Prose({ html, className = '' }: { html: string; className?: string }) {
  const withBase = BASE ? html.replace(/href="\//g, `href="${BASE}/`) : html;
  return <div className={`prose-doc ${className}`} dangerouslySetInnerHTML={{ __html: withBase }} />;
}

export function Note({
  children, tone = 'ember',
}: {
  children: ReactNode; tone?: 'ember' | 'warn' | 'teal';
}) {
  const tones = {
    ember: 'border-ember-400 bg-ember-50',
    warn: 'border-red-400 bg-red-50',
    teal: 'border-teal-400 bg-teal-50',
  } as const;
  return (
    <div className={`my-6 rounded-r-xl border-l-4 ${tones[tone]} px-5 py-4 text-[0.92rem] leading-relaxed text-ink-soft`}>
      {children}
    </div>
  );
}
