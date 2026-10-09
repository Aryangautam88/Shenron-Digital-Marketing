
import { useEffect, useState } from "react";
import "./Navbar.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Insights", href: "#insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <nav className="navbar-inner">
        {/* Logo */}
        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          kravs<span className="logo-dot">.</span>
        </a>

        {/* Navigation links */}
        <div className={`navbar-links ${menuOpen ? "links-open" : ""}`}>
  {navLinks.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className="nav-link"
      onClick={closeMenu}
    >
      <span className="nav-link-inner">
        <span className="nav-link-text">{link.label}</span>
        <span className="nav-link-text nav-link-text-clone">
          {link.label}
        </span>
      </span>
    </a>
  ))}
</div>

        {/* Desktop CTA */}
        <a href="#contact" className="navbar-cta desktop-cta">
          Let's talk <span className="cta-arrow">↗</span>
        </a>

        {/* Mobile hamburger */}
        <button
          className={`navbar-toggle ${menuOpen ? "toggle-active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          type="button"
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
