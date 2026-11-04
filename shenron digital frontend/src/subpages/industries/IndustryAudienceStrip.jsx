import { ArrowUpRight, Landmark, Users, ShieldCheck, Layers, Globe2, Code2, ShoppingBag, House, MapPin, HeartPulse, Monitor, Gamepad2, BookOpen } from 'lucide-react';
import './IndustryAudienceStrip.css';

const symbols = { finance:[Landmark,Layers,Users], saas:[Code2,Layers,Users], crypto:[Globe2,Code2,Users], ecommerce:[ShoppingBag,Layers,Globe2], 'real-estate':[House,MapPin,Layers], healthcare:[HeartPulse,Users,Monitor], 'it-software':[Code2,Layers,Monitor], gaming:[Gamepad2,Globe2,Users], igaming:[ShieldCheck,Layers,Users], forex:[Landmark,Monitor,BookOpen] };

export default function IndustryAudienceStrip({ industry, data }) {
  const icons = symbols[industry] || [Users,Layers,Globe2];
  return <section className={`id-audience-strip audience-${industry}`} aria-label={`${data.name} business audiences`}><div className="sd-wrap ia-layout"><div className="ia-intro"><span className="sd-mini">BUILT AROUND YOUR CONTEXT</span><p>Different audiences.<br/><em>One connected experience.</em></p></div><div className="ia-cards">{data.audiences.map((audience,index)=>{const Icon=icons[index];return <a href="#industry-solutions" className="ia-card" key={audience}><span className="ia-icon"><Icon size={23} strokeWidth={1.4}/></span><span className="ia-name">{audience}</span><span className="ia-index">0{index+1}</span><ArrowUpRight size={16} className="ia-arrow" aria-hidden="true"/></a>;})}</div></div></section>;
}
