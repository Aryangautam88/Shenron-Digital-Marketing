import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import BrandStrings from '../components/BrandStrings';
import './ServiceConnections.css';

export default function ServiceConnections({ deliverables, name }) {
  return <section className="service-connections has-brand-strings" aria-label={`${name}: connected areas of focus`}>
    <BrandStrings variant="flow" />
    <div className="sd-wrap sc-inner"><div className="sc-heading"><span className="sd-mini">ONE CONNECTED APPROACH</span><p>Each detail moves<br /><em>the bigger idea forward.</em></p><ArrowDownRight size={26} strokeWidth={1.3} aria-hidden="true" /></div>
      <ol className="sc-points">{deliverables.map((label,index) => <li key={label}><a href={`#service-capability-${index+1}`}><span className="sc-step"><span>0{index+1}</span><svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="28" /><circle cx="32" cy="32" r="22" /></svg></span><span className="sc-label">{label}</span><ArrowUpRight className="sc-arrow" size={16} aria-hidden="true" /></a></li>)}</ol>
    </div>
  </section>;
}
