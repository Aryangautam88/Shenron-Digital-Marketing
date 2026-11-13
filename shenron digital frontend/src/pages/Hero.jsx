
import React, { useState } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import leftImg from "../assets/leftimg.png";
import kravsOffice from "../assets/kravs-office.png";
import serviceTRight from "../assets/service T-right.png";
import webDevelopment from "../assets/web_development.png";
import paidAdvertising from "../assets/paid_advertising.png";
import influencerMarketing from "../assets/influencer_marketing.png";
import leadGeneration from "../assets/lead_generation.png";
import uiuxBranding from "../assets/uiux_branding.png";
import seoImage from "../assets/seo.png";
import BlogSection from "./BlogSection";

import {
  Code2,
  ChartNoAxesColumnIncreasing,
  UsersRound,
  Funnel,
  Palette,
  Search,
  ArrowUpRight,
  PenTool,
  Target,
  Lightbulb,
  Compass,
  Paintbrush,
  UserRound,
  Rocket,
  ArrowRight,
  Menu, 
  X,
  Plus,
} from "lucide-react";

// process

const faqData = [
  {
    number: "01",
    question: "What services does Kravs Infotech offer?",
    answer:
      "We offer website development, landing page design, website redesign, SaaS development, SEO, lead generation, and digital marketing solutions tailored to your business goals.",
  },
  {
    number: "02",
    question: "How much does it cost to build a website?",
    answer:
      "The cost depends on your project requirements, features, design complexity, and integrations. Contact us with your idea, and we'll help you find a solution that fits your goals and budget.",
  },
  {
    number: "03",
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We can modernize your website's design, improve mobile responsiveness, enhance user experience, and optimize performance while preserving important existing functionality.",
  },
  {
    number: "04",
    question: "Can you help generate leads for my business?",
    answer:
      "Yes. We can create conversion-focused landing pages, improve calls to action, set up lead capture forms, and support your lead generation strategy through relevant digital marketing solutions.",
  },
  
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your goals, challenges and target audience to define the right direction.",
    icon: Search,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We create a tailored strategy with a clear roadmap, timeline and measurable goals.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Build",
    description:
      "We design and develop high-performance solutions with attention to every detail.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch & Grow",
    description:
      "We launch your project and provide ongoing support to help your business grow.",
    icon: Rocket,
  },
];

/* SERVICES DATA */

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern, scalable and high-performance web applications built for your business goals.",
    tags: ["Website", "Web Apps", "E-commerce"],
    icon: Code2,
    image: webDevelopment,
    alt: "Web development illustration",
    link: "/services/web-development",
  },
  {
    number: "02",
    title: "Paid Advertising",
    description:
      "Data-driven ad campaigns across Google, Meta and other platforms to get real results.",
    tags: ["Google Ads", "Meta Ads", "YouTube Ads"],
    icon: ChartNoAxesColumnIncreasing,
    image: paidAdvertising,
    alt: "Advertising analytics illustration",
    link: "/services/paid-advertising",
  },
  {
    number: "03",
    title: "Influencer Marketing",
    description:
      "Connect with the right audience through strategic influencer collaborations.",
    tags: ["Influencers", "Campaigns", "Brand Growth"],
    icon: UserRound,
    image: influencerMarketing,
    alt: "Influencer marketing illustration",
    link: "/services/influencer-marketing",
  },
  {
    number: "04",
    title: "Lead Generation",
    description:
      "Convert the right audience into high-quality leads and long-term customers.",
    tags: ["Landing Pages", "CRM Setup", "Automation"],
    icon: Funnel,
    image: leadGeneration,
    alt: "Lead generation illustration",
    link: "/services/web-development/landing-pages",
  },
  {
    number: "05",
    title: "UI/UX & Branding",
    description:
      "Create intuitive designs and strong brand identities that leave a lasting impression.",
    tags: ["UI/UX Design", "Brand Identity", "Product Design"],
    icon: PenTool,
    image: uiuxBranding,
    alt: "UI UX and branding illustration",
    link: "/services/digital-design",
  },
  {
    number: "06",
    title: "SEO",
    description:
      "Improve visibility, attract the right audience and grow organically with proven strategies.",
    tags: ["Technical SEO", "On-Page SEO", "Content Strategy"],
    icon: Search,
    image: seoImage,
    alt: "SEO analytics illustration",
    link: "/services/seo",
  },
];

const stats = [
  { value: "50", suffix: "+", label: "Projects delivered" },
  { value: "30", suffix: "+", label: "Happy clients" },
  { value: "10", suffix: "+", label: "Industries served" },
  { value: "01", suffix: "", label: "Shared mission" },
];
const values = [
  {
    icon: Target,
    title: "Strategy first",
    description: "Clear thinking before every build",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Built to scale",
    description: "Digital foundations for growth",
  },
  {
    icon: Lightbulb,
    title: "Impact by design",
    description: "Every detail has a purpose",
  },
];

const timelinePath =
  "M 70 48 C 160 48, 190 76, 300 76 S 440 30, 500 48 S 650 76, 700 76 S 850 30, 900 48 S 1050 76, 1130 48";

const Hero = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex((current) => (current === index ? -1 : index));
  };
  return (
    <>
      {/* ================= -----------------HERO SECTION-=-=----------------=-- ================= */}

      <section className="hero" id="home">
        {/* Background decoration */}

        <div className="hero-bg-glow"></div>
        <div className="hero-bg-ring"></div>

        <div className="hero-container">
          {/* LEFT CONTENT */}

          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="eyebrow-line"></span>
              <span>IDEAS INTO DIGITAL IMPACT</span>
            </div>

            <h1 className="hero-title">
              Build
              <span className="hero-title-line">
                What's <em>Next.</em>
              </span>
            </h1>

            <p className="hero-description">
              We design and build high-performance digital
              experiences that help ambitious brands grow,
              connect with their audience, and turn ideas into
              measurable business results.
            </p>

            {/* CTA BUTTONS */}

            <div className="hero-actions">
              <Link to="/contact" className="hero-primary-btn">
                <span>Start a Project</span>

                <span className="btn-arrow">↗</span>
              </Link>

              <Link to="/services" className="hero-play-btn">
                <span className="play-icon"><ArrowRight size={16} aria-hidden="true" /></span>
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <img
              src={leftImg}
              alt="Digital innovation and creative technology"
              className="hero-main-image"
            />
          </div>
        </div>

        {/* HERO STATS */}

        <nav className="hero-stats" aria-label="Explore our services">
          {[
            ["Web Design", "UI/UX Design", "/services/digital-design/website-ui"],
            ["Development", "Business Websites", "/services/web-development/business-websites"],
            ["Branding", "Brand Identity", "/services/digital-design/brand-identity"],
            ["SEO", "Search Visibility", "/services/seo"],
            ["Advertising", "Paid Campaigns", "/services/paid-advertising"],
          ].map(([title, subtitle, to], index) => (
            <Link className="stat-item" to={to} key={to}>
              <div className="stat-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="stat-content"><h3>{title}</h3><p>{subtitle}</p></div>
            </Link>
          ))}
        </nav>
      </section>

      {/*------------------------------------ About Us------------------------------------------ */}

      <main className="kravs-about">
        {/* ABOUT HERO */}
        <section className="ka-hero">
          <div className="ka-hero-copy">
            <div className="ka-eyebrow">
              <span className="ka-eyebrow-line" />
              <span>ABOUT KRAVS</span>
            </div>

            <h1 className="ka-heading">
              We blend strategy,
              <br className="ka-desktop-break" /> technology and
              <br className="ka-desktop-break" />
              <span className="ka-serif"> creativity.</span>
            </h1>

            <p className="ka-description">
              We turn complex business challenges into thoughtful
              digital experiences that help ambitious brands
              move forward.
            </p>

            <Link to="/about" className="ka-primary-btn">
              <span>More about us</span>
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </Link>
          </div>

          {/* OFFICE IMAGE + FLOATING CARD */}
          <div className="ka-visual">
            <div className="ka-office-image">
              <img src={kravsOffice} alt="Kravs Office" />

              <div className="ka-image-brand" aria-label="Kravs">
                {/* kravs<span>.</span> */}
              </div>
            </div>

            <div className="ka-values-card">
              {values.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="ka-value-item" key={item.title}>
                    <div className="ka-value-icon">
                      <Icon size={27} strokeWidth={2} />
                    </div>

                    <div className="ka-value-copy">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPANY STATISTICS */}
        <section className="ka-stats" aria-label="Company statistics">
          {stats.map((stat) => (
            <div className="ka-stat" key={stat.label}>
              <div className="ka-stat-number">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>

              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        {/* WHAT MAKES US DIFFERENT */}

      </main>


      {/* =================------------------ SERVICES SECTION---------------------------================= */}


      <main className="kravs-services">
        {/* HERO */}
        <section className="ks-hero">
          <div className="ks-hero-copy">
            <div className="ks-eyebrow">
              <span className="ks-eyebrow-line" />
              <span>OUR SERVICES</span>
            </div>

            <h1 className="ks-heading">
              Everything you need
              <br className="ks-desktop-break" />
              {" "}to grow{" "}
              <span className="ks-heading-accent">
                digitally.
              </span>
            </h1>

            <p className="ks-hero-description">
              We design and build digital solutions that solve
              real business problems, help you reach the right
              audience and create measurable growth.
            </p>
          </div>

          <div className="ks-hero-visual">
            <div className="ks-orbit ks-orbit-one" />
            <div className="ks-orbit ks-orbit-two" />

            {/* Change only this image filename */}
            <img
              className="ks-hero-image"
              src={serviceTRight}
              alt="Kravs digital solutions"
            />

            <div className="ks-hero-quote">
              <span className="ks-quote-mark">“</span>
              <p>
                Ideas
                <br />
                Strategy
                <br />
                Design
                <br />
                Execution
              </p>
            </div>
          </div>

          {/* <a href="#ks-service-grid" className="ks-explore-link">
            Explore all services
            <ArrowRight size={18} />
          </a> */}
        </section>

        {/* SERVICES GRID */}
        <section
          className="ks-service-section"
          id="ks-service-grid"
          aria-label="Our digital services"
        >
          <div className="ks-service-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  className="ks-service-card"
                  key={service.number}
                >
                  <div className="ks-card-content">
                    <div className="ks-card-top">
                      <div className="ks-service-icon">
                        <Icon size={26} strokeWidth={2} />
                      </div>

                      <span className="ks-card-number">
                        {service.number}
                      </span>
                    </div>

                    <h2 className="ks-card-title">
                      {service.title}
                    </h2>

                    <p className="ks-card-description">
                      {service.description}
                    </p>

                    <div className="ks-card-tags">
                      {service.tags.map((tag) => (
                        <span className="ks-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fixed image area keeps all cards aligned */}
                  <div className="ks-card-visual">
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                    />
                  </div>

                  <Link
                    to={service.link}
                    className="ks-card-arrow"
                    aria-label={`Explore ${service.title}`}
                  >
                    <ArrowRight size={19} />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/*--------------------------------- Process-------------------------------------- */}


      <section className="kravs-process" id="our-process">
        {/* Decorative image spaces */}
        <div
          className="kp-decoration kp-decoration-top"
          aria-hidden="true"
        />

        <div
          className="kp-decoration kp-decoration-bottom"
          aria-hidden="true"
        />

        <div className="kp-container">
          {/* Heading */}
          <header className="kp-header">
            <div className="kp-eyebrow">
              <span className="kp-eyebrow-line" />
              <span>OUR PROCESS</span>
            </div>

            <h2 className="kp-heading">
              From Idea to{" "}
              <span className="kp-heading-accent">Impact.</span>
            </h2>

            <p className="kp-subtitle">
              A simple, transparent and collaborative process to turn
              your ideas into meaningful digital experiences.
            </p>
          </header>

          {/* Animated timeline */}
          <div className="kp-timeline">
            <svg
              className="kp-connector"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="kp-line-base"
                d={timelinePath}
              />

              <path
                className="kp-line-glow"
                pathLength="1200"
                d={timelinePath}
              />

            </svg>

            <div className="kp-steps">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    className="kp-step"
                    key={step.number}
                    style={{ "--step-index": index }}
                  >
                    <div className="kp-step-number">
                      {step.number}
                    </div>

                    <div className="kp-step-icon">
                      <Icon
                        size={32}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="kp-step-copy">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="kp-cta">
            <div className="kp-cta-copy">
              <span className="kp-cta-label">
                LET'S BUILD TOGETHER
              </span>

              <h3>
                Let’s make something
                <br className="kp-cta-break" /> great together.
              </h3>

              <p>
                Have an idea? Let’s turn it into a digital experience
                that moves your business forward.
              </p>
            </div>

            <Link to="/contact" className="kp-cta-button">
              <span>Start a Project</span>
              <span className="kp-cta-arrow">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <BlogSection />

      {/*------------------------------------ FAQ----------------------------------------- */}

      <section className="kravs-faq" id="faq">
        <div className="kf-container">
          {/* Header */}
          <div className="kf-header">
            <div className="kf-heading-content">
              <span className="kf-eyebrow">
                <span className="kf-eyebrow-line" />
                FREQUENTLY ASKED QUESTIONS
              </span>

              <h2>
                Got questions?
                <br />
                <span>We've got answers.</span>
              </h2>

              <p>
                Everything you need to know about our services,
                process, and how we can help your business grow.
              </p>
            </div>

            <div className="kf-header-note">
              <span className="kf-note-icon">?</span>
              <span>Still curious?</span>
              <p>We're just a message away.</p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="kf-layout">
            <div className="kf-side-label">
              <span>YOUR QUESTIONS</span>
              <span className="kf-side-line" />
              <span>OUR ANSWERS</span>
            </div>

            <div className="kf-list">
              {faqData.map((faq, index) => {
                const isOpen = activeIndex === index;

                return (
                  <article
                    className={`kf-item ${isOpen ? "is-open" : ""}`}
                    key={faq.number}
                  >
                    <button
                      className="kf-question"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`kf-answer-${index}`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="kf-number">{faq.number}</span>

                      <span className="kf-question-text">
                        {faq.question}
                      </span>

                      <span className="kf-toggle">
                        <Plus size={19} strokeWidth={1.8} />
                      </span>
                    </button>

                    <div
                      className="kf-answer-wrap"
                      id={`kf-answer-${index}`}
                      aria-hidden={!isOpen}
                    >
                      <div className="kf-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          {/* <div className="kf-bottom">
            <div>
              <span className="kf-bottom-label">HAVE A DIFFERENT QUESTION?</span>
              <h3>Let's talk about your next big idea.</h3>
            </div>

            <Link to="/contact" className="kf-contact-btn">
              Contact Our Team
              <ArrowUpRight size={18} />
            </Link>
          </div> */}
        </div>
      </section>


    </>
  );
};

export default Hero;
