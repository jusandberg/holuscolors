# hōlus. test site: working rules

Static site on GitHub Pages (served from `main`). Self-contained HTML, no build step.

## Layout rules (from the site owner, always follow)

- **One line for headings and their sentence.** A section heading stays on one line, and the sentence directly under it stays on one line, at every screen size where that is readable. If it can't fit on phones, scale the heading down (e.g. `white-space:nowrap; font-size:min(…, Nvw)`); if a sentence still won't fit, suggest shorter wording rather than letting it wrap.
- `fit-headings.js` (loaded on every page) enforces the heading rule automatically: it keeps each `h1`/`h2` on one line, shrinking it only as needed (floor 16px), and puts a one-sentence intro on one line when it fits. New pages must load it.
- `reveal.js` (loaded on every page) fades content up as it scrolls into view. New pages must load it too.
- **Keep white space tight.** Avoid large gaps between sections, especially where two `section-pad` sections meet. Check the gap at desktop and phone widths.
- Check every layout change at desktop (1280px) and phone (390px) before pushing.

## Look

- Palette: charcoal `#16191c`, navy `#243341`, sage `#71836d` (deep `#4b5d49`, light `#c7d2c4`), oat gold `#c7b07a`, dusty blue `#8aa3b0` (deep `#3b5562`), clay `#b4877b` (rose clay `#ad6459`), plum `#9c8aa2`. New colours must be tints of these.
- Icons live in `assets/illustrations/` on a shared 240×200 canvas. Fit new icons with `node tools/fit-icons.js <file>`, then rebuild the list with `node tools/build-icon-list.js`. Colour variants are new files (e.g. `object-jar-navy.svg`) with their own gradient ids.

## Content

- Plain, natural wording. Canadian spelling. Never name, suggest or imply a diagnosis or condition.
- Every page keeps `<meta name="robots" content="noindex, nofollow">`.
