import Image from 'next/image';
import { landing } from '@/content/landing';
import { BASE } from '@/lib/base';
import type { Locale } from '@/lib/i18n';
import { Link } from '@/lib/locale';
import { Arrow } from './icons';
import { LandingMotion, MotionReveal as Reveal, MotionHeading } from './LandingMotion';
import './investor-landing.css';
import './landing-motion.css';

export default function InvestorLanding({ locale }: { locale: Locale }) {
  const t = landing[locale];
  return (
    <LandingMotion>
      <section className="il-hero il-wrap">
        <div className="il-hero-top">
          <div className="il-hero-title"><p className="il-label"><span className="il-dot" />{t.eyebrow}</p><h1><span className="il-hero-line"><span>{t.title}</span></span><span className="il-hero-line il-hero-accent"><span>{t.accent}</span></span></h1></div>
          <div className="il-hero-intro"><p>{t.intro}</p><div className="il-actions"><Link className="il-button" href="/investors/">{t.presentation}<Arrow /></Link><Link className="il-text-link" href="/business/">{t.model}<span aria-hidden="true">↗</span></Link></div></div>
        </div>
        <figure className="il-hero-image">
          <Image src={`${BASE}/hero-stone.webp`} alt={t.imageAlt} fill preload sizes="(max-width: 1440px) 100vw, 1360px" className="il-parallax-photo" />
          <div className="il-image-top"><span>{t.location}</span><span><i />{t.stage}</span></div>
          <figcaption><span>{t.imageLabel}</span><small>{t.imageNote}</small></figcaption>
          <a href="#thesis" className="il-scroll" aria-label={locale === 'sk' ? 'Preskúmať projekt' : 'Explore the project'}>↓</a>
        </figure>
        <Reveal className="il-stats">{t.stats.map(([value, label]) => <div key={label}><strong aria-label={value}><span data-count="" aria-hidden="true">{value}</span></strong><span>{label}</span></div>)}</Reveal>
        <p className="il-fine il-stats-note">{t.statsNote}</p>
      </section>
      <section id="thesis" className="il-section il-wrap">
        <Reveal className="il-section-top"><div><p className="il-label">{t.thesisLabel}</p><MotionHeading text={t.thesisTitle} /></div><p className="il-intro">{t.thesisIntro}</p></Reveal>
        <div className="il-pillars">{t.pillars.map(([title, body, href, label], i) => <Reveal key={title} delay={i * 90} className="il-pillar"><span className="il-index">0{i + 1}</span><h3>{title}</h3><p>{body}</p><Link href={href} className="il-text-link">{label}<Arrow /></Link></Reveal>)}</div>
      </section>
      <section id="system" className="il-system"><div className="il-wrap il-section">
        <Reveal className="il-section-top"><div><p className="il-label">{t.systemLabel}</p><MotionHeading text={t.systemTitle} /></div><p className="il-intro">{t.systemText}</p></Reveal>
        <div className="il-system-diagram">
          <div className="il-node"><span className="il-node-top">01 / {t.electricity} →</span><div className="il-racks" aria-hidden="true">{[0, 1, 2].map(i => <div key={i}>{[0, 1, 2, 3, 4].map(j => <span key={j}><i /><b /></span>)}</div>)}</div><h3>{t.dataCentre}</h3><p className="il-compute">↗ {t.compute}</p></div>
          <div className="il-pipe"><span>40–50 °C</span><div><i /><b /></div><small>{t.returnWater} ←</small></div>
          <div className="il-node"><span className="il-node-top">02 / {t.pump}</span><div className="il-pump" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="34" /><circle cx="50" cy="50" r="10" /><g className="il-pump-rotor">{[0, 90, 180, 270].map(r => <path key={r} transform={`rotate(${r} 50 50)`} d="M50 40C22 19 25 59 40 50" />)}</g></svg></div><h3>{t.pump}</h3><p>40–50 °C → 70–85 °C</p></div>
          <div className="il-pipe"><span>70–85 °C</span><div><i /><b /></div><small>{t.returnWater} ←</small></div>
          <div className="il-node"><span className="il-node-top">03 / {t.city}</span><div className="il-city" aria-hidden="true">{[0, 1, 2].map(i => <div key={i}>{[0, 1, 2, 3, 4, 5].map(j => <i key={j} />)}</div>)}</div><h3>{t.city}</h3><p>{locale === 'sk' ? 'Domovy. Školy. Verejné budovy.' : 'Homes. Schools. Public buildings.'}</p></div>
        </div><div className="il-system-track" aria-hidden="true"><span /></div><p className="il-fine il-system-foot">{t.systemFoot}</p>
      </div></section>
      <section id="economics" className="il-wrap il-section il-economics">
        <Reveal><p className="il-label">{t.econLabel}</p><MotionHeading text={t.econTitle} /><p className="il-intro">{t.econText}</p><Link href="/business/" className="il-button">{t.model}<Arrow /></Link></Reveal>
        <Reveal className="il-econ-card" delay={120}><div className="il-card-top">{t.econCard}<span aria-hidden="true">↗</span></div><p className="il-revenue-label">{t.annual}</p><div className="il-total"><b data-count="" aria-hidden="true">{t.total}</b><span className="sr-only">{t.total}</span><span>{t.million}</span></div><div className="il-revenue-bar" role="img" aria-label={`${t.cloudRevenue}: 94.2%. ${t.heatRevenue}: 5.8%.`}><span /><span /></div><dl className="il-revenue-legend"><div><dt><i />{t.cloudRevenue}</dt><dd>{t.cloudValue}</dd></div><div><dt><i />{t.heatRevenue}</dt><dd>{t.heatValue}</dd></div></dl><p className="il-assumptions">{t.assumptions}</p><p className="il-fine">{t.econNote}</p></Reveal>
      </section>
      <section id="heat-model" className="il-wrap il-section il-heat">
        <Reveal className="il-section-top"><div><p className="il-label">{t.heatLabel}</p><MotionHeading text={t.heatTitle} /></div><p className="il-intro">{t.heatIntro}</p></Reveal>
        <div className="il-pillars">{t.heatFindings.map(([title, body], i) => <Reveal key={title} delay={i * 90} className="il-pillar"><span className="il-index">0{i + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
        <Reveal className="il-heat-table" delay={120}><table><thead><tr><th scope="col">{t.heatTableScenario}</th><th scope="col">{t.heatTablePayback}</th></tr></thead><tbody>{t.heatRows.map(([scenario, payback]) => <tr key={scenario}><td>{scenario}</td><td>{payback}</td></tr>)}</tbody></table><p className="il-fine">{t.heatNote}</p></Reveal>
      </section>
      <section id="roadmap" className="il-roadmap"><div className="il-wrap il-section"><Reveal className="il-section-top"><div><p className="il-label">{t.roadmapLabel}</p><MotionHeading text={t.roadmapTitle} /></div><p className="il-intro">{t.roadmapIntro}</p></Reveal><div className="il-roadmap-grid">{t.roadmap.map(([n, phase, title, body], i) => <Reveal key={n} delay={i * 140} className="il-roadmap-step"><div className={`il-phase ${i === 0 ? 'il-phase-current' : ''}`}><span>{n}</span><small>{phase}</small></div><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div></section>
      <section className="il-wrap il-section il-faq"><Reveal><p className="il-label">{t.faqLabel}</p><MotionHeading text={t.faqTitle} /></Reveal><div>{t.faq.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <section className="il-wrap il-cta-wrap"><div className="il-cta"><Reveal className="il-cta-copy"><p className="il-label">{t.ctaLabel}</p><MotionHeading text={t.ctaTitle} /><p>{t.ctaText}</p><div className="il-actions"><Link href="/contact/" className="il-button">{t.cta}<Arrow /></Link><Link href="/investors/" className="il-text-link">{t.deck}<span aria-hidden="true">↗</span></Link></div></Reveal><span className="il-cta-side" aria-hidden="true">HeatCloud<br />Slovakia / 2026</span></div></section>
    </LandingMotion>
  );
}
