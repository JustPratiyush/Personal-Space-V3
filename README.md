# Abhinav's Space

The source for [abhinavkuchhal.com](https://abhinavkuchhal.com). It's built on a reconstruction of the hardeep.space architecture: Next.js (pages router) and styled-components, one client-side shell, archival black-and-white footage behind a frosted panel, and VCR OSD Mono for every letter.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

To show a live "Currently in …" city on About, set `CURRENT_CITY` (locally or in Vercel's environment variables). Without it the pill says Uttarakhand, India.

## Edit content

Everything you'd change lives in `content/`:

| What | Where |
|---|---|
| Site title, top bar, background video | `content/site.js` |
| About text, the "few things I've done" carousel, links, signature | `content/about.js` |
| Press, essays, taste (including all the books) | `content/lists.js` |
| Work: Retrium OS, shipped, freelance, reels, tools | `content/work.js` |
| Projects graveyard | `content/graveyard.js` |
| Photos gallery | `content/photos.js` |
| Colors | `lib/theme.js` |
| Sections and their order in the nav | `lib/sections.js` |

Search for `TODO` to find what still needs real content (signature, own background footage, the Cupertino Focus Substack link, reel details).

## Layout

```
pages/            every route re-exports pages/index.js -> client-only <App>
  api/location.js { city, updatedAt, source } from env vars
components/
  App.jsx         shell: video, grain, entrance, nav, top bar, section switch, corners
  Navigation.jsx  desktop side list + mobile overlay
  References.jsx  the shared list panel, filter tabs and rows (Taste, Work, Graveyard)
  Heatmap.jsx     a year of GitHub contributions
  Carousel.jsx    "a few things I've done"
  sections/       About, Work, Essays, Taste, Press, Photos, Graveyard
content/          everything above, as plain data
public/           font, background footage (see public/videos/CREDITS.md), images
```
