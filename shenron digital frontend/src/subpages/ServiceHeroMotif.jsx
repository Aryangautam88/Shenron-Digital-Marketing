import { ArrowUpRight, Check, Globe2, Layers, MapPin, MousePointer2, Search, Sparkles, Target, Users } from 'lucide-react';

const themes = {
  seo: { mark: Search, label: 'DISCOVERY SYSTEM', words: ['Search intent', 'Useful answers', 'Technical clarity'] },
  'paid-advertising': { mark: Target, label: 'CAMPAIGN STUDIO', words: ['The audience', 'The message', 'The next step'] },
  'digital-design': { mark: MousePointer2, label: 'CREATIVE WORKSPACE', words: ['Shape the idea', 'Find the rhythm', 'Make it distinct'] },
  'web-development': { mark: Layers, label: 'EXPERIENCE ARCHITECTURE', words: ['Structure', 'Interaction', 'Experience'] },
  'influencer-marketing': { mark: Users, label: 'CONNECTION STUDIO', words: ['Community', 'Creator', 'Your brand'] },
};

export default function ServiceHeroMotif({ category, name, deliverables, variant }) {
  const theme = themes[category];
  const Mark = theme.mark;
  const type = (variant - 1 + Object.keys(themes).indexOf(category)) % 7;
  return (
    <div className={`hm-scene hm-type-${type}`}>
      <div className="hm-label"><span />{theme.label}<Sparkles size={15} /></div>
      {type === 0 && <div className="hm-map"><div className="hm-map-grid" /><div className="hm-map-core"><MapPin size={35} strokeWidth={1.3} /><strong>{name}</strong></div>{deliverables.slice(0,3).map((text,i) => <div className={`hm-pin hm-pin-${i}`} key={text}><span>0{i+1}</span><p>{text}</p></div>)}</div>}
      {type === 1 && <div className="hm-architecture"><div className="hm-root"><Mark size={30} /><strong>{name}</strong></div><div className="hm-tree-line" /><div className="hm-branches">{deliverables.slice(0,3).map((text,i) => <div key={text}><span>0{i+1}</span><Layers size={22} /><p>{text}</p></div>)}</div><p className="hm-handwriting">Connected from the very beginning.</p></div>}
      {type === 2 && <div className="hm-globe"><div className="hm-globe-ring" /><div className="hm-globe-ring hm-globe-ring-two" /><div className="hm-globe-center"><Globe2 size={85} strokeWidth={.6} /><strong>{name}</strong></div>{theme.words.map((text,i) => <span className={`hm-world hm-world-${i}`} key={text}>{text}<ArrowUpRight size={14} /></span>)}</div>}
      {type === 3 && <div className="hm-poster"><span className="hm-poster-index">0{variant}</span><Mark size={42} strokeWidth={1.2} /><strong>{name}</strong><span className="hm-poster-line" /><div>{deliverables.slice(0,3).map((text,i) => <p key={text}><span>0{i+1}</span>{text}<ArrowUpRight size={16} /></p>)}</div><MousePointer2 className="hm-pointer" size={35} fill="#8045ff" /></div>}
      {type === 4 && <div className="hm-stack">{deliverables.slice(0,3).map((text,i) => <div className={`hm-stack-card hm-stack-card-${i}`} key={text}><span className="hm-stack-icon"><Mark size={27} /></span><small>{theme.words[i]}</small><strong>{text}</strong><ArrowUpRight size={20} /></div>)}<span className="hm-handwriting">A different perspective. A clear direction.</span></div>}
      {type === 5 && <div className="hm-mosaic"><div className="hm-tile hm-tile-title"><Mark size={35} /><strong>{name}</strong><span>{theme.label}</span></div>{deliverables.slice(0,3).map((text,i) => <div className={`hm-tile hm-tile-${i}`} key={text}><span>0{i+1}</span><p>{text}</p><ArrowUpRight size={22} /></div>)}</div>}
      {type === 6 && <div className="hm-path"><div className="hm-path-title"><Mark size={31} /><strong>{name}</strong></div>{deliverables.map((text,i) => <div className="hm-path-stop" key={text}><span>{i === 3 ? <Check size={18} /> : `0${i+1}`}</span><div><small>{theme.words[i % 3]}</small><p>{text}</p></div><ArrowUpRight size={17} /></div>)}</div>}
      <span className="hm-footer">THOUGHTFUL IDEAS. CONNECTED EXECUTION.</span>
    </div>
  );
}
