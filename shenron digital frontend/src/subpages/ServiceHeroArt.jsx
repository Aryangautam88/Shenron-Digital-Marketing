<<<<<<< HEAD
import ServiceHeroMotif from './ServiceHeroMotif';
import { ArrowUpRight, Check, Code2, Globe2, Layers, MapPin, Megaphone, MousePointer2, Play, Search, Sparkles, Users } from 'lucide-react';

const symbols = { seo: Search, 'paid-advertising': Megaphone, 'digital-design': Layers, 'web-development': Code2, 'influencer-marketing': Users };
=======
﻿import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { serviceCategories } from './serviceContent';
import ServiceHeroScene, { ServiceHeroSceneSelection } from './ServiceHeroScene';
import './ServiceHeroArt.css';
>>>>>>> c74ca5827b3a9c29ef227ef7fc30373206f67bd0

export default function ServiceHeroArt({ category, name, deliverables, variant }) {
  const [active, setActive] = useState(0);
  const group = serviceCategories[category];
  const offering = group.items[variant - 1]?.[0];
  const scene = `${category}/${offering || 'overview'}`;
  return <div className={`service-hero-visual hv-experience hv-family-${category} hv-page-${offering || "overview"}`}>
    <div className="hv-experience-heading"><span>{name} / EXPLORE THE APPROACH</span><span className="hv-live-dot" aria-hidden="true" /></div>
    <div className="hv-stage" key={scene}><ServiceHeroSceneSelection active={active} onSelect={setActive}><ServiceHeroScene scene={scene} active={active} onSelect={setActive}/></ServiceHeroSceneSelection></div>
    <div className="hv-focus-options" role="group" aria-label={`Explore ${name} focus areas`}>{deliverables.map((label,index)=><button key={label} type="button" aria-label={label} aria-pressed={active===index} aria-controls="hero-focus-detail" onClick={()=>setActive(index)}><span>0{index+1}</span><span className="hv-option-label">{label.split(" ").slice(0, 2).join(" ")}</span><ArrowUpRight size={13} aria-hidden="true"/></button>)}</div>
    <div className="hv-selected-focus" id="hero-focus-detail" aria-live="polite" aria-atomic="true"><span>IN FOCUS</span><strong key={active}>{deliverables[active]}</strong><a href={`#service-capability-${active+1}`} aria-label={`Read about ${deliverables[active]}`}><ArrowUpRight size={18}/></a></div>
  </div>;
}
