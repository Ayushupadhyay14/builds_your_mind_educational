# Builds Your Mind — Website SEO Sheet: Part 1 Audit

- **Part:** 1 of the agreed plan — *Audit only, no edits*
- **Master file:** `Builds_Your_Mind_Website_SEO_Sheet.xlsx` (34,071 bytes, last modified 18 Oct 2026 23:41)
- **Date of audit:** 18 Oct 2026
- **Sheets changed:** none. No yellow cell, header, drop-down, note or formula was touched.
- **Result:** file opened read-only, recalculated, inspected. **Zero formula errors.**

---

## 1. Recalculation result

| Check | Result |
|---|---|
| Formulas in workbook | **499** |
| Formula cells that recalculate to an error (`#REF!`, `#VALUE!`, `#DIV/0!`, `#N/A`, `Check page ID`, etc.) | **0** |
| Cross-sheet lookups resolving correctly (`INDEX/MATCH`, `COUNTIF`, `COUNTA`) | all resolve |

Method note (being straight about it): this machine has no Microsoft Excel and no LibreOffice, so the file was recalculated with a Python formula engine (`formulas`), then every computed value was read back and checked. The engine reports 0 error values. **Please also press Ctrl+Alt+F9 once when you next open the file in Excel** to get an Excel-side confirmation — that is the number that counts for your "zero formula errors" rule.

### Spot-checked computed values (all correct)

- `Page Plan!F2..F16` — keyword count per page: P01 **3**, P02 **0**, P03 **3**, P04 **5**, P05 **2**, P06 **2**, P07 **2**, P08 **4**, P09 **8**, P10 **4**, P11 **10**, P12 **3**, P13 **0**, P14 **1**, P15 **0**. Sum = **47** = `Keyword Map!C51` total. ✅
- `Keyword Map!E/F` — every Page ID in `D2:D48` resolves to a real page in `Page Plan`. **No "Check page ID" text anywhere.** ✅
- `On-Page SEO!E/F/H/I` — 15/15 titles **OK** (43–59 chars), 15/15 meta descriptions **OK** (132–150 chars). ✅
- `Technical Checklist!D28:D30` — Items Done **0**, Total Items **25**, Percent Done **0%**. ✅
- `Ranking Tracker!M2` — Keywords tracked **47**; `M8` — Not checked yet **47**. ✅
- `Monthly Tracking!D2` — click-rate formula computes (0.0343 on the sample row). ✅

---

## 2. Structure confirmed intact (nothing to fix here)

- **Sheet names:** `How To Use`, `Page Plan`, `Keyword Map`, `On-Page SEO`, `Technical Checklist`, `Ranking Tracker`, `Monthly Tracking` — all present, correct spelling.
- **Headers:** unchanged in all 7 sheets, A1 row.
- **Drop-downs (data validation):**
  - `Page Plan!H2:H16` → Not started / In progress / Live / Needs update
  - `Keyword Map!D2:D48` → list from `Page Plan!$A$2:$A$16`
  - `Keyword Map!I2:I48` → Not started / Added to page / Checked
  - `Technical Checklist!F2:F26` → Not started / In progress / Done / Not needed
  - `Ranking Tracker!E2:G48` → custom rule: number or `NR`
- **Locked internal ranges:** `Keyword Map` and `On-Page SEO` look up `Page Plan!$A$2:$A$16` / `$B$2:$B$16` / `$C$2:$C$16`. Correct for the current 15 pages.

### Yellow (editable) cell map — for reference, untouched
| Sheet | Yellow cells |
|---|---|
| Page Plan | H2:H16 (Status) — 15 |
| Keyword Map | D2:D48 (Page ID), I2:I48 (Status) — 94 |
| On-Page SEO | D, G, J on rows 2–16 (Title, Meta, H1) — 45 |
| Technical Checklist | F2:F26 (Status) — 25 |
| Ranking Tracker | D2:G48 (Date added, M1–M3 position) — 188 |
| Monthly Tracking | A–C, E–K on rows 2–8 — 70 |

---

## 3. Blockers — I need these from you (I will not invent them)

1. **Official contact identity does not exist anywhere in the file.** I searched every sheet for a phone number, email address, landline, PIN code or street address. **Nothing found** — the only business identifier present is the domain `buildsyourmind.in`.
   This blocks: `Technical Checklist` items 1 and 2 (one official phone/email/address on every page; matching GBP/Facebook/Instagram/WhatsApp), the `Contact` page P15 content, footer content, and `Organization`/local-business schema (checklist item 18).
   → **Please give me the one official phone, email and full address you want used everywhere.**

2. **Google Search Console + Analytics access.** Checklist items 3–5 (GSC verified, GA added, sitemap submitted) can only be marked once someone has done them. Tell me if they already exist so I can set status honestly instead of guessing.

3. **Google Business Profile / social profile details** — not part of this workbook, but checklist item 2 compares the website against them. I need the exact NAP currently on those profiles so we can make them match.

---

## 4. Data gaps (not errors — just empty, correctly empty)

- **Ranking Tracker:** 47 keywords wired up and formula-ready, but **no dates and no positions entered** (all "Not checked yet"). That is correct until the pages go live. The sheet will only be honest once GSC data is entered by hand.
- **Monthly Tracking:** 6 months blank by design. Row 2 is a labelled `Example: Jan 2027 (delete)` sample with invented figures (120 clicks, 3500 impressions, 3.5%). It is clearly marked and yellow, but **it must be deleted before you use the sheet for real reporting** — otherwise a made-up month sits in the record.
- **Technical Checklist:** 0 of 25 items Done (0%). Expected at this stage.

---

## 5. Findings worth a decision (no edits made)

| # | Where | What I found | Why it matters | Suggested action (later part) |
|---|---|---|---|---|
| A | `How To Use!A11` + sheet list | "WHAT THIS FILE DOES" lists only **5** sheets (items 1–5) and **omits the `Ranking Tracker`**, though the file has 6 working sheets. | A small internal contradiction; a reader following the list may not open the tracker. | Fix the list text (this cell is *not* yellow — confirm you want prose text touched). |
| B | `Page Plan!E14` (P13) | Main Focus Keyword = *"Verified school and university workshops"* — a positioning phrase, not something a person types into Google. | P13 shows **0 keywords mapped**, so P13 is **not tracked** in the Ranking Tracker. | Confirm P13 is intentionally a proof page with no tracked keyword, or give me one real keyword for it. |
| C | `Page Plan!E03` (P02), `E16` (P15) | P02 focus = *"Builds Your Mind STEM education partner"*; P15 focus = *"Workshop enquiry"* — brand/internal phrases. | Same as B: P02 and P15 have **0 keywords mapped** and are untracked. | Confirm intentional. |
| D | `Keyword Map` #2 vs #5 | `STEM Education in Indore` → **P01** and `STEM Education for Schools in Indore` → **P09**. | Two pages chasing near-identical intent = cannibalisation risk (the risk the sheet's own checklist item 10 warns about). | Later: sharpen the split (P01 = company/overview, P09 = programme) in the On-Page copy. |
| E | `Keyword Map` → **P11** | **10 of 47 keywords (21%)** sit on the single Partnership & MOU page (all the `MOU`, `Partnership`, `Partner` variants). | High keyword concentration on one page; close variants can dilute each other. | Later: review whether 2–3 of these belong on a separate page or should be de-prioritised. |
| F | `Keyword Map` (all 47) | **29 of 47 keywords carry no city/state modifier** (e.g. *Robotics Workshop for Schools*, *STEM Education MOU*). | These are national/generic; a local Indore site will rank slowly for them. Not wrong — just set expectations. | Later: keep them mapped, but treat local-modifier keywords as the priority tier. |
| G | `Technical Checklist!D30` | Percent Done = `COUNTIF(F,"Done") / COUNTA(C)`. The drop-down also allows **"Not needed"**, which is **not** counted as Done. | An item that is genuinely "Not needed" still sits in the denominator, so the sheet can **never reach 100%**. | Later: decide whether "Not needed" should count as complete (one small formula tweak). |
| H | `On-Page SEO!D5` (P04) | Title length **59 / 60**. | Only **1 character of headroom**; any edit to the page name will trip "Too long". | Later: trim ~4–5 chars for safety when we finalise titles. |
| I | `Ranking Tracker` column K | Column **K is absent** (headers jump from J to L "SUMMARY"). | Cosmetic only; formulas unaffected. | Leave unless you want tidy columns. |
| J | `Ranking Tracker!D` | "Date Added on Website" is manual (no formula link to `Keyword Map`). | Fine, but dates won't auto-fill; must be typed. | Just be aware. |

### Rule-compliance scan (your RULES section)
- **No "best" / "No.1" / "#1" / "leading" / "award-winning" claims** anywhere in page copy. The only matches for those words are in the *rule-reminder text* on `How To Use!A27` and `Technical Checklist!C25` ("No fake reviews, no 'best' or 'No.1' claims…"). ✅
- **No fake reviews, no claimed MOUs, no invented partners.** `On-Page SEO!K12` correctly says "Verified Partners (only real ones)" and "Past Workshops (with permission)". ✅
- **No copied competitor text** — none present. ✅
- **No keyword stuffing** in the drafted titles/metas/H1s — one focus keyword per page, reads naturally. ✅
- **One-page-one-main-keyword:** holds at page level; see finding D (cannibalisation) and E (concentration). ⚠️
- **Real services only:** all 15 pages map to services the Master File lists. ✅
- **One official phone/email/address:** **cannot be checked — none exists yet (blocker 1).** ⛔

---

## 6. Part 1 summary

**What I changed**
- Nothing in the workbook. The only new file is this audit report: `docs/seo/part-01-audit.md` (committed to the website repo).

**What I could not do**
- Confirm the file is error-free *inside Excel* (no Excel/LibreOffice here) — engine says 0 errors; please confirm with Ctrl+Alt+F9.
- Verify the "one official contact" rule, because no phone/email/address exists in the file.
- Check anything against Google Search Console, rankings, reviews or competitors — no access and I won't invent data.

**What I need from you**
1. The **one official phone, email and full address** to use everywhere (unblocks checklist items 1, 2, 18 and page P15).
2. Confirmation that P02, P13 and P15 are **intentionally untracked** (findings B and C), or the real keyword for each.
3. Whether **"Not needed"** should count as complete in the Technical Checklist percent (finding G).
4. Whether I may edit the **non-yellow** "How To Use" prose line that omits the Ranking Tracker (finding A).
5. GSC/GA status (checklist items 3–5) so I can set those statuses truthfully.

**Stopping here.** I will not start Part 2 until you say OK and name the part.
