import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CirclePlus,
  Eye,
  EyeOff,
  FileText,
  LogOut,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import kravsBrandLogo from "../assets/kravsLogo.png";
import { blogApi, jsonBody } from "../lib/blogApi";
import "./AdminBlogPage.css";

const categories = ["Strategy", "Web development", "SEO", "Paid media", "Design"];
const emptyForm = {
  title: "",
  slug: "",
  description: "",
  seoMetaTitle: "",
  seoMetaDescription: "",
  seoKeywords: "",
  category: "Strategy",
  coverImage: "",
  content: "",
  author: "Kravs Infotech",
  status: "draft",
  featured: false,
};

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value) {
  if (!value) return "Not published";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Not published" : date.toLocaleDateString();
}

export default function AdminBlogPage() {
  const [authState, setAuthState] = useState("checking");
  const [admin, setAdmin] = useState(null);
  const [retry, setRetry] = useState(0);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const loadBlogs = useCallback(async () => {
    setLoadingBlogs(true);
    setError("");
    try {
      const result = await blogApi("/admin/blogs");
      setBlogs(result.blogs || []);
    } catch (requestError) {
      setError(requestError.message);
      if (requestError.status === 401) setAuthState("signed-out");
    } finally {
      setLoadingBlogs(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function checkSession() {
      setAuthState("checking");
      setLoginError("");
      setConnectionStatus(null);
      try {
        const result = await blogApi("/admin/session");
        if (!active) return;
        setAdmin(result.admin);
        setAuthState("ready");
        await loadBlogs();
      } catch (requestError) {
        if (!active) return;
        setAuthState(requestError.status === 401 ? "signed-out" : "offline");
        setLoginError(requestError.status === 401 ? "" : requestError.message);
        setConnectionStatus(requestError.status || null);
      }
    }
    checkSession();
    return () => { active = false; };
  }, [loadBlogs, retry]);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesSearch = !query || `${blog.title} ${blog.slug} ${blog.category}`.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || blog.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, statusFilter]);

  function resetEditor() {
    setForm(emptyForm);
    setEditingId("");
    setSlugTouched(false);
    setError("");
    setNotice("");
  }

  function editBlog(blog) {
    setForm({
      ...emptyForm,
      ...blog,
      coverImage: blog.coverImage || "",
      seoMetaTitle: blog.seoMetaTitle || "",
      seoMetaDescription: blog.seoMetaDescription || "",
      seoKeywords: Array.isArray(blog.seoKeywords) ? blog.seoKeywords.join(", ") : blog.seoKeywords || "",
    });
    setEditingId(blog._id);
    setSlugTouched(true);
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitLogin(event) {
    event.preventDefault();
    setLoginError("");
    try {
      const result = await blogApi("/admin/login", { method: "POST", body: jsonBody(login) });
      setAdmin(result.admin);
      setAuthState("ready");
      setLogin({ email: "", password: "" });
      await loadBlogs();
    } catch (requestError) {
      setLoginError(requestError.message);
    }
  }

  async function saveBlog(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    const slug = slugify(form.slug || form.title);
    if (!slug) {
      setError("Enter a URL slug using letters or numbers.");
      return;
    }
    const payload = { ...form, slug };
    if (payload.status === "published" && payload.content.trim().length < 80) {
      setError("Articles must contain at least 80 characters before they can be published.");
      return;
    }

    setSaving(true);
    try {
      await blogApi(editingId ? `/admin/blogs/${editingId}` : "/admin/blogs", {
        method: editingId ? "PUT" : "POST",
        body: jsonBody(payload),
      });
      setNotice(editingId ? "Article updated successfully." : "Article saved successfully.");
      resetEditor();
      await loadBlogs();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlog(blog) {
    if (!window.confirm("Delete \"" + blog.title + "\"? This action cannot be undone.")) return;
    setBusyId(blog._id);
    setError("");
    try {
      await blogApi(`/admin/blogs/${blog._id}`, { method: "DELETE" });
      if (editingId === blog._id) resetEditor();
      setNotice("Article deleted successfully.");
      await loadBlogs();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  }

  async function logout() {
    try {
      await blogApi("/admin/logout", { method: "POST" });
    } catch {
      // Clear local admin state even if the API is unavailable during sign-out.
    } finally {
      setAdmin(null);
      setAuthState("signed-out");
      setBlogs([]);
      resetEditor();
    }
  }

  if (authState === "checking") {
    return <main className="blog-admin-page"><div className="admin-access-state" role="status">Checking admin access...</div></main>;
  }

  if (authState === "offline") {
    return (
      <main className="blog-admin-page blog-admin-offline-page">
        <div className="admin-offline-shell">
          <Link className="admin-brand admin-offline-brand" to="/blog">
            <span className="admin-brand-mark"><BookOpen size={20} /></span>
            <span>KRAVS <small>CONTENT STUDIO</small></span>
          </Link>
          <section className="admin-offline-card" aria-labelledby="admin-offline-title">
            <div className="admin-offline-visual" aria-hidden="true">
              <div className="admin-offline-orbit admin-offline-orbit-one" />
              <div className="admin-offline-orbit admin-offline-orbit-two" />
              <span className="admin-offline-book"><BookOpen size={43} strokeWidth={1.35} /></span>
              <span className="admin-offline-pulse" />
              <span className="admin-offline-visual-caption">YOUR IDEAS, READY TO PUBLISH</span>
            </div>
            <div className="admin-offline-content">
              <span className="admin-offline-status"><i /> BACKEND SETUP NEEDED</span>
              <span className="admin-eyebrow">ADMIN ACCESS</span>
              <h1 id="admin-offline-title">Let&apos;s connect your <em>journal.</em></h1>
              <p className="admin-offline-intro">The content studio needs the Blog API and database before you can sign in or manage articles.</p>
              <div className="admin-setup-card">
                <strong>Quick setup</strong>
                <ol>
                  <li>Install packages in <code>shenron digital backend</code>.</li>
                  <li>Copy <code>.env.example</code> to <code>.env</code>; set MongoDB, admin email, and JWT secret.</li>
                  <li>Run <code>npm.cmd run hash-password</code> and save the hash in <code>ADMIN_PASSWORD_HASH</code>.</li>
                  <li>Start the API with <code>npm.cmd run dev</code>.</li>
                </ol>
              </div>
              {loginError && (
                <details className="admin-connection-details">
                  <summary>Connection details</summary>
                  <p>{connectionStatus === 500 ? "The API responded with an internal server error. Check the backend terminal and database configuration." : loginError}</p>
                </details>
              )}
              <div className="admin-offline-actions">
                <button className="admin-primary-button" type="button" onClick={() => setRetry((value) => value + 1)}>Check connection <ArrowUpRight size={17} /></button>
                <Link className="admin-public-link" to="/blog">Visit the public blog</Link>
              </div>
            </div>
          </section>
          <p className="admin-offline-help">Setup instructions are also available in <strong>shenron digital backend/README.md</strong>.</p>
        </div>
      </main>
    );
  }

  if (authState === "signed-out") {
    return (
      <main className="blog-admin-page">
        <section className="admin-login-card">
          <span className="admin-brand-mark"><BookOpen size={22} /></span>
          <span className="admin-eyebrow">KRAVS CONTENT STUDIO</span>
          <h1>Manage your journal.</h1>
          <p>Sign in to add, update, publish, or delete articles.</p>
          <form className="admin-login-form" onSubmit={submitLogin}>
            <label>Email address<input type="email" autoComplete="username" required value={login.email} onChange={(event) => setLogin((current) => ({ ...current, email: event.target.value }))} /></label>
            <div className="admin-password-group">
              <label htmlFor="admin-login-password">Password</label>
              <span className="admin-password-field">
                <input id="admin-login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={login.password} onChange={(event) => setLogin((current) => ({ ...current, password: event.target.value }))} />
                <button className="admin-password-toggle" type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-controls="admin-login-password" aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </div>
            {loginError && <p className="admin-form-error" role="alert">{loginError}</p>}
            <button className="admin-primary-button" type="submit">Sign in <ArrowUpRight size={17} /></button>
          </form>
          <Link className="admin-public-link" to="/blog">Visit the public blog</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="blog-admin-page">
      <div className="admin-shell">
        <header className="admin-topbar">
          <Link className="admin-brand admin-brand-image" to="/blog" aria-label="Kravs Infotech blog admin">
            <img src={kravsBrandLogo} alt="Kravs Infotech" />
          </Link>
          <div className="admin-topbar-actions">
            <span className="admin-user-email">{admin?.email}</span>
            <Link className="admin-view-site" to="/blog">View blog <ArrowUpRight size={15} /></Link>
            <button className="admin-logout-button" type="button" onClick={logout}><LogOut size={16} /> Sign out</button>
          </div>
        </header>

        <section className="admin-welcome">
          <div><span className="admin-eyebrow">CONTENT MANAGEMENT</span><h1>Your journal, <em>your voice.</em></h1><p>Create and manage the stories your readers see on the Blog page.</p></div>
          <div className="admin-summary-card"><span><FileText size={18} /></span><strong>{blogs.length}</strong><small>{blogs.length === 1 ? "ARTICLE" : "ARTICLES"}</small></div>
        </section>

        {error && <div className="admin-alert admin-alert-error" role="alert">{error}</div>}
        {notice && <div className="admin-alert admin-alert-success" role="status"><Check size={16} />{notice}</div>}

        <div className="admin-workspace">
          <section className="admin-editor-panel" aria-labelledby="admin-editor-title">
            <div className="admin-panel-heading">
              <div><span className="admin-eyebrow">{editingId ? "EDIT ARTICLE" : "NEW ARTICLE"}</span><h2 id="admin-editor-title">{editingId ? "Shape the story." : "Write something useful."}</h2></div>
              {editingId && <button className="admin-quiet-button" type="button" onClick={resetEditor}>Cancel edit</button>}
            </div>

            <form className="admin-blog-form" onSubmit={saveBlog}>
              <label>Article title<input id="admin-article-title" maxLength={160} required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value, slug: slugTouched ? current.slug : slugify(event.target.value) }))} placeholder="A clear, helpful headline" /></label>
              <label>URL slug<div className="admin-slug-field"><span>/blog/</span><input maxLength={180} value={form.slug} onChange={(event) => { setSlugTouched(true); setForm((current) => ({ ...current, slug: slugify(event.target.value) })); }} placeholder="article-url" /></div><small className="admin-field-hint">Leave blank to generate the URL from the article title.</small></label>
              <div className="admin-form-row">
                <label>Category<select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
                <label>Publication<select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}><option value="draft">Save as draft</option><option value="published">Publish now</option></select></label>
              </div>
              <label>Short description<textarea required maxLength={320} rows={3} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="A concise summary for the Blog page" /><small className="admin-character-count">{form.description.length}/320</small></label>
              <label>Cover image URL<input type="url" value={form.coverImage} onChange={(event) => setForm((current) => ({ ...current, coverImage: event.target.value }))} placeholder="https://your-image-url.com/cover.jpg" /><small className="admin-field-hint">Paste a public image URL. Leave blank to use the journal artwork.</small></label>
              {form.coverImage && <div className="admin-image-preview"><img src={form.coverImage} alt="Cover preview" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>}
              <div className="admin-form-row">
                <label>Author<input maxLength={100} value={form.author} onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))} /></label>
                <label className="admin-featured-toggle"><input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} /><span>Feature this story</span></label>
              </div>
              <label>Article content<textarea className="admin-content-input" maxLength={50000} rows={12} value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} placeholder="Write the article here. Use a blank line between paragraphs." /><small className="admin-field-hint">Plain text is safe to publish. Use blank lines to create paragraphs. Published articles need at least 80 characters.</small></label>
              <section className="admin-seo-settings" aria-labelledby="admin-seo-title">
                <div className="admin-seo-heading">
                  <span className="admin-eyebrow">SEARCH ENGINE SETTINGS</span>
                  <h3 id="admin-seo-title">Search appearance</h3>
                  <p>Customize how this article appears in search results.</p>
                </div>
                <label>SEO title<input maxLength={70} value={form.seoMetaTitle} onChange={(event) => setForm((current) => ({ ...current, seoMetaTitle: event.target.value }))} placeholder="Leave blank to use the article title" /><small className="admin-field-hint">{form.seoMetaTitle.length}/70 characters. Leave blank to use the article title.</small></label>
                <label>Meta description<textarea maxLength={160} rows={3} value={form.seoMetaDescription} onChange={(event) => setForm((current) => ({ ...current, seoMetaDescription: event.target.value }))} placeholder="Summarize this article in up to 160 characters." /><small className="admin-field-hint">{form.seoMetaDescription.length}/160 characters. Leave blank to use the short description above.</small></label>
                <label>SEO keywords<input maxLength={1400} value={form.seoKeywords} onChange={(event) => setForm((current) => ({ ...current, seoKeywords: event.target.value }))} placeholder="digital strategy, web design, search optimization" /><small className="admin-field-hint">{form.seoKeywords.split(",").filter((keyword) => keyword.trim()).length}/20 keywords. Separate keywords with commas; each can be up to 60 characters.</small></label>
              </section>
              <div className="admin-editor-actions">
                <button className="admin-primary-button" type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Save changes" : "Save article"}<ArrowUpRight size={17} /></button>
                <button className="admin-quiet-button" type="button" onClick={resetEditor}>Clear form</button>
              </div>
            </form>
          </section>

          <section className="admin-library-panel" aria-labelledby="admin-library-title">
            <div className="admin-panel-heading admin-library-heading">
              <div><span className="admin-eyebrow">YOUR ARTICLES</span><h2 id="admin-library-title">The library.</h2></div>
              <button className="admin-new-button" type="button" onClick={resetEditor}><CirclePlus size={17} /> New</button>
            </div>
            <div className="admin-library-controls">
              <label className="admin-search"><Search size={16} /><span className="admin-visually-hidden">Search articles</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find an article" /></label>
              <select aria-label="Filter articles by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All status</option><option value="published">Published</option><option value="draft">Drafts</option></select>
            </div>
            {loadingBlogs ? <div className="admin-library-state" role="status">Loading articles...</div> : filteredBlogs.length ? (
              <div className="admin-article-list">
                {filteredBlogs.map((blog) => (
                  <article className="admin-article-row" key={blog._id}>
                    <div className="admin-article-cover">{blog.coverImage ? <img src={blog.coverImage} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <BookOpen size={20} aria-hidden="true" />}</div>
                    <div className="admin-article-info"><div><span className={`admin-status admin-status-${blog.status}`}>{blog.status}</span>{blog.featured && <span className="admin-featured-label">featured</span>}</div><h3>{blog.title}</h3><p>{blog.category} <span>·</span> {formatDate(blog.updatedAt)}</p></div>
                    <div className="admin-row-actions">
                      {blog.status === "published" && <Link to={`/blog/${blog.slug}`} aria-label={`View ${blog.title}`}><ArrowUpRight size={16} /></Link>}
                      <button type="button" onClick={() => editBlog(blog)} aria-label={`Edit ${blog.title}`}><Pencil size={16} /></button>
                      <button className="admin-delete-action" type="button" disabled={busyId === blog._id} onClick={() => deleteBlog(blog)} aria-label={`Delete ${blog.title}`}><Trash2 size={16} /></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : blogs.length ? (
              <div className="admin-library-state admin-library-no-results">
                <span><Search size={20} /></span>
                <h3>No matching articles</h3>
                <p>Try another search or change the status filter.</p>
              </div>
            ) : (
              <div className="admin-empty-library">
                <div className="admin-empty-art" aria-hidden="true"><span /><BookOpen size={28} /></div>
                <span className="admin-empty-kicker">A FRESH PAGE</span>
                <h3>Your first story starts here.</h3>
                <p>Turn what you know into something useful for your readers.</p>
                <div className="admin-empty-steps">
                  <span><b>01</b> Give your idea a clear headline</span>
                  <span><b>02</b> Add the details readers need</span>
                  <span><b>03</b> Save a draft or publish when ready</span>
                </div>
                <button className="admin-empty-cta" type="button" onClick={() => document.getElementById("admin-article-title")?.focus()}>
                  Start writing <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
