import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check, Compass, Layers, Target, ChartNoAxesCombined } from 'lucide-react';
import { industryContent } from './industryContent';
import { serviceCategories } from '../../serviceContent';
import IndustryHeroVisual from '../IndustryHeroVisual';
import IndustryAudienceStrip from '../IndustryAudienceStrip';
import useIndustryPage from '../useIndustryPage';
import IndustryWorkshop, { IndustryContextVisual, IndustryScopeArtwork } from '../IndustryTopicSections';
import { sectorDesign } from './sectorDesign';
import '../../ServiceDetail.css';
import '../IndustryPages.css';
import './Healthcare.css';

const icons = [Compass, Layers, Target, ChartNoAxesCombined];

export default function Healthcare() {
  const industry = 'healthcare';
  const data = industryContent[industry];
  const pageRef = useIndustryPage(data.name);
  const design = sectorDesign[industry];
  const process = design.process;
  return (
    <main className={`sd-page id-page industry-${industry}`} ref={pageRef}>
      <section className="sd-hero subpage-hero" aria-labelledby="industry-title">
        <div className="sd-wrap sd-hero-inner">
          <div className="sd-hero-copy">
            <nav className="sd-breadcrumb" aria-label="Breadcrumb"><Link to="/industries">Industries</Link><span>/</span><span aria-current="page">{data.name}</span></nav>
            <p className="sd-eyebrow"><span />DIGITAL SOLUTIONS FOR {data.name}</p>
            <h1 id="industry-title">{data.title}<br /><em>{data.accent}</em></h1>
            <p className="sd-intro">{data.intro}</p>
            <div className="sd-actions"><Link to="/contact" className="sd-button">Let's talk about your goals <span><ArrowUpRight size={18}/></span></Link><a href="#industry-overview" className="sd-text-link">Explore the approach <ArrowDown size={16}/></a></div>
          </div>
          <IndustryHeroVisual industry={industry} data={data}/>
        </div>
        <a href="#industry-overview" className="sd-scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={16}/></a>
      </section>
      <IndustryAudienceStrip industry={industry} data={data}/>
      <section className="sd-wrap sd-section id-overview" id="industry-overview" aria-labelledby="industry-overview-title">
        <IndustryContextVisual industry={industry} data={data}/>
        <div data-service-reveal><p className="sd-eyebrow"><span />UNDERSTAND THE INDUSTRY</p><h2 id="industry-overview-title">{design.overview[0]}<br /><em>{design.overview[1]}</em></h2><p className="sd-body">{data.context}</p><p className="sd-body">We connect your business goals with the information, design, and functionality your visitors need. The scope is shaped around your current experience, internal workflows, and the priorities that matter most.</p><a className="sd-text-link" href="#industry-solutions">Explore the possibilities <ArrowDown size={16}/></a></div>
      </section>
      <section className="sd-scope sd-section" id="industry-solutions" aria-labelledby="industry-solutions-title"><div className="sd-wrap">
        <div className="sd-heading sd-scope-heading" data-service-reveal><div><p className="sd-eyebrow"><span />SOLUTIONS FOR {data.name}</p><h2 id="industry-solutions-title">{design.scope[0]}<br /><em>{design.scope[1]}</em></h2></div><p>Services shaped around the needs of {data.name.toLowerCase()} businesses, from clear communication to the next meaningful audience action.</p></div>
        <IndustryScopeArtwork industry={industry}/>
        <div className="sd-capabilities">{data.capabilities.map(([title,text],index)=>{const Icon=icons[index];const service=data.services[index % data.services.length];return <article className="sd-capability" data-service-reveal key={title}><div className="sd-card-top"><Icon size={24} strokeWidth={1.5}/><span>0{index+1}</span></div><h3>{title}</h3><p>{text}</p><Link className="sd-explore" to={`/services/${service}`}>{serviceCategories[service].name}<ArrowUpRight size={18}/></Link></article>;})}</div>
      </div></section>
      <section className="sd-wrap sd-section" aria-labelledby="industry-priorities-title"><div className="sd-heading" data-service-reveal><div><p className="sd-eyebrow"><span />WHAT MATTERS TO YOUR AUDIENCE</p><h2 id="industry-priorities-title">Designed for people.<br /><em>Grounded in your industry.</em></h2></div><p>Each decision connects the audience, the information, and the experience you want to create.</p></div><div className="sd-pillars">{data.priorities.map(([title,text],index)=><article key={title} data-service-reveal><span className="sd-large-number">0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <IndustryWorkshop industry={industry} data={data}/>
      <section className="sd-method sd-section" aria-labelledby="industry-method-title"><div className="sd-wrap"><div className="sd-heading" data-service-reveal><div><p className="sd-eyebrow"><span />HOW WE WORK</p><h2 id="industry-method-title">From understanding<br /><em>to useful execution.</em></h2></div><p>A collaborative process that gives your team visibility into priorities, decisions, and delivery.</p></div><ol className="sd-process">{process.map(([title,text],index)=><li key={title} data-service-reveal><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
      <section className="sd-outcomes-band" aria-labelledby="industry-outcomes-title"><div className="sd-wrap sd-section sd-outcomes"><div data-service-reveal><p className="sd-eyebrow"><span />CLARITY ON PROGRESS</p><h2 id="industry-outcomes-title">Know what matters.<br /><em>Learn what comes next.</em></h2><p className="sd-body">We agree measures that fit your objectives and the data available, then review the context behind the results. Audience response and feedback inform the next step; no performance outcome is guaranteed.</p></div><div className="sd-measures" data-service-reveal><span className="sd-mini">WHAT WE CAN REVIEW TOGETHER</span>{data.measures.map((measure,index)=><div key={measure}><span>0{index+1}</span><h3>{measure}</h3><Check size={18}/></div>)}<p>These are potential review areas, selected with your team during scoping rather than pre-set performance promises.</p></div></div></section>
      <section className="sd-wrap sd-section sd-faq" aria-labelledby="industry-faq-title"><div data-service-reveal><p className="sd-eyebrow"><span />BEFORE WE BEGIN</p><h2 id="industry-faq-title">A little clarity.<br /><em>A better beginning.</em></h2><p className="sd-body">A few things to know about planning a digital experience for {data.name.toLowerCase()}.</p></div><div className="sd-questions" data-service-reveal>{[
        ...data.faqs,
        ['Can we begin with one specific problem?', 'Yes. We can start with a focused need such as website structure, search visibility, visual design, or a particular enquiry journey. The initial scope should reflect your priorities.'],
        ['What will you need from our team?', 'Your business goals, audience information, existing website or brand materials, and relevant access are useful starting points. We also agree content ownership, reviewers, and integration responsibilities.'],
        ['How are delivery milestones agreed?', 'We define the scope, dependencies, review stages, and implementation responsibilities before confirming a delivery plan. The work is reviewed with your team at agreed checkpoints.'],
      ].map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className="sd-cta" data-service-reveal><div className="sd-wrap"><p className="sd-eyebrow"><span />YOUR NEXT CHAPTER</p><h2>A clearer direction.<br /><em>A stronger experience.</em></h2><p>Tell us about your {data.name.toLowerCase()} business and the next challenge you want to solve.</p><Link className="sd-button" to="/contact">Start a conversation <span><ArrowUpRight size={18}/></span></Link></div></section>
      <nav className="sd-wrap sd-related" aria-label="Explore other industries"><span className="sd-mini">EXPLORE OTHER INDUSTRIES</span><div>{Object.entries(industryContent).filter(([slug])=>slug!==industry).map(([slug,value])=><Link key={slug} to={`/industries/${slug}`}>{value.name}<ArrowUpRight size={16}/></Link>)}</div></nav>
    </main>
  );
}
