'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { groups, services } from '@/content/services';
import { Chevron, Icon, Logo } from './icons';
import { Badge } from './ui';

type MenuKey = 'products' | 'company' | null;

const COMPANY_LINKS: [string, string, string][] = [
  ['Business model', '/business/', 'How the money actually works, with the model you can move'],
  ['Heat recovery', '/heat/', 'Where the waste heat goes and what it is worth'],
  ['Data centres', '/datacenters/', 'The Slovak regions and their build status'],
  ['About', '/about/', 'What we are doing and how far along it is'],
  ['Support', '/support/', 'One tier, S1 answered in an hour, around the clock'],
  ['Legal', '/legal/', 'Terms, AUP, SLA, privacy, DPA'],
];

export default function Header() {
  const pathname = usePathname();
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-white/90 backdrop-blur">
      <div ref={navRef} className="mx-auto w-full max-w-page px-5 sm:px-6">
        <div className="flex h-16 items-center gap-2">
          <Link href="/" className="flex flex-none items-center gap-2.5 rounded-lg p-1" aria-label="HeatCloud Slovakia — home">
            <Logo className="h-9 w-9 text-ink" />
            <span className="leading-none">
              <span className="block text-[0.92rem] font-extrabold tracking-[0.08em]">HEATCLOUD</span>
              <span className="mt-1 block text-[0.56rem] font-semibold tracking-[0.24em] text-ember-600">SLOVAKIA</span>
            </span>
          </Link>

          {/* ---------- desktop nav ---------- */}
          <nav className="ml-6 hidden flex-1 items-center gap-0.5 lg:flex" aria-label="Main">
            <button
              type="button"
              aria-expanded={open === 'products'}
              onClick={() => setOpen(open === 'products' ? null : 'products')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.9rem] font-medium transition ${
                open === 'products' || isActive('/products/') ? 'bg-sand-200 text-ink' : 'text-ink-soft hover:bg-sand-100 hover:text-ink'
              }`}
            >
              Products
              <Chevron className={`h-2.5 w-2.5 transition ${open === 'products' ? 'rotate-180' : ''}`} />
            </button>

            <Link
              href="/pricing/"
              className={`rounded-lg px-3 py-2 text-[0.9rem] font-medium transition ${
                isActive('/pricing/') ? 'bg-sand-200 text-ink' : 'text-ink-soft hover:bg-sand-100 hover:text-ink'
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/business/"
              className={`rounded-lg px-3 py-2 text-[0.9rem] font-medium transition ${
                isActive('/business/') ? 'bg-sand-200 text-ink' : 'text-ink-soft hover:bg-sand-100 hover:text-ink'
              }`}
            >
              Business model
            </Link>

            <Link
              href="/console/"
              className={`rounded-lg px-3 py-2 text-[0.9rem] font-medium transition ${
                isActive('/console/') ? 'bg-sand-200 text-ink' : 'text-ink-soft hover:bg-sand-100 hover:text-ink'
              }`}
            >
              Console
            </Link>

            <button
              type="button"
              aria-expanded={open === 'company'}
              onClick={() => setOpen(open === 'company' ? null : 'company')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.9rem] font-medium transition ${
                open === 'company' ? 'bg-sand-200 text-ink' : 'text-ink-soft hover:bg-sand-100 hover:text-ink'
              }`}
            >
              Company
              <Chevron className={`h-2.5 w-2.5 transition ${open === 'company' ? 'rotate-180' : ''}`} />
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Badge tone="outline" className="hidden xl:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
              Preview build
            </Badge>
            <Link href="/contact/" className="hidden rounded-full px-3.5 py-2 text-[0.88rem] font-medium text-ink-soft hover:bg-sand-100 hover:text-ink sm:block">
              Contact
            </Link>
            <Link
              href="/console/"
              className="hidden rounded-full bg-ember-600 px-4 py-2 text-[0.88rem] font-semibold text-white transition hover:bg-ember-700 sm:block"
            >
              Open the console
            </Link>
            <button
              type="button"
              onClick={() => setMobile(!mobile)}
              aria-expanded={mobile}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-sand-300 lg:hidden"
            >
              <span className="relative block h-[1.6px] w-4 bg-ink">
                <span className={`absolute left-0 block h-[1.6px] w-4 bg-ink transition-all ${mobile ? 'top-0 rotate-45' : '-top-1.5'}`} />
                <span className={`absolute left-0 block h-[1.6px] w-4 bg-ink transition-all ${mobile ? 'top-0 -rotate-45' : 'top-1.5'}`} />
                <span className={mobile ? 'block h-full w-full bg-transparent' : 'hidden'} />
              </span>
            </button>
          </div>
        </div>

        {/* ---------- products mega panel ---------- */}
        {open === 'products' ? (
          <div className="absolute left-0 right-0 top-16 hidden lg:block">
            <div className="mx-auto max-w-page px-5 sm:px-6">
              <div className="animate-rise overflow-hidden rounded-2xl border border-sand-300 bg-white shadow-menu">
                <div className="grid grid-cols-4 gap-x-6 gap-y-1 p-6">
                  {groups.map((g) => (
                    <div key={g.key} className={g.key === 'heat' ? 'col-span-1' : ''}>
                      <h3 className="mb-2 px-2 text-[0.67rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                        {g.title}
                      </h3>
                      <ul>
                        {services.filter((s) => s.group === g.key).map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/products/${s.slug}/`}
                              className="group flex gap-2.5 rounded-lg px-2 py-2 hover:bg-sand-100"
                            >
                              <Icon name={s.icon} className="mt-0.5 h-4 w-4 flex-none text-teal-600" />
                              <span className="min-w-0">
                                <span className="block text-[0.86rem] font-semibold leading-tight text-ink">{s.name}</span>
                                <span className="mt-0.5 block text-[0.75rem] leading-snug text-ink-faint">{s.menuNote}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand-200 bg-sand-50 px-6 py-3.5">
                  <p className="text-[0.83rem] text-ink-muted">
                    {services.length} products, all running on our own hardware in Slovakia.
                  </p>
                  <div className="flex gap-2">
                    <Link href="/pricing/" className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-[0.83rem] font-semibold hover:border-ink-faint">
                      Compare prices
                    </Link>
                    <Link href="/products/" className="rounded-full bg-ink px-3.5 py-1.5 text-[0.83rem] font-semibold text-white hover:bg-night-700">
                      All products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ---------- company panel ---------- */}
        {open === 'company' ? (
          <div className="absolute left-0 right-0 top-16 hidden lg:block">
            <div className="mx-auto max-w-page px-5 sm:px-6">
              <div className="ml-auto w-[560px] animate-rise rounded-2xl border border-sand-300 bg-white p-4 shadow-menu">
                <ul className="grid grid-cols-2 gap-1">
                  {COMPANY_LINKS.map(([label, href, note]) => (
                    <li key={href}>
                      <Link href={href} className="block rounded-lg px-3 py-2.5 hover:bg-sand-100">
                        <span className="block text-[0.88rem] font-semibold text-ink">{label}</span>
                        <span className="mt-0.5 block text-[0.75rem] leading-snug text-ink-faint">{note}</span>
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
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-sand-200 bg-white px-5 pb-24 pt-4 lg:hidden">
          <p className="mb-2 px-1 text-[0.67rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Products</p>
          <ul className="mb-6 grid gap-0.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/products/${s.slug}/`} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-sand-100">
                  <Icon name={s.icon} className="h-4 w-4 flex-none text-teal-600" />
                  <span className="text-[0.95rem] font-medium">{s.name}</span>
                  <span className="ml-auto text-[0.78rem] text-ink-faint">{s.from.replace(/^from /, '')}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-2 px-1 text-[0.67rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Company</p>
          <ul className="grid gap-0.5">
            {[['Pricing', '/pricing/'], ['Console preview', '/console/'], ...COMPANY_LINKS.map((c) => [c[0], c[1]] as [string, string]), ['Contact', '/contact/']].map(
              ([label, href]) => (
                <li key={href}>
                  <Link href={href} className="block rounded-lg px-2 py-2.5 text-[0.95rem] font-medium hover:bg-sand-100">
                    {label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
