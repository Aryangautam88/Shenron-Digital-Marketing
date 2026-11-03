import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Clock3, Search } from "lucide-react";
import { Link } from "react-router-dom";
import seoImage from "../assets/seo.png";
import webImage from "../assets/web_development.png";
import advertisingImage from "../assets/paid_advertising.png";
import designImage from "../assets/uiux_branding.png";
import influencerImage from "../assets/influencer_marketing.png";
import leadsImage from "../assets/lead_generation.png";
import "./Blog.css";

const categories = ["All insights", "Strategy", "Web development", "SEO", "Paid media", "Design"];

const articles = [
  {
    category: "Web development",
    title: "A better website starts with a clearer business goal",
    excerpt:
      "Before choosing a layout or a stack, define what the experience needs to help people do. That decision shapes every page that follows.",
    date: "Oct 28, 2026",
    readTime: "6 min read",
    image: webImage,
    alt: "Abstract web development illustration",
  },
  {
    category: "SEO",
    title: "The foundations of SEO that still make a difference",
    excerpt:
      "Useful pages, a sound technical setup, and a clear site structure give search engines and people a better way to find you.",
    date: "Oct 21, 2026",
    readTime: "5 min read",
    image: seoImage,
    alt: "Search optimization illustration",
  },
  {
    category: "Paid media",
    title: "Make your next ad campaign easier to learn from",
    excerpt:
      "A focused audience, one clear message, and a useful landing page make it easier to understand what is driving results.",
    date: "Oct 14, 2026",
    readTime: "7 min read",
    image: advertisingImage,
    alt: "Digital advertising illustration",
  },
  {
    category: "Design",
    title: "Good design makes the next step feel obvious",
    excerpt:
      "A considered visual system can help people understand what you offer, where to look, and what to do next.",
    date: "Oct 07, 2026",
    readTime: "4 min read",
    image: designImage,
    alt: "Digital design and branding illustration",
  },
  {
    category: "Strategy",
    title: "Turn a collection of marketing channels into one plan",
    excerpt:
      "When your website, content, and campaigns share the same direction, each touchpoint can do more useful work.",
    date: "Sep 30, 2026",
    readTime: "6 min read",
    image: influencerImage,
    alt: "Audience and influencer marketing illustration",
  },
  {
    category: "Strategy",
    title: "A practical way to improve the journey from click to enquiry",
    excerpt:
      "Small improvements to your message, forms, and follow-up can remove friction between a first visit and a real conversation.",
    date: "Sep 23, 2026",
    readTime: "5 min read",
    image: leadsImage,
    alt: "Lead generation illustration",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All insights");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All insights" || article.category === activeCategory;
      const matchesSearch =
        !query ||
        `${article.title} ${article.excerpt} ${article.category}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <main className="blog-page">
      <section className="blog-hero" aria-labelledby="blog-hero-title">
        <div className="blog-hero-content">
          <div className="blog-eyebrow">
            <span className="blog-eyebrow-line" aria-hidden="true" />
            <span>THE KRAVS JOURNAL</span>
          </div>

          <h1 id="blog-hero-title">
            Ideas that turn into <em>impact.</em>
          </h1>
          <p className="blog-hero-copy">
            Clear thinking for better digital experiences. Explore practical
            perspectives on design, development, and growing your business.
          </p>

          <a className="blog-hero-link" href="#blog-insights">
            Explore the latest insights
            <span className="blog-round-arrow" aria-hidden="true">
              <ArrowRight size={17} />
            </span>
          </a>
        </div>

        <div className="blog-hero-note" aria-hidden="true">
          <span className="blog-hero-note-dot" />
          <span>Ideas into digital impact</span>
        </div>
      </section>

      <section className="blog-featured-section" aria-labelledby="featured-title">
        <div className="blog-shell">
          <div className="blog-section-label">
            <span className="blog-eyebrow-line" aria-hidden="true" />
            <span>EDITOR&apos;S PICK</span>
          </div>

          <article className="blog-featured-card">
            <div className="blog-featured-copy">
              <span className="blog-category">Digital strategy</span>
              <h2 id="featured-title">
                Make every digital touchpoint work toward the same goal
              </h2>
              <p>
                A thoughtful online presence is more than a collection of
                channels. It is a connected experience that helps the right
                people move from discovery to action.
              </p>
              <div className="blog-article-meta">
                <span>Oct 30, 2026</span>
                <span className="blog-meta-divider" aria-hidden="true" />
                <span className="blog-read-time">
                  <Clock3 size={15} aria-hidden="true" /> 8 min read
                </span>
              </div>
            </div>
            <div className="blog-featured-image-wrap">
              <img
                src={seoImage}
                alt="A visual representation of connected digital strategy"
                className="blog-featured-image"
              />
              <span className="blog-featured-index" aria-hidden="true">01 / 06</span>
            </div>
          </article>
        </div>
      </section>

      <section className="blog-insights-section" id="blog-insights" aria-labelledby="insights-title">
        <div className="blog-shell">
          <div className="blog-insights-heading">
            <div>
              <div className="blog-section-label">
                <span className="blog-eyebrow-line" aria-hidden="true" />
                <span>FRESH PERSPECTIVES</span>
              </div>
              <h2 id="insights-title">The latest <em>insights.</em></h2>
              <p>Ideas, guides, and useful details for what you&apos;re building next.</p>
            </div>

            <label className="blog-search">
              <Search size={18} aria-hidden="true" />
              <span className="blog-visually-hidden">Search articles</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search insights"
              />
            </label>
          </div>

          <div className="blog-filter-list" role="group" aria-label="Filter articles by category">
            {categories.map((category) => (
              <button
                className={`blog-filter${activeCategory === category ? " is-active" : ""}`}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {visibleArticles.length > 0 ? (
            <div className="blog-article-grid">
              {visibleArticles.map((article, index) => (
                <article className="blog-article-card" key={article.title}>
                  <div className={`blog-card-image blog-card-image-${index % 3}`}>
                    <img src={article.image} alt={article.alt} loading="lazy" />
                    <span className="blog-card-category">{article.category}</span>
                  </div>
                  <div className="blog-card-copy">
                    <div className="blog-article-meta">
                      <span>{article.date}</span>
                      <span className="blog-meta-divider" aria-hidden="true" />
                      <span className="blog-read-time">
                        <Clock3 size={14} aria-hidden="true" /> {article.readTime}
                      </span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <span className="blog-card-mark" aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="blog-empty-state" role="status">
              No insights match that search. Try another topic or category.
            </p>
          )}
        </div>
      </section>

      <section className="blog-contact-section" aria-labelledby="blog-contact-title">
        <div className="blog-contact-card">
          <div className="blog-contact-copy">
            <div className="blog-section-label blog-section-label-light">
              <span className="blog-eyebrow-line" aria-hidden="true" />
              <span>YOUR NEXT CHAPTER</span>
            </div>
            <h2 id="blog-contact-title">Have a good idea? Let&apos;s make it <em>real.</em></h2>
            <p>Tell us what you&apos;re working on and we&apos;ll help you find a clear way forward.</p>
          </div>
          <Link className="blog-contact-button" to="/company/contact">
            Start a conversation
            <span aria-hidden="true"><ArrowUpRight size={18} /></span>
          </Link>
          <div className="blog-contact-orbit" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
