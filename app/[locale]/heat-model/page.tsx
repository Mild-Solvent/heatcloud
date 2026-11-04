import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeatLabFrame, LabViewButton } from '@/components/HeatLabFrame';
import { Arrow } from '@/components/icons';
import { LandingMotion, MotionHeading, MotionReveal as Reveal } from '@/components/LandingMotion';
import { heatModel } from '@/content/heatModel';
import { isLocale } from '@/lib/i18n';
import '@/components/investor-landing.css';
import '@/components/landing-motion.css';
import './heat-model.css';

type Params = Promise<{ locale: string }>;

const SOURCE = 'https://github.com/Fenixcrowlite/datacenter-heat-reuse';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = heatModel[locale];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function HeatModelPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = heatModel[locale];

  return (
    <LandingMotion>
      <section className="il-wrap hm-hero">
        <div className="il-section-top">
          <div><p className="il-label"><span className="il-dot" />{t.label}</p><h1 className="hm-title">{t.title}</h1></div>
          <div className="hm-hero-intro"><p className="il-intro">{t.intro}</p><div className="il-actions"><a className="il-button" href="#lab">{t.open}<Arrow /></a><a className="il-text-link" href={SOURCE} target="_blank" rel="noopener">{t.source}<span aria-hidden="true">↗</span></a></div></div>
        </div>
        <Reveal className="il-stats">{t.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</Reveal>
        <p className="il-fine il-stats-note">{t.statsNote}</p>
      </section>

      <section className="il-wrap hm-inside">
        <Reveal className="il-section-top"><div><p className="il-label">{t.insideLabel}</p><MotionHeading text={t.insideTitle} /></div><p className="il-intro">{t.insideIntro}</p></Reveal>
        <div className="hm-views">{t.views.map(([view, title, body], i) => (
          <Reveal key={view} delay={i * 80}><LabViewButton view={view}><span className="il-index">0{i + 1}</span><b>{title}</b><span className="hm-view-body">{body}</span><span className="hm-view-go" aria-hidden="true">↓</span></LabViewButton></Reveal>
        ))}</div>
      </section>

      <section id="lab" className="hm-lab">
        <div className="il-wrap"><p className="il-label">{t.labLabel}</p></div>
        <div className="hm-lab-inner"><HeatLabFrame locale={locale} loading={t.labNoScript} standalone={t.labStandalone} /></div>
      </section>

      <section className="il-wrap il-section il-heat">
        <Reveal className="il-section-top"><div><p className="il-label">{t.findLabel}</p><MotionHeading text={t.findTitle} /></div></Reveal>
        <div className="il-pillars hm-findings">{t.findings.map(([title, body], i) => <Reveal key={title} delay={i * 80} className="il-pillar"><span className="il-index">0{i + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
      </section>

      <section className="il-wrap il-section hm-limits">
        <Reveal><p className="il-label">{t.limitsLabel}</p><MotionHeading text={t.limitsTitle} /></Reveal>
        <Reveal delay={100}><ul>{t.limits.map((l) => <li key={l}>{l}</li>)}</ul><p className="il-fine"><a className="il-text-link" href={SOURCE} target="_blank" rel="noopener">{t.source}<span aria-hidden="true">↗</span></a></p></Reveal>
      </section>
    </LandingMotion>
  );
}
