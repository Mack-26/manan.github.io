import { Geist, Geist_Mono, Inter_Tight, Playfair_Display } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/home/SiteHeader';
import { Analytics } from '@vercel/analytics/next';

// Site typeface: Geist for everything, Geist Mono for labels, data and code.
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

// Legacy faces, still used by the older /projects, /blog and /about pages until they're
// rebuilt. Not preloaded, so the homepage doesn't pay for them.
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
});

export const metadata = {
  metadataBase: new URL('https://www.manan-arora.com'),
  title: 'Manan Arora  -  AI Engineer & Researcher',
  description:
    'AI engineer and researcher doing an MS in Electrical & Computer Engineering at the University of Michigan.',
  openGraph: {
    title: 'Manan Arora  -  AI Engineer & Researcher',
    description: 'AI engineer and researcher at the University of Michigan.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${interTight.variable} ${playfair.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
