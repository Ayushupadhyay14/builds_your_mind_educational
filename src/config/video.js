/**
 * Video Configuration
 * -------------------
 * Central configuration for featured videos and the Floating QR Code button.
 *
 * TO UPDATE YOUR YOUTUBE VIDEO:
 * Simply replace the FEATURED_YOUTUBE_URL value below with your actual YouTube URL
 * (e.g., 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID' or 'https://youtu.be/YOUR_VIDEO_ID').
 */

// Place your official YouTube video link here:
export const FEATURED_YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // <-- REPLACE THIS WITH YOUR REAL YOUTUBE VIDEO URL

export const QR_MODAL_DEFAULTS = {
  title: 'Scan to Watch Video',
  instruction: 'Scan this QR code with your mobile camera to watch our video on YouTube.',
  youtubeUrl: FEATURED_YOUTUBE_URL,
  buttonText: 'Watch on YouTube',
  badgeText: 'Featured Video',
};

export default {
  FEATURED_YOUTUBE_URL,
  QR_MODAL_DEFAULTS,
};
