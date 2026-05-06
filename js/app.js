/**
 * app.js — ES6 module entry point
 *
 * Imports and initialises every module after the DOM is ready.
 * The <script type="module"> tag in index.html automatically defers
 * execution, so we do not need an extra DOMContentLoaded wrapper —
 * but we add one for defensive clarity.
 */

import { setLang, getLang }   from './lang.js';
import { initAudio }          from './audioController.js';
import { initAssets }         from './assetLoader.js';
import { initNav, refreshPopupLang } from './nav.js';

function init() {
  /* ---- Language ----------------------------------------- */
  // Default language: English.  Change to 'fr' to default to French.
  setLang('en');

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const code = btn.getAttribute('data-lang');
      if (code && code !== getLang()) {
        setLang(code);
        // If a popup is open, reload its content in the new language
        await refreshPopupLang();
      }
    });
  });

  /* ---- Navigation --------------------------------------- */
  initNav();

  /* ---- Audio -------------------------------------------- */
  initAudio();

  /* ---- Assets / circle animation ----------------------- */
  initAssets();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
