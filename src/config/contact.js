// The one official phone number for Builds Your Mind (Harmono Pvt. Ltd., Indore).
//
// Import from here for everything: the number shown as text, every tel: link,
// every WhatsApp (wa.me) link and the telephone value in JSON-LD schema.
// Do not hard-code the number in a component or page.
//
// If the number ever changes, edit it once — in this file.

export const PHONE_DISPLAY = "+91 8349260769"; // what visitors see
export const PHONE_E164 = "+918349260769"; // E.164, for schema and tel:

export const PHONE_HREF = `tel:${PHONE_E164}`;

export const WHATSAPP_NUMBER = PHONE_E164.slice(1); // 919109711321, digits only
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export const LINKEDIN_URL = "https://www.linkedin.com/company/buildsyourmind/";
export const INSTAGRAM_URL = "https://www.instagram.com/buildsyourmind.in/";

// One official email for the whole site. Import this instead of typing the
// address into a component. (The value matches the address already used in
// the live site, footer, forms and schema.)
export const EMAIL = "hello@buildsyourmind.in";
export const EMAIL_HREF = `mailto:${EMAIL}`;

// The office is deliberately shown at city level only: no street address or
// PIN code has been confirmed for publication. Do not invent one.
export const ADDRESS = {
  locality: "Indore",
  region: "Madhya Pradesh",
  country: "IN",
  display: "Harmono Pvt. Ltd., Indore, Madhya Pradesh, India",
};
export const ADDRESS_DISPLAY = ADDRESS.display;

// Only profiles that actually exist. The old footer also showed Facebook,
// YouTube and Twitter icons linked to "#", which are dead links. Add a real
// URL here before showing another network.
export const SOCIAL_PROFILES = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
];

const contact = {
  phoneDisplay: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  phoneHref: PHONE_HREF,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappHref: WHATSAPP_HREF,
  email: EMAIL,
  emailHref: EMAIL_HREF,
  address: ADDRESS,
  addressDisplay: ADDRESS_DISPLAY,
  linkedinUrl: LINKEDIN_URL,
  instagramUrl: INSTAGRAM_URL,
  socialProfiles: SOCIAL_PROFILES,
};

export default contact;
