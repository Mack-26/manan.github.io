import { posts } from '@/data/posts';
import Link from 'next/link';

export const metadata = {
  title: 'Blog  -  Manan Arora',
  description: 'Writing on AI, research, building, and what comes next.',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '6rem' }}>
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="section-label">Writing</span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginTop: '0.75rem',
              color: 'var(--fg)',
            }}
          >
            Thoughts on AI,
            <br />
            building &amp; what&apos;s next.
          </h1>
        </div>

        {/* Post list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-row"
              style={{
                borderBottom: i === posts.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: 'var(--fg)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--fg-muted)',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      maxWidth: '520px',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '0.4rem',
                      flexWrap: 'wrap',
                      marginTop: '0.75rem',
                    }}
                  >
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--fg-faint)',
                    whiteSpace: 'nowrap',
                    marginTop: '0.25rem',
                  }}
                >
                  {formatDate(post.date)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
