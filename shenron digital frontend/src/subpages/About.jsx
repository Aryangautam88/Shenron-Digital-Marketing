import React from "react";
import "./About.css";

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-container">

          {/* LEFT CONTENT */}
          <div className="about-content">

            <div className="about-eyebrow">
              <span className="about-eyebrow-line"></span>
              <span>WHO WE ARE</span>
            </div>

            <h1 className="about-heading">
              About
              <span>our firm.</span>
            </h1>

            <p className="about-description">
              At our firm, we pride ourselves on delivering
              tailored solutions that empower businesses to
              thrive. With years of experience across various
              industries, our dedicated team is committed to
              driving growth and operational excellence.
            </p>

          </div>

        </div>
      </section>
    </main>
  );
}
