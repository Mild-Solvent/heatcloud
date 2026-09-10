import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { site } from '@/content/company';
import { BASE } from '@/lib/base';
import { fontClass } from '@/lib/fonts';
import { defaultLocale } from '@/lib/i18n';

// A second root layout, for the one route outside /sk/ and /en/: the redirect
// at /. The meta refresh is the no-JavaScript fallback; the script in page.tsx
// picks the language first.
export const metadata: Metadata = {
  title: site.nameFull,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} className={fontClass}>
      <head>
        <meta httpEquiv="refresh" content={`1;url=${BASE}/${defaultLocale}/`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
