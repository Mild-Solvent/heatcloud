import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { PageEnter } from '@/components/PageEnter';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { getGroups, getServices } from '@/content/services';
import { BASE } from '@/lib/base';
import { fontClass } from '@/lib/fonts';
import { isLocale, locales } from '@/lib/i18n';
import { Link, LocaleProvider } from '@/lib/locale';

type Params = Promise<{ locale: string }>;

// Every route exists once per language; there is no server to serve a third.
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return {
    metadataBase: new URL(site.origin),
    title: { default: t.titleDefault, template: t.titleTemplate },
    description: t.description,
    robots: { index: false, follow: false },
    // Absolute paths are resolved against metadataBase, which drops the
    // project-site base path — so the base path is spelled out here.
    icons: {
      icon: [
        { url: `${BASE}/icon-192.png`, sizes: '192x192', type: 'image/png' },
        { url: `${BASE}/icon-512.png`, sizes: '512x512', type: 'image/png' },
      ],
      apple: `${BASE}/apple-touch-icon.png`,
    },
    openGraph: {
      type: 'website',
      siteName: site.nameFull,
      title: t.ogTitle,
      description: t.ogDescription,
      images: [`${BASE}/og.jpg`],
      locale: locale === 'sk' ? 'sk_SK' : 'en_IE',
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const menu = getServices(locale).map(({ slug, name, menuNote, group, from }) => ({ slug, name, menuNote, group, from }));

  return (
    <html lang={locale} className={fontClass} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col">
        <LocaleProvider locale={locale}>
          {/* Honest, and out of the way. The company does not exist yet. */}
          <div className="header-in bg-night-900 px-5 py-1.5 text-center font-mono text-[0.66rem] tracking-[0.03em] text-paper/65">
            <span className="text-heat-400">{d.banner.label}</span>
            {' — '}
            {d.banner.text}{' '}
            <Link href="/legal/imprint/" className="underline decoration-paper/30 underline-offset-2 hover:text-paper">
              {d.banner.link}
            </Link>
          </div>
          <Header locale={locale} t={d.nav} groups={getGroups(locale)} products={menu} />
          <main className="flex-1">
            <PageEnter>{children}</PageEnter>
          </main>
          <Footer locale={locale} t={d.footer} tc={d.company} />
        </LocaleProvider>
      </body>
    </html>
  );
}
