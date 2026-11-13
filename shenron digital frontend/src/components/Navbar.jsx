import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

import kravsLogo from "../assets/kravsLogo.png";
import kravsLogoNew from "../assets/kravsNewLogoMob.jpeg";

const serviceGroups = [
  {
    title: "SEO",
    icon: "⌕",
    color: "blue",
    items: [
      ["Local SEO", "/services/seo/local-seo"],
      ["Technical SEO", "/services/seo/technical-seo"],
      ["International SEO", "/services/seo/international-seo"],
      ["Multilingual SEO", "/services/seo/multilingual-seo"],
      ["Generative Engine Optimization", "/services/seo/geo"],
      ["E-commerce SEO", "/services/seo/ecommerce-seo"],
      ["Enterprise SEO", "/services/seo/enterprise-seo"],
    ],
  },
  {
    title: "Paid Advertising",
    icon: "↗",
    color: "purple",
    items: [
      ["Google Ads", "/services/paid-advertising/google-ads"],
      ["Facebook Ads", "/services/paid-advertising/facebook-ads"],
      ["Instagram Ads", "/services/paid-advertising/instagram-ads"],
      ["YouTube Ads", "/services/paid-advertising/youtube-ads"],
      ["LinkedIn Ads", "/services/paid-advertising/linkedin-ads"],
      ["Remarketing Campaigns", "/services/paid-advertising/remarketing"],
    ],
  },
  {
    title: "Digital Design",
    icon: "✳",
    color: "orange",
    items: [
      ["UI/UX Design", "/services/digital-design/ui-ux"],
      ["Website UI Design", "/services/digital-design/website-ui"],
      ["Brand Identity", "/services/digital-design/brand-identity"],
      ["Landing Page Design", "/services/digital-design/landing-pages"],
      ["Visual Design", "/services/digital-design/visual-design"],
      ["Brand Strategy", "/services/digital-design/brand-strategy"],
      ["Creative Assets", "/services/digital-design/creative-assets"],
    ],
  },
  {
    title: "Web Development",
    icon: "⌘",
    color: "rose",
    items: [
      ["Website Design", "/services/web-development/website-design"],
      ["Landing Pages", "/services/web-development/landing-pages"],
      ["Business Websites", "/services/web-development/business-websites"],
      ["SaaS Websites", "/services/web-development/saas-websites"],
      ["Website Redesign", "/services/web-development/redesign"],
      ["E-commerce Websites", "/services/web-development/ecommerce"],
      ["Custom Web Development", "/services/web-development/custom"],
    ],
  },
  {
    title: "Influencer Marketing",
    icon: "◎",
    color: "pink",
    items: [
      ["Nano Influencer", "/services/influencer-marketing/nano"],
      ["Micro Influencer", "/services/influencer-marketing/micro"],
      ["Instagram Influencer", "/services/influencer-marketing/instagram"],
      ["Influencer Campaigns", "/services/influencer-marketing/campaigns"],
    ],
  },
];

const industries = [
  ["Finance", "/industries/finance"],
  ["SaaS", "/industries/saas"],
  ["Crypto", "/industries/crypto"],
  ["Ecommerce", "/industries/ecommerce"],
  ["Real Estate", "/industries/real-estate"],
  ["Healthcare", "/industries/healthcare"],
  ["IT & Software", "/industries/it-software"],
  ["Gaming", "/industries/gaming"],
  ["iGaming", "/industries/igaming"],
  ["Forex", "/industries/forex"],
];

const businessTypes = [
  ["B2B", "/business-types/b2b"],
  ["B2C", "/business-types/b2c"],
  ["Small Business", "/business-types/small-business"],
  ["Startup", "/business-types/startup"],
  ["Enterprise", "/business-types/enterprise"],
];

function Chevron({ open = false }) {
  return (
    <svg
      className={`nav-chevron ${open ? "is-open" : ""}`}
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3.5 6 4.5 4 4.5-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 15 15 5M6 5h9v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className={`hamburger-lines ${open ? "is-open" : ""}`}>
      <span />
      <span />
    </span>
  );
}

function MenuLink({ item, color = "blue", onNavigate }) {
  return (
    <Link to={item[1]} className="mega-link" onClick={onNavigate}>
      <span className={`mega-dot dot-${color}`} />
      <span>{item[0]}</span>
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 35
  );

  // Desktop dropdown state
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mobile dropdown state is deliberately separate
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(null);
    setMobileDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-mobile-open", mobileOpen);

    return () => {
      document.body.classList.remove("nav-mobile-open");
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setMobileDropdown(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  const closeMenus = () => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(null);
    setMobileDropdown(null);
    setMobileOpen(false);
  };

  const openDropdown = (name) => {
    if (!window.matchMedia("(min-width: 769px)").matches) return;

    clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const toggleDropdown = (name) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const toggleMobileDropdown = (name) => {
    setMobileDropdown((current) => (current === name ? null : name));
  };

  const scheduleClose = () => {
    if (!window.matchMedia("(min-width: 769px)").matches) return;

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navClass = [
    "kravs-navbar",
    isScrolled ? "is-scrolled" : "",
    mobileOpen ? "mobile-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navClass}>
      <div className="navbar-capsule" onMouseLeave={scheduleClose}>
        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          aria-label="KRAVS Infotech home"
          onClick={closeMenus}
        >
          <img
            className="logo-desktop"
            src={kravsLogo}
            alt="KRAVS Infotech"
          />
          <img
            className="logo-mobile"
            src={kravsLogoNew}
            alt="KRAVS Infotech"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="navbar-links" aria-label="Main navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={closeMenus}
          >
            Home
          </Link>

          {/* SERVICES */}
          <div
            className={`nav-item ${activeDropdown === "services" ? "dropdown-active" : ""
              }`}
            onMouseEnter={() => openDropdown("services")}
          >
            <div className="nav-trigger-wrap">
              <Link
                to="/services"
                className={`nav-link ${isActive("/services") ? "active" : ""}`}
                onClick={closeMenus}
              >
                Services
              </Link>

              <button
                type="button"
                className="nav-dropdown-toggle"
                aria-label="Toggle Services menu"
                aria-expanded={activeDropdown === "services"}
                onClick={() => toggleDropdown("services")}
              >
                <Chevron open={activeDropdown === "services"} />
              </button>
            </div>

            {activeDropdown === "services" && (
              <div className="mega-dropdown services-dropdown">
                {serviceGroups.map((group) => (
                  <div className="mega-column" key={group.title}>
                    <Link
                      to="/services"
                      className="mega-heading"
                      onClick={closeMenus}
                    >
                      <span className={`mega-icon icon-${group.color}`}>
                        {group.icon}
                      </span>
                      <span>{group.title}</span>
                    </Link>

                    <div className="mega-list">
                      {group.items.map((item) => (
                        <MenuLink
                          key={item[1]}
                          item={item}
                          color={group.color}
                          onNavigate={closeMenus}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INDUSTRIES */}
          <div
            className={`nav-item ${activeDropdown === "industries" ? "dropdown-active" : ""
              }`}
            onMouseEnter={() => openDropdown("industries")}
          >
            <div className="nav-trigger-wrap">
              <Link
                to="/industries"
                className={`nav-link ${isActive("/industries") || isActive("/business-types")
                  ? "active"
                  : ""
                  }`}
                onClick={closeMenus}
              >
                Industries
              </Link>

              <button
                type="button"
                className="nav-dropdown-toggle"
                aria-label="Toggle Industries menu"
                aria-expanded={activeDropdown === "industries"}
                onClick={() => toggleDropdown("industries")}
              >
                <Chevron open={activeDropdown === "industries"} />
              </button>
            </div>

            {activeDropdown === "industries" && (
              <div className="mega-dropdown industries-dropdown">
                <div className="industry-column">
                  <Link
                    to="/industries"
                    className="mega-heading"
                    onClick={closeMenus}
                  >
                    Industries
                  </Link>

                  {industries.map((item) => (
                    <MenuLink
                      key={item[1]}
                      item={item}
                      color="blue"
                      onNavigate={closeMenus}
                    />
                  ))}
                </div>

                <div className="industry-column business-column">
                  <Link
                    to="/business-types"
                    className="mega-heading"
                    onClick={closeMenus}
                  >
                    Business Types
                  </Link>

                  {businessTypes.map((item) => (
                    <MenuLink
                      key={item[1]}
                      item={item}
                      color="purple"
                      onNavigate={closeMenus}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/blog"
            className={`nav-link ${isActive("/blog") ? "active" : ""
              }`}
            onClick={closeMenus}
          >
            Blog
          </Link>

          {/* COMPANY */}
          <div
            className={`nav-item company-nav-item ${activeDropdown === "company" ? "dropdown-active" : ""
              }`}
            onMouseEnter={() => openDropdown("company")}
          >
            <div className="nav-trigger-wrap">
              <button
                type="button"
                className={`nav-link company-trigger-button ${isActive("/about") || isActive("/contact") || isActive("/company") ? "active" : ""}`}
                aria-expanded={activeDropdown === "company"}
                onClick={() => toggleDropdown("company")}
              >
                Company
              </button>
              <button
                type="button"
                className="nav-dropdown-toggle"
                aria-label="Toggle Company menu"
                aria-expanded={activeDropdown === "company"}
                onClick={() => toggleDropdown("company")}
              >
                <Chevron open={activeDropdown === "company"} />
              </button>
            </div>

            {activeDropdown === "company" && (
              <div className="mega-dropdown company-dropdown">
                <Link to="/company/about" className="company-link" onClick={closeMenus}>
                  About Us
                </Link>

                <Link to="/contact" className="company-link" onClick={closeMenus}>
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTA */}
        <Link to="/contact" className="navbar-cta" onClick={closeMenus}>
          <span>Let's talk</span>
          <ArrowUpRight />
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-panel"
          onClick={() => {
            clearTimeout(closeTimer.current);
            setMobileOpen((current) => !current);
            setMobileDropdown(null);
            setActiveDropdown(null);
          }}
        >
          <MenuIcon open={mobileOpen} />
        </button>

        {/* Mobile navigation */}
        <div
          id="mobile-navigation-panel"
          className="mobile-nav-panel"
          aria-hidden={!mobileOpen}
        >
          <Link to="/" className="mobile-nav-link" onClick={closeMenus}>
            Home
          </Link>

          {/* Mobile Services */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-row">
              <Link
                to="/services"
                className="mobile-nav-link mobile-nav-category"
                onClick={closeMenus}
              >
                Services
              </Link>
              <button
                type="button"
                className="mobile-nav-link mobile-nav-trigger"
                aria-label="Toggle Services submenu"
                aria-controls="mobile-services-submenu"
                aria-expanded={mobileDropdown === "services"}
                onClick={() => toggleMobileDropdown("services")}
              >
                <Chevron open={mobileDropdown === "services"} />
              </button>
            </div>

            {mobileDropdown === "services" && (
              <div className="mobile-submenu" id="mobile-services-submenu">
                <Link to="/services" onClick={closeMenus}>
                  All Services
                </Link>

                {serviceGroups.map((group) => (
                  <div className="mobile-subgroup" key={group.title}>
                    <span className="mobile-subheading">{group.title}</span>

                    {group.items.map((item) => (
                      <Link
                        to={item[1]}
                        key={item[1]}
                        onClick={closeMenus}
                      >
                        {item[0]}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Industries */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-row">
              <Link
                to="/industries"
                className="mobile-nav-link mobile-nav-category"
                onClick={closeMenus}
              >
                Industries &amp; Business Types
              </Link>
              <button
                type="button"
                className="mobile-nav-link mobile-nav-trigger"
                aria-label="Toggle Industries and Business Types submenu"
                aria-controls="mobile-industries-submenu"
                aria-expanded={mobileDropdown === "industries"}
                onClick={() => toggleMobileDropdown("industries")}
              >
                <Chevron open={mobileDropdown === "industries"} />
              </button>
            </div>

            {mobileDropdown === "industries" && (
              <div className="mobile-submenu" id="mobile-industries-submenu">
                <Link to="/industries" onClick={closeMenus}>
                  All Industries
                </Link>

                <span className="mobile-subheading">Industries</span>

                {industries.map((item) => (
                  <Link
                    to={item[1]}
                    key={item[1]}
                    onClick={closeMenus}
                  >
                    {item[0]}
                  </Link>
                ))}

                <span className="mobile-subheading">Business Types</span>

                {businessTypes.map((item) => (
                  <Link
                    to={item[1]}
                    key={item[1]}
                    onClick={closeMenus}
                  >
                    {item[0]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/blog"
            className="mobile-nav-link"
            onClick={closeMenus}
          >
            Blog
          </Link>

          {/* Mobile Company */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-row">
              <button
                type="button"
                className="mobile-nav-link mobile-nav-category"
                aria-controls="mobile-company-submenu"
                aria-expanded={mobileDropdown === "company"}
                onClick={() => toggleMobileDropdown("company")}
              >
                Company
              </button>
              <button
                type="button"
                className="mobile-nav-link mobile-nav-trigger"
                aria-label="Toggle Company submenu"
                aria-controls="mobile-company-submenu"
                aria-expanded={mobileDropdown === "company"}
                onClick={() => toggleMobileDropdown("company")}
              >
                <Chevron open={mobileDropdown === "company"} />
              </button>
            </div>

            {mobileDropdown === "company" && (
              <div className="mobile-submenu" id="mobile-company-submenu">
                <Link to="/about" onClick={closeMenus}>
                  About Us
                </Link>
                <Link to="/contact" onClick={closeMenus}>
                  Contact Us
                </Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="mobile-cta" onClick={closeMenus}>
            Let's talk
            <ArrowUpRight />
          </Link>
        </div>
      </div>

      {/* Backdrop sits behind the mobile menu */}
      {mobileOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close navigation menu"
          onClick={closeMenus}
        />
      )}
    </header>
  );
}
