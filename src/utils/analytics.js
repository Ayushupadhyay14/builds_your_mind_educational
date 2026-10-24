// Small, privacy-conscious analytics layer.
//
// It works in three modes:
//   1. If VITE_GA_MEASUREMENT_ID is set, it loads GA4 and sends events there.
//   2. If no GA ID is set, events are still pushed to window.dataLayer so a
//      tag manager or a future integration can pick them up.
//   3. During the build/server render there is no window, so every function is
//      a safe no-op.
//
// We never send form contents, names, phone numbers or email addresses. Only
// the event name, the page path and generic UI labels are sent.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

let initialised = false;

export function initAnalytics() {
  if (typeof window === 'undefined' || initialised) return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  // gtag is a queueing shim; calls before the script loads are replayed.
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

  if (!GA_ID || document.getElementById('ga-gtag')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !name) return;

  const payload = { event: name, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

export function trackPageView(pathname, title) {
  trackEvent('page_view', {
    page_path: pathname,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
    page_location:
      typeof window !== 'undefined' ? window.location.href : undefined,
  });
}
