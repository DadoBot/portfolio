import { useEffect, useRef } from 'react';
import WindowFrame from './WindowFrame';
import aboutPhoto from '../assets/images/about-photo.png';
import volunteeringPhoto from '../assets/images/about-volunteering.png';
import missionPhoto from '../assets/images/about-mission.png';

const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function FadeBlock({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function AboutSection({ t }) {
  return (
    <section id="about" className="about-section">
      <div className="container">

        {/* Top grid: photo + intro */}
        <FadeBlock delay={0}>
          <div className="about-grid">
            <div className="about-photo-frame window-frame">
              <div className="window-frame__header">
                <span className="window-dot window-dot--red" aria-hidden="true" />
                <span className="window-dot window-dot--yellow" aria-hidden="true" />
                <span className="window-dot window-dot--green" aria-hidden="true" />
                <span className="window-frame__title">profile.jpg</span>
              </div>
              <div className="window-frame__body" style={{ padding: 0 }}>
                <img src={aboutPhoto} alt="Davide Andolfi" className="about-photo" />
              </div>
            </div>

            <div className="about-intro-frame window-frame">
              <div className="window-frame__header">
                <span className="window-dot window-dot--red" aria-hidden="true" />
                <span className="window-dot window-dot--yellow" aria-hidden="true" />
                <span className="window-dot window-dot--green" aria-hidden="true" />
                <span className="window-frame__title">readme.md</span>
              </div>
              <div className="window-frame__body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p className="about-eyebrow">{t.about.eyebrow}</p>
                <h1 className="about-headline">
                  {t.about.headline_1} <em>{t.about.headline_2}</em> —<br />
                  {t.about.headline_accent}
                </h1>
                <p className="about-bio">{t.about.bio}</p>
              </div>
            </div>
          </div>
        </FadeBlock>

        {/* Mission + Volunteering */}
        <FadeBlock delay={0.1}>
          <div className="about-blocks">
            {/* Mission Text */}
            <WindowFrame title="mission.md">
              <div className="about-block-icon">{t.about.mission_icon}</div>
              <h3>{t.about.mission_title}</h3>
              <p>{t.about.mission_text}</p>
            </WindowFrame>

            {/* Mission Image */}
            <div className="window-frame">
              <div className="window-frame__header">
                <span className="window-dot window-dot--red" aria-hidden="true" />
                <span className="window-dot window-dot--yellow" aria-hidden="true" />
                <span className="window-dot window-dot--green" aria-hidden="true" />
                <span className="window-frame__title">mission.jpg</span>
              </div>
              <div className="window-frame__body" style={{ padding: 0, height: '100%', display: 'flex' }}>
                <img src={missionPhoto} alt="Mission and Vision" style={{ width: '100%', height: '100%', minHeight: '260px', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

            {/* Volunteering Image */}
            <div className="window-frame">
              <div className="window-frame__header">
                <span className="window-dot window-dot--red" aria-hidden="true" />
                <span className="window-dot window-dot--yellow" aria-hidden="true" />
                <span className="window-dot window-dot--green" aria-hidden="true" />
                <span className="window-frame__title">volunteering.jpg</span>
              </div>
              <div className="window-frame__body" style={{ padding: 0, height: '100%', display: 'flex' }}>
                <img src={volunteeringPhoto} alt="Volunteering at Centro Marvelli" style={{ width: '100%', height: '100%', minHeight: '260px', objectFit: 'cover', display: 'block', objectPosition: 'center 20%' }} />
              </div>
            </div>

            {/* Volunteering Text */}
            <WindowFrame title="volunteering.md">
              <div className="about-block-icon">{t.about.volunteering_icon}</div>
              <h3>{t.about.volunteering_title}</h3>
              <p>{t.about.volunteering_text}</p>
            </WindowFrame>
          </div>
        </FadeBlock>

        {/* Interests */}
        <FadeBlock delay={0.15}>
          <div className="window-frame interests-frame">
            <div className="window-frame__header">
              <span className="window-dot window-dot--red" aria-hidden="true" />
              <span className="window-dot window-dot--yellow" aria-hidden="true" />
              <span className="window-dot window-dot--green" aria-hidden="true" />
              <span className="window-frame__title">interests.json</span>
            </div>
            <div className="window-frame__body">
              <p className="interests-title">{t.about.interests_label}</p>
              <div className="interests-grid">
                {t.about.interests.map((item, i) => (
                  <span key={i} className="interest-tag">
                    <span aria-hidden="true">{item.emoji}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeBlock>

        {/* Social links */}
        <FadeBlock delay={0.2}>
          <div className="social-links-frame window-frame">
            <div className="window-frame__header">
              <span className="window-dot window-dot--red" aria-hidden="true" />
              <span className="window-dot window-dot--yellow" aria-hidden="true" />
              <span className="window-dot window-dot--green" aria-hidden="true" />
              <span className="window-frame__title">{t.about.connect}</span>
            </div>
            <div className="window-frame__body" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <a
                id="about-linkedin"
                className="social-link"
                href="https://www.linkedin.com/in/davide-andolfi-513881253/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <ArrowUpRight />
              </a>
              <a
                id="about-github"
                className="social-link"
                href="https://github.com/DadoBot"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ArrowUpRight />
              </a>
              <a
                id="about-instagram"
                className="social-link"
                href="https://www.instagram.com/giandolf_34/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ArrowUpRight />
              </a>
            </div>
          </div>
        </FadeBlock>

      </div>
    </section>
  );
}
