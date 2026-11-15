import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <main className="client-information-page">
      <section className="content-shell">
        <p className="content-eyebrow public-eyebrow">WORKING WITH KRAVS INFOTECH</p>
        <h1>Understand the approach.<br /><em>Plan your next step.</em></h1>
        <p>Explore how strategy, design, development, and digital marketing can support your business. Project scope, deliverables, and success measures are agreed around your goals.</p>
        <div className="information-grid">
          <article><h2>A clear brief</h2><p>We start with your audience, priorities, existing website, and marketing activity to identify the work that matters.</p></article>
          <article><h2>Defined deliverables</h2><p>Design, development, content, and campaign responsibilities are outlined before work begins, with a shared review process.</p></article>
          <article><h2>Useful measurement</h2><p>Relevant enquiries, user journeys, and campaign signals help inform improvements. Outcomes depend on your offer, audience, and implementation.</p></article>
        </div>
        <Link className="site-cta" to="/services">Explore our services <span aria-hidden="true">&#8599;</span></Link>
      </section>
    </main>
  );
}
