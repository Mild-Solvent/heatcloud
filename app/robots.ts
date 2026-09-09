import type { MetadataRoute } from 'next';

// Required by `output: 'export'` — the route has to be emitted at build time.
export const dynamic = 'force-static';

// A preview of a company that does not exist yet: nothing here should be indexed.
// On a GitHub Pages *project* site this file lands at /<repo>/robots.txt, which
// crawlers do not read — only a root robots.txt counts. The per-page
// `robots: { index: false }` metadata in app/layout.tsx is what actually holds.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } };
}
