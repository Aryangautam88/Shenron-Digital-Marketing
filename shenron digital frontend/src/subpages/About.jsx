import { ArrowDown, ArrowUpRight, Compass, Lightbulb, Users, Check } from "lucide-react";
import { createElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import officeImage from "../assets/kravs-office.png";
import creativeMindsHero from "../assets/companyImg.png";
import "./About.css";

const principles = [
  { icon: Compass, title: "Clarity in every decision", text: "We start with your goals, ask the right questions, and give every idea a clear direction." },
  { icon: Lightbulb, title: "Creativity with purpose", text: "Distinctive design and thoughtful storytelling, built around what makes your brand different." },
  { icon: Users, title: "A partnership that matters", text: "Open conversations, honest feedback, and a shared commitment to making the work better." },
];
const process = [
  { title: "Understand", text: "We get to know your business, your audience, and the opportunity ahead." },
  { title: "Create", text: "We turn a clear strategy into considered design, content, and digital experiences." },
  { title: "Build", text: "We bring the pieces together with attention to detail and practical execution." },
  { title: "Improve", text: "We learn from the response, refine the experience, and plan the next step." },
];
const approach = [
  { label: "Strategy", title: "A direction before a campaign.", text: "We connect your business goals with the people you want to reach. Audience research, positioning, and channel planning give the creative work a clear purpose.", items: ["Audience & competitor understanding", "Brand positioning & messaging", "Channel priorities & campaign planning"], outcome: "A focused plan: who to reach, what to say, and where to show up." },
  { label: "Creativity", title: "A brand people can recognise.", text: "We translate your positioning into a consistent visual identity and stories that feel relevant to your audience, from the first impression to the next conversation.", items: ["Brand identity & visual direction", "Social content & campaign concepts", "Website design & user experience"], outcome: "A connected brand experience across your digital touchpoints." },
  { label: "Growth", title: "Learn from what happens next.", text: "We bring campaigns and digital experiences together, then use performance insights to understand what deserves more attention and what needs to change.", items: ["Search visibility & paid campaigns", "Conversion journeys & lead generation", "Performance review & optimisation"], outcome: "Clearer decisions informed by audience response and campaign performance." },
];
const processDetails = [
  ["Discovery conversation", "Audience and market review", "Agreed goals and priorities"],
  ["Creative direction", "Content and design concepts", "Feedback and refinement"],
  ["Campaign or website setup", "Quality checks and tracking", "Coordinated launch"],
  ["Performance review", "Testing and optimisation", "Recommendations for next steps"],
];

export default function About() {
  const pageRef = useRef(null);
  const [activeApproach, setActiveApproach] = useState(0);
  const selectedApproach = approach[activeApproach];

  useEffect(() => {
    const page = pageRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window) || motionPreference.matches) return;

    // Reveal individual blocks when they enter view, including stacked mobile cards.
    const elements = Array.from(page.querySelectorAll([
      ".about-hero-copy > *", ".about-discipline-bar span",
      ".about-story-image", ".about-story-copy > *",
      ".about-purpose-inner > *", ".about-section-heading > *",
      ".about-principle", ".about-process-grid > li", ".about-approach-layout", ".about-faq-list > details",
    ].join(",")));
    const reveal = (element) => {
      element.dataset.reveal = "visible";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    elements.forEach((element) => {
      const siblings = Array.from(element.parentElement.children);
      element.style.setProperty("--about-reveal-delay", `${Math.min(siblings.indexOf(element), 3) * 85}ms`);
      element.dataset.reveal = "pending";
      observer.observe(element);
    });
    const revealFocusedContent = (event) => {
      const block = event.target.closest("[data-reveal]");
      if (block) reveal(block);
    };
    const handleMotionChange = () => {
      if (motionPreference.matches) elements.forEach(reveal);
    };
    page.addEventListener("focusin", revealFocusedContent);
    motionPreference.addEventListener("change", handleMotionChange);
    return () => {
      observer.disconnect();
      page.removeEventListener("focusin", revealFocusedContent);
      motionPreference.removeEventListener("change", handleMotionChange);
      elements.forEach((element) => {
        delete element.dataset.reveal;
        element.style.removeProperty("--about-reveal-delay");
      });
    };
  }, []);

  return (
    <main className="about-page" ref={pageRef}>
      <section className="about-hero" aria-labelledby="about-title">
        <img className="about-hero-artwork" src={creativeMindsHero} alt="" aria-hidden="true" fetchPriority="high" />
        <div className="about-container about-hero-inner">
          <div className="about-hero-copy">
            <p className="about-eyebrow"><span /> WHO WE ARE</p>
            <h1 id="about-title">Built on ideas.<br /><em>Driven by purpose.</em></h1>
            <p className="about-description">We’re a team of creative thinkers and digital problem-solvers, bringing strategy, design, and technology together to help your business move forward.</p>
            <div className="about-actions"><a className="about-button" href="#about-story">Discover our story <span><ArrowDown size={16} /></span></a><Link className="about-button about-button-light" to="/services">Explore services <ArrowUpRight size={17} /></Link></div>
          </div>
        </div>
      </section>
      <div className="about-discipline-bar"><div className="about-container"><span>STRATEGIC THINKING</span><i aria-hidden="true">✦</i><span>CREATIVE EXPRESSION</span><i aria-hidden="true">✦</i><span>DIGITAL EXPERIENCES</span><i aria-hidden="true">✦</i><span>MEANINGFUL GROWTH</span></div></div>
      <section className="about-story about-container" id="about-story" aria-labelledby="about-story-title">
        <figure className="about-story-image"><img src={officeImage} alt="KRAVS Infotech branded workspace" loading="lazy" width="1536" height="1024" /><figcaption><span>OUR MINDSET</span><p>Think beyond.<br /><em>Build together.</em></p></figcaption></figure>
        <div className="about-story-copy"><p className="about-eyebrow"><span /> THE THINKING BEHIND THE WORK</p><h2 id="about-story-title">Your ambition.<br /><em>Our shared journey.</em></h2><p>A strong digital presence starts with understanding the business behind it. What you believe in. Who you want to reach. Where you want to go.</p><p>We bring those pieces together through thoughtful strategy, distinctive design, and technology that serves a purpose. Working alongside you, we turn complex challenges into clear, practical next steps.</p><ul className="about-checks"><li><Check size={16} /> Strategy shaped around your business</li><li><Check size={16} /> Creativity connected to real objectives</li><li><Check size={16} /> Collaboration from the very beginning</li></ul><Link className="about-text-link" to="/services">See how we can help <ArrowUpRight size={17} /></Link></div>
      </section>
      <section className="about-approach about-container" aria-labelledby="about-approach-title">
        <div className="about-section-heading"><div><p className="about-eyebrow"><span /> ONE TEAM. CONNECTED THINKING.</p><h2 id="about-approach-title">Different skills.<br /><em>One shared direction.</em></h2></div><p>Explore how we connect the thinking, the making, and the learning behind your digital presence.</p></div>
        <div className="about-approach-layout">
          <div className="about-approach-controls" role="group" aria-label="Explore our approach">{approach.map((item, index) => <button key={item.label} type="button" aria-pressed={activeApproach === index} aria-controls="about-approach-content" onClick={() => setActiveApproach(index)}><span className="about-approach-index">0{index + 1}</span><span>{item.label}<small>{["Find the right direction", "Give your brand a voice", "Turn insights into action"][index]}</small></span><ArrowUpRight size={21} /></button>)}</div>
          <div className="about-approach-content" id="about-approach-content" aria-live="polite" aria-atomic="true"><div className="about-approach-panel" key={selectedApproach.label}><span className="about-mini-label">{selectedApproach.label} / OUR APPROACH</span><h3>{selectedApproach.title}</h3><p>{selectedApproach.text}</p><ul className="about-checks">{selectedApproach.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><div className="about-approach-outcome"><span>WHAT THIS GIVES YOU</span><p>{selectedApproach.outcome}</p></div></div></div>
        </div>
      </section>
      <section className="about-principles about-container" aria-labelledby="about-principles-title"><div className="about-section-heading"><div><p className="about-eyebrow"><span /> WHAT WE BELIEVE</p><h2 id="about-principles-title">Good work starts with<br /><em>the right principles.</em></h2></div><p>The values we bring to every conversation, every idea, and every project.</p></div><div className="about-principle-grid">{principles.map(({ icon, title, text }, index) => <article className="about-principle" key={title}><div className="about-principle-top"><span className="about-icon">{createElement(icon, { size: 25, strokeWidth: 1.5 })}</span><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="about-method" aria-labelledby="about-method-title"><div className="about-container"><div className="about-section-heading"><div><p className="about-eyebrow"><span /> HOW WE WORK</p><h2 id="about-method-title">Good collaboration.<br /><em>Clear next steps.</em></h2></div><p>Explore each stage to see how a first conversation becomes considered work and continuous improvement.</p></div><ol className="about-process-grid">{process.map((step, index) => <li key={step.title}><span className="about-process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p><details className="about-step-details"><summary>What happens here <span aria-hidden="true">+</span></summary><ul>{processDetails[index].map((item) => <li key={item}>{item}</li>)}</ul></details></li>)}</ol></div></section>
      <section className="about-faq about-container" aria-labelledby="about-faq-title"><div><p className="about-eyebrow"><span /> BEFORE WE BEGIN</p><h2 id="about-faq-title">A little clarity.<br /><em>A better beginning.</em></h2><p>A few things to know about working together.</p><Link className="about-text-link" to="/services">Explore our services <ArrowUpRight size={17} /></Link></div><div className="about-faq-list">
        <details><summary>Where do we start?<span aria-hidden="true">+</span></summary><p>Start with your business goals, the audience you want to reach, and the challenge you want to solve. We use that conversation to identify priorities and recommend a suitable scope of work.</p></details>
        <details><summary>Can we focus on one part of our marketing?<span aria-hidden="true">+</span></summary><p>Yes. The starting point can be a specific need, such as search visibility, paid campaigns, brand design, or a website. The plan should fit your priorities rather than require every channel at once.</p></details>
        <details><summary>How do we decide what success looks like?<span aria-hidden="true">+</span></summary><p>We connect the work to an agreed objective, then choose relevant measures: qualified enquiries, conversions, engagement, or search visibility. Those measures guide the review and the next round of improvements.</p></details>
      </div></section>
    </main>
  );
}
