/**
 * audioController.js — background audio management
 *
 * Handles the mute/unmute toggle for the ambient audio track.
 * Modern browsers require a user gesture before audio can play,
 * so the track starts muted and becomes audible only after the
 * user explicitly clicks the mute button.
 */

import { t } from './lang.js';

const MUTE_ICON   = 'img/logos/mute.jpg';
const UNMUTE_ICON = 'img/logos/unmute.jpg';

let audioEl  = null;
let muteBtn  = null;
let muteImg  = null;
let isPlaying = false;

/** Initialise audio controller; must be called after DOMContentLoaded. */
export function initAudio() {
  audioEl = document.getElementById('audio-track');
  muteBtn = document.getElementById('mute-btn');
  muteImg = document.getElementById('mute-img');

  if (!audioEl || !muteBtn) return;

  // Start fully muted — browsers block autoplay anyway
  audioEl.muted = true;
  audioEl.pause();

  muteBtn.addEventListener('click', toggleMute);
}

/**
 * Toggle between playing (unmuted) and paused.
 * Updates the button icon and aria-pressed to reflect the state.
 */
function toggleMute() {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function play() {
  if (!audioEl) return;
  audioEl.muted = false;
  audioEl.play().then(() => {
    isPlaying = true;
    _updateIcon();
  }).catch((err) => {
    // Play was prevented (e.g. strict autoplay policy); revert muted state
    audioEl.muted = true;
    console.warn('Audio play prevented:', err);
  });
}

function pause() {
  if (!audioEl) return;
  audioEl.muted = true;
  audioEl.pause();
  isPlaying = false;
  _updateIcon();
}

function _updateIcon() {
  if (!muteBtn || !muteImg) return;
  muteBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
  muteBtn.setAttribute('aria-label', t(isPlaying ? 'unmute.aria' : 'mute.aria'));
  muteImg.src = isPlaying ? UNMUTE_ICON : MUTE_ICON;
}
