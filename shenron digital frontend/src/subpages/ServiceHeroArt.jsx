import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { serviceCategories } from './serviceContent';
import ServiceHeroScene, { ServiceHeroSceneSelection } from './ServiceHeroScene';
import './ServiceHeroArt.css';

export default function ServiceHeroArt({ category, name, deliverables, variant }) {
  const [active, setActive] = useState(0);
  const group = serviceCategories[category];
  const offering = variant > 0 ? group?.items?.[variant - 1]?.[0] : undefined;
  const scene = `${category}/${offering || 'overview'}`;
  const focusAreas = Array.isArray(deliverables) ? deliverables : [];
  const selectedIndex = focusAreas[active] ? active : 0;

  return (
    <div className={`service-hero-visual hv-experience hv-family-${category} hv-page-${offering || 'overview'}`}>
      <div className="hv-experience-heading">
        <span>{name} / EXPLORE THE APPROACH</span>
        <span className="hv-live-dot" aria-hidden="true" />
      </div>

      <div className="hv-stage" key={scene}>
        <ServiceHeroSceneSelection active={selectedIndex} onSelect={setActive}>
          <ServiceHeroScene scene={scene} active={selectedIndex} onSelect={setActive} />
        </ServiceHeroSceneSelection>
      </div>

      {focusAreas.length > 0 && (
        <>
          <div className="hv-focus-options" role="group" aria-label={`Explore ${name} focus areas`}>
            {focusAreas.map((label, index) => (
              <button
                key={`${label}-${index}`}
                type="button"
                aria-label={label}
                aria-pressed={selectedIndex === index}
                aria-controls="hero-focus-detail"
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="hv-option-label">{label.split(' ').slice(0, 2).join(' ')}</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="hv-selected-focus" id="hero-focus-detail" aria-live="polite" aria-atomic="true">
            <span>IN FOCUS</span>
            <strong key={selectedIndex}>{focusAreas[selectedIndex]}</strong>
            <a
              href={`#service-capability-${selectedIndex + 1}`}
              aria-label={`Read about ${focusAreas[selectedIndex]}`}
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
