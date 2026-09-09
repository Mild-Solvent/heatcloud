import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/content/company';

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.nameFull} — the Slovak cloud that heats towns`,
    template: `%s — ${site.nameFull}`,
  },
  description:
    'Cloud servers, storage, mail and managed services in Slovak data centres — with the recovered heat sold into district heating networks below the cost of gas.',
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/icon-192.png', sizes: '192x192' }],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: site.nameFull,
    title: 'The Slovak cloud that heats towns',
    description:
      'Compute at market rates, recovered heat at gas-minus-20%. A working preview of the service catalogue, the pricing and the business model.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {/* Honest, and out of the way. The company does not exist yet. */}
        <div className="bg-night-900 px-5 py-1.5 text-center text-[0.76rem] text-white/70">
          <span className="font-semibold text-ember-400">Preview</span>
          {' — '}
          {site.nameFull} is in formation. Nothing here can be ordered, and the legal identifiers are placeholders.{' '}
          <Link href="/legal/imprint/" className="underline decoration-white/30 underline-offset-2 hover:text-white">
            What this is
          </Link>
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
