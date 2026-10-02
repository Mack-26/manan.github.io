// Receives the optional "send me your links" form on /hi and forwards it to the
// Google Apps Script web app (tools/hello-sheet), which logs it to a Sheet and sends
// both emails. The shared secret keeps anyone else from writing to the Sheet directly.

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Best-effort burst limit per IP. Serverless instances don't share memory, so the
// Apps Script also enforces a per-email cooldown and a daily cap.
const recent = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function limited(ip) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const reply = (status, body) => Response.json(body, { status });

export async function POST(request) {
  const url = process.env.HELLO_WEBHOOK_URL;
  const secret = process.env.HELLO_WEBHOOK_SECRET;
  if (!url || !secret) {
    return reply(503, { ok: false, error: 'Email isn’t set up yet. Use Save my contact instead.' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return reply(400, { ok: false, error: 'Something went wrong. Please try again.' });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body.company) return reply(200, { ok: true });

  const email = String(body.email || '').trim().slice(0, 254);
  if (!EMAIL.test(email)) {
    return reply(400, { ok: false, error: 'That email looks incomplete. Check the part after the @.' });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return reply(429, { ok: false, error: 'Too many tries. Give it a few minutes.' });
  }

  const payload = {
    secret,
    email,
    note: String(body.note || '').slice(0, 500),
    event: String(body.event || '').slice(0, 80),
    userAgent: (request.headers.get('user-agent') || '').slice(0, 200),
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || `webhook ${res.status}`);
    return reply(200, { ok: true });
  } catch (err) {
    console.error('[hello] webhook failed:', err.message);
    return reply(502, { ok: false, error: 'Couldn’t send just now. Save my contact instead, and I’ll find you.' });
  }
}
