/**
 * assetLoader.js — artwork image cycling for intro circles
 *
 * Loads the image list from JSON_MODEL/IntroAssets.json via fetch(),
 * then cycles through all images on a short interval, updating the
 * src of the three circle-ring elements to create the flip-book effect.
 *
 * Falls back to a single static image when the JSON cannot be fetched
 * (e.g. when the page is opened directly from the file system).
 */

const ASSETS_JSON   = 'JSON_MODEL/IntroAssets.json';
const DEFAULT_IMAGE = 'img/gallery/WhitePaperCovers/RouePattern.jpg';
const CYCLE_DELAY   = 100; // ms between frames

const RING_IDS = [
  'circle-ring-main',
  'circle-ring-ne',
  'circle-ring-se',
];

let imagePaths    = [DEFAULT_IMAGE];
let frameIndex    = 0;
let cycleInterval = null;
let rings         = [];
let loaderEl      = null;

/** Initialise and begin the asset cycle. */
export async function initAssets() {
  loaderEl = document.getElementById('loader');
  rings = RING_IDS.map((id) => document.getElementById(id)).filter(Boolean);

  _showLoader();

  try {
    const res  = await fetch(ASSETS_JSON);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const paths = (json.Assets ?? [])
      .map((a) => a.Path)
      .filter((p) => typeof p === 'string' && p.length > 0);

    // De-duplicate while preserving order
    const unique = [...new Set(paths)];

    // Preload images; only keep those that actually load successfully
    _preloadImages(unique);
  } catch (err) {
    console.error('AssetLoader: could not load', ASSETS_JSON, err);
    _hideLoader();
    _startCycle(); // cycle with the single default image
  }
}

/* ------------------------------------------------------------------ */

function _preloadImages(paths) {
  const container = document.getElementById('hidden-load');
  if (!container) { _hideLoader(); _startCycle(); return; }

  const total = paths.length;
  if (total === 0) { _hideLoader(); _startCycle(); return; }

  let settled = 0;
  const goodPaths = [];

  paths.forEach((src) => {
    const img = new Image();
    img.addEventListener('load', () => {
      goodPaths.push(src);
      _onSettled();
    }, { once: true });
    img.addEventListener('error', () => {
      // Path could not be loaded (e.g. case-sensitivity mismatch on disk);
      // skip silently rather than cycling through broken URLs
      _onSettled();
    }, { once: true });
    img.src = src;
    container.appendChild(img);
  });

  function _onSettled() {
    settled += 1;
    if (settled >= total) {
      if (goodPaths.length > 0) {
        imagePaths = goodPaths;
      } else {
        // All paths failed to load (e.g. case-sensitivity mismatch between JSON and disk)
        console.warn('AssetLoader: no images loaded successfully; falling back to default image.');
        imagePaths = [DEFAULT_IMAGE];
      }
      _hideLoader();
      _startCycle();
    }
  }
}

function _startCycle() {
  if (rings.length === 0 || imagePaths.length === 0) return;
  clearInterval(cycleInterval);
  cycleInterval = setInterval(_advanceFrame, CYCLE_DELAY);
}

function _advanceFrame() {
  const src = imagePaths[frameIndex % imagePaths.length];
  rings.forEach((ring) => { ring.src = src; });
  frameIndex += 1;
}

function _showLoader() {
  if (loaderEl) loaderEl.classList.remove('is-hidden');
}

function _hideLoader() {
  if (loaderEl) loaderEl.classList.add('is-hidden');
}
