
import React from "react";
import "./Hero.css";
import leftImg from "../assets/leftimg.png";
import kravsOffice from "../assets/kravs-office.png";

import {
  Code2,
  ChartNoAxesColumnIncreasing,
  UsersRound,
  Funnel,
  Palette,
  Search,
  ArrowUpRight,
} from "lucide-react";

import {
  // ArrowUpRight,
  Target,
  // ChartNoAxesColumnIncreasing,
  Lightbulb,
  Compass,
  Paintbrush,
  // UsersRound,
} from "lucide-react";
/* SERVICES DATA */
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
const services = [
  {
    title: "Web Development",
    icon: Code2,
    color: "purple",
    items: ["Website Design", "Web Applications", "E-commerce"],
  },
  {
    title: "Paid Advertising",
    icon: ChartNoAxesColumnIncreasing,
    color: "pink",
    items: ["Google Ads", "Meta Ads", "YouTube Ads"],
  },
  {
    title: "Influencer Marketing",
    icon: UsersRound,
    color: "rose",
    items: [
      "Influencer Outreach",
      "Campaign Management",
      "Performance Tracking",
    ],
  },
  {
    title: "Lead Generation",
    icon: Funnel,
    color: "orange",
    items: [
      "B2B Lead Generation",
      "Landing Pages",
      "CRM & Automation",
    ],
  },
  {
    title: "UI/UX & Branding",
    icon: Palette,
    color: "violet",
    items: ["UI/UX Design", "Brand Identity", "Product Design"],
  },
  {
    title: "SEO",
    icon: Search,
    color: "blue",
    items: ["Technical SEO", "On-Page SEO", "Content Strategy"],
  },
];

const Hero = () => {
  return (
    <>
      {/* ================= HERO SECTION ================= */}

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

      {/* ================= SERVICES SECTION ================= */}

      <section className="services-section" id="services">
        <div className="services-container">
          {/* SERVICES HEADER */}

          <div className="services-heading">
            <div>
              <span className="section-eyebrow">
                <span className="eyebrow-line"></span>
                OUR SERVICES
              </span>

              <h2>
                Everything you need
                <br />
                to grow <em>digitally.</em>
              </h2>
            </div>

            <p className="services-description">
              From strategy to execution, we create digital
              solutions that help your business grow, connect
              and stay ahead.
            </p>

            <a href="/services" className="all-services-link">
              Explore all services
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* SERVICES GRID */}

          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              const slug = service.title
                .toLowerCase()
                .replaceAll("/", "-")
                .replaceAll(" ", "-")
                .replaceAll("&", "and");

              return (
                <article
                  className="service-card"
                  key={service.title}
                >
                  <div className="service-card-top">
                    <span className={`service-icon ${service.color}`}>
                      <Icon size={23} strokeWidth={2} />
                    </span>

                    <span className="service-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{service.title}</h3>

                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <a
                    href={`/services/${slug}`}
                    className="service-learn-link"
                  >
                    Learn more

                    <span className="learn-arrow">
                      <ArrowUpRight size={14} />
                    </span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
