/**
 * Static export. Every route in this site is prerendered anyway — there is no
 * backend, the contact form composes a mailto: and the console is a mock — so
 * the output is a plain directory of HTML that GitHub Pages (or any web server)
 * can serve.
 *
 * BASE_PATH is set when deploying to a GitHub Pages *project* site, which is
 * served from /<repo>/ rather than the domain root. Leave it empty to serve at
 * the root, which is what the devbox does.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  // Directory URLs (/legal/terms/ -> legal/terms/index.html) so the same links
  // work on a static host with no rewrite rules.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // Note: security headers cannot be set by a static export — they belong to
  // whatever serves the files. The devbox nginx config sets them; on GitHub
  // Pages the per-page `robots: noindex` metadata in app/layout.tsx is what
  // keeps this preview out of search results.
};

export default nextConfig;
