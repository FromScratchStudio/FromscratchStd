/**
 * lang.js — i18n module
 *
 * UI strings are stored inline (rather than loaded from an external JSON)
 * so that translations are applied synchronously on first render with no
 * network round-trip or risk of a text-flash before labels appear.
 *
 * To add a new language: add a matching key block to `translations` below
 * and a <button class="lang-btn" data-lang="…"> element in index.html.
 */

const translations = {
  fr: {
    'nav.studio':   'FromScratch Studio...',
    'nav.stories':  'FromScratch Stories...',
    'nav.records':  'FromScratch Records...',
    'nav.contact':  'Nous contacter',
    'mute.aria':    'Activer la musique',
    'unmute.aria':  'Désactiver la musique',
    'popup.close':  'Fermer',
    'loader.label': 'Chargement...',
  },
  en: {
    'nav.studio':   'FromScratch Studio...',
    'nav.stories':  'FromScratch Stories...',
    'nav.records':  'FromScratch Records...',
    'nav.contact':  'Contact Us',
    'mute.aria':    'Enable music',
    'unmute.aria':  'Disable music',
    'popup.close':  'Close',
    'loader.label': 'Loading...',
  },
};

let currentLang = 'en';

/**
 * Switch the active language.
 * @param {string} code - 'fr' or 'en'
 */
export function setLang(code) {
  if (!translations[code]) return;
  currentLang = code;

  // Update <html> attributes so CSS [data-lang] selectors work too
  document.documentElement.setAttribute('lang', code);
  document.documentElement.setAttribute('data-lang', code);

  // Swap every element that declares a translation key
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = translations[code][key];
    if (value !== undefined) el.textContent = value;
  });

  // Update active state on language buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === code;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

/** Return the current language code. */
export function getLang() {
  return currentLang;
}

/**
 * Translate a single key in the current language.
 * Falls back to the key itself when not found.
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  return translations[currentLang]?.[key] ?? key;
}
