import React from "react";
import "./Hero.css";
import leftImg from "../assets/leftimg.png";
import {
  Code2,
  ChartNoAxesColumnIncreasing,
  UsersRound,
  Funnel,
  Palette,
  Search,
  ArrowUpRight,
} from "lucide-react";

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
    items: ["Influencer Outreach", "Campaign Management", "Performance Tracking"],
  },
  {
    title: "Lead Generation",
    icon: Funnel,
    color: "orange",
    items: ["B2B Lead Generation", "Landing Pages", "CRM & Automation"],
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

            <section className="hero" id="home">
                {/* Background decoration */}
                <div className="hero-bg-glow"></div>
                <div className="hero-bg-ring"></div>

                <div className="hero-container">

                    {/* ================= LEFT CONTENT ================= */}
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
                            We design and build high-performance digital experiences that
                            help ambitious brands grow, connect with their audience, and
                            turn ideas into measurable business results.
                        </p>

                        {/* <p className="hero-subtext">
                        From premium websites and SaaS platforms to conversion-focused
                        landing pages and scalable web applications, we create digital
                        products built for the future.
                    </p> */}

                        {/* CTA */}
                        <div className="hero-actions">

                            <a href="#contact" className="hero-primary-btn">
                                <span>Start a Project</span>

                                <span className="btn-arrow">
                                    ↗
                                </span>
                            </a>

                            <a href="#work" className="hero-play-btn">
                                <span className="play-icon">
                                    ▶
                                </span>

                                <span>Watch Showreel</span>
                            </a>

                        </div>

                    </div>


                    {/* ================= RIGHT VISUAL ================= */}
                    <div className="hero-visual">

                        <div className="visual-glow"></div>

                        <img
                            src={leftImg}
                            alt="Digital innovation and creative technology"
                            className="hero-main-image"
                        />

                    </div>

                </div>


                {/* ================= STATS ================= */}
                <div className="hero-stats">

                    {/* ITEM 01 */}
                    <div className="stat-item">
                        <div className="stat-number">
                            01
                        </div>

                        <div className="stat-content">
                            <h3>Creative</h3>
                            <p>Images</p>
                        </div>
                    </div>


                    {/* ITEM 02 */}
                    <div className="stat-item">
                        <div className="stat-number">
                            02
                        </div>

                        <div className="stat-content">
                            <h3>Shooting</h3>
                            <p>Animation</p>
                        </div>
                    </div>


                    {/* ITEM 03 */}
                    <div className="stat-item">
                        <div className="stat-number">
                            03
                        </div>

                        <div className="stat-content">
                            <h3>Branding</h3>
                            <p>Videos</p>
                        </div>
                    </div>


                    {/* ITEM 04 */}
                    <div className="stat-item">
                        <div className="stat-number">
                            04
                        </div>

                        <div className="stat-content">
                            <h3>Creative</h3>
                            <p>Designing</p>
                        </div>
                    </div>


                    {/* ITEM 05 */}
                    <div className="stat-item">
                        <div className="stat-number">
                            05
                        </div>

                        <div className="stat-content">
                            <h3>Shooting</h3>
                            <p>Marketing</p>
                        </div>
                    </div>

                </div>

            </section>

            {/*------------------------------------------ Second page----------------------------------*/}

            <section className="services-section" id="services">
                <div className="services-container">
                    <div className="services-heading">
                        <div>
                            <span className="section-eyebrow">
                                <span className="eyebrow-line" />
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
                            solutions that help your business grow,
                            connect and stay ahead.
                        </p>

                        <a href="/services" className="all-services-link">
                            Explore all services <ArrowUpRight size={17} />
                        </a>
                    </div>

                    <div className="services-grid">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <article className="service-card" key={service.title}>
                                    <div className="service-card-top">
                                        <span className={`service-icon ${service.color}`}>
                                            <Icon size={23} strokeWidth={2} />
                                        </span>
                                        <span className="service-number">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h3>{service.title}</h3>

                                    <ul>
                                        {service.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>

                                    <a
                                        href={`/services/${service.title
                                            .toLowerCase()
                                            .replaceAll("/", "-")
                                            .replaceAll(" ", "-")
                                            .replaceAll("&", "and")}`}
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