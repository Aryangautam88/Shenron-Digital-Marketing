import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import seoImage from "../assets/seo.png";
import { blogApi } from "../lib/blogApi";
import "./Blog.css";

const categories = ["Strategy", "Web development", "SEO", "Paid media", "Design"];

function formatDate(value) {
  if (!value) return "Recently published";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Recently published"
    : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function readTime(value) {
  return `${Math.max(1, Number(value) || 1)} min read`;
}

function setMetaContent(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);
  const created = !element;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  const previousContent = element.getAttribute("content");
  element.setAttribute("content", content);

  return () => {
    if (created) element.remove();
    else if (previousContent === null) element.removeAttribute("content");
    else element.setAttribute("content", previousContent);
  };
}

function BlogContactSection() {
  return (
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
        <Link className="blog-contact-button" to="/contact">
          Start a conversation
          <span aria-hidden="true"><ArrowUpRight size={18} /></span>
        </Link>
        <div className="blog-contact-orbit" aria-hidden="true" />
      </div>
    </section>
  );
}

function BlogLoadingState() {
  return (
    <div className="blog-fetch-state" role="status" aria-live="polite">
      <span className="blog-loader-orbit" aria-hidden="true" />
      <p>Loading insights...</p>
    </div>
  );
}

export default function Blog() {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [article, setArticle] = useState(null);
  const [state, setState] = useState("loading");
  const [retry, setRetry] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All insights");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setState("loading");
    setArticle(null);

    const request = slug
      ? blogApi(`/blogs/${encodeURIComponent(slug)}`, { signal: controller.signal })
      : blogApi("/blogs?limit=36", { signal: controller.signal });

    request
      .then((result) => {
        if (controller.signal.aborted) return;
        if (slug) {
          setArticle(result.blog);
          setState("ready");
        } else {
          setBlogs(result.blogs || []);
          setState(result.blogs?.length ? "ready" : "empty");
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError" && !controller.signal.aborted) {
          setState(error.status === 404 ? "not-found" : "error");
        }
      });

    return () => controller.abort();
  }, [slug, retry]);

  useEffect(() => {
    if (!slug || state !== "ready" || !article) return undefined;

    const previousTitle = document.title;
    const seoTitle = article.seoMetaTitle?.trim() || article.title;
    document.title = article.seoMetaTitle?.trim() || `${article.title} | Kravs Infotech`;
    const description = article.seoMetaDescription?.trim() || article.description;
    const keywords = Array.isArray(article.seoKeywords) ? article.seoKeywords.join(", ") : "";
    const image = new URL(article.coverImage || seoImage, window.location.href).href;
    const restoreMeta = [
      setMetaContent("name", "description", description),
      setMetaContent("name", "keywords", keywords),
      setMetaContent("property", "og:type", "article"),
      setMetaContent("property", "og:title", seoTitle),
      setMetaContent("property", "og:description", description),
      setMetaContent("property", "og:image", image),
      setMetaContent("property", "og:url", window.location.href),
    ];

    return () => {
      document.title = previousTitle;
      restoreMeta.reverse().forEach((restore) => restore());
    };
  }, [slug, state, article]);

  const visibleBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesCategory = activeCategory === "All insights" || blog.category === activeCategory;
      const matchesSearch = !query || `${blog.title} ${blog.description} ${blog.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, blogs, searchTerm]);

  if (slug) {
    if (state === "loading") return <main className="blog-page"><BlogLoadingState /><BlogContactSection /></main>;
    if (state !== "ready" || !article) {
      const missingArticle = state === "not-found";
      return (
        <main className="blog-page">
          <section className="blog-fetch-state blog-fetch-state-error">
            <span className="blog-eyebrow">THE KRAVS JOURNAL</span>
            <h1>{missingArticle ? "This article isn’t here." : "Insights are taking a moment."}</h1>
            <p>{missingArticle ? "The link may be out of date, or this article may no longer be published." : "We couldn’t load this article from the blog service."}</p>
            {missingArticle ? <Link className="blog-hero-link" to="/blog">Back to all insights <ArrowRight size={17} /></Link> : <button className="blog-filter is-active" type="button" onClick={() => setRetry((value) => value + 1)}>Try again</button>}
          </section>
          <BlogContactSection />
        </main>
      );
    }

    const paragraphs = article.content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
    return (
      <main className="blog-page blog-detail-page">
        <section className="blog-detail-hero">
          <div className="blog-detail-copy">
            <Link className="blog-back-link" to="/blog"><ArrowLeft size={16} /> All insights</Link>
            <span className="blog-category">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="blog-detail-description">{article.description}</p>
            <div className="blog-article-meta">
              <span>{article.author || "Kravs Infotech"}</span>
              <span className="blog-meta-divider" aria-hidden="true" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span className="blog-meta-divider" aria-hidden="true" />
              <span className="blog-read-time"><Clock3 size={15} aria-hidden="true" /> {readTime(article.readingTime)}</span>
            </div>
          </div>
          <img className="blog-detail-cover" src={article.coverImage || seoImage} alt={article.title} />
        </section>
        <article className="blog-detail-content">
          {paragraphs.length ? paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 18)}`}>{paragraph}</p>) : <p>This article has no body text yet.</p>}
        </article>
        <BlogContactSection />
      </main>
    );
  }

  const featuredBlog = visibleBlogs.find((blog) => blog.featured) || visibleBlogs[0];
  const remainingBlogs = featuredBlog
    ? visibleBlogs.filter((blog) => blog._id !== featuredBlog._id)
    : [];

  return (
    <main className="blog-page">
      <section className="blog-hero" aria-labelledby="blog-hero-title">
        <div className="blog-hero-content">
          <div className="blog-eyebrow">
            <span className="blog-eyebrow-line" aria-hidden="true" />
            <span>THE KRAVS JOURNAL</span>
          </div>
          <h1 id="blog-hero-title">Ideas that turn into <em>impact.</em></h1>
          <p className="blog-hero-copy">Clear thinking for better digital experiences. Explore practical perspectives on design, development, and growing your business.</p>
          <a className="blog-hero-link" href="#blog-insights">
            Explore the latest insights
            <span className="blog-round-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
          </a>
        </div>
        <div className="blog-hero-note" aria-hidden="true">
          <span className="blog-hero-note-dot" />
          <span>Ideas for what&apos;s next</span>
        </div>
      </section>

      {state === "loading" ? (
        <BlogLoadingState />
      ) : state === "error" ? (
        <section className="blog-fetch-state blog-fetch-state-error" aria-labelledby="blog-error-title">
          <span className="blog-eyebrow">THE KRAVS JOURNAL</span>
          <h2 id="blog-error-title">Insights are taking a moment.</h2>
          <p>We couldn’t connect to the blog service. Please try again in a moment.</p>
          <button className="blog-filter is-active" type="button" onClick={() => setRetry((value) => value + 1)}>Try again</button>
        </section>
      ) : state === "empty" ? (
        <section className="blog-empty-journal">
          <div className="blog-section-label"><span className="blog-eyebrow-line" /><span>A JOURNAL IN THE MAKING</span></div>
          <h2>Fresh ideas are <em>on the way.</em></h2>
          <p>Our team is preparing useful perspectives on design, development, and digital growth. Check back soon.</p>
        </section>
      ) : (
        <>
          {featuredBlog && (
            <section className="blog-featured-section" aria-labelledby="featured-title">
              <div className="blog-shell">
                <div className="blog-section-label"><span className="blog-eyebrow-line" aria-hidden="true" /><span>EDITOR&apos;S PICK</span></div>
                <article className="blog-featured-card">
                  <div className="blog-featured-copy">
                    <span className="blog-category">{featuredBlog.category}</span>
                    <h2 id="featured-title">{featuredBlog.title}</h2>
                    <p>{featuredBlog.description}</p>
                    <div className="blog-article-meta">
                      <span>{featuredBlog.author || "Kravs Infotech"}</span>
                      <span className="blog-meta-divider" aria-hidden="true" />
                      <time dateTime={featuredBlog.publishedAt}>{formatDate(featuredBlog.publishedAt)}</time>
                      <span className="blog-meta-divider" aria-hidden="true" />
                      <span className="blog-read-time"><Clock3 size={15} aria-hidden="true" /> {readTime(featuredBlog.readingTime)}</span>
                    </div>
                    <Link className="blog-featured-link" to={`/blog/${featuredBlog.slug}`}>Read the story <ArrowUpRight size={17} /></Link>
                  </div>
                  <Link className="blog-featured-image-wrap" to={`/blog/${featuredBlog.slug}`} aria-label={`Read ${featuredBlog.title}`}>
                    <img src={featuredBlog.coverImage || seoImage} alt={featuredBlog.title} className="blog-featured-image" />
                    <span className="blog-featured-index" aria-hidden="true">FEATURED</span>
                  </Link>
                </article>
              </div>
            </section>
          )}

          <section className="blog-insights-section" id="blog-insights" aria-labelledby="insights-title">
            <div className="blog-shell">
              <div className="blog-insights-heading">
                <div>
                  <div className="blog-section-label"><span className="blog-eyebrow-line" aria-hidden="true" /><span>FRESH PERSPECTIVES</span></div>
                  <h2 id="insights-title">The latest <em>insights.</em></h2>
                  <p>Ideas, guides, and useful details for what you&apos;re building next.</p>
                </div>
                <label className="blog-search">
                  <Search size={18} aria-hidden="true" />
                  <span className="blog-visually-hidden">Search articles</span>
                  <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search insights" />
                </label>
              </div>

              <div className="blog-filter-list" role="group" aria-label="Filter articles by category">
                {["All insights", ...categories].map((category) => (
                  <button className={`blog-filter${activeCategory === category ? " is-active" : ""}`} key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                    {category}
                  </button>
                ))}
              </div>

              {remainingBlogs.length ? (
                <div className="blog-article-grid">
                  {remainingBlogs.map((blog) => (
                    <article className="blog-article-card" key={blog._id}>
                      <Link className="blog-card-image" to={`/blog/${blog.slug}`} aria-label={`Read ${blog.title}`}>
                        <img src={blog.coverImage || seoImage} alt={blog.title} loading="lazy" />
                        <span className="blog-card-category">{blog.category}</span>
                      </Link>
                      <div className="blog-card-copy">
                        <div className="blog-article-meta">
                          <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                          <span className="blog-meta-divider" aria-hidden="true" />
                          <span className="blog-read-time"><Clock3 size={14} aria-hidden="true" /> {readTime(blog.readingTime)}</span>
                        </div>
                        <h3><Link to={`/blog/${blog.slug}`}>{blog.title}</Link></h3>
                        <p>{blog.description}</p>
                        <Link className="blog-card-read-link" to={`/blog/${blog.slug}`}>Read article <ArrowUpRight size={16} aria-hidden="true" /></Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="blog-empty-state" role="status">{visibleBlogs.length ? "That’s our latest insight for this topic." : "No insights match that search. Try another topic or category."}</p>
              )}
            </div>
          </section>
        </>
      )}

      <BlogContactSection />
    </main>
  );
}
