
import React from "react";
import "./Service.css";
// import serviceRight from "../assets/Service-right-com.png";

// const serviceSteps = [
//   { number: "01", label: "Strategy" },
//   { number: "02", label: "Design" },
//   { number: "03", label: "Development" },
//   { number: "04", label: "Growth" },
// ];

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

            {/*--------------------------------------------- third Page---------------------------------- */}

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


            {/*-------------------------------------------- Fourth page---------------------------------  */}


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
