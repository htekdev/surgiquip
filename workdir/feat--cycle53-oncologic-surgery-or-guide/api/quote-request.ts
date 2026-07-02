// Vercel serverless function — quote request / contact handler
// Delivers form submissions to info@surgiquipsolutions.com via Resend API.
//
// Required env var: RESEND_API_KEY  (add to Vercel project → Settings → Environment Variables)
//   From email:  Surgiquip Website <noreply@htek.dev>      (htek.dev is Hector's verified Resend domain)
//   To email:    info@surgiquipsolutions.com               (update to Carla's direct email after first meeting)
//
// Graceful fallback: if RESEND_API_KEY is not set, logs payload and redirects normally.
// This prevents a hard error during development / before the env var is provisioned.

export const config = { runtime: 'edge' };

const TO_EMAIL = 'info@surgiquipsolutions.com';
const FROM_EMAIL = 'Surgiquip Website <noreply@htek.dev>';

function buildEmailHtml(p: {
  name: string;
  email: string;
  organization: string;
  phone: string;
  interest: string;
  timeline: string;
  message: string;
  source: string;
  ts: string;
}): string {
  const label = p.source === 'contact' ? 'Contact Message' : 'Quote Request';
  const submittedAt = new Date(p.ts).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const row = (key: string, val: string) =>
    val
      ? `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e9f0;font-size:12px;font-weight:bold;text-transform:uppercase;color:#5b6b85;width:130px;vertical-align:top">${key}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e9f0;color:#0f1729">${val}</td>
        </tr>`
      : '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f7f9fc">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="background:#0a2c5e;padding:24px 32px;border-radius:6px 6px 0 0">
    <div style="font-size:18px;font-weight:bold;color:#ffffff">New ${label}</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:4px">Surgiquip Solutions Website · ${submittedAt} CT</div>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#ffffff;padding:32px;border:1px solid #e5e9f0;border-top:none">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Name', p.name)}
      ${row('Email', `<a href="mailto:${p.email}" style="color:#1e6fd9">${p.email}</a>`)}
      ${row('Facility', p.organization)}
      ${row('Phone', p.phone)}
      ${row('Interest', p.interest)}
      ${row('Timeline', p.timeline)}
      <tr>
        <td style="padding:16px 0 8px;font-size:12px;font-weight:bold;text-transform:uppercase;color:#5b6b85;vertical-align:top">Message</td>
        <td style="padding:16px 0 8px;color:#0f1729;white-space:pre-wrap">${p.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      </tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f7f9fc;padding:14px 32px;border:1px solid #e5e9f0;border-top:none;border-radius:0 0 6px 6px;font-size:11px;color:#5b6b85">
    Submitted via surgiquipsolutions.com &nbsp;·&nbsp; Reply to this email to respond to ${p.name.split(' ')[0] || p.name}
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const form = await request.formData();

    // Honeypot — bots fill the hidden "website" field
    if (form.get('website')) {
      return Response.redirect(new URL('/thank-you', request.url), 303);
    }

    const payload = {
      name:         String(form.get('name')         ?? '').trim(),
      email:        String(form.get('email')        ?? '').trim(),
      organization: String(form.get('organization') ?? '').trim(),
      phone:        String(form.get('phone')        ?? '').trim(),
      interest:     String(form.get('interest')     ?? '').trim(),
      timeline:     String(form.get('timeline')     ?? '').trim(),
      message:      String(form.get('message')      ?? '').trim(),
      source:       String(form.get('source')       ?? 'quote').trim(),
      ts:           new Date().toISOString(),
    };

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const isQuote = payload.source !== 'contact';
      const subject = isQuote
        ? `New Quote Request — ${payload.organization || payload.name} | Surgiquip`
        : `New Contact Message — ${payload.name} | Surgiquip`;

      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:     FROM_EMAIL,
          to:       [TO_EMAIL],
          reply_to: payload.email,
          subject,
          html:     buildEmailHtml(payload),
        }),
      });

      if (!resp.ok) {
        const body = await resp.text();
        console.error('[quote-request] Resend error', resp.status, body);
        // Still redirect — don't surface a raw 500 to the visitor
      }
    } else {
      // Dev / staging — no API key provisioned yet
      console.warn('[quote-request] RESEND_API_KEY not set — submission not delivered via email');
      console.log('[quote-request] payload:', JSON.stringify(payload));
    }

    return Response.redirect(new URL('/thank-you', request.url), 303);
  } catch (err) {
    console.error('[quote-request] fatal', err);
    return new Response('Submission failed. Please call (713) 681-6362.', { status: 500 });
  }
}
