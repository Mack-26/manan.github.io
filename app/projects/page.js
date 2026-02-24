import { projects } from '@/data/projects';
import Link from 'next/link';

export const metadata = {
  title: 'Projects  -  Manan Arora',
  description: 'Research and engineering projects by Manan Arora  -  AI, ML, sustainability, and more.',
};

export default function ProjectsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingTop: '7rem',
        paddingBottom: '6rem',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Selected Work</span>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginTop: '0.75rem',
              color: 'var(--text)',
            }}
          >
            Projects &amp;{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Research</span>
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--fg-muted)',
              fontWeight: 300,
              maxWidth: '460px',
              marginTop: '1rem',
              lineHeight: 1.7,
            }}
          >
            AI systems, published research, and engineering  -  spanning ML,
            sustainability, and data infrastructure.
          </p>
        </div>

        {/* Project list */}
        <div>
          {/* Top rule */}
          <div style={{ borderTop: '1px solid var(--border)', marginBottom: 0 }} />

          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProjectRow({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="proj-row"
    >
      {/* Top line: badge + meta + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
        <span
          style={{
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontWeight: 700,
            color: 'var(--accent)',
            background: 'rgba(255, 97, 26, 0.09)',
            padding: '0.25rem 0.7rem',
            borderRadius: '100px',
            flexShrink: 0,
          }}
        >
          {project.type}
        </span>
        {project.meta && (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--fg-faint)',
              fontWeight: 400,
            }}
          >
            {project.meta}
          </span>
        )}
      </div>

      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '0.65rem' }}>
        <h3
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: 'var(--text)',
          }}
        >
          {project.title}
        </h3>
        <span
          className="proj-row-arrow"
          style={{
            fontSize: '1.2rem',
            color: 'var(--fg-faint)',
            flexShrink: 0,
            marginTop: '0.1rem',
            transition: 'transform 0.25s, color 0.25s',
            display: 'inline-block',
          }}
        >
          →
        </span>
      </div>

      {/* Summary */}
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.7,
          fontWeight: 300,
          color: 'var(--fg-muted)',
          maxWidth: '680px',
          marginBottom: '1.1rem',
        }}
      >
        {project.summary}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '0.67rem',
              padding: '0.28rem 0.7rem',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              color: 'var(--fg-muted)',
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom rule */}
      <div className="proj-row-rule" />
    </Link>
  );
}
