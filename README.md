# Abhinav's Space

The source for [abhinavkuchhal.com](https://abhinavkuchhal.com). Plain HTML, one stylesheet, one small script. No build step, no dependencies.

## Run it locally

```bash
python3 scripts/serve.py
```

Then open http://127.0.0.1:4321. The script serves the same clean URLs Vercel does (`/work` → `work.html`).

## Where things live

| File | What it is |
|---|---|
| `index.html` | About: bio, the "few things I've done" ticker, links, signature |
| `work.html` | Retrium OS, the project index, freelance, reels, tools |
| `essays.html` | Links out to Substack |
| `taste.html` | Essays, writers, tweets and rabbit holes, in tabs |
| `press.html` | Press cards |
| `graveyard.html` | The projects graveyard |
| `404.html` | "This page never got printed" |
| `assets/css/site.css` | Colors live at the top as CSS variables (light, then dark) |
| `assets/js/site.js` | Clock, ticker, tabs, heatmap, signature. Every page works without it |
| `vercel.json` | Clean URLs and redirects from the old `/writings` pages |

The masthead, nav and footer are copied into every page. When you add a page or rename one, update the nav in all of them.

## Common edits

- **Add a ticker line:** add an `<li><mark>…</mark></li>` to the `ticker` list in `index.html`, and bump the `1 of 5` count.
- **Add a taste pick:** copy an `<li>` in the right panel of `taste.html`. Add `class="mark"` to the link to give it the red "changed how I think" dot.
- **Add a taste tab:** copy a whole `<section class="panel">` with a new `id` and `data-panel`, and add a matching `<button role="tab">`.
- **Add a press card:** copy the `<article class="press-card">` in `press.html`.
- **Bury a project:** copy an `<li>` in `graveyard.html`.

Search for `TODO` to find what still needs real content (Substack post URL, portrait, signature, reel details).

## Swapping in the real signature and portrait

- **Signature:** export it as an SVG with `fill="currentColor"`, save it as `assets/signature.svg`, and paste its contents into the `.signature` figure in `index.html` in place of the `<text>`. Then remove the Mrs Saint Delafield font link.
- **Portrait:** save it as `assets/img/portrait.webp` (4:5) and replace the `stamp-empty` block in `index.html` with the snippet in the comment above it.
