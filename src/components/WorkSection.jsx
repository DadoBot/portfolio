import WindowFrame from './WindowFrame';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';

function ScrollIndicator({ label }) {
  return (
    <div className="scroll-indicator" aria-hidden="true">
      <div className="scroll-indicator__arrow">
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
          <path d="M6 1V15M6 15L1 10M6 15L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span>{label}</span>
    </div>
  );
}

export default function WorkSection({ lang, t }) {
  return (
    <section id="work" className="work-section">
      <div className="container">

        {/* Hero */}
        <div className="hero-window fade-in visible">
          <WindowFrame title="davide-andolfi.dev">
            <h1 className="hero-headline">
              {t.hero.line1}<br />
              {t.hero.line2} <em>{t.hero.accent}</em>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <ScrollIndicator label={t.hero.scroll} />
          </WindowFrame>
        </div>

        {/* Projects */}
        <p className="section-label">{t.projects.label}</p>
        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              t={t}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
