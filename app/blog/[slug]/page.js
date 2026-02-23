import { posts, getPostBySlug } from '@/data/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Manan Arora`,
    description: post.excerpt,
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Very simple markdown-ish renderer for the blog content
function renderContent(content) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={i}
          style={{
            fontSize: '1.4rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginTop: '2.5rem',
            marginBottom: '0.75rem',
            color: 'var(--fg)',
          }}
        >
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={i}
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginTop: '2rem',
            marginBottom: '0.5rem',
            color: 'var(--fg)',
          }}
        >
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      // Bold paragraph lead
      elements.push(
        <p key={i} style={{ fontWeight: 600, marginBottom: '0.3rem', color: 'var(--fg)' }}>
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.trim() === '') {
      // spacing
      elements.push(<div key={i} style={{ marginBottom: '0.5rem' }} />);
    } else if (line.startsWith('*') && line.endsWith('*')) {
      elements.push(
        <p
          key={i}
          style={{
            fontStyle: 'italic',
            color: 'var(--fg-muted)',
            fontSize: '0.9rem',
            marginTop: '2rem',
          }}
        >
          {line.replace(/\*/g, '')}
        </p>
      );
    } else {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: '1.05rem',
            fontWeight: 300,
            lineHeight: 1.78,
            color: 'var(--fg)',
            marginBottom: '1rem',
          }}
        >
          {line}
        </p>
      );
    }

    i++;
  }

  return elements;
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '8rem' }}>
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        {/* Back */}
        <Link
          href="/blog"
          style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '3rem',
          }}
          className="link-line"
        >
          ← All Posts
        </Link>

        {/* Header */}
        <span
          style={{
            display: 'block',
            fontSize: '0.75rem',
            color: 'var(--fg-faint)',
            marginBottom: '0.75rem',
          }}
        >
          {formatDate(post.date)}
        </span>

        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--fg)',
            marginBottom: '1.25rem',
          }}
        >
          {post.title}
        </h1>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '3rem' }} />

        {/* Content */}
        <article>{renderContent(post.content)}</article>
      </div>
    </main>
  );
}
