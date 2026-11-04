import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Plus, Mail, LogOut, Search, FileText, X, Eye, RefreshCw } from "lucide-react";
import EnquiryInbox from "./EnquiryInbox";
import RichEditor from "./RichEditor";
import { uploadAsset } from "../lib/uploadAsset";
import ArticleContent, { FeaturedVideo } from "../components/ArticleContent";
import { blogApi, jsonBody } from "../lib/blogApi";
import logo from "../assets/kravsLogo.png";

const slugify = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
export default function AdminWorkspace(props) {
  const { admin, section, setSection, blogs, loadingBlogs, form, setForm, editingId, slugTouched, setSlugTouched, search, setSearch, statusFilter, setStatusFilter, saving, uploading, setUploading, busyId, error, notice, setError, onSave, onEdit, onDelete, onReset, onUploadCover, onLogout, onExpired, onReload, categories } = props;
  const [category, setCategory] = useState('all');
  const [preview, setPreview] = useState(null);
  const [publishing, setPublishing] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  useEffect(() => {
    if (!preview) return;
    const previous = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function handleKey(event) {
      if (event.key === 'Escape') setPreview(null);
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll('.desk-preview button, .desk-preview a[href], .desk-preview input, .desk-preview video[controls], .desk-preview iframe')];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener('keydown',handleKey);
    return () => { document.body.style.overflow = originalOverflow; document.removeEventListener('keydown',handleKey); previous?.focus(); };
  }, [preview]);
  const [editorVersion, setEditorVersion] = useState(0);
  const filtered = props.filteredBlogs.filter(blog => category === 'all' || blog.category === category);
  const change = patch => setForm(current => ({ ...current, ...patch }));
  const create = () => { onReset(); setEditorVersion(v => v + 1); setSection('editor'); };
  const edit = blog => { onEdit(blog); setEditorVersion(v => v + 1); };
  async function togglePublication(blog) {
    setPublishing(blog._id); setError('');
    try { await blogApi(`/admin/blogs/${blog._id}`, { method:'PUT', body:jsonBody({ status: blog.status === 'published' ? 'draft' : 'published' }) }); await onReload(); }
    catch (err) { setError(err.message); if (err.status === 401) onExpired(); }
    finally { setPublishing(''); }
  }
  async function uploadVideo(event) {
    const file = event.target.files?.[0]; if (!file) return;
    if (!['video/mp4','video/webm'].includes(file.type) || file.size > 10 * 1024 * 1024) { setError('Choose an MP4 or WebM video up to 10 MB.'); return; }
    setUploading(true);
    try { change({ featuredVideo: await uploadAsset(file) }); }
    catch (err) { setError(err.message); if (err.status === 401) onExpired(); }
    finally { setUploading(false); event.target.value = ''; }
  }
  return <main className="blog-admin-page desk-page">
    <aside className="desk-sidebar"><Link className="desk-brand" to="/admin"><img src={logo} alt="Kravs Infotech"/><span>CONTENT DESK</span></Link><span className="desk-nav-label">WORKSPACE</span>
      <nav aria-label="Admin workspace"><button aria-current={section === 'blogs' ? 'page' : undefined} onClick={() => setSection('blogs')}><FileText size={17}/>All articles<span>{blogs.length}</span></button><button aria-current={section === 'editor' ? 'page' : undefined} onClick={create}><Plus size={18}/>New article</button><button aria-current={section === 'enquiries' ? 'page' : undefined} onClick={() => setSection('enquiries')}><Mail size={17}/>Enquiries</button></nav>
      <div className="desk-sidebar-bottom"><div className="desk-avatar">{admin?.email?.[0]?.toUpperCase()}</div><div><strong>{admin?.email}</strong><small>Administrator</small></div><button aria-label="Sign out" title="Sign out" disabled={signingOut} onClick={async () => { setSigningOut(true); await onLogout(); setSigningOut(false); }}><LogOut size={17}/></button></div>
    </aside>
    <div className="desk-main"><header className="desk-topbar"><div><span>CONTENT MANAGEMENT</span><strong>{section === 'enquiries' ? 'Client support' : 'Blog desk'}</strong></div><Link to="/blog" target="_blank" rel="noopener noreferrer">View public journal<ArrowUpRight size={14}/></Link></header>
      <div className="desk-content">
        {error && <p className="desk-alert is-error" role="alert">{error}</p>}{notice && <p className="desk-alert" role="status">{notice}</p>}
        {section === 'enquiries' ? <EnquiryInbox onExpired={onExpired}/> : section === 'editor' ? <>
          <div className="desk-page-heading"><div><span className="desk-eyebrow">{editingId ? 'EDIT ARTICLE' : 'NEW ARTICLE'}</span><h1>Shape the story.</h1><p>Save a draft at any point. Published articles appear in your public journal.</p></div><button className="desk-button" onClick={() => setSection('blogs')}>← Back to articles</button></div>
          <form className="desk-editor-layout" onSubmit={onSave}>
            <div className="desk-editor-main"><section className="desk-card desk-fields">
              <label>Title *<input required maxLength={160} value={form.title} placeholder="A clear, helpful headline" onChange={e => change({ title:e.target.value, slug:slugTouched ? form.slug : slugify(e.target.value) })}/></label>
              <label>URL slug *<div className="desk-slug"><span>/blog/</span><input required maxLength={180} value={form.slug} onChange={e => { setSlugTouched(true); change({slug:slugify(e.target.value)}); }}/></div><small>Changing a published slug changes the article's public address.</small></label>
              <label>Short description *<textarea required rows={3} maxLength={320} value={form.description} onChange={e => change({description:e.target.value})} placeholder="Give readers a reason to explore your article."/><small>{form.description.length}/320</small></label>
            </section>
            <section className="desk-card desk-content-card"><div className="desk-card-heading"><div><h2>Article content</h2><p>Format your story, add images, and connect useful sources.</p></div><span>RICH TEXT</span></div><RichEditor key={`${editingId}-${editorVersion}`} form={form} onChange={change} onError={setError} onBusy={setUploading}/></section>
            <section className="desk-card desk-fields"><div><span className="desk-eyebrow">SEARCH APPEARANCE</span><h2>Help your story get found.</h2></div><label>SEO title<input maxLength={70} value={form.seoMetaTitle} onChange={e => change({seoMetaTitle:e.target.value})} placeholder="Defaults to the article title"/><small>{form.seoMetaTitle.length}/70</small></label><label>Meta description<textarea maxLength={160} rows={3} value={form.seoMetaDescription} onChange={e => change({seoMetaDescription:e.target.value})} placeholder="Defaults to the short description"/><small>{form.seoMetaDescription.length}/160</small></label><label>SEO keywords<input maxLength={1400} value={form.seoKeywords} onChange={e => change({seoKeywords:e.target.value})} placeholder="strategy, design, web development"/><small>Separate keywords with commas. Up to 20 keywords.</small></label></section></div>
            <aside className="desk-editor-aside"><section className="desk-card desk-fields"><div><h2>Publishing</h2><p>Choose when this article is visible.</p></div><label>Status<select value={form.status} onChange={e => change({status:e.target.value})}><option value="draft">Draft</option><option value="published">Published</option></select></label><label>Author<input maxLength={100} value={form.author} onChange={e => change({author:e.target.value})}/></label><button className="desk-button" type="submit" value="draft" disabled={saving || uploading}>Save draft</button><button className="desk-button" type="button" onClick={() => setPreview(form)}><Eye size={15}/>Preview</button><button className="desk-button is-primary" type="submit" value="published" disabled={saving || uploading}>{uploading ? 'Uploading…' : saving ? 'Saving…' : editingId ? 'Publish / update' : 'Publish article'}<ArrowUpRight size={15}/></button></section>
              <section className="desk-card desk-fields"><div><h2>Cover image</h2><p>Shown on the article and listing card.</p></div>{form.coverImage ? <img className="desk-cover-preview" key={form.coverImage} src={form.coverImage} alt={form.coverAlt || 'Cover preview'}/> : <div className="desk-cover-empty"><BookOpen size={30}/><span>Add a cover to your story</span></div>}<label className="desk-file-button">{uploading ? 'Uploading…' : form.coverImage ? 'Replace image' : 'Upload image'}<input disabled={uploading || saving} type="file" accept="image/png,image/jpeg,image/webp" onChange={onUploadCover}/></label><small>PNG, JPEG or WebP · up to 5 MB</small><label>Or image URL<input value={form.coverImage} onChange={e => change({coverImage:e.target.value})} placeholder="https://…"/></label><label>Image alt text<input maxLength={200} value={form.coverAlt} onChange={e => change({coverAlt:e.target.value})} placeholder="Describe the cover image"/></label>{form.coverImage && <button type="button" className="desk-text-button is-danger" onClick={() => change({coverImage:'',coverAlt:''})}>Remove cover</button>}</section>
              <section className="desk-card desk-fields"><div><h2>Featured video</h2><p>Optional video above your article.</p></div><label>YouTube / Vimeo URL<input value={form.featuredVideo} onChange={e => change({featuredVideo:e.target.value})} placeholder="https://youtu.be/…"/></label><label className="desk-file-button">Upload MP4 / WebM<input type="file" accept="video/mp4,video/webm" disabled={uploading || saving} onChange={uploadVideo}/></label><small>Up to 10 MB. Use a hosted link for larger videos.</small>{form.featuredVideo && <><FeaturedVideo url={form.featuredVideo}/><button type="button" className="desk-text-button" onClick={() => change({featuredVideo:''})}>Remove video</button></>}</section>
              <section className="desk-card desk-fields"><div><h2>Article details</h2><p>Used in filters and the public page.</p></div><label>Category<select value={form.category} onChange={e => change({category:e.target.value})}>{categories.map(item => <option key={item}>{item}</option>)}</select></label><label className="desk-checkbox"><input type="checkbox" checked={form.featured} onChange={e => change({featured:e.target.checked})}/>Feature this article</label></section>
            </aside>
          </form>
        </> : <>
          <div className="desk-page-heading"><div><span className="desk-eyebrow">ADMINISTRATION</span><h1>Blog Management</h1><p>{blogs.length} {blogs.length === 1 ? 'article' : 'articles'} in your journal. Search, edit, and manage publication status.</p></div><button className="desk-button is-primary" onClick={create}><Plus size={16}/>Create new blog</button></div>
          <div className="desk-filters"><label className="desk-search"><Search size={17}/><input aria-label="Search articles" placeholder="Search titles and descriptions" value={search} onChange={e => setSearch(e.target.value)}/></label><select aria-label="Filter category" value={category} onChange={e => setCategory(e.target.value)}><option value="all">All categories</option>{categories.map(item => <option key={item}>{item}</option>)}</select><select aria-label="Filter publication status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select><button className="desk-icon-button" aria-label="Refresh articles" disabled={loadingBlogs} onClick={onReload}><RefreshCw size={17}/></button></div>
          <div className="desk-table-wrap"><table className="desk-article-table"><thead><tr><th>ARTICLE</th><th>CATEGORY</th><th>STATUS</th><th>UPDATED</th><th>ACTIONS</th></tr></thead><tbody>{filtered.map(blog => <tr key={blog._id}><td><div className="desk-article-title">{blog.coverImage ? <img src={blog.coverImage} alt=""/> : <span className="desk-article-icon"><FileText size={20}/></span>}<div><strong>{blog.title}</strong><small>/blog/{blog.slug}</small></div></div></td><td>{blog.category}</td><td><span className={`desk-status status-${blog.status}`}><i/>{blog.status}</span></td><td><time dateTime={blog.updatedAt}>{new Date(blog.updatedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</time></td><td><div className="desk-table-actions"><button onClick={() => setPreview(blog)}>Preview</button><button onClick={() => edit(blog)}>Edit</button><button disabled={publishing === blog._id} onClick={() => togglePublication(blog)}>{blog.status === 'published' ? 'Unpublish' : 'Publish'}</button><button className="is-danger" disabled={busyId === blog._id} onClick={() => onDelete(blog)}>Delete</button></div></td></tr>)}</tbody></table>{loadingBlogs ? <p className="desk-empty" role="status">Loading articles…</p> : !filtered.length && <div className="desk-empty"><BookOpen size={32}/><h2>{blogs.length ? 'No matching articles' : 'Your first story starts here.'}</h2><p>{blogs.length ? 'Try another search or change the filters.' : 'Create a useful story, save a draft, and publish when it is ready.'}</p>{!blogs.length && <button className="desk-button is-primary" onClick={create}><Plus size={16}/>Write your first article</button>}</div>}</div>
        </>}
      </div>
    </div>
    {preview && <div className="desk-preview-backdrop" onClick={e => { if (e.target === e.currentTarget) setPreview(null); }}><section className="desk-preview" role="dialog" aria-modal="true" aria-label="Article preview"><div className="desk-preview-bar"><span>ARTICLE PREVIEW · {preview.status || 'draft'}</span><button autoFocus className="desk-icon-button" aria-label="Close preview" onClick={() => setPreview(null)}><X size={20}/></button></div><article><span className="desk-eyebrow">{preview.category}</span><h1>{preview.title || 'Your article title'}</h1><p className="desk-preview-intro">{preview.description}</p><small>{preview.author}</small>{preview.coverImage && <img className="desk-preview-cover" src={preview.coverImage} alt={preview.coverAlt || preview.title}/>}<FeaturedVideo url={preview.featuredVideo}/><ArticleContent richContent={preview.richContent} content={preview.content}/></article></section></div>}
  </main>;
}
