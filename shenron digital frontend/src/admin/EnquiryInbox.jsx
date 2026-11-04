import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Search, Send, Check } from 'lucide-react';
import { blogApi, jsonBody } from '../lib/blogApi';

function EnquiryCard({ enquiry, onUpdate, onExpired, mailConfigured }) {
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes || '');
  const [reply, setReply] = useState(enquiry.reply?.draft || `Hello ${enquiry.name},\n\nThank you for contacting Kravs Infotech. We have reviewed your enquiry and would be happy to help.\n\nBest regards,\nKravs Infotech`);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  async function action(type) {
    setBusy(type); setError(''); setNotice('');
    try {
      if (type === 'save') {
        await blogApi(`/admin/enquiries/${enquiry._id}`, { method:'PATCH', body:jsonBody({status,notes,replyDraft:reply}) });
        setNotice('Status, reply draft, and private notes saved.');
      } else if (type === 'send') {
        await blogApi(`/admin/enquiries/${enquiry._id}/reply`, { method:'POST', body:jsonBody({message:reply}) });
        setNotice('Reply accepted by your mail server.');
      } else {
        await blogApi(`/admin/enquiries/${enquiry._id}/retry-email`, {method:'POST'});
        setNotice('Acknowledgement queued for retry.');
      }
      onUpdate();
    } catch (err) { setError(err.message); if (err.status === 401) onExpired(); }
    finally { setBusy(''); }
  }
  const phone = (enquiry.phone || '').replace(/\D/g,'');
  return <article className="desk-enquiry">
    <header><div><h2>{enquiry.name}</h2><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>{enquiry.phone && <small>{enquiry.phone}</small>}{enquiry.company && <small>{enquiry.company}</small>}</div><div className="desk-enquiry-meta"><span className={`desk-status status-${enquiry.status}`}><i/>{enquiry.status.replace('-',' ')}</span><time dateTime={enquiry.createdAt}>{new Date(enquiry.createdAt).toLocaleString('en-IN')}</time><span>Contact page</span>{enquiry.reply?.sentAt && <span>Last reply: {new Date(enquiry.reply.sentAt).toLocaleString('en-IN')}</span>}</div></header>
    <div className="desk-enquiry-message"><span>ENQUIRY</span><p>{enquiry.message}</p>{enquiry.services?.length > 0 && <small>Interested in: {enquiry.services.join(', ')}</small>}</div>
    <div className="desk-reply-grid"><label>Reply draft<small>Sends from your configured company mailbox. Review before sending.</small><textarea rows={6} maxLength={10000} value={reply} onChange={e => setReply(e.target.value)}/></label><label>Private admin note<small>Only visible to administrators.</small><textarea rows={6} maxLength={5000} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add an internal follow-up note…"/></label></div>
    <div className="desk-enquiry-footer"><label>Status<select value={status} onChange={e => setStatus(e.target.value)}><option value="new">New</option><option value="in-progress">In progress</option><option value="resolved">Resolved</option></select></label><div><button className="desk-button" disabled={!!busy || !mailConfigured || reply.trim().length < 10} onClick={() => action('send')}><Send size={13}/>{busy === 'send' ? 'Sending…' : 'Send email'}</button>{phone.length >= 7 && phone.length <= 15 && <a className="desk-button" href={`https://wa.me/${phone}?text=${encodeURIComponent(reply)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}<button className="desk-button is-primary" disabled={!!busy} onClick={() => action('save')}><Check size={13}/>{busy === 'save' ? 'Saving…' : 'Save updates'}</button></div></div>
    <div className="desk-enquiry-email-status">Acknowledgement: <strong>{enquiry.acknowledgement?.status || 'pending'}</strong>{enquiry.acknowledgement?.sentAt && ` · ${new Date(enquiry.acknowledgement.sentAt).toLocaleString('en-IN')}`}{enquiry.acknowledgement?.status === 'failed' && <button disabled={!!busy || !mailConfigured} onClick={() => action('retry')}>Retry acknowledgement</button>}<br/>Contact consent recorded {new Date(enquiry.consentAt).toLocaleDateString('en-IN')}</div>
    {error && <p className="desk-alert is-error desk-enquiry-notice" role="alert">{error}</p>}{notice && <p className="desk-alert desk-enquiry-notice" role="status">{notice}</p>}
  </article>;
}

export default function EnquiryInbox({ onExpired }) {
  const [data, setData] = useState({enquiries:[],total:0,unread:0,pages:1});
  const [page,setPage] = useState(1);
  const [filter,setFilter] = useState('');
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('');
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError('');
    try { setData(await blogApi(`/admin/enquiries?page=${page}&status=${filter}&search=${encodeURIComponent(query)}`)); }
    catch (err) { setError(err.message); if (err.status === 401) onExpired(); }
    finally { setLoading(false); }
  },[page,filter,query,onExpired]);
  useEffect(() => { void load(); },[load]);
  return <section aria-labelledby="inbox-title"><div className="desk-page-heading"><div><span className="desk-eyebrow">CLIENT SUPPORT</span><h1 id="inbox-title">Enquiries</h1><p>{data.total} enquiries · {data.unread} new. Review requests, reply, and keep every follow-up organised.</p></div><button className="desk-button" disabled={loading} onClick={() => load()}><RefreshCw size={14}/>Refresh list</button></div>
    {data.mailConfigured === false && <p className="desk-alert" role="status">SMTP setup needed. Enquiries are saved; automatic acknowledgement emails remain queued until your company mailbox is configured.</p>}{data.mailConfigured === true && <p className="desk-alert">Company mailbox configured. Automatic acknowledgements are queued; check each enquiry for delivery status.</p>}
    <form className="desk-inbox-controls" onSubmit={e => { e.preventDefault(); setPage(1); setQuery(search.trim()); }}><label className="desk-search"><Search size={16}/><input aria-label="Search enquiries" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, phone, company, or message"/></label><button className="desk-button" type="submit">Search</button><select aria-label="Filter enquiry status" value={filter} onChange={e => {setFilter(e.target.value);setPage(1);}}><option value="">All statuses</option><option value="new">New</option><option value="in-progress">In progress</option><option value="resolved">Resolved</option></select></form>
    {error && <p className="desk-alert is-error" role="alert">{error}</p>}
    {loading ? <p className="desk-empty" role="status">Loading enquiries…</p> : data.enquiries.length ? <div className="desk-enquiry-list">{data.enquiries.map(enquiry => <EnquiryCard key={enquiry._id} enquiry={enquiry} onUpdate={() => load(true)} onExpired={onExpired} mailConfigured={data.mailConfigured}/>)}</div> : !error && <div className="desk-empty"><h2>No enquiries in this view.</h2><p>Contact form submissions appear here automatically. Try changing your filters.</p></div>}
    <div className="enquiry-pagination"><button className="desk-button" disabled={page === 1 || loading} onClick={() => setPage(p => p - 1)}>Previous</button><span>Page {page} of {data.pages}</span><button className="desk-button" disabled={page >= data.pages || loading} onClick={() => setPage(p => p + 1)}>Next</button></div>
  </section>;
}
