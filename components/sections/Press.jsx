import styled from "styled-components";
import { press } from "../../content/lists";
import { colors, font, type } from "../../lib/theme";
import InstagramEmbed from "../InstagramEmbed";
import { Panel, external } from "../ui";

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
  article {
    padding: 28px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }
  h2 {
    font-size: ${type.title};
    font-weight: normal;
    line-height: 1.3;
    margin-bottom: 14px;
  }
  blockquote {
    margin: 20px 0 14px;
    font-family: inherit;
  }
  article a {
    color: inherit;
    text-underline-offset: 4px;
  }
  .meta {
    font-size: ${type.meta};
    opacity: 0.75;
  }
  .body {
    margin-top: 14px;
    font-size: ${type.text};
    line-height: 1.6;
  }
`;

const PressEmbed = styled(InstagramEmbed)`
  margin: 20px auto 0;
`;

export default function Press() {
  return (
    <PressPanel>
      <h1>{press.title}</h1>
      <div className="press-layout">
        <div className="coverage">
          {press.coverage.map((item) => (
            <article key={item.url}>
              <h2>
                <a href={item.url} {...external}>
                  {item.outlet}
                </a>
              </h2>
              {item.meta && <p className="meta">{item.meta}</p>}
              <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
              {item.attribution && <p className="meta">{item.attribution}</p>}
              {item.body && <p className="body">{item.body}</p>}
            </article>
          ))}
        </div>
        {press.instagramPermalink && <PressEmbed permalink={press.instagramPermalink} />}
      </div>
    </PressPanel>
  );
}
