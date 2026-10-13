
import React from "react";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";
import shenronLogo from "../assets/kravsLogo.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* CTA Banner */}
        <section className="footer-cta">
          <div className="footer-cta-heading">

            <h2>
              Let’s build something
              <br />
              great together.
            </h2>
          </div>

          <p className="footer-cta-description">
            Share your idea and we'll handle the rest. From strategy
            <br className="desktop-break" />
            to execution, we're here to bring your vision to life.
          </p>

          <a href="/contact" className="footer-cta-button">
            Start a project
          </a>
        </section>

        {/* Footer Main Content */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              {/* Replace with your logo image */}
              <img
                src={shenronLogo}
                alt="Your company logo"
              />
            </a>

            <p>
              Digital solutions for ambitious brands.
              <br />
              Ideas. Design. Technology. Impact.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/work">Work</a></li>
              <li><a href="/insights">Insights</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li><a href="/services/web-development">Web Development</a></li>
              <li><a href="/services/paid-advertising">Paid Advertising</a></li>
              <li><a href="/services/influencer-marketing">Influencer Marketing</a></li>
              <li><a href="/services/lead-generation">Lead Generation</a></li>
              <li><a href="/services/branding">UI/UX & Branding</a></li>
              <li><a href="/services/seo">SEO</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column footer-contact">
            <h3>Contact</h3>

            <a
              href="mailto:hello@yourdomain.com"
              className="footer-email"
            >
              <FaEnvelope />
              <span>hello@yourdomain.com</span>
            </a>

            <div className="footer-socials">
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

              <a href="https://instagram.com" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="https://x.com" aria-label="X">
                <FaXTwitter />
              </a>

              <a href="/" aria-label="Website">
                <FaGlobe />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>

          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
