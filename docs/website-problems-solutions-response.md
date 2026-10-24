# Website Problems & Solutions — implementation response

Source: `Builds_Your_Mind_Website_Problems_and_Solutions.docx`
Date: 24 October 2026
Scope: `C:\builds_your_mind_educational` (React + Vite + react-router site)

This document maps every section of the DOCX to the current application. It
separates (a) what was already correct, (b) what was changed in this pass, and
(c) what still needs a business decision, a document or a client-supplied asset.
No statistics, testimonials, certifications or prices were invented.

---

## 1. Branding & Content

| DOCX item | Status | Where / what changed |
|---|---|---|
| Clear value proposition for practical STEM / robotics / AI / coding / IoT | Already in place | Home hero and the five dedicated workshop pages. |
| State the parent company (Harmono Pvt. Ltd.) | Already in place, strengthened | Navbar, Footer, About, Privacy and Terms now name Harmono Pvt. Ltd. consistently. |
| Update the About Us story, mission, vision and team roles | **Fixed** | `src/pages/About.jsx`: new Mission / Vision / How We Work section and a four-role team block. Removed inflated language. |
| De-emphasise Home Tuition | Already in place | It remains under the secondary “More” menu, not the main navigation. |
| Consistent brand voice and visual identity | **Improved** | “Inquiry” changed to “Enquiry”; one contact identity; one claims file. |
| Clear CTAs: Book a School Meeting / Explore Programs / Request a Quote | **Fixed** | Home hero now has all three, plus WhatsApp. Product pages have “Request a Quote”. |
| CTAs and links must work | **Fixed** | Added `/privacy` and `/terms`; removed dead `#` social icons; converted internal `<a href>` links to router `<Link>` on Case Studies and Blog. |

## 2. Statistics, Claims & Credibility

| DOCX item | Status | Where / what changed |
|---|---|---|
| Verify all numbers, certifications, awards and testimonials | **Fixed for code claims** | Removed “500+ schools”, “100K+ students”, “10+ years”, “50+ products”, “ISO certified”, “leading company”, “state-of-the-art” and “pan-India network”. They had no source in the repository. |
| Use one documented set of figures | **Fixed** | `src/data/siteFacts.js` is now the single source for the Home facts strip and About stats. It only contains facts true by definition of the current offering. |
| Proof: photos, case studies, testimonials | **Structure ready** | Case Studies remains permission-gated. New `src/components/Testimonials.jsx` renders real, published API testimonials only; it renders nothing when none exist. |
| Real photography | Needs client assets | The site labels illustrative stock photos honestly. Replace with real session photos when available. |

If the client can support the old numbers with records, add them to
`src/data/siteFacts.js` with a clear label and source. Do not paste them back
into page components.

## 3. Homepage & UX

| DOCX item | Status | Where / what changed |
|---|---|---|
| Clear headline and primary services up top | Already in place | Home hero + “What We Do” cards. |
| Clear CTAs | **Fixed** | Book a School Meeting / Explore Programs / Request a Quote / WhatsApp. |
| Professional imagery and proof | Partly done | Honest stock labels; real photos still needed. |
| Mobile responsiveness and readability | Already in place | Mobile nav, responsive grids, 44px touch targets. Re-verify after deployment. |
| Weak / missing trust indicators | **Improved** | Facts strip uses verifiable facts; case-study and testimonial rules are explicit. |

## 4. Services & Business Positioning

| DOCX item | Status | Where / what changed |
|---|---|---|
| Dedicated pages for each service | Already in place | P03–P12 routes. |
| Clear programme details: grades, curriculum, duration, outcomes, deliverables | Already in place | Service/workshop data files contain these sections and FAQs. |
| Clear school/college collaboration process | **Fixed** | `src/pages/ForSchools.jsx`: new four-step process and “Request a Customised Proposal” CTA. |
| Customised proposal / MoU path | **Fixed** | ForSchools CTA + link to `/stem-partnership-mou`. |
| Separate manufacturing / OEM / ODM from education programmes | Already in place | OEM and ODM have their own pages and navigation placement. |

## 5. Products & Educational Kits

| DOCX item | Status | Where / what changed |
|---|---|---|
| Detailed product information | **Improved** | Product detail now handles missing descriptions/features/outcomes honestly instead of crashing. |
| Clear price / enquiry path | **Fixed** | “Price on request” when no price; quantity-aware enquiry link pre-fills Contact. |
| Bulk pricing and quote path | **Fixed** | Bulk price shown only when real; “Request a Quote” on every product card and detail page. |
| Warranty, delivery, returns and support policies | **Fixed (policy level)** | Product sidebar block + `/terms` explain that these terms are confirmed in writing in the quotation before payment. |
| Test the full purchase path | **Not applicable yet** | The site is enquiry-based; there is no online checkout. If checkout is added, test it separately. |
| Remove invented sample products/prices | **Fixed** | Removed the `sampleProduct` fallback and the fake “related products” from `ProductDetail.jsx`. |

## 6. Contact & Lead Generation

| DOCX item | Status | Where / what changed |
|---|---|---|
| Consistent official contact details | **Fixed** | Phone, WhatsApp, email and address now come from `src/config/contact.js`. |
| Visible WhatsApp CTA | Already in place | Navbar, footer, forms and product pages. |
| Concise enquiry form | Already in place | Institution, contact person, phone/email, city, programme, class group, students, date, message. |
| Test submissions and notifications | Needs live test | Submit a real test enquiry after deployment and confirm the backend notification arrives. |
| “Request a School Meeting” path | **Fixed** | Added to Home, ForSchools and the Contact enquiry-type list. |
| Lead tracking | **Fixed (foundation)** | `src/utils/analytics.js` tracks page views, phone, WhatsApp, email, form submissions and explicit CTA events. Set `VITE_GA_MEASUREMENT_ID` to send them to GA4; otherwise they stay in `window.dataLayer`. |
| Pre-fill from product/programme links | **Fixed** | Contact reads `?type=`, `?product=`, `?programme=`, `?qty=`, `?city=` and pre-fills the form. |

## 7. Technical Quality

| DOCX item | Status | Where / what changed |
|---|---|---|
| Broken links / old pages | **Fixed** | `/privacy` and `/terms` now exist. Dead social icons removed. Internal links use the router. |
| 404 page | **Improved** | Added title, description, `noindex`, and useful links in `NotFound.jsx`. |
| Page speed | Already in place | Lazy-loaded images, code-split routes, pre-rendered HTML. Re-check after deployment. |
| HTTPS / cross-browser | Deployment setting | Vercel provides HTTPS. Run a final Chrome/Safari/Firefox + Android/iOS check on the deployed URL. |
| Image alt text / dimensions | **Improved** | Product images now lazy-load and pass alt text; product thumbnails have accessible labels. |

## 8. SEO & Google Visibility

| DOCX item | Status | Where / what changed |
|---|---|---|
| Unique titles/descriptions and one H1 | Already in place | Verified in `docs/seo/part-10-final-check.md`; new pages follow the same pattern. |
| Local pages (Indore / Madhya Pradesh) | Already in place | Indore service pages + `/stem-education-madhya-pradesh`. |
| Organization / LocalBusiness schema | Already in place, **improved** | Added `sameAs` social profiles and shared site config. |
| Service / Product structured data | **Fixed** | `Service` + `BreadcrumbList` on P03–P12; `Product` schema on product detail. |
| Sitemap / robots | **Fixed** | `/privacy` and `/terms` added to `public/sitemap.xml`; robots unchanged. |
| Search Console submission | Needs client action | Submit `https://buildsyourmind.in/sitemap.xml` in Google Search Console once domain verification is confirmed. |
| Internal linking | **Improved** | Case Studies/Blog links now use client-side routing. |

## 9. Privacy, Policies & Compliance

| DOCX item | Status | Where / what changed |
|---|---|---|
| Privacy Policy page | **Fixed** | `src/pages/Privacy.jsx` at `/privacy`. Covers forms, newsletter, UTM/session storage, analytics, retention, student images, rights and contact. |
| Terms & Conditions page | **Fixed** | `src/pages/Terms.jsx` at `/terms`. Covers enquiries, quotes, prices, delivery, warranty, replacement/refunds, payments, IP, acceptable use and governing law. |
| Student image permissions | **Fixed (policy)** | Privacy Policy and case-study data require school/parent permission. |
| Copyright verification | **Fixed (policy)** | Terms state that content/images/kit designs belong to Harmono Pvt. Ltd. or are used with permission. Confirm any externally sourced assets before launch. |

---

## Files added

- `src/config/site.js` — site URL, name, legal name, served cities.
- `src/data/siteFacts.js` — single source for verifiable stats and claims.
- `src/utils/analytics.js` — optional GA4 + dataLayer event tracking.
- `src/components/Testimonials.jsx` — real, permission-based testimonials only.
- `src/pages/Privacy.jsx` — Privacy Policy.
- `src/pages/Terms.jsx` — Terms of Service.
- `docs/website-problems-solutions-response.md` — this document.

## Files changed

- `src/config/contact.js` — email, address, social profiles centralised.
- `src/components/Footer.jsx` — real social links, shared email/address.
- `src/components/Layout.jsx` — analytics, shared site config, `sameAs` schema.
- `src/components/EnquiryForm.jsx` — shared email, “School Meeting” programme.
- `src/pages/Home.jsx` — new CTAs, facts strip, testimonials section.
- `src/pages/About.jsx` — mission/vision/team roles, claims cleanup.
- `src/pages/Contact.jsx` — pre-filled enquiries, meeting type, shared contact details.
- `src/pages/ForSchools.jsx` — collaboration process, proposal CTA, “Enquiry” wording.
- `src/pages/Products.jsx` — resilient loading, quote CTA, safe fields, mobile filter fix.
- `src/pages/ProductDetail.jsx` — no invented data, quote path, policy block, Product schema.
- `src/pages/WorkshopPage.jsx` — Service + Breadcrumb schema.
- `src/pages/ServicePage.jsx` — Service + Breadcrumb schema.
- `src/pages/CaseStudies.jsx` — router link.
- `src/pages/Blog.jsx` — router link.
- `src/pages/NotFound.jsx` — noindex + useful links.
- `src/routes.js`, `src/pages.server.js`, `src/pages.client.js` — `/privacy`, `/terms`.
- `public/sitemap.xml` — new pages and updated lastmod.
- `index.html` — current fallback title/description/OG tags.
- `.env.example` — optional GA4 measurement ID.
- `src/pages/CatalogVideo.jsx` — title, description and H1 render before the video loads.
- `src/pages/HomeTuition.jsx` — removed unverified teacher-verification and "best teacher" claims.
- `src/pages/OEMServices.jsx`, `src/pages/ODMServices.jsx` — replaced delivery guarantees and subjective quality claims with agreed-in-writing wording.
- `src/pages/DistributorProgram.jsx`, `src/pages/RetailerProgram.jsx` — softened unverified margin, exclusivity and delivery claims.
- `src/pages/Home.jsx` — proof section now says "Published With Permission" instead of implying external verification.
- `src/data/servicePages.js` — programme-at-a-glance facts for lab setup, school programme and college workshops; partner section renamed "Named With Permission".
- `src/pages/WorkshopPage.jsx` — "Workshop at a Glance" block covering class groups, duration, format, group size, materials and outcome.
- `src/pages/ServicePage.jsx` — "Programme at a Glance" block driven by approved page facts.

---

## What still needs a client decision or asset

These cannot be completed truthfully from code alone:

1. **Verified business figures** — if “500+ schools”, “100K+ students” or
   “10+ years” are true, supply the source/records and add them to
   `src/data/siteFacts.js`. Otherwise the current factual wording stays.
2. **Real photographs** — replace illustrative stock images with session photos
   that have permission.
3. **Real testimonials and case studies** — add them through the API/admin or
   `src/data/caseStudies.js` with written permission.
4. **Social profiles** — only LinkedIn and Instagram are shown because they are
   the only confirmed URLs. Add Facebook/YouTube/X to
   `SOCIAL_PROFILES` in `src/config/contact.js` when the profiles exist.
5. **GA4 measurement ID** — set `VITE_GA_MEASUREMENT_ID` in the deployment
   environment to send the tracked events to Google Analytics.
6. **Search Console** — verify the domain and submit the sitemap.
7. **Live form/notification test** — send one test enquiry after deployment and
   confirm the team receives it.
8. **Cross-browser/mobile check** — run on the deployed URL, not only localhost.
9. **Legal review** — have the Privacy Policy and Terms reviewed for the
   company’s actual data practices and jurisdiction before launch.

---

## Verification performed

Final checks on the production build:

- 24 pages pre-rendered; 24 sitemap URLs; 24 unique page titles and canonical URLs.
- Every static page has exactly one H1; titles are 60 characters or fewer and meta descriptions are 155 characters or fewer.
- Every built internal link resolves to an existing page or a known dynamic product/catalog route; every referenced asset file exists.
- All JSON-LD blocks parse as JSON; `public/sitemap.xml` is well-formed XML and `robots.txt` points to it.
- The 404, product-detail and catalog-video SSR output includes a title, meta description and H1. The 404 also has `noindex,follow`.
- Contact query-parameter prefill was tested for `type`, `product` and `qty`.
- WhatsApp, `tel:` and `mailto:` links all use the single configured number/email; only confirmed social profiles are rendered.
- A claim scan of the built pages found none of the removed unverified phrases (school counts, years, certifications, delivery guarantees, "verified teachers", margin promises).

Older checks:

- `npm run build` (client build, SSR build, pre-render) — run after these
  changes; see the terminal output in the implementation session.
- All routes in `src/routes.js` are pre-rendered except the dynamic product and
  catalog routes and the 404 fallback.
- `/privacy` and `/terms` are included in the sitemap and both registries.
- No sample product data or invented prices remain in `ProductDetail.jsx`.
- No dead `#` social links remain in the footer.
