# Abhinav's Space

The source for [abhinavkuchhal.com](https://abhinavkuchhal.com). Plain HTML, one stylesheet, one small script, one font (VCR OSD Mono by Riciery Leal, free from dafont). No build step, no dependencies. Dark only: white, black and grays.

## Run it locally

```bash
python3 scripts/serve.py
```

Then open http://127.0.0.1:4321. The script serves the same clean URLs Vercel does (`/work` → `work.html`).

## Where things live

| File | What it is |
|---|---|
| `index.html` | About: must fit one screen without scrolling. Keep it short |
| `work.html` | Retrium OS, the project list, freelance, reels, tools |
| `essays.html` | Links out to Substack |
| `taste.html` | Essays, writers, tweets and rabbit holes, in tabs |
| `press.html` | Press cards |
| `graveyard.html` | The projects graveyard |
| `404.html` | "No signal" |
| `assets/css/site.css` | Colors at the top as CSS variables |
| `assets/js/site.js` | Clock, play counter, background video, ticker, tabs, heatmap. Every page works without it |
| `vercel.json` | Clean URLs and redirects from the old `/writings` pages |

The title bar, nav, background and corners are the same block of markup in every page. If you add or rename a page, update the nav in all of them.

## Background footage

Every page has a `<video class="tv-video" data-src="">` near the top of `<body>`. Put the clip in `assets/video/` (short, muted, MP4, ideally under 5 MB) and set `data-src="/assets/video/your-clip.mp4"` on every page. CSS turns it into old black-and-white TV: grayscale, dimmed, slightly blurred, with grain and scanlines on top. It picks up where it left off when you move between pages.

## Common edits

- **Ticker line on About:** add an `<li><mark>…</mark></li>` to the `ticker` list and bump the `1 of 5` count.
- **Taste pick:** copy an `<li>` in the right section of `taste.html`. Add `class="mark"` to the link for the "changed how I think" dot.
- **Taste tab:** copy a whole `<section data-panel>` with a new `id` and `data-panel`, and add a matching `<button role="tab">`.
- **Press card:** copy the `<article class="press-card">` in `press.html`.
- **Bury a project:** copy an `<li>` in `graveyard.html`.
- **Signature:** save the PNG as `assets/img/signature.png` (white on transparent) and uncomment the `<figure class="signature">` at the end of `index.html`.

Search for `TODO` to find what still needs real content.
