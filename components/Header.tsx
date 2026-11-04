'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Dict } from '@/content/i18n';
import type { Group, GroupKey } from '@/content/types';
import { localeShort, otherLocale, stripLocale, swapLocale, type Locale } from '@/lib/i18n';
import { Link } from '@/lib/locale';
import { Chevron, Logo } from './icons';

export type MenuProduct = { slug: string; name: string; menuNote: string; group: GroupKey; from: string };

type MenuKey = 'products' | 'company' | null;

export default function Header({
  locale, t, groups, products,
}: {
  locale: Locale; t: Dict['nav']; groups: Group[]; products: MenuProduct[];
}) {
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const other = otherLocale(locale);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Route change closes everything — otherwise the panel hangs over the new page.
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(null); setMobile(false); }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  const isActive = (href: string) => path === href || path.startsWith(href);
  const item = (active: boolean) =>
    `relative flex h-[60px] items-center gap-1.5 px-3 text-[0.9rem] transition-colors ${
      active ? 'text-ink' : 'text-ink-soft hover:text-ink'
    } after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:bg-heat-500 after:transition-opacity ${
      active ? 'after:opacity-100' : 'after:opacity-0'
    }`;

  if (path === '/' || path.startsWith('/heat-model')) {
    const sk = locale === 'sk';
    const home = path === '/' ? '' : '/';
    const links = [
      [`${home}#thesis`, sk ? 'Projekt' : 'The project'],
      [`${home}#system`, sk ? 'Technológia' : 'Technology'],
      ['/heat-model/', sk ? 'Tepelný model' : 'Heat model'],
      [`${home}#economics`, sk ? 'Ekonomika' : 'Economics'],
      ['/investors/', sk ? 'Pre investorov' : 'For investors'],
    ];
    return (
      <header className="il-header">
        <div className="il-header-inner">
          <Link href="/" className="il-brand" aria-label={t.home}>
            <Logo className="h-10 w-10" />
            <span>HeatCloud<small>Slovakia</small></span>
          </Link>
          <nav aria-label={sk ? 'Hlavná navigácia' : 'Main navigation'}>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
          <div className="il-header-right">
            <div className="il-languages" aria-label={t.language}><span>{localeShort[locale]}</span><span aria-hidden="true">/</span><NextLink href={swapLocale(pathname, other)} hrefLang={other} lang={other}>{localeShort[other]}</NextLink></div>
            <Link href="/contact/" className="il-header-cta">{sk ? 'Porozprávajme sa' : 'Let’s talk'} <span aria-hidden="true">↗</span></Link>
            <button type="button" className="il-menu-toggle" aria-label={t.menu} aria-expanded={mobile} aria-controls="landing-mobile-nav" onClick={() => setMobile(!mobile)}>{mobile ? '×' : '≡'}</button>
          </div>
        </div>
        {mobile && <nav id="landing-mobile-nav" className="il-mobile-nav" aria-label={sk ? 'Mobilná navigácia' : 'Mobile navigation'}>{[...links, ['/contact/', t.contact], ['/products/', t.products]].map(([href, label]) => <Link key={href} href={href} onClick={() => setMobile(false)}>{label}</Link>)}</nav>}
      </header>
    );
  }

  return (
    <header className="header-in sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div ref={navRef} className="mx-auto w-full max-w-page px-5 sm:px-8">
        <div className="flex h-[60px] items-center">
          <Link href="/" className="flex flex-none items-center gap-2.5" aria-label={t.home}>
            <Logo className="h-8 w-8 text-ink" />
            <span className="flex items-baseline gap-2">
              <span className="font-display text-[1.3rem] font-semibold tracking-tight text-ink">HeatCloud</span>
              <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted sm:inline">Slovakia</span>
            </span>
          </Link>

          {/* ---------- desktop nav ---------- */}
          <nav className="ml-8 hidden flex-1 items-center lg:flex" aria-label="Main">
            <button
              type="button"
              aria-expanded={open === 'products'}
              onClick={() => setOpen(open === 'products' ? null : 'products')}
              className={item(open === 'products' || isActive('/products/'))}
            >
              {t.products}
              <Chevron className={`h-2.5 w-2.5 transition ${open === 'products' ? 'rotate-180' : ''}`} />
            </button>
            <Link href="/pricing/" className={item(isActive('/pricing/'))}>{t.pricing}</Link>
            <Link href="/business/" className={item(isActive('/business/'))}>{t.business}</Link>
            <Link href="/console/" className={item(isActive('/console/'))}>{t.console}</Link>
            <button
              type="button"
              aria-expanded={open === 'company'}
              onClick={() => setOpen(open === 'company' ? null : 'company')}
              className={item(open === 'company')}
            >
              {t.company}
              <Chevron className={`h-2.5 w-2.5 transition ${open === 'company' ? 'rotate-180' : ''}`} />
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            {/* language switch: the same page in the other language */}
            <p className="flex items-center font-mono text-[0.72rem] tracking-[0.08em]" aria-label={t.language}>
              <span className="px-1 text-ink" lang={locale}>{localeShort[locale]}</span>
              <span className="text-line-strong" aria-hidden="true">/</span>
              <NextLink
                href={swapLocale(pathname, other)}
                hrefLang={other}
                lang={other}
                className="px-1 text-ink-faint transition-colors hover:text-ink"
              >
                {localeShort[other]}
              </NextLink>
            </p>
            <Link href="/contact/" className="hidden px-2 text-[0.9rem] text-ink-soft hover:text-ink sm:block">
              {t.contact}
            </Link>
            <Link
              href="/console/"
              className="hidden rounded bg-heat-500 px-3.5 py-1.5 text-[0.85rem] font-medium text-white transition-colors hover:bg-heat-600 sm:block"
            >
              {t.openConsole}
            </Link>
            <button
              type="button"
              onClick={() => setMobile(!mobile)}
              aria-expanded={mobile}
              aria-label={t.menu}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded border border-line lg:hidden"
            >
              <span className="relative block h-px w-4 bg-ink">
                <span className={`absolute left-0 block h-px w-4 bg-ink transition-all ${mobile ? 'top-0 rotate-45' : '-top-1.5'}`} />
                <span className={`absolute left-0 block h-px w-4 bg-ink transition-all ${mobile ? 'top-0 -rotate-45' : 'top-1.5'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* ---------- products panel ---------- */}
        {open === 'products' ? (
          <div className="absolute inset-x-0 top-[60px] hidden lg:block">
            <div className="animate-rise border-b border-line bg-paper shadow-menu">
              <div className="mx-auto w-full max-w-page px-5 sm:px-8">
                <div className="grid grid-cols-5 divide-x divide-line py-8">
                  {groups.map((g) => (
                    <div key={g.key} className="px-6 first:pl-0 last:pr-0">
                      <h3 className="mb-4 font-mono text-label uppercase text-ink-muted">{g.title}</h3>
                      <ul className="space-y-3.5">
                        {products.filter((s) => s.group === g.key).map((s) => (
                          <li key={s.slug}>
                            <Link href={`/products/${s.slug}/`} className="group block">
                              <span className="block text-[0.9rem] font-medium leading-tight text-ink group-hover:underline group-hover:decoration-heat-500 group-hover:underline-offset-4">
                                {s.name}
                              </span>
                              <span className="mt-1 block text-[0.76rem] leading-snug text-ink-muted">{s.menuNote}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-3.5">
                  <p className="font-mono text-[0.72rem] text-ink-muted">
                    {t.productsFoot.replace('{n}', String(products.length))}
                  </p>
                  <div className="flex gap-5 text-[0.85rem]">
                    <Link href="/pricing/" className="link-ink">{t.comparePrices}</Link>
                    <Link href="/products/" className="link-ink">{t.allProducts}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ---------- company panel ---------- */}
        {open === 'company' ? (
          <div className="absolute inset-x-0 top-[60px] hidden lg:block">
            <div className="mx-auto w-full max-w-page px-5 sm:px-8">
              <div className="ml-auto w-[600px] animate-rise border border-line bg-paper shadow-menu">
                <ul className="grid grid-cols-2 divide-x divide-line">
                  {t.companyLinks.map((c, i) => (
                    <li key={c.href} className={`${i >= 2 ? 'border-t border-line' : ''} ${i % 2 === 1 ? '!border-l' : ''}`}>
                      <Link href={c.href} className="group block px-5 py-4 hover:bg-paper-2">
                        <span className="block text-[0.9rem] font-medium text-ink">{c.label}</span>
                        <span className="mt-1 block text-[0.76rem] leading-snug text-ink-muted">{c.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* ---------- mobile drawer ---------- */}
      {mobile ? (
        <div className="fixed inset-x-0 bottom-0 top-[60px] z-50 overflow-y-auto bg-paper px-5 pb-24 pt-5 lg:hidden">
          <p className="mb-2 font-mono text-label uppercase text-ink-muted">{t.products}</p>
          <ul className="mb-8 divide-y divide-line border-y border-line">
            {products.map((s) => (
              <li key={s.slug}>
                <Link href={`/products/${s.slug}/`} className="flex items-baseline justify-between gap-3 py-2.5">
                  <span className="text-[0.97rem] text-ink">{s.name}</span>
                  <span className="font-mono text-[0.72rem] text-ink-faint">{s.from.replace(/^(from|od) /, '')}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-2 font-mono text-label uppercase text-ink-muted">{t.company}</p>
          <ul className="divide-y divide-line border-y border-line">
            {[
              [t.pricing, '/pricing/'],
              [t.consolePreview, '/console/'],
              ...t.companyLinks.map((c) => [c.label, c.href] as [string, string]),
              [t.contact, '/contact/'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="block py-2.5 text-[0.97rem] text-ink">{label}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[0.78rem] tracking-[0.08em]">
            <span className="text-ink">{localeShort[locale]}</span>
            <span className="mx-2 text-line-strong">/</span>
            <NextLink href={swapLocale(pathname, other)} hrefLang={other} lang={other} className="text-ink-faint underline underline-offset-4">
              {localeShort[other]}
            </NextLink>
          </p>
        </div>
      ) : null}
    </header>
  );
}
