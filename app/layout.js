import { Inter_Tight, Playfair_Display, Work_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/home/SiteHeader';
import { Analytics } from '@vercel/analytics/next';

// Inter Tight is still used by the older /projects, /blog and /about pages.
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
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
      className={`${interTight.variable} ${playfair.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
