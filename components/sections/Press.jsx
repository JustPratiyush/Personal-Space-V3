import styled from "styled-components";
import { press } from "../../content/lists";
import { colors, font, type } from "../../lib/theme";
import InstagramEmbed from "../InstagramEmbed";
import { Links, Showcase } from "../Showcase";
import { Panel, external } from "../ui";

// As wide as Work's panel on large screens.
const PressPanel = styled(Panel)`
  color: ${colors.text};
  font-family: ${font};
  font-size: ${type.text};
  line-height: 1.6;
  text-transform: uppercase;

  h1 {
    font-size: ${type.headline};
    font-weight: normal;
    margin-bottom: 20px;
  }
  blockquote {
    margin: 0 0 10px;
    font-family: inherit;
  }
  .meta {
    font-size: ${type.meta};
    opacity: 0.75;
  }
  @media (min-width: 1100px) {
    max-width: 1100px;
    padding: 24px 32px;
  }
`;

// The pile needs more room than Work's 350px column: it sits under the text
// until the panel is wide enough to put it beside.
const Rows = styled(Showcase)`
  @media (min-width: 700px) {
    > article {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (min-width: 1100px) {
    > article {
      grid-template-columns: minmax(0, 1fr) 470px;
      gap: 16px 40px;
    }
  }
`;

// A photo from the show at the back, the Instagram post beside it and the
// clipping in front, like prints dropped on a table. Hovering or focusing one
// brings it to the top.
const Pile = styled.div`
  position: relative;
  width: 100%;
  max-width: 470px;
  aspect-ratio: 1 / 1.04;
  margin: 8px 0 12px;

  > * {
    position: absolute;
    display: block;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.55);
  }
  > *:hover,
  > *:focus-visible,
  > *:focus-within {
    z-index: 4;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  .photo {
    left: 2%;
    top: 9%;
    width: 43%;
    transform: rotate(-8deg);
    z-index: 1;
  }
  .post {
    left: 46%;
    top: 0;
    width: 52%;
    z-index: 2;
  }
  .clipping {
    left: 5%;
    top: 46%;
    width: 56%;
    transform: rotate(12deg);
    z-index: 3;
  }
`;

export default function Press() {
  return (
    <PressPanel>
      <h1>{press.title}</h1>
      <Rows>
        {press.coverage.map((item) => (
          <article key={item.title}>
            <div>
              <h2>
                <a href={item.url ?? item.clipping?.full} {...external}>
                  {item.title}
                </a>
              </h2>
              <small>{item.meta}</small>
              {item.quote && <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>}
              {item.attribution && <p className="meta">{item.attribution}</p>}
              {item.body && <p>{item.body}</p>}
              {item.links && (
                <Links>
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} {...external}>
                      {link.label} ↗
                    </a>
                  ))}
                </Links>
              )}
            </div>
            <Pile>
              {item.photo && (
                <a className="photo" href={item.photo.href} title="Watch the full documentary" {...external}>
                  <img src={item.photo.src} width={item.photo.width} height={item.photo.height} alt={item.photo.alt} />
                </a>
              )}
              {item.instagram && (
                <div className="post">
                  <InstagramEmbed
                    permalink={item.instagram}
                    poster={item.poster}
                    posterOnly={item.posterOnly}
                    alt={item.posterAlt}
                  />
                </div>
              )}
              {item.clipping && (
                <a className="clipping" href={item.clipping.full} title="Open the full clipping" {...external}>
                  <img
                    src={item.clipping.src}
                    width={item.clipping.width}
                    height={item.clipping.height}
                    alt={item.clipping.alt}
                  />
                </a>
              )}
            </Pile>
          </article>
        ))}
      </Rows>
    </PressPanel>
  );
}
