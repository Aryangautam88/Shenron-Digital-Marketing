import { createElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Layers, MousePointer2, Play, Workflow, Zap } from 'lucide-react';

const steps = [
  { label: 'Discover', title: 'A problem worth solving.', text: 'Turn a complicated product into a clear story your customers recognise.', icon: Layers, cards: ['Customer pain points', 'Your product promise', 'A clear next step'], caption: 'Clarity before complexity', detail: 'Give visitors a reason to care before asking them to convert.' },
  { label: 'Explore', title: 'Let the product do the talking.', text: 'Connect features to real workflows. Make the value easy to see.', icon: Workflow, cards: ['Connected workflows', 'Meaningful features', 'Relevant use cases'], caption: 'From features to possibilities', detail: 'Help your audience picture the product in their everyday work.' },
  { label: 'Connect', title: 'Make the next move effortless.', text: 'Bring the right context into a simple, purposeful demo journey.', icon: Zap, cards: ['Product context', 'A focused conversation', 'A confident next step'], caption: 'A better demo conversation', detail: 'Bring interested visitors closer to a conversation with your team.' },
];

export default function SaaSHeroPreview() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const Icon = step.icon;
  const select = index => setActive(index);
  return <div className="saas-preview">
    <div className="saas-preview-label"><span><i/> THE PRODUCT EXPERIENCE</span><span>TRY IT OUT <MousePointer2 size={13}/></span></div>
    <div className="saas-window">
      <header className="saas-window-bar"><span className="saas-window-dots"><i/><i/><i/></span><span>product / experience</span><span className="saas-preview-tag">INTERACTIVE PREVIEW</span></header>
      <div className="saas-workspace"><aside aria-label="Preview stages">{steps.map(({ icon: StageIcon, label }, index) => <button key={label} type="button" aria-label={label} aria-pressed={active === index} onClick={() => select(index)}>{createElement(StageIcon, { size: 19 })}</button>)}<span>✦</span></aside>
        <div className="saas-canvas" key={active}>
          <div className="saas-canvas-top"><span><Icon size={15}/> YOUR PRODUCT, REIMAGINED</span><span>0{active + 1} / 03</span></div>
          <h2>{step.title}</h2><p>{step.text}</p>
          <div className={`saas-flow saas-flow-${active}`} aria-hidden="true"><div className="saas-flow-node"><Layers size={22}/><span>Product</span></div><span className="saas-flow-line"/><div className="saas-flow-core"><Icon size={30}/></div><span className="saas-flow-line"/><div className="saas-flow-node"><Check size={22}/><span>Value</span></div></div>
          <div className="saas-preview-checks">{step.cards.map((card, index) => <div key={card}><span>0{index + 1}</span>{card}<Check size={13}/></div>)}</div>
          <div className="saas-canvas-footer"><span>ILLUSTRATIVE PRODUCT JOURNEY</span>{active === 2 ? <Link to="/contact">Plan your experience <ArrowUpRight size={14}/></Link> : <button type="button" onClick={() => select(active + 1)}>Next stage <ArrowUpRight size={14}/></button>}</div>
        </div>
      </div>
    </div>
    <div className="saas-journey-tabs" role="group" aria-label="Explore the product journey">{steps.map((item, index) => <button type="button" key={item.label} aria-pressed={active === index} onClick={() => select(index)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={14}/></button>)}</div>
    <div className="saas-preview-note" aria-live="polite"><div><strong>{step.caption}</strong><p>{step.detail}</p></div><button type="button" className="saas-replay" aria-label="Explore next journey stage" onClick={() => select((active + 1) % steps.length)}><Play size={16}/></button></div>
  </div>;
}
