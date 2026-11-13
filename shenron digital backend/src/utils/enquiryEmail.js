function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function enquiryEmail(name) {
  const paragraphs = [
    'Thank you for reaching out to Kravs Infotech!',
    'Our team will review your requirements and get in touch to discuss your goals, answer your questions, and explore the right next steps for your project.',
    'Thank you for considering Kravs Infotech as your digital partner. We look forward to exploring what we can create together.',
    'Here’s to your next chapter of digital growth!',
  ];
  const highlight = text => escapeHtml(text).replaceAll('Kravs Infotech', '<strong style="color:#693bff;background-color:#f0e9ff;padding:2px 4px;">Kravs Infotech</strong>');
  return {
    subject: 'Thank you for connecting with Kravs Infotech!',
    text: `Dear ${name},\n\n${paragraphs.join('\n\n')}\n\nBest regards,\nTeam Kravs Infotech\nThink beyond. Build together.`,
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Thank you for connecting with Kravs Infotech</title></head>
<body style="margin:0;padding:24px 12px;background-color:#f7f3eb;font-family:Arial,Helvetica,sans-serif;color:#24212c;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e9e1f0;border-radius:16px;">
      <tr><td style="padding:28px 28px 22px;border-bottom:1px solid #eee7f5;">
        <strong style="font-size:24px;color:#693bff;">Kravs Infotech</strong>
        <p style="margin:8px 0 0;font-size:12px;color:#71697d;">Think beyond. Build together.</p>
      </td></tr>
      <tr><td style="padding:28px;font-size:15px;line-height:1.7;">
        <h1 style="margin:0 0 20px;font-size:22px;line-height:1.4;color:#17131f;">Dear ${escapeHtml(name)},</h1>
        ${paragraphs.map(paragraph => `<p style="margin:0 0 18px;">${highlight(paragraph)}</p>`).join('\n        ')}
        <p style="margin:26px 0 0;">Best regards,<br>Team <strong style="color:#693bff;background-color:#f0e9ff;padding:2px 4px;">Kravs Infotech</strong></p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`,
  };
}
