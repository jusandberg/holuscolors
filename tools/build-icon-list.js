// Rebuild icons.html: every icon with its file name, plus a live list of where each one is used.
//   node tools/build-icon-list.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const illus = fs.readdirSync(path.join(root, 'assets/illustrations')).filter((f) => f.endsWith('.svg')).sort();
const floats = fs.readdirSync(path.join(root, 'assets')).filter((f) => /^float-.*\.svg$/.test(f)).sort();

// Pages that show icons. The "Where they're used" table reads these live, so it never goes stale.
const pages = [
  ['Home', 'index.html'],
  ['About', 'about/index.html'],
  ['Services', 'nutritional-counselling/index.html'],
  ['Approach', 'nutrition-behaviour-change/index.html'],
  ['Midlife', 'midlife-nutrition/index.html'],
  ['GLP-1', 'glp1-nutrition-support/index.html'],
  ['Digest', 'digest/index.html'],
  ['FAQ', 'faq/index.html'],
  ['Contact', 'contact/index.html'],
];

const card = (src, name) => `<figure><img src="${src}" alt="" loading="lazy"><figcaption>${name}</figcaption></figure>`;

const html = `<!DOCTYPE html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>hōlus. icon list</title>
<style>body{margin:0;font:15px/1.5 Inter,Arial,sans-serif;color:#16191c;background:#fff}.w{width:min(100% - 2rem,70rem);margin:0 auto;padding:2.5rem 0 4rem}h1{font:800 2.2rem Manrope,Arial,sans-serif;letter-spacing:-.04em;margin:0 0 .5rem}h2{margin:2.5rem 0 1rem}p,li{color:#4a4d52;max-width:46rem}code{background:#f5f5f7;padding:.1rem .4rem;border-radius:6px;color:#16191c}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(8.5rem,1fr));gap:.6rem}figure{margin:0;padding:.8rem .4rem;border-radius:18px;background:#f5f5f7;text-align:center}figure img{width:6rem;aspect-ratio:240/200;height:auto;object-fit:contain}.fl figure img{width:4.5rem;aspect-ratio:1}figcaption{font-size:.72rem;color:#6e6e73;word-break:break-all;user-select:all}
table{border-collapse:collapse;width:100%;font-size:.85rem}td,th{text-align:left;padding:.35rem .5rem;border-bottom:1px solid #eee;vertical-align:middle}td img{width:2.6rem;aspect-ratio:240/200;height:auto;object-fit:contain;vertical-align:middle}td code{user-select:all}</style></head><body><div class="w">
<h1>Icon list</h1>
<p>Every icon sits on the same 240 × 200 canvas and fills the same share of it, so any icon can replace any other and come out the same size. Floating fruit all share a 120 × 120 canvas.</p>
<h2>How to swap an icon</h2>
<ol>
<li>Find the spot in <strong>Where they're used</strong> below. It shows the page file and the icon there now.</li>
<li>On GitHub, open that page file and tap the pencil to edit.</li>
<li>Use find (Ctrl+F or Cmd+F) to search for the old file name, for example <code>drink-smoothie.svg</code>.</li>
<li>Change only the name, for example to <code>food-mango.svg</code>. Keep the folder part (<code>../assets/illustrations/</code>) as it is.</li>
<li>Commit. The site updates in a minute or two.</li>
</ol>
<p>Floating fruit are set in <code>script.js</code>, in the list called <code>FLOATS</code>. Change the fruit name there, for example <code>'strawberry'</code> to <code>'lemon'</code> (the name without <code>float-</code> and <code>.svg</code>).</p>
<p>New icons: see <code>HOW-TO-CHANGE-ICONS.md</code>.</p>
<h2>Where they're used</h2>
<div id="used"><p>Loading…</p></div>
<h2>Illustrations (${illus.length})</h2><div class="g">${illus.map((f) => card('assets/illustrations/' + f, f)).join('')}</div>
<h2>Floating fruit (${floats.length})</h2><div class="g fl">${floats.map((f) => card('assets/' + f, f.replace(/^float-|\.svg$/g, ''))).join('')}</div>
</div>
<script>
(async () => {
  const pages = ${JSON.stringify(pages)};
  const rows = [];
  for (const [label, file] of pages) {
    try {
      const res = await fetch(file);
      if (!res.ok) continue;
      const text = await res.text();
      const counts = {};
      for (const m of text.matchAll(/illustrations\\/([a-z0-9-]+\\.svg)/g)) counts[m[1]] = (counts[m[1]] || 0) + 1;
      for (const [name, n] of Object.entries(counts)) rows.push([label, file, name, n]);
    } catch (e) { /* page could not be read; skip it */ }
  }
  const box = document.getElementById('used');
  if (!rows.length) { box.innerHTML = '<p>Open this page on the live site to see where each icon is used.</p>'; return; }
  box.innerHTML = '<table><tr><th>Page</th><th>File to edit</th><th>Icon</th><th>Times</th></tr>' +
    rows.map(([l, f, n, c]) => '<tr><td>' + l + '</td><td><code>' + f + '</code></td><td><img src="assets/illustrations/' + n + '" alt=""> <code>' + n + '</code></td><td>' + c + '</td></tr>').join('') + '</table>';
})();
</script>
</body></html>
`;

fs.writeFileSync(path.join(root, 'icons.html'), html);
console.log(`icons.html: ${illus.length} illustrations, ${floats.length} floating fruit.`);
