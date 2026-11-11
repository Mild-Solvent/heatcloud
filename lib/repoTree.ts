import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';
import { legalSlugs } from '@/content/legal';
import { serviceSlugs } from '@/content/services';

/*
 * Build-time walk of the checkout for /repo/. The site is a static export, so
 * this runs once inside `next build` and the result is baked into the HTML.
 * Nothing here ships to the browser.
 */

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', '.next', 'out', '.git', 'shots', '.claude', '.vercel']);
const SKIP_FILES = new Set(['next-env.d.ts', 'tsconfig.tsbuildinfo', '.DS_Store']);
const TEXT = /\.(tsx?|mjs|js|json|css|md|ya?ml|html|sh|conf)$|^(Dockerfile|\.gitignore|\.dockerignore|\.nojekyll)$/;
const SCANNED = /\.(tsx?|mjs|css|html)$/;

export type RepoFile = { path: string; bytes: number; lines: number | null; usedBy: string[] };

function walk(dir: string, out: string[]) {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(rel, out); }
    else if (e.isFile() && !SKIP_FILES.has(e.name) && !/^\.env(\.|$)/.test(e.name)) out.push(rel);
  }
}

const RESOLVE_EXT = ['', '.ts', '.tsx', '.mjs', '.js', '/index.ts', '/index.tsx'];

function resolveImport(from: string, spec: string, known: Set<string>): string | null {
  let base: string;
  if (spec.startsWith('@/')) base = spec.slice(2);
  else if (spec.startsWith('.')) base = posix.normalize(posix.join(posix.dirname(from), spec));
  else return null;
  for (const ext of RESOLVE_EXT) if (known.has(base + ext)) return base + ext;
  return null;
}

let cache: RepoFile[] | null = null;

export function getRepoFiles(): RepoFile[] {
  if (cache) return cache;
  const paths: string[] = [];
  walk('', paths);
  paths.sort((a, b) => a.localeCompare(b));
  const known = new Set(paths);
  const usedBy = new Map<string, Set<string>>(paths.map((p) => [p, new Set()]));
  const texts = new Map<string, string>();
  for (const p of paths) {
    const name = posix.basename(p);
    if (TEXT.test(name) || TEXT.test(p)) texts.set(p, readFileSync(join(ROOT, p), 'utf8'));
  }

  const publicFiles = paths.filter((p) => p.startsWith('public/')).map((p) => p.slice('public/'.length));
  for (const [p, src] of texts) {
    if (!SCANNED.test(p) || p.startsWith('public/')) continue;
    for (const m of src.matchAll(/(?:from\s+|import\s*\(?\s*)['"]([^'"]+)['"]/g)) {
      const hit = resolveImport(p, m[1], known);
      if (hit && hit !== p) usedBy.get(hit)!.add(p);
    }
    for (const pub of publicFiles) {
      const dir = posix.dirname(pub);
      const needle = pub.endsWith('index.html') && dir !== '.' ? `/${dir}/` : `/${pub}`;
      if (src.includes(needle)) usedBy.get(`public/${pub}`)!.add(p);
    }
  }

  cache = paths.map((p) => {
    const text = texts.get(p);
    return {
      path: p,
      bytes: statSync(join(ROOT, p)).size,
      lines: text === undefined ? null : text.split('\n').length - (text.endsWith('\n') ? 1 : 0),
      usedBy: [...usedBy.get(p)!].sort(),
    };
  });
  return cache;
}

/** Every address the static export produces, without the locale prefix. */
export function getRoutes(): { route: string; file: string; perLocale: boolean }[] {
  const routes: { route: string; file: string; perLocale: boolean }[] = [];
  for (const f of getRepoFiles()) {
    if (!/^app\/.*page\.tsx$/.test(f.path)) continue;
    const segs = f.path.split('/').slice(1, -1).filter((s) => !/^\(.*\)$/.test(s));
    const perLocale = segs[0] === '[locale]';
    const rest = perLocale ? segs.slice(1) : segs;
    const expand = (seg: string): string[] =>
      seg === '[slug]' ? [...serviceSlugs] : seg === '[doc]' ? [...legalSlugs] : [seg];
    let acc = [''];
    for (const s of rest) acc = acc.flatMap((a) => expand(s).map((x) => `${a}/${x}`));
    for (const a of acc) routes.push({ route: `${a}/`, file: f.path, perLocale });
  }
  return routes.sort((a, b) => a.route.localeCompare(b.route));
}

export function getCommit(): string | null {
  const env = process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA;
  if (env) return env.slice(0, 7);
  try { return execSync('git rev-parse --short HEAD', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || null; }
  catch { return null; }
}
