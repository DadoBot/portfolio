import WindowFrame from './WindowFrame';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';

function ScrollIndicator({ label }) {
  const handleClick = () => {
    document.getElementById('projects-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <button type="button" className="scroll-indicator" onClick={handleClick}>
      <span className="scroll-indicator__arrow" aria-hidden="true">
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
          <path d="M6 1V15M6 15L1 10M6 15L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{label}</span>
    </button>
  );
}

const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WorkSection({ lang, t }) {
  return (
    <section id="work" className="work-section">
      <div className="container">

        {/* Hero */}
        <div className="hero-window fade-in visible">
          <div className="hero-card" style={{ padding: '12px 12px 0 12px' }}>
            <WindowFrame title="" className="hero-inner-frame">
              <h1 className="hero-headline">
                {t.hero.line1}<br />
                {t.hero.line2} <em>{t.hero.accent}</em>
              </h1>
              <p className="hero-sub">{t.hero.sub}</p>
              <ScrollIndicator label={t.hero.scroll} />
            </WindowFrame>
          </div>
        </div>

        {/* Projects */}
        <p className="section-label">{t.projects.label}</p>
        <div id="projects-list" className="projects-list">
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

        {/* Closing CTA */}
        <div className="work-cta">
          <p className="pw-eyebrow">{t.contact.eyebrow}</p>
          <h2 className="work-cta__title">{t.contact.title}</h2>
          <p className="work-cta__text">{t.contact.text}</p>
          <a className="work-cta__button" href="mailto:davide.andolfi.lavoro@gmail.com">
            {t.contact.cta}
            <ArrowUpRight />
          </a>
        </div>

      </div>
    </section>
  );
}
