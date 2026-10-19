#!/usr/bin/env python3
"""
Fetch keyword positions from Google Search Console (last 28 days) and write
them into the SEO sheet's Ranking Tracker (next empty month column, E/F/G)
and Monthly Tracking.

Credentials live in .env at the repo root (gitignored) - NEVER in this code.

Usage:
    python scripts/gsc_positions.py            # DRY RUN (default): no API call, no writes
    python scripts/gsc_positions.py --write    # live run: calls GSC API and writes the sheet
    python scripts/gsc_positions.py --write --days 28

.env keys (see .env.example):
    GSC_SITE_URL              e.g. sc-domain:buildsyourmind.in  (or https://buildsyourmind.in/)
    GSC_CLIENT_SECRETS_PATH   OAuth client JSON downloaded from Google Cloud Console
    GSC_TOKEN_PATH            where the OAuth token is stored after first login
    SHEET_PATH                path to Builds_Your_Mind_Website_SEO_Sheet.xlsx
    DAYS                      look-back window (default 28)

First live run opens a browser for Google sign-in, then saves a refresh token
at GSC_TOKEN_PATH so later runs are headless.
"""

import argparse
import datetime as dt
import json
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = REPO_ROOT / ".env"
SHEET_DEFAULT = "/home/ayush-upadhyay/Downloads/Builds_Your_Mind_Website_SEO_Sheet.xlsx"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

# Rows in the sheets (row-aligned: Ranking Tracker row N <-> Keyword Map row N)
KEYWORD_FIRST_ROW = 2
KEYWORD_LAST_ROW = 48
MONTH_COLUMNS = ["E", "F", "G"]  # Month 1, Month 2, Month 3 position columns
MT_FIRST_DATA_ROW = 3            # Monthly Tracking first month row

# Sample data used ONLY by --dry-run to demonstrate the matching logic.
SAMPLE_QUERIES = [
    {"query": "stem workshops for schools in indore", "clicks": 12, "impressions": 340, "position": 8.2},
    {"query": "robotics workshop for schools", "clicks": 7, "impressions": 210, "position": 12.6},
    {"query": "stem lab setup school", "clicks": 3, "impressions": 90, "position": 5.4},
    {"query": "best science exhibition in indore", "clicks": 1, "impressions": 45, "position": 22.1},
    {"query": "coding classes for kids indore", "clicks": 4, "impressions": 130, "position": 17.9},
]


# ---------------------------------------------------------------- config

def load_env(path):
    """Minimal .env parser (avoids a python-dotenv dependency)."""
    env = {}
    if not path.exists():
        return env
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, val = line.split("=", 1)
        env[key.strip()] = val.strip().strip('"').strip("'")
    return env


def validate_env(env):
    missing = [k for k in ("GSC_SITE_URL", "GSC_CLIENT_SECRETS_PATH", "GSC_TOKEN_PATH", "SHEET_PATH") if not env.get(k)]
    if missing:
        sys.exit("Missing .env keys: " + ", ".join(missing) + "  (see .env.example)")
    site = env["GSC_SITE_URL"]
    if not (site.startswith("http://") or site.startswith("https://") or site.startswith("sc-domain:")):
        sys.exit("GSC_SITE_URL must look like https://buildsyourmind.in/ or sc-domain:buildsyourmind.in")
    if not Path(env["GSC_CLIENT_SECRETS_PATH"]).exists():
        sys.exit("Client secrets file not found: " + env["GSC_CLIENT_SECRETS_PATH"])
    if not Path(env["SHEET_PATH"]).exists():
        sys.exit("Sheet not found: " + env["SHEET_PATH"])


# ---------------------------------------------------------------- matching

def norm(s):
    return re.sub(r"\s+", " ", str(s).strip().lower())


def aggregate(rows):
    """Impression-weighted average position across matched GSC queries."""
    impr = sum(r["impressions"] for r in rows)
    clicks = sum(r["clicks"] for r in rows)
    pos = sum(r["position"] * r["impressions"] for r in rows) / impr if impr else None
    return {"position": round(pos, 1) if pos is not None else None,
            "clicks": clicks, "impressions": impr,
            "matched_queries": [r["query"] for r in rows]}


def match_keywords(keywords, query_rows):
    """
    Map GSC queries onto target keywords.
    1) exact match after normalisation (case/whitespace)
    2) containment: query contains keyword, or keyword contains query
    No match -> None (written as 'NR').
    """
    by_norm = {}
    for row in query_rows:
        by_norm.setdefault(norm(row["query"]), []).append(row)

    plan, unmatched = [], []
    used = set()
    for kw in keywords:
        nkw = norm(kw)
        if nkw in by_norm:
            agg = aggregate(by_norm[nkw])
            used.add(nkw)
            plan.append((kw, agg, "exact"))
            continue
        hits = [q for q in by_norm if nkw in q or q in nkw]
        if hits:
            rows = [r for h in hits for r in by_norm[h]]
            agg = aggregate(rows)
            used.update(hits)
            plan.append((kw, agg, "contains"))
            continue
        plan.append((kw, None, "no data"))
    unmatched = [q for q in by_norm if q not in used]
    return plan, unmatched


# ---------------------------------------------------------------- GSC API

def get_service(secrets_path, token_path):
    """OAuth2 user flow (GSC API does not accept plain API keys or service accounts)."""
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    creds = None
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(secrets_path, SCOPES)
            creds = flow.run_local_server(port=0)  # opens a browser once
        with open(token_path, "w") as fh:
            fh.write(creds.to_json())
        print(f"OAuth token saved to {token_path}")
    return build("searchconsole", "v1", credentials=creds)


def fetch_gsc(service, site_url, start, end):
    """Site totals + per-query rows for the date range."""
    body = {"startDate": start, "endDate": end}
    totals = service.searchanalytics().query(siteUrl=site_url, body=body).execute()
    body_q = dict(body, dimensions=["query"], rowLimit=25000)
    per_query = service.searchanalytics().query(siteUrl=site_url, body=body_q).execute()
    t = totals.get("rows", [{}])[0]
    queries = [{"query": r["keys"][0], "clicks": r.get("clicks", 0),
                "impressions": r.get("impressions", 0), "position": r.get("position", 0)}
               for r in per_query.get("rows", [])]
    return {"clicks": t.get("clicks", 0), "impressions": t.get("impressions", 0),
            "position": round(t.get("position", 0), 1), "queries": queries}


# ---------------------------------------------------------------- sheet io

def read_keywords(sheet_path):
    import openpyxl
    wb = openpyxl.load_workbook(sheet_path)
    km = wb["Keyword Map"]
    out = []
    for r in range(KEYWORD_FIRST_ROW, KEYWORD_LAST_ROW + 1):
        kw = km.cell(row=r, column=2).value
        if kw and str(kw).strip():
            out.append((r, str(kw).strip()))
    return out


def pick_month_column(sheet_path):
    """First month column (E/F/G) whose data rows are all empty."""
    import openpyxl
    wb = openpyxl.load_workbook(sheet_path)
    rt = wb["Ranking Tracker"]
    for col in MONTH_COLUMNS:
        if all(rt[f"{col}{r}"].value in (None, "") for r in range(KEYWORD_FIRST_ROW, KEYWORD_LAST_ROW + 1)):
            return col
    return None


def pick_mt_row(sheet_path):
    """First Monthly Tracking month row with no clicks value yet."""
    import openpyxl
    wb = openpyxl.load_workbook(sheet_path)
    mt = wb["Monthly Tracking"]
    for r in range(MT_FIRST_DATA_ROW, MT_FIRST_DATA_ROW + 12):
        if mt[f"A{r}"].value and mt[f"B{r}"].value in (None, ""):
            return r
    return None


def write_sheet(sheet_path, keywords, plan, month_col, mt_row, mt_label, mt_clicks, mt_impressions, mt_position, top_queries):
    import openpyxl
    wb = openpyxl.load_workbook(sheet_path)
    rt = wb["Ranking Tracker"]
    for (row, kw), (kw2, agg, how) in zip(keywords, plan):
        rt[f"{month_col}{row}"] = agg["position"] if agg else "NR"
    mt = wb["Monthly Tracking"]
    mt[f"A{mt_row}"] = mt_label
    mt[f"B{mt_row}"] = mt_clicks
    mt[f"C{mt_row}"] = mt_impressions
    mt[f"E{mt_row}"] = mt_position
    mt[f"F{mt_row}"] = "; ".join(top_queries)
    wb.calculation.fullCalcOnLoad = True
    wb.save(sheet_path)


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--write", action="store_true", help="call the GSC API and write the sheet (default: dry run)")
    ap.add_argument("--days", type=int, default=int(os.environ.get("DAYS", "28")), help="look-back window (default 28)")
    args = ap.parse_args()

    env = load_env(ENV_PATH)
    if not env and not args.write:
        # Dry run still wants the real keyword list, so the sheet path is required,
        # but credential paths can wait for the live run.
        if not Path(SHEET_DEFAULT).exists() and "SHEET_PATH" not in env:
            sys.exit("Sheet not found. Set SHEET_PATH in .env (see .env.example).")
    env.setdefault("SHEET_PATH", SHEET_DEFAULT)
    sheet_path = env["SHEET_PATH"]

    end = dt.date.today() - dt.timedelta(days=1)   # GSC data has a short delay
    start = end - dt.timedelta(days=args.days - 1)
    print(f"Date range: {start} to {end} ({args.days} days)")

    keywords = read_keywords(sheet_path)
    print(f"Keywords from Keyword Map: {len(keywords)} (rows {KEYWORD_FIRST_ROW}-{KEYWORD_LAST_ROW})")

    month_col = pick_month_column(sheet_path)
    if not month_col:
        sys.exit("Ranking Tracker: month columns E, F and G are all full - add a month column first.")
    mt_row = pick_mt_row(sheet_path)
    if not mt_row:
        sys.exit("Monthly Tracking: no empty month row found.")
    print(f"Ranking Tracker: writing Month positions to column {month_col}")
    print(f"Monthly Tracking: writing to row {mt_row}")

    if args.write:
        validate_env(env)
        service = get_service(env["GSC_CLIENT_SECRETS_PATH"], env["GSC_TOKEN_PATH"])
        gsc = fetch_gsc(service, env["GSC_SITE_URL"], str(start), str(end))
        query_rows = gsc["queries"]
        mt_clicks, mt_impr, mt_pos = gsc["clicks"], gsc["impressions"], gsc["position"]
        top = sorted(query_rows, key=lambda r: -r["impressions"])[:3]
        top_queries = [t["query"] for t in top]
        print(f"GSC returned {len(query_rows)} queries, {mt_clicks} clicks, {mt_impr} impressions, avg position {mt_pos}")
    else:
        # DRY RUN - sample data only, clearly marked. No API call, no writes.
        print("\n*** DRY RUN *** using built-in SAMPLE queries (not live data). No API call, nothing written.")
        query_rows = SAMPLE_QUERIES
        mt_clicks = sum(q["clicks"] for q in SAMPLE_QUERIES)
        mt_impr = sum(q["impressions"] for q in SAMPLE_QUERIES)
        mt_pos = round(sum(q["position"] * q["impressions"] for q in SAMPLE_QUERIES) / mt_impr, 1)
        top_queries = [q["query"] for q in sorted(SAMPLE_QUERIES, key=lambda r: -r["impressions"])[:3]]

    plan, unmatched = match_keywords([kw for _, kw in keywords], query_rows)

    mt_label = end.strftime("%b %Y")
    print(f"\nMonthly Tracking row {mt_row} plan: A='{mt_label}'  B(clicks)={mt_clicks}  "
          f"C(impressions)={mt_impr}  E(avg position)={mt_pos}  F(top queries)={'; '.join(top_queries)}")
    print(f"\nRanking Tracker column {month_col} plan:")
    nr = 0
    for (row, kw), (kw2, agg, how) in zip(keywords, plan):
        if agg:
            print(f"  row {row:>2} | {kw[:45]:<45} | {agg['position']:>6} | {how}: {', '.join(agg['matched_queries'])}")
        else:
            nr += 1
            print(f"  row {row:>2} | {kw[:45]:<45} |   NR  |")
    print(f"\n{len(plan) - nr} keywords with data, {nr} NR (no matching query in the window)")
    if unmatched:
        print(f"GSC queries not matched to any keyword: {len(unmatched)}")
        for q in unmatched[:15]:
            print(f"  - {q}")

    if args.write:
        write_sheet(sheet_path, keywords, plan, month_col, mt_row, mt_label,
                    mt_clicks, mt_impr, mt_pos, top_queries)
        print(f"\nWROTE sheet: {sheet_path} (Ranking Tracker {month_col}2:{month_col}{KEYWORD_LAST_ROW}, "
              f"Monthly Tracking row {mt_row}). Open it and press Ctrl+Alt+F9 to recalculate.")
    else:
        print("\nDry run complete - nothing written. Re-run with --write to apply.")


if __name__ == "__main__":
    main()
