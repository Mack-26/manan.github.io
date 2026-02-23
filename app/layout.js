import { Inter_Tight, Playfair_Display } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Manan Arora — AI Engineer & Researcher',
  description:
    'AI Engineer and MS student at University of Michigan. Building intelligent systems, researching ML for sustainability.',
  openGraph: {
    title: 'Manan Arora — AI Engineer & Researcher',
    description:
      'AI Engineer and MS student at University of Michigan.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interTight.variable} ${playfair.variable}`}>
      <body
        style={{ fontFamily: 'var(--font-inter-tight), -apple-system, sans-serif' }}
      >
        {/* Grain texture */}
        <div className="grain" aria-hidden="true" />

        <Nav />

        {children}
      </body>
    </html>
  );
}
