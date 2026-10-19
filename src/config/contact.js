// The one official phone number for Builds Your Mind (Harmono Pvt. Ltd., Indore).
//
// Import from here for everything: the number shown as text, every tel: link,
// every WhatsApp (wa.me) link and the telephone value in JSON-LD schema.
// Do not hard-code the number in a component or page.
//
// If the number ever changes, edit it once — in this file.

export const PHONE_DISPLAY = "+91 91097 11321"; // what visitors see
export const PHONE_E164 = "+919109711321"; // E.164, for schema and tel:

export const PHONE_HREF = `tel:${PHONE_E164}`;

export const WHATSAPP_NUMBER = PHONE_E164.slice(1); // 919109711321, digits only
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

const contact = {
  phoneDisplay: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  phoneHref: PHONE_HREF,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappHref: WHATSAPP_HREF,
};

export default contact;
