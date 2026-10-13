// Photos: a gallery in columns; each opens large. { src, full?, width, height, alt, caption? }
// `src` is what the gallery shows (about 720px wide is plenty), `full` what
// opens (up to about 1600px); without `full`, `src` opens.
// TODO(Abhinav): add photos, and an intro line if you want one.
export const photos = {
  title: "photos",
  intro: null,
  items: [
    {
      src: "/images/press/maharana-kika-stage.webp",
      full: "/images/photos/maharana-kika-stage.webp",
      width: 720,
      height: 720,
      alt: "A battle scene from Maharana Kika: silhouetted soldiers in front of a projected war",
      caption: "Maharana Kika: The Battles Within · 2025",
    },
  ],
};
