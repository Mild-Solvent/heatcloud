import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';

// Downloaded at build time and served from this site's own files, so the
// cookie policy's "no third-party requests" stays true. latin-ext carries the
// Slovak diacritics.

export const display = Fraunces({
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-display',
  display: 'swap',
});

export const sans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontClass = `${display.variable} ${sans.variable} ${mono.variable}`;
