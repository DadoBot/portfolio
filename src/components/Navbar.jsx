const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Navbar({ activeView, onViewChange, t }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <span className="navbar__name">Davide Andolfi</span>
        <span className="navbar__role">Software Engineer</span>
      </div>

      <div className="nav-toggle" role="tablist" aria-label="Navigation">
        <button
          id="btn-work"
          role="tab"
          className={`nav-toggle__btn${activeView === 'work' ? ' active' : ''}`}
          onClick={() => onViewChange('work')}
          aria-selected={activeView === 'work'}
        >
          {t.nav.work}
        </button>
        <button
          id="btn-about"
          role="tab"
          className={`nav-toggle__btn${activeView === 'about' ? ' active' : ''}`}
          onClick={() => onViewChange('about')}
          aria-selected={activeView === 'about'}
        >
          {t.nav.about}
        </button>
      </div>

      <div className="navbar__links">
        <a
          id="link-linkedin"
          className="navbar__link"
          href="https://www.linkedin.com/in/davide-andolfi-513881253/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.nav.linkedin}
          <ArrowUpRight />
        </a>
        <a
          id="link-github"
          className="navbar__link"
          href="https://github.com/DadoBot"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.nav.github}
          <ArrowUpRight />
        </a>
      </div>
    </nav>
  );
}
