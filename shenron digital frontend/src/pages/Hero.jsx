
import React, { useState } from "react";
import "./Hero.css";
import leftImg from "../assets/leftimg.png";
import kravsOffice from "../assets/kravs-office.png";
import serviceTRight from "../assets/service T-right.png";
import webDevelopment from "../assets/web_development.png";
import paidAdvertising from "../assets/paid_advertising.png";
import influencerMarketing from "../assets/influencer_marketing.png";
import leadGeneration from "../assets/lead_generation.png";
import uiuxBranding from "../assets/uiux_branding.png";
import seoImage from "../assets/seo.png";

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
  ArrowLeft,
  Menu, 
  X,
  Plus,
  Star,
  Quote,
} from "lucide-react";

// testimonial

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Founder, TrendKart",
    initials: "RS",
    rating: 5,
    featured: false,
    text: "Kravs Infotech delivered an amazing website for our business. The design, performance, and support were outstanding. Highly recommended!",
  },
  {
    name: "Sneha Verma",
    role: "CEO, NutriPure",
    initials: "SV",
    rating: 5,
    featured: true,
    text: "Professional team, clear communication, and excellent results. Our new website has significantly improved our online presence and customer engagement.",
  },
  {
    name: "Amit Jain",
    role: "Owner, The Chanchal Restaurant",
    initials: "AJ",
    rating: 5,
    featured: false,
    text: "They understood our vision perfectly and created a modern, user-friendly website. The entire process was smooth and hassle-free.",
  },
  {
    name: "Priya Mehta",
    role: "Marketing Head, NovaJoy Remedies",
    initials: "PM",
    rating: 5,
    featured: false,
    text: "Great experience working with Kravs Infotech. The team is skilled, responsive, and truly cares about delivering value.",
  },
  {
    name: "Karan Patel",
    role: "Founder, BuildNext",
    initials: "KP",
    rating: 5,
    featured: false,
    text: "The team brought our ideas to life with a clean, professional design and a smooth experience across devices.",
  },
  {
    name: "Ananya Singh",
    role: "Director, EduSphere",
    initials: "AS",
    rating: 5,
    featured: false,
    text: "Communication was clear throughout the project. The final website looks professional and gives our brand a stronger online presence.",
  },
];

const brands = [
  "TrendKart",
  "NutriPure",
  "The Chanchal Restaurant",
  "NovaJoy Remedies",
  "BuildNext",
  "EduSphere",
];

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
    link: "/services/lead-generation",
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
    link: "/services/ui-ux-branding",
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

  const [page, setPage] = useState(0);

  const visibleTestimonials = Array.from(
    { length: 4 },
    (_, index) => testimonials[(page + index) % testimonials.length]
  );

  const nextPage = () => {
    setPage((current) => (current + 1) % testimonials.length);
  };

  const previousPage = () => {
    setPage(
      (current) =>
        (current - 1 + testimonials.length) % testimonials.length
    );
  };

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
              <a href="#contact" className="hero-primary-btn">
                <span>Start a Project</span>

                <span className="btn-arrow">↗</span>
              </a>

              <a href="#work" className="hero-play-btn">
                <span className="play-icon">▶</span>
                <span>Watch Showreel</span>
              </a>
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

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">01</div>

            <div className="stat-content">
              <h3>Creative</h3>
              <p>Images</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-number">02</div>

            <div className="stat-content">
              <h3>Shooting</h3>
              <p>Animation</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-number">03</div>

            <div className="stat-content">
              <h3>Branding</h3>
              <p>Videos</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-number">04</div>

            <div className="stat-content">
              <h3>Creative</h3>
              <p>Designing</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-number">05</div>

            <div className="stat-content">
              <h3>Shooting</h3>
              <p>Marketing</p>
            </div>
          </div>
        </div>
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

            <a href="#ka-difference" className="ka-primary-btn">
              <span>More about us</span>
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </a>
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

                  <a
                    href={service.link}
                    className="ks-card-arrow"
                    aria-label={`Explore ${service.title}`}
                  >
                    <ArrowRight size={19} />
                  </a>
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

            <a href="/contact" className="kp-cta-button">
              <span>Start a Project</span>
              <span className="kp-cta-arrow">
                <ArrowRight size={18} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------Testimonial---------------------------------- */}

      <section className="kravs-testimonials" id="testimonials">
      <div className="kt-container">
        <header className="kt-header">
          <div className="kt-intro">
            <span className="kt-eyebrow">
              <span className="kt-eyebrow-line" />
              CLIENT TESTIMONIALS
            </span>

            <h2>
              What our clients
              <br />
              <span>say about us.</span>
            </h2>

            <p>
              Real stories from businesses we've helped grow through
              modern websites, creative design, and digital solutions.
            </p>
          </div>

          <div className="kt-stats">
            <div className="kt-stat">
              <strong>50+</strong>
              <span>HAPPY CLIENTS</span>
            </div>

            <div className="kt-stat">
              <strong>100+</strong>
              <span>PROJECTS DELIVERED</span>
            </div>

            <div className="kt-stat">
              <strong>100%</strong>
              <span>COMMITMENT</span>
            </div>
          </div>
        </header>

        <div className="kt-section-label">
          <span>WHAT PEOPLE SAY</span>

          <div className="kt-controls">
            <button
              type="button"
              onClick={previousPage}
              aria-label="Previous testimonials"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextPage}
              aria-label="Next testimonials"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="kt-grid">
          {visibleTestimonials.map((item, index) => (
            <article
              className={`kt-card ${item.featured ? "kt-featured" : ""}`}
              key={`${item.name}-${page}`}
            >
              <div className="kt-card-top">
                <Quote className="kt-quote" size={32} />

                <div className="kt-stars" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      fill="currentColor"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>

              <p className="kt-review">{item.text}</p>

              <div className="kt-client">
                <div className={`kt-avatar kt-avatar-${index}`}>
                  {item.initials}
                </div>

                <div className="kt-client-info">
                  <h3>{item.name}</h3>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="kt-pagination" aria-label="Testimonial navigation">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={page === index ? "active" : ""}
              onClick={() => setPage(index)}
              aria-label={`Show testimonials starting from ${item.name}`}
              aria-current={page === index ? "true" : undefined}
            />
          ))}
        </div>

        <div className="kt-brands">
          <div className="kt-brands-heading">
            <span />
            <p>BUILT FOR BUSINESSES WITH BIG AMBITIONS</p>
            <span />
          </div>

          <div className="kt-brand-list">
            {brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>

        <div className="kt-bottom-cta">
          <div>
            <span>YOUR STORY COULD BE NEXT</span>
            <h3>Let's build something worth talking about.</h3>
          </div>

          <a href="/contact">
            Start a Project
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>

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

            <a href="/contact" className="kf-contact-btn">
              Contact Our Team
              <ArrowUpRight size={18} />
            </a>
          </div> */}
        </div>
      </section>


    </>
  );
};

export default Hero;
