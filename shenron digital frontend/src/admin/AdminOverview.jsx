import { ArrowUpRight, FileText, Mail, Plus } from 'lucide-react';

export default function AdminOverview({ blogs, loading, setSection, onCreate, onEdit }) {
  const published = blogs.filter(blog => blog.status === 'published').length;
  const recent = [...blogs].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)).slice(0, 4);
  return <>
    <div className="desk-page-heading"><div><span className="desk-eyebrow">WEBSITE MANAGEMENT</span><h1>Your workspace, at a glance.</h1><p>Manage your content and keep client conversations moving.</p></div><button className="desk-button is-primary" onClick={onCreate}><Plus size={16}/>Create article</button></div>
    <section className="desk-overview-stats" aria-label="Content overview">
      {[['Total articles', blogs.length], ['Published', published], ['Drafts', blogs.length - published]].map(([label, count]) => <div className="desk-card" key={label}><span>{label}</span><strong>{loading ? '—' : count}</strong><small>{label === 'Drafts' ? 'Ready for your next edit' : label === 'Published' ? 'Live on your public blog' : 'Across your content library'}</small></div>)}
    </section>
    <section className="desk-overview-actions" aria-label="Workspace sections">
      <button className="desk-card" onClick={() => setSection('blogs')}><FileText size={25}/><h2>Blog management</h2><p>Create, edit, and publish articles. Keep your latest insights up to date.</p><span>Manage articles <ArrowUpRight size={17}/></span></button>
      <button className="desk-card" onClick={() => setSection('enquiries')}><Mail size={25}/><h2>Client enquiries</h2><p>Read incoming messages, reply to clients, and manage follow-ups.</p><span>Open enquiry inbox <ArrowUpRight size={17}/></span></button>
    </section>
    <section className="desk-card desk-overview-recent"><div className="desk-card-heading"><div><h2>Recent blog updates</h2><p>Continue where you left off.</p></div><button className="desk-text-button" onClick={() => setSection('blogs')}>View all</button></div>
      {loading ? <p role="status">Loading articles…</p> : recent.length ? recent.map(blog => <button className="desk-recent-row" key={blog._id} onClick={() => onEdit(blog)}><span><strong>{blog.title}</strong><small>{blog.category}</small></span><span className={`desk-status status-${blog.status}`}>{blog.status}</span><ArrowUpRight size={16}/></button>) : <div className="desk-overview-empty"><FileText size={26}/><h2>Your next story starts here.</h2><p>Create your first article and save it as a draft or publish it to your blog.</p><button className="desk-button" onClick={onCreate}><Plus size={15}/>Create first article</button></div>}
    </section>
  </>;
}
