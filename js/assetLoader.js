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
    imagePaths = [...new Set(paths)];

    // Preload all images off-screen; hide loader when done
    _preloadImages(imagePaths);
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

  let loaded = 0;
  const total = paths.length;

  if (total === 0) { _hideLoader(); _startCycle(); return; }

  paths.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.addEventListener('load',  _onImageReady, { once: true });
    img.addEventListener('error', _onImageReady, { once: true });
    container.appendChild(img);
  });

  function _onImageReady() {
    loaded += 1;
    if (loaded >= total) {
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
