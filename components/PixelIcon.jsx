// 16x16 one-colour pixel glyphs used beside link rows (Taste section).
// Original drawings; the production site uses its own set keyed by `kind`.
const GLYPHS = {
  pen: "M11 2h2v2h-2zM9 4h2v2H9zM7 6h2v2H7zM5 8h2v2H5zM3 10h2v3H3zM3 13h3v1H3z",
  play: "M4 2h2v12H4zM6 4h2v8H6zM8 5h2v6H8zM10 7h2v2h-2z",
  book: "M2 3h5v10H2zM9 3h5v10H9zM7 4h2v9H7z",
  mic: "M6 2h4v7H6zM4 7h1v2h1v1h4V9h1V7h1v3h-1v1H9v2h2v1H5v-1h2v-2H5v-1H4z",
};

export default function PixelIcon({ kind }) {
  return (
    <svg viewBox="0 0 16 16" width="32" height="32" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <path d={GLYPHS[kind] ?? GLYPHS.pen} />
    </svg>
  );
}
