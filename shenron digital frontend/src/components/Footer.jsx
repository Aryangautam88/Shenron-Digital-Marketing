
import React from "react";
import { Link } from "react-router-dom";
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

          <Link to="/contact" className="footer-cta-button">
            Start a project
          </Link>
        </section>

        {/* Footer Main Content */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              {/* Replace with your logo image */}
              <img
                src={shenronLogo}
                alt="Your company logo"
              />
            </Link>

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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/insights">Insights</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/services/web-development">Web Development</Link></li>
              <li><Link to="/services/paid-advertising">Paid Advertising</Link></li>
              <li><Link to="/services/influencer-marketing">Influencer Marketing</Link></li>
              <li><Link to="/services/lead-generation">Lead Generation</Link></li>
              <li><Link to="/services/branding">UI/UX & Branding</Link></li>
              <li><Link to="/services/seo">SEO</Link></li>
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

              <Link to="/" aria-label="Website">
                <FaGlobe />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>

          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
