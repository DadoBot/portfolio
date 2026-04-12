import { useEffect, useRef } from 'react';
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
    <section id="about" className="about-section pw-layout">
      <div className="container" style={{ maxWidth: '1000px' }}>

        {/* Top Intro Section */}
        <FadeBlock delay={0}>
          <div className="pw-hero">
            <p className="pw-eyebrow">
              <span className="window-dot" style={{ background: '#fff', width: '6px', height: '6px', display: 'inline-block', marginRight: '10px' }}></span>
              {t.about.eyebrow}
            </p>
            <h1 className="pw-headline">
              {t.about.headline_1} <em>{t.about.headline_2}</em>
            </h1>
          </div>
        </FadeBlock>

        {/* Double Column Editorial Grid */}
        <FadeBlock delay={0.1}>
          <div className="double-column-block info-hero">
            {/* Left Column */}
            <div className="col-left">
              <div className="pw-img-wrap block-about-photo">
                <img src={aboutPhoto} alt="Davide Andolfi" className="pw-img" />
              </div>

              <div className="pw-text-wrap block-mission-text" style={{ marginTop: '100px' }}>
                <h3 className="pw-h3">{t.about.mission_title}</h3>
                <p className="pw-p">{t.about.mission_text}</p>
              </div>
              
              <div className="pw-img-wrap block-volunt-photo" style={{ marginTop: '80px' }}>
                <img src={volunteeringPhoto} alt="Volunteering" className="pw-img" />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-right">
              <div className="pw-text-wrap block-about-bio">
                <p className="pw-p pw-p--large">{t.about.bio}</p>
              </div>

              <div className="pw-img-wrap block-mission-photo" style={{ marginTop: '80px' }}>
                <img src={missionPhoto} alt="Mission" className="pw-img" />
              </div>

              <div className="pw-text-wrap block-volunt-text" style={{ marginTop: '160px' }}>
                <h3 className="pw-h3">{t.about.volunteering_title}</h3>
                <p className="pw-p">{t.about.volunteering_text}</p>
              </div>
            </div>
          </div>
        </FadeBlock>

        {/* Footer info: Interests & Social */}
        <FadeBlock delay={0.4}>
          <div className="pw-footer">
            <div className="pw-footer-col">
              <p className="pw-eyebrow">{t.about.interests_label}</p>
              <div className="pw-interests">
                {t.about.interests.map((item, i) => (
                  <span key={i} className="pw-interest-tag">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="pw-footer-col">
              <p className="pw-eyebrow">{t.about.connect}</p>
              <div className="pw-socials">
                <a className="pw-social-link" href="https://www.linkedin.com/in/davide-andolfi-513881253/" target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowUpRight />
                </a>
                <a className="pw-social-link" href="https://github.com/DadoBot" target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight />
                </a>
                <a className="pw-social-link" href="https://www.instagram.com/giandolf_34/" target="_blank" rel="noopener noreferrer">
                  Instagram <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </FadeBlock>

      </div>
    </section>
  );
}
