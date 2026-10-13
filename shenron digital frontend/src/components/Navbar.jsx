
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import kravsLogo from "../assets/kravsLogo.png";


const serviceGroups = [
  {
    title: "SEO",
    color: "blue",
    icon: "⌕",
    items: [
      "Local SEO",
      "Technical SEO",
      "International SEO",
      "Multilingual SEO",
      "Generative Engine Optimization",
      "E-commerce SEO",
      "Enterprise SEO",
    ],
  },
  {
    title: "Paid Advertising",
    color: "purple",
    icon: "↗",
    items: [
      "Google Ads",
      "Facebook Ads",
      "Instagram Ads",
      "YouTube Ads",
      "LinkedIn Ads",
      "Remarketing Campaigns",
    ],
  },
  {
    title: "Influencer Marketing",
    color: "pink",
    icon: "◎",
    items: [
      "Nano Influencer",
      "Micro Influencer",
      "Instagram Influencer",
      "YouTube Influencer",
      "TikTok Influencer",
      "Influencer Campaigns",
    ],
  },
  {
    title: "Digital Design",
    color: "orange",
    icon: "✳",
    items: [
      "UI/UX Design",
      "Website UI Design",
      "Brand Identity",
      "Landing Page Design",
      "Visual Design",
      "Brand Strategy",
      "Creative Assets",
    ],
  },
  {
    title: "Web Development",
    color: "rose",
    icon: "⌘",
    items: [
      "Website Design",
      "Landing Pages",
      "Business Websites",
      "SaaS Websites",
      "Website Redesign",
      "E-commerce Websites",
      "Custom Web Development",
    ],
  },
];

const industries = [
  "Finance",
  "SaaS",
  "Crypto",
  "Ecommerce",
  "Real Estate",
  "Healthcare",
  "IT & Software",
  "Gaming",
  "iGaming",
  "Forex",
];

const businessTypes = [
  "B2B",
  "B2C",
  "Small Business",
  "Startup",
  "Enterprise",
];

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    menu: "services",
  },
  {
    label: "Industries",
    href: "/industries",
    menu: "industries",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
  },
  {
    label: "Company",
    href: "/company/about",
    menu: "company",
  },
];

const routeMap = {
  "Local SEO": "/services/seo/local",
  "Technical SEO": "/services/seo/technical",
  "International SEO": "/services/seo/international",
  "Multilingual SEO": "/services/seo/multilingual",
  "Generative Engine Optimization": "/services/seo/geo",
  "E-commerce SEO": "/services/seo/ecommerce",
  "Enterprise SEO": "/services/seo/enterprise",
  SEO: "/services/seo",

  "Paid Advertising": "/services/paid-advertising",
  "Google Ads": "/services/paid-advertising/google-ads",
  "Facebook Ads": "/services/paid-advertising/facebook-ads",
  "Instagram Ads": "/services/paid-advertising/instagram-ads",
  "YouTube Ads": "/services/paid-advertising/youtube-ads",
  "LinkedIn Ads": "/services/paid-advertising/linkedin-ads",
  "Remarketing Campaigns": "/services/paid-advertising/remarketing",

  "Influencer Marketing": "/services/influencer-marketing",
  "Nano Influencer": "/services/influencer-marketing/nano",
  "Micro Influencer": "/services/influencer-marketing/micro",
  "Instagram Influencer": "/services/influencer-marketing/instagram",
  "YouTube Influencer": "/services/influencer-marketing/youtube",
  "TikTok Influencer": "/services/influencer-marketing/tiktok",
  "Influencer Campaigns": "/services/influencer-marketing/campaigns",

  "Digital Design": "/services/digital-design",
  "UI/UX Design": "/services/digital-design/ui-ux",
  "Website UI Design": "/services/digital-design/website-ui",
  "Brand Identity": "/services/digital-design/brand-identity",
  "Landing Page Design": "/services/digital-design/landing-pages",
  "Visual Design": "/services/digital-design/visual-design",
  "Brand Strategy": "/services/digital-design/brand-strategy",
  "Creative Assets": "/services/digital-design/creative-assets",

  "Web Development": "/services/web-development",
  "Website Design": "/services/web-development/website-design",
  "Landing Pages": "/services/web-development/landing-pages",
  "Business Websites": "/services/web-development/business-websites",
  "SaaS Websites": "/services/web-development/saas",
  "Website Redesign": "/services/web-development/redesign",
  "E-commerce Websites": "/services/web-development/ecommerce",
  "Custom Web Development": "/services/web-development/custom",

  Industries: "/industries",
  Finance: "/industries/finance",
  SaaS: "/industries/saas",
  Crypto: "/industries/crypto",
  Ecommerce: "/industries/ecommerce",
  "Real Estate": "/industries/real-estate",
  Healthcare: "/industries/healthcare",
  "IT & Software": "/industries/it-software",
  Gaming: "/industries/gaming",
  iGaming: "/industries/igaming",
  Forex: "/industries/forex",

  "Types Of Business": "/business-types",
  B2B: "/business-types/b2b",
  B2C: "/business-types/b2c",
  "Small Business": "/business-types/small-business",
  Startup: "/business-types/startup",
  Enterprise: "/business-types/enterprise",

  Home: "/",
  Services: "/services",
  Testimonials: "/testimonials",
  "About Us": "/company/about",
  "Contact Us": "/company/contact",
};

function DropdownLink({
  label,
  onSelect,
  color = "blue",
}) {
  return (
    <Link
      to={routeMap[label] || "/services"}
      className="dropdown-link"
      onClick={onSelect}
    >
      <span className={`dropdown-dot dot-${color}`} />
      <span>{label}</span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownDismissed, setDropdownDismissed] = useState(false);

  const navbarRef = useRef(null);
  const location = useLocation();

  const closeMenus = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  // Close menus after navigation.
  useEffect(() => {
    closeMenus();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  // Floating navbar and scroll-to-close behavior.

  // Smooth desktop scroll state + preserve mobile menu closing
  useEffect(() => {
    let previousScrolled = window.scrollY > 50;

    setScrolled(previousScrolled);

    const handleScroll = () => {
      const nextScrolled = window.scrollY > 50;

      if (nextScrolled !== previousScrolled) {
        previousScrolled = nextScrolled;
        setScrolled(nextScrolled);
        closeMenus();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // Close when clicking outside the navbar.
  useEffect(() => {
    if (!menuOpen && !activeDropdown) return;

    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        closeMenus();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
    };
  }, [menuOpen, activeDropdown]);

  // Close menus with Escape.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);


  const handleNavClick = (event, item) => {
    // Desktop: menu click should not open or lock dropdown.
    // Navigation through the main menu link remains available.
    if (window.matchMedia("(min-width: 1001px)").matches) {
      setActiveDropdown(null);
      return;
    }
  
    // Mobile: first tap opens the submenu.
    if (item.menu) {
      if (activeDropdown !== item.menu) {
        event.preventDefault();
        setActiveDropdown(item.menu);
      } else {
        // Second tap navigates to the main menu page.
        closeMenus();
      }
    } else {
      closeMenus();
    }
  };
  

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
    setActiveDropdown(null);
  };

  const selectDropdownItem = () => {
    setDropdownDismissed(true);
    closeMenus();
  };

  return (
    <header
      ref={navbarRef}
      className={`navbar ${scrolled ? "navbar-scrolled" : ""
        } ${menuOpen ? "menu-open" : ""}`}
    >
      <nav className="navbar-inner" aria-label="Main navigation">

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenus}
          aria-label="Kravs Home"
        >
          <img
            src={kravsLogo}
            alt="Kravs"
            className="navbar-logo-image"
          />
        </Link>



        <div
          id="mobile-navigation"
          className={`navbar-links ${menuOpen ? "links-open" : ""}`}
          // onMouseLeave={() => {
          //   if (window.matchMedia("(min-width: 1001px)").matches) {
          //     setActiveDropdown(null);
          //   }
          // }}
        >


          {navItems.map((item) => (
            <div
              key={item.label}
              className={`nav-item ${
                item.menu ? "has-dropdown" : ""
              } ${
                activeDropdown === item.menu ? "dropdown-active" : ""
              } ${
                dropdownDismissed ? "dropdown-dismissed" : ""
              }`}
                onMouseEnter={() => {
                  if (window.matchMedia("(min-width: 1001px)").matches) {
                    setDropdownDismissed(false);
                    setActiveDropdown(item.menu || null);
                  }
                }}
            >

              <Link
                to={item.href}
                className="nav-link"
                aria-haspopup={item.menu ? "true" : undefined}
                aria-expanded={
                  item.menu
                    ? activeDropdown === item.menu
                    : undefined
                }
                onClick={(event) =>
                  handleNavClick(event, item)
                }
              >
                <span className="nav-link-inner">
                  <span className="nav-link-text">
                    {item.label}
                  </span>

                  <span
                    className="nav-link-text nav-link-text-clone"
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </span>

                {item.menu && (
                  <span
                    className="dropdown-chevron"
                    aria-hidden="true"
                  >

                  </span>
                )}
              </Link>

              {item.menu === "services" && (
                <div className="dropdown-panel services-dropdown">
                  <div className="services-grid">
                    {serviceGroups.map((group) => (
                      <div
                        className="service-column"
                        key={group.title}
                      >
                        <div className="dropdown-heading">
                          <span
                            className={`service-icon icon-${group.color}`}
                          >
                            {group.icon}
                          </span>

                          <h3>{group.title}</h3>
                        </div>

                        <div className="dropdown-list">
                          {group.items.map((service) => (
                            <DropdownLink
                              key={service}
                              label={service}
                              color={group.color}
                              onSelect={selectDropdownItem}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.menu === "industries" && (
                <div className="dropdown-panel industries-dropdown">
                  <div className="industry-column">
                    <div className="dropdown-heading">
                      <span className="service-icon icon-blue">
                        ▤
                      </span>
                      <h3>Industries</h3>
                    </div>

                    <div className="dropdown-list">
                      {industries.map((industry) => (
                        <DropdownLink
                          key={industry}
                          label={industry}
                          color="blue"
                          onSelect={selectDropdownItem}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="industry-column">
                    <div className="dropdown-heading">
                      <span className="service-icon icon-purple">
                        ≋
                      </span>
                      <h3>Types Of Business</h3>
                    </div>

                    <div className="dropdown-list">
                      {businessTypes.map((type) => (
                        <DropdownLink
                          key={type}
                          label={type}
                          color="purple"
                          onSelect={selectDropdownItem}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {item.menu === "company" && (
                <div className="dropdown-panel company-dropdown">
                  <DropdownLink
                    label="About Us"
                    onSelect={selectDropdownItem}
                  />

                  <DropdownLink
                    label="Contact Us"
                    onSelect={selectDropdownItem}
                  />
                </div>
              )}
            </div>
          ))}

          <Link
            to="/company/contact"
            className="navbar-cta mobile-cta"
            onClick={closeMenus}
          >
            Let's talk <span className="cta-arrow">↗</span>
          </Link>
        </div>

        <Link
          to="/company/contact"
          className="navbar-cta desktop-cta"
          onClick={closeMenus}
        >
          Let's talk <span className="cta-arrow"></span>
        </Link>

        <button
          className={`navbar-toggle ${menuOpen ? "toggle-active" : ""
            }`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
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
