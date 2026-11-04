import { Link } from 'react-router-dom';
import '../ServiceDetail.css';

export default function IndustryNotFound({ section = 'industries' }) {
  const label = section === 'business-types' ? 'Business Types' : 'Industries';
  return <main className="sd-page"><section className="sd-wrap sd-missing"><p className="sd-eyebrow">{label}</p><h1>Find your<br/><em>next direction.</em></h1><p>This page could not be found. Explore the available options to find the right starting point.</p><Link className="sd-button" to={`/${section}`}>Explore {label.toLowerCase()}</Link></section></main>;
}
