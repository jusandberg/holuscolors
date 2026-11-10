# Changing icons on the hōlus. test site

All icons are drawn on the same canvas and fill the same share of it, so any icon can replace any other and come out the same size.

- Website icons (`assets/illustrations/`): 240 × 200 canvas, drawing fills about 72%.
- Floating fruit (`assets/float-*.svg`): 120 × 120 canvas, drawing fills about 80%.

## Swap an icon on a page

1. Open **icons.html** on the site (jusandberg.github.io/holuscolors/icons.html). The **Where they're used** table shows each page file and the icons on it. Below it is every icon with its file name.
2. On GitHub, open that page file and tap the pencil to edit.
3. Use find (Ctrl+F or Cmd+F) to search for the old icon's file name.
4. Replace only the name, for example change `drink-smoothie.svg` to `food-mango.svg`. Keep the folder part (`../assets/illustrations/`) the same.
5. Tap **Commit changes**. The site updates in a minute or two.

## Swap a floating fruit

Floating fruit are set in `script.js`, in the list called `FLOATS` (one line per page). Change the fruit name, for example `'strawberry'` to `'lemon'`. Use the name without `float-` and `.svg`. The other numbers on that line set position, size and tilt; leave them as they are.

## Add a new icon

1. Upload the `.svg` into `assets/illustrations` (or `assets/` named `float-something.svg` for a floating fruit).
2. Use its name on a page the same way as above.
3. To make it match the others in size, ask Claude to run:
   - `node tools/fit-icons.js assets/illustrations/your-icon.svg` for a website icon
   - `node tools/fit-icons.js assets --floats` for floating fruit

   This only changes the icon's canvas, not the drawing.
4. To add it to the list on icons.html, ask Claude to run `node tools/build-icon-list.js`.

New icons should follow the style rules in the hōlus. visuals README: soft top-to-bottom gradients, no outlines, colours from the site palette, and gradient ids that start with the file name.
