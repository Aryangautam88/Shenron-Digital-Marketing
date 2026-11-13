import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

const documents = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'How Kravs Infotech handles information when you browse our website or contact us about a project.',
    sections: [
      ['Information you provide', 'Our enquiry form collects your name, email address, message, selected services, and consent to be contacted. You may also provide your company name and phone number. Please avoid including passwords, payment details, or other sensitive information in your message.'],
      ['How we use your information', 'We use enquiry information to understand your requirements, respond to your questions, send an acknowledgement, and follow up about potential services. Our team may keep notes about your enquiry and the messages exchanged with you. Submitting an enquiry is not a subscription to a marketing newsletter.'],
      ['Website operation and cookies', 'Our website and hosting services process technical information needed to deliver pages, maintain security, and prevent abuse, which can include your IP address. The administrator area uses a session cookie for authenticated access. External fonts and third-party media, when loaded, can involve requests to their providers. Browser settings allow you to manage cookies; blocking necessary cookies can affect administrator access.'],
      ['Service providers and external links', 'Enquiries are stored through our database infrastructure and acknowledgement emails are processed through our email provider. Hosting and other providers involved in operating the website may process information for those purposes. Links to LinkedIn, Instagram, and other external websites are governed by those websites’ own privacy notices.'],
      ['Retention and security', 'Enquiry records may remain available to our team for follow-up, business record keeping, and applicable legal requirements. No fixed automatic deletion period is stated here. To ask about a record or request its deletion, contact us using the email below. We use measures such as authenticated administrator access, but no internet service can guarantee absolute security.'],
      ['Your choices and requests', 'You can ask about the personal information associated with your enquiry, request a correction or deletion, or withdraw consent for further enquiry-related contact by emailing info@kravsinfotech.com. Requests are considered subject to applicable law and any records we are required to retain. We may need to verify your identity before acting on a request.'],
      ['Changes and contact', 'We may update this notice as the website or our practices change. The date on this page identifies the latest revision. For privacy questions or concerns, contact Kravs Infotech at info@kravsinfotech.com.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro: 'The terms for using the Kravs Infotech website and making enquiries about our digital services.',
    sections: [
      ['Using this website', 'These terms apply to your use of this website. Use it lawfully and provide accurate information when contacting us. Do not attempt unauthorised access, interfere with the website, upload malicious content, or use the forms to send spam or impersonate someone else.'],
      ['Our services and enquiries', 'Kravs Infotech presents services including web development, digital design, SEO, paid advertising, and influencer marketing. Website descriptions are general information. Sending an enquiry or receiving an automated acknowledgement does not confirm a booking, create a project agreement, or guarantee that we can accept the work.'],
      ['Project scope and commercial terms', 'Before work begins, the project scope, deliverables, pricing, payment schedule, timelines, responsibilities, revisions, and any cancellation or refund terms should be agreed in writing. A signed agreement or accepted proposal governs the relevant engagement. These website terms do not replace those project-specific terms.'],
      ['Content and intellectual property', 'Website text, designs, graphics, and branding may be protected by intellectual property rights. Do not reproduce or distribute them without appropriate permission, except where applicable law permits. Ownership and licences for commissioned work, source files, and third-party assets are determined by the relevant project agreement.'],
      ['Results and third-party platforms', 'Search rankings, advertising performance, engagement, and business outcomes depend on factors beyond a single service provider’s control. General descriptions on this website are not guarantees of specific results. External platforms and services have their own terms and may change their features, availability, or requirements.'],
      ['Availability and information', 'We aim to provide useful information, but content can change and the website may occasionally be unavailable. Confirm current service details with our team before relying on them for a project decision. These terms do not exclude rights or protections that cannot lawfully be excluded.'],
      ['Privacy, changes, and contact', 'Please read our Privacy Policy for information about enquiries and website data. We may revise these website terms, with the latest revision date shown here. For questions about the website or a proposed engagement, contact info@kravsinfotech.com.'],
    ],
  },
};

export default function Legal({ type }) {
  const document = documents[type];
  useEffect(() => {
    const previous = window.document.title;
    window.document.title = `${document.title} | Kravs Infotech`;
    return () => { window.document.title = previous; };
  }, [document.title]);

  return <main className="legal-page">
    <div className="legal-container">
      <header className="legal-header">
        <p className="legal-eyebrow">KRAVS INFOTECH · LEGAL</p>
        <h1>{document.title}</h1>
        <p>{document.intro}</p>
        <p className="legal-updated">Last updated: <time dateTime="2026-11-13">13 November 2026</time></p>
      </header>
      <div className="legal-layout">
        <nav className="legal-contents" aria-label="On this page">
          <strong>On this page</strong>
          {document.sections.map(([title], index) => <a href={`#legal-section-${index + 1}`} key={title}>{String(index + 1).padStart(2, '0')} · {title}</a>)}
        </nav>
        <article className="legal-content" aria-label={document.title}>
          {document.sections.map(([title, body], index) => <section key={title} id={`legal-section-${index + 1}`}>
            <h2>{title}</h2><p>{body}</p>
          </section>)}
          <div className="legal-contact"><h2>Get in touch</h2><a href="mailto:info@kravsinfotech.com">info@kravsinfotech.com</a>
            <p><Link to={type === 'privacy' ? '/terms-of-service' : '/privacy-policy'}>{type === 'privacy' ? 'Read our Terms of Service' : 'Read our Privacy Policy'}</Link></p>
          </div>
        </article>
      </div>
    </div>
  </main>;
}
