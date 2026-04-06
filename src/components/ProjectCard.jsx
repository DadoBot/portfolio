import { useState, useEffect, useRef } from 'react';
import WindowFrame from './WindowFrame';

function PlusIcon({ open }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ transition: 'transform 0.3s ease', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
    >
      <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function ProjectCard({ project, lang, t, index }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  const data = project[lang];

  // Fade-in on scroll
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      id={`project-${project.id}`}
      ref={cardRef}
      className="project-card fade-in"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Header — always visible */}
      <div
        className="project-card__header"
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
      >
        <div>
          <p className="project-card__meta">{data.meta}</p>
          <h2 className="project-card__title">{data.title}</h2>
          <p className="project-card__tagline">{data.tagline}</p>
        </div>
        <div className={`project-card__toggle${open ? ' open' : ''}`} aria-hidden="true">
          <PlusIcon open={open} />
        </div>
      </div>

      {/* Project image */}
      <div className={`project-card__image-wrap ${open ? 'open' : ''}`}>
        <div className="project-card__image-frame window-frame">
          <div className="window-frame__header">
            <span className="window-dot window-dot--red"  aria-hidden="true" />
            <span className="window-dot window-dot--yellow" aria-hidden="true" />
            <span className="window-dot window-dot--green"  aria-hidden="true" />
            <span className="window-frame__title"></span>
          </div>
          <div className="window-frame__body" style={{ padding: 0 }}>
            <img
              src={project.image}
              alt={project.imageAlt}
              className="project-card__img"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {open && (
        <div className="project-card__details">
          <div className="project-detail-grid">
            <div className="project-detail-block">
              <h4>{t.projects.role}</h4>
              <p>{data.role}</p>
            </div>
            <div className="project-detail-block">
              <h4>{t.projects.approach}</h4>
              <p>{data.approach}</p>
            </div>
          </div>

          <div className="project-detail-block">
            <h4>{t.projects.learnings}</h4>
            <ul className="project-learnings">
              {data.learnings.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="tech-tags">
            {project.tech.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom padding when collapsed */}
      {!open && <div style={{ height: 32 }} />}
    </article>
  );
}
