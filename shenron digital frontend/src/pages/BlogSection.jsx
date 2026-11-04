import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import seoImage from "../assets/seo.png";
import { blogApi } from "../lib/blogApi";
import "./Blog.css";
import "./BlogSection.css";

function formatDate(value) {
  if (!value) return "Recently published";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Recently published"
    : new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
}

function readTime(value) {
  return `${Math.max(1, Number(value) || 1)} min read`;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [state, setState] = useState("loading");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState("loading");

    blogApi("/blogs?limit=3", { signal: controller.signal })
      .then((result) => {
        if (controller.signal.aborted) return;
        const latestBlogs = result.blogs || [];
        setBlogs(latestBlogs);
        setState(latestBlogs.length ? "ready" : "empty");
      })
      .catch((error) => {
        if (error.name !== "AbortError" && !controller.signal.aborted) {
          setState("error");
        }
      });

    return () => controller.abort();
  }, [retry]);

  return (
    <section className="blog-insights-section home-blog" id="blog" aria-labelledby="home-blog-title">
      <div className="blog-shell">
        <div className="blog-insights-heading home-blog-heading">
          <div>
            <div className="blog-section-label">
              <span className="blog-eyebrow-line" aria-hidden="true" />
              <span>FROM THE KRAVS JOURNAL</span>
            </div>
            <h2 id="home-blog-title">Ideas worth <em>sharing.</em></h2>
            <p>Fresh perspectives on design, technology, and digital growth.</p>
          </div>
          <Link className="home-blog-all-link" to="/blog">
            View all insights <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        {state === "loading" ? (
          <p className="home-blog-message" role="status" aria-live="polite">
            Loading the latest insights...
          </p>
        ) : state === "error" ? (
          <div className="home-blog-message" role="status">
            <p>Insights are taking a moment to load.</p>
            <button type="button" onClick={() => setRetry((value) => value + 1)}>
              Try again
            </button>
          </div>
        ) : state === "empty" ? (
          <p className="home-blog-message" role="status">
            New insights are on the way. Visit the journal again soon.
          </p>
        ) : (
          <div className="blog-article-grid">
            {blogs.map((blog) => (
              <article className="blog-article-card" key={blog._id}>
                <Link className="blog-card-image" to={`/blog/${blog.slug}`} aria-label={`Read ${blog.title}`}>
                  <img src={blog.coverImage || seoImage} alt={blog.title} loading="lazy" />
                  <span className="blog-card-category">{blog.category}</span>
                </Link>
                <div className="blog-card-copy">
                  <div className="blog-article-meta">
                    <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                    <span className="blog-meta-divider" aria-hidden="true" />
                    <span className="blog-read-time">
                      <Clock3 size={14} aria-hidden="true" /> {readTime(blog.readingTime)}
                    </span>
                  </div>
                  <h3><Link to={`/blog/${blog.slug}`}>{blog.title}</Link></h3>
                  <p>{blog.description}</p>
                  <Link className="blog-card-read-link" to={`/blog/${blog.slug}`}>
                    Read article <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
