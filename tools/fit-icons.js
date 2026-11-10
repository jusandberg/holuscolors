// Fit icons onto one shared canvas so any icon can replace any other at the same size.
//
//   node tools/fit-icons.js assets/illustrations             (website icons: 240x200, drawing fills 72%)
//   node tools/fit-icons.js assets --floats                   (floating fruit: 120x120, drawing fills 80%)
//   node tools/fit-icons.js assets/illustrations/new-icon.svg (one file)
//
// Only the <svg> tag's viewBox, width and height change. The drawing is not touched.
// A background rectangle that covers the whole canvas is removed, so scene-style files read as icons.
// Needs Playwright (preinstalled in Claude Code cloud sessions).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const floats = args.includes('--floats');
const target = args.find((a) => !a.startsWith('--'));
const [W, H, FILL] = floats ? [120, 120, 0.8] : [240, 200, 0.72];
if (!target) { console.log('Usage: node tools/fit-icons.js <folder or file.svg> [--floats]'); process.exit(1); }

let files;
if (fs.statSync(target).isDirectory()) {
  files = fs.readdirSync(target).filter((f) => f.endsWith('.svg') && (!floats || f.startsWith('float-'))).map((f) => path.join(target, f));
} else {
  files = [target];
}

const dropBackground = (t) => t.replace(/(<\/defs>|<svg[^>]*>)\s*<rect (?![^>]*\b[xy]=)[^>]*width="(\d+)" height="(\d+)"[^>]*\/>/, (m, pre, w, h) => {
  const v = ((t.match(/viewBox="([^"]+)"/) || [])[1] || '').split(/\s+/);
  return v[2] === w && v[3] === h ? pre : m;
});

(async () => {
  const texts = files.map((f) => dropBackground(fs.readFileSync(f, 'utf8')));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // Measure each drawing's edges from its pixels (anything at least ~10% opaque counts).
  const boxes = await page.evaluate(async (list) => {
    const out = [];
    for (const txt of list) {
      const s = new DOMParser().parseFromString(txt, 'image/svg+xml').documentElement;
      const vb = (s.getAttribute('viewBox') || `0 0 ${parseFloat(s.getAttribute('width'))} ${parseFloat(s.getAttribute('height'))}`).trim().split(/[\s,]+/).map(Number);
      const R = 1200 / Math.max(vb[2], vb[3]);
      const box = [vb[0] - vb[2] * 0.5, vb[1] - vb[3] * 0.5, vb[2] * 2, vb[3] * 2];
      s.setAttribute('viewBox', box.join(' '));
      s.setAttribute('width', Math.round(box[2] * R));
      s.setAttribute('height', Math.round(box[3] * R));
      s.removeAttribute('preserveAspectRatio');
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(s));
      await img.decode();
      const c = document.createElement('canvas');
      c.width = Math.round(box[2] * R); c.height = Math.round(box[3] * R);
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
      for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
        if (d[(y * c.width + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
      out.push(x1 < 0 ? null : [box[0] + x0 / R, box[1] + y0 / R, (x1 - x0 + 1) / R, (y1 - y0 + 1) / R]);
    }
    return out;
  }, texts);
  await browser.close();

  const r = (n) => +n.toFixed(2);
  files.forEach((f, i) => {
    if (!boxes[i]) { console.log('skipped (nothing drawn):', f); return; }
    const [x, y, w, h] = boxes[i];
    const k = Math.max(w / (FILL * W), h / (FILL * H));
    const vw = W * k, vh = H * k, vx = x + w / 2 - vw / 2, vy = y + h / 2 - vh / 2;
    const out = texts[i].replace(/<svg\b[^>]*>/, (tag) => tag
      .replace(/\s(viewBox|width|height|preserveAspectRatio)="[^"]*"/g, '')
      .replace(/<svg/, `<svg viewBox="${r(vx)} ${r(vy)} ${r(vw)} ${r(vh)}" width="${W}" height="${H}"`));
    fs.writeFileSync(f, out);
  });
  console.log(`Fitted ${files.length} icon(s) to ${W}x${H}.`);
})();
