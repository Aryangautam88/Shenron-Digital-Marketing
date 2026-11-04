import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import "./Contact.css";

const services = ["SEO", "Paid advertising", "Brand & digital design", "Web development", "Influencer marketing", "Not sure yet"];
const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || `${(import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "")}/contact`;

export default function Contact() {
  const pageRef = useRef(null);
  useEffect(() => {
    const page = pageRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const blocks = [...page.querySelectorAll('.contact-copy, .contact-form, .contact-section-heading, .contact-steps li, .contact-faq > div')];
    const reveal = (block) => { block.classList.remove('contact-pending'); observer.unobserve(block); };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target); }), { threshold: 0.08 });
    blocks.forEach((block) => { block.classList.add('contact-pending'); observer.observe(block); });
    const onFocus = (event) => { const block = event.target.closest('.contact-pending'); if (block) reveal(block); };
    const onPreference = () => { if (preference.matches) blocks.forEach(reveal); };
    page.addEventListener('focusin', onFocus);
    preference.addEventListener('change', onPreference);
    return () => { observer.disconnect(); blocks.forEach((block) => block.classList.remove('contact-pending')); page.removeEventListener('focusin', onFocus); preference.removeEventListener('change', onPreference); };
  }, []);
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    if (status.type === "sending") return;
    if (!contactEndpoint) {
      setStatus({ type: "notice", message: "Online enquiries are opening soon. Your message has not been sent; please check back to submit it." });
      return;
    }
    const form = event.currentTarget;
    const fields = new FormData(form);
    fields.delete("service");
    const payload = { ...Object.fromEntries(fields), services: selectedServices };
    setStatus({ type: "sending", message: "Sending your enquiry…" });
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Enquiry failed");
      setStatus({ type: "success", message: "Thank you for sharing your idea. Your enquiry has been sent, and our team will be in touch." });
      form.reset();
      setSelectedServices([]);
    } catch {
      setStatus({ type: "error", message: "We couldn’t send your enquiry. Your details are still here; please try again." });
    }
  }


  return (
    <main className="contact-page" ref={pageRef}>
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <div className="contact-container contact-hero-inner">
          <div>
            <p className="contact-eyebrow"><span /> A CONVERSATION IS A GOOD START</p>
            <h1 id="contact-hero-title">Big ideas start with<br /><em>a simple hello.</em></h1>
            <p className="contact-intro">A new brand. A better website. Your next stage of growth. Tell us what's on your mind, and let's find the way forward together.</p>
            <a href="#contact-form" className="contact-hero-button">Let's talk about your project <span><ArrowDown size={18} /></span></a>
          </div>
        </div>
      </section>
      <div className="contact-container contact-layout">
        <section className="contact-copy" aria-labelledby="contact-title">
          <p className="contact-eyebrow"><span /> CONTACT US</p>
          <h2 id="contact-title">Your ambition.<br /><em>Our starting point.</em></h2>
          <p className="contact-intro">Have a project in mind? Tell us a little about your business and how we can help.</p>
          <div className="contact-note">
            <h3>A little context goes a long way.</h3>
            <p>Share your goals, your ideas, or a challenge you're working through. You don't need a detailed brief to get started.</p>
          </div>
          <ul className="contact-promises">
            <li><Check size={17} /> Ideas at any stage are welcome</li>
            <li><Check size={17} /> A conversation shaped around your goals</li>
            <li><Check size={17} /> Clear thinking, without the jargon</li>
          </ul>
          <Link className="contact-services-link" to="/services">Explore our services <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </section>
        <form id="contact-form" className="contact-form" onSubmit={handleSubmit} aria-label="Project enquiry">
          <div className="contact-form-heading"><span>TELL US ABOUT YOUR PROJECT</span><ArrowUpRight size={20} aria-hidden="true" /></div>
          <div className="contact-fields">
            <label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100} /></label>
            <label>Email address <span>*</span><input type="email" name="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label>
            <label>Company <small>(optional)</small><input name="company" autoComplete="organization" placeholder="Your brand or business" maxLength={150} /></label>
            <label>Phone number <small>(optional)</small><input type="tel" name="phone" autoComplete="tel" placeholder="Include your country code" maxLength={30} /></label>
          </div>
          <fieldset className="contact-service-options"><legend>What can we help you with? <small>(select any)</small></legend><div>{services.map((service) => <label key={service}><input type="checkbox" name="service" value={service} checked={selectedServices.includes(service)} onChange={(event) => setSelectedServices((current) => event.target.checked ? [...current, service] : current.filter((item) => item !== service))} /><span>{service}<Check size={13} /></span></label>)}</div></fieldset>
          <label className="contact-message">Tell us about your project <span>*</span><textarea name="message" placeholder="What are you working on? What would you love to achieve?" rows={4} required minLength={10} maxLength={5000} /></label>
          <label className="contact-consent"><input type="checkbox" name="consent" value="yes" required /><span>I agree to be contacted about this enquiry using the details I’ve shared.</span></label>
          {!contactEndpoint && <p className="contact-availability">Online enquiries are opening soon. You can explore the form now; messages cannot be sent yet.</p>}
          <div className="contact-submit-row"><p>* Required fields</p><button type="submit" disabled={status.type === "sending"}>{status.type === "sending" ? "Sending…" : "Send enquiry"}<span><ArrowUpRight size={20} /></span></button></div>
          <p className={`contact-status contact-status-${status.type}`} role="status" aria-live="polite">{status.message}</p>
        </form>
      </div>
      <section className="contact-next contact-container" aria-labelledby="contact-next-title">
        <div className="contact-section-heading">
          <div><p className="contact-eyebrow"><span /> FROM HELLO TO WHAT'S NEXT</p><h2 id="contact-next-title">A clear path.<br /><em>A shared beginning.</em></h2></div>
          <p>No need to have all the answers. We'll work through the right questions together.</p>
        </div>
        <ol className="contact-steps">
          {[
            { title: "We listen first.", text: "Your goals, your audience, your challenges. A useful conversation starts with understanding what matters to you." },
            { title: "We find the direction.", text: "Together, we explore the right mix of strategy, creativity, and technology for your next step." },
            { title: "We make a plan.", text: "A considered scope, clear priorities, and a shared understanding of how to move forward." },
          ].map((step, index) => <li key={step.title}><div><span>0{index + 1}</span><ArrowUpRight size={22} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.text}</p></li>)}
        </ol>
      </section>
      <section className="contact-faq contact-container" aria-labelledby="contact-faq-title">
        <div><p className="contact-eyebrow"><span /> BEFORE YOU SAY HELLO</p><h2 id="contact-faq-title">A few things<br /><em>you might ask.</em></h2><p>A little clarity before we get started.</p></div>
        <div className="contact-questions">
          <details><summary>Do I need a detailed brief?<span aria-hidden="true">+</span></summary><p>No. Share where your business is today, what you want to improve, and any ideas you have. We can shape the brief together.</p></details>
          <details><summary>Can we start with just one service?<span aria-hidden="true">+</span></summary><p>Absolutely. Whether you need a website, a campaign, or help with search visibility, we can start with a focused scope around your priorities.</p></details>
          <details><summary>What should I include in my message?<span aria-hidden="true">+</span></summary><p>Your goals, a link to your website if you have one, and any timeline or budget you have in mind are helpful. It's also fine if you're still figuring those out.</p></details>
        </div>
      </section>
      <section className="contact-next-chapter"><div className="contact-container"><div><p className="contact-eyebrow"><span />EXPLORE WHAT'S POSSIBLE</p><h2>A little inspiration.<br /><em>A clearer next step.</em></h2><p>Explore the ways we can help bring your next idea to life.</p></div><Link className="contact-hero-button" to="/services">Explore our services <span><ArrowUpRight size={18} /></span></Link></div></section>
    </main>
  );
}
