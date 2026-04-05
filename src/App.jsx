import { useState } from 'react';
import Navbar from './components/Navbar';
import WorkSection from './components/WorkSection';
import AboutSection from './components/AboutSection';
import LangToggle from './components/LangToggle';
import en from './i18n/en';
import it from './i18n/it';
import './index.css';

const translations = { en, it };

export default function App() {
  const [activeView, setActiveView] = useState('work');
  const [lang, setLang] = useState('en');

  const t = translations[lang];

  return (
    <>
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        t={t}
      />

      <main className="main-content">
        {activeView === 'work' ? (
          <div key={`work-${lang}`} className="view-enter">
            <WorkSection lang={lang} t={t} />
          </div>
        ) : (
          <div key={`about-${lang}`} className="view-enter">
            <AboutSection t={t} />
          </div>
        )}
      </main>

      <LangToggle lang={lang} onLangChange={setLang} t={t} />
    </>
  );
}
