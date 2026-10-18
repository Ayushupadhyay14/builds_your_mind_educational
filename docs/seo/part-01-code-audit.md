# Part 1 (code-aware audit) — Sheet vs Live Website

- **Date:** 18 Oct 2026
- **Sheet:** `Builds_Your_Mind_Website_SEO_Sheet.xlsx` — read only, not modified
- **Code:** `/home/ayush-upadhyay/buildsyourmindfrontend` — read only, not modified
- **Nothing was changed** in the workbook or in any source file. This document is the only new artifact.

---

## 0. The one thing to decide first

**The sheet and the live website describe different businesses.**

| | SEO sheet assumes | Live code actually is |
|---|---|---|
| Core offer | STEM education & innovation partner for schools/colleges, Indore | **Eco-friendly educational kits** (physical products) sold B2B/B2C |
| Business model | Workshops, lab setup, school programmes, MOU partnerships | Product catalogue, **OEM/ODM manufacturing**, distributor & retailer programmes, **home tuition** |
| Legal entity | not mentioned in the sheet | **Harmono Pvt. Ltd.** (manufacturer; "Builds Your Mind" is the brand) |
| Geography | Indore, Madhya Pradesh (local SEO) | Indore appears only in Footer + Contact; no city landing pages |

The sheet's whole Page Plan (P03–P12 = workshop/lab/partnership/MP pages) does **not** match the site that exists today (`/products`, `/oem-services`, `/odm-services`, `/distributor-program`, `/retailer-program`, `/home-tuition`). Every recommendation below depends on which of these two directions is real. **Nothing in the sheet is "wrong" in isolation — it is written for a different website.**

---

## 1. Page Plan (P01–P15) vs live routes

Live routes are defined in `src/App.jsx`.

| Sheet ID | Sheet page | Sheet URL | Status on live site |
|---|---|---|---|
| P01 | Home | `/` | **EXISTS** at `/` |
| P02 | About Us | `/about` | **EXISTS** at `/about` |
| P03 | STEM Workshops for Schools | `/stem-workshops-schools-indore` | **PARTIAL** — `/workshops` exists, different URL |
| P04 | Robotics Workshops for Schools | `/robotics-workshops-schools-indore` | **MISSING** — only named inside `/workshops` copy |
| P05 | AI Workshops for Schools | `/ai-workshops-schools` | **MISSING** |
| P06 | IoT Workshops for Schools | `/iot-workshops-schools` | **MISSING** |
| P07 | Coding Workshops for Schools | `/coding-workshops-schools` | **MISSING** |
| P08 | STEM Lab Setup & Programme | `/stem-lab-setup-schools-indore` | **MISSING** |
| P09 | School STEM Programme | `/school-stem-programme-indore` | **PARTIAL** — `/for-schools` is the closest |
| P10 | College & University Workshops | `/college-university-workshops-indore` | **MISSING** |
| P11 | Partnership & MOU | `/stem-partnership-mou` | **PARTIAL** — `/for-schools` + distributor/retailer programmes exist, no MOU page |
| P12 | STEM Education in Madhya Pradesh | `/stem-education-madhya-pradesh` | **MISSING** |
| P13 | Case Studies | `/case-studies` | **MISSING** (API has `getGallery`/`getTestimonials`, no page) |
| P14 | Blog / Resources | `/blog` | **MISSING** |
| P15 | Workshop Enquiry & Contact | `/contact` | **EXISTS** at `/contact` (general enquiry, not workshop-specific) |

**Totals: 3 exist · 3 partial · 9 missing.**

### Live pages that are NOT in the sheet
`/products` · `/products/:slug` · `/catalog/:id` · `/home-tuition` · `/oem-services` · `/odm-services` · `/distributor-program` · `/retailer-program` · `/for-schools` · 404 (`*`)

That is **9 live pages with no row in the sheet** — the sheet currently has no keyword, title or meta allocated to any of them.

### Menu vs sheet "Where It Appears"
The sheet says service pages sit under a "Services menu". The actual Navbar has two dropdowns: **"Education Kits & Workshops"** (All Products, Workshops, OEM, ODM) and **"For Schools / Partners"** (For Schools, Distributor, Retailer). The sheet's menu structure does not match the built navigation.

---

## 2. Current titles (live code)

All pages set their title via `react-helmet-async`. Limits: 60 chars title / 155 meta.

| Route | Current title | Chars | Over 60? |
|---|---|---|---|
| *(index.html static)* | Builds Your Mind \| Eco-Friendly Educational Kits | 48 | no |
| `/` | Builds Your Mind \| Eco-Friendly Educational Kits & Home Tuition Services | **72** | **YES** |
| `/about` | About Us \| Builds Your Mind - Eco-Friendly Educational Kits | 59 | no (tight) |
| `/products` | Educational Kits \| Builds Your Mind - STEM, DIY Science, Electronics | **68** | **YES** |
| `/products/:slug` | {name} \| Builds Your Mind - Eco-Friendly Educational Kits | 65 | **YES** |
| `/catalog/:id` | {name} - Tutorial \| Builds Your Mind | 44 | no |
| `/workshops` | Workshops \| Builds Your Mind - STEM, Robotics, IoT Workshops for Schools | **72** | **YES** |
| `/home-tuition` | Home Tuition Services \| Builds Your Mind - Verified Home Tutors | **63** | **YES** |
| `/for-schools` | For Schools & Partners \| Builds Your Mind | 41 | no |
| `/oem-services` | OEM Services \| Builds Your Mind - Educational Kit Manufacturing | **63** | **YES** |
| `/odm-services` | ODM Services \| Builds Your Mind - Product Design & Development | **62** | **YES** |
| `/distributor-program` | Distributor Program \| Builds Your Mind - Partner With Us | 56 | no (tight) |
| `/retailer-program` | Retailer Program \| Builds Your Mind - Retail Partnership | 56 | no (tight) |
| `/contact` | Contact Us \| Builds Your Mind - Get in Touch | 44 | no |
| `*` (NotFound) | **no Helmet** — inherits the static index.html title | 48 | no |

**7 live titles exceed 60 characters.**

---

## 3. Current H1s (live code)

> **Correction (added in Part 2):** an earlier version of this section wrongly said 10 routes had *no* H1. That was a **grep mistake** — the H1s are written as `<motion.h1>`, which my `<h1` pattern missed. **Every route has exactly one H1.** The table below is the corrected audit of the original code (the Home / About / Contact H1s were then replaced in Part 2).

| Page | H1 today (original) |
|---|---|
| `/` Home | "Smart, Eco-Friendly Learning Kits and Classroom Solutions" |
| `/about` | "Building Minds, Sustaining Earth" |
| `/products` | "Educational Kits" |
| `/products/:slug` | product name (plus a second H1 "Product Not Found" in the not-found branch) |
| `/catalog/:id` | product name, or "Educational Kit Tutorial" |
| `/workshops` | "Interactive Workshops" |
| `/home-tuition` | "Find the Perfect Home Tutor" |
| `/for-schools` | "Partner With Builds Your Mind" |
| `/oem-services` | "OEM Services" |
| `/odm-services` | "ODM Services" |
| `/distributor-program` | "Distributor Program" |
| `/retailer-program` | "Retailer Program" |
| `/contact` | "Contact Us" |
| `*` (NotFound) | "Page Not Found" |

The real H1 gap is not absence — it is that the headings do not carry the sheet's target keywords, and several are generic ("OEM Services", "ODM Services").

---

## 4. Sitemap / robots / schema / other head tags

| Item | Status |
|---|---|
| `robots.txt` | **absent** — not in `public/`, not in `dist/` |
| `sitemap.xml` | **absent** — not in `public/`, not in `dist/`, and no generator in `vite.config.js` |
| Structured data (JSON-LD / schema.org) | **absent** — zero matches for `ld+json`, `itemprop`, `Organization`, `LocalBusiness` in the whole project |
| Canonical tags | **absent** on every page |
| Open Graph / Twitter cards | **absent** (`og:`, `twitter:` — zero matches) |
| `keywords` meta | present **once**, globally, in `index.html` ("educational kits, STEM learning, DIY science kits, eco-friendly education, Harmono") |
| `meta description` (static) | present **once**, globally, in `index.html` — "Builds Your Mind - Eco-Friendly Educational Kits for Schools, Homes & Businesses by Harmono Pvt. Ltd." |
| Per-page meta description | yes, via Helmet, on 13 of 14 routes (NotFound has none) |
| Hreflang | not applicable / absent |

### How the site is served (important)
- It is a **client-side rendered SPA**. `vite.config.js` has no prerender/SSR plugin.
- `vercel.json` and `nginx.conf` both do catch-all rewrites: `try_files $uri $uri/ /index.html`.
- Consequence: `https://buildsyoursmind.in/robots.txt` returns `index.html` with **HTTP 200 and HTML content** instead of a 404. Combined with the file being missing, this is worse than a plain 404 — Google will read HTML as robots.txt and ignore it.
- The static `<title>` and `<meta description>` in `index.html` are what non-JS crawlers and social scrapers see for **every** URL, including `/products` and `/about`.

---

## 5. What looks wrong in the sheet itself (as asked)

**Page IDs — clean.** All 47 `Assigned Page ID` values in `Keyword Map!D2:D48` resolve to a real page in `Page Plan!A2:A16`. No `"Check page ID"` text anywhere. Drop-downs intact.

**URLs — internally consistent, externally mismatched.** All 15 sheet URLs are lowercase, hyphenated, no trailing slash (except `/`). But **12 of 15 do not match any URL the site actually uses**. Example: sheet wants `/stem-workshops-schools-indore`, the site has `/workshops`. If the sheet is built as written without redirects, the existing `/workshops` becomes an orphan/duplicate.

**Titles over 60 chars — NONE.** All 15 sheet titles are 43–59 chars. Closest to the limit: **P04 = 59/60** (1 char left).

**Meta over 155 chars — NONE.** All 15 are 132–150 chars. Closest: **P02 = 150/155**.

**Other sheet items flagged earlier and still true:**
1. `Page Plan!E13` (P13) Focus Keyword = "Verified school and university workshops" — a positioning phrase, not a search term; P13 has **0 keywords** mapped and is **not tracked**.
2. Same for `E03` (P02, "Builds Your Mind STEM education partner") and `E16` (P15, "Workshop enquiry") — brand phrases, **0 keywords each**. P02/P13/P15 are untracked.
3. `How To Use!A11` lists 5 sheets and **omits the Ranking Tracker** (6 working sheets exist).
4. `Technical Checklist` percent can **never reach 100%** — "Not needed" isn't counted as Done but stays in the denominator.
5. `Keyword Map` puts **10 of 47 keywords (21%) on P11**; and #2 (`STEM Education in Indore`) vs #5 (`STEM Education for Schools in Indore`) sit on different pages → cannibalisation risk.
6. Formula ranges in `Keyword Map` and `On-Page SEO` are locked to `Page Plan` rows 2–16. Add a 16th page and the lookups silently break.

---

## 6. Contact data — found it in the code (NOT in the sheet)

The sheet has **no** phone/email/address. The live site does, and it should be the single source of truth:

| Field | Value found | Where |
|---|---|---|
| Email | `buildsyourmind@gmail.com` | `Footer.jsx:171`, `Contact.jsx:61` |
| Phone | `+91 91097 11321` (`tel:+919109711321`) | `Footer.jsx:180`, `Contact.jsx:68`, and repeatedly |
| WhatsApp | `https://wa.me/919109711321` | Footer, Contact, Workshops, ForSchools, HomeTuition |
| Address | `Harmono Pvt. Ltd., Indore, India` | `Footer.jsx:200`, `Contact.jsx:79` |

Issues to fix:
- **`Contact.jsx:61` has a stray leading space:** `" buildsyourmind@gmail.com"`. A copy-paste bug.
- Address has **no street / no PIN code** — weak for LocalBusiness schema and GBP matching.
- Email is a **Gmail**, not a domain address — allowed, but the sheet's "one official identity" rule should name it explicitly.
- Social icons in the footer are **`href="#"` placeholders** (Facebook, Instagram, LinkedIn, YouTube, X) — five dead links.
- Footer links to **`/privacy` and `/terms`**, but **neither route exists** in `App.jsx` → both land on the 404 page.

⚠️ **Security note (outside SEO, but you should know):** `credentials.json` is **tracked in git** at the repo root. If that is a service-account key, it should be removed from the repo and rotated. I did not open it.

---

## 7. Short build plan

**Step 0 — Decision (blocks everything).** Confirm the target business: *eco-friendly kit company + OEM/ODM* (what exists) **or** *STEM workshops for schools in Indore* (what the sheet says). I can't align keywords to pages until this is settled.

**Step 1 — Find out what Google can already see.** Verify GSC + Analytics are installed on the live domain, submit nothing yet, record the current indexed URL list. This decides whether the 15 workshop URLs are new adds or replacements.

**Step 2 — Fix the plumbing (small, high impact).**
- Add `public/robots.txt` and `public/sitemap.xml`, and fix the nginx/Vercel catch-all so a missing file returns a real 404 instead of `index.html`.
- Add `<link rel="canonical">` and Open Graph tags (per page).
- Add `Organization` / `LocalBusiness` JSON-LD once the official address + PIN are confirmed.

**Step 3 — Decide each existing URL's fate.** For every sheet URL that differs from a live URL (`/workshops` vs `/stem-workshops-schools-indore`, etc.), choose: **keep the live URL and edit the sheet**, or **build the new URL and 301-redirect the old one**. Editing the sheet to match live URLs is usually cheaper and safer.

**Step 4 — Fix head tags on pages that exist.** Get every title ≤ 60, and align each H1 with its target keyword (see §3 correction — every page already has one H1, but several are generic).
- Shorten the 7 over-60 titles (§2).
- Rewrite the generic H1s (§3).
- Write titles/metas/H1s for the **9 live routes with no sheet row**.

**Step 5 — Then build missing pages.** Only after Steps 1–4: P04–P08, P10, P12–P14, each as a real page with real content and real photos — no thin pages.

**Step 6 — Only then track.** Leave `Ranking Tracker` and `Monthly Tracking` empty until pages are live; then fill from GSC by hand.

**Order matters:** plumbing and head fixes give faster wins than new pages, and 9 live pages are currently invisible to the sheet.

---

## 8. What I need from you

1. **Which business is the target** — kits/OEM/ODM, or STEM workshops in Indore (Step 0)?
2. Confirm the official contact identity: is `buildsyourmind@gmail.com` / `+91 91097 11321` / `Harmono Pvt. Ltd., Indore` the one to use everywhere? If yes, give me a **full address with PIN**.
3. For the 12 mismatched URLs — **edit the sheet to match the live site**, or **build new URLs + redirects**?
4. Should I add the 9 live-but-unlisted pages (`/products`, `/oem-services`, `/odm-services`, `/distributor-program`, `/retailer-program`, `/home-tuition`, `/for-schools`, etc.) as new rows in the Page Plan?
5. GSC / Analytics status, so I don't guess.

**Stopping here.** No sheet edits, no code edits. Awaiting your OK and the answers above.
