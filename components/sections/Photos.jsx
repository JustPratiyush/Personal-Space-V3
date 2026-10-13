import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { photos } from "../../content/photos";
import { font, type } from "../../lib/theme";
import { ListPanel } from "../References";

// Photos in columns, each at its own height. One opens large in a dialog:
// arrows (or ← →) step through, Escape or a click outside closes it.

const Gallery = styled.div`
  columns: 3 240px;
  column-gap: 16px;
  margin-top: 8px;

  figure {
    break-inside: avoid;
    margin: 0 0 16px;
  }
  button {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    cursor: zoom-in;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 0.09);
  }
  figcaption {
    margin-top: 8px;
    font-size: ${type.meta};
    opacity: 0.75;
  }
`;

const Lightbox = styled.dialog`
  max-width: 94vw;
  max-height: 94vh;
  margin: auto; /* the global reset zeroes it; a modal dialog centres with it */
  padding: 0;
  border: 0;
  background: none;
  color: white;
  font-family: ${font};
  text-transform: uppercase;
  overflow: visible;

  &::backdrop {
    background: rgba(0, 0, 0, 0.88);
  }
  img {
    display: block;
    max-width: 92vw;
    max-height: 80vh;
    margin: 0 auto;
  }
  figcaption {
    margin-top: 10px;
    font-size: ${type.meta};
    text-align: center;
  }
  nav {
    display: flex;
    justify-content: center;
    gap: 24px;
  }
  nav button {
    min-height: 44px;
    padding: 10px 4px;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    font-size: ${type.text};
    cursor: pointer;
  }
  nav button:hover,
  nav button:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export default function Photos() {
  const [index, setIndex] = useState(null);
  const dialogRef = useRef(null);
  const count = photos.items.length;
  const current = index === null ? null : photos.items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index === null) {
      if (dialog.open) dialog.close();
    } else if (!dialog.open) {
      dialog.showModal();
    }
  }, [index]);

  const step = (by) => setIndex((i) => (i + by + count) % count);

  return (
    <ListPanel>
      <h1>{photos.title}</h1>
      {photos.intro && <p>{photos.intro}</p>}

      <Gallery>
        {photos.items.map((photo, i) => (
          <figure key={photo.src}>
            <button type="button" onClick={() => setIndex(i)} aria-label={`Open: ${photo.alt}`}>
              <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />
            </button>
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        ))}
      </Gallery>

      <Lightbox
        ref={dialogRef}
        aria-label="Photo"
        onClose={() => setIndex(null)}
        onClick={(event) => event.target === event.currentTarget && setIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <figure>
            <img src={current.full ?? current.src} alt={current.alt} />
            {current.caption && <figcaption>{current.caption}</figcaption>}
            <nav>
              {count > 1 && (
                <button type="button" onClick={() => step(-1)}>
                  ← Prev
                </button>
              )}
              <button type="button" onClick={() => setIndex(null)}>
                Close
              </button>
              {count > 1 && (
                <button type="button" onClick={() => step(1)}>
                  Next →
                </button>
              )}
            </nav>
          </figure>
        )}
      </Lightbox>
    </ListPanel>
  );
}
