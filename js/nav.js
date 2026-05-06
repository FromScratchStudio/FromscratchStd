/**
 * nav.js — navigation & popup management
 *
 * Handles:
 *  - Side nav item clicks  → open the matching popup section
 *  - Circle orbit clicks   → open the matching popup section
 *  - Popup close button    → close popup
 *  - Outside-click         → close popup (if click outside nav + popup)
 *  - Keyboard (Escape)     → close popup
 *  - Focus management      → moves focus into popup on open, traps it,
 *                            and restores it to the opener on close
 */

import { getLang } from './lang.js';

/**
 * Maps a section key to its HTML file path within the sections/ folder.
 * Language code is appended at runtime (e.g. sections/EN/...).
 */
const SECTION_FILES = {
  fromScratchStudio:   'fromscratchstudio.html',
  fromScratchPictures: 'fromscratchpictures.html',
  fromScratchRecords:  'fromscratchrecords.html',
};

/**
 * Human-readable titles used as the accessible name of the dialog.
 * Keys match SECTION_FILES.
 */
const SECTION_TITLES = {
  fromScratchStudio:   { en: 'FromScratch Studio',   fr: 'FromScratch Studio'   },
  fromScratchPictures: { en: 'FromScratch Stories',  fr: 'FromScratch Stories'  },
  fromScratchRecords:  { en: 'FromScratch Records',  fr: 'FromScratch Records'  },
};

let currentSection  = '';
let popupEl         = null;
let contentEl       = null;
let closeBtn        = null;
let titleEl         = null;
let openerElement   = null; // element that triggered the current popup

/** Initialise nav; must be called after DOMContentLoaded. */
export function initNav() {
  popupEl   = document.getElementById('popup');
  contentEl = document.getElementById('popup-content');
  closeBtn  = document.getElementById('popup-close');
  titleEl   = document.getElementById('popup-title');

  if (!popupEl || !contentEl || !closeBtn) return;

  // Close button
  closeBtn.addEventListener('click', closePopup);

  // Side nav items
  document.querySelectorAll('#side-nav .nav-item[data-section]').forEach((item) => {
    const btn = item.querySelector('.nav-icon');
    if (btn) {
      btn.addEventListener('click', () => openPopup(item.dataset.section, btn));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPopup(item.dataset.section, btn);
        }
      });
    }
  });

  // Circle orbits in the intro
  document.querySelectorAll('.circle-orbit[data-section]').forEach((circle) => {
    circle.addEventListener('click', () => openPopup(circle.dataset.section, circle));
    circle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPopup(circle.dataset.section, circle);
      }
    });
  });

  // Outside-click closes popup
  document.addEventListener('click', _onDocumentClick);

  // Keyboard Escape closes popup; Tab is trapped inside the popup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup();
      return;
    }
    if (e.key === 'Tab' && popupEl?.classList.contains('is-open')) {
      _trapFocus(e);
    }
  });
}

/**
 * Open a popup for the given section name.
 * Clicking the same section again while open will close it.
 * @param {string} section - e.g. 'fromScratchStudio'
 * @param {Element} [trigger] - element that triggered the open (to restore focus on close)
 */
export async function openPopup(section, trigger) {
  if (section === currentSection) {
    closePopup();
    return;
  }

  const lang = getLang();
  const path = _sectionPath(section, lang);

  if (!path) return;

  // Remember who opened the popup so focus can be restored on close
  openerElement = trigger ?? document.activeElement;

  // Update accessible dialog title
  if (titleEl) {
    const titles = SECTION_TITLES[section];
    titleEl.textContent = titles ? (titles[lang] ?? titles.en) : '';
  }

  // Clear previous content while loading
  contentEl.innerHTML = '';
  popupEl.classList.add('is-open');
  popupEl.setAttribute('aria-hidden', 'false');
  currentSection = section;

  // Move focus into the popup (close button is the first focusable element)
  closeBtn.focus();

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

/** Close the popup panel and restore focus to the triggering element. */
export function closePopup() {
  if (!popupEl) return;
  popupEl.classList.remove('is-open');
  popupEl.setAttribute('aria-hidden', 'true');
  currentSection = '';
  if (contentEl) contentEl.innerHTML = '';

  // Restore focus to the element that opened the popup
  if (openerElement && typeof openerElement.focus === 'function') {
    openerElement.focus();
  }
  openerElement = null;
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
  const file = SECTION_FILES[section];
  if (!file) return null;
  return `sections/${lang.toUpperCase()}/${file}`;
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

/**
 * Trap keyboard focus inside the popup while it is open.
 * Wraps from the last focusable element back to the first (and vice-versa).
 * @param {KeyboardEvent} e
 */
function _trapFocus(e) {
  const focusable = Array.from(
    popupEl.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    // Shift+Tab: if on the first element, wrap to last
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    // Tab: if on the last element, wrap to first
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
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
