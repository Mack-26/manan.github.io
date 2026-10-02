import HelloPage from '@/components/hello/HelloPage';

// The page people land on after scanning the QR code at an event.
// /hi?e=Some%20Event shows "Good to meet you at Some Event."
export const metadata = {
  title: 'Hi, I’m Manan',
  description: 'Good to meet you. Save my contact, or get my links in your inbox.',
  robots: { index: false, follow: false },
};

export default async function Hi({ searchParams }) {
  const sp = await searchParams;
  const raw = typeof sp?.e === 'string' ? sp.e : typeof sp?.event === 'string' ? sp.event : '';
  const event = raw.replace(/\s+/g, ' ').trim().slice(0, 80);
  return <HelloPage event={event} />;
}
