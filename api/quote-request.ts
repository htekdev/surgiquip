// Vercel serverless function — quote request handler
// TODO: wire to email (Resend/Postmark/SES) once Lance confirms delivery destination.
// For now: logs payload and redirects to /thank-you.

export const config = { runtime: 'edge' };

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const form = await request.formData();

    // Honeypot
    if (form.get('website')) {
      return Response.redirect(new URL('/thank-you', request.url), 303);
    }

    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      organization: form.get('organization'),
      phone: form.get('phone'),
      interest: form.get('interest'),
      message: form.get('message'),
      ts: new Date().toISOString(),
    };

    // TODO: send via Resend/Postmark/SES to info@surgiquipsolutions.com + Carla
    console.log('[quote-request]', JSON.stringify(payload));

    return Response.redirect(new URL('/thank-you', request.url), 303);
  } catch (err) {
    console.error('[quote-request] error', err);
    return new Response('Submission failed. Please call (713) 681-6362.', { status: 500 });
  }
}
