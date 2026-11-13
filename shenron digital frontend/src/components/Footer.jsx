
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

function httpsUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : null; }
  catch { return null; }
}
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || "info@kravsinfotech.com";
const socials = [
  ["LinkedIn", httpsUrl(import.meta.env.VITE_LINKEDIN_URL) || "https://www.linkedin.com/company/kravs-infotech/posts/?viewAsMember=true", FaLinkedinIn],
  ["Instagram", httpsUrl(import.meta.env.VITE_INSTAGRAM_URL) || "https://www.instagram.com/kravsinfotech/?hl=en", FaInstagram],
  ["X", httpsUrl(import.meta.env.VITE_X_URL) || "https://x.com", FaXTwitter],
];
const legalLinks = [
  ["Privacy Policy", httpsUrl(import.meta.env.VITE_PRIVACY_POLICY_URL) || "/privacy-policy"],
  ["Terms of Service", httpsUrl(import.meta.env.VITE_TERMS_OF_SERVICE_URL) || "/terms-of-service"],
];

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
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/blog">Insights</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/services/web-development">Web Development</Link></li>
              <li><Link to="/services/paid-advertising">Paid Advertising</Link></li>
              <li><Link to="/services/influencer-marketing">Influencer Marketing</Link></li>
              <li><Link to="/services/web-development/landing-pages">Lead Generation</Link></li>
              <li><Link to="/services/digital-design">UI/UX & Branding</Link></li>
              <li><Link to="/services/seo">SEO</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column footer-contact">
            <h3>Contact</h3>

            {contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail) ? (
              <a href={`mailto:${contactEmail}`} className="footer-email"><FaEnvelope /><span>{contactEmail}</span></a>
            ) : (
              <Link to="/contact" className="footer-email"><FaEnvelope /><span>Contact our team</span></Link>
            )}

            <div className="footer-socials">
              {socials.map(([label, url, Icon]) => <a key={label} href={url} aria-label={label} target="_blank" rel="noopener noreferrer">{React.createElement(Icon)}</a>)}
              <Link to="/" aria-label="Website"><FaGlobe /></Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} KRAVS Infotech. All rights reserved.</p>

          <div className="footer-legal">
            {legalLinks.map(([label, url]) => url.startsWith("/")
              ? <Link key={label} to={url}>{label}</Link>
              : <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}</a>)}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
