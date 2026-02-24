import { projects, getProjectBySlug } from '@/data/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title}  -  Manan Arora`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const isResearch = project.type.startsWith('Research');

  return (
    <main style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '8rem' }}>
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        {/* Back */}
        <Link
          href="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '3rem',
          }}
          className="link-line"
        >
          ← All Projects
        </Link>

        {/* Type badge */}
        <span
          style={{
            display: 'block',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: 600,
            color: 'var(--accent)',
            marginBottom: '0.75rem',
          }}
        >
          {project.type}
        </span>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
            color: 'var(--fg)',
          }}
        >
          {project.title}
        </h1>

        {project.meta && (
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--fg-faint)',
              marginBottom: '1rem',
            }}
          >
            {project.meta}
          </p>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '3rem' }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '3rem' }} />

        {/* Problem */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--fg-faint)',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            Problem
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--fg)',
            }}
          >
            {project.problem}
          </p>
        </section>

        {/* Solution */}
        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--fg-faint)',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            {isResearch ? 'Approach' : 'Solution'}
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--fg)',
            }}
          >
            {project.solution}
          </p>
        </section>

        {/* Artifact (image) */}
        {project.artifact && project.artifact.type === 'image' && (
          <section style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--fg-faint)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Architecture
            </h2>
            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: project.artifact.darkBg ? '#0e1525' : 'transparent',
              }}
            >
              <img
                src={project.artifact.src}
                alt={project.artifact.alt}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </section>
        )}

        {/* HTML artifact (interactive embed) */}
        {project.htmlArtifact && (
          <section style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--fg-faint)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              {project.htmlArtifact.title || 'Interactive Diagram'}
            </h2>
            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <iframe
                src={project.htmlArtifact.src}
                title={project.htmlArtifact.title || 'Interactive diagram'}
                style={{
                  width: '100%',
                  height: '720px',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
          </section>
        )}

        {/* Videos (e.g. SO101 robot) */}
        {project.videos && project.videos.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--fg-faint)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Videos
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {project.videos.map((v, i) => (
                <div key={i}>
                  {v.label && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', marginBottom: '0.4rem', letterSpacing: '0.03em' }}>
                      {v.label}
                    </p>
                  )}
                  <video
                    src={v.src}
                    controls
                    playsInline
                    style={{
                      width: '100%', borderRadius: 12,
                      border: '1px solid var(--border)', background: '#000',
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Code note (for VLM research etc.) */}
        {project.codeNote && (
          <div
            style={{
              padding: '1rem 1.25rem',
              background: '#fafafa',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'var(--fg-muted)',
              marginBottom: '2rem',
            }}
          >
            ℹ️ {project.codeNote}
          </div>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--fg-faint)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Links
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--accent)',
                  }}
                  className="link-line"
                >
                  {link.label} {link.external ? '↗' : '→'}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
