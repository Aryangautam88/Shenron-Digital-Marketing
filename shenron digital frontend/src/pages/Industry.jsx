import React, { useEffect, useRef, useState } from "react";
import "./Industry.css";
import industryBg from "../assets/industryBg.png"

const Industry = () => {
    const industries = [
        {
          name: "Finance",
          description:
            "Secure, scalable digital solutions for financial businesses.",
          number: "01",
        },
        {
          name: "SaaS",
          description:
            "Product-driven websites and platforms for SaaS companies.",
          number: "02",
        },
        {
          name: "Crypto",
          description:
            "Modern web solutions for blockchain and crypto businesses.",
          number: "03",
        },
        {
          name: "Ecommerce",
          description:
            "High-converting online stores with seamless user experiences.",
          number: "04",
        },
        {
          name: "Real Estate",
          description:
            "Digital experiences for property brands and real estate businesses.",
          number: "05",
        },
        {
          name: "Healthcare",
          description:
            "Reliable and compliant web solutions for healthcare providers.",
          number: "06",
        },
        {
          name: "IT & Software",
          description:
            "Web platforms for tech companies, IT services and software products.",
          number: "07",
        },
        {
          name: "Gaming",
          description:
            "Engaging digital platforms for gaming communities and brands.",
          number: "08",
        },
        {
          name: "iGaming",
          description:
            "Performance-focused digital experiences for iGaming brands.",
          number: "09",
        },
        {
          name: "Forex",
          description:
            "Conversion-focused websites for forex and trading businesses.",
          number: "10",
        },
      ];
      
      const businessTypes = [
        "B2B",
        "B2C",
        "Small Business",
        "Startup",
        "Enterprise",
      ];

      const sectionRef = useRef(null);
  const [activeIndustry, setActiveIndustry] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("industries-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section className="industry-hero">
      {/* Background image */}
      <img
        src={industryBg}
        alt="Digital marketing solutions across different industries"
        className="industry-background"
      />

      {/* Left content */}
      <div className="industry-content">
        <div className="industry-eyebrow">
          <span className="industry-line"></span>
          <span>INDUSTRIES</span>
        </div>

        <h1 className="industry-heading">
          Different
          <br />
          Industries.
          <br />
          <span>Same Vision.</span>
        </h1>

        <p className="industry-description">
          We create industry-focused digital solutions
          <br className="desktop-break" />
          that solve real problems, drive growth, and
          <br className="desktop-break" />
          build long-term value.
        </p>

        <div className="industry-actions">
          <a href="#industries" className="industry-btn-primary">
            Explore Industries
            <span className="industry-arrow">↗</span>
          </a>

          <button
            type="button"
            className="industry-btn-video"
            onClick={() => {
              document
                .getElementById("industry-video")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="industry-play">▶</span>
            <span>Watch Video</span>
          </button>
        </div>
      </div>
    </section>

    <section
      className="industries-section"
      ref={sectionRef}
      id="industries"
    >
      <div className="industries-inner">
        {/* Section introduction */}
        <div className="industries-intro">
          <div className="industries-eyebrow">
            <span className="industries-eyebrow-line" />
            INDUSTRIES WE SERVE
          </div>

          <h2 className="industries-title">
            Industries
            <br />
            we <span>empower.</span>
          </h2>

          <p className="industries-intro-text">
            From startups to established enterprises, we partner
            with businesses across diverse industries to create
            impactful digital experiences.
          </p>

          <a href="/contact" className="industries-cta">
            Let&apos;s build together
            <span>↗</span>
          </a>
        </div>

        {/* Interactive industry list */}
        <div className="industries-directory">
          <div className="industries-list">
            {industries.map((industry, index) => (
              <button
                type="button"
                key={industry.name}
                className={`industry-row ${
                  activeIndustry === index ? "is-active" : ""
                }`}
                style={{ "--row-index": index }}
                onMouseEnter={() => setActiveIndustry(index)}
                onFocus={() => setActiveIndustry(index)}
                onClick={() => setActiveIndustry(index)}
                aria-pressed={activeIndustry === index}
              >
                <span className="industry-number">
                  {industry.number}
                </span>

                <span className="industry-row-content">
                  <span className="industry-name">
                    {industry.name}
                  </span>

                  <span className="industry-description">
                    {industry.description}
                  </span>
                </span>

                <span className="industry-row-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>

          {/* Business types */}
          <aside className="business-types">
            <div className="business-types-heading">
              <span className="business-types-index">/ 02</span>
              <h3>
                Types of
                <br />
                <span>business.</span>
              </h3>
            </div>

            <p className="business-types-description">
              Different businesses.
              <br />
              One thoughtful digital approach.
            </p>

            <div className="business-types-list">
              {businessTypes.map((type, index) => (
                <a
                  href={`/contact?business=${encodeURIComponent(type)}`}
                  className="business-type-link"
                  key={type}
                  style={{ "--row-index": index }}
                >
                  <span className="business-type-dot" />
                  <span>{type}</span>
                  <span className="business-type-arrow">↗</span>
                </a>
              ))}
            </div>

            <div className="business-types-footer">
              <span>BUILT AROUND YOUR BUSINESS</span>
              <span className="business-footer-symbol">✳</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  );
};

export default Industry;
