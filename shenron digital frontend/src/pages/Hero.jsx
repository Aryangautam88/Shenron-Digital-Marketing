import React from "react";
import "./Hero.css";
import leftImg from "../assets/leftimg.png";

const Hero = () => {
    return (
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

                    <p className="hero-subtext">
                        From premium websites and SaaS platforms to conversion-focused
                        landing pages and scalable web applications, we create digital
                        products built for the future.
                    </p>

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
    );
};

export default Hero;