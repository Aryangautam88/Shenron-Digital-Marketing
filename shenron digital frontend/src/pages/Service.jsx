
import React from "react";
import "./Service.css";
// import serviceRight from "../assets/Service-right-com.png";

// const serviceSteps = [
//   { number: "01", label: "Strategy" },
//   { number: "02", label: "Design" },
//   { number: "03", label: "Development" },
//   { number: "04", label: "Growth" },
// ];

const leftServices = [
    {
        title: "Marketing Strategy",
        description:
            "We create research-backed marketing strategies that connect your business objectives with audience needs and sustainable growth.",
        tags: [
            "Market Research & Positioning",
            "Channel Strategy & Budget Planning",
            "Go-to-Market Roadmaps",
        ],
    },
    {
        title: "Social Media Marketing (SMM)",
        description:
            "We turn social channels into growth engines with engaging content, active communities, and performance-led campaigns.",
        tags: [
            "Content Strategy & Planning",
            "Community Management",
            "Engagement & Performance Tracking",
        ],
    },
    {
        title: "Paid Advertising (PPC)",
        description:
            "We build and optimize paid campaigns with targeted audiences, creative experimentation, and measurable return on investment.",
        tags: [
            "Campaign Setup & Optimization",
            "Ad Creative & Audience Targeting",
            "Conversion Tracking",
        ],
    },
    {
        title: "SEO & ASO",
        description:
            "We strengthen your organic visibility through technical improvements, relevant keywords, and search-focused content strategies.",
        tags: [
            "Technical & On-page SEO",
            "Keyword Research & Content",
            "App Store Optimization",
        ],
    },
    {
        title: "Conversion Rate Optimization (CRO)",
        description:
            "We improve digital experiences using user behavior insights, UX experiments, and smarter conversion journeys.",
        tags: [
            "Funnel & UX Analysis",
            "A/B Testing & Experiments",
            "Conversion Optimization",
        ],
    },
    {
        title: "Email Marketing",
        description:
            "We create personalized email journeys that nurture prospects, strengthen customer relationships, and improve retention.",
        tags: [
            "Audience Segmentation & Automation",
            "Campaign Design & Delivery",
            "Performance Monitoring",
        ],
    },
];

const rightServices = [
    {
        title: "Influencer Marketing",
        description:
            "We pair your brand with relevant creators to build authentic partnerships that increase awareness, engagement, and trust.",
        tags: [
            "Creator Discovery & Selection",
            "Campaign Management",
            "ROI Measurement & Reporting",
        ],
    },
    {
        title: "PR & Media Relations",
        description:
            "We shape compelling brand stories, build meaningful media relationships, and strengthen your reputation across relevant channels.",
        tags: [
            "Brand Storytelling & Positioning",
            "Media Outreach & Relations",
            "Coverage Monitoring",
        ],
    },
    {
        title: "Content Marketing",
        description:
            "We develop valuable content that educates your audience, builds credibility, and supports your business goals across channels.",
        tags: [
            "Content Planning & Strategy",
            "SEO-focused Copywriting",
            "Multi-channel Distribution",
        ],
    },
    {
        title: "Data & Web Analytics",
        description:
            "We transform digital performance data into actionable insights through tracking systems, dashboards, and clear reporting.",
        tags: [
            "Analytics & Dashboard Setup",
            "Conversion Funnel Reporting",
            "Data-driven Recommendations",
        ],
    },
    {
        title: "Digital Design",
        description:
            "We design cohesive digital experiences and creative assets that communicate your message and make your brand stand out.",
        tags: [
            "Website & App Design",
            "Landing Pages & UI/UX",
            "Custom Visual Assets",
        ],
    },
    {
        title: "AI Marketing",
        description:
            "We bring AI-powered insights and automation into marketing workflows to improve efficiency, targeting, and campaign performance.",
        tags: [
            "Marketing Workflow Automation",
            "Audience Intelligence",
            "Predictive Campaign Planning",
        ],
    },
];

const services = [
    {
        number: "01",
        icon: "code",
        title: "Website Development",
        description:
            "Custom, high-performance websites tailored to your business goals.",
    },
    {
        number: "02",
        icon: "target",
        title: "Landing Page Design",
        description:
            "Conversion-focused landing pages designed to generate leads and drive sales.",
    },
    {
        number: "03",
        icon: "refresh",
        title: "Website Redesign",
        description:
            "Modern, user-friendly redesigns that give your brand a fresh new look.",
    },
    {
        number: "04",
        icon: "cube",
        title: "SaaS Development",
        description:
            "Scalable and secure web applications built around your business needs.",
    },
    {
        number: "05",
        icon: "chart",
        title: "SEO & Growth",
        description:
            "Improve search visibility, attract organic traffic, and grow your business.",
    },
    {
        number: "06",
        icon: "megaphone",
        title: "Digital Marketing",
        description:
            "Data-driven marketing strategies to generate qualified leads and build your brand.",
    },
];

function ServiceIcon({ type }) {
    const common = {
        width: 25,
        height: 25,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
    };

    const paths = {
        code: (
            <>
                <path d="m8 8-4 4 4 4" />
                <path d="m16 8 4 4-4 4" />
                <path d="m14 5-4 14" />
            </>
        ),
        target: (
            <>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" />
                <path d="m13 11 6-6" />
                <path d="M16 5h3v3" />
            </>
        ),
        refresh: (
            <>
                <path d="M20 7v5h-5" />
                <path d="M4 17v-5h5" />
                <path d="M5.6 9A7 7 0 0 1 18 6l2 6" />
                <path d="M18.4 15A7 7 0 0 1 6 18l-2-6" />
            </>
        ),
        cube: (
            <>
                <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                <path d="m3 8 9 5 9-5" />
                <path d="M3 8v9l9 5 9-5V8" />
                <path d="M12 13v9" />
            </>
        ),
        chart: (
            <>
                <path d="M4 20V11h4v9" />
                <path d="M10 20V5h4v15" />
                <path d="M16 20V9h4v11" />
            </>
        ),
        megaphone: (
            <>
                <path d="m3 11 18-7v14L3 13v-2Z" />
                <path d="m7 14 2 6h4l-3-8" />
                <path d="M21 9v6" />
            </>
        ),
    };

    return <svg {...common}>{paths[type]}</svg>;
}

function ServiceCard({ service }) {
    return (
        <article className="sov-card">
            <h3>{service.title}</h3>

            <p className="sov-card-description">
                {service.description}
            </p>

            <div className="sov-tags">
                {service.tags.map((tag) => (
                    <span className="sov-tag" key={tag}>
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    );
}

export default function Service() {
    return (
        <>
            <main className="service-page">
                <section className="service-hero">
                    <div className="service-container">

                        {/* LEFT CONTENT */}
                        <div className="service-content">
                            <div className="service-eyebrow">
                                <span className="service-eyebrow-line" />
                                <span>OUR SERVICES</span>
                            </div>

                            <h1 className="service-heading">
                                Digital services.
                                <span>Real-world Service.</span>
                            </h1>

                            <p className="service-description">
                                We design and build digital solutions that help ambitious
                                businesses stand out, attract customers, and achieve
                                measurable growth.
                            </p>

                            <div className="service-actions">
                                <a
                                    href="/services"
                                    className="service-btn service-btn-dark"
                                >
                                    <span>Explore Services</span>
                                    <span className="service-btn-arrow">↗</span>
                                </a>

                                <a
                                    href="/contact"
                                    className="service-btn service-btn-light"
                                >
                                    <span>Start a Project</span>
                                    <span className="service-btn-arrow">↗</span>
                                </a>
                            </div>
                        </div>

                        {/* RIGHT PROCESS LABELS */}
                        {/* <div className="service-visual">
            <div className="service-process">
              {serviceSteps.map((step) => (
                <div
                  className="service-process-item"
                  key={step.number}
                >
                  <span className="service-process-label">
                    {step.label}
                  </span>

                  <span className="service-process-dot" />
                </div>
              ))}
            </div>
          </div> */}

                    </div>
                </section>
            </main>

            {/*------------------------------------------------- Second Page ----------------------------*/}

            <main className="kr-services" id="services">
                <div className="kr-services__glow kr-services__glow--top" />
                <div className="kr-services__glow kr-services__glow--left" />

                <div className="kr-services__container">
                    <header className="kr-services__header">
                        <div className="kr-services__intro">
                            <div className="kr-services__eyebrow">
                                <span />
                                <p>WHAT WE OFFER</p>
                            </div>

                            <h1>
                                Services built
                                <br />
                                for what’s <em>next.</em>
                            </h1>
                        </div>

                        <p className="kr-services__subtitle">
                            From websites to growth solutions, our services are
                            designed to help you build, scale, and stay ahead
                            in the digital world.
                        </p>
                    </header>

                    <div className="kr-services__grid">
                        {services.map((service) => (
                            <a
                                className="kr-service-card"
                                href="/contact"
                                key={service.number}
                                aria-label={`Explore ${service.title}`}
                            >
                                <div className="kr-service-card__top">
                                    <div className="kr-service-card__icon">
                                        <ServiceIcon type={service.icon} />
                                    </div>

                                    <span className="kr-service-card__number">
                                        {service.number}
                                    </span>
                                </div>

                                <div className="kr-service-card__content">
                                    <h2>{service.title}</h2>
                                    <p>{service.description}</p>
                                </div>

                                <span className="kr-service-card__arrow">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="19"
                                        height="19"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M7 17 17 7" />
                                        <path d="M8 7h9v9" />
                                    </svg>
                                </span>
                            </a>
                        ))}
                    </div>

                    <div className="kr-services__footer">
                        <span className="kr-services__footer-dot" />
                        <p>Thoughtfully built. Strategically designed. Made to grow.</p>
                    </div>
                </div>
            </main>

            {/*-------------------------------------------- Third page----------------------------------- */}

            <main className="sov-section" id="services-overview">
                <div className="sov-container">
                    <header className="sov-header">
                        <span className="sov-eyebrow">
                            OUR SERVICES
                        </span>

                        <h1>
                            Full-service digital
                            
                            marketing solutions
                        </h1>

                        <p>
                            Everything your brand needs, all in one place.
                        </p>
                    </header>

                    <div className="sov-grid">
                        <div className="sov-column">
                            {leftServices.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    service={service}
                                />
                            ))}
                        </div>

                        <div className="sov-column">
                            {rightServices.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    service={service}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="sov-bottom-cta">
                        <a href="/contact" className="sov-cta-button">
                            Book an Intro Call
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </main>

            {/*--------------------------------------------- fourth Page---------------------------------- */}

            <section className="service-approach" id="our-approach">
                <div className="sa-container">

                    {/* LEFT CONTENT */}
                    <div className="sa-content">
                        <div className="sa-eyebrow">
                            <span className="sa-eyebrow-line" />
                            <span>OUR APPROACH</span>
                        </div>

                        <h1 className="sa-title">
                            Strategy. Design.
                            <br />
                            Development. <em>Growth.</em>
                        </h1>

                        <p className="sa-description">
                            We combine strategy, creativity, and technology
                            to build digital experiences that create real
                            business impact.
                        </p>

                        <a href="/about" className="sa-button">
                            <span>Learn About</span>
                            <span className="sa-button-icon" aria-hidden="true">
                                ↗
                            </span>
                        </a>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="sa-visual">
                        <div className="sa-image-glow" />

                        {/* <img
                            src={serviceRight}
                            alt="Our approach to strategic planning, creative design, clean development and measurable growth"
                            className="sa-illustration"
                            fetchPriority="high"
                        /> */}
                    </div>

                </div>

                <div className="sa-bottom-line" />
            </section>


            {/*-------------------------------------------- Fifth page---------------------------------  */}


            <section className="service-last-section">
                <div className="service-last-card">

                    <div className="service-last-content">
                        <div className="service-last-eyebrow">
                            <span className="service-last-line" />
                            <span>LET'S BUILD TOGETHER</span>
                        </div>

                        <h2 className="service-last-title">
                            Your next chapter
                            <br />
                            <em>starts here.</em>
                        </h2>

                        <p className="service-last-description">
                            Have an idea? Let's turn it into a digital experience
                            <br className="service-last-desktop-break" />
                            that moves your business forward.
                        </p>
                    </div>

                    <a href="/contact" className="service-last-button">
                        <span>Start a Project</span>

                        <span className="service-last-arrow">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </span>
                    </a>

                </div>
            </section>


        </>
    );
}
