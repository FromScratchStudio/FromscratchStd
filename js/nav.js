/**
 * nav.js — navigation & popup management
 *
 * Handles:
 *  - Side nav item clicks  → open the matching popup section
 *  - Circle orbit clicks   → open the matching popup section
 *  - Popup close button    → close popup
 *  - Outside-click         → close popup (if click outside nav + popup)
 *  - Keyboard (Escape)     → close popup
 */

import { getLang } from './lang.js';

let currentSection = '';
let popupEl        = null;
let contentEl      = null;
let closeBtn       = null;

/** Initialise nav; must be called after DOMContentLoaded. */
export function initNav() {
  popupEl   = document.getElementById('popup');
  contentEl = document.getElementById('popup-content');
  closeBtn  = document.getElementById('popup-close');

  if (!popupEl || !contentEl || !closeBtn) return;

  // Close button
  closeBtn.addEventListener('click', closePopup);

  // Side nav items
  document.querySelectorAll('#side-nav .nav-item[data-section]').forEach((item) => {
    const btn = item.querySelector('.nav-icon');
    if (btn) {
      btn.addEventListener('click', () => openPopup(item.dataset.section));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPopup(item.dataset.section);
        }
      });
    }
  });

  // Circle orbits in the intro
  document.querySelectorAll('.circle-orbit[data-section]').forEach((circle) => {
    circle.addEventListener('click', () => openPopup(circle.dataset.section));
    circle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPopup(circle.dataset.section);
      }
    });
  });

  // Outside-click closes popup
  document.addEventListener('click', _onDocumentClick);

  // Keyboard Escape closes popup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });
}

/**
 * Open a popup for the given section name.
 * Clicking the same section again while open will close it.
 * @param {string} section  - e.g. 'fromScratchStudio'
 */
export async function openPopup(section) {
  if (section === currentSection) {
    closePopup();
    return;
  }

  const lang = getLang();
  const path = _sectionPath(section, lang);

  if (!path) return;

  // Clear previous content while loading
  contentEl.innerHTML = '';
  popupEl.classList.add('is-open');
  popupEl.setAttribute('aria-hidden', 'false');
  currentSection = section;

  try {
    const res  = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    contentEl.innerHTML = _extractBody(html);
    contentEl.scrollTop = 0;
  } catch (err) {
    console.error('Nav: could not load section', path, err);
    contentEl.innerHTML = '<p>Content unavailable.</p>';
  }
}

/** Close the popup panel. */
export function closePopup() {
  if (!popupEl) return;
  popupEl.classList.remove('is-open');
  popupEl.setAttribute('aria-hidden', 'true');
  currentSection = '';
  if (contentEl) contentEl.innerHTML = '';
}

/**
 * Re-open the current section in the new language (called by lang switch).
 * Does nothing if the popup is not currently open.
 */
export async function refreshPopupLang() {
  if (!currentSection) return;
  const section = currentSection;
  currentSection = ''; // allow re-open of same section
  await openPopup(section);
}

/* ------------------------------------------------------------------ */

function _sectionPath(section, lang) {
  const map = {
    fromScratchStudio:   `sections/${lang.toUpperCase()}/fromscratchstudio.html`,
    fromScratchPictures: `sections/${lang.toUpperCase()}/fromscratchpictures.html`,
    fromScratchRecords:  `sections/${lang.toUpperCase()}/fromscratchrecords.html`,
  };
  return map[section] ?? null;
}

/**
 * Parse the full HTML file from the sections/ folder and return
 * just the inner HTML of <body>, stripping the outer page scaffolding.
 * @param {string} html  - full HTML string
 * @returns {string}
 */
function _extractBody(html) {
  const doc  = new DOMParser().parseFromString(html, 'text/html');
  const body = doc.body;
  if (!body) return html;

  // Remove elements that are only meaningful in a standalone page context
  body.querySelectorAll('link, script, style').forEach((el) => el.remove());

  return body.innerHTML;
}

function _onDocumentClick(e) {
  if (!popupEl || !popupEl.classList.contains('is-open')) return;

  const navEl    = document.getElementById('side-nav');
  const langEl   = document.getElementById('lang-switcher');
  const clickInPopup = popupEl.contains(e.target);
  const clickInNav   = navEl?.contains(e.target) ?? false;
  const clickInLang  = langEl?.contains(e.target) ?? false;

  if (!clickInPopup && !clickInNav && !clickInLang) {
    closePopup();
  }
}
