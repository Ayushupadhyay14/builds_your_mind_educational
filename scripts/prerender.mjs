// Build-time pre-render. Run after `vite build` and the SSR build:
//   vite build && vite build --ssr src/entry-server.jsx --outDir dist-server && node scripts/prerender.mjs
// For every pre-rendered route this writes real HTML (title, meta, canonical,
// schema, H1 and body text) into dist/. The original empty shell is kept as
// dist/200.html and is used as the fallback for dynamic URLs (e.g. /products/:slug).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.mjs');

const { render, prerenderPaths } = await import(pathToFileURL(serverEntry).href);

const shellPath = path.join(dist, '200.html');
// First run: keep the untouched Vite shell. Later runs reuse it.
if (!fs.existsSync(shellPath)) fs.copyFileSync(path.join(dist, 'index.html'), shellPath);
const template = fs.readFileSync(shellPath, 'utf8');


let count = 0;
for (const route of prerenderPaths) {
  const { html, helmet } = render(route);

  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  let page = template
    // The shell's generic title and description are replaced by the page's own.
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta[^>]*name="description"[^>]*>\s*/i, '')
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  if (!page.includes(`<div id="root">${html.slice(0, 40)}`)) {
    throw new Error(`Could not inject markup for ${route}`);
  }

  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), page);
  count += 1;
  console.log(`prerendered ${route.padEnd(40)} -> dist/${file}`);
}
console.log(`\n${count} pages pre-rendered.`);
