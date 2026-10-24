import { SITE_URL } from './site';

/**
 * Video Configuration
 * -------------------
 * Central configuration for featured videos and the Floating QR Code button.
 *
 * Integrated Video File:
 * Original: "WhatsApp Video 2026-10-25 at 2.35.44 AM.mp4"
 * Web Path: /videos/featured-video.mp4
 */

// Local video file served by the website
export const LOCAL_VIDEO_PATH = '/videos/featured-video.mp4';

// Production public video watch page
export const PRODUCTION_WATCH_URL = `${SITE_URL}/watch`;

// Local Wi-Fi LAN IP (allows mobile phones on the same Wi-Fi to scan and watch immediately during dev)
export const DEV_LAN_IP = '192.168.1.10';
export const DEV_LAN_PORT = '3001';
export const DEV_WATCH_URL = `http://${DEV_LAN_IP}:${DEV_LAN_PORT}/watch`;

// If you have a YouTube video link, paste it here. If left empty, it runs your WhatsApp video directly!
export const FEATURED_YOUTUBE_URL = '';

/**
 * Returns the best URL to encode into the QR code:
 * - If YouTube URL is configured -> points to YouTube.
 * - In local dev (localhost/127.0.0.1) -> points to LAN IP so phone can connect.
 * - In production -> points to https://buildsyourmind.in/watch.
 */
export function getScannableVideoUrl() {
  if (FEATURED_YOUTUBE_URL && FEATURED_YOUTUBE_URL.trim()) {
    return FEATURED_YOUTUBE_URL.trim();
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const port = window.location.port || DEV_LAN_PORT;
    if (host === 'localhost' || host === '127.0.0.1') {
      return `http://${DEV_LAN_IP}:${port}/watch`;
    }
    return `${window.location.origin}/watch`;
  }

  return PRODUCTION_WATCH_URL;
}

export const QR_MODAL_DEFAULTS = {
  title: 'Scan to Watch Video',
  instruction: 'Scan this QR code with your mobile camera to play this video directly on your phone.',
  localVideoSrc: LOCAL_VIDEO_PATH,
  badgeText: 'Demonstration Video',
};

export default {
  LOCAL_VIDEO_PATH,
  PRODUCTION_WATCH_URL,
  DEV_WATCH_URL,
  FEATURED_YOUTUBE_URL,
  getScannableVideoUrl,
  QR_MODAL_DEFAULTS,
};
