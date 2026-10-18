# Pre-rendering (Vite + React kept)

`npm run build` now does three steps: client build, a server bundle of the same React app (`src/entry-server.jsx`), then `scripts/prerender.mjs`, which writes real HTML for the 22 public pages into `dist/` (title, meta description, canonical, FAQ/organisation schema, H1, body text, internal links).

- Route list: `src/routes.js` (one table used by browser, server and the script).
- Output: `dist/index.html` (home), `dist/<route>.html` for the rest; the empty shell is kept as `dist/200.html` for dynamic URLs (`/products/:slug`, `/catalog/:id`).
- Browser: `src/main.jsx` hydrates the pre-rendered HTML, so pages stay interactive.
- Hosting: nginx uses `try_files $uri $uri.html $uri/ /200.html`; Vercel uses `cleanUrls` and a rewrite to `/200.html`.
- Not pre-rendered: product detail and catalog video pages (data comes from the backend at runtime).
