export default function LangToggle({ lang, onLangChange, t }) {
  return (
    <div className="lang-toggle" role="group" aria-label="Language selector">
      <button
        id="btn-lang-en"
        className={`lang-toggle__btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => onLangChange('en')}
        aria-pressed={lang === 'en'}
      >
        {t.lang.en}
      </button>
      <button
        id="btn-lang-it"
        className={`lang-toggle__btn${lang === 'it' ? ' active' : ''}`}
        onClick={() => onLangChange('it')}
        aria-pressed={lang === 'it'}
      >
        {t.lang.it}
      </button>
    </div>
  );
}
