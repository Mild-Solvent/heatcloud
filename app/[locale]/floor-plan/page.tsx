import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FloorPlan } from '@/components/FloorPlan';
import { Arrow } from '@/components/icons';
import { LandingMotion, MotionHeading, MotionReveal as Reveal } from '@/components/LandingMotion';
import { floorPlan } from '@/content/floorPlan';
import { isLocale } from '@/lib/i18n';
import { Link } from '@/lib/locale';
import '@/components/investor-landing.css';
import '@/components/landing-motion.css';
import '../heat-model/heat-model.css';
import './floor-plan.css';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = floorPlan[locale];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function FloorPlanPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = floorPlan[locale];

  return (
    <LandingMotion>
      <section className="il-wrap hm-hero">
        <div className="il-section-top">
          <div><p className="il-label"><span className="il-dot" />{t.label}</p><h1 className="hm-title">{t.title}</h1></div>
          <div className="hm-hero-intro"><p className="il-intro">{t.intro}</p><div className="il-actions"><a className="il-button" href="#plan">{t.planHint}<Arrow /></a>{t.links.map(([label, href]) => <Link key={href} className="il-text-link" href={href}>{label}<span aria-hidden="true">→</span></Link>)}</div></div>
        </div>
        <Reveal className="il-stats">{t.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</Reveal>
        <p className="il-fine il-stats-note">{t.statsNote}</p>
      </section>

      <section id="plan" className="il-wrap il-section fp-section">
        <Reveal className="il-section-top"><div><p className="il-label">{t.planLabel}</p><MotionHeading text={t.planTitle} /></div><p className="il-intro">{t.planIntro}</p></Reveal>
        <FloorPlan t={t} />
      </section>

      <section className="il-wrap il-section il-heat">
        <Reveal className="il-section-top"><div><p className="il-label">{t.flowLabel}</p><MotionHeading text={t.flowTitle} /></div></Reveal>
        <div className="il-pillars hm-findings">{t.flow.map(([title, body], i) => <Reveal key={title} delay={i * 80} className="il-pillar"><span className="il-index">0{i + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
      </section>

      <section className="il-wrap il-section hm-limits">
        <Reveal><p className="il-label">{t.siteLabel}</p><MotionHeading text={t.siteTitle} /><p className="il-intro fp-site-intro">{t.siteIntro}</p></Reveal>
        <Reveal delay={100}><dl className="fp-criteria">{t.site.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></Reveal>
      </section>

      <section className="il-wrap il-section hm-limits">
        <Reveal><p className="il-label">{t.openLabel}</p><MotionHeading text={t.openTitle} /></Reveal>
        <Reveal delay={100}><ul>{t.open.map((l) => <li key={l}>{l}</li>)}</ul><p className="il-fine">{t.links.map(([label, href]) => <Link key={href} className="il-text-link fp-inline-link" href={href}>{label}<span aria-hidden="true">→</span></Link>)}</p></Reveal>
      </section>
    </LandingMotion>
  );
}
