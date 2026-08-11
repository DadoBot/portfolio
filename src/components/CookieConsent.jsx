import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getStoredConsent, setStoredConsent, loadGoogleAnalytics } from '../lib/analytics';

export default function CookieConsent({ t }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === 'granted') {
      loadGoogleAnalytics();
    } else if (consent !== 'denied') {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setStoredConsent('granted');
    loadGoogleAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    setStoredConsent('denied');
    setVisible(false);
  };

  if (!visible) return null;

  return createPortal(
    <div className="cookie-consent-overlay">
      <div className="cookie-consent" role="dialog" aria-modal="true" aria-live="polite">
        <p className="cookie-consent__text">{t.cookies.text}</p>
        <div className="cookie-consent__actions">
          <button className="cookie-consent__btn cookie-consent__btn--reject" onClick={handleReject}>
            {t.cookies.reject}
          </button>
          <button className="cookie-consent__btn cookie-consent__btn--accept" onClick={handleAccept}>
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
