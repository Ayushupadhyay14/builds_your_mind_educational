# Part 8 — GSC keyword positions script

- **Date:** 19 Oct 2026
- **Script:** `scripts/gsc_positions.py`
- **Config:** `.env` (gitignored) — template at `.env.example`
- **Sheet writes:** Ranking Tracker column E (Month 1), Monthly Tracking row 3
- **Dry run:** tested and shown below. **No live run yet** — needs your GSC OAuth credentials.

## What it does

1. Reads the 47 keywords from `Keyword Map` (rows 2–48, row-aligned with Ranking Tracker).
2. Calls the Google Search Console API (Search Analytics) for the **last 28 days** (ending yesterday, since GSC data has a short delay):
   - one ungrouped query → site totals (clicks, impressions, average position) for Monthly Tracking
   - one query-grouped query (rowLimit 25,000) → per-search-query rows for keyword matching
3. Matches GSC queries to target keywords:
   - **exact** match after normalisation (case/whitespace), else
   - **containment** (query contains the keyword, or keyword contains the query)
   - position = impression-weighted average across matched queries; **no match → `NR`**
4. Writes:
   - **Ranking Tracker** — first empty month column among E/F/G (currently **E**): one position or `NR` per keyword row. The existing formulas in H ("Latest Position"), I (status) and J (places moved) pick the values up automatically.
   - **Monthly Tracking** — first empty month row (currently **row 3**): `A` = month label (e.g. `Oct 2026`), `B` = clicks, `C` = impressions, `E` = site average position, `F` = top 3 queries by impressions. `D` (CTR) is an existing formula. Enquiries/WhatsApp/calls/leads (G–J) come from your enquiry tracker, not GSC.

Credentials are read from `.env`, never from the code. The Google OAuth token is stored at `GSC_TOKEN_PATH` (outside the repo) after the first browser sign-in.

## One-time setup (you do this once)

1. Go to **Google Cloud Console** → create (or pick) a project.
2. **APIs & Services → Library → Search Console API → Enable.**
3. **APIs & Services → OAuth consent screen** → External → fill in the app name + your email → add the scope `https://www.googleapis.com/auth/webmasters.readonly` → add yourself as a test user (if the app is in "Testing" status) → publish.
4. **APIs & Services → Credentials → Create Credentials → OAuth client ID** → application type **Desktop app** → **Download JSON**. Save it where `.env` points (`GSC_CLIENT_SECRETS_PATH`, default `/home/ayush-upadhyay/Downloads/gsc_client_secret.json`).
5. Make sure `buildsyourmind.in` is verified in **Google Search Console** (domain or URL-prefix property — set `GSC_SITE_URL` to match: `sc-domain:buildsyourmind.in` or `https://buildsyourmind.in/`).

`.env` was created for you from `.env.example` — it is gitignored and already points at the standard paths.

## How to run

```bash
cd /home/ayush-upadhyay/buildsyourmindfrontend

# 1. Dry run first (no API call, nothing written - uses sample data):
python3 scripts/gsc_positions.py

# 2. Live run. First time opens a browser for Google sign-in, then saves a
#    refresh token; later runs are headless:
python3 scripts/gsc_positions.py --write

# Optional: different window
python3 scripts/gsc_positions.py --write --days 28
```

Only `google-api-python-client`, `google-auth-oauthlib` and `google-auth` are needed for the live run (`pip install --break-system-packages google-api-python-client google-auth-oauthlib google-auth`).

## Dry run result (19 Oct 2026)

```
Date range: 2026-09-21 to 2026-10-18 (28 days)
Keywords from Keyword Map: 47 (rows 2-48)
Ranking Tracker: writing Month positions to column E
Monthly Tracking: writing to row 3

*** DRY RUN *** using built-in SAMPLE queries (not live data). No API call, nothing written.

Monthly Tracking row 3 plan: A='Oct 2026'  B(clicks)=27  C(impressions)=815  E(avg position)=11.3
  F(top queries)=stem workshops for schools in indore; robotics workshop for schools; coding classes for kids indore

Ranking Tracker column E plan:
  row  4 | STEM Workshops for Schools in Indore          |  8.2  | exact: stem workshops for schools in indore
  row 13 | Robotics Workshop for Schools                 | 12.6  | exact: robotics workshop for schools
  (other rows sample → NR)

2 keywords with data, 45 NR (no matching query in the window)
GSC queries not matched to any keyword: 3
  - stem lab setup school
  - best science exhibition in indore
  - coding classes for kids indore

Dry run complete - nothing written. Re-run with --write to apply.
```

The dry run exercised the real sheet-reading, month-column selection (E), MT-row selection (3), keyword matching and write-plan logic — only the API call and the sheet write are skipped.

## Notes / caveats

- **NR means "no data in the window"** — no GSC query matched the keyword. The dry run's mostly-NR output is a property of the small sample set; live results depend on what Google recorded.
- Matching is deliberately strict (exact, then containment). The dry run lists unmatched GSC queries so you can see what people actually searched for and decide whether to add keywords to the Map.
- The script writes only yellow cells (Ranking Tracker E/F/G data cells, Monthly Tracking row cells) and never touches formulas or structure. It sets full-recalc-on-open; after a live run, open the sheet and press **Ctrl+Alt+F9**.
- The script does not commit anything to git.

## Needed from you

1. Complete the one-time GSC setup above (steps 1–5).
2. Run `python3 scripts/gsc_positions.py --write` (or let me run it for you once credentials exist).
3. After the live run I will verify the sheet (formulas intact, 0 recalc errors) and push.
