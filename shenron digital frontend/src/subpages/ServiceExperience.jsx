import { useState } from 'react';
import { ArrowUpRight, Check, Compass, Layers, Target, ChartNoAxesCombined } from 'lucide-react';

const icons = [Compass, Layers, Target, ChartNoAxesCombined];
const context = {
  seo: { title: 'Make discovery', accent: 'work together.', label: 'SEARCH OPPORTUNITY MAP', summary: 'Connect the way people search with the pages, information, and technical foundations that help them find you.', lenses: ['Understand intent', 'Organise information', 'Remove friction', 'Review discovery'] },
  'paid-advertising': { title: 'Follow the journey.', accent: 'Beyond the click.', label: 'CAMPAIGN EXPERIENCE MAP', summary: 'The ad is one part of the experience. Audience relevance, the message, the destination, and the follow-up all shape what happens next.', lenses: ['Audience context', 'Message and format', 'Destination experience', 'Response and learning'] },
  'digital-design': { title: 'Explore the details.', accent: 'See the whole picture.', label: 'DESIGN DECISION MAP', summary: 'A visual system connects individual decisions. Explore how research, hierarchy, interaction, and consistency shape the final experience.', lenses: ['Audience needs', 'Visual hierarchy', 'Interaction details', 'System consistency'] },
  'web-development': { title: 'Think beyond', accent: 'the first screen.', label: 'WEBSITE EXPERIENCE MAP', summary: 'The parts visitors see depend on the structure underneath. Connect page planning, functionality, quality checks, and ongoing ownership.', lenses: ['Content structure', 'Functional requirements', 'Journey validation', 'Long-term ownership'] },
  'influencer-marketing': { title: 'Bring the right', accent: 'voices together.', label: 'PARTNERSHIP EXPERIENCE MAP', summary: 'A strong collaboration connects the community, the creator, and your brand. Clear expectations leave more room for useful creative work.', lenses: ['Community relevance', 'Creator perspective', 'Shared expectations', 'Campaign learning'] },
};

export default function ServiceExperience({ category, name, deliverables, stages, variant }) {
  const [active, setActive] = useState(0);
  const direction = context[category];
  const Icon = icons[active];
  const focus = deliverables[active % deliverables.length];
  return (
    <section className={`sx-section sx-${category} sx-layout-${variant % 3} sd-section sd-wrap`} aria-labelledby="sx-title">
      <div className="sd-heading" data-service-reveal><div><p className="sd-eyebrow"><span />A CLOSER LOOK AT {name}</p><h2 id="sx-title">{direction.title}<br /><em>{direction.accent}</em></h2></div><p>{direction.summary}</p></div>
      <div className="sx-workspace" data-service-reveal>
        <div className="sx-selector" role="group" aria-label={`Explore the ${name} approach`}>
          {direction.lenses.map((label, index) => <button key={label} type="button" aria-pressed={active === index} aria-controls="sx-panel" onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{label}</strong><ArrowUpRight size={18} /></button>)}
        </div>
        <div className="sx-panel" id="sx-panel" aria-live="polite" aria-atomic="true">
          <div className="sx-panel-head"><span className="sd-mini">{direction.label}</span><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></div>
          <div key={active} className="sx-panel-content"><span className="sx-focus-number">0{active + 1}</span><h3>{focus}</h3><p>{stages[active][1]}</p><div className="sx-practical"><Check size={17} /><span>{['Start with an agreed objective and a clear view of what exists today.', 'Make the recommendations specific enough for your team to review and act on.', 'Connect individual deliverables to the complete audience experience.', 'Document decisions and use what you learn to guide the next step.'][active]}</span></div></div>
          <div className="sx-progress" aria-hidden="true">{direction.lenses.map((label,index) => <span key={label} className={active === index ? 'is-active' : ''} />)}</div>
        </div>
      </div>
    </section>
  );
}
