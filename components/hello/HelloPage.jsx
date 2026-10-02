'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './hello.module.css';
import { RESUME_URL } from '@/components/home/SiteHeader';
import { LINKS } from '@/components/home/About';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const Icon = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" /></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
  ),
};

export default function HelloPage({ event }) {
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function send(e) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus('error');
      setError(
        email.trim()
          ? 'That email looks incomplete. Check the part after the @.'
          : 'Add your email and I’ll send my links there.'
      );
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), note, event, company: e.target.company.value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Couldn’t send just now. Please try again.');
    }
  }

  return (
    <main className={s.page}>
      <div className={s.intro}>
        <img className={s.avatar} src="/assets/avatar.jpg" alt="Manan on a canyon hike" />
        <div>
          <h1 className={s.title}>Hi, I’m Manan.</h1>
          <p className={s.met}>{event ? `Good to meet you at ${event}.` : 'Good to meet you.'}</p>
        </div>
      </div>

      <p className={s.lede}>
        I’m an AI engineer and researcher at the University of Michigan. I build reinforcement learning and vision
        systems, and I’m looking for AI engineering roles from 2027.
      </p>

      <a className={s.primary} href="/hi/contact.vcf" download onClick={() => setSaved(true)}>
        {saved ? 'Saved. Open it to add me' : 'Save my contact'}
      </a>

      <div className={s.links}>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">{Icon.linkedin}LinkedIn</a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer">{Icon.github}GitHub</a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">{Icon.resume}Résumé</a>
        <a href={`mailto:${LINKS.email}`}>{Icon.mail}Email</a>
      </div>

      <Link href="/#explore" className={s.tour}>
        <span className={s.pitch} aria-hidden="true">
          <span className={s.half} />
          <span className={`${s.dot} ${s.red} ${s.d1}`} style={{ left: '24%', top: '30%' }} />
          <span className={`${s.dot} ${s.red} ${s.d2}`} style={{ left: '38%', top: '60%' }} />
          <span className={`${s.dot} ${s.slate} ${s.d2}`} style={{ left: '66%', top: '36%' }} />
          <span className={`${s.ball} ${s.db}`} style={{ left: '42%', top: '48%' }} />
        </span>
        <span className={s.tourTitle}>Watch my agents learn to pass →</span>
        <span className={s.tourSub}>A one-minute tour of what I build.</span>
      </Link>

      <section className={s.form} aria-labelledby="hello-form-title">
        {status === 'sent' ? (
          <div className={s.sent} role="status">
            <span className={s.sentTitle}>On its way.</span>
            <span>
              I sent my links to {email.trim()}. It should arrive within a minute; if not, check promotions. I’ll
              follow up personally.
            </span>
          </div>
        ) : (
          <form onSubmit={send} noValidate>
            <h2 id="hello-form-title" className={s.formTitle}>Want my links in your inbox?</h2>
            <p className={s.formSub}>I’ll send them now and follow up myself. No newsletter, no list.</p>

            <label htmlFor="hello-email" className={s.label}>Your email</label>
            <input
              id="hello-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={status === 'error' || undefined}
              aria-describedby={status === 'error' ? 'hello-error' : undefined}
              className={s.input}
            />
            {status === 'error' && (
              <span id="hello-error" className={s.error} role="alert">{error}</span>
            )}

            <label htmlFor="hello-note" className={s.label}>
              What did we talk about? <span className={s.optional}>Optional</span>
            </label>
            <textarea
              id="hello-note"
              rows={2}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={s.textarea}
            />
            <span className={s.hint}>Helps me write back about the right thing.</span>

            {/* Honeypot for bots; hidden from people and assistive tech. */}
            <input name="company" tabIndex={-1} autoComplete="off" className={s.trap} aria-hidden="true" />

            <button type="submit" className={s.secondary} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send me your links'}
            </button>
          </form>
        )}
      </section>

      <p className={s.privacy}>Your email goes only to me. I won’t add you to anything.</p>
    </main>
  );
}
