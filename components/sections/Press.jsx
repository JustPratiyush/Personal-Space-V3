import styled from "styled-components";
import { press } from "../../content/lists";
import { colors, font, type } from "../../lib/theme";
import InstagramEmbed from "../InstagramEmbed";
import { Links, Showcase } from "../Showcase";
import { Panel, external } from "../ui";

// As wide as Work's panel on large screens, so each row's picture sits beside
// its text the same way.
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

const Clipping = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.09);
`;

export default function Press() {
  return (
    <PressPanel>
      <h1>{press.title}</h1>
      <Showcase>
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
            {item.clipping ? (
              <a href={item.clipping.full} title="Open the full clipping" {...external}>
                <Clipping
                  src={item.clipping.src}
                  width={item.clipping.width}
                  height={item.clipping.height}
                  alt={item.clipping.alt}
                />
              </a>
            ) : (
              item.instagram && (
                <InstagramEmbed
                  permalink={item.instagram}
                  poster={item.poster}
                  posterOnly={item.posterOnly}
                  alt={item.posterAlt}
                />
              )
            )}
          </article>
        ))}
      </Showcase>
    </PressPanel>
  );
}
