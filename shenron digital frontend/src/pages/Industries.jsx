
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Gamepad2,
  House,
  Landmark,
  Laptop,
  ShoppingCart,
  Stethoscope,
  UsersRound,
  Target,
  ChartNoAxesCombined,
  Clock3,
  TrendingUp,
  Wallet,
  Timer,
  Layers3,
  Sparkles,
  Dices,
  BarChart3,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { industries } from "../data/industries";
import "./Industries.css";

/* =========================================
   INDUSTRY CARD DATA
   Forex and Crypto intentionally excluded
========================================= */

const industryDetails = {
  finance: {
    description:
      "Build trust and reach the customers who need your financial services.",
    Icon: Landmark,
  },
  saas: {
    description:
      "Turn a great product into steady sign-ups, adoption, and long-term growth.",
    Icon: Cloud,
  },
  ecommerce: {
    description:
      "Bring more shoppers to your store and make every visit count.",
    Icon: ShoppingCart,
  },
  "real-estate": {
    description:
      "Reach the right buyers and renters with a stronger digital presence.",
    Icon: House,
  },
  healthcare: {
    description:
      "Help patients find the right care with clear, trusted digital experiences.",
    Icon: Stethoscope,
  },
  "it-software": {
    description:
      "Turn your technical strengths into business growth and lasting partnerships.",
    Icon: Laptop,
  },
  gaming: {
    description:
      "Grow your community and keep players engaged across every channel.",
    Icon: Gamepad2,
  },
  igaming: {
    description:
      "Reach the right audience with responsible, data-led digital campaigns.",
    Icon: Dices,
  },
};

/* =========================================
   STATS DATA
========================================= */

const stats = [
  {
    id: 1,
    value: 24,
    label: "Hours Turnaround",
    description:
      "Launch projects in less than a day. Perfect for tight deadlines and urgent tasks.",
    icon: Clock3,
    color: "blue",
    size: "small",
  },
  {
    id: 2,
    value: 50,
    suffix: "%+",
    label: "Output Growth",
    description:
      "Get ready for a major marketing scale-up. Outpace your average agency's output.",
    icon: TrendingUp,
    color: "purple",
    size: "small",
  },
  {
    id: 3,
    value: 100,
    prefix: "$",
    suffix: "k",
    label: "Saving",
    description: "Average saving on annual agency fees.",
    icon: Wallet,
    color: "peach",
    size: "wide",
  },
  {
    id: 4,
    value: 10,
    label: "Extra Hours/Week",
    description:
      "Reclaim your schedule with simplified management. Take your time back to lead.",
    icon: Timer,
    color: "blue",
    size: "wide",
  },
  {
    id: 5,
    value: 30,
    suffix: "+",
    label: "Services On Tap",
    description:
      "Every design and marketing service you can imagine. Available to you on-demand.",
    icon: Layers3,
    color: "purple",
    size: "small",
  },
  {
    id: 6,
    value: 1,
    suffix: "%",
    label: "Top 1% Global Experts",
    description:
      "Build a ready-to-go vetted team. Watch your ROI shoot sky-high.",
    icon: Sparkles,
    color: "peach",
    size: "small",
  },
];

/* =========================================
   SAAS FEATURES
========================================= */

const features = [
  {
    icon: UsersRound,
    title: "User Acquisition",
    subtitle: "& Growth",
  },
  {
    icon: Target,
    title: "Product Marketing",
    subtitle: "& Positioning",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analytics &",
    subtitle: "Conversion Optimisation",
  },
];

const focusAreas = [
  {
    icon: UsersRound,
    title: "Audience & Market",
    description:
      "Understand customer needs and buying behaviour.",
  },
  {
    icon: Megaphone,
    title: "Digital Strategy",
    description:
      "Choose the right channels and technology.",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description:
      "Identify practical ways to reach and convert customers.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Performance Tracking",
    description:
      "Measure results and refine the approach.",
  },
];

const insightFeatures = [
  {
    icon: Target,
    title: "Tailored",
    subtitle: "Strategies",
  },
  {
    icon: Layers3,
    title: "Industry-Specific",
    subtitle: "Solutions",
  },
  {
    icon: BarChart3,
    title: "Measurable",
    subtitle: "Growth",
  },
];

/* =========================================
   ANIMATED COUNTER
   Smooth 0-to-value animation
========================================= */

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  started,
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) {
      setCount(0);
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCount(value);
      return undefined;
    }

    let frameId;
    let startTime = null;
    let cancelled = false;

    const duration = 1800;

    const animate = (timestamp) => {
      if (cancelled) return;

      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Ease-out cubic for smooth deceleration.
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(easedProgress * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [started, value]);

  return (
    <span className="industry-stat-number">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* =========================================
   MAIN INDUSTRIES PAGE
========================================= */

export default function Industries() {
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  /* Start counters when stats section becomes visible. */
  useEffect(() => {
    const section = statsRef.current;

    if (!section || statsStarted) return undefined;

    if (!("IntersectionObserver" in window)) {
      setStatsStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [statsStarted]);

  /* Remove Forex and Crypto from the industry cards. */
  const visibleIndustries = industries.filter(
    (industry) =>
      !["forex", "crypto"].includes(
        industry.slug?.toLowerCase()
      )
  );

  return (
    <main className="industries-page">
      {/* =====================================
          SECTION 1 — INDUSTRIES HERO
      ===================================== */}

      <section
        className="industries-hero"
        aria-labelledby="industries-title"
      >
        <div className="industries-hero-inner">
          <div className="industries-content">
            <div className="industries-eyebrow">
              <span
                className="industries-eyebrow-line"
                aria-hidden="true"
              />
              <span>Industries</span>
            </div>

            <h1
              className="industries-title"
              id="industries-title"
            >
              <span>Digital solutions</span>
              <em>for every industry.</em>
            </h1>

            <p className="industries-description">
              We help businesses across industries with tailored
              digital marketing strategies and robust IT solutions
              to grow, compete, and stay ahead in the digital world.
            </p>

            <div className="industries-actions">
              <a
                className="industries-button industries-button-primary"
                href="#industry-categories"
              >
                <span>Explore Industries</span>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>

              <Link
                className="industries-button industries-button-secondary"
                to="/company/contact"
              >
                <span>Let's Discuss</span>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          SECTION 2 — INDUSTRY CARDS
      ===================================== */}

      <div className="industries-content-wrap">
        <section
          className="industries-section industries-served"
          id="industry-categories"
          aria-labelledby="industry-categories-title"
        >
          <div className="industries-section-heading">
            <div className="industries-section-copy">
              <div className="industries-eyebrow industries-section-eyebrow">
                <span
                  className="industries-eyebrow-line"
                  aria-hidden="true"
                />
                <span>Our Industries</span>
              </div>

              <h2
                className="industries-section-title"
                id="industry-categories-title"
              >
                Any Industry. Any Goal.
                <em>We create digital opportunities.</em>
              </h2>
            </div>

            <div className="industries-section-side">
              <p className="industries-section-description">
                From finance and technology to healthcare and
                gaming, we shape digital strategies around the
                people and goals that make each industry unique.
              </p>

              <a
                className="industries-outline-link"
                href="#industry-cards"
              >
                View All Industries
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div
            className="industries-card-grid"
            id="industry-cards"
          >
            {visibleIndustries.map((industry, index) => {
              const details = industryDetails[industry.slug];

              // Only render industries with configured details.
              if (!details) return null;

              const { description, Icon } = details;

              return (
                <Link
                  className="industry-card"
                  key={industry.slug}
                  to={`/industries/${industry.slug}`}
                  aria-label={`Explore ${industry.name} industry solutions`}
                >
                  <div className="industry-card-topline">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="industry-card-top-arrow"
                      aria-hidden="true"
                    >
                      <ArrowUpRight size={15} />
                    </span>
                  </div>

                  <div
                    className="industry-card-art-space"
                    aria-hidden="true"
                  >
                    <span className="industry-card-icon">
                      <Icon size={38} strokeWidth={1.65} />
                    </span>
                  </div>

                  <div className="industry-card-copy">
                    <h3>{industry.name}</h3>
                    <p>{description}</p>
                  </div>

                  <span
                    className="industry-card-arrow"
                    aria-hidden="true"
                  >
                    <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* =====================================
          SECTION 3 — SAAS FEATURED INDUSTRY
      ===================================== */}

      <section
        className="saas-hero"
        aria-labelledby="saas-hero-heading"
      >
        <div className="saas-hero-container">
          <div className="saas-hero-content">
            <div className="saas-hero-eyebrow">
              <span
                className="saas-eyebrow-line"
                aria-hidden="true"
              />
              <span>Featured Industry</span>
            </div>

            <h2
              className="saas-hero-title"
              id="saas-hero-heading"
            >
              SaaS &amp; Technology
              <br />
              Solutions for a <em>Smarter</em>
              <br />
              <em>Tomorrow.</em>
            </h2>

            <p className="saas-hero-description">
              We help SaaS and technology companies build powerful
              digital products, acquire the right users, and scale
              with performance-driven marketing strategies.
            </p>

            <div className="saas-hero-features">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    className="saas-feature"
                    key={feature.title}
                  >
                    <span className="saas-feature-icon">
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="saas-feature-text">
                      <span>{feature.title}</span>
                      <span>{feature.subtitle}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="saas-hero-actions">
              <Link
                to="/company/contact"
                className="saas-hero-cta"
              >
                <span>Explore SaaS Solutions</span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Background image is controlled by SaasHero.css. */}
          <div
            className="saas-hero-visual"
            aria-hidden="true"
          >
            <div className="saas-hero-glow" />
            <div className="saas-hero-orbit saas-orbit-one" />
            <div className="saas-hero-orbit saas-orbit-two" />
          </div>
        </div>
      </section>

      {/* =====================================
          SECTION 4 — ANIMATED STATS
      ===================================== */}

      <section
        className="industry-stats-section"
        ref={statsRef}
        aria-labelledby="industry-stats-heading"
      >
        <div className="industry-stats-container">
          <div className="industry-stats-header">
            <div className="industry-stats-eyebrow">
              <span
                className="industry-stats-eyebrow-line"
                aria-hidden="true"
              />
              <span>Why Kravs Infotech</span>
            </div>

            <h2 id="industry-stats-heading">
              Meet the new generation
              <br />
              of <em>digital experiences.</em>
            </h2>

            <p>
              Less complexity. More momentum. Digital solutions
              built around the way modern businesses grow.
            </p>
          </div>

          <div className="industry-stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <article
                  className={`industry-stat-card industry-stat-${stat.size} industry-stat-${stat.color}`}
                  key={stat.id}
                  style={{ "--card-index": index }}
                >
                  <div className="industry-stat-top">
                    <span className="industry-stat-icon">
                      <Icon
                        size={21}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="industry-stat-index">
                      {String(stat.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="industry-stat-main">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                      started={statsStarted}
                    />

                    <h3>{stat.label}</h3>
                  </div>

                  <div className="industry-stat-bottom">
                    <p>{stat.description}</p>

                    <span
                      className="industry-stat-arrow"
                      aria-hidden="true"
                    >
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="industry-stats-footer">
            <span
              className="industry-stats-footer-dot"
              aria-hidden="true"
            />
            <p>
              Thoughtful strategy. Measurable impact. Built for growth.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================
          SECTION 5 — Industries stats
      ===================================== */}

      <section
        className="industry-insights"
        aria-labelledby="industry-insights-title"
      >
        <div className="industry-insights-container">
          {/* LEFT CONTENT */}
          <div className="industry-insights-content">
            <div className="industry-insights-eyebrow">
              <span
                className="industry-insights-eyebrow-line"
                aria-hidden="true"
              />
              <span>Industry Insights</span>
            </div>

            <h1
              className="industry-insights-title"
              id="industry-insights-title"
            >
              Industry Insights,
              <br />
              Built Around You.
              <em>Every sector has its own story.</em>
            </h1>

            <p className="industry-insights-description">
              At KRAVS, we adapt digital marketing, web &amp; software
              development, lead generation, and analytics and customer
              experience to match each industry&apos;s unique audience,
              challenges, and goals — so you get strategies that
              actually work.
            </p>

            {/* FEATURE CHIPS */}
            <div className="industry-insights-features">
              {insightFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    className="industry-insights-feature"
                    key={feature.title}
                  >
                    <span className="industry-insights-feature-icon">
                      <Icon size={17} strokeWidth={1.7} />
                    </span>

                    <span className="industry-insights-feature-text">
                      <span>{feature.title}</span>
                      <span>{feature.subtitle}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT INFORMATION CARD */}
          <aside
            className="industry-insights-panel"
            aria-labelledby="industry-insights-panel-title"
          >
            <div className="industry-insights-panel-heading">
              <h2 id="industry-insights-panel-title">
                What we focus on
              </h2>

              <span
                className="industry-insights-panel-mark"
                aria-hidden="true"
              >
                <ArrowUpRight size={15} />
              </span>
            </div>

            <div className="industry-insights-focus-list">
              {focusAreas.map((area, index) => {
                const Icon = area.icon;

                return (
                  <div
                    className="industry-insights-focus"
                    key={area.title}
                  >
                    <span className="industry-insights-focus-icon">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>

                    <div className="industry-insights-focus-copy">
                      <h3>{area.title}</h3>
                      <p>{area.description}</p>
                    </div>

                    <span className="industry-insights-focus-number">
                      0{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="industry-insights-panel-footer">
              <span className="industry-insights-status-dot" />
              <span>Strategy shaped around your goals</span>
            </div>
          </aside>
        </div>
      </section>

    </main>
  );
}
