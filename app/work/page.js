import StubPage from '@/components/home/StubPage';

export const metadata = { title: 'Work · Manan Arora' };

export default function Work() {
  return (
    <StubPage
      kicker="Work"
      title="Work"
      blurb="Things I’ve built, written up properly. This page is on its way."
      archive={{ href: '/projects', label: 'Browse current projects' }}
    />
  );
}
