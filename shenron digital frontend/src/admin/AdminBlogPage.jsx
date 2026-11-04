import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { blogApi, jsonBody } from "../lib/blogApi";
import "./AdminBlogPage.css";
import AdminWorkspace from "./AdminWorkspace";
import "./AdminDesk.css";

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
  coverAlt: "",
  featuredVideo: "",
  richContent: null,
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
  const location = useLocation();
  const navigate = useNavigate();
  const section = new URLSearchParams(location.search).get('view') || (location.pathname.endsWith('enquiries') ? 'enquiries' : location.pathname.endsWith('new') ? 'editor' : 'blogs');
  const setSection = view => navigate(view === 'blogs' ? '/admin' : '/admin?view=' + view);
  const [uploading, setUploading] = useState(false);
  const expireSession = useCallback(() => setAuthState("signed-out"), []);

  async function uploadCover(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Choose a PNG, JPEG, or WebP image up to 5 MB."); return;
    }
    setUploading(true); setError("");
    try {
      const result = await blogApi("/admin/uploads", { method: "POST", headers: { "Content-Type": file.type }, body: file });
      const apiBase = import.meta.env.VITE_API_BASE_URL;
      const url = apiBase?.startsWith("http") ? new URL(result.url, apiBase).href : result.url;
      setForm(current => ({ ...current, coverImage: url }));
    } catch (err) { setError(err.message); if (err.status === 401) expireSession(); }
    finally { setUploading(false); event.target.value = ""; }
  }

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
      const matchesSearch = !query || `${blog.title} ${blog.description} ${blog.slug} ${blog.category}`.toLowerCase().includes(query);
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
    setSection("editor");
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
    const publication = event.nativeEvent?.submitter?.value;
    const payload = { ...form, slug, status: ["draft", "published"].includes(publication) ? publication : form.status };
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
      const message = editingId ? "Article updated successfully." : "Article saved successfully.";
      resetEditor();
      setNotice(message);
      setSection("blogs");
      await loadBlogs();
    } catch (requestError) {
      setError(requestError.message);
      if (requestError.status === 401) expireSession();
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
      if (requestError.status === 401) expireSession();
    } finally {
      setBusyId("");
    }
  }

  async function logout() {
    try {
      await blogApi("/admin/logout", { method: "POST" });
      setAdmin(null);
      setAuthState("signed-out");
      setBlogs([]);
      resetEditor();
    } catch {
      setError("Could not sign out. Check the backend connection and try again.");
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

  return <AdminWorkspace admin={admin} section={section} setSection={setSection} blogs={blogs} loadingBlogs={loadingBlogs} form={form} setForm={setForm} editingId={editingId} slugTouched={slugTouched} setSlugTouched={setSlugTouched} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} filteredBlogs={filteredBlogs} saving={saving} uploading={uploading} setUploading={setUploading} busyId={busyId} error={error} notice={notice} setError={setError} onSave={saveBlog} onEdit={editBlog} onDelete={deleteBlog} onReset={resetEditor} onUploadCover={uploadCover} onLogout={logout} onExpired={expireSession} onReload={loadBlogs} categories={categories}/>;
}
