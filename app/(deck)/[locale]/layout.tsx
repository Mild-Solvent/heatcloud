import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../../globals.css';
import { site } from '@/content/company';
import { getDict } from '@/content/i18n';
import { fontClass } from '@/lib/fonts';
import { isLocale, locales } from '@/lib/i18n';
import { LocaleProvider } from '@/lib/locale';

type Params = Promise<{ locale: string }>;

/**
 * A second root layout, for the pages that take the whole screen: no site
 * header, no footer, no page entrance. Everything under app/(deck) renders
 * here; the ordinary site lives under app/[locale].
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    metadataBase: new URL(site.origin),
    title: { default: d.meta.titleDefault, template: d.meta.titleTemplate },
    robots: { index: false, follow: false },
    icons: {
      icon: [
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  };
}

export default async function DeckLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={fontClass} suppressHydrationWarning>
      <body className="bg-night-950 text-paper">
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
