import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/icons';
import { LandingMotion, MotionHeading, MotionReveal as Reveal } from '@/components/LandingMotion';
import { RepoBrowser, type BrowserArea } from '@/components/RepoBrowser';
import { areas, fileNotes, repoCopy } from '@/content/repoMap';
import { formatBytes } from '@/lib/format';
import { isLocale } from '@/lib/i18n';
import { Link } from '@/lib/locale';
import { getCommit, getRepoFiles, getRoutes } from '@/lib/repoTree';
import '@/components/investor-landing.css';
import '@/components/landing-motion.css';
import '../heat-model/heat-model.css';
import './repo.css';

type Params = Promise<{ locale: string }>;

const REPO = 'https://github.com/Mild-Solvent/heatcloud';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = repoCopy[locale];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function RepoPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = repoCopy[locale];
  const files = getRepoFiles();
  const routes = getRoutes();
  const commit = getCommit();
  const nf = (n: number) => n.toLocaleString(locale === 'sk' ? 'sk-SK' : 'en-IE');

  const grouped: BrowserArea[] = areas.map((a) => ({ id: a.id, name: a.name[locale], body: a.body[locale], files: [] }));
  for (const f of files) {
    const i = areas.findIndex((a) => a.match(f.path));
    grouped[i].files.push({ ...f, note: fileNotes[f.path]?.[locale] ?? '' });
  }

  const totalLines = files.reduce((s, f) => s + (f.lines ?? 0), 0);
  const totalBytes = files.reduce((s, f) => s + f.bytes, 0);
  const pageCount = routes.reduce((s, r) => s + (r.perLocale ? 2 : 1), 0);
  const stats: [string, string][] = [
    [nf(files.length), t.stats.files], [nf(totalLines), t.stats.lines], [nf(pageCount), t.stats.routes], [formatBytes(totalBytes, locale), t.stats.size],
  ];

  return (
    <LandingMotion>
      <section className="il-wrap hm-hero">
        <div className="il-section-top">
          <div><p className="il-label"><span className="il-dot" />{t.label}</p><h1 className="hm-title">{t.title}</h1></div>
          <div className="hm-hero-intro"><p className="il-intro">{t.intro}</p><div className="il-actions"><a className="il-button" href="#files">{t.areasLabel}<Arrow /></a><a className="il-text-link" href={REPO} target="_blank" rel="noopener">{t.source}<span aria-hidden="true">↗</span></a></div></div>
        </div>
        <Reveal className="il-stats">{stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</Reveal>
        {commit && <p className="il-fine il-stats-note">{t.generated} <a className="rp-commit" href={`${REPO}/commit/${commit}`} target="_blank" rel="noopener">{commit}</a></p>}
      </section>

      <section className="il-wrap il-section rp-section">
        <Reveal className="il-section-top"><div><p className="il-label">{t.routesLabel}</p><MotionHeading text={t.routesTitle} /></div><p className="il-intro">{t.routesIntro}</p></Reveal>
        <div className="rp-table-wrap">
          <table className="rp-routes">
            <thead><tr><th>{t.route}</th><th>SK</th><th>EN</th><th>{t.file}</th></tr></thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.route + r.file}>
                  <td><code>{r.route}</code></td>
                  {r.perLocale
                    ? <><td><Link href={`/sk${r.route}`}>/sk{r.route}</Link></td><td><Link href={`/en${r.route}`}>/en{r.route}</Link></td></>
                    : <td colSpan={2}><Link href={r.route}>{r.route}</Link></td>}
                  <td className="rp-file">{r.file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="files" className="il-wrap il-section rp-section">
        <Reveal className="il-section-top"><div><p className="il-label">{t.areasLabel}</p><MotionHeading text={t.areasTitle} /></div></Reveal>
        <RepoBrowser areas={grouped.filter((a) => a.files.length)} t={t} locale={locale} />
      </section>
    </LandingMotion>
  );
}
