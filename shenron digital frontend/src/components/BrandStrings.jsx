import { useId } from 'react';
import './BrandStrings.css';

// Decorative vector threads: no canvas, images, or pointer listeners needed.
export default function BrandStrings({ variant = 'flow', className = '' }) {
  const gradient = `brand-thread-${useId().replaceAll(':', '')}`;
  return <div className={`brand-strings brand-strings-${variant} ${className}`} aria-hidden="true"><svg viewBox="0 0 1440 700" preserveAspectRatio="none" fill="none"><defs><linearGradient id={gradient} x1="0" y1="0" x2="1440" y2="700" gradientUnits="userSpaceOnUse"><stop stopColor="#8045FF" stopOpacity="0" /><stop offset=".3" stopColor="#B69BEF" stopOpacity=".55" /><stop offset=".65" stopColor="#8045FF" stopOpacity=".8" /><stop offset="1" stopColor="#8045FF" stopOpacity="0" /></linearGradient></defs>{Array.from({length: 13}, (_, index) => <path key={index} style={{'--thread-index': index}} stroke={`url(#${gradient})`} strokeWidth={index % 4 === 0 ? 1.1 : .55} d={variant === 'orbit' ? `M ${-100+index*7} ${470+index*7} C ${180+index*5} ${60-index*4}, ${1190-index*9} ${-80+index*4}, ${1500-index*5} ${290+index*6} S ${350-index*3} ${780-index*4}, ${-100+index*7} ${470+index*7}` : `M -80 ${420+index*9} C 230 ${700-index*7}, 410 ${-80+index*11}, 750 ${240+index*9} S 1160 ${580-index*8}, 1520 ${60+index*11}`} />)}<path className="brand-string-tracer" stroke={`url(#${gradient})`} strokeWidth="1.8" strokeDasharray="30 1000" d="M -80 470 C 230 650, 410 0, 750 290 S 1160 530, 1520 115" /></svg></div>;
}
