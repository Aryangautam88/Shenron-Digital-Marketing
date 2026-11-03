
import React, { useState } from "react";
import "./Testimonials.css";

/* =========================================
   FIRST SECTION — HERO TESTIMONIAL CARDS
========================================= */

const impactStats = [
    {
        value: "98%",
        label: "Client Retention",
        icon: "retention",
    },
    {
        value: "2.5x",
        label: "Average Growth",
        icon: "growth",
    },
    {
        value: "4.9/5",
        label: "Client Rating",
        icon: "rating",
    },
];

const heroClientReviews = [
    {
        name: "Sarah Mitchell",
        role: "Marketing Director",
        image: "/images/client-sarah.webp",
        text: "Kravs transformed our vision into a powerful digital platform. Highly recommended!",
        stars: 5,
        position: "testimonial-card--top",
    },
    {
        name: "Michael Carter",
        role: "Business Owner",
        image: "/images/client-michael.webp",
        text: "Professional team, on-time delivery, and exceptional support throughout the project.",
        stars: 5,
        position: "testimonial-card--middle",
    },
    {
        name: "David Wilson",
        role: "Founder, Growth Co.",
        image: "/images/client-david.webp",
        text: "Great experience working with Kravs. Our business grew significantly.",
        stars: 5,
        position: "testimonial-card--bottom",
    },
];

/* =========================================
   SECOND SECTION — CLIENT REVIEW CARDS
========================================= */

const clientReviewsData = [
    {
        name: "Priya Sharma",
        role: "Marketing Head, NovaTech",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        review:
            "KRAVS delivered exactly what we needed. Their team understood our goals and created a solution that truly made a difference.",
    },
    {
        name: "Amit Verma",
        role: "CEO, FinEdge",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        review:
            "Excellent communication, professional approach, and outstanding delivery. Highly recommended!",
    },
    {
        name: "Neha Kapoor",
        role: "Founder, EduLearn",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        review:
            "The team is creative, skilled and very supportive. Our platform sees better engagement and user growth now.",
    },
    {
        name: "Karan Malhotra",
        role: "Director, HealthPlus",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        review:
            "They understood our industry well and delivered a solution that fits our exact needs. Great experience!",
    },
    {
        name: "Sneha Jain",
        role: "Product Lead, RetailPro",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        review:
            "From design to deployment, everything was smooth and transparent. Looking forward to long-term collaboration.",
    },
    {
        name: "Aditya Singh",
        role: "Co-Founder, RealSpace",
        image: "https://randomuser.me/api/portraits/men/46.jpg",
        review:
            "KRAVS has been a reliable technology partner. Their work quality and support are exceptional.",
    },
];

/* =========================================
   THIRD SECTION — TRUSTED BRANDS
========================================= */

const trustedBrandList = [
    { name: "stripe", className: "brand-stripe" },
    { name: "♙ shopify", className: "brand-shopify" },
    { name: "Google", className: "brand-google" },
    { name: "▦ Microsoft", className: "brand-microsoft" },
    { name: "☷ slack", className: "brand-slack" },
    { name: "zoom", className: "brand-zoom" },
];

/* =========================================
   THIRD SECTION — FEATURED CLIENT STORIES
========================================= */

const clientStoriesData = [
    {
        name: "Rohit Mehta",
        role: "Founder, GrowthKart",
        title: "A Partnership",
        highlight: "That Drives Growth",
        review:
            "Hear from our client about how KRAVS helped them streamline their operations, improve customer experience and achieve remarkable business growth.",
        image: "/images/testimonial-client.jpg",
        avatar: "/images/client-avatar.jpg",
        video: "",
    },
    {
        name: "Ananya Sharma",
        role: "Marketing Director",
        title: "Ideas Into",
        highlight: "Real Results",
        review:
            "The team understood our vision and transformed it into a thoughtful digital experience. Their attention to detail and communication made the entire process smooth.",
        image: "/images/testimonial-client-2.jpg",
        avatar: "/images/client-avatar-2.jpg",
        video: "",
    },
];

/* =========================================
   REUSABLE CLIENT REVIEW CARD
========================================= */

function ClientReviewCard({ review }) {
    return (
        <article className="testimonial-card-S">
            <div className="testimonial-client-S">
                <img
                    className="testimonial-avatar-S"
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                />

                <div className="testimonial-client-info-S">
                    <h3>{review.name}</h3>
                    <p>{review.role}</p>
                </div>
            </div>

            <div
                className="testimonial-stars-S"
                aria-label="5 out of 5 stars"
            >
                ★★★★★
            </div>

            <p className="testimonial-review-S">
                “{review.review}”
            </p>

            <div
                className="testimonial-quote-S"
                aria-hidden="true"
            >
                ”
            </div>
        </article>
    );
}

/* =========================================
   MAIN TESTIMONIALS PAGE
========================================= */

function Testimonials() {
    /* Featured client story state */
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const activeClientStory = clientStoriesData[activeStoryIndex];

    /* Navigate between featured client stories */
    const handleStoryNavigation = (direction) => {
        setActiveStoryIndex(
            (previousIndex) =>
                (previousIndex + direction + clientStoriesData.length) %
                clientStoriesData.length
        );

        setIsVideoOpen(false);
    };

    /* Close video modal */
    const closeVideoModal = () => {
        setIsVideoOpen(false);
    };


    function ImpactIcon({ type }) {
        if (type === "retention") {
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3 19v-1.5A4.5 4.5 0 0 1 7.5 13h3" />
                    <path d="M14 7h7v7" />
                    <path d="m21 7-8 8" />
                    <path d="M15 19h6" />
                </svg>
            );
        }

        if (type === "growth") {
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="6" height="6" rx="1" />
                    <rect x="14" y="4" width="6" height="6" rx="1" />
                    <rect x="4" y="14" width="6" height="6" rx="1" />
                    <path d="M14 17h6" />
                    <path d="M17 14v6" />
                </svg>
            );
        }

        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>
        );
    }



    return (
        <>
            {/* =====================================
                FIRST SECTION — TESTIMONIAL HERO
            ====================================== */}

            <section className="testimonials-hero">
                <div
                    className="testimonials-bg"
                    aria-hidden="true"
                />

                <div className="testimonials-content">
                    <div className="testimonials-copy">
                        <div className="eyebrow">
                            <span />
                            TESTIMONIALS
                            <span />
                        </div>

                        <h1>
                            Real Stories.
                            <br />
                            <em>Real Impact.</em>
                        </h1>

                        <p>
                            See what our clients say about working with KRAVS.
                            From startups to enterprises, we build digital
                            solutions that create measurable results and
                            long-term growth.
                        </p>

                        <div className="testimonials-actions">
                            <a
                                href="/contact"
                                className="testimonial-btn testimonial-btn--dark"
                            >
                                Get a Free Consultation <span>↗</span>
                            </a>

                            <a
                                href="/work"
                                className="testimonial-btn testimonial-btn--light"
                            >
                                View Our Work <span>↗</span>
                            </a>
                        </div>
                    </div>

                    {/* Floating review cards */}
                    <div className="testimonials-visual">
                        <div
                            className="testimonial-orbit"
                            aria-hidden="true"
                        />

                        <span
                            className="orbit-dot orbit-dot--one"
                            aria-hidden="true"
                        />

                        <span
                            className="orbit-dot orbit-dot--two"
                            aria-hidden="true"
                        />

                        <span
                            className="orbit-dot orbit-dot--three"
                            aria-hidden="true"
                        />

                        {heroClientReviews.map((item) => (
                            <article
                                className={`testimonial-card ${item.position}`}
                                key={item.name}
                            >
                                <div className="testimonial-card-header">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                    />

                                    <div className="testimonial-client">
                                        <strong>{item.name}</strong>
                                        <small>{item.role}</small>

                                        <div
                                            className="testimonial-stars"
                                            aria-label={`${item.stars} out of 5 stars`}
                                        >
                                            {"★".repeat(item.stars)}
                                        </div>
                                    </div>

                                    <span
                                        className="testimonial-quote-mark"
                                        aria-hidden="true"
                                    >
                                        ”
                                    </span>
                                </div>

                                <p className="testimonial-card-text">
                                    {item.text}
                                </p>

                                <span
                                    className="testimonial-card-quote"
                                    aria-hidden="true"
                                >
                                    “
                                </span>
                            </article>
                        ))}
                    </div>
                </div>

                <div
                    className="testimonials-bottom-wave"
                    aria-hidden="true"
                />
            </section>

            {/* =====================================
                SECOND SECTION — CLIENTS SPEAK
            ====================================== */}

            <section className="testimonials-section-S">
                <div className="testimonials-container-S">
                    <header className="testimonials-header-S">
                        <div className="testimonials-heading-S">
                            <div className="testimonials-eyebrow-S">
                                <span />
                                CLIENTS SPEAK
                                <span />
                            </div>

                            <h2>What Our Clients Say</h2>
                        </div>

                        <p className="testimonials-intro-S">
                            From idea to execution, our clients trust us for
                            our commitment, creativity and consistent results.
                            Here’s what they have to say about their experience.
                        </p>
                    </header>

                    <div className="testimonials-grid-S">
                        {clientReviewsData.map((review) => (
                            <ClientReviewCard
                                key={review.name}
                                review={review}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================
                THIRD SECTION — TRUSTED BRANDS
                AND FEATURED TESTIMONIAL
            ====================================== */}


            {/* =====================================
    TRUSTED BY BUSINESSES — SEPARATE SECTION
====================================== */}

            <section className="brands-testimonials">
                <div className="bt-container">
                    {/* Trusted brands header */}
                    <div className="bt-brands-header">
                        <div className="bt-brands-left">
                            <span className="bt-eyebrow">
                                <span className="bt-eyebrow-line" />
                                TRUSTED BY BUSINESSES
                                <span className="bt-eyebrow-line" />
                            </span>

                            <h2>Brands That Trust Our Work</h2>
                        </div>

                        <p className="bt-brands-description">
                            We've had the privilege of working with innovative
                            companies across various industries, helping them
                            scale with technology and digital solutions.
                        </p>
                    </div>

                    {/* Brand logos — seamless infinite marquee */}
                    <div
                        className="bt-brand-marquee"
                        aria-label="Brands that trust our work"
                    >
                        <div className="bt-brand-track">
                            {[...trustedBrandList, ...trustedBrandList].map(
                                (brand, index) => (
                                    <div
                                        className={`bt-brand-logo ${brand.className}`}
                                        key={`${brand.name}-${index}`}
                                        aria-hidden={
                                            index >= trustedBrandList.length
                                                ? "true"
                                                : undefined
                                        }
                                    >
                                        {brand.name}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
    FEATURED CLIENT STORY — SEPARATE SECTION
====================================== */}

            <section className="bt-featured-section">
                <div className="bt-container">
                    <div className="bt-testimonial-layout">
                        {/* Client image */}
                        <div className="bt-video-card">
                            <img
                                src={activeClientStory.image}
                                alt={`${activeClientStory.name} client story`}
                                className="bt-video-image"
                                loading="lazy"
                            />

                            <div className="bt-image-overlay" />

                            {activeClientStory.video && (
                                <button
                                    type="button"
                                    className="bt-play-button"
                                    aria-label="Play client testimonial"
                                    onClick={() => setIsVideoOpen(true)}
                                >
                                    <span className="bt-play-icon" />
                                </button>
                            )}

                            {!activeClientStory.video && (
                                <div
                                    className="bt-play-button bt-play-button--static"
                                    aria-hidden="true"
                                >
                                    <span className="bt-play-icon" />
                                </div>
                            )}

                            <div className="bt-video-label">
                                <span className="bt-headphone-icon">♧</span>
                                <span>Client Success Story</span>
                            </div>
                        </div>

                        {/* Featured story content */}
                        <div className="bt-testimonial-content">
                            <span className="bt-eyebrow bt-featured-label">
                                <span className="bt-eyebrow-line" />
                                FEATURED TESTIMONIAL
                                <span className="bt-eyebrow-line" />
                            </span>

                            <h2>
                                {activeClientStory.title}
                                <br />
                                <em>{activeClientStory.highlight}</em>
                            </h2>

                            <p className="bt-review">
                                {activeClientStory.review}
                            </p>

                            <div className="bt-testimonial-footer">
                                <div className="bt-client-info">
                                    <img
                                        src={activeClientStory.avatar}
                                        alt={activeClientStory.name}
                                        className="bt-client-avatar"
                                        loading="lazy"
                                    />

                                    <div>
                                        <h3>{activeClientStory.name}</h3>
                                        <p>{activeClientStory.role}</p>
                                    </div>
                                </div>

                                <div className="bt-slider-controls">
                                    <button
                                        type="button"
                                        onClick={() => handleStoryNavigation(-1)}
                                        aria-label="Previous client story"
                                        className="bt-arrow bt-arrow-prev"
                                    >
                                        ‹
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleStoryNavigation(1)}
                                        aria-label="Next client story"
                                        className="bt-arrow bt-arrow-next"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured testimonial video modal */}
                {isVideoOpen && activeClientStory.video && (
                    <div
                        className="bt-video-modal"
                        onClick={closeVideoModal}
                    >
                        <div
                            className="bt-video-modal-content"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="bt-modal-close"
                                aria-label="Close video"
                                onClick={closeVideoModal}
                            >
                                ×
                            </button>

                            <iframe
                                src={activeClientStory.video}
                                title={`${activeClientStory.name} testimonial video`}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </section>


            {/* -----------------------------------------------------------Fourth Page-------------------------------------------  */}

            <section
                className="impact-banner"
                aria-label="Our client impact"
            >
                <div
                    className="impact-banner__photo"
                    aria-hidden="true"
                />

                <div className="impact-banner__content">
                    <div className="impact-banner__intro">
                        <span className="impact-banner__eyebrow">
                            OUR IMPACT
                        </span>

                        <h2>
                            Results that
                            <br />
                            move business forward.
                        </h2>

                        <p>
                            Built on trust, thoughtful strategy, and measurable growth.
                        </p>
                    </div>

                    <div
                        className="impact-stats"
                        aria-label="Client success statistics"
                    >
                        {impactStats.map((stat) => (
                            <div className="impact-stat" key={stat.label}>
                                <span className="impact-stat__icon">
                                    <ImpactIcon type={stat.icon} />
                                </span>

                                <div className="impact-stat__copy">
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
}

export default Testimonials;
