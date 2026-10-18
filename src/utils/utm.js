// UTM helpers. No third-party service: values are read from the landing URL,
// kept in sessionStorage for the visit, and attached to enquiries/WhatsApp text.
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORE = 'bym_utm';

export const WHATSAPP_NUMBER = '919109711321';

export const captureUtm = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 100);
    });
    if (Object.keys(found).length) {
      sessionStorage.setItem(STORE, JSON.stringify(found));
    }
  } catch (e) {
    /* storage blocked: UTM is optional */
  }
};

export const getUtm = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORE)) || {};
  } catch (e) {
    return {};
  }
};

// Builds a wa.me link with a prefilled message and a UTM-tagged page reference.
export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Appends the visit's UTM values to an internal path (e.g. CTA -> /contact).
export const withUtm = (path) => {
  const utm = getUtm();
  const qs = new URLSearchParams(utm).toString();
  return qs ? `${path}?${qs}` : path;
};
