import { useEffect } from "react";
import styled from "styled-components";
import { press } from "../../content/lists";
import { colors, font } from "../../lib/theme";
import { Panel, external } from "../ui";

const PressPanel = styled(Panel)`
  color: ${colors.text};
  font-family: ${font};
  font-size: 16px;
  line-height: 1.6;
  text-transform: uppercase;

  h1 {
    font-size: 1.4rem;
    margin-bottom: 12px;
  }
  article {
    padding: 28px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }
  h2 {
    font-size: 1rem;
    font-weight: normal;
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
    font-size: 12px;
    opacity: 0.75;
  }
  .body {
    margin-top: 14px;
    font-size: 13px;
    line-height: 1.6;
  }
`;

const Embed = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  min-width: 0;
  margin: 20px auto 0;
  overflow: hidden;
  contain: inline-size;

  iframe {
    display: block;
    position: relative !important;
  }
  .instagram-media {
    min-width: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
`;

// Instagram's embed.js upgrades the blockquote into an iframe once loaded.
function InstagramPost({ permalink }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [permalink]);

  return (
    <Embed>
      <blockquote className="instagram-media" data-instgrm-permalink={permalink} data-instgrm-version="14">
        <a href={permalink} {...external}>
          View on Instagram
        </a>
      </blockquote>
    </Embed>
  );
}

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
        {press.instagramPermalink && <InstagramPost permalink={press.instagramPermalink} />}
      </div>
    </PressPanel>
  );
}
