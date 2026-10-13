import styled from "styled-components";
import { press } from "../../content/lists";
import { colors, font, type } from "../../lib/theme";
import InstagramEmbed from "../InstagramEmbed";
import { Showcase } from "../Showcase";
import { Panel, external } from "../ui";

// As wide as Work's panel on large screens, so the post sits beside the text
// the same way.
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

export default function Press() {
  return (
    <PressPanel>
      <h1>{press.title}</h1>
      <Showcase>
        {press.coverage.map((item) => (
          <article key={item.url}>
            <div>
              <h2>
                <a href={item.url} {...external}>
                  {item.outlet}
                </a>
              </h2>
              {item.meta && <small>{item.meta}</small>}
              <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
              {item.attribution && <p className="meta">{item.attribution}</p>}
              {item.body && <p>{item.body}</p>}
            </div>
            {item.instagram && (
              <InstagramEmbed
                permalink={item.instagram}
                poster={item.poster}
                posterOnly={item.posterOnly}
                alt={item.posterAlt}
              />
            )}
          </article>
        ))}
      </Showcase>
    </PressPanel>
  );
}
