import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check, Compass, Layers, Target, ChartNoAxesCombined } from 'lucide-react';
import { serviceCategories } from '../../serviceContent';
import seoImage from '../../../assets/seo.png';
import paidImage from '../../../assets/paid_advertising.png';
import designImage from '../../../assets/uiux_branding.png';
import webImage from '../../../assets/web_development.png';
import influencerImage from '../../../assets/influencer_marketing.png';
import orbitalArt from '../../../assets/service T-right.png';
import '../../ServiceDetail.css';
import './BrandStrategy.css';
import ServiceHeroArt from '../../ServiceHeroArt';
import ServiceExperience from '../../ServiceExperience';
import ServiceConnections from '../../ServiceConnections';
import useServiceMotion from '../../useServiceMotion';

const images = { seo: seoImage, paid: paidImage, design: designImage, web: webImage, influencer: influencerImage };
const icons = [Compass, Layers, Target, ChartNoAxesCombined];

export default function DigitalDesignBrandStrategyPage() {
  const category = 'digital-design';
  const offering = 'brand-strategy';
  const group = serviceCategories[category];
  const item = group?.items.find(([slug]) => slug === offering);
  const pageRef = useRef(null);
  useServiceMotion(pageRef);
  const pageKey = `${category}/${offering || ''}`;

  useEffect(() => {
    if (!group || (offering && !item)) return;
    const previousTitle = document.title;
    document.title = `${item?.[1] || group.name} | KRAVS Infotech`;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const blocks = [...pageRef.current.querySelectorAll('[data-service-reveal]')];
    if (motion.matches || !('IntersectionObserver' in window)) return () => { document.title = previousTitle; };
    const reveal = (block) => { block.classList.remove('sd-pending'); observer.unobserve(block); };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target); }), { threshold: 0.08 });
    blocks.forEach((block) => { block.style.setProperty('--reveal-delay', `${Math.min([...block.parentElement.children].indexOf(block), 3) * 65}ms`); block.classList.add('sd-pending'); observer.observe(block); });
    const revealFocus = (event) => { const block = event.target.closest('[data-service-reveal]'); if (block) reveal(block); };
    const revealAll = () => { if (motion.matches) blocks.forEach(reveal); };
    const page = pageRef.current;
    page.addEventListener('focusin', revealFocus);
    motion.addEventListener('change', revealAll);
    return () => { observer.disconnect(); blocks.forEach((block) => block.classList.remove('sd-pending')); page.removeEventListener('focusin', revealFocus); motion.removeEventListener('change', revealAll); document.title = previousTitle; };
  }, [pageKey, group, item, offering]);

  if (!group || (offering && !item)) return <main className="sd-page"><section className="sd-wrap sd-missing"><p className="sd-eyebrow">SERVICES</p><h1>Let's find the<br /><em>right direction.</em></h1><p>This service page could not be found. Explore our services to choose an available option.</p><Link className="sd-button" to="/services">Explore services <ArrowUpRight size={18} /></Link></section></main>;
  const name = item?.[1] || group.name;
  const deliverables = item ? item[4].split('|') : group.items.slice(0, 4).map((entry) => entry[1]);

  const heroVariant = item ? group.items.indexOf(item) + 1 : 0;

  return (
    <main className={`sd-page service-digital-design-brand-strategy sd-${category} sd-hero-variant-${heroVariant}`} ref={pageRef} key={pageKey}>
      <section className="sd-hero subpage-hero" aria-labelledby="sd-title">
        <div className="sd-wrap sd-hero-inner">
          <div className="sd-hero-copy">
            <nav className="sd-breadcrumb" aria-label="Breadcrumb"><Link to="/services">Services</Link><span>/</span>{item ? <><Link to={`/services/${category}`}>{group.name}</Link><span>/</span><span aria-current="page">{name}</span></> : <span aria-current="page">{name}</span>}</nav>
            <p className="sd-eyebrow"><span />{name}</p>
            <h1 id="sd-title">{item ? name : group.lead}<br /><em>{item ? item[2] : group.accent}</em></h1>
            <p className="sd-intro">{item ? item[3] : group.intro}</p>
            <div className="sd-actions"><Link to="/contact" className="sd-button">Let's talk about your goals <span><ArrowUpRight size={18} /></span></Link><a href="#service-overview" className="sd-text-link">Explore the approach <ArrowDown size={16} /></a></div>
          </div>
          <ServiceHeroArt category={category} name={name} deliverables={deliverables} variant={heroVariant} />
        </div>
        <a href="#service-overview" className="sd-scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a>
      </section>
      <ServiceConnections deliverables={deliverables} name={name} />
      <section className="sd-wrap sd-overview sd-section" id="service-overview" aria-labelledby="sd-overview-title">
        <div className="sd-overview-art" data-service-reveal><img src={images[group.image]} alt="" loading="lazy" /><span>{name}<ArrowUpRight size={24} /></span></div>
        <div data-service-reveal><p className="sd-eyebrow"><span />THE THINKING BEHIND THE WORK</p><h2 id="sd-overview-title">A clear purpose.<br /><em>A stronger foundation.</em></h2><p className="sd-body">{item ? item[5] : group.context}</p><p className="sd-body">{item ? group.context : 'Explore the specialist services below to find the right starting point. We shape the scope around your current position, your audience, and the work that will be most useful next.'}</p><a href="#service-scope" className="sd-text-link">See what we can help with <ArrowDown size={16} /></a></div>
      </section>
      <section className="sd-scope sd-section" id="service-scope" aria-labelledby="sd-scope-title"><div className="sd-wrap">
        <div className="sd-heading sd-scope-heading" data-service-reveal><div><p className="sd-eyebrow"><span />{item ? 'A CONSIDERED SCOPE' : 'FIND YOUR STARTING POINT'}</p><h2 id="sd-scope-title">The right pieces.<br /><em>Working together.</em></h2></div><p>{item ? `A ${name.toLowerCase()} engagement brings focused activities into a shared plan. Exact deliverables are agreed around your requirements.` : `Explore our ${group.name.toLowerCase()} services. Each area has its own approach, deliverables, and practical considerations.`}</p></div>
        <img className="sd-scope-orb" src={orbitalArt} alt="" loading="lazy" aria-hidden="true" />
        <div className="sd-capabilities">{(item ? deliverables : group.items).map((entry, index) => {
          const Icon = icons[index % icons.length];
          return item ? <article id={`service-capability-${index+1}`} className="sd-capability" data-service-reveal key={entry}><div className="sd-card-top"><Icon size={24} strokeWidth={1.5} /><span>0{index + 1}</span></div><h3>{entry}</h3><p>{[`We assess your current setup and define the priorities for ${entry.toLowerCase()}, connecting the work to your audience and objectives.`, `We develop ${entry.toLowerCase()} around the agreed scope, with clear review points and practical recommendations your team can use.`, `We coordinate ${entry.toLowerCase()} with the wider project so the individual pieces support a consistent experience.`, `We document ${entry.toLowerCase()} and review the outcome against the agreed requirements, highlighting useful next steps.`][index]}</p></article> : <Link id={`service-capability-${index+1}`} className="sd-capability sd-capability-link" data-service-reveal key={entry[0]} to={`/services/${category}/${entry[0]}`}><div className="sd-card-top"><Icon size={24} strokeWidth={1.5} /><span>0{index + 1}</span></div><h3>{entry[1]}</h3><p>{entry[3]}</p><span className="sd-explore">Explore this service <ArrowUpRight size={18} /></span></Link>;
        })}</div>
      </div></section>
      <section className="sd-wrap sd-section" aria-labelledby="sd-principles-title"><div className="sd-heading" data-service-reveal><div><p className="sd-eyebrow"><span />WHAT MAKES THE WORK USEFUL</p><h2 id="sd-principles-title">More than activity.<br /><em>A connected approach.</em></h2></div><p>We consider the wider journey, so each decision has a purpose and every recommendation has context.</p></div><div className="sd-pillars">{group.pillars.map(([title, text], index) => <article data-service-reveal key={title}><span className="sd-large-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="sd-orbital-approach" aria-labelledby="sd-approach-title">
        <div className="sd-wrap sd-orbital-inner"><div data-service-reveal><p className="sd-eyebrow"><span />OUR APPROACH TO {name}</p><h2 id="sd-approach-title">Strategy. Creativity.<br />Connected thinking.<br /><em>Meaningful progress.</em></h2><p>{group.context}</p><Link className="sd-button" to="/contact">Find your starting point <span><ArrowUpRight size={18} /></span></Link></div><div className="sd-orbital-space" aria-hidden="true"><span className="sd-orbital-tag">Ideas into motion.</span></div></div>
      </section>
      <ServiceExperience key={pageKey} category={category} name={name} deliverables={deliverables} stages={group.stages} variant={heroVariant} />
      <section className="sd-method sd-section" aria-labelledby="sd-method-title"><div className="sd-wrap"><div className="sd-heading" data-service-reveal><div><p className="sd-eyebrow"><span />HOW WE WORK</p><h2 id="sd-method-title">From first conversation<br /><em>to clear next steps.</em></h2></div><p>A collaborative process with shared priorities, defined responsibilities, and space to learn.</p></div><ol className="sd-process">{group.stages.map(([title, text], index) => <li data-service-reveal key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
      <section className="sd-outcomes-band" aria-labelledby="sd-outcomes-title"><div className="sd-wrap sd-section sd-outcomes"><div data-service-reveal><p className="sd-eyebrow"><span />CLARITY ON PROGRESS</p><h2 id="sd-outcomes-title">Know what matters.<br /><em>Understand what's next.</em></h2><p className="sd-body">{group.expectation}</p></div><div className="sd-measures" data-service-reveal><span className="sd-mini">WHAT WE REVIEW TOGETHER</span>{group.measures.map((measure, index) => <div key={measure}><span>0{index + 1}</span><h3>{measure}</h3><Check size={18} /></div>)}<p>Measures are selected to fit the agreed objective and the data available. Reports explain the context behind the numbers.</p></div></div></section>
      <section className="sd-wrap sd-section sd-faq" aria-labelledby="sd-faq-title"><div data-service-reveal><p className="sd-eyebrow"><span />A LITTLE MORE CLARITY</p><h2 id="sd-faq-title">Good questions.<br /><em>Useful answers.</em></h2><p className="sd-body">A few things to know about {name.toLowerCase()} before we begin.</p></div><div className="sd-questions" data-service-reveal>
        <details><summary>What does {name.toLowerCase()} involve?<span>+</span></summary><p>{item ? `${item[3]} Typical activities include ${deliverables.join(', ').toLowerCase()}.` : group.intro} The final scope reflects your starting point and the outcome you want to support.</p></details>
        <details><summary>What do you need from our team?<span>+</span></summary><p>We begin with your business goals, audience, current website or relevant assets, and any existing research or performance information. For {name.toLowerCase()}, we then confirm the specific access, content, and approval responsibilities needed for the agreed work.</p></details>
        <details><summary>How is the work planned and reviewed?<span>+</span></summary><p>{group.stages.map(([title]) => title).join(', ')} form the core stages. We agree milestones and responsibilities before starting, then use review points to discuss progress, dependencies, and changes to priorities.</p></details>
        <details><summary>How do we know whether it is working?<span>+</span></summary><p>We choose measures that connect to your objective, including {group.measures.slice(0, 3).join(', ').toLowerCase()}. {group.expectation}</p></details>
        <details><summary>Can this work alongside our existing team?<span>+</span></summary><p>Yes. We can collaborate with your internal team or existing partners. We agree who owns content, implementation, approvals, and reporting so the work fits your existing workflow.</p></details>
      </div></section>
      <section className="sd-cta" data-service-reveal><div className="sd-wrap"><p className="sd-eyebrow"><span />YOUR NEXT CHAPTER</p><h2>Let's make your next move<br /><em>a considered one.</em></h2><p>Tell us what you want to achieve. We'll help you find the right starting point.</p><Link className="sd-button" to="/contact">Start a conversation <span><ArrowUpRight size={18} /></span></Link></div></section>
      <nav className="sd-wrap sd-related" aria-label="Explore related services"><span className="sd-mini">{item ? `MORE IN ${group.name.toUpperCase()}` : 'EXPLORE OUR OTHER SERVICES'}</span><div>{item ? group.items.filter((entry) => entry[0] !== offering).map(([slug, title]) => <Link key={slug} to={`/services/${category}/${slug}`}>{title}<ArrowUpRight size={16} /></Link>) : Object.entries(serviceCategories).filter(([slug]) => slug !== category).map(([slug, value]) => <Link key={slug} to={`/services/${slug}`}>{value.name}<ArrowUpRight size={16} /></Link>)}</div></nav>
    </main>
  );
}
