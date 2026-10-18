# Part 7 — Enquiry form, WhatsApp, UTM

- **Date:** 19 Oct 2026
- **Pages:** all 10 service pages (P03–P12) via `WorkshopPage.jsx` and `ServicePage.jsx`
- **Code:** `src/components/EnquiryForm.jsx`, `src/utils/utm.js`, `Layout.jsx` (UTM capture)
- **Paid services connected:** none

## Enquiry form (checklist #20)
Fields: institution name, city, contact person, designation, phone, email, student age/class group, number of students, programme required, one-time/long-term, preferred date, message.
- Programme is pre-selected for the page it sits on. All hero/CTA buttons scroll to `#enquiry`.
- Validation: required fields; 10-digit Indian mobile; email format; students a whole number ≥ 1; preferred date not in the past; message ≤ 1500 chars.
- Thank-you panel replaces the form after a successful send; a clear error shows if sending fails.
- Submits to the site's existing `/enquiries/enquiry/` API (own backend). Full details also go in `message`, plus the source page and any UTM values.

## WhatsApp (checklist #21)
"Chat on WhatsApp" button next to Send (and on the thank-you panel) opens `wa.me/919109711321` with the form details, source page and UTM source pre-filled. It carries `data-track="whatsapp_click"` so it can be counted once analytics exists.

## UTM (checklist #22)
`utm_source/medium/campaign/term/content` are read from the landing URL, kept for the visit, and attached to enquiries and WhatsApp text. Links to use in profiles:

- GBP: `https://buildsyourmind.in/?utm_source=google&utm_medium=gbp&utm_campaign=profile`
- Facebook: `https://buildsyourmind.in/?utm_source=facebook&utm_medium=social&utm_campaign=profile`
- Instagram: `https://buildsyourmind.in/?utm_source=instagram&utm_medium=social&utm_campaign=bio`

## Checklist status (all three "In progress", not Done)
- **#20** — form built and tested (validation, UTM, thank-you). Not Done until the backend endpoint is confirmed live and receiving leads; the form was tested against a mocked response only.
- **#21** — button done; "calls tracked" needs Google Analytics (#4), not set up.
- **#22** — capture is built; the tagged links above must still be pasted into GBP/Facebook/Instagram.
