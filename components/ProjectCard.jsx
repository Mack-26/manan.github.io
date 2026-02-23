'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        style={{
          display: 'block',
          padding: '2rem',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: project.type === 'Research' || project.type === 'Research · Published'
            ? 'var(--dark)'
            : '#ffffff',
          color: project.type === 'Research' || project.type === 'Research · Published'
            ? '#ffffff'
            : 'var(--fg)',
          height: '100%',
          transition: 'box-shadow 0.4s, border-color 0.4s, transform 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.1)';
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Type badge */}
        <span style={{
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          fontWeight: 600,
          color: 'var(--accent)',
          display: 'block',
          marginBottom: 'auto',
        }}>
          {project.type}
        </span>

        <div style={{ marginTop: '3rem' }}>
          {project.meta && (
            <span style={{
              fontSize: '0.7rem',
              color: project.type.startsWith('Research') ? 'rgba(255,255,255,0.5)' : 'var(--fg-faint)',
              display: 'block',
              marginBottom: '0.4rem',
            }}>
              {project.meta}
            </span>
          )}

          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '0.6rem',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '0.85rem',
            lineHeight: 1.65,
            fontWeight: 300,
            color: project.type.startsWith('Research') ? 'rgba(255,255,255,0.55)' : 'var(--fg-muted)',
            marginBottom: '1.2rem',
          }}>
            {project.summary}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.65rem',
                padding: '0.28rem 0.65rem',
                border: `1px solid ${project.type.startsWith('Research') ? 'rgba(255,255,255,0.15)' : 'var(--border)'}`,
                borderRadius: '100px',
                color: project.type.startsWith('Research') ? 'rgba(255,255,255,0.6)' : 'var(--fg-muted)',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
