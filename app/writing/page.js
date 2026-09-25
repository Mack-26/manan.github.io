import StubPage from '@/components/home/StubPage';

export const metadata = { title: 'Writing · Manan Arora' };

export default function Writing() {
  return (
    <StubPage
      kicker="Writing"
      title="Writing"
      blurb="Notes on what I’m learning and building. This page is on its way."
      archive={{ href: '/blog', label: 'Read existing posts' }}
    />
  );
}
