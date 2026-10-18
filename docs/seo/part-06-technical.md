# Part 6 — Technical Checklist items (code-doable ones)

- **Date:** 19 Oct 2026
- **Sheet:** `Builds_Your_Mind_Website_SEO_Sheet.xlsx` — Technical Checklist Status column (F) updated for 7 items
- **Code:** 3 files changed/added, `dist/` rebuilt
- **Verified:** production build (vite preview) + live domain + sheet recalculation

Items done: **sitemap.xml, robots.txt, canonical tags, HTTPS redirect, mobile layout check, image alt text, Organization/LocalBusiness schema, FAQ schema.**

---

## 1. sitemap.xml — checklist #5 (Status: **In progress**)

`public/sitemap.xml` created. 22 static, crawlable routes: `/`, `/about`, `/products`, the 10 SEO workshop/service pages, `/case-studies`, `/blog`, `/home-tuition`, `/for-schools`, `/oem-services`, `/odm-services`, `/distributor-program`, `/retailer-program`, `/contact`.

Deliberately **excluded**: `/workshops` (retired, 301s), `/products/:slug` and `/catalog/:id` (dynamic — found by crawling), `/privacy` and `/terms` (footer links with no page behind them yet).

`<lastmod>` = the real git commit date of each page's source file (2026-04-18 for the older pages, 2026-10-19 for everything built in Parts 2–6).

**How tested:** fetched `/sitemap.xml` from the built output (200, `text/xml`), parsed it with a real XML parser — 22 URLs, all on `https://buildsyourmind.in`, no retired/broken URLs leaked in, no missing routes, all `<lastmod>` values well-formed.

**Why "In progress", not "Done":** the checklist says *"Sitemap file submitted in Search Console"*. The file is created, but submission needs Google Search Console — which is not set up yet (checklist #3, not a code item). Submit `https://buildsyourmind.in/sitemap.xml` in GSC once the domain is verified; I'll flip this to Done when you confirm.

## 2. robots.txt — checklist #6 (Status: **Done**)

`public/robots.txt` created:

```
User-agent: *
Allow: /

Sitemap: https://buildsyourmind.in/sitemap.xml
```

No important page is blocked — everything is open to crawlers.

**How tested:** fetched `/robots.txt` from the built output (200, `text/plain`) and read it — contains only `Allow: /` (nothing blocked) plus the sitemap reference.

## 3. Canonical tags — no checklist row (done anyway)

One `<link rel="canonical">` per page, on **every** route including dynamic ones, added in `src/components/Layout.jsx`: `https://buildsyourmind.in` + current pathname.

**How tested:** navigated 16 routes in a real browser (Home, About, Products, Contact, 5 workshop/service pages, case-studies, blog, plus a synthetic `/products/sample-check` for the dynamic pattern) and asserted each canonical href equals the expected `https://buildsyourmind.in<path>`. All 16 passed.

**Note:** the Technical Checklist has no canonical row — the closest (#14 "Short, clean URLs") is a URL-shape item, already satisfied. I did not mark #14.

## 4. HTTPS redirect — checklist #7 (Status: **Done**)

- **Live check (the real test):** `curl -I http://buildsyourmind.in` → **308 Permanent Redirect** to `https://buildsyourmind.in`; `curl -I https://buildsyourmind.in` → **200, HTTP/2**; `https://www` → **301** to the apex domain. HTTPS is working on the live site today.
- `nginx.conf`: the old commented HTTPS section (which referenced "same location blocks as above" without listing them) was replaced with a complete, ready-to-enable pair of server blocks — 443 with TLS 1.2/1.3 + the full location set, and 80 → 443 301 redirect. Kept commented because the current deployment is on Vercel, where HTTPS/redirects are automatic (verified live above) — uncomment only if the site moves to its own server.

## 5. Mobile layout check — checklist #8 (Status: **Done**)

**How tested:** no viewport-resize tool is available in this environment, so I tested each of the 22 routes inside a **390×844 same-origin iframe** (a true mobile-width layout viewport), waited for the page to settle, then measured `documentElement.scrollWidth − clientWidth` and listed any element extending past the right edge. **All 22 routes: zero horizontal overflow, zero offenders** (`scrollWidth` 382 = `clientWidth` 382, innerWidth 390).

The `viewport` meta tag (`width=device-width, initial-scale=1.0`) is present in `index.html`. Caveat: this is a rendered-DOM measurement at one width (390px) — it is not a substitute for trying the site on a physical phone, and `/products/:slug` pages were measured on a synthetic route (the products API is not reachable from this environment).

## 6. Image alt text — checklist #17 (Status: **Done**)

Audited every `<img>` in the codebase (17 across 10 files). All had descriptive alt text except the product-gallery thumbnails in `src/pages/ProductDetail.jsx` (`alt=""`), now fixed to `"{product.name} - image {n}"`.

**How tested:** rendered 11 representative routes and asserted programmatically that no `<img>` is missing `alt`, has an empty alt, or carries a placeholder alt (`image`/`img`/`photo`/`logo`). All clean.

**Note:** "descriptive file names" is only partly in our control — our own assets (`logo.jpg`, `placeholder.jpg`) are fine; product/catalog image URLs come from the API with server-generated names.

## 7. Organization/LocalBusiness schema — checklist #18 (Status: **Done**)

Added site-wide in `src/components/Layout.jsx` as JSON-LD on every page:

- `@type`: `EducationalOrganization` + `LocalBusiness`
- `name`: Builds Your Mind · `legalName`: Harmono Pvt. Ltd.
- `url`/`logo`: buildsyourmind.in (real files)
- `email`/`telephone`: the one official contact identity (`buildsyourmind@gmail.com`, `+919109711321`)
- `address`: Indore, Madhya Pradesh, IN (no street — none published anywhere)
- `areaServed`: Indore, Dewas, Ujjain, Dhar — the confirmed city list only
- `contactPoint` with the same phone/email

Nothing invented; no social URLs (footer social links are placeholders, so `sameAs` is omitted).

**How tested:** on 11 routes, parsed the injected JSON-LD and asserted: valid JSON (0 parse errors), correct `@type`, correct name/phone/email/address/areaServed fields.

## 8. FAQ schema — checklist #19 (Status: **Done**)

**How tested:** on all 10 SEO workshop/service pages, parsed the `FAQPage` JSON-LD (1 script, 5 questions each) and asserted every question's text appears in the visible page content (5/5 visible on each page, 0 parse errors, 0 mismatches). Pages without FAQ Q&A sections correctly have no FAQ schema — including `/contact`, whose "FAQ Quick Section" is a process paragraph, not a question list.

---

## 9. What could not be done

1. **Sitemap submission to Search Console** — requires GSC access (not set up; checklist #3).
2. **Real-device mobile testing** — checked via rendered-DOM overflow measurement at 390px in Chromium, not a physical phone.
3. **`/products/:slug` with a real product** — the products API was unreachable from this environment, so the dynamic canonical was verified on a synthetic route (`/products/sample-check`) instead.
4. **nginx HTTPS block kept commented** — the live site is on Vercel (HTTPS verified automatically); enabling it now would be pointless until/if the site moves to its own server.
5. Standing items unchanged: two meta descriptions per page from `index.html`, footer `/privacy` + `/terms` links with no pages behind them, footer phone displays `+91 8349260769` while linking `tel:+919109711321` (checklist #1, not in this part's list).

## 10. Sheet changes

`Technical Checklist!F` — 7 yellow cells, nothing else:

| Cell | Item | Was | Now |
|---|---|---|---|
| F6 | #5 sitemap submitted in GSC | Not started | **In progress** (file done; submission pending) |
| F7 | #6 robots file checked | Not started | **Done** |
| F8 | #7 HTTPS | Not started | **Done** (live-verified) |
| F9 | #8 mobile | Not started | **Done** |
| F18 | #17 alt text | Not started | **Done** |
| F19 | #18 org schema | Not started | **Done** |
| F20 | #19 FAQ schema | Not started | **Done** |

Integrity: 499 formula cells preserved, 162 formulas recalculated with **0 errors**, all 7 sheet names, dimensions and 5 data-validation drop-downs unchanged. Only the 7 intended cells differ from the pre-edit backup (`/tmp/opencode/seo/backup-pre-part06-20261019-014150.xlsx`). No Excel here — press **Ctrl+Alt+F9** after opening to refresh cached values.

## 11. What is needed from you

1. **Google Search Console**: verify `buildsyourmind.in`, then submit `https://buildsyourmind.in/sitemap.xml` → I mark #5 Done.
2. Your call on the **footer phone mismatch** (displays 8349260769, links 91097 11321) — one-line fix, checklist #1.
3. Your call on **`/privacy` + `/terms`** — build the pages or remove the footer links.
