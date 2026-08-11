// Google Analytics 4 loader, gated behind user cookie consent.

export const GA_MEASUREMENT_ID = 'G-Y9NP29XBGJ';
const CONSENT_KEY = 'cookie-consent';

let gaLoaded = false;

export function getStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setStoredConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage unavailable (e.g. private mode) — consent won't persist, safe to ignore.
  }
}

export function loadGoogleAnalytics() {
  if (gaLoaded || typeof window === 'undefined') return;
  gaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}
